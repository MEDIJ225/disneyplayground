import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { f as findAssignedElementsByTag, c as customTwMerge } from './p-CXZGMLMW.js';
import { c as cardDisabledClasses, a as cardBaseClasses, e as cardGhostBorderClasses, b as cardBaseBorderClasses, f as cardNoElevationClasses, d as cardElevationClasses } from './p-BvI-yBcV.js';
import { h as handleCardKeyDown, a as handleCardClick, g as getCardStateClasses } from './p-0zltjOT6.js';
import { d as defineCustomElement$2 } from './p-Df6D6b08.js';

const WdprCardSmall$1 = /*@__PURE__*/ proxyCustomElement(class WdprCardSmall extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprCardClick = createEvent(this, "wdprCardClick", 7);
        this.wdprDisabledChange = createEvent(this, "wdprDisabledChange", 7);
        this.internals = this.attachInternals();
    }
    _wdprCardSmallContent;
    _directActionButton;
    _directActionIconButton;
    _hasLabel = false;
    _hasMedia = false;
    _hasActionBadge = false;
    get el() { return this; }
    variant = 'actionable';
    mediaPosition = 'leading';
    ghost = false;
    disabled = false;
    fullWidth = false;
    inverseColor = false;
    name;
    backgroundSrc = null;
    a11yLabel;
    _selected = false;
    _isMouseDown = false;
    _hasAction;
    wdprCardClick;
    wdprDisabledChange;
    internals;
    componentDidLoad() {
        this._selectSlots();
        this._findCardContent();
        this._updateFormValue();
        this._initializeCardControls();
    }
    async refreshInternals() {
        this._updateFormValue();
    }
    handleDisabledChange() {
        this._initializeCardControls();
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
    _selectSlots() {
        this._hasAction = !!this.el.querySelector('[slot="action"]');
        this._hasActionBadge = !!this.el.querySelector('[slot="action-badge"]');
        this._hasLabel = !!this.el.querySelector('[slot="status-label"]');
        this._hasMedia = !!this.el.querySelector('[slot="media"]');
    }
    _findCardContent = () => {
        const slot = this.el.shadowRoot?.querySelector('slot[name="content"]');
        if (slot) {
            const assignedElement = findAssignedElementsByTag(slot, 'wdpr-card-small-content');
            this._wdprCardSmallContent = assignedElement;
            if (this._wdprCardSmallContent) {
                this._wdprCardSmallContent.forEach(content => {
                    content.disabled = this.disabled;
                    content.inverseColor = this.inverseColor;
                });
            }
        }
    };
    _initializeCardControls = () => {
        const slotAction = this.el.shadowRoot?.querySelector('slot[name="action"]');
        this._directActionButton = findAssignedElementsByTag(slotAction, 'wdpr-button')?.at(0);
        this._directActionIconButton = findAssignedElementsByTag(slotAction, 'wdpr-icon-button')?.at(0);
        const controls = [this._directActionButton, this._directActionIconButton].filter(Boolean);
        controls.forEach(control => {
            requestAnimationFrame(() => {
                control.disabled = this.disabled;
            });
        });
    };
    _renderMediaSlot() {
        if (this.mediaPosition === 'none' || !this._hasMedia) {
            return null;
        }
        return (h("div", { class: "block items-center w-20 h-20 rounded-150 overflow-hidden" }, h("slot", { name: "media" })));
    }
    _renderActionSlot() {
        const actionPaddingClass = this.mediaPosition === 'trailing' && (this._directActionButton || this._directActionIconButton) ? 'pl-150' : '';
        return (h("div", { class: "flex items-center" }, this._hasActionBadge && h("div", { class: 'pr-050' }, h("slot", { name: "action-badge" })), h("div", { class: actionPaddingClass }, h("slot", { name: "action" }))));
    }
    _toggleSelectionControl = () => {
        this._handleSelectedChange();
        if (this._directActionButton && !this._directActionButton.disabled) {
            this._directActionButton.click();
        }
        else if (this._directActionIconButton && !this._directActionIconButton.disabled) {
            this._directActionIconButton.click();
        }
    };
    _handleKeyDown = (e) => {
        handleCardKeyDown(e, this.el, this.disabled, this._toggleSelectionControl);
    };
    _handleClick = (e) => {
        handleCardClick(e, this.disabled, this._toggleSelectionControl);
    };
    get isSelectable() {
        return this.variant === 'selectable';
    }
    get cardRole() {
        return this.isSelectable && !this._hasAction ? 'button' : undefined;
    }
    get ariaPressed() {
        return this.isSelectable && this._selected ? true : undefined;
    }
    get ariaDisabled() {
        return this.isSelectable && this.disabled ? true : undefined;
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
            return customTwMerge(cardDisabledClasses, cardWidthClasses, elevationClasses);
        }
        const cardStateClasses = !this.ghost && this.variant !== 'non-actionable' ? getCardStateClasses(this._selected, this._isMouseDown) : '';
        const cardBorderClasses = this.ghost ? cardGhostBorderClasses : this.variant !== 'non-actionable' ? cardBaseBorderClasses : '';
        const cardShadowBoxClasses = this.ghost || this.variant === 'non-actionable' ? cardNoElevationClasses : cardElevationClasses;
        const cardCursorClasses = this.cardCardCursorClasses;
        return customTwMerge(cardBaseClasses, cardBorderClasses, cardShadowBoxClasses, cardWidthClasses, cardCursorClasses, cardStateClasses);
    }
    render() {
        return (h("div", { key: 'e1d05e07b82412e3217e04c623b5ccc0f3f7d658', class: this.cardClasses, tabIndex: this.disabled ? -1 : 0, role: this.cardRole, onClick: this._handleClick, onKeyDown: this._handleKeyDown, onMouseDown: () => this._isMouseDown = true, onMouseUp: () => this._isMouseDown = false, "aria-label": this.a11yLabel, "aria-pressed": this.ariaPressed, "aria-disabled": this.ariaDisabled }, this._hasLabel && h("slot", { key: 'aa0ffeb2a278a1d1c11889a7972de93dba4ef4b9', name: "status-label" }), this.backgroundSrc ? (h("div", { class: "block absolute size-full top-0 left-0 z-0" }, h("wdpr-media", { src: this.backgroundSrc, alt: "Background image", aspect: "square", objectFit: "contain" }))) : (h("div", { part: "fill", class: "flex absolute size-full top-0 left-0 z-0" })), h("div", { key: '221a0db8385f19c48b922e3dbcd06167741ce43c', class: "flex items-center w-full p-200 z-1" }, this.mediaPosition === 'leading' && this._renderMediaSlot(), h("div", { key: '0b96f28d3e11fbf9139f10d921bfea1c8fd44a60', class: `flex-col flex flex-1 min-w-0 pr-150 ${this.mediaPosition === 'leading' && this._hasMedia ? 'pl-150' : ''}` }, h("div", { key: '43bcf6c487844e16aee8808d2d6e72d7006b737e', class: "flex items-start pb-100" }, h("slot", { key: '413af0c43c9a326d8bb852b9772628475e7593b2', name: "badge" })), h("div", { key: 'e15e4a74f884ba5f4a992edb654784daeddb2d0a', class: "flex-col flex" }, h("slot", { key: 'f5437011fc74b2690225fb44cadab4645e63bb39', name: "content" }))), this.mediaPosition === 'trailing' && this._renderMediaSlot(), this._renderActionSlot())));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"],
        "_selected": ["onSelectedPropChange"]
    }; }
    static get style() { return ":host { display: block; width: 100%; }"; }
}, [321, "wdpr-card-small", {
        "variant": [513],
        "mediaPosition": [1, "media-position"],
        "ghost": [516],
        "disabled": [516],
        "fullWidth": [516, "full-width"],
        "inverseColor": [516, "inverse-color"],
        "name": [513],
        "backgroundSrc": [513, "background-src"],
        "a11yLabel": [1, "a11y-label"],
        "_selected": [32],
        "_isMouseDown": [32],
        "_hasAction": [32],
        "refreshInternals": [64]
    }, [[0, "formreset", "handleFormReset"]], {
        "disabled": ["handleDisabledChange"],
        "_selected": ["onSelectedPropChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-small", "wdpr-media"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-small":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardSmall$1);
            }
            break;
        case "wdpr-media":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprCardSmall = WdprCardSmall$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCardSmall, defineCustomElement };
//# sourceMappingURL=wdpr-card-small.js.map

//# sourceMappingURL=wdpr-card-small.js.map