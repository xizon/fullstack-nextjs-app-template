
/**
 * Set cookie
 * @param {String} name    Sets the name of the cookie
 * @param {String} value   Set a value
 * @param {?String} path    A String indicating the path where the cookie is visible.
 * @param {?String|?Number} days    Define when the cookie will be removed. 
 *                         Value must be a Number which will be interpreted as days from time 
 *                         of creation or a Date instance. If omitted, the cookie becomes a session cookie.
 */
/* 
Example:

setCookie('SITE_DATA_LOGIN_COOKIE', 'xxxx-xxxx-xxxx-xxxx', '/', 14);
setCookie('SITE_DATA_LOGIN_COOKIE', 'xxxx-xxxx-xxxx-xxxx', '/', 'Session');

*/
function setCookie(name, value, path = '/', days = 30) {
    const exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${exp.toGMTString()};path=${path}`;
}




/**
 * Get cookie
 * @param {String} name    Sets the name of the cookie
 */
function getCookie(name) {
    let arr;
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) {
        return arr[2];
    } else {
        return null;
    }

}


/**
 * Delete cookie
 * @param {String} name    Sets the name of the cookie
 * @param {?String} path    A String indicating the path where the cookie is visible.
 */
function delCookie(name, path = '/') {
    const cval = getCookie(name);
    if (cval != null) {
        document.cookie = `${name}=${cval};expires=${new Date(0).toUTCString()};path=${path}`;
    }
} 


export {
    setCookie,
    getCookie,
    delCookie
}