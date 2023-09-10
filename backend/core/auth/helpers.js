const path = require('path');
const fs = require('fs');

const { 
    MS_KEY_FILE_NAME,
    ACCESS_TOKEN_SECRET
} = require('./constants');



/**
 * get secret key
 */
const getSecret = async () => {
    let key = ACCESS_TOKEN_SECRET;
    const keyPath = path.join(__dirname, `../../${MS_KEY_FILE_NAME}`);
    if (fs.existsSync(keyPath)) {
        const data = await fs.promises.readFile(keyPath, "binary");
        key = Buffer.from(data);
    }

    return key;

};




module.exports = {
    getSecret
}     
