/**
 * Get the -webkit-transition-duration property
 *
 * @param {Element} el - A DOM node containing one selector to match against.
 * @return {Number}    - Returns a pure number.
 */
export function getTransitionDuration(el: Element): number;
/**
 * Get an object's absolute position on the page
 *
 * @param {Element} el - A DOM node containing one selector to match against.
 * @return {Json}    - An object containing the properties top and left.
 */
export function getAbsoluteCoordinates(el: Element): Json;
/**
 * Get the current coordinates of the first element in the set of matched elements, relative to the document.
 *
 * @param {Element} el - A DOM node containing one selector to match against.
 * @return {Json}      - An object containing the properties top and left.
 */
export function getOffset(el: Element): Json;
/**
 * Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.
 *
 * @param {Element} el - A DOM node containing one selector to match against.
 * @return {Json}      - An object containing the properties top and left.
 */
export function getPosition(el: Element): Json;
/**
 * Get the absolute position of the stage element
 *
 * @param {Element} domElement  - A DOM node
 * @param {Number | String} left     - left offset
 * @param {Number | String} top      - top offset
 * @returns
 */
export function getAbsolutePositionOfStage(domElement: Element, left?: number | string, top?: number | string): {
    y: number;
    x: number;
    width: number;
    height: number;
};
