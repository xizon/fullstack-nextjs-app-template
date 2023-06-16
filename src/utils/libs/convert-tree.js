/**
 * Convert Tree
 * @param {Array} arr                    - Input array to convert
 * @param  {?String | ?Number} parentId  - Parent id
 * @param  {?String} keyId               - Key value of id.
 * @param  {?String} keyParentId         - Key value of parent id.
 * @returns Array
 */
function convertTree(arr, parentId = '', keyId = 'id', keyParentId = 'parent_id') {
    
    if( !parentId ) {
        
        // If there is no parent id (when recursing for the first time), all parents will be queried
        return arr.filter(item => !item[keyParentId]).map(item => {
            // Query all child nodes by parent node ID
            item.children = convertTree(arr, item[keyId], keyId, keyParentId);
            return item;
        })
    } else {
        return arr.filter(item => item[keyParentId] === parentId).map(item => {
            // Query all child nodes by parent node ID
            item.children = convertTree(arr, item[keyId], keyId, keyParentId);
            return item;
        })
    }
}

module.exports = convertTree;

