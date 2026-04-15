'use strict';

var index = require('./index-oP7sywWN.js');

function getPreviousMonth(date) {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return new Date(newYear, newMonth, 1);
}
function getNextMonth(date) {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    return new Date(newYear, newMonth, 1);
}
function parseDateFromString(dateStr, format) {
    return index.dateFnsExports.parse(dateStr, format, new Date());
}
function isValidDateString(dateStr, format) {
    const parsedDate = index.dateFnsExports.parse(dateStr, format, new Date());
    return index.dateFnsExports.isValid(parsedDate);
}
function formatDateToString(date, dateFormat) {
    return index.dateFnsExports.format(date, dateFormat);
}
function isAfterDay(date1, date2) {
    if (!date1 || !date2)
        return false;
    // Compare just the day, not the hours and minutes.
    return index.dateFnsExports.isAfter(index.dateFnsExports.startOfDay(date1), index.dateFnsExports.startOfDay(date2));
}
function isBeforeDay(date1, date2) {
    if (!date1 || !date2)
        return false;
    // Compare just the day, not the hours and minutes.
    return index.dateFnsExports.isBefore(index.dateFnsExports.startOfDay(date1), index.dateFnsExports.startOfDay(date2));
}

exports.formatDateToString = formatDateToString;
exports.getNextMonth = getNextMonth;
exports.getPreviousMonth = getPreviousMonth;
exports.isAfterDay = isAfterDay;
exports.isBeforeDay = isBeforeDay;
exports.isValidDateString = isValidDateString;
exports.parseDateFromString = parseDateFromString;
//# sourceMappingURL=date.utils-Dyxx4VAx.js.map

//# sourceMappingURL=date.utils-Dyxx4VAx.js.map