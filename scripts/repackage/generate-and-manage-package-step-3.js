/**
 *  Generate and manage a new package
 * 
 *  (Step 3) Unzip the compressed package to the specified directory (usually used independently for the installer)
 */


const fs = require('fs');
const path = require('path');
const AdmZip = require("adm-zip");
const json = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json')));

const targetPath = path.resolve(__dirname, `../../public/${json.name}/`);
const filePath = path.resolve(__dirname, `../../my-package/${json.name}.zip`);

// Unzip file
// ----------------------------------
const zip = new AdmZip(filePath);
zip.extractAllTo(targetPath, /*overwrite*/ true);
console.log('\x1b[36m%s\x1b[0m', `--> Extracted "my-package/${json.name}.zip" to "public/${json.name}/" successfully`);
