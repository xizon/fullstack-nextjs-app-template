
/**
 * Check if the string is legitimate
 * @param {String} v 
 * @returns {Boolean}  
 */
const isValidDate = (v) => {
    return !(String(new Date(v)).toLowerCase() === 'invalid date');
};


/**
 * Get calendar date
 * @param {Date | String} v 
 * @returns {String}  YYYY-MM-DD
 */
function dateFormat(v) {
    const date = typeof v === 'string' ? new Date(v.replace(/-/g, "/")) : v;  // fix "Invalid date in safari"
    return date;
}


/**
 * Get calendar date
 * @param {Date | String} v 
 * @param {Boolean} padZeroEnabled 
 * @returns {String}  YYYY-MM-DD
 */
function getCalendarDate(v, padZeroEnabled = true) {
    
    const date = dateFormat(v);
    const padZero = (num) => {
        if (padZeroEnabled) {
            return num < 10 ? '0' + num : num.toString();
        } else {
            return num.toString();
        }

    };
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const res = `${year}-${month}-${day}`;
    return res;
}



/**
 * Get today date
 * @returns {String}  YYYY-MM-DD
 */
function getTodayDate() {
    
    return getCalendarDate(new Date());
}



/**
 * Get tomorrow date
 * @param {Date | String} v 
 * @returns {String}  YYYY-MM-DD
 */
function getTomorrowDate(v) {
    
    const today = dateFormat(v);
    const _tomorrow = today;
    _tomorrow.setDate(_tomorrow.getDate() + 1);
    const tomorrow = getCalendarDate(_tomorrow);
    return tomorrow;
}


/**
 * Get yesterday date
 * @param {Date | String} v 
 * @returns {String}  YYYY-MM-DD
 */
function getYesterdayDate(v) {
    
    const today = dateFormat(v);
    const _yesterday = today;
    _yesterday.setDate(_yesterday.getDate() - 1);
    const yesterday = getCalendarDate(_yesterday);
    return yesterday;
}

/**
 * Get specified date
 * @param {Date | String} v 
 * @param {Number} days  The number of days forward or backward, which can be a negative number
 * @returns {String}  YYYY-MM-DD
 */
/* console.log(getSpecifiedDate(getTodayDate(), -180)); // 2023-08-27 (180 days before February 23, 202) */
function getSpecifiedDate(v, days) {
    
    const today = dateFormat(v);
    const _specifiedDay = today;
    _specifiedDay.setDate(_specifiedDay.getDate() + days);
    const specifiedDay = getCalendarDate(_specifiedDay);
    return specifiedDay;
}



/**
 * Get next month date
 * @param {Date | String} v 
 * @returns {String}  YYYY-MM-DD
 */
function getNextMonthDate(v) {
    
    const today = dateFormat(v);
    today.setMonth(today.getMonth()+1);
    
    return getCalendarDate(today);
}


/**
 * Get previous month date
 * @param {Date | String} v 
 * @returns {String}  YYYY-MM-DD
 */
function getPrevMonthDate(v) {
    
    const today = dateFormat(v);
    today.setMonth(today.getMonth()-1);
    
    return getCalendarDate(today);
}



/**
 * Get next year date
 * @param {Date | String} v 
 * @returns {String}  YYYY-MM-DD
 */
function getNextYearDate(v) {
    
    const today = dateFormat(v);
    const current = new Date(today);
    current.setFullYear(current.getFullYear() + 1);
    
    return getCalendarDate(current);
}


/**
 * Get previous year date
 * @param {Date | String} v 
 * @returns {String}  YYYY-MM-DD
 */
function getPrevYearDate(v) {
    
    const today = dateFormat(v);
    const current = new Date(today);
    current.setFullYear(current.getFullYear() - 1);
    
    return getCalendarDate(current);
}




/**
 * Get last day in month
 * @param {Date | String} v 
 * @param {?Number}  targetMonth 
 * @returns {String}  YYYY-MM-DD
 */
/*
Example: Get last day in  next month 

const _day = '2024-01-01';
const y = new Date(getNextMonthDate(_day)).getFullYear();
const m = String(new Date(getNextMonthDate(_day)).getMonth() + 1).padStart(2, '0');
const d = getLastDayInMonth(getNextMonthDate(_day), new Date(getNextMonthDate(_day)).getMonth() + 1);

const lastDayOfNextMonth = `${y}-${m}-${d}`; // 2024-02-29

*/
function getLastDayInMonth(v, targetMonth = undefined) {
    const date = dateFormat(v);
    return new Date(date.getFullYear(), typeof targetMonth !== 'undefined' ? targetMonth : date.getMonth()-1, 0).getDate();
}




