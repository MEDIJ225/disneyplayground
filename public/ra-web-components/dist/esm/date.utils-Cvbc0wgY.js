import { d as dateFnsExports } from './index-iWCgRMLC.js';

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
    return dateFnsExports.parse(dateStr, format, new Date());
}
function isValidDateString(dateStr, format) {
    const parsedDate = dateFnsExports.parse(dateStr, format, new Date());
    return dateFnsExports.isValid(parsedDate);
}
function formatDateToString(date, dateFormat) {
    return dateFnsExports.format(date, dateFormat);
}
function isAfterDay(date1, date2) {
    if (!date1 || !date2)
        return false;
    // Compare just the day, not the hours and minutes.
    return dateFnsExports.isAfter(dateFnsExports.startOfDay(date1), dateFnsExports.startOfDay(date2));
}
function isBeforeDay(date1, date2) {
    if (!date1 || !date2)
        return false;
    // Compare just the day, not the hours and minutes.
    return dateFnsExports.isBefore(dateFnsExports.startOfDay(date1), dateFnsExports.startOfDay(date2));
}

export { isBeforeDay as a, isAfterDay as b, getNextMonth as c, formatDateToString as f, getPreviousMonth as g, isValidDateString as i, parseDateFromString as p };
//# sourceMappingURL=date.utils-Cvbc0wgY.js.map

//# sourceMappingURL=date.utils-Cvbc0wgY.js.map