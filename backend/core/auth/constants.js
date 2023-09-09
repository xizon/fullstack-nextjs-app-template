const path = require('path');
const fs = require('fs');

/**
 * express server
 */
const PORT = 9001;
const HOST_NAME = 'localhost';
const accessTokenSecret = 'Custom_MS_Key_123!';
const algorithms = ["HS256"];


/**
 * key directory
 */
const MS_KEY_FILE_NAME = 'secret.key';

const getSecret = async () => {
    let key = accessTokenSecret;
    const keyPath = path.join(__dirname, `../../${MS_KEY_FILE_NAME}`);
    if (fs.existsSync(keyPath)) {
        const data = await fs.promises.readFile(keyPath, "binary");
        key = Buffer.from(data);
    }

    return key;

};



/**
 * i18n
 */
const LANG = {
    en: {
        serverRun: '> Server on http://%s:%s',
        sendOk: 'OK',
        unauthorized: 'Unauthorized'
    }
}




module.exports = {
    PORT,
    HOST_NAME,
    LANG,
    accessTokenSecret,
    algorithms,
    getSecret
}     
