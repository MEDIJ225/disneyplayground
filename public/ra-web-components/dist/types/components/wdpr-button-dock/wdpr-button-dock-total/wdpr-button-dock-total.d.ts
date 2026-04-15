export declare class WdprButtonDockTotal {
    /** Amount to display. If number, split into symbol/integer/decimal with locale-aware order. If string, shown verbatim. */
    amount?: number | string;
    /** Currency used when amount is a number. */
    currency: string;
    /** Locale used when amount is a number. */
    locale: string;
    /** Horizontal alignment of the row. */
    align: 'start' | 'center' | 'end';
    /** Size token controlling relative sizes. */
    size: 'sm' | 'md' | 'lg';
    private get containerClass();
    /** Main integer (and sign/group) class */
    private get integerClass();
    /** Decimal portion class (slightly smaller than integer by default) */
    private get decimalClass();
    /** Currency symbol class (can be same as decimal or your own token) */
    private get symbolClass();
    private formatThreeParts;
    render(): any;
}
