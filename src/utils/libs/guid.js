
/**
 * Create GUID
 *
 * @returns {String}   - The globally-unique identifiers.
 */
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toLocaleUpperCase();
}

export default guid;

