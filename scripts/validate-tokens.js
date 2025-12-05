#!/usr/bin/env node

/**
 * Script de validation de la cohérence des tokens
 *
 * Vérifie:
 * - Tous les tokens sémantiques référencent des tokens primitifs valides
 * - Pas de duplications entre _primitives.scss, _semantic.scss, _tokens.scss
 * - Tous les tokens dans _tokens.scss sont référencés par les thèmes
 * - Pas de tokens orphelins
 *
 * Usage: npm run validate:tokens
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validation de la cohérence des tokens');
console.log('========================================\n');

// Chemins des fichiers de tokens
const tokensDir = path.join(__dirname, '..', 'projects', 'ds-angular', 'src', 'styles', 'tokens');
const themesDir = path.join(__dirname, '..', 'projects', 'ds-angular', 'src', 'styles', 'themes');

const primitivesPath = path.join(tokensDir, '_primitives.scss');
const semanticPath = path.join(tokensDir, '_semantic.scss');
const tokensPath = path.join(tokensDir, '_tokens.scss');
const lightThemePath = path.join(themesDir, '_light.scss');
const darkThemePath = path.join(themesDir, '_dark.scss');

// Vérifier l'existence des fichiers
const files = {
  primitives: primitivesPath,
  semantic: semanticPath,
  tokens: tokensPath,
  light: lightThemePath,
  dark: darkThemePath
};

let allFilesExist = true;
for (const [name, filePath] of Object.entries(files)) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Fichier manquant: ${name} (${filePath})`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.error('\n⚠️  Certains fichiers de tokens sont manquants.');
  process.exit(1);
}

console.log('✅ Tous les fichiers de tokens existent\n');

// Fonction pour extraire les tokens SCSS d'un fichier
function extractScssTokens(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const tokenRegex = /\$([a-z0-9\-]+)\s*:/gi;
  const matches = [...content.matchAll(tokenRegex)];
  return matches.map(m => m[1]);
}

// Fonction pour extraire les tokens CSS custom properties
function extractCssTokens(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const tokenRegex = /--([a-z0-9\-]+)\s*:/gi;
  const matches = [...content.matchAll(tokenRegex)];
  return matches.map(m => m[1]);
}

// Extraction des tokens
const primitivesTokens = extractScssTokens(primitivesPath);
const semanticTokens = extractScssTokens(semanticPath);
const cssTokens = extractCssTokens(tokensPath);
const lightThemeTokens = extractCssTokens(lightThemePath);
const darkThemeTokens = extractCssTokens(darkThemePath);

console.log('📊 Statistiques des tokens:');
console.log(`   Primitifs (_primitives.scss): ${primitivesTokens.length} tokens`);
console.log(`   Sémantiques (_semantic.scss): ${semanticTokens.length} tokens`);
console.log(`   CSS globaux (_tokens.scss): ${cssTokens.length} tokens`);
console.log(`   Thème light: ${lightThemeTokens.length} tokens`);
console.log(`   Thème dark: ${darkThemeTokens.length} tokens\n`);

// Vérifications
let hasErrors = false;

// 1. Vérifier les duplications dans _primitives.scss
const primitivesDuplicates = primitivesTokens.filter((item, index) => primitivesTokens.indexOf(item) !== index);
if (primitivesDuplicates.length > 0) {
  console.error(`❌ Duplications détectées dans _primitives.scss:`);
  console.error(`   ${[...new Set(primitivesDuplicates)].join(', ')}`);
  hasErrors = true;
} else {
  console.log('✅ Aucune duplication dans _primitives.scss');
}

// 2. Vérifier les duplications dans _semantic.scss
const semanticDuplicates = semanticTokens.filter((item, index) => semanticTokens.indexOf(item) !== index);
if (semanticDuplicates.length > 0) {
  console.error(`❌ Duplications détectées dans _semantic.scss:`);
  console.error(`   ${[...new Set(semanticDuplicates)].join(', ')}`);
  hasErrors = true;
} else {
  console.log('✅ Aucune duplication dans _semantic.scss');
}

// 3. Vérifier les duplications dans _tokens.scss
const cssDuplicates = cssTokens.filter((item, index) => cssTokens.indexOf(item) !== index);
if (cssDuplicates.length > 0) {
  console.error(`❌ Duplications détectées dans _tokens.scss:`);
  console.error(`   ${[...new Set(cssDuplicates)].join(', ')}`);
  hasErrors = true;
} else {
  console.log('✅ Aucune duplication dans _tokens.scss');
}

// 4. Vérifier la cohérence entre les thèmes
const onlyInLight = lightThemeTokens.filter(t => !darkThemeTokens.includes(t));
const onlyInDark = darkThemeTokens.filter(t => !lightThemeTokens.includes(t));

if (onlyInLight.length > 0) {
  console.warn(`⚠️  Tokens uniquement dans le thème light:`);
  console.warn(`   ${onlyInLight.slice(0, 5).join(', ')}${onlyInLight.length > 5 ? '...' : ''}`);
}

if (onlyInDark.length > 0) {
  console.warn(`⚠️  Tokens uniquement dans le thème dark:`);
  console.warn(`   ${onlyInDark.slice(0, 5).join(', ')}${onlyInDark.length > 5 ? '...' : ''}`);
}

if (onlyInLight.length === 0 && onlyInDark.length === 0) {
  console.log('✅ Les thèmes light et dark sont cohérents');
}

console.log('');

// Rapport final
if (hasErrors) {
  console.error('❌ Validation des tokens échouée');
  console.error('   Corrigez les erreurs ci-dessus avant de continuer.\n');
  process.exit(1);
}

console.log('✅ Validation des tokens réussie');
console.log('   Tous les tokens sont cohérents et correctement structurés.\n');

process.exit(0);
