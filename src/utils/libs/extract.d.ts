/**
 * Extract the contents of square brackets
 * @param {String} str    =>  input string. such as '[1,2] [f][c]'
 * @returns {Array|String} such as: ['1,2','f','c']
 */
export function extractContentsOfBrackets(str: string, commaSeparated?: boolean): any[] | string;
/**
 * Extract the contents of curly braces
 * @param {String} str    =>  input string. such as '{1,2} {f}{c}'
 * @returns {Array|String} such as: ['1,2','f','c']
 */
export function extractContentsOfBraces(str: string, commaSeparated?: boolean): any[] | string;
/**
 * Extract the contents of parentheses
 * @param {String} str    =>  input string. such as '(1,2) (f)(c)'
 * @returns {Array|String} such as: ['1,2','f','c']
 */
export function extractContentsOfParentheses(str: string, commaSeparated?: boolean): any[] | string;
