import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';

const WdprPageHeader = /*@__PURE__*/ proxyCustomElement(class WdprPageHeader extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.leadingClick = createEvent(this, "leadingClick", 7);
        this.trailingClick = createEvent(this, "trailingClick", 7);
    }
    slots = {
        leading: false,
        trailing: false,
        middle: false,
        below: false,
    };
    leadingIconSlot;
    trailingIconSlot;
    middleSlot;
    belowSlot;
    get el() { return this; }
    /**
     * The title text to be displayed in the header.
     */
    titleText = '';
    /**
     * Controls the aria-live attribute for the title text.
     */
    ariaLiveMode = 'off';
    sticky = false;
    background = 'primary';
    showElevation = false;
    /**
     * If true, sets the content color to inverse (light text) for dark backgrounds.
     */
    inverse = false;
    /**
     * On left icon click event
     */
    leadingClick;
    /**
     * On right icon click event
     */
    trailingClick;
    _slotHasContent(slot) {
        if (!slot)
            return false;
        return slot.assignedElements({ flatten: true }).length > 0;
    }
    _setSlot(key, value) {
        if (this.slots[key] === value)
            return;
        this.slots = { ...this.slots, [key]: value };
    }
    _onClickLeadingIcon = () => {
        if (this.slots.leading) {
            this.leadingClick.emit(true);
        }
    };
    _onClickTrailingIcon = () => {
        if (this.slots.trailing) {
            this.trailingClick.emit(true);
        }
    };
    _getContainerClass() {
        const stickyClass = this.sticky ? 'sticky top-0 z-10' : '';
        const backgroundClassMap = {
            transparent: 'bg-surface-transparent',
            primary: 'bg-page-default',
            secondary: 'bg-page-default-alt',
            media: '',
            translucent: 'bg-surface-translucent',
        };
        const mergedClasses = customTwMerge(outerContainerClass, stickyClass, backgroundClassMap[this.background]);
        return this.showElevation
            ? `${mergedClasses} elevation-xsmall-soft relative z-10`
            : mergedClasses;
    }
    _getContainerStyle() {
        if (this.background === 'translucent') {
            return {
                backdropFilter: 'blur(calc(var(--effect-400, 32px) / 2))',
                WebkitBackdropFilter: 'blur(calc(var(--effect-400, 32px) / 2))'
            };
        }
        return {};
    }
    componentWillLoad() {
        this.slots = {
            leading: !!this.el.querySelector('[slot="leading-icon"]'),
            trailing: !!this.el.querySelector('[slot="trailing-icon"]'),
            middle: !!this.el.querySelector('[slot="middle"]'),
            below: !!this.el.querySelector('[slot="below"]'),
        };
    }
    render() {
        const titleColorClass = this.inverse ? 'text-text-inverse' : 'text-text-heading';
        const iconColorClass = this.inverse ? 'text-text-inverse' : 'text-stroke-actionable-default';
        return (h("div", { key: '3ec22da4239b035296e921accaa254298e1ed511', class: this._getContainerClass(), style: this._getContainerStyle() }, h("div", { key: '17267b378cada79d56e6b98b47432654d940ad0f', class: containerClass }, h("section", { key: 'e4608767ad24303d213214d9044fcaa1775da0ca', class: leftIconContainerClass }, h("div", { key: '409c8721095f4a563953981b63939fe21b4cb062', class: `${iconClass} ${iconColorClass} ${this.slots.leading ? 'inline-flex' : 'hidden'}`, onClick: this._onClickLeadingIcon }, h("slot", { key: 'e583835dc46153229955417e95c69a99cebafd43', name: "leading-icon", ref: el => (this.leadingIconSlot = el), onSlotchange: () => this._setSlot('leading', this._slotHasContent(this.leadingIconSlot)) }))), h("div", { key: '2a0e31c8776c6d8f9a7d63760693fc85ddd82edf', class: middleContainerClass }, h("slot", { key: 'b92c388c22123920540b7ee574d34288fb53a12d', name: "middle", ref: el => (this.middleSlot = el), onSlotchange: () => this._setSlot('middle', this._slotHasContent(this.middleSlot)) }), !this.slots.middle && (h("h1", { key: '9d993c0bee1ddb6c4292405deb58ca6a3b1c4f99', class: `${titleClass} ${titleColorClass}`, "aria-live": this.ariaLiveMode, "aria-atomic": this.ariaLiveMode !== 'off' ? 'true' : 'false' }, this.titleText))), h("section", { key: 'f44ce7f7c726abc2264f80826e94c865384b6387', class: rightIconContainerClass }, h("div", { key: '48e751bba3aed16fe7aa3e984224c8458e8f78e8', class: `${iconClass} ${iconColorClass} ${this.slots.trailing ? 'inline-flex' : 'hidden'}`, onClick: this._onClickTrailingIcon }, h("slot", { key: '48f0685edc344bcb7674cf3270bbc7291ac4dffe', name: "trailing-icon", ref: el => (this.trailingIconSlot = el), onSlotchange: () => this._setSlot('trailing', this._slotHasContent(this.trailingIconSlot)) })))), h("div", { key: 'b4dc3d02b1403f1f5091338b594d2d3239c77f7e', class: `${belowContainerClass} ${this.slots.below ? 'block' : 'hidden'}` }, h("slot", { key: '14fb16771e346bef15af197cb6e74a1d0b9c8521', name: "below", ref: el => (this.belowSlot = el), onSlotchange: () => this._setSlot('below', this._slotHasContent(this.belowSlot)) }))));
    }
    static get style() { return ":host { display: block; width: 100%; }"; }
}, [257, "wdpr-page-header", {
        "titleText": [1, "title-text"],
        "ariaLiveMode": [1, "aria-live-mode"],
        "sticky": [4],
        "background": [1],
        "showElevation": [4, "show-elevation"],
        "inverse": [4],
        "slots": [32]
    }]);
const outerContainerClass = 'w-full overflow-visible';
const containerClass = 'flex w-full items-center px-100';
const leftIconContainerClass = 'flex flex-1 items-center justify-start';
const rightIconContainerClass = 'flex flex-1 items-center justify-end';
const middleContainerClass = 'flex-[2] min-w-0 flex items-center justify-center';
const belowContainerClass = 'px-100 pt-100 pb-100';
const iconClass = 'items-center cursor-pointer p-200';
const titleClass = 'min-w-0 text-center heading-xsmall overflow-hidden text-ellipsis ' +
    '[display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]';
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-page-header"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-page-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprPageHeader);
            }
            break;
    } });
}

export { WdprPageHeader as W, defineCustomElement as d };
//# sourceMappingURL=p-C3upN3uE.js.map

//# sourceMappingURL=p-C3upN3uE.js.map