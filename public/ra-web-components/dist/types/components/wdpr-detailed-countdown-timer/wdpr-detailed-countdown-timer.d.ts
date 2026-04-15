import { CountdownVariant } from './wdpr-time-unit/wdpr-time-unit.model';
export declare class WdprDetailedCountdownTimer {
    private _endDate;
    el: HTMLWdprDetailedCountdownTimerElement;
    endAt: number;
    type: 'inline' | 'stacked';
    variant: CountdownVariant;
    _hours: string;
    _minutes: string;
    _seconds: string;
    hasDayDigit1: boolean;
    hasDayDigit2: boolean;
    hasDayDigit3: boolean;
    /**
     * @internal
     * Whether the countdown is being rendered in mobile view.
     * Computed from viewport width (<768px).
     * @type {boolean}
     */
    _isMobileView: boolean;
    handleResize(): void;
    componentWillLoad(): void;
    private _tick;
    private _renderColon;
    render(): any;
}