/**
 * Get current year
 * @returns {Number}
 */
function getCurrentYear() {
    return new Date().getFullYear();
}


/**
 * Get current month
 * @param {Boolean} padZeroEnabled 
 * @returns {Number}
 */
function getCurrentMonth(padZeroEnabled = true) {
    const m = new Date().getMonth() + 1;
    return padZeroEnabled ? String(m).padStart(2, '0') : m;
}

/**
 * Get first and last month day
 * @param {Number} v 
 * @param {Boolean} padZeroEnabled 
 * @returns  {Array}
 */
function getFirstAndLastMonthDay(year, padZeroEnabled = true) {
    const theFirst = new Date(year, 0, 1).getDate();
    const theLast = new Date(year, 11, 31).getDate();

    const padZero = (num) => {
        if (padZeroEnabled) {
            return num < 10 ? '0' + num : num.toString();
        } else {
            return num.toString();
        }
    };

    return [padZero(theFirst), padZero(theLast)];
}


/**
 * Get current date
 * @param {Boolean} padZeroEnabled 
 * @typedef {String} JSON
 */
function getCurrentDate(padZeroEnabled = true) {
    
    const date = new Date();
    const padZero = (num) => {
        if (padZeroEnabled) {
            return num < 10 ? '0' + num : num.toString();
        } else {
            return num.toString();
        }
    };
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());


    return {
        today: `${year}-${month}-${day}`,
        yearStart: `${year}-01-01`,
        yearEnd: `${year}-12-${getLastDayInMonth(date, 12)}`
    };
}



/**
 * Get full time
 * @param {Date | String} v 
 * @param {Boolean} padZeroEnabled 
 * @param {Boolean} hasSeconds 
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
function getFullTime(v, padZeroEnabled = true, hasSeconds = true) {
    
    const date = dateFormat(v);
    const padZero = (num) => {
        if (padZeroEnabled) {
            return num < 10 ? '0' + num : num.toString();
        } else {
            return num.toString();
        }

    };
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    const res = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const res2 = `${year}-${month}-${day} ${hours}:${minutes}`;
    
    return hasSeconds ? res : res2;
}



/**
 * Add hours
 * @param {Date | String} v 
 * @param {Number} offset
 * @param {Boolean} padZeroEnabled 
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
function setDateHours(v, offset, padZeroEnabled = true) {
    const date = dateFormat(v);
    const _cur = new Date(date).setTime(new Date(date).getTime() + (offset*60*60*1000));
    return getFullTime(new Date(_cur), padZeroEnabled);
}

/**
 * Add minutes
 * @param {Date | String} v 
 * @param {Number} offset
 * @param {Boolean} padZeroEnabled 
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
 function setDateMinutes(v, offset, padZeroEnabled = true) {
    const date = dateFormat(v);
    const _cur = new Date(date).setTime(new Date(date).getTime() + (offset*60*1000));
    return getFullTime(new Date(_cur), padZeroEnabled);
}
/**
 * Add days
 * @param {Date | String} v 
 * @param {Number} offset
 * @param {Boolean} padZeroEnabled 
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
 function setDateDays(v, offset, padZeroEnabled = true) {
    const date = dateFormat(v);
    const _cur = new Date(date).setTime(new Date(date).getTime() + (offset*24*60*60*1000));
    return getFullTime(new Date(_cur), padZeroEnabled);
}

/**
 * Convert timestamp to date
 * @param {Number} v 
 * @param {Boolean} padZeroEnabled 
 * @returns {String}  yyyy-MM-dd HH:mm:ss
 */
function timestampToDate(v, padZeroEnabled = true) {
    return getFullTime(new Date(v), padZeroEnabled);
}


// node & browser
module.exports = {
    isValidDate,

    //
    getLastDayInMonth,
    getFirstAndLastMonthDay,
    getCalendarDate,
    getFullTime,

    // current
    getTodayDate,
    getCurrentMonth,
    getCurrentYear,
    getCurrentDate,
    
    // next & previous
    getTomorrowDate,
    getYesterdayDate,
    getNextMonthDate,
    getPrevMonthDate,
    getNextYearDate,
    getPrevYearDate,
    getSpecifiedDate,


    // convert
    setDateHours,
    setDateMinutes,
    setDateDays,
    timestampToDate
}
