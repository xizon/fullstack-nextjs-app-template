/**
 * Quick Sort
 *
 * @param {Array} arr input array
 * @return {String} new array
 */
function quickSort(arr) {
    const sortedArray = quickSortRecursion(arr, 0, arr.length - 1);
    return sortedArray;
}


function quickSortRecursion(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) { 
            quickSortRecursion(items, left, index - 1);
        }
        if (index < right) {
            quickSortRecursion(items, index, right);
        }
    }
    return items;
}



function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}


function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], 
        i       = left, 
        j       = right; 
        
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}


export {
    quickSort
}