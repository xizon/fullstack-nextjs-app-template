/**
 *  File adaptation
 * 
 *  (Step 2) Modify the main js and css files to fit the CORE PROGRAM
 */

const fs = require('fs');
const path = require('path');

const mainJsPath = path.resolve(__dirname, '../../../my-package/static/js');
const mainCssPath = path.resolve(__dirname, '../../../my-package/static/css');
const renameFile = (folder, type) => {
    fs.readdirSync(folder).forEach(file => {
        const slug = 'main';
        const oldNamePath = path.join(folder, file);
        let newNamePath;
        
        if ( file.indexOf(`${type}.LICENSE.txt`) >= 0 ) {
            newNamePath = path.join(folder, `${slug}.${type}.LICENSE.txt`);
        } else if ( file.indexOf(`.${type}.map`) >= 0 ) {
            newNamePath = path.join(folder, `${slug}.${type}.map`);
        } else {
            newNamePath = path.join(folder, `${slug}.${type}`);
        }
        fs.renameSync(oldNamePath, newNamePath);
        console.log('\x1b[36m%s\x1b[0m', `--> (Step 2)  Successfully renamed the file "${file}"`);
    
    });  
};

renameFile(mainJsPath, 'js');
renameFile(mainCssPath, 'css');
