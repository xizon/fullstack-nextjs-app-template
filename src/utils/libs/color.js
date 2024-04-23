

/**
 * Converts an RGB color value to HSL
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function RGBToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
}

/**
 * Converts an HSL color value to RGB
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function HSLToRGB(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
}

/**
 * Generate a gradient effect based on a color
 * 
 * @param {Array} colorStart   The RGB representation
 * @param {Number} target      A number, gradient variable
 * @param {Number} diff        A number, gradient variable
 * @returns  {Array}           The RGB representation
 */
function generateGradient(colorStart, target, diff){
    const start = colorStart,
          end = start;    
    let alpha = 0;
    let c = [
        Math.round(end[0] * alpha + (1 - alpha) * start[0] + target+diff),
        Math.round(end[1] * alpha + (1 - alpha) * start[1] + (target+diff)),
        Math.round(end[2] * alpha + (1 - alpha) * start[2] + (target))
    ];

    return `${c[0]},${c[1]},${c[2]}`.split(',');
}


export {
    RGBToHSL,
    HSLToRGB,
    generateGradient
};