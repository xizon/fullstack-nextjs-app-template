/**
 * express server
 */
const PORT = 8001;
const HOST_NAME = 'localhost';

/**
 * static files directory
 */
const STATIC_FILES_DIR = 'temp_backup';
const SAVE_TO_DIR = 'uploads';


/**
 * request
 */
const REQUEST_MAX_LIMIT = '200mb';


/**
 * file names
 */
const ARCHIVE_FILE_NAME = 'archive.json';



/**
 * i18n
 */
const LANG = {
    en: {
        serverRun: '> Server on http://%s:%s',
        sendOk: 'OK',
        noFile: 'No file selected',
        uploadedRes: ' is uploaded',
        delete: '--> Deleted "%s" successfully',
        download: '--> Downloaded "%s" completed',
        extracted:  '--> Extracted "%s" to "%s" successfully'
    }
}

module.exports = {
    PORT,
    HOST_NAME,
    STATIC_FILES_DIR,
    SAVE_TO_DIR,
    REQUEST_MAX_LIMIT,
    ARCHIVE_FILE_NAME,
    LANG
}     
