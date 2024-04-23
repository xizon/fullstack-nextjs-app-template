/**
 * Extract the contents of square brackets
 * @param {String} str    =>  input string. such as '[1,2] [f][c]'
 * @returns {Array|String} such as: ['1,2','f','c']
 */
function extractContentsOfBrackets(str, commaSeparated = false) {
    if (typeof str === 'undefined' || str === null || str === '') {
        return !commaSeparated ? [] : '';
    }

    const res = str.match(/[^\[]+(?=(\[ \])|\])/g);
    if (commaSeparated) {
        return res === null ? '' : res.join(',').replace(/\,+$/, '');
    } else {
        return res === null ? '' : res;
    }
    
}

/**
 * Extract the contents of curly braces
 * @param {String} str    =>  input string. such as '{1,2} {f}{c}'
 * @returns {Array|String} such as: ['1,2','f','c']
 */
function extractContentsOfBraces(str, commaSeparated = false) {
    if (typeof str === 'undefined' || str === null || str === '') {
        return !commaSeparated ? [] : '';
    }

    const res = str.match(/[^\{]+(?=(\{ \})|\})/g);
    if (commaSeparated) {
        return res === null ? '' : res.join(',').replace(/\,+$/, '');
    } else {
        return res === null ? '' : res;
    }
    
}

/**
 * Extract the contents of parentheses
 * @param {String} str    =>  input string. such as '(1,2) (f)(c)'
 * @returns {Array|String} such as: ['1,2','f','c']
 */
function extractContentsOfParentheses(str, commaSeparated = false) {
    if (typeof str === 'undefined' || str === null || str === '') {
        return !commaSeparated ? [] : '';
    }

    const res = str.match(/[^\(]+(?=(\( \))|\))/g);
    if (commaSeparated) {
        return res === null ? '' : res.join(',').replace(/\,+$/, '');
    } else {
        return res === null ? '' : res;
    }
    
}


export {
    extractContentsOfBrackets,
    extractContentsOfBraces,
    extractContentsOfParentheses
}