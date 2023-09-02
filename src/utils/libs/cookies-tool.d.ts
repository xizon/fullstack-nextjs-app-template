/**
 * Set cookie
 * @param {String} name    Sets the name of the cookie
 * @param {String} value   Set a value
 * @param {?String} path    A String indicating the path where the cookie is visible.
 * @param {?String|?Number} days    Define when the cookie will be removed.
 *                         Value must be a Number which will be interpreted as days from time
 *                         of creation or a Date instance. If omitted, the cookie becomes a session cookie.
 */
export function setCookie(name: string, value: string, path?: string | null, days?: (string | (number | null)) | null): void;
/**
 * Get cookie
 * @param {String} name    Sets the name of the cookie
 */
export function getCookie(name: string): string;
/**
 * Delete cookie
 * @param {String} name    Sets the name of the cookie
 * @param {?String} path    A String indicating the path where the cookie is visible.
 */
export function delCookie(name: string, path?: string | null): void;
