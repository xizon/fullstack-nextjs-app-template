const { fileSizeMegabytes } = require('./computeds');

/**
 * express server
 */
const PORT = 4001;

/**
 * static files directory
 */
const STATIC_FILES_DIR = 'plugins';


/**
 * request
 */
const REQUEST_MAX_LIMIT = '200mb';


/**
 * upload
 */
const UPLOAD_MAX_SIZE = fileSizeMegabytes(10); //10MB


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
    REQUEST_MAX_LIMIT,
    UPLOAD_MAX_SIZE,
    LANG
}     
