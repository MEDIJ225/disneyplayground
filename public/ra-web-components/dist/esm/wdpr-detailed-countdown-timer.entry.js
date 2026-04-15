import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprDetailedCountdownTimer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    _endDate;
    get el() { return getElement(this); }
    endAt;
    type = 'inline';
    variant = 'primary';
    _hours = '##';
    _minutes = '##';
    _seconds = '##';
    hasDayDigit1 = false;
    hasDayDigit2 = false;
    hasDayDigit3 = false;
    /**
     * @internal
     * Whether the countdown is being rendered in mobile view.
     * Computed from viewport width (<768px).
     * @type {boolean}
     */
    _isMobileView = false;
    handleResize() {
        const viewportWidth = window.innerWidth;
        this._isMobileView = viewportWidth < 768;
    }
    componentWillLoad() {
        if (!this.endAt)
            return;
        this._endDate = new Date(this.endAt);
        this._tick();
    }
    _tick() {
        const now = Date.now();
        const timeRemaining = this._endDate.getTime() - now;
        if (timeRemaining <= 0) {
            this._hours = this._minutes = this._seconds = '00';
            return;
        }
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        this._hours = String(hours).padStart(2, '0');
        this._minutes = String(minutes).padStart(2, '0');
        this._seconds = String(seconds).padStart(2, '0');
        setTimeout(() => this._tick(), 1000);
    }
    _renderColon(isStacked = false) {
        const sizeClasses = 'w-[3px] h-[44px]';
        const inlineClasses = 'flex flex-col justify-center items-center';
        const colorClasses = 'text-text-inverse';
        const colonClasses = customTwMerge(sizeClasses, !isStacked && inlineClasses, colorClasses);
        return h("span", { class: colonClasses }, ":");
    }
    render() {
        const isStacked = this._isMobileView || this.type === 'stacked';
        const hourDigits = this._hours.split('');
        const minuteDigits = this._minutes.split('');
        const secondDigits = this._seconds.split('');
        const hasDayDigit1 = !!this.el.querySelector('[slot="day-digit-1"]');
        const hasDayDigit2 = !!this.el.querySelector('[slot="day-digit-2"]');
        const hasDayDigit3 = !!this.el.querySelector('[slot="day-digit-3"]');
        const hasHourDigit1 = !!this.el.querySelector('[slot="hour-digit-1"]');
        const hasHourDigit2 = !!this.el.querySelector('[slot="hour-digit-2"]');
        const hasMinuteDigit1 = !!this.el.querySelector('[slot="minute-digit-1"]');
        const hasMinuteDigit2 = !!this.el.querySelector('[slot="minute-digit-2"]');
        const hasSecondDigit1 = !!this.el.querySelector('[slot="second-digit-1"]');
        const hasSecondDigit2 = !!this.el.querySelector('[slot="second-digit-2"]');
        return (h("div", { key: '90c5a9c692a54dd5576be9d6080f992654c3c693', class: isStacked ? 'flex flex-col items-center gap-100' : 'flex items-center gap-050' }, h("wdpr-day-countdown-timer", { key: 'b8756889d3c11559138ac4430011bf5a167772df', size: isStacked ? 'large' : 'small', endAt: this.endAt, variant: this.variant }, hasDayDigit1 && h("slot", { key: 'a4dbfb16b9fbd6e44f9f266552acb9b8f0278831', name: "day-digit-1", slot: "day-digit-1" }), hasDayDigit2 && h("slot", { key: 'c9dc144ba94ceed94e8fcbd9d7a788f9f997c353', name: "day-digit-2", slot: "day-digit-2" }), hasDayDigit3 && h("slot", { key: '20144e9875dd41f52a4c316ec2092319189e5e12', name: "day-digit-3", slot: "day-digit-3" })), h("div", { key: '37c651161047289a40ba6bb22a709ef0138da609', class: isStacked ? 'flex items-center gap-050' : 'flex gap-050' }, !isStacked && this._renderColon(isStacked), h("wdpr-time-unit", { key: 'a0615307a241c175621a651b8b726c34249d7bfd', label: "Hours", digits: [hourDigits[0], hourDigits[1]], slotPrefix: "hour", variant: this.variant }, hasHourDigit1 && h("slot", { key: '58f76928837c164315a5e719bfdd58ef2d51270b', name: "hour-digit-1", slot: "hour-digit-1" }), hasHourDigit2 && h("slot", { key: '756f14f74e6eeea8fbff2920f31e6ba05fceb47c', name: "hour-digit-2", slot: "hour-digit-2" })), this._renderColon(isStacked), h("wdpr-time-unit", { key: 'ba815c7ba8df5370175146f96361bccd4f23e198', label: "Mins", digits: [minuteDigits[0], minuteDigits[1]], slotPrefix: "minute", variant: this.variant }, hasMinuteDigit1 && h("slot", { key: '475ed19b91ab6fe5e3b23e06a2d036cd49c2597a', name: "minute-digit-1", slot: "minute-digit-1" }), hasMinuteDigit2 && h("slot", { key: '8b8f7d91cd1f02bec727ab3f6e6b3b66a4518c50', name: "minute-digit-2", slot: "minute-digit-2" })), this._renderColon(isStacked), h("wdpr-time-unit", { key: '112601b54949636181c2ec9c991973c0f77ba768', label: "Secs", digits: [secondDigits[0], secondDigits[1]], slotPrefix: "second", variant: this.variant }, hasSecondDigit1 && h("slot", { key: '92c669226f4a68c95b2f619d4cb4183304eadc90', name: "second-digit-1", slot: "second-digit-1" }), hasSecondDigit2 && h("slot", { key: '16d7f0bbfa876d855397961c24440547e1a84f02', name: "second-digit-2", slot: "second-digit-2" })))));
    }
};

export { WdprDetailedCountdownTimer as wdpr_detailed_countdown_timer };
//# sourceMappingURL=wdpr-detailed-countdown-timer.entry.js.map

//# sourceMappingURL=wdpr-detailed-countdown-timer.entry.js.map