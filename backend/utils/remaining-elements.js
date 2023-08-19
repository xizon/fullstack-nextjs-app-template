/**
 * Calculate the remaining elements in the array
 * @param {Array} oldArr 
 * @param {Array} newArr 
 * @returns A new array
 */
function remainingElements(oldArr, newArr){
    return oldArr.filter((oldName) => {
        const elExist = newArr.every(name => {
            if (name === oldName) return false;
            return true;
        });
        return !elExist ? false : true;
    });
}


module.exports = remainingElements;

