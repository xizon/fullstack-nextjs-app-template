/**
 * Batch modify the HTML extension of the generated static pages
 */

const path = require('path');
const glob = require('glob');
const fs = require('fs');


// get a list of the names of all files present in a directory
const outDir = path.resolve(__dirname, '../out/**/*.html.html');
glob(outDir, function (err, files) {
    if (err) {
        console.log(err);
        return;
    }
    
    files.forEach(function (file) {

        const newpath = file.replace('.html.html', '.html');
        fs.rename(file, newpath, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('\x1b[36m%s\x1b[0m', `--> ${newpath.split( '/' ).pop()} is ready. `);
        });
    });

});


