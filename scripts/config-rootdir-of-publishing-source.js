/**
 * Configure the root directory of publishing source 
 */

/*
Batch replace the following fields:

"/_next     ==>  "/<package_name>/_next
"/assets    ==>  "/<package_name>/assets
"/index     ==>  "/<package_name>/index
"/post      ==>  "/<package_name>/post
"/about     ==>  "/<package_name>/about
"/otherpagename     ==>  "/<package_name>/otherpagename
"/"         ==>  "/<package_name>/"          ----------    [only .html files]
href:"/"    ==>  href:"/<package_name>/"     ----------    [only .js files]

*/

const path = require('path');
const glob = require('glob');
const fs = require('fs');
const configPath = path.resolve(__dirname, '../package.json');
const json = JSON.parse(fs.readFileSync(configPath));



function getExtension(path) {

    // extract file name from full path ...
    // (supports `\\` and `/` separators)
    const basename = path.split(/[\\/]/).pop();

    // get last position of `.`
    const pos = basename.lastIndexOf(".");

    // if file name is empty or ...
    //  `.` not found (-1) or comes first (0)
    if (basename === "" || pos < 1) return "";

    // extract extension ignoring `.`
    return basename.slice(pos + 1).toLowerCase();            
}



// change the root directory for all files
const iteratesPackagePath = path.resolve(__dirname, '../out/**/**.+(html|js|css|json)');
if (fs.existsSync(path.resolve(__dirname, '../out'))) {


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

            const filename = file.substring(file.lastIndexOf('/')+1);
            const filepath = file.replace(path.resolve(__dirname, '../'), '');

            // (Asynchronous) change all files' absolute URL
            // ----------------------------------
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) return console.log(err);

                const ext = getExtension(file);
                let result = data.replace(/\"\/_next/g, `"/${json.name}/_next`)
                                .replace(/\"\/assets/g, `"/${json.name}/assets`)
                                .replace(/\"\/index/g, `"/${json.name}/index`)
                                .replace(/\"\/post/g, `"/${json.name}/post`)
                                .replace(/\"\/about/g, `"/${json.name}/about`);


                if ( ext === 'html' ) result = result.replace(/\"\/\"/g, `"/${json.name}/"`);
                if ( ext === 'js' ) result = result.replace(/href\:\"\/\"/g, `href:"/${json.name}/"`);

   
                fs.writeFile(file, result, 'utf8', function (err) {
                    if (err) return console.log(err);

                    console.log('\x1b[36m%s\x1b[0m', `--> Rewrite "${filepath}" successfully`);
                });

          


            });


        });


    });

}
