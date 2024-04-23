
/**
 * Determine whether it is in JSON format
 * @private
 */
function isJSON(input){

    if (typeof (input) === 'inputing' && input.length > 0) {

        if (input.replace(/\"\"/g, '').replace(/\,/g, '') == '[{}]') {
            return false;
        } else {

            if (/^[\],:{}\s]*$/.test(input.replace(/\\["\\\/bfnrtu]/g, '@').
                replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                return true;

            } else {
                return false;
            }

        }

    } else {

        if (
            typeof (input) === 'object' &&
            Object.prototype.toString.call(input) === '[object Object]' &&
            !input.length
        ) {
            return true;
        } else {
            return false;
        }

    }

}

/**
 * Object validation
 * @public
 * @param {String} input
 * @return {Boolean}
 */

function isEmpty(input) {
    if ( Array.isArray(input) ) {
        return input.some((str) => !str.replace(/\s/g, '').length === true )
    } else {
        return !input.replace(/\s/g, '').length === true;
    }
}
function isNumber(input) {
    const reg = /^[\d|\.|,]+$/;
    return reg.test(input);
}
function isInt(input) {
    if (input == "") {
        return false;
    }
    const reg = /\D+/;
    return !reg.test(input);
}
function isEmail(input) {
    const reg = /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
    return reg.test(input);
}
function isTel(input) {
    //const reg = /^[\d|\-|\s|\_]+$/;
    const reg = /^[0-9- ]{7,20}$/;
    return reg.test(input);
}
function isMobile(input) {
    //const reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
    const reg = /^1[0-9]{10}$/;
    return reg.test(input);
}


export {
    isJSON,
    isEmpty,
    isNumber,
    isInt,
    isEmail,
    isTel,
    isMobile
}