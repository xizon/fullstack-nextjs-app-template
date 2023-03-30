/**
 * Generate css theme files
 */
const fs = require('fs');
const path = require('path');
const sass = require("sass");
const cssEntry = path.resolve(__dirname, '../src/styles/theme/style.scss');

const cssFolder = path.resolve(__dirname, '../public/static-dist/css/')
if (!fs.existsSync(cssFolder)){
    fs.mkdirSync(cssFolder, { recursive: true });
}

//
const result = sass.compile( cssEntry );
const cssDev = result.css;

//
const compressed = sass.compile(cssEntry, {style: "compressed"});
const cssProd = compressed.css;

//

const out = [
    { path: path.resolve(__dirname, '../public/static-dist/css/theme.css'), str: `
/*------------------------------------------------------------------
!!!!! GENERATED CODE -- DO NOT EDIT!
------------------------------------------------------------------*/
${cssDev}
` },
    { path: path.resolve(__dirname, '../public/static-dist/css/theme.min.css'), str: `${cssProd}` }
];
out.forEach( function(file) {
    fs.writeFile(file.path, file.str, 'utf8', function (err) {
        if (err) return console.log(err);

        console.log('\x1b[36m%s\x1b[0m', `--> Generate "${file.path.replace(path.resolve(__dirname, '../'), '')}" successfully`);
    });

});

