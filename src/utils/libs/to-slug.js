/**
 * Convert string to slug
 *
 * @param {string} str Input text
 * @return {string} Converted text
 */
function toSlug(str) {

    return str
        .toString()
        .replace(/[^\w\s\-！￥【】\u4e00-\u9eff]/gi, '')
        .replace(/\s/g, '-')
        .replace(/(\-){2,}/g, '-')
        .replace(/\-\s*$/, '')
        .toLowerCase();
};

module.exports = toSlug;