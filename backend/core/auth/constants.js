/**
 * express server
 */
const PORT = 9001;
const HOST_NAME = 'localhost';
const accessTokenSecret = 'Custom_MS_Key_123!';
const algorithms = ["HS256"];

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
    algorithms
}     
