/**
 *  Generate and manage a new package
 * 
 *  (Step 3) Compress the processed folder
 */

const fs = require('fs');
const path = require('path');
const configPath = path.resolve(__dirname, '../../../package.json');
const json = JSON.parse(fs.readFileSync(configPath));
const AdmZip = require("adm-zip");

const currPath = path.resolve(__dirname, '../../../my-package/');
const newPath = path.resolve(__dirname, `../../../${json.name}/`);


// create an independent plug-in zip package, 
// which will be used for independent installation and use of the CORE PROGRAM
// ----------------------------------
async function createZipArchive() {
    const zip = new AdmZip();
    const outputFile = `${json.name}@${json.version}.zip`;
    zip.addLocalFolder(newPath);
    zip.writeZip(outputFile);

    //
    if (!fs.existsSync(currPath)){
        fs.mkdirSync(currPath, { recursive: true });
    }
    

    // move the package
    const oldpackPath = path.resolve(__dirname, `../../../${outputFile}`);
    const newpackPath = path.resolve(__dirname, `../../../my-package/${outputFile}`);
    fs.copyFileSync(oldpackPath, newpackPath);

    // delete unnecessary files and folders
    fs.rmSync(newPath, { recursive: true });
    console.log('\x1b[36m%s\x1b[0m', `--> (Step 3)  Deleted "${json.name}" successfully`);
    fs.rmSync(oldpackPath, { recursive: true });
    console.log('\x1b[36m%s\x1b[0m', `--> (Step 3)  Deleted "${outputFile}" successfully`);


    console.log('\x1b[36m%s\x1b[0m', `--> (Step 3)  Created "my-package/${outputFile}" successfully`);
    
}


// change the folder name with current repository
// ----------------------------------
if (fs.existsSync(currPath)) {
    fs.renameSync(currPath, newPath);
    console.log('\x1b[36m%s\x1b[0m', `--> (Step 3)  Successfully renamed the directory "my-package" to "${json.name}"`);
    
    //package folder
    createZipArchive();
}




