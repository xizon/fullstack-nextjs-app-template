/**
 * express server
 */
const PORT = 4000;

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
    TEMPLATE_FILES_PATH,
    LANG
}     
