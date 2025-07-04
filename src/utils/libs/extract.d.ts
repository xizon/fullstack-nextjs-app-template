/**
 * Determine whether an extractor is included
 * @param {String} str    =>  input string. such as 'a[1], b[2]', '{a[1]}'
 * @returns {Boolean}
 */
declare function extractorExist(str: string | undefined | null): boolean;
/**
 * Extract the contents of square brackets
 * @param {String} str    =>  input string. such as '[1,2] [f][c]'
 * @param {Boolean} commaSeparated    =>  flag to determine if the result should be comma separated or not
 * @returns {Array<string>|string} such as: ['1,2','f','c']
 */
declare function extractContentsOfBrackets(str: string, commaSeparated?: boolean): Array<string> | string;
/**
 * Extract the contents of curly braces
 * @param {String} str    =>  input string. such as '{1,2} {f}{c}'
 * @param {Boolean} commaSeparated    =>  flag to determine if the result should be comma separated or not
 * @returns {Array<string>|string} such as: ['1,2','f','c']
 */
declare function extractContentsOfBraces(str: string, commaSeparated?: boolean): Array<string> | string;
/**
 * Extract the contents of parentheses
 * @param {String} str    =>  input string. such as '(1,2) (f)(c)'
 * @param {Boolean} commaSeparated    =>  flag to determine if the result should be comma separated or not
 * @returns {Array<string>|string} such as: ['1,2','f','c']
 */
declare function extractContentsOfParentheses(str: string, commaSeparated?: boolean): Array<string> | string;
/**
 * Parses a braces-separated string of `{label[value]}` pairs into an array of objects.
 *
 * Example:
 *   Input: "{Poor[c]}{Sub-option 4[c-2]}{Empty[]}"
 *   Output: [
 *     { label: "Poor", value: "c" },
 *     { label: "Sub-option 4", value: "c-2" },
 *     { label: "Empty", value: "" }
 *   ]
 *
 * @param {string} str - The input string containing one or more `{label[value]}` segments.
 * @returns {Array<{label: string, value: string}>} - An array of extracted label-value objects.
 */
declare function extractContentsOfMixedCharactersWithBraces(str: string): {
    label: string;
    value: string | number;
}[];
/**
 * Parses a comma-separated string of `label[value]` pairs into an array of objects.
 *
 * Example:
 *   Input: "Poor[c],Sub-option 4[c-2],Empty[]"
 *   Output: [
 *     { label: "Poor", value: "c" },
 *     { label: "Sub-option 4", value: "c-2" },
 *     { label: "Empty", value: "" }
 *   ]
 *
 * @param {string} str - A string containing label-value pairs in the format `label[value]`, separated by commas.
 * @returns {Array<{ label: string, value: string }>} - An array of parsed objects.
 */
declare function extractContentsOfMixedCharactersWithComma(str: string): {
    label: string;
    value: string | number;
}[];
export { extractorExist, extractContentsOfBrackets, extractContentsOfBraces, extractContentsOfParentheses, extractContentsOfMixedCharactersWithBraces, extractContentsOfMixedCharactersWithComma };
