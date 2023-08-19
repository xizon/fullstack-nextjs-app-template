/**
 * express server
 */
const PORT = 7001;

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
    STATIC_FILES_DIR,
    LANG
}     
