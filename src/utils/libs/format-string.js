/**
 * String formatting utility functions
 */

/**
 * Remove all special characters except space from a string
 * @param {string} input - The input string to process
 * @returns {string} The processed string
 */
function rmSpec(input) {
    return input?.replace(/[^a-zA-Z0-9 \u4E00-\u9FFF]/g, "");
}

/**
 * Allow only numbers and letters in a string
 * @param {string} input - The input string to process
 * @returns {string} The processed string
 */
function onlyNumAndLetter(input) {
    return input?.replace(/[^a-zA-Z0-9 ]/g, "");
}

/**
 * Remove all spaces including those in the middle
 * @param {string} input - The input string to process
 * @returns {string} The processed string
 */
function rmAllSpace(input) {
    return input?.replace(/\s/g, "");
}

/**
 * Remove whitespace from both sides of a string
 * @param {string} input - The input string to process
 * @returns {string} The processed string
 */
function trimAll(input) {
    return input?.replace(/(^\s+)|(\s+$)/g, "");
}

/**
 * Replace multiple spaces with a single space
 * @param {string} input - The input string to process
 * @returns {string} The processed string
 */
function multiSpacesToSingle(input) {
    return input?.replace(/\s+(\W)/g, ' ');
}

/**
 * Convert HTML text to plain text (Remove html tag content)
 * @param {string} input - The input string to process
 * @returns {string} The processed string
 */
/*
Examples:
console.log(htmlToPlain("<p>Hello <b>World</b></p>"));   // Hello World
*/
function htmlToPlain(input) {
    return input?.replace(/(<([^>]+)>)/ig, '');
}

/**
 * Strip HTML tags and their content 
 * !!!Important: It will remove nested tags
 * @param {string} input - The input string to process
 * @returns {string} The processed string
 */
/*
Examples:
console.log(stripTagsAndContent("<p>Hello <b>World</b></p>"));  // World
console.log(stripTagsAndContent("Hello <b>World</b>"));  // Hello
*/
function stripTagsAndContent(input) {
    return input?.replace(/<\/?[^>]+(>|$)(.*?)<\/?[^>]+(>|$)/ig, '');
}

/**
 * Remove first and last slash from a URL
 * @param {string} input - The input URL to process
 * @returns {string} The processed URL
 */
function removeFirstLastSlash(input) {
    return input?.replace(/^\/|\/$/g, '');
}

/**
 * Remove trailing slash from a URL
 * @param {string} input - The input URL to process
 * @returns {string} The processed URL
 */
function removeTrailingSlash(input) {
    return input?.replace(/\/+$/, '');
}

/**
 * Remove first slash from a URL
 * @param {string} input - The input URL to process
 * @returns {string} The processed URL
 */
function removeFirstSlash(input) {
    return input?.replace(/\//, '');
}

export {
    rmSpec,
    onlyNumAndLetter,
    rmAllSpace,
    trimAll,
    multiSpacesToSingle,
    htmlToPlain,
    stripTagsAndContent,
    removeFirstLastSlash,
    removeTrailingSlash,
    removeFirstSlash
};