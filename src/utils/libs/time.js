/**
 * Get timeslots from starting and ending time
 * @param  {string} startTime  -  start time in format "HH:mm"
 * @param  {string} endTime  -  end time in format "HH:mm"
 * @param  {number} timeInterval  -  time interval in minutes
 * @param  {boolean} formatRange  -  if true returns ranges like "10:00 - 11:00", if false returns single times like "10:00"
 * @returns {string[]} Array of time slots
 * @example

console.log(getTimeslots("10:00", "14:00", 60, true)); //['10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00']
console.log(getTimeslots("10:00", "14:00", 60));   // ['10:00', '11:00', '12:00', '13:00']
*/
function getTimeslots(startTime, endTime, timeInterval, formatRange = false) {
    // Convert time string to minutes
    const parseTime = (s) => {
        const c = s.split(':');
        return parseInt(c[0]) * 60 + parseInt(c[1]);
    }

    // Convert minutes to time string format
    const convertHours = (mins) => {
        const hour = Math.floor(mins / 60);
        mins = Math.trunc(mins % 60);
        const converted = pad(hour, 2) + ':' + pad(mins, 2);
        return converted;
    }

    // Add leading zeros to numbers
    const pad = (str, max) => {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    // Calculate time slots
    const calculateTimeSlot = (_startTime, _endTime, _timeInterval) => {
        const timeSlots = [];
        
        // Round start and end times to next 30 min interval
        _startTime = Math.ceil(_startTime / 30) * 30;
        _endTime = Math.ceil(_endTime / 30) * 30;

        // Generate time slots
        let currentTime = _startTime;
        while (currentTime < _endTime) {
            if (formatRange) {
                // Format with range: "10:00 - 11:00"
                const t = convertHours(currentTime) + ' - ' + convertHours(currentTime + _timeInterval);
                timeSlots.push(t);
            } else {
                // Format single time: "10:00"
                timeSlots.push(convertHours(currentTime));
            }
            currentTime += _timeInterval;
        }
        return timeSlots;
    }

    const inputEndTime = parseTime(endTime);
    const inputStartTime = parseTime(startTime);
    const timeSegment = calculateTimeSlot(inputStartTime, inputEndTime, timeInterval);

    return timeSegment;
}


/**
 * Get minutes between two dates
 * @param  {Date} startDate  -  start date
 * @param  {Date} endDate  -  ebd date
 * @returns Number
 */
function getMinutesBetweenDates(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    return (diff / 60000);
}


/**
 * Get minutes between two time
 * @param  {String} startTime  -  start time
 * @param  {String} endTime  -  ebd time
 * @returns Number
 */
function getMinutesBetweenTime(startTime, endTime) {
    const pad = (num) => {
        return ("0" + num).slice(-2);
    };
    let s = startTime.split(":"), sMin = +s[1] + s[0] * 60,
        e = endTime.split(":"), eMin = +e[1] + e[0] * 60,
        diff = eMin - sMin;
        
    if (diff < 0) { sMin -= 12 * 60; diff = eMin - sMin }
    const h = Math.floor(diff / 60),
          m = diff % 60;
    return "" + pad(h) + ":" + pad(m);
}



/**
 * Convert HH:MM:SS into minute
 * @param  {String} timeStr  -  time string
 * @returns Number
 */
function convertTimeToMin(timeStr) {
    const _time = timeStr.split(':').length === 3 ?  `${timeStr}` : `${timeStr}:00`;

    const res = _time.split(':'); // split it at the colons

    // Hours are worth 60 minutes.
    const minutes = (+res[0]) * 60 + (+res[1]);
    return minutes;
}


export {
    getTimeslots,
    getMinutesBetweenDates,
    getMinutesBetweenTime,
    convertTimeToMin
};




