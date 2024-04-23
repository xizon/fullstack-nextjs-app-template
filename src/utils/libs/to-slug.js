/**
 * Convert string to slug
 *
 * @param {String} str Input text
 * @return {String} Converted text
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

export default toSlug;