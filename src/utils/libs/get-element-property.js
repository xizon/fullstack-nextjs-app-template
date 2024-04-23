
/**
 * Get the -webkit-transition-duration property
 *
 * @param {Element} el - A DOM node containing one selector to match against.
 * @return {Number}    - Returns a pure number.
 */
function getTransitionDuration(el) {

    if (typeof el === typeof undefined) {
        return 0;
    }


    let style = window.getComputedStyle(el),
        duration = style.webkitTransitionDuration,
        delay = style.webkitTransitionDelay;

    if (typeof duration != typeof undefined) {
        // fix miliseconds vs seconds
        duration = (duration.indexOf("ms") > -1) ? parseFloat(duration) : parseFloat(duration) * 1000;
        delay = (delay.indexOf("ms") > -1) ? parseFloat(delay) : parseFloat(delay) * 1000;

        return duration;
    } else {
        return 0;
    }

}



/**
 * Get an object's absolute position on the page
 *
 * @param {Element} el - A DOM node containing one selector to match against.
 * @return {Json}    - An object containing the properties top and left. 
 */
function getAbsoluteCoordinates(el) {

    let windowWidth = window.innerWidth,
        leftPos = null,
        topPos = null;

    if (!document.getElementsByTagName('body')[0].className.match(/rtl/)) {
        leftPos = (el.offsetLeft == 0) ? el.parentElement.offsetLeft : el.offsetLeft;
        topPos = (el.offsetTop == 0) ? el.parentElement.offsetTop : el.offsetTop;
    } else {

        // width and height in pixels, including padding and border
        // Corresponds to outerWidth(), outerHeight()
        leftPos = (el.offsetLeft == 0) ? (windowWidth - (el.parentElement.offsetLeft + el.parentElement.offsetWidth)) : (windowWidth - (el.offsetLeft + el.offsetWidth));
        topPos = (el.offsetTop == 0) ? (windowWidth - (el.parentElement.offsetTop + el.parentElement.offsetHeight)) : (windowWidth - (el.offsetTop + el.offsetHeight));
    }


    return {
        'left': leftPos,
        'top': topPos
    };

}


/**
 * Get the current coordinates of the first element in the set of matched elements, relative to the document.
 *
 * @param {Element} el - A DOM node containing one selector to match against.
 * @return {Json}      - An object containing the properties top and left. 
 */
function getOffset(el) {
    let res = { top: 0, left: 0 };

    const box = el.getBoundingClientRect();
    let top = 0,
        left = 0;

    //Include scrollbar and border
    top = box.top + window.pageYOffset - document.documentElement.clientTop;
    left = box.left + window.pageXOffset - document.documentElement.clientLeft;

    res = { top: top, left: left };
    return res;

}


/**
 * Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.
 *
 * @param {Element} el - A DOM node containing one selector to match against.
 * @return {Json}      - An object containing the properties top and left.
 */
function getPosition(el) {
    let res = { top: 0, left: 0 };

    let top = el.offsetTop ? el.offsetTop : 0,
        left = el.offsetLeft ? el.offsetLeft : 0;

    res = { top: top, left: left };

    return res;
}

/**
 * Get the absolute position of the stage element
 * 
 * @param {Element} domElement  - A DOM node
 * @param {Number | String} left     - left offset
 * @param {Number | String} top      - top offset
 * @returns 
 */
function getAbsolutePositionOfStage(domElement, left = 0, top = 0) {
    if (!parseInt(left)) {
        left = 0;
    } else {
        left = parseInt(left);
    }
    if (!parseInt(top)) {
        top = 0;
    } else {
        top = parseInt(top);
    }

    const box = domElement.getBoundingClientRect();
    const body = document.body;
    const docElem = document.documentElement;
    const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    const clientTop = docElem.clientTop || body.clientTop || 0;
    const clientLeft = docElem.clientLeft || body.clientLeft ||0;

    const attr = {};
    attr.y = box.top +  scrollTop - clientTop + top; 
    attr.x = box.left + scrollLeft - clientLeft + left;
    attr.width = box.width;
    attr.height = box.height;

    return attr;
}



export { 
    getTransitionDuration, 
    getAbsoluteCoordinates, 
    getOffset, 
    getPosition,
    getAbsolutePositionOfStage
}