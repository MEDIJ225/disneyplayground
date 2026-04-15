'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
var cardStyles = require('./card-styles-CO5BLqZi.js');
var card_util = require('./card.util-CQbi4RZB.js');
require('./bundle-cjs-Cajw0YnV.js');
require('./keycodes.model-Bh3huzdF.js');

const WdprCardLarge = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprClick = index.createEvent(this, "wdprClick", 7);
        this.wdprDisabledChange = index.createEvent(this, "wdprDisabledChange", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    get el() { return index.getElement(this); }
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
            const assignedElement = utils.findAssignedElementsByTag(slot, 'wdpr-card-large-content');
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
        return (index.h("div", { class: `${opacityClass} block w-full rounded-t-150 overflow-hidden` }, index.h("slot", { name: "media" }), index.h("div", { class: "flex absolute top-4 left-4" }, index.h("slot", { name: "badge" })), index.h("div", { class: 'absolute top-4 right-4' }, index.h("slot", { name: "favorite-button" }))));
    }
    get contentSection() {
        return (index.h("div", { class: 'flex flex-col flex-1 w-full p-200' }, index.h("slot", { name: "content" })));
    }
    _handleKeyDown = (e) => {
        card_util.handleCardKeyDown(e, this.el, this.disabled, this._handleSelectedChange);
    };
    _handleClick = (e) => {
        card_util.handleCardClick(e, this.disabled, this._handleSelectedChange);
    };
    get cardClasses() {
        const cardWidthClasses = this.fullWidth ? '!w-full sm:!w-full !min-w-0 !max-w-none' : '';
        if (this.disabled) {
            return utils.customTwMerge(cardStyles.cardDisabledClasses, cardWidthClasses);
        }
        const cardStateClasses = card_util.getCardStateClasses(this.selected, this.isMouseDown);
        return utils.customTwMerge(cardStyles.cardBaseClasses, cardStyles.cardBaseBorderClasses, cardStateClasses, cardStyles.cardElevationClasses, cardWidthClasses);
    }
    render() {
        return (index.h("div", { key: '6b6d77ee5343c61ad9c05ba22e29d22bf3fafe8f', class: this.cardClasses, tabIndex: this.disabled ? -1 : 0, role: "button", "aria-label": this.a11yLabel, onClick: this._handleClick, onKeyDown: this._handleKeyDown, onMouseDown: () => this.isMouseDown = true, onMouseUp: () => this.isMouseDown = false }, this.mediaSection, this.contentSection));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"],
        "selected": ["onSelectedPropChange"]
    }; }
};
WdprCardLarge.style = ":host { display: block; width: 100%; }";

exports.wdpr_card_large = WdprCardLarge;
//# sourceMappingURL=wdpr-card-large.entry.cjs.js.map

//# sourceMappingURL=wdpr-card-large.cjs.entry.js.map