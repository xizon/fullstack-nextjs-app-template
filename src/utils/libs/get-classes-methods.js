/**
 * Get All Methods of Classes
 * @param {Constructor} obj - Base Classes
 * @returns Array
 */

function getClassesMethods(obj) {

    const isGetter = (x, name) => (Object.getOwnPropertyDescriptor(x, name) || {}).get
    const isFunction = (x, name) => typeof x[name] === "function";
    const deepFunctions = x =>
        x && x !== Object.prototype &&
        Object.getOwnPropertyNames(x)
            .filter(name => isGetter(x, name) || isFunction(x, name))
            .concat(deepFunctions(Object.getPrototypeOf(x)) || []);
    const distinctDeepFunctions = x => Array.from(new Set(deepFunctions(x)));

    return distinctDeepFunctions(obj).filter((name) => name !== "constructor" && !~name.indexOf("__"));
}


export {
    getClassesMethods
}