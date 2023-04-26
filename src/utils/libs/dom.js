/**
 * Dom Utilities
 * @param {HTMLElement} el      - Element
 * @param  {?String} filter      - A filter string
 * @returns HtmlElementCollection
 */
function matches(el, filter) {
    if (el && el.nodeType === 1) {
        if (filter) {
            return el.matches(filter);
        }
        return true;
    }
    return false;
}

// the next siblings
function getNextSiblings(el, filter = false || '') {
    const sibs = [];
    while (el = el.nextSibling) {
        if (matches(el, filter)) {
            sibs.push(el);
        }
    }
    return sibs;
}

// previous siblings
function getPreviousSiblings(el, filter = false || '') {
    const sibs = [];
    while (el = el.previousSibling) {
        if (matches(el, filter)) {
            sibs.push(el);
        }
    }
    return sibs;
}

// parent and get all the siblings
function getAllSiblings(el, filter = false || '') {
    const sibs = [];
    el = el.parentNode.firstChild;
    while (el = el.nextSibling) {
        if (matches(el, filter)) {
            sibs.push(el);
        }
    }
    return sibs;
}

// all parent nodes
function getParents(el, filter = false || '') {
    const parents = [];
    while (el = el.parentNode) {
        if (matches(el, filter)) {
            parents.push(el);
        }
    }
    return parents;
}

// all child nodes
function getChildren(el, filter = false || '', all = []) {
    all.push(...el.childNodes);
    for (const child of el.childNodes) {
        getChildren(child, filter, all);
    }

    const res = all.filter( item => matches(item, filter) );
    return res;
}


module.exports = {
    getNextSiblings,
    getPreviousSiblings,
    getAllSiblings,
    getParents,
    getChildren
}

