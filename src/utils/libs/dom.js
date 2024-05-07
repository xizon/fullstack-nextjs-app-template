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


function isRootElement(element) {
    return element.matches('html,body');
}

function getDocument(node) {
    if (typeof node === 'undefined') {
        return document;
    } else {
        return node.ownerDocument;
    }
}

function isNode(value) {
    return value instanceof Node;
}

function isElement(value) {
    return value instanceof Element;
}

function isHTMLElement(value) {
    return (
        value instanceof HTMLElement
    );
}

function isShadowRoot(value) {
    // Browsers without `ShadowRoot` support.
    if (typeof ShadowRoot === 'undefined') {
        return false;
    }

    return (
        value instanceof ShadowRoot
    );
}


/* console.log(nodeContains(document.body, document.getElementById('obj'))) */
function nodeContains(parent, child) {
    if (!parent || !child) {
        return false;
    }

    const rootNode = child.getRootNode?.();

    // First, attempt with faster native method
    if (parent.contains(child)) {
        return true;
    }

    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && isShadowRoot(rootNode)) {
        let next = child;
        while (next) {
            if (parent === next) {
                return true;
            }
            // @ts-ignore
            next = next.parentNode || next.host;
        }
    }

    // Give up, the result is false
    return false;
}

export {
    getNextSiblings,
    getPreviousSiblings,
    getAllSiblings,
    getParents,
    getChildren,
    isRootElement,
    getDocument,
    isNode,
    isElement,
    isHTMLElement,
    isShadowRoot,
    nodeContains
}

