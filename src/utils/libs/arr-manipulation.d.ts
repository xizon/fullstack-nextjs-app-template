/**
 * Manipulate a JSON property in an array
 *
 * @param {Array} inputData   Raw array.
 * @param {Number} curIndex   Target index of array.
 * @param {Object} nodes   The field value to be modified, using JSON format.
 * @return {Array}
 */
export function updateJsonNode(inputData: any[], curIndex: number, nodes: any): any[];
