import { r as registerInstance, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprButtonDockTotal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** Amount to display. If number, split into symbol/integer/decimal with locale-aware order. If string, shown verbatim. */
    amount;
    /** Currency used when amount is a number. */
    currency = 'USD';
    /** Locale used when amount is a number. */
    locale = 'en-US';
    /** Horizontal alignment of the row. */
    align = 'end';
    /** Size token controlling relative sizes. */
    size = 'lg';
    // ------- classes -------
    get containerClass() {
        const justify = this.align === 'start' ? 'justify-start' : this.align === 'center' ? 'justify-center' : 'justify-end';
        return customTwMerge('w-full flex items-center', justify);
    }
    /** Main integer (and sign/group) class */
    get integerClass() {
        const sizeClass = this.size === 'lg' ? 'title-large' : this.size === 'md' ? 'title-medium' : 'title-small';
        return customTwMerge(sizeClass, 'tracking--05 text-text-body');
    }
    /** Decimal portion class (slightly smaller than integer by default) */
    get decimalClass() {
        const sizeClass = this.size === 'lg' ? 'heading-large' : this.size === 'md' ? 'heading-medium' : 'heading-small';
        return customTwMerge(sizeClass, 'tracking--05 self-stretch pt-025 text-text-body');
    }
    /** Currency symbol class (can be same as decimal or your own token) */
    get symbolClass() {
        const sizeClass = this.size === 'lg' ? 'heading-large' : this.size === 'md' ? 'heading-medium' : 'heading-small';
        return customTwMerge(sizeClass, 'tracking--05 self-stretch pt-025 text-text-body');
    }
    // ------- formatting logic -------
    formatThreeParts(value) {
        const parts = new Intl.NumberFormat(this.locale, {
            style: 'currency',
            currency: this.currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currencyDisplay: 'symbol',
        }).formatToParts(value);
        // Gather indices
        const idxCurrency = parts.findIndex(p => p.type === 'currency');
        const idxFirstNumber = parts.findIndex(p => p.type === 'integer' || p.type === 'minusSign' || p.type === 'plusSign');
        const idxDecimalSep = parts.findIndex(p => p.type === 'decimal');
        const symbolBefore = idxCurrency !== -1 && (idxFirstNumber === -1 || idxCurrency < idxFirstNumber);
        // Build strings
        let symbol = '';
        let integer = '';
        let decimal = '';
        // copy of literals around currency/number to preserve locale spacing
        let gapBeforeSymbol = '';
        let gapAfterSymbol = '';
        // Extract symbol
        if (idxCurrency !== -1) {
            symbol = parts[idxCurrency].value;
            // literal right after currency → gap after symbol (e.g., NBSP)
            if (parts[idxCurrency + 1]?.type === 'literal')
                gapAfterSymbol = parts[idxCurrency + 1].value;
            // literal right before currency → gap before symbol (when symbol is after number)
            if (parts[idxCurrency - 1]?.type === 'literal')
                gapBeforeSymbol = parts[idxCurrency - 1].value;
        }
        // Integer block: minus/plus, integer digits, groups
        for (const p of parts) {
            if (p.type === 'minusSign' || p.type === 'plusSign' || p.type === 'integer' || p.type === 'group') {
                integer += p.value;
            }
            // stop concatenating integer once we reach decimal separator
            if (p.type === 'decimal')
                break;
        }
        // Decimal block: decimal separator + fraction
        if (idxDecimalSep !== -1) {
            for (let i = idxDecimalSep; i < parts.length; i++) {
                const t = parts[i].type;
                if (t === 'decimal' || t === 'fraction') {
                    decimal += parts[i].value;
                }
                else if (t === 'literal' || t === 'currency' || t === 'group' || t === 'integer') {
                    // stop when significant non-decimal tokens appear after we've started decimals
                    if (decimal.length > 0)
                        break;
                }
            }
        }
        return { symbolBefore, symbol, integer, decimal, gapBeforeSymbol, gapAfterSymbol };
    }
    render() {
        const v = this.amount;
        return (h("div", { key: 'aaa8c2dea3558e61f29f0f7cd4b9d3a4350156bd', class: this.containerClass, "aria-live": "polite" }, typeof v === 'number' ? ((() => {
            const { symbolBefore, symbol, integer, decimal, gapBeforeSymbol, gapAfterSymbol } = this.formatThreeParts(v);
            // Render in locale order with preserved spacing
            if (symbolBefore) {
                return (h("span", { class: "inline-flex items-baseline" }, h("span", { class: this.symbolClass }, symbol), gapAfterSymbol ? h("span", { "aria-hidden": "true" }, gapAfterSymbol) : null, h("span", { class: this.integerClass }, integer), decimal ? h("span", { class: this.decimalClass }, decimal) : null));
            }
            // symbol after the number
            return (h("span", { class: "inline-flex items-baseline" }, h("span", { class: this.integerClass }, integer), decimal ? h("span", { class: this.decimalClass }, decimal) : null, gapBeforeSymbol ? h("span", { "aria-hidden": "true" }, gapBeforeSymbol) : null, h("span", { class: this.symbolClass }, symbol)));
        })()) : (
        // String fallback (verbatim, not split)
        h("span", { class: this.integerClass }, v ?? '—'))));
    }
};

export { WdprButtonDockTotal as wdpr_button_dock_total };
//# sourceMappingURL=wdpr-button-dock-total.entry.js.map

//# sourceMappingURL=wdpr-button-dock-total.entry.js.map