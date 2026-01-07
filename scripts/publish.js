#!/usr/bin/env node

/**
 * Script de publication npm interactif pour @kksdev/ds-angular
 *
 * Usage:
 *   npm run release              # Mode interactif
 *   npm run release:dry-run      # Simulation
 *   npm run release:patch        # Version patch directe
 *   npm run release:minor        # Version minor directe
 *   npm run release:major        # Version major directe
 *
 * Flags:
 *   --dry-run      Simule sans publier
 *   --patch        Bump patch (1.0.0 → 1.0.1)
 *   --minor        Bump minor (1.0.0 → 1.1.0)
 *   --major        Bump major (1.0.0 → 2.0.0)
 *   --prerelease   Bump prerelease (1.0.0 → 1.0.1-beta.0)
 *   --skip-tests   Bypass validations (dev only)
 *   --no-git       Ne pas créer tag/commit
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Paths
const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_PATH = path.join(ROOT_DIR, '.env');

// Load .env file
function loadEnv() {
  if (fs.existsSync(ENV_PATH)) {
    const content = fs.readFileSync(ENV_PATH, 'utf8');
    content.split('\n').forEach((line) => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();
const LIB_PACKAGE_PATH = path.join(ROOT_DIR, 'projects/ds-angular/package.json');
const DIST_DIR = path.join(ROOT_DIR, 'dist/ds-angular');
const DIST_PACKAGE_PATH = path.join(DIST_DIR, 'package.json');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Helpers
function log(msg, color = '') {
  console.log(`${color}${msg}${colors.reset}`);
}

function logStep(step, msg) {
  console.log(`\n${colors.cyan}[${step}]${colors.reset} ${colors.bright}${msg}${colors.reset}`);
}

function logSuccess(msg) {
  console.log(`${colors.green}✓${colors.reset} ${msg}`);
}

function logError(msg) {
  console.log(`${colors.red}✗${colors.reset} ${msg}`);
}

function logWarning(msg) {
  console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
}

function exec(cmd, options = {}) {
  try {
    return execSync(cmd, {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    });
  } catch (error) {
    if (options.silent) {
      return null;
    }
    throw error;
  }
}

function execOutput(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT_DIR, encoding: 'utf8', stdio: 'pipe' }).trim();
  } catch {
    return null;
  }
}

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function confirm(question) {
  const answer = await prompt(`${question} (y/N) `);
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

async function select(question, options) {
  console.log(`\n${colors.bright}${question}${colors.reset}\n`);
  options.forEach((opt, i) => {
    console.log(`  ${colors.cyan}${i + 1})${colors.reset} ${opt.label}${opt.hint ? colors.dim + ` (${opt.hint})` + colors.reset : ''}`);
  });
  console.log();

  const answer = await prompt(`Choix [1-${options.length}]: `);
  const index = parseInt(answer, 10) - 1;

  if (index >= 0 && index < options.length) {
    return options[index].value;
  }

  logError('Choix invalide');
  process.exit(1);
}

// Parse args
function parseArgs() {
  const args = process.argv.slice(2);
  return {
    dryRun: args.includes('--dry-run'),
    patch: args.includes('--patch'),
    minor: args.includes('--minor'),
    major: args.includes('--major'),
    prerelease: args.includes('--prerelease'),
    skipTests: args.includes('--skip-tests'),
    noGit: args.includes('--no-git'),
  };
}

// Version helpers
function getCurrentVersion() {
  const pkg = JSON.parse(fs.readFileSync(LIB_PACKAGE_PATH, 'utf8'));
  return pkg.version;
}

function bumpVersion(version, type) {
  const parts = version.split('-');
  const [major, minor, patch] = parts[0].split('.').map(Number);
  const prerelease = parts[1];

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    case 'prerelease':
      if (prerelease) {
        const [tag, num] = prerelease.split('.');
        return `${major}.${minor}.${patch}-${tag}.${parseInt(num || 0, 10) + 1}`;
      }
      return `${major}.${minor}.${patch + 1}-beta.0`;
    default:
      return version;
  }
}

function updatePackageVersion(filePath, newVersion) {
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  pkg.version = newVersion;
  fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
}

// Checks
function checkBranch() {
  const branch = execOutput('git rev-parse --abbrev-ref HEAD');
  if (branch !== 'master' && branch !== 'main') {
    logWarning(`Branche actuelle: ${branch} (recommandé: master)`);
    return false;
  }
  return true;
}

function checkWorkingDirectory() {
  const status = execOutput('git status --porcelain');
  if (status) {
    logWarning('Working directory non propre:');
    console.log(colors.dim + status + colors.reset);
    return false;
  }
  return true;
}

function checkNpmAuth(dryRun = false) {
  // Check for NPM_TOKEN env var
  if (process.env.NPM_TOKEN) {
    logSuccess('Authentification npm via NPM_TOKEN');
    return true;
  }

  // Check npm whoami
  const user = execOutput('npm whoami 2>/dev/null');
  if (user) {
    logSuccess(`Authentification npm: ${user}`);
    return true;
  }

  if (dryRun) {
    logWarning('Non authentifié sur npm (ignoré en dry-run)');
    return true;
  }

  logError('Non authentifié sur npm');
  log('  Exécute: npm login', colors.dim);
  log('  Ou définis NPM_TOKEN dans ton environnement', colors.dim);
  return false;
}

// Validations
async function runValidations(skipTests) {
  if (skipTests) {
    logWarning('Validations ignorées (--skip-tests)');
    return true;
  }

  logStep('2/8', 'Validations pre-publish');

  // Tests
  log('\nExécution des tests...', colors.dim);
  try {
    exec('npm run test:headless');
    logSuccess('Tests OK');
  } catch {
    logError('Tests échoués');
    return false;
  }

  // Token validation
  log('\nValidation des tokens...', colors.dim);
  try {
    exec('npm run validate:tokens');
    logSuccess('Tokens OK');
  } catch {
    logError('Tokens invalides');
    return false;
  }

  // Bundle analysis
  log('\nAnalyse du bundle...', colors.dim);
  try {
    exec('npm run analyze:bundle');
    logSuccess('Bundle OK');
  } catch {
    logError('Bundle trop volumineux');
    return false;
  }

  return true;
}

// Build
function buildLibrary() {
  logStep('4/8', 'Build de la library');

  try {
    exec('npm run build:lib');
    logSuccess('Build terminé');

    // Verify dist exists
    if (!fs.existsSync(DIST_DIR)) {
      logError('Dossier dist/ds-angular non trouvé');
      return false;
    }

    return true;
  } catch {
    logError('Build échoué');
    return false;
  }
}

// Publish
async function publishPackage(dryRun) {
  logStep('7/8', dryRun ? 'Publication (dry-run)' : 'Publication sur npm');

  const cmd = dryRun ? 'npm publish --dry-run' : 'npm publish --access public';

  try {
    execSync(cmd, { cwd: DIST_DIR, stdio: 'inherit' });
    if (dryRun) {
      logSuccess('Dry-run OK - aucune publication effectuée');
    } else {
      logSuccess('Package publié sur npm');
    }
    return true;
  } catch {
    logError('Publication échouée');
    return false;
  }
}

// Git operations
function gitOperations(version, noGit, dryRun) {
  if (noGit || dryRun) {
    if (noGit) logWarning('Git operations ignorées (--no-git)');
    return true;
  }

  logStep('8/8', 'Git tag et commit');

  try {
    // Commit package.json changes
    exec('git add projects/ds-angular/package.json');
    exec(`git commit -m "chore(release): v${version}"`);
    logSuccess('Commit créé');

    // Create tag
    exec(`git tag -a v${version} -m "Release v${version}"`);
    logSuccess(`Tag v${version} créé`);

    log(`\n${colors.yellow}N'oublie pas de push:${colors.reset}`);
    log(`  git push origin master --tags`, colors.dim);

    return true;
  } catch (error) {
    logError('Git operations échouées');
    console.error(error.message);
    return false;
  }
}

// Main
async function main() {
  console.log(`
${colors.cyan}╔═══════════════════════════════════════════════════╗
║     ${colors.bright}@kksdev/ds-angular - Publication npm${colors.reset}${colors.cyan}        ║
╚═══════════════════════════════════════════════════╝${colors.reset}
`);

  const args = parseArgs();
  const currentVersion = getCurrentVersion();

  log(`Version actuelle: ${colors.bright}${currentVersion}${colors.reset}`);
  if (args.dryRun) log(`Mode: ${colors.yellow}DRY-RUN${colors.reset} (simulation)`);

  // Step 1: Prerequisites
  logStep('1/8', 'Vérifications préliminaires');

  const onMaster = checkBranch();
  const cleanDir = checkWorkingDirectory();
  const npmAuth = checkNpmAuth(args.dryRun);

  if (!npmAuth) {
    process.exit(1);
  }

  if (!onMaster || !cleanDir) {
    const proceed = await confirm('\nContinuer malgré les avertissements ?');
    if (!proceed) {
      log('\nPublication annulée.', colors.yellow);
      process.exit(0);
    }
  }

  // Step 2: Validations
  const validationsOk = await runValidations(args.skipTests);
  if (!validationsOk) {
    logError('\nValidations échouées. Corrige les erreurs avant de publier.');
    process.exit(1);
  }

  // Step 3: Version selection
  logStep('3/8', 'Choix de la version');

  let versionType;
  if (args.patch) versionType = 'patch';
  else if (args.minor) versionType = 'minor';
  else if (args.major) versionType = 'major';
  else if (args.prerelease) versionType = 'prerelease';
  else {
    versionType = await select('Quel type de version ?', [
      { value: 'patch', label: 'patch', hint: `${currentVersion} → ${bumpVersion(currentVersion, 'patch')}` },
      { value: 'minor', label: 'minor', hint: `${currentVersion} → ${bumpVersion(currentVersion, 'minor')}` },
      { value: 'major', label: 'major', hint: `${currentVersion} → ${bumpVersion(currentVersion, 'major')}` },
      { value: 'prerelease', label: 'prerelease', hint: `${currentVersion} → ${bumpVersion(currentVersion, 'prerelease')}` },
    ]);
  }

  const newVersion = bumpVersion(currentVersion, versionType);
  log(`\nNouvelle version: ${colors.green}${currentVersion}${colors.reset} → ${colors.bright}${newVersion}${colors.reset}`);

  // Step 4: Build
  if (!buildLibrary()) {
    process.exit(1);
  }

  // Step 5: Update versions
  logStep('5/8', 'Mise à jour des versions');

  updatePackageVersion(LIB_PACKAGE_PATH, newVersion);
  logSuccess(`projects/ds-angular/package.json → ${newVersion}`);

  updatePackageVersion(DIST_PACKAGE_PATH, newVersion);
  logSuccess(`dist/ds-angular/package.json → ${newVersion}`);

  // Step 6: Confirmation
  logStep('6/8', 'Confirmation');

  console.log(`
${colors.bright}Récapitulatif:${colors.reset}
  Package:  @kksdev/ds-angular
  Version:  ${currentVersion} → ${colors.green}${newVersion}${colors.reset}
  Registry: https://registry.npmjs.org/
  Mode:     ${args.dryRun ? colors.yellow + 'DRY-RUN' + colors.reset : colors.green + 'PUBLICATION RÉELLE' + colors.reset}
`);

  const confirmed = await confirm('Confirmer la publication ?');
  if (!confirmed) {
    // Rollback version in source
    updatePackageVersion(LIB_PACKAGE_PATH, currentVersion);
    log('\nPublication annulée. Version restaurée.', colors.yellow);
    process.exit(0);
  }

  // Step 7: Publish
  const published = await publishPackage(args.dryRun);
  if (!published) {
    // Rollback
    updatePackageVersion(LIB_PACKAGE_PATH, currentVersion);
    process.exit(1);
  }

  // Step 8: Git
  if (!args.dryRun) {
    gitOperations(newVersion, args.noGit, args.dryRun);
  }

  // Success
  console.log(`
${colors.green}╔═══════════════════════════════════════════════════╗
║                  ${colors.bright}Publication réussie!${colors.reset}${colors.green}              ║
╚═══════════════════════════════════════════════════╝${colors.reset}

  ${colors.dim}Package:${colors.reset}  @kksdev/ds-angular@${newVersion}
  ${colors.dim}npm:${colors.reset}      https://www.npmjs.com/package/@kksdev/ds-angular
  ${colors.dim}Install:${colors.reset}  npm install @kksdev/ds-angular@${newVersion}
`);
}

main().catch((error) => {
  logError(`Erreur inattendue: ${error.message}`);
  process.exit(1);
});
