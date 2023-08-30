/**
 * Convert Tree
 * @param {Array} arr                    - Flat array
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


/**
 * Flat tree
 * @param {Array} arr                    - Hierarchical array
 * @returns Array
 */
function flatTree(arr) {
    const flatData = ({...rest}) => {
        const { children = [] } = rest;
        return [{...rest}, ...children.flatMap(flatData)];
    };
    let result = arr.flatMap(flatData);

    //remove children from item
    result = result.map((item) => {
        delete item.children;
        return item;

    });

    return result;
}


/**
 * Add depth to each item in the tree
 * @param {Array} arr                    - Hierarchical array
 * @param  {?String | ?Number} parentId  - Parent id
 * @param  {?String} keyId               - Key value of id.
 * @param  {?String} keyParentId         - Key value of parent id.
 * @param  {?Number} depth               - Depth of the item.
 * @returns 
 */
function addTreeDepth(arr, parentId = '', keyId = 'id', keyParentId = 'parent_id', depth = 0) {
    arr.forEach((item) => {
        item.depth = depth;
        // Query all child nodes by parent node ID
        if (item.children && item.children.length > 0) {
            addTreeDepth(item.children, item[keyId], keyId, keyParentId, ++depth);
        } else {
            depth = 0;
        }
    });
}



/**
 * Add indent placeholder
 * @param {Array} arr                    - Flat array
 * @param  {?String} placeholder         - String of placeholder
 * @param  {?String} lastPlaceholder     - Last String of placeholder
 * @param  {?String} keyName             - Key value of name.
 * @returns Array
 */
function addTreeIndent(arr, placeholder = '&nbsp;&nbsp;&nbsp;&nbsp;', lastPlaceholder = '', keyName = 'label') {
    arr.forEach((item) => {
        let indent = ''; 
        if (item.depth) {
            Array(item.depth).fill(0).forEach((k, i) => {
                indent += placeholder;
                if (i === item.depth-1) {
                    item[keyName] = indent + lastPlaceholder + item[keyName];
                }
            });
        }
    });
}

module.exports = {
    convertTree,
    flatTree,
    addTreeDepth,
    addTreeIndent
};

