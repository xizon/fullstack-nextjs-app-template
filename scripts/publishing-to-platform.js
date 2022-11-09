/**
 * Solve problems that may arise when publishing to e.g. Github page
 */

const fs = require('fs');
const path = require('path');

// Document that .nojekyll file is required when publishing to GitHub Pages
const outputDir = '../out/';
const targetPath = path.resolve(__dirname, outputDir + '.nojekyll');

if (!fs.existsSync(targetPath)) {
    fs.writeFileSync(targetPath, '');
    console.log(`--> created ${targetPath}`);
}