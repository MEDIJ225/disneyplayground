import { isValid, parse, isAfter, startOfDay, isBefore, format } from "date-fns";
export { isSameDay, addDays, subDays, addWeeks, subWeeks, startOfMonth, endOfMonth, startOfDay } from 'date-fns';
export function getPreviousMonth(date) {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return new Date(newYear, newMonth, 1);
}
export function getNextMonth(date) {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    return new Date(newYear, newMonth, 1);
}
export function parseDateFromString(dateStr, format) {
    return parse(dateStr, format, new Date());
}
export function isValidDateString(dateStr, format) {
    const parsedDate = parse(dateStr, format, new Date());
    return isValid(parsedDate);
}
export function formatDateToString(date, dateFormat) {
    return format(date, dateFormat);
}
export function isAfterDay(date1, date2) {
    if (!date1 || !date2)
        return false;
    // Compare just the day, not the hours and minutes.
    return isAfter(startOfDay(date1), startOfDay(date2));
}
export function isBeforeDay(date1, date2) {
    if (!date1 || !date2)
        return false;
    // Compare just the day, not the hours and minutes.
    return isBefore(startOfDay(date1), startOfDay(date2));
}
//# sourceMappingURL=date.utils.js.map
