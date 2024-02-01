/**
 * Get timeslots from starting and ending time
 * @param  {String} startTime  -  start time
 * @param  {String} endTime  -  ebd time
 * @param  {Number} timeInterval  -  time interval
 * @returns Array
 */
export function getTimeslots(startTime: string, endTime: string, timeInterval: number): any[];
/**
 * Get minutes between two dates
 * @param  {Date} startDate  -  start date
 * @param  {Date} endDate  -  ebd date
 * @returns Number
 */
export function getMinutesBetweenDates(startDate: Date, endDate: Date): number;
/**
 * Get minutes between two time
 * @param  {String} startTime  -  start time
 * @param  {String} endTime  -  ebd time
 * @returns Number
 */
export function getMinutesBetweenTime(startTime: string, endTime: string): string;
/**
 * Convert HH:MM:SS into minute
 * @param  {String} timeStr  -  time string
 * @returns Number
 */
export function convertTimeToMin(timeStr: string): number;
