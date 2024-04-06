/**
 * Get current date
 */
export type JSON = string;
/**
 * Check if the string is legitimate
 * @param {String} v
 * @returns {Boolean}
 */
export function isValidDate(v: string): boolean;
/**
 * Get last day in month
 * @param {Date | String} v
 * @param {?Number}  targetMonth
 * @returns {String}  yyyy-MM-dd
 */
export function getLastDayInMonth(v: Date | string, targetMonth?: number | null): string;
/**
 * Get first and last month day
 * @param {Number} v
 * @param {Boolean} padZeroEnabled
 * @returns  {Array}
 */
export function getFirstAndLastMonthDay(year: any, padZeroEnabled?: boolean): any[];
/**
 * Get calendar date
 * @param {Date | String} v
 * @param {Boolean} padZeroEnabled
 * @returns {String}  yyyy-MM-dd
 */
export function getCalendarDate(v: Date | string, padZeroEnabled?: boolean): string;
/**
 * Get full time
 * @param {Date | String} v
 * @param {Boolean} padZeroEnabled
 * @param {Boolean} hasSeconds
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
export function getFullTime(v: Date | string, padZeroEnabled?: boolean, hasSeconds?: boolean): string;
/**
 * Get today date
 * @returns {String}  yyyy-MM-dd
 */
export function getTodayDate(): string;
/**
 * Get current month
 * @param {Boolean} padZeroEnabled
 * @returns {Number}
 */
export function getCurrentMonth(padZeroEnabled?: boolean): number;
/**
 * Get current year
 * @returns {Number}
 */
export function getCurrentYear(): number;
/**
 * Get current date
 * @param {Boolean} padZeroEnabled
 * @typedef {String} JSON
 */
export function getCurrentDate(padZeroEnabled?: boolean): {
    today: string;
    yearStart: string;
    yearEnd: string;
};
/**
 * Get tomorrow date
 * @param {Date | String} v
 * @returns {String}  yyyy-MM-dd
 */
export function getTomorrowDate(v: Date | string): string;
/**
 * Get yesterday date
 * @param {Date | String} v
 * @returns {String}  yyyy-MM-dd
 */
export function getYesterdayDate(v: Date | string): string;
/**
 * Get next month date
 * @param {Date | String} v
 * @returns {String}  yyyy-MM-dd
 */
export function getNextMonthDate(v: Date | string): string;
/**
 * Get previous month date
 * @param {Date | String} v
 * @returns {String}  yyyy-MM-dd
 */
export function getPrevMonthDate(v: Date | string): string;
/**
 * Get next year date
 * @param {Date | String} v
 * @returns {String}  yyyy-MM-dd
 */
export function getNextYearDate(v: Date | string): string;
/**
 * Get previous year date
 * @param {Date | String} v
 * @returns {String}  yyyy-MM-dd
 */
export function getPrevYearDate(v: Date | string): string;
/**
 * Get specified date
 * @param {Date | String} v
 * @param {Number} days  The number of days forward or backward, which can be a negative number
 * @returns {String}  yyyy-MM-dd
 */
export function getSpecifiedDate(v: Date | string, days: number): string;
/**
 * Add hours
 * @param {Date | String} v
 * @param {Number} offset
 * @param {Boolean} padZeroEnabled
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
export function setDateHours(v: Date | string, offset: number, padZeroEnabled?: boolean): string;
/**
 * Add minutes
 * @param {Date | String} v
 * @param {Number} offset
 * @param {Boolean} padZeroEnabled
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
export function setDateMinutes(v: Date | string, offset: number, padZeroEnabled?: boolean): string;
/**
 * Add days
 * @param {Date | String} v
 * @param {Number} offset
 * @param {Boolean} padZeroEnabled
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
export function setDateDays(v: Date | string, offset: number, padZeroEnabled?: boolean): string;
/**
 * Convert timestamp to date
 * @param {Number} v
 * @param {Boolean} padZeroEnabled
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
export function timestampToDate(v: number, padZeroEnabled?: boolean): string;
