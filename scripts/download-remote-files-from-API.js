/**
 * Download remote images from API
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * Match all files URLs from string
 *
 * @param {String} str Input text
 * @return {Array} All matching files
 */
function matchAllFilesUrls(str) {

    if (typeof str !== 'string') return [];

    let strGetAllUrls = str.match(/http[s]?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig);
    // delete a query string parameter
    strGetAllUrls = strGetAllUrls.map(item => item.split('?')[0]);
    const strImagsAll = strGetAllUrls.filter(item => /\.(jpg|jpeg|png|svg|gif|webp|264|3ga|3gp|3gpp|3g2|asf|avi|f4v|flv|gvi|ipad|iphone|ipod|m2ts|m4v|mkv|mod|mov|mp4|mpg|mpeg|mts|ogg|rm|rmvb|vob|webm|wmv|ts|aac|ac3|aif|aifc|aiff|amr|caf|flac|m4a|m4b|m4r|mid|midi|mmf|mp3|oga|ogg|ra|ram|wav|wma|csv|doc|docx|pdf|zip|rar)$/i.test(item));
    return strImagsAll;
}

/**
 * Rename a file to another from URL path
 *
 * @param {String} filepath The current file path
 * @return {String} A new file name
 */
function renameFile(filepath) {

    const fileslug = filepath.split('//').pop();
    const filename = filepath.split('/').pop();
    const extension = filename.split('.').pop().toLowerCase();

    const newFilename = filename.replace(`.${extension}`, `-${fileslug.replace(/[^a-zA-Z ]/g, "")}.${extension}`);
    return newFilename;
    
}

const mkdirsSync = function (dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
    }
}


console.log('\x1b[36m%s\x1b[0m', `--> Downloading remote files from API... `);

axios.get('https://restcountries.com/v2/all').then((response) => {
    
    const posts = response.data;
    const allFiles = matchAllFilesUrls(JSON.stringify(posts));
    allFiles.forEach((filepath) => {

        //
        const publicDir = '../public/';
        const newFilename = renameFile(filepath);
        const targetPath = path.resolve(__dirname, publicDir + 'static-remote/files/' + newFilename);

        if (!fs.existsSync(targetPath)) {
            // download remote assets
            axios.get(filepath, {
                responseType: 'arraybuffer'
            }).then((response) => {
                const b64string = Buffer.from(response.data, 'binary').toString('base64');
                let fileData = Buffer.from(b64string, 'base64');

                // from  `.next/server/...`
                mkdirsSync(path.resolve(__dirname, publicDir + 'static-remote/'));
                mkdirsSync(path.resolve(__dirname, publicDir + 'static-remote/files/'));

                //
                if (!fs.existsSync(targetPath)) {
                    fs.writeFileSync(targetPath, fileData);

                    console.log(`--> downloaded ${filepath}`);
                }
                
            });

        }
        

    });

});
