
/**
 * HTML entities encode
 *
 * @param {string} str Input text
 * @return {string} Filtered text
 */
 export function htmlEncode(str) {

    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));

}


/**
 * HTML entities decode
 *
 * @param {string} str Input text
 * @return {string} Filtered text
 */
export function htmlDecode(str) {

    let res = '';
    const entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"'],
        ['#60', '<'],
        ['#62', '>']
    ];

    for (let i = 0, max = entities.length; i < max; i++) {
        str = str.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
    }
    res = str;

    return res;

}




/**
 * JSON string decode
 *
 * @param {string} str Input text
 * @return {string} Filtered text
 */
 export function jsonStrDecode(str) {
    return str.replace(/(?:\r\n)/g, "<br />");
}


