/**
 * Converts an RGB color value to HSL
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
export function RGBToHSL(r: number, g: number, b: number): any[];
/**
 * Converts an HSL color value to RGB
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export function HSLToRGB(h: number, s: number, l: number): any[];
/**
 * Generate a gradient effect based on a color
 *
 * @param {Array} colorStart   The RGB representation
 * @param {Number} target      A number, gradient variable
 * @param {Number} diff        A number, gradient variable
 * @returns  {Array}           The RGB representation
 */
export function generateGradient(colorStart: any[], target: number, diff: number): any[];
