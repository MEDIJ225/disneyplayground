export { isSameDay, addDays, subDays, addWeeks, subWeeks, startOfMonth, endOfMonth, startOfDay } from 'date-fns';
export declare function getPreviousMonth(date: Date): Date;
export declare function getNextMonth(date: Date): Date;
export declare function parseDateFromString(dateStr: string, format: string): Date;
export declare function isValidDateString(dateStr: string, format: string): boolean;
export declare function formatDateToString(date: Date, dateFormat: string): string;
export declare function isAfterDay(date1: Date, date2: Date): boolean;
export declare function isBeforeDay(date1: Date, date2: Date): boolean;
