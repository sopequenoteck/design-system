#!/usr/bin/env node

/**
 * Script d'analyse de la taille du bundle
 *
 * Analyse la taille du bundle de ds-angular après build
 * et génère un rapport HTML détaillé avec breakdown par module.
 *
 * Usage: npm run analyze:bundle
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Analyse de la taille du bundle ds-angular');
console.log('=============================================\n');

// Vérifier que la bibliothèque a été buildée
const distPath = path.join(__dirname, '..', 'dist', 'ds-angular');

if (!fs.existsSync(distPath)) {
  console.error('❌ Build de la bibliothèque non trouvé.');
  console.error('   Exécutez d\'abord: npm run build:lib');
  process.exit(1);
}

console.log('✅ Build détecté dans dist/ds-angular\n');

// Fonction pour obtenir la taille d'un fichier
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

// Fonction pour formater la taille en octets
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Analyser les fichiers dans dist/
function analyzeDist(dir) {
  const files = [];

  function walk(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile()) {
        const relativePath = path.relative(distPath, fullPath);
        const size = stat.size;
        const ext = path.extname(item);

        files.push({
          path: relativePath,
          size,
          ext
        });
      }
    }
  }

  walk(dir);
  return files;
}

const files = analyzeDist(distPath);

// Calculer les statistiques
const totalSize = files.reduce((sum, f) => sum + f.size, 0);

const byExtension = {};
files.forEach(f => {
  if (!byExtension[f.ext]) {
    byExtension[f.ext] = { count: 0, size: 0 };
  }
  byExtension[f.ext].count++;
  byExtension[f.ext].size += f.size;
});

// Trier les fichiers par taille
files.sort((a, b) => b.size - a.size);

// Afficher le rapport
console.log('📊 Statistiques du bundle');
console.log('=========================\n');

console.log(`Taille totale: ${formatBytes(totalSize)}`);
console.log(`Nombre de fichiers: ${files.length}\n`);

console.log('Par type de fichier:');
Object.entries(byExtension)
  .sort((a, b) => b[1].size - a[1].size)
  .forEach(([ext, stats]) => {
    const percentage = ((stats.size / totalSize) * 100).toFixed(1);
    console.log(`  ${ext || '(no ext)'}: ${formatBytes(stats.size)} (${percentage}%) - ${stats.count} fichier(s)`);
  });

console.log('\nTop 10 fichiers les plus volumineux:');
files.slice(0, 10).forEach((f, i) => {
  const percentage = ((f.size / totalSize) * 100).toFixed(1);
  console.log(`  ${i + 1}. ${f.path}: ${formatBytes(f.size)} (${percentage}%)`);
});

// Générer un rapport HTML simple
const htmlReport = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Bundle Analysis - ds-angular</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #333; margin-top: 0; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
    .stat-card { padding: 20px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #7d4bc0; }
    .stat-value { font-size: 28px; font-weight: bold; color: #7d4bc0; }
    .stat-label { font-size: 14px; color: #666; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f9fa; font-weight: 600; }
    tr:hover { background: #f8f9fa; }
    .size { font-family: 'Courier New', monospace; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📦 Bundle Analysis - ds-angular</h1>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">${formatBytes(totalSize)}</div>
        <div class="stat-label">Taille totale</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${files.length}</div>
        <div class="stat-label">Fichiers</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Object.keys(byExtension).length}</div>
        <div class="stat-label">Types de fichiers</div>
      </div>
    </div>

    <h2>Par type de fichier</h2>
    <table>
      <thead>
        <tr>
          <th>Extension</th>
          <th>Taille</th>
          <th>Pourcentage</th>
          <th>Fichiers</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(byExtension)
          .sort((a, b) => b[1].size - a[1].size)
          .map(([ext, stats]) => {
            const percentage = ((stats.size / totalSize) * 100).toFixed(1);
            return `<tr>
              <td>${ext || '(no ext)'}</td>
              <td class="size">${formatBytes(stats.size)}</td>
              <td>${percentage}%</td>
              <td>${stats.count}</td>
            </tr>`;
          })
          .join('')}
      </tbody>
    </table>

    <h2>Top 20 fichiers les plus volumineux</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Fichier</th>
          <th>Taille</th>
          <th>Pourcentage</th>
        </tr>
      </thead>
      <tbody>
        ${files.slice(0, 20).map((f, i) => {
          const percentage = ((f.size / totalSize) * 100).toFixed(1);
          return `<tr>
            <td>${i + 1}</td>
            <td><code>${f.path}</code></td>
            <td class="size">${formatBytes(f.size)}</td>
            <td>${percentage}%</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>`;

const reportPath = path.join(__dirname, '..', 'bundle-analysis.html');
fs.writeFileSync(reportPath, htmlReport, 'utf-8');

console.log(`\n✅ Rapport HTML généré: ${reportPath}`);
console.log('   Ouvrez ce fichier dans un navigateur pour voir le rapport détaillé.\n');

// Sauvegarder les stats en JSON pour la CI
const statsPath = path.join(__dirname, '..', 'bundle-stats.json');
fs.writeFileSync(statsPath, JSON.stringify({
  totalSize,
  fileCount: files.length,
  byExtension,
  files: files.map(f => ({ path: f.path, size: f.size }))
}, null, 2), 'utf-8');

console.log(`✅ Stats JSON générées: ${statsPath}`);
console.log('   Utilisé par la CI pour détecter les régressions.\n');

process.exit(0);
