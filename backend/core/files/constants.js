/**
 * express server
 */
const PORT = 7001;
const HOST_NAME = 'localhost';

/**
 * static files directory
 */
const STATIC_FILES_DIR = 'api';


/**
 * i18n
 */
const LANG = {
    en: {
        serverRun: '> Server on http://%s:%s',
        sendOk: 'OK',
        noFile: 'No file selected',
        uploadedRes: ' is uploaded',
        delete: '--> Deleted "%s" successfully'
    }
}




module.exports = {
    PORT,
    HOST_NAME,
    STATIC_FILES_DIR,
    LANG
}     
