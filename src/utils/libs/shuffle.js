/**
 * Generating non-repeating random numbers
 * 
 * @param {Array} arr 
 * @returns new array
 */
function shuffle(arr) {
    let i = arr.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

    }

    return arr;
}



export default shuffle;