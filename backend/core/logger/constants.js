/**
 * express server
 */
const PORT = 6001;
const HOST_NAME = 'localhost';


/**
 * i18n
 */
const LANG = {
    en: {
        serverRun: '> Server on http://%s:%s',
        sendOk: 'OK'
    }
}




module.exports = {
    PORT,
    HOST_NAME,
    LANG
}     
