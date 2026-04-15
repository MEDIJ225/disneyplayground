import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { f as findAssignedElementsByTag, c as customTwMerge } from './utils-B2sDCMk6.js';
import { c as cardDisabledClasses, a as cardBaseClasses, b as cardBaseBorderClasses, d as cardElevationClasses } from './card-styles-BvI-yBcV.js';
import { h as handleCardKeyDown, a as handleCardClick, g as getCardStateClasses } from './card.util-BhWLIW5Z.js';
import './bundle-cjs-CF3xLdU_.js';
import './keycodes.model-CgKa3i1r.js';

const WdprCardLarge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprClick = createEvent(this, "wdprClick", 7);
        this.wdprDisabledChange = createEvent(this, "wdprDisabledChange", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    get el() { return getElement(this); }
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
};
WdprCardLarge.style = ":host { display: block; width: 100%; }";

export { WdprCardLarge as wdpr_card_large };
//# sourceMappingURL=wdpr-card-large.entry.js.map

//# sourceMappingURL=wdpr-card-large.entry.js.map