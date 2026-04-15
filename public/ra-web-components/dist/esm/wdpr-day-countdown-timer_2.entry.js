import { r as registerInstance, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { p as propagateToSlot, c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprDayCountdownTimer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    _endDate;
    get el() { return getElement(this); }
    _days = '###';
    endAt;
    size = 'medium';
    variant = 'primary';
    a11yLabel;
    handleSizeChange() {
        this._syncNumberFlippers();
    }
    handleEndAtChange() {
        this._endDate = new Date(this.endAt);
    }
    componentWillLoad() {
        if (!this.endAt)
            return;
        this._endDate = new Date(this.endAt);
        this._tick();
    }
    componentDidLoad() {
        this._syncNumberFlippers();
        this._updateAriaLabel();
    }
    _updateAriaLabel() {
        const [firstDigit, secondDigit, thirdDigit] = this._days.split('');
        const daysString = `${firstDigit.trim()}${secondDigit.trim()}${thirdDigit.trim()}`;
        const daysNumber = Number(daysString) || 0;
        const roundedDays = Math.round(daysNumber);
        this.a11yLabel = `${roundedDays} ${roundedDays === 1 ? 'day' : 'days'}`;
    }
    _tick() {
        const now = Date.now();
        const timeRemaining = this._endDate.getTime() - now;
        if (timeRemaining <= 0) {
            this._days = '000';
            return;
        }
        // Time calculations for days
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        if (days > 999) {
            this._days = '999';
        }
        else {
            this._days = String(days).padStart(3, '0');
        }
        this._updateAriaLabel();
        setTimeout(() => this._tick(), 1000);
    }
    _syncNumberFlippers() {
        const slotDigit1 = this.el.shadowRoot?.querySelector(`slot[name="day-digit-1"]`);
        const slotDigit2 = this.el.shadowRoot?.querySelector(`slot[name="day-digit-2"]`);
        const slotDigit3 = this.el.shadowRoot?.querySelector(`slot[name="day-digit-3"]`);
        propagateToSlot(slotDigit1, 'size', this.size, 'wdpr-number-flipper');
        propagateToSlot(slotDigit2, 'size', this.size, 'wdpr-number-flipper');
        propagateToSlot(slotDigit3, 'size', this.size, 'wdpr-number-flipper');
    }
    get _dayDigitsClasses() {
        return customTwMerge(daysDigitsBaseClasses, this.size === 'large' ? 'gap-075' : 'gap-050');
    }
    get _labelClasses() {
        return customTwMerge(labelBaseClasses, variantLabelClasses$1[this.variant]);
    }
    render() {
        const [firstDigit, secondDigit, thirdDigit] = this._days.split('');
        return (h(Host, { key: 'f9fe3508595a93e429f3c74f38f634db5a8af7a7', "aria-label": this.a11yLabel, role: "img" }, h("div", { key: '5a56e6e060e5dea3f6c9d53bbcd00fae36322c38', class: wrapperClasses$1 }, h("div", { key: '3e00a636c3e9f87382edc6836d82596332536a40', class: this._dayDigitsClasses }, h("slot", { key: 'a6b6462e2c10174dcd6c76c8bfce31f19a981977', name: "day-digit-1" }, h("wdpr-number-flipper", { key: 'f51273db62821fc45e0db78c12b63a65ff39db15', size: this.size }, firstDigit)), h("slot", { key: '338f5f848dab3fed038599585af4574194a23488', name: "day-digit-2" }, h("wdpr-number-flipper", { key: '52d26f62cc9a6545b0e1d1e20d849ff03fde8f02', size: this.size }, secondDigit)), h("slot", { key: 'd6315da942a1fb912f908eae246445d7a175ed6b', name: "day-digit-3" }, h("wdpr-number-flipper", { key: '4ba3433c74b8415bd6118c71f04fd079d9782eaa', size: this.size }, thirdDigit))), h("span", { key: '335cfdfcb8db54d1b708553267c3de4ae68d8075', class: this._labelClasses }, "Days"))));
    }
    static get watchers() { return {
        "size": ["handleSizeChange"],
        "endAt": ["handleEndAtChange"]
    }; }
};
const wrapperClasses$1 = 'flex flex-col items-center gap-050';
const daysDigitsBaseClasses = 'flex flex-row gap-050';
const labelBaseClasses = 'text-[12px] font-[800] leading-[16px] tracking-[1.2px] uppercase';
const variantLabelClasses$1 = {
    primary: 'text-text-label',
    secondary: 'text-text-inverse',
};

const WdprTimeUnit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    variant = 'primary';
    label;
    digits = ['#', '#'];
    /**
     * Prefix for slot names (e.g., "hour", "minute", "second")
    */
    slotPrefix;
    get _labelClasses() {
        return customTwMerge(baseLabelClasses, variantLabelClasses[this.variant]);
    }
    render() {
        const [digit1, digit2] = this.digits;
        return (h("div", { key: 'feb529567de46c25787a96a7560c9ea6ac115870', class: wrapperClasses }, h("div", { key: '69f4bedd695c07c8f0d580a3ad3d5c49e540b1fe', class: digitsClasses }, h("slot", { key: 'd1755a579bc015c07dbcf4c37d8b06eb2c88c162', name: `${this.slotPrefix}-digit-1` }, h("wdpr-number-flipper", { key: 'a4a1648ff2d92d8ac22688aed1f2155f5b1033db' }, digit1)), h("slot", { key: '28cf37dccbfa44498bb73f6769775497d51571d7', name: `${this.slotPrefix}-digit-2` }, h("wdpr-number-flipper", { key: 'ee8c6de815092cc249dd69f3176ea20c90989e65' }, digit2))), h("span", { key: '38cdc161fe96e213b7f26e32606c0c3db9fd74b9', class: this._labelClasses }, this.label)));
    }
};
const wrapperClasses = 'flex flex-col items-center gap-050';
const digitsClasses = 'flex flex-row gap-050';
const baseLabelClasses = 'text-[12px] font-[800] leading-[16px] tracking-[1.2px] uppercase';
const variantLabelClasses = {
    primary: 'text-text-label',
    secondary: 'text-text-inverse',
};

export { WdprDayCountdownTimer as wdpr_day_countdown_timer, WdprTimeUnit as wdpr_time_unit };
//# sourceMappingURL=wdpr-day-countdown-timer.wdpr-time-unit.entry.js.map

//# sourceMappingURL=wdpr-day-countdown-timer_2.entry.js.map