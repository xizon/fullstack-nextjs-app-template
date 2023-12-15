/**
 * Convert value to string separated by square brackets
 * @param {String} str  such as: 1,2,3
 * @returns {String} such as: [1][2][3]
 */
export function convertStringByCommaToValByBrackets(str: string): string;
/**
 * Convert array value to string  separated by square brackets
 * @param {Array} arr  such as: ['1','2','3']
 * @returns {String} such as: [1][2][3]
 */
export function convertArrToValByBrackets(arr: any[]): string;
/**
 * Convert value to string separated by curly braces
 * @param {String} str  such as: 1,2,3
 * @returns {String} such as: {1}{2}{3}
 */
export function convertStringByCommaToValByBraces(str: string): string;
/**
 * Convert array value to string  separated by curly braces
 * @param {Array} arr  such as: ['1','2','3']
 * @returns {String} such as: {1}{2}{3}
 */
export function convertArrToValByBraces(arr: any[]): string;
