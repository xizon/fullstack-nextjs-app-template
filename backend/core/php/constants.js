/**
 * express server
 */
const PORT = 4000;
const HOST_NAME = 'localhost';

/**
 * for view engine
 */
const TEMPLATE_FILES_PATH = './public/server/';


/**
 * i18n
 */
const LANG = {
    en: {
        serverRun: '> PHP server listening at http://%s:%s'
    }
}




module.exports = {
    PORT,
    HOST_NAME,
    TEMPLATE_FILES_PATH,
    LANG
}     
