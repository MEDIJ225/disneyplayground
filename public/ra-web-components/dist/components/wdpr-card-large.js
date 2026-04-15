import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { f as findAssignedElementsByTag, c as customTwMerge } from './p-CXZGMLMW.js';
import { c as cardDisabledClasses, a as cardBaseClasses, b as cardBaseBorderClasses, d as cardElevationClasses } from './p-BvI-yBcV.js';
import { h as handleCardKeyDown, a as handleCardClick, g as getCardStateClasses } from './p-0zltjOT6.js';

const WdprCardLarge$1 = /*@__PURE__*/ proxyCustomElement(class WdprCardLarge extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprClick = createEvent(this, "wdprClick", 7);
        this.wdprDisabledChange = createEvent(this, "wdprDisabledChange", 7);
        this.internals = this.attachInternals();
    }
    get el() { return this; }
    disabled = false;
    fullWidth = false;
    name;
    a11yLabel;
    selected = false;
    isMouseDown = false;
    wdprClick;
    wdprDisabledChange;
    _wdprCardLargeContent;
    internals;
    componentDidLoad() {
        this._findCardContent();
        this._updateFormValue();
    }
    async refreshInternals() {
        this._updateFormValue();
    }
    handleDisabledChange() {
        this._findCardContent();
        this.wdprDisabledChange.emit(this.disabled);
        this._updateFormValue();
    }
    onSelectedPropChange() {
        this._updateFormValue();
    }
    handleFormReset() {
        this.selected = false;
        this._updateFormValue();
    }
    _handleSelectedChange = () => {
        this.selected = !this.selected;
        this.wdprClick.emit();
    };
    _updateFormValue = () => {
        const shouldSubmit = !this.disabled;
        const formValue = shouldSubmit ? (this.selected ? 'selected' : 'not selected') : null;
        queueMicrotask(() => {
            if (this.internals && this.name != null) {
                this.internals?.setFormValue?.(formValue);
            }
        });
        this._updateValidity();
    };
    _updateValidity = () => {
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        const isValid = this.selected != null && typeof this.selected === 'boolean';
        if (isValid) {
            this.internals?.setValidity?.({});
        }
        else {
            this.internals?.setValidity?.({ valueMissing: true }, 'this field is required');
        }
    };
    _findCardContent = () => {
        const slot = this.el.shadowRoot?.querySelector('slot[name="content"]');
        if (slot) {
            const assignedElement = findAssignedElementsByTag(slot, 'wdpr-card-large-content');
            this._wdprCardLargeContent = assignedElement;
            if (this._wdprCardLargeContent) {
                this._wdprCardLargeContent.forEach(content => {
                    const button = content.querySelector?.('wdpr-button');
                    if (button) {
                        button.disabled = this.disabled;
                    }
                    content.disabled = this.disabled;
                });
            }
        }
    };
    get mediaSection() {
        const opacityClass = this.disabled ? 'opacity-600' : '';
        return (h("div", { class: `${opacityClass} block w-full rounded-t-150 overflow-hidden` }, h("slot", { name: "media" }), h("div", { class: "flex absolute top-4 left-4" }, h("slot", { name: "badge" })), h("div", { class: 'absolute top-4 right-4' }, h("slot", { name: "favorite-button" }))));
    }
    get contentSection() {
        return (h("div", { class: 'flex flex-col flex-1 w-full p-200' }, h("slot", { name: "content" })));
    }
    _handleKeyDown = (e) => {
        handleCardKeyDown(e, this.el, this.disabled, this._handleSelectedChange);
    };
    _handleClick = (e) => {
        handleCardClick(e, this.disabled, this._handleSelectedChange);
    };
    get cardClasses() {
        const cardWidthClasses = this.fullWidth ? '!w-full sm:!w-full !min-w-0 !max-w-none' : '';
        if (this.disabled) {
            return customTwMerge(cardDisabledClasses, cardWidthClasses);
        }
        const cardStateClasses = getCardStateClasses(this.selected, this.isMouseDown);
        return customTwMerge(cardBaseClasses, cardBaseBorderClasses, cardStateClasses, cardElevationClasses, cardWidthClasses);
    }
    render() {
        return (h("div", { key: '6b6d77ee5343c61ad9c05ba22e29d22bf3fafe8f', class: this.cardClasses, tabIndex: this.disabled ? -1 : 0, role: "button", "aria-label": this.a11yLabel, onClick: this._handleClick, onKeyDown: this._handleKeyDown, onMouseDown: () => this.isMouseDown = true, onMouseUp: () => this.isMouseDown = false }, this.mediaSection, this.contentSection));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"],
        "selected": ["onSelectedPropChange"]
    }; }
    static get style() { return ":host { display: block; width: 100%; }"; }
}, [321, "wdpr-card-large", {
        "disabled": [516],
        "fullWidth": [516, "full-width"],
        "name": [513],
        "a11yLabel": [1, "a11y-label"],
        "selected": [32],
        "isMouseDown": [32],
        "refreshInternals": [64]
    }, [[0, "formreset", "handleFormReset"]], {
        "disabled": ["handleDisabledChange"],
        "selected": ["onSelectedPropChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-large"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-large":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardLarge$1);
            }
            break;
    } });
}

const WdprCardLarge = WdprCardLarge$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCardLarge, defineCustomElement };
//# sourceMappingURL=wdpr-card-large.js.map

//# sourceMappingURL=wdpr-card-large.js.map