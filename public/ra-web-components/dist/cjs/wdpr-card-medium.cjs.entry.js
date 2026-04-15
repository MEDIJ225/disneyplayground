'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
var cardStyles = require('./card-styles-CO5BLqZi.js');
var card_util = require('./card.util-CQbi4RZB.js');
require('./bundle-cjs-Cajw0YnV.js');
require('./keycodes.model-Bh3huzdF.js');

const WdprCardMedium = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprCardClick = index.createEvent(this, "wdprCardClick", 7);
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
    variant = 'actionable';
    mediaPosition = 'leading';
    ghost = false;
    disabled = false;
    name;
    fullWidth = false;
    mediaAspect = 'portrait';
    a11yLabel;
    _selected = false;
    _isMouseDown = false;
    wdprCardClick;
    wdprDisabledChange;
    _wdprCardMediumContent;
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
        this.wdprDisabledChange?.emit(this.disabled);
        this._updateFormValue();
    }
    onSelectedPropChange() {
        this._updateFormValue();
    }
    handleFormReset() {
        this._selected = false;
        this._updateFormValue();
    }
    _handleSelectedChange = () => {
        if (this.variant === 'non-actionable')
            return;
        this._selected = this.variant === 'selectable' ? !this._selected : false;
        this.wdprCardClick.emit({ selected: this._selected });
    };
    _updateFormValue = () => {
        const shouldSubmit = !this.disabled;
        const formValue = shouldSubmit ? (this._selected ? 'selected' : 'not selected') : null;
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
        const isValid = this._selected != null && typeof this._selected === 'boolean';
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
            const assignedElement = utils.findAssignedElementsByTag(slot, 'wdpr-card-medium-content');
            this._wdprCardMediumContent = assignedElement;
            if (this._wdprCardMediumContent) {
                this._wdprCardMediumContent.forEach(content => {
                    const button = content.querySelector?.('wdpr-button');
                    if (button) {
                        button.disabled = this.disabled;
                    }
                    content.disabled = this.disabled;
                });
            }
        }
    };
    _handleKeyDown = (e) => {
        card_util.handleCardKeyDown(e, this.el, this.disabled, this._handleSelectedChange);
    };
    _handleClick = (e) => {
        card_util.handleCardClick(e, this.disabled, this._handleSelectedChange);
    };
    get mediaSlotDimensions() {
        return this.mediaAspect === '3:2' ? 'w-48' : 'w-24 h-32';
    }
    get mediaSlot() {
        if (this.mediaPosition === 'none') {
            return null;
        }
        const margin = this.mediaPosition === 'leading' ? 'mr-200' : 'ml-200';
        return (index.h("div", { class: `relative block items-center shrink-0 ${this.mediaSlotDimensions} rounded-150 h-full overflow-hidden ${margin}` }, this.disabled && (index.h("div", { class: "z-10 w-full h-full absolute" }, index.h("wdpr-overlay", { cover: true, open: true, variant: "scrim", role: "presentation", ariaLabel: "Disabled Overlay" }))), index.h("slot", { name: "media" }), index.h("div", { class: `absolute top-1 ${this.mediaPosition === 'leading' ? 'left-1' : 'right-1'}` }, index.h("slot", { name: "favorite-button" }))));
    }
    get cardPaddingClasses() {
        if (this.mediaPosition === 'none') {
            return 'py-100 px-200';
        }
        if (this.mediaPosition === 'leading') {
            return 'py-100 pr-200 pl-100';
        }
        if (this.mediaPosition === 'trailing') {
            return 'py-100 pl-200 pr-100';
        }
        return '';
    }
    get cardCardCursorClasses() {
        if (this.disabled || this.variant === 'non-actionable')
            return 'cursor-default';
        return 'cursor-pointer';
    }
    get cardClasses() {
        const cardWidthClasses = this.fullWidth ? '!w-full sm:!w-full !min-w-0 !max-w-none' : '';
        if (this.disabled) {
            const elevationClasses = (this.variant === 'non-actionable') ? 'elevation-none' : 'elevation-small-soft';
            return utils.customTwMerge(cardStyles.cardDisabledClasses, cardWidthClasses, elevationClasses);
        }
        const cardStateClasses = !this.ghost && this.variant !== 'non-actionable' ? card_util.getCardStateClasses(this._selected, this._isMouseDown) : '';
        const cardBorderClasses = this.ghost ? cardStyles.cardGhostBorderClasses : this.variant !== 'non-actionable' ? cardStyles.cardBaseBorderClasses : '';
        const cardShadowBoxClasses = this.ghost || this.variant === 'non-actionable' ? cardStyles.cardNoElevationClasses : cardStyles.cardElevationClasses;
        const cardCursorClasses = this.cardCardCursorClasses;
        return utils.customTwMerge(cardStyles.cardBaseClasses, cardBorderClasses, cardShadowBoxClasses, cardWidthClasses, cardCursorClasses, cardStateClasses);
    }
    render() {
        return (index.h("div", { key: '145e79fd15c7dea4a08ba58d860c26073c664e86', class: this.cardClasses, tabIndex: this.disabled ? -1 : 0, onClick: this._handleClick, onKeyDown: this._handleKeyDown, onMouseDown: () => this._isMouseDown = true, onMouseUp: () => this._isMouseDown = false }, index.h("div", { key: '1d5bd18ddb8933e80032eeba9a8bcbf33d82a994', class: `flex flex-1 w-full pb-100 ${this.cardPaddingClasses}` }, this.mediaPosition === 'leading' && this.mediaSlot, index.h("div", { key: 'b6c18fcef93e602497724178f80b29d79d701ef8', part: 'content', class: "flex-col flex flex-1 min-w-0" }, index.h("div", { key: 'e2784e20ef6f9a0345b922bc511482a05ecdd41a', class: "flex items-start" }, index.h("slot", { key: '2f3f36e13a0b2180e0c3c6d3c16155619a609b39', name: "badge" })), index.h("div", { key: '63e764524b26a258df06a1d0fe7222559b7e2481', class: "flex-col flex mt-100" }, index.h("slot", { key: '54e331323b54241e0a1ea332d9e00511d9946dc5', name: "content" }))), this.mediaPosition === 'trailing' && this.mediaSlot), index.h("div", { key: '8c8f67503a6fd2a2b46463dd797b3212ba1e6dd8', class: "flex flex-col w-full" }, index.h("slot", { key: '77e895bacdbdbdf1197435c0f920bad09974f3db', name: "footer" }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"],
        "_selected": ["onSelectedPropChange"]
    }; }
};
WdprCardMedium.style = ":host { display: block; width: 100%; }";

exports.wdpr_card_medium = WdprCardMedium;
//# sourceMappingURL=wdpr-card-medium.entry.cjs.js.map

//# sourceMappingURL=wdpr-card-medium.cjs.entry.js.map