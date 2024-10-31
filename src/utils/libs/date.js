/**
 * The check string contains only hours, minutes, and seconds
 * @returns {Boolean}  
 */
function isTimeString(str) {
    // match "HH:mm:ss"
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return timePattern.test(str);
}


/**
 * Get now
 * @returns {Date}  // Wed Apr 17 2024 14:31:36 GMT+0800 (China Standard Time)
 */
const getNow = () => {
    return new Date(Date.now());
};

/**
 * Zero Padding
 * @param {Number} num
 * @param {Boolean} padZeroEnabled 
 * @returns {String}  '01', '05', '12'
 */
const padZero = (num, padZeroEnabled = true) => {
    if (padZeroEnabled) {
        return num < 10 ? '0' + num : num.toString();
    } else {
        return num.toString();
    }

};


/**
 * Hours validation
 * @param {*} v 
 * @returns {Boolean}  
 */
const isValidHours = (v) => {
    return /^([01]?[0-9]|2[0-3])$/.test(v);//  0～23, 00～23
};

/**
 * Minutes and Seconds validation
 * @param {*} v 
 * @returns {Boolean}  
 */
const isValidMinutesAndSeconds = (v) => {
    return /^([01]?[0-9]|[0-5][0-9])$/.test(v);//  0~59, 00~59
};

/**
 * Year validation
 * @param {*} v 
 * @returns {Boolean}  
 */
const isValidYear = (v) => {
    return /^([1-9][0-9])\d{2}$/.test(v);//  1000 ～ 9999
};

/**
 * Month validation
 * @param {*} v 
 * @returns {Boolean}  
 */
const isValidMonth = (v) => {
    return /^(0?[1-9]|1[0-2])$/.test(v);//  01～12, 1~12
};     

/**
 * Day validation
 * @param {*} v 
 * @returns {Boolean}  
 */
const isValidDay = (v) => {
    return /^(0?[1-9]|[1-2][0-9]|3[0-1])$/.test(v);//  01～31, 1~31
}; 



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
 * @returns {String}  yyyy-MM-dd
 */
function dateFormat(v) {
    const date = typeof v === 'string' ? new Date(v.replace(/-/g, "/")) : v;  // fix "Invalid date in safari"
    return date;
}

/**
 * Get date details
 * @param {Date | String} v 
 * @param {Boolean} padZeroEnabled 
 * @typedef {Object} JSON
 */
function getDateDetails(v, padZeroEnabled = true) {

    const date = dateFormat(v);
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1, padZeroEnabled);
    const day = padZero(date.getDate(), padZeroEnabled);
    const hours = padZero(date.getHours(), padZeroEnabled);
    const minutes = padZero(date.getMinutes(), padZeroEnabled);
    const seconds = padZero(date.getSeconds(), padZeroEnabled);

    return {
        year: String(year),
        month,
        day,
        hours,
        minutes,
        seconds
    };
}


/**
 * Get calendar date
 * @param {Date | String} v 
 * @param {Boolean} padZeroEnabled 
 * @returns {String}  yyyy-MM-dd
 */
function getCalendarDate(v, padZeroEnabled = true) {

    const date = dateFormat(v);
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1, padZeroEnabled);
    const day = padZero(date.getDate(), padZeroEnabled);
    const hours = padZero(date.getHours(), padZeroEnabled);
    const minutes = padZero(date.getMinutes(), padZeroEnabled);
    const seconds = padZero(date.getSeconds(), padZeroEnabled);
    const res = `${year}-${month}-${day}`;
    return res;
}



/**
 * Get today date
 * @returns {String}  yyyy-MM-dd
 */
function getTodayDate() {

    return getCalendarDate(new Date());
}



/**
 * Get tomorrow date
 * @param {Date | String} v 
 * @returns {String}  yyyy-MM-dd
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
 * @returns {String}  yyyy-MM-dd
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
 * @returns {String}  yyyy-MM-dd
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
 * @returns {String}  yyyy-MM-dd
 */
function getNextMonthDate(v) {

    const today = dateFormat(v);
    today.setMonth(today.getMonth() + 1);

    return getCalendarDate(today);
}


/**
 * Get previous month date
 * @param {Date | String} v 
 * @returns {String}  yyyy-MM-dd
 */
function getPrevMonthDate(v) {

    const today = dateFormat(v);
    today.setMonth(today.getMonth() - 1);

    return getCalendarDate(today);
}



/**
 * Get next year date
 * @param {Date | String} v 
 * @returns {String}  yyyy-MM-dd
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
 * @returns {String}  yyyy-MM-dd
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
 * @returns {String}  yyyy-MM-dd
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
    return new Date(date.getFullYear(), typeof targetMonth !== 'undefined' ? targetMonth : date.getMonth() - 1, 0).getDate();
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
 * Get current day
 * @param {Boolean} padZeroEnabled 
 * @returns {Number}
 */
function getCurrentDay(padZeroEnabled = true) {
    const d = new Date().getDate();
    return padZeroEnabled ? String(d).padStart(2, '0') : d;
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
 * @typedef {Object} JSON
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
    const _cur = new Date(date).setTime(new Date(date).getTime() + (offset * 60 * 60 * 1000));
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
    const _cur = new Date(date).setTime(new Date(date).getTime() + (offset * 60 * 1000));
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
    const _cur = new Date(date).setTime(new Date(date).getTime() + (offset * 24 * 60 * 60 * 1000));
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



/**
 * Get the date of the specified month
 * @param {Number} year 
 * @param {Number} month 
 * @returns {Array<string>} 
 */
function getMonthDates(year, month) {
    const dates = [];

    // Get the total number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();

   
    for (let day = 1; day <= daysInMonth; day++) {
        dates.push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`); // 'YYYY-MM-DD'
    }

    return dates;
}

/**
 * Get the date of the specified week (From Sunday)
 * @param {Number} weekOffset 
 * @returns {Array<Date>} 
 */
function getWeekDatesFromSun(weekOffset) {
    const dates = [];
    const currentDate = new Date();

    // Calculate the date of Sunday
    const dayOfWeek = currentDate.getDay(); // 0 is Sunday
    currentDate.setDate(currentDate.getDate() - dayOfWeek + weekOffset * 7);

    // Get the date of the week
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        dates.push(date);
    }

    return dates;
}

/**
 * Get the date of the specified week (From Monday)
 * @param {Number} weekOffset 
 * @returns {Array<Date>} 
 */
function getWeekDatesFromMon(weekOffset) {
    const dates = [];
    const currentDate = new Date();

    // Set the date to Monday
    const dayOfWeek = currentDate.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    currentDate.setDate(currentDate.getDate() + diffToMonday + weekOffset * 7);

    // Get the date of the week
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        dates.push(date);
    }

    return dates;
}

export {
    isTimeString,
    getNow,
    padZero,
    dateFormat,
    getDateDetails,

    //
    isValidDate,
    isValidHours,
    isValidMinutesAndSeconds,
    isValidYear,
    isValidMonth,
    isValidDay,

    //
    getLastDayInMonth,
    getFirstAndLastMonthDay,
    getCalendarDate,
    getFullTime,

    // current
    getTodayDate,
    getCurrentMonth,
    getCurrentYear,
    getCurrentDay,
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
    timestampToDate,

    // get dates list
    getMonthDates,
    getWeekDatesFromSun,
    getWeekDatesFromMon
}
