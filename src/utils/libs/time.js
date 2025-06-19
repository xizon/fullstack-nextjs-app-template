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
console.log(getTimeslots("08:00:00", "08:02:00", 0.4));   // ['08:00:00', '08:00:24', '08:00:48', '08:01:12', '08:01:36', '08:02:00']

*/
function getTimeslots(startTime, endTime, timeInterval, formatRange = false) {
    // Parse time string to seconds
    const parseTime = function(s) {
        var c = s.split(":").map(Number);
        // Support HH:mm or HH:mm:ss
        return c[0] * 3600 + c[1] * 60 + (c[2] || 0);
    };

    // Pad with zeros
    const pad = function(str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    };

    // Convert seconds to HH:mm:ss
    const convertTime = function(secs) {
        var hour = Math.floor(secs / 3600);
        var min = Math.floor((secs % 3600) / 60);
        var sec = secs % 60;
        return pad(hour, 2) + ":" + pad(min, 2) + ":" + pad(sec, 2);
    };

    // Calculate time slots
    const calculateTimeSlot = function(_startTime, _endTime, _timeInterval) {
        var timeSlots = [];
        var currentTime = _startTime;
        while (currentTime <= _endTime) {
            if (formatRange) {
                var t = convertTime(currentTime) + ' - ' + convertTime(Math.min(currentTime + _timeInterval, _endTime));
                timeSlots.push(t);
            } else {
                timeSlots.push(convertTime(currentTime));
            }
            currentTime += _timeInterval;
        }
        return timeSlots;
    };

    var inputStartTime = parseTime(startTime);
    var inputEndTime = parseTime(endTime);
    // If timeInterval is not an integer, treat as minutes with decimals, convert to seconds
    var isDecimal = !Number.isInteger(timeInterval);
    var intervalInSeconds = isDecimal ? Math.round(timeInterval * 60) : timeInterval * 60;
    return calculateTimeSlot(inputStartTime, inputEndTime, intervalInSeconds);
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




