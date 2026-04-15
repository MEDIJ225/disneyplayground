import { NumberFlipperSizes } from '../wdpr-number-flipper/wdpr-number-flipper.model';
import { CountdownVariant } from '../wdpr-detailed-countdown-timer/wdpr-time-unit/wdpr-time-unit.model';
export declare class WdprDayCountdownTimer {
    private _endDate;
    el: HTMLWdprDayCountdownTimerElement;
    _days: string;
    endAt: number;
    size: NumberFlipperSizes;
    variant: CountdownVariant;
    a11yLabel: string;
    handleSizeChange(): void;
    handleEndAtChange(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private _updateAriaLabel;
    private _tick;
    private _syncNumberFlippers;
    private get _dayDigitsClasses();
    private get _labelClasses();
    render(): any;
}
