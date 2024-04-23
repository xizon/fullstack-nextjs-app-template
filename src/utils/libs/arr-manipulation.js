/**
 * Manipulate a JSON property in an array
 *
 * @param {Array} inputData   Raw array.
 * @param {Number} curIndex   Target index of array.
 * @param {Object} nodes   The field value to be modified, using JSON format.
 * @return {Array} 
 */
/*
Example:

const data = [
    {
        user_name: 'Test 1',
        role_id: 'value-2',
        role_name: ''
    },
    {
        user_name: 'Test 2',
        role_id: 'value-3',
        role_name: ''
    },
    {
        user_name: 'Test 3',
        role_id: 'value-4',
        role_name: ''
    }
];

console.log(updateJsonNode(data, 1, {
    role_id: 'hhhhhhh'
}));

*/
function updateJsonNode(inputData, curIndex, nodes){

    return inputData.map((v, i) => {
        if (i === curIndex) {

            const params = Object.keys(nodes);
            params.forEach((key) => {
                delete v[key];
            });

            const { ...rest } = v;
            return {
                ...nodes,
                ...rest
            }
        } else {
            return v;
        }

    });
}



export {
    updateJsonNode
};