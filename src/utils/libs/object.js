
/**
 * Remove Duplicate objects from JSON Array
 * @param {Array} obj 
 * @param {String} fieldName 
 */
function removeArrDuplicateItems(obj, fieldName) {
    // Ensure input is an array
    if (!Array.isArray(obj)) return [];

    // fieldName must be provided and must exist on at least one item,
    // otherwise do not perform deduplication
    if (!fieldName || !obj.some(item => item && fieldName in item)) {
        return obj;
    }

    const clean = obj.filter((item, index, self) =>
        index === self.findIndex(t =>
            // fieldName must be equal
            t[fieldName] === item[fieldName] &&
            // Objects must be fully identical to be considered duplicates
            JSON.stringify(t) === JSON.stringify(item)
        )
    );

    return clean;
}




/**
 * Deep clone
 * @param {*} obj 
 */
function deepClone(obj) {
    if (Array.isArray(obj)) {
        return (obj).map((item) => deepClone(item));
    } else if (typeof obj === 'object' && obj !== null) {
        const clone = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deepClone(obj[key]);
            }
        }
        return clone;
    } else {
        return obj;
    }
};


/**
 * Flat Data
 * @param {*} data 
 * @returns 
 */
function flatData(data) {
    const result = [];
    const iterate = (obj) => {
        if (!obj) {
            return;
        }
        obj.forEach((item) => {
            result.push(item);
            if (item.children) {
                iterate(item.children);
            }

            // delete current item children
            delete item.children;

        })
    }

    iterate(data);
    return result;
};


export {
    removeArrDuplicateItems,
    deepClone,
    flatData
}