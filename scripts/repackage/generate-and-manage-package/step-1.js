/**
 *  Generate and manage a new package
 * 
 *  (Step 1) Repackage the exported files into required package
 */

const glob = require('glob');
const fs = require('fs');
const path = require('path');
const configPath = path.resolve(__dirname, '../../../package.json');
const json = JSON.parse(fs.readFileSync(configPath));

// Document that .nojekyll file is required when publishing to GitHub Pages
// ----------------------------------
const outputDir = '../../../out/';
const targetPath = path.resolve(__dirname, outputDir + '.nojekyll');
const currPath = path.resolve(__dirname, outputDir);
const newPath = path.resolve(__dirname, '../../../my-package/');
const iteratesPackagePath = path.resolve(__dirname, '../../../my-package/**/**.+(html|js|css|json)');


const getPackageFilePath = (filename) => {
    return path.resolve(__dirname, '../../../my-package/' + filename);
};

const deletePackageFile = (entryFilepath, entryFileIndex, filename) => {
    if ( entryFilepath.indexOf( filename ) ) {
        fs.rm( getPackageFilePath(filename), { force: true }, (err) => {
            if (err) return console.log(err);
        });  
        if ( entryFileIndex === 0 ) console.log('\x1b[36m%s\x1b[0m', `--> (Step 1)  Deleted "my-package/${filename}" successfully`);
    }
};


// delete package recursively
// ----------------------------------
if (fs.existsSync(newPath)) {
    fs.rmSync(newPath, { recursive: true });
    console.log('\x1b[36m%s\x1b[0m', `--> (Step 1)  Deleted "my-package" successfully`);
}


// update output directory
// ----------------------------------
if (!fs.existsSync(targetPath) && fs.existsSync(currPath)) {
    fs.writeFileSync(targetPath, '');
    console.log('\x1b[36m%s\x1b[0m', `--> (Step 1)  Created "build/.nojekyll" successfully`);
}

// change the folder name to what you want
// ----------------------------------
if (fs.existsSync(currPath)) {
    fs.renameSync(currPath, newPath);
    console.log('\x1b[36m%s\x1b[0m', `--> (Step 1)  Successfully renamed the directory "build" to "my-package"`);


    // iterates over all folders and files
    // ----------------------------------
    const files = [];
    glob(iteratesPackagePath, {
        nodir: true,
    }, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(function (file, index) {
            files.push(file);

            // (Asynchronous) change all files' absolute URL
            // ----------------------------------
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) return console.log(err);

                const result = data.replace(/\/static\//g, `/plugins/${json.name}/${json.version}/static/`)
                                     .replace(/\/assets\//g, `/plugins/${json.name}/${json.version}/assets/`);

                fs.writeFile(file, result, 'utf8', function (err) {
                    if (err) return console.log(err);
                });

                // move some files
                fs.copyFile(configPath, getPackageFilePath('package.json'), (err) => {
                    if (err) return console.log(err);
                    if ( index === 0 ) console.log('\x1b[36m%s\x1b[0m', `--> (Step 1)  "package.json" was copied to "my-package/package.json"`);
                  });
                  

                // delete some files
                deletePackageFile(file, index, '404.html');
                deletePackageFile(file, index, '.nojekyll');
                deletePackageFile(file, index, 'index.html');
                deletePackageFile(file, index, 'asset-manifest.json');

            });
   

        });

        //console.log(files);

        // (Asynchronous) delete unnecessary files and folders
        // ----------------------------------
        fs.rm( getPackageFilePath('server/'), { recursive: true }, (err) => {
            if (err) return console.log(err);
            console.log('\x1b[36m%s\x1b[0m', `--> (Step 1)  Deleted "my-package/server" successfully`);
        });


    });

}



