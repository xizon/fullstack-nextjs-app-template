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
 * Get all depth
 * @param {Object} node 
 * @returns Number
 */
function getAllDepth(arr) {
    const count = (children) => {
        return children.reduce((depth, child) => {
            return Math.max(depth, 1 + count(child.children)); // increment depth of children by 1, and compare it with accumulated depth of other children within the same element
        }, 0); //default value 0 that's returned if there are no children
    }
   return count(arr);
}




/**
* Add depth to each item in the tree
* @param {Array} arr       - Hierarchical array
* @param  {?String} keyId               - Key value of id.
* @param  {?String} keyParentId         - Key value of parent id.
* @param  {?Number} depth               - Depth of the item.
* @returns Number
*/
function addTreeDepth(arr, keyId = 'id', parentItem = '', depth = 0) {
   return arr.reduce((acc, el) => {
       const { children, ...otherProps } = el;
       acc.push({ ...otherProps, parentItem, depth });
       if (children) {
           return acc.concat(addTreeDepth(children, keyId, el[keyId], depth + 1));
       }
       return acc;
   }, []);
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

export {
    getAllDepth,
    convertTree,
    flatTree,
    addTreeDepth,
    addTreeIndent
};

