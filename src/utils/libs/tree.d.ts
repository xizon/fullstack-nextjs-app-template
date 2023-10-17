/**
 * Get all depth
 * @param {Object} node
 * @returns Number
 */
export function getAllDepth(arr: any): any;
/**
 * Convert Tree
 * @param {Array} arr                    - Flat array
 * @param  {?String | ?Number} parentId  - Parent id
 * @param  {?String} keyId               - Key value of id.
 * @param  {?String} keyParentId         - Key value of parent id.
 * @returns Array
 */
export function convertTree(arr: any[], parentId?: (string | (number | null)) | null, keyId?: string | null, keyParentId?: string | null): any[];
/**
 * Flat tree
 * @param {Array} arr                    - Hierarchical array
 * @returns Array
 */
export function flatTree(arr: any[]): any[];
/**
* Add depth to each item in the tree
* @param {Array} arr       - Hierarchical array
* @param  {?String} keyId               - Key value of id.
* @param  {?String} keyParentId         - Key value of parent id.
* @param  {?Number} depth               - Depth of the item.
* @returns Number
*/
export function addTreeDepth(arr: any[], keyId?: string | null, parentItem?: string, depth?: number | null): any;
/**
 * Add indent placeholder
 * @param {Array} arr                    - Flat array
 * @param  {?String} placeholder         - String of placeholder
 * @param  {?String} lastPlaceholder     - Last String of placeholder
 * @param  {?String} keyName             - Key value of name.
 * @returns Array
 */
export function addTreeIndent(arr: any[], placeholder?: string | null, lastPlaceholder?: string | null, keyName?: string | null): void;
