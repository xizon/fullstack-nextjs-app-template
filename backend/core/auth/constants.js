

/**
 * express server
 */
const PORT = 9001;
const HOST_NAME = 'localhost';
const ACCESS_TOKEN_SECRET = 'Custom_MS_Key_123!';
const ALGORITHMS = ["HS256"];


/**
 * key directory
 */
const MS_KEY_FILE_NAME = 'secret.key';

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
    ACCESS_TOKEN_SECRET,
    ALGORITHMS,
    MS_KEY_FILE_NAME
}     
