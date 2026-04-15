import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { f as findAssignedElementsByTag, c as customTwMerge } from './p-CXZGMLMW.js';
import { i as cardOnSurfaceClasses, j as cardOffSurfaceClasses, c as cardDisabledClasses, a as cardBaseClasses, f as cardNoElevationClasses, d as cardElevationClasses, e as cardGhostBorderClasses, b as cardBaseBorderClasses } from './p-BvI-yBcV.js';
import { g as getCardStateClasses, c as cardFocusClasses } from './p-0zltjOT6.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';

const WdprCardMicro = /*@__PURE__*/ proxyCustomElement(class WdprCardMicro extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprCardClick = createEvent(this, "wdprCardClick", 7);
        this.wdprSelectedChange = createEvent(this, "wdprSelectedChange", 7);
        this.wdprDisabledChange = createEvent(this, "wdprDisabledChange", 7);
        this.internals = this.attachInternals();
    }
    _wdprCardMicroContent;
    _wdprCardFooter;
    _directActionButton;
    _directActionIconButton;
    _directSelectorRadioButton;
    _directSelectorCheckbox;
    get el() { return this; }
    internals;
    _hasMedia;
    _hasFooter;
    _hasActionBadge;
    _hasAction;
    _hasSelector;
    _isMouseDown = false;
    variant = 'actionable';
    mediaPosition = 'trailing';
    actionPosition = 'none';
    a11yLabel;
    ghost = false;
    isOnSurface = false;
    disabled = false;
    fullWidth = false;
    name;
    selected = false;
    wdprCardClick;
    wdprSelectedChange;
    wdprDisabledChange;
    handleFormReset() {
        queueMicrotask(() => this._handleFormReset());
    }
    handleDisabledChange() {
        this._findCardContent();
        this._findCardFooter();
        this._initializeCardControls();
        this.wdprDisabledChange?.emit(this.disabled);
        this._updateFormValue();
    }
    onSelectedPropChange() {
        this._updateFormValue();
    }
    async refreshInternals() {
        this._updateFormValue();
    }
    componentWillLoad() {
        this._hasMedia = !!this.el.querySelector('[slot="media"]');
        this._hasFooter = !!this.el.querySelector('[slot="footer"]');
        this._hasActionBadge = !!this.el.querySelector('[slot="action-badge"]');
        this._hasAction = !!this.el.querySelector('[slot="action"]');
        this._hasSelector = !!this.el.querySelector('[slot="selector"]');
    }
    ;
    componentDidLoad() {
        this._initializeCardControls();
        this._findCardContent();
        this._findCardFooter();
        this._setupCheckboxListener();
        this._preventFocus();
        this._updateFormValue();
    }
    _updateFormValue() {
        const shouldSubmit = !this.disabled;
        const selected = this._directSelectorCheckbox ? this._directSelectorCheckbox.checked : this._directSelectorRadioButton ? !this._directSelectorRadioButton.selected : this.selected;
        const formValue = shouldSubmit ? (selected ? 'selected' : 'not selected') : null;
        queueMicrotask(() => {
            if (this.internals && this.name != null) {
                this.internals?.setFormValue?.(formValue);
            }
        });
        this._updateValidity();
    }
    _updateValidity() {
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        const isValid = this.selected != null && typeof this.selected === 'boolean';
        if (isValid) {
            this.internals?.setValidity?.({});
        }
        else {
            this.internals?.setValidity?.({ valueMissing: true }, 'Selection state is invalid');
        }
    }
    _disableControls = (components, action) => {
        components.forEach(component => {
            if (component) {
                action(component);
                component.disabled = false;
            }
        });
    };
    _handleFormReset = () => {
        this.selected = false;
        if (this._directSelectorRadioButton || this._directSelectorCheckbox) {
            this._disableControls([this._directSelectorRadioButton], (c) => c.selected = false);
            this._disableControls([this._directSelectorCheckbox], (c) => c.checked = false);
        }
        this._disableControls([this._directSelectorRadioButton], (c) => c.selected = false);
        this._disableControls([this._directSelectorCheckbox], (c) => c.checked = false);
        this._disableControls([
            this._directActionButton, this._directActionIconButton
        ], (c) => c.disabled = false);
        this._updateFormValue();
    };
    _setupCheckboxListener() {
        // Listen for changes to the direct checkbox's checked state
        if (this._directSelectorCheckbox) {
            const observer = new MutationObserver(() => {
                this.selected = this._directSelectorCheckbox?.checked || false;
            });
            observer.observe(this._directSelectorCheckbox, {
                attributes: true,
                attributeFilter: ['checked']
            });
        }
    }
    ;
    _preventFocus = () => {
        this._directSelectorRadioButton?.setAttribute('tabindex', '-1');
        this._directSelectorCheckbox?.setAttribute('tabindex', '-1');
    };
    _renderMediaSlot() {
        if (this.mediaPosition === 'none' || !this._hasMedia) {
            return null;
        }
        let padding = '';
        if (this.mediaPosition === 'leading') {
            padding = this.actionPosition === 'leading' ? 'mx-150' : 'mr-150';
        }
        else if (this.mediaPosition === 'trailing') {
            padding = this.actionPosition === 'trailing' ? 'mx-150' : 'ml-150';
        }
        return (h("div", { class: `flex items-center h-0 justify-center ${padding}`, tabindex: "-1" }, h("slot", { name: "media" })));
    }
    ;
    _renderSelectorSlot() {
        let paddingClass = '';
        if (this.actionPosition === 'leading' && this.mediaPosition !== 'leading') {
            paddingClass = 'mr-150';
        }
        else if (this.actionPosition === 'trailing' && this.mediaPosition !== 'trailing') {
            paddingClass = 'ml-150';
        }
        return (h("div", { class: `flex items-center justify-center ${paddingClass}` }, this._hasActionBadge && (h("div", { class: 'pl-150 pr-050' }, h("slot", { name: "action-badge" }))), h("slot", { name: "selector" })));
    }
    ;
    _findCardContent = () => {
        const slot = this.el.shadowRoot?.querySelector('slot[name="content"]');
        if (slot) {
            const assignedElement = findAssignedElementsByTag(slot, 'wdpr-card-micro-content');
            this._wdprCardMicroContent = assignedElement;
            if (this._wdprCardMicroContent) {
                this._wdprCardMicroContent.forEach(content => {
                    content.disabled = this.disabled;
                });
            }
        }
    };
    _findCardFooter = () => {
        const slot = this.el.shadowRoot?.querySelector('slot[name="footer"]');
        if (slot) {
            const assignedElement = findAssignedElementsByTag(slot, 'wdpr-card-footer');
            this._wdprCardFooter = assignedElement;
            if (this._wdprCardFooter) {
                this._wdprCardFooter.forEach(footer => footer.setDisabledState(this.disabled));
            }
        }
    };
    _initializeCardControls = () => {
        const slotAction = this.el.shadowRoot?.querySelector('slot[name="action"]');
        const slotSelector = this.el.shadowRoot?.querySelector('slot[name="selector"]');
        this._directActionButton = findAssignedElementsByTag(slotAction, 'wdpr-button')?.at(0);
        this._directActionIconButton = findAssignedElementsByTag(slotAction, 'wdpr-icon-button')?.at(0);
        this._directSelectorCheckbox = findAssignedElementsByTag(slotSelector, 'wdpr-checkbox')?.at(0);
        this._directSelectorRadioButton = findAssignedElementsByTag(slotSelector, 'wdpr-radio-button')?.at(0);
        const controls = [
            this._directActionButton,
            this._directActionIconButton,
            this._directSelectorCheckbox,
            this._directSelectorRadioButton
        ].filter(Boolean);
        controls.forEach(control => {
            requestAnimationFrame(() => {
                control.disabled = this.disabled;
            });
        });
    };
    _handleSelectedChange() {
        const radioValue = this._directSelectorRadioButton ? this._directSelectorRadioButton.value : undefined;
        const checkboxValue = this._directSelectorCheckbox ? this._directSelectorCheckbox.value : undefined;
        const selected = this._directSelectorCheckbox ? this._directSelectorCheckbox.checked : this._directSelectorRadioButton ? !this._directSelectorRadioButton.selected : this.selected;
        const value = checkboxValue || radioValue || null;
        this.wdprCardClick.emit({ selected, value });
        this.wdprSelectedChange.emit({ selected: this.selected });
        this._updateFormValue();
    }
    _onClick = ({ target }) => {
        const tagName = target?.tagName;
        if (this.disabled || tagName === 'WDPR-ICON-BUTTON' || tagName === 'WDPR-BUTTON') {
            return;
        }
        if (this.variant === 'actionable') {
            this._handleSelectedChange();
            return;
        }
        if (this.variant === 'selectable') {
            if (!this._directSelectorRadioButton && !this._directSelectorCheckbox) {
                this.selected = !this.selected;
            }
            if (this._directSelectorRadioButton) {
                if (target === this._directSelectorRadioButton) {
                    if (this._directSelectorRadioButton.selected) {
                        this._directSelectorRadioButton.selectRadio();
                    }
                }
                else {
                    this._handleSelectedChange();
                    if (this._directSelectorRadioButton.radioGroup) {
                        this._directSelectorRadioButton.selectRadio();
                    }
                    else {
                        this._directSelectorRadioButton.selected = !this._directSelectorRadioButton.selected;
                    }
                }
                return;
            }
            if (this._directSelectorCheckbox) {
                this._directSelectorCheckbox.checked = !this._directSelectorCheckbox.checked;
                if (target !== this._directSelectorCheckbox) {
                    this._updateFormValue();
                    this._handleSelectedChange();
                }
                return;
            }
            this._handleSelectedChange();
        }
    };
    _handleKeyDown = (e) => {
        if (this.variant === 'non-actionable')
            return;
        if ((e.key === KEYBOARD_KEYS.SPACE || e.key === KEYBOARD_KEYS.ENTER)) {
            const activeElement = document.activeElement;
            if (activeElement?.tagName === 'WDPR-ICON-BUTTON' || activeElement?.tagName === 'WDPR-BUTTON') {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            this._onClick({ target: this.el });
        }
    };
    get cardCardCursorClasses() {
        if (this.disabled || this.variant === 'non-actionable')
            return 'cursor-default';
        return 'cursor-pointer';
    }
    get cardClasses() {
        const cardWidthClasses = this.fullWidth ? '!w-full sm:!w-full !min-w-0 !max-w-none' : '';
        const cardSurfaceClasses = this.isOnSurface ? cardOnSurfaceClasses : cardOffSurfaceClasses;
        if (this.disabled) {
            const elevationClasses = (this.variant === 'non-actionable') ? 'elevation-none' : 'elevation-small-soft';
            return customTwMerge(cardSurfaceClasses, cardDisabledClasses, cardWidthClasses, elevationClasses);
        }
        const cardStateClasses = !this.isOnSurface && !this.ghost && this.variant !== 'non-actionable' ? getCardStateClasses(this.selected, this._isMouseDown) : '';
        const cardBorderClasses = this.ghost
            ? cardGhostBorderClasses
            : this.variant !== 'non-actionable' && !this.isOnSurface
                ? cardBaseBorderClasses
                : '';
        const cardShadowBoxClasses = this.isOnSurface || this.ghost || this.variant === 'non-actionable' ? cardNoElevationClasses : cardElevationClasses;
        const cardCursorClasses = this.cardCardCursorClasses;
        return customTwMerge('flex-col', cardBaseClasses, cardCursorClasses, cardSurfaceClasses, cardShadowBoxClasses, cardBorderClasses, cardStateClasses, cardFocusClasses, cardWidthClasses);
    }
    get tabIndex() {
        if (this.disabled || this.variant === 'non-actionable')
            return undefined;
        return 0;
    }
    get role() {
        return this.variant === 'selectable' && !this._hasAction && !this._hasSelector ? 'button' : undefined;
    }
    render() {
        return (h("div", { key: '9e71b1a2c4323abce9819cab453eda6814f04758', class: this.cardClasses, onKeyDown: this._handleKeyDown, onClick: this._onClick, role: this.role, onMouseDown: () => (this._isMouseDown = true), onMouseUp: () => (this._isMouseDown = false), tabindex: this.tabIndex }, h("div", { key: '749bf5fe657cf16a9e9ba07f1778aed6c0ee6795', class: 'flex flex-1 w-full p-200 items-center' }, this.actionPosition === 'leading' && this._renderSelectorSlot(), this.mediaPosition === 'leading' && this._renderMediaSlot(), h("div", { key: '0f97359c4a881ee62f565b869233fe174babaa20', class: "flex-1 min-w-0" }, h("slot", { key: '1464a626cf365612ae6c50d81e23a2ac87e0bf92', name: "content" })), this.mediaPosition === 'trailing' && this._renderMediaSlot(), this.actionPosition === 'trailing' && this._renderSelectorSlot(), h("div", { key: '20676b1f214127cfd45790140a188552a305800b', class: "flex items-end justify-center" }, h("slot", { key: '8ee18433daa9640c828c574d228d768678f4679d', name: "action" }))), this._hasFooter &&
            h("div", { key: '4e9bd8d399336d37f90b0203c01c7e2f346bea2f', class: "flex flex-col w-full" }, h("slot", { key: 'ecf24828d7312e6268019ce56a68b88d6496d804', name: "footer" }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"],
        "selected": ["onSelectedPropChange"]
    }; }
    static get style() { return ":host { display: block; width: 100%; }"; }
}, [321, "wdpr-card-micro", {
        "variant": [513],
        "mediaPosition": [1, "media-position"],
        "actionPosition": [1, "action-position"],
        "a11yLabel": [1, "a11y-label"],
        "ghost": [516],
        "isOnSurface": [516, "is-on-surface"],
        "disabled": [516],
        "fullWidth": [516, "full-width"],
        "name": [513],
        "selected": [516],
        "_hasMedia": [32],
        "_hasFooter": [32],
        "_hasActionBadge": [32],
        "_hasAction": [32],
        "_hasSelector": [32],
        "_isMouseDown": [32],
        "refreshInternals": [64]
    }, [[0, "formreset", "handleFormReset"]], {
        "disabled": ["handleDisabledChange"],
        "selected": ["onSelectedPropChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-micro"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-micro":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardMicro);
            }
            break;
    } });
}

export { WdprCardMicro as W, defineCustomElement as d };
//# sourceMappingURL=p-yYLjtNN2.js.map

//# sourceMappingURL=p-yYLjtNN2.js.map