/**
 *  Generate and manage a new package
 * 
 *  (Step 1) Repackage the exported files into required package
 */

const glob = require('glob');
const fs = require('fs');
const path = require('path');

// Document that .nojekyll file is required when publishing to GitHub Pages
// ----------------------------------
const outputDir = '../../out/';
const targetPath = path.resolve(__dirname, outputDir + '.nojekyll');
const currPath = path.resolve(__dirname, outputDir);
const newPath = path.resolve(__dirname, '../../my-package/');
const iteratesPackagePath = path.resolve(__dirname, '../../my-package/**/**.+(html|js|css|json)');

const getPackageFilePath = (filename) => {
    return path.resolve(__dirname, '../../my-package/' + filename);
};


// delete package recursively
// ----------------------------------
if (fs.existsSync(newPath)) {
    fs.rmSync(newPath, { recursive: true });
    console.log('\x1b[36m%s\x1b[0m', `--> Deleted ${newPath} successfully`);
}


// update output directory
// ----------------------------------
if (!fs.existsSync(targetPath) && fs.existsSync(currPath)) {
    fs.writeFileSync(targetPath, '');
    console.log('\x1b[36m%s\x1b[0m', `--> Created ${targetPath} successfully`);
}

// change the folder name to what you want
// ----------------------------------
if (fs.existsSync(currPath)) {
    fs.renameSync(currPath, newPath);
    console.log('\x1b[36m%s\x1b[0m', `--> Successfully renamed the directory to "my-package"`);


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

                const result = data.replace(/\/_next\//g, '/custom-patients/_next/');

                fs.writeFile(file, result, 'utf8', function (err) {
                    if (err) return console.log(err);
                });

                // delete some files
                if ( file.indexOf( '404.html' ) ) {
                    fs.rm( getPackageFilePath('404.html'), { force: true }, (err) => {
                        if (err) return console.log(err);
                    });  
                    if ( index === 0 ) console.log('\x1b[36m%s\x1b[0m', `--> Deleted ${getPackageFilePath('404.html')} successfully`);
                }
                if ( file.indexOf( '.nojekyll' ) ) {
                    fs.rm( getPackageFilePath('.nojekyll'), { force: true }, (err) => {
                        if (err) return console.log(err);
                    });  
                    if ( index === 0 ) console.log('\x1b[36m%s\x1b[0m', `--> Deleted ${getPackageFilePath('.nojekyll')} successfully`);
                }
                

            });
   

        });

        //console.log(files);

        // (Asynchronous) delete unnecessary files and folders
        // ----------------------------------
        fs.rm( getPackageFilePath('server/'), { recursive: true }, (err) => {
            if (err) return console.log(err);
        });


    });

}



