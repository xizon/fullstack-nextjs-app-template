/**
 * Format string
 * 
 * @param {String} input
 * @return {String}  
 */

// Remove all special characters except space from a string using JavaScript
function rmSpec(input) {
    return input.replace(/[^a-zA-Z0-9 \u4E00-\u9FFF]/g, "");
}

//only number and letters are allowed
function onlyNumAndLetter(input) {
    return input.replace(/[^a-zA-Z0-9 ]/g, "");
}

//remove all spaces including the middle
function rmAllSpace(input) {
    return input.replace(/\s/g, "");
}

//remove whitespace from both sides of a string.
function trimAll(input) {
    return input.replace(/(^\s+)|(\s+$)/g, "");
}

//replace multiple spaces with a single space
function multiSpacesToSingle(input) {
    return input.replace(/\s+(\W)/g, ' ');
}

//convert HTML text to plain text
function htmlToPlain(input) {
    return input.replace(/(<([^>]+)>)/ig, '');
}

//strip tags and content
function stripTagsAndContent(input) {
    return input.replace(/<\/?[^>]+(>|$)(.*?)<\/?[^>]+(>|$)/ig, '');
}


// node & browser
module.exports = {
    rmSpec,
    onlyNumAndLetter,
    rmAllSpace,
    trimAll,
    multiSpacesToSingle,
    htmlToPlain,
    stripTagsAndContent
}