/**
 * express server
 */
const PORT = 5001;
const HOST_NAME = 'localhost';

/**
 * i18n
 */
const LANG = {
    en: {
        serverRun: '> Server on http://%s:%s'
    }
}


/**
 * Chat
 */
const EVENT_SEND_CHAT = 'SEND_CHAT';

/**
 * Abort
 */
const EVENT_ABORT = 'DISCONNECT';



module.exports = {
    PORT,
    HOST_NAME,
    LANG,
    EVENT_SEND_CHAT,
    EVENT_ABORT
}     
