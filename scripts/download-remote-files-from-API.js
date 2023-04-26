/**
 * Download remote images from API
 */

const apiUrls = require('../src/config/apiUrls');

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const CoreUtils = require('../src/utils/CoreUtils');

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

axios.get(apiUrls.RECEIVE_DEMO_LIST).then((response) => {
    
    const posts = response.data;
    const allFiles = CoreUtils.return('matchAllFilesUrls', JSON.stringify(posts));
    allFiles.forEach((filepath) => {

        //
        const publicDir = '../public/';
        const newFilename = CoreUtils.return('renameFile', filepath);
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
