import { h } from "@stencil/core";
import { customTwMerge, findAssignedElementsByTag } from "../../utils/utils";
import { cardBaseBorderClasses, cardBaseClasses, cardDisabledClasses, cardElevationClasses, cardGhostBorderClasses, cardNoElevationClasses, cardOffSurfaceClasses, cardOnSurfaceClasses } from "../../utils/card-content-renderer";
import { cardFocusClasses, getCardStateClasses } from "../../utils/card.util";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprCardMicro {
    _wdprCardMicroContent;
    _wdprCardFooter;
    _directActionButton;
    _directActionIconButton;
    _directSelectorRadioButton;
    _directSelectorCheckbox;
    el;
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
            ;
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
    static get is() { return "wdpr-card-micro"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get styles() { return ":host { display: block; width: 100%; }"; }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "CardVariant",
                    "resolved": "\"actionable\" | \"non-actionable\" | \"selectable\"",
                    "references": {
                        "CardVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-card-micro/wdpr-card-micro.tsx",
                            "id": "src/components/wdpr-card-micro/wdpr-card-micro.tsx::CardVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'actionable'"
            },
            "mediaPosition": {
                "type": "string",
                "attribute": "media-position",
                "mutable": false,
                "complexType": {
                    "original": "MediaPosition",
                    "resolved": "\"leading\" | \"none\" | \"trailing\"",
                    "references": {
                        "MediaPosition": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-card-micro/wdpr-card-micro.tsx",
                            "id": "src/components/wdpr-card-micro/wdpr-card-micro.tsx::MediaPosition"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'trailing'"
            },
            "actionPosition": {
                "type": "string",
                "attribute": "action-position",
                "mutable": false,
                "complexType": {
                    "original": "MediaPosition",
                    "resolved": "\"leading\" | \"none\" | \"trailing\"",
                    "references": {
                        "MediaPosition": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-card-micro/wdpr-card-micro.tsx",
                            "id": "src/components/wdpr-card-micro/wdpr-card-micro.tsx::MediaPosition"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'none'"
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "ghost": {
                "type": "boolean",
                "attribute": "ghost",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "isOnSurface": {
                "type": "boolean",
                "attribute": "is-on-surface",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "fullWidth": {
                "type": "boolean",
                "attribute": "full-width",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "name": {
                "type": "string",
                "attribute": "name",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "selected": {
                "type": "boolean",
                "attribute": "selected",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_hasMedia": {},
            "_hasFooter": {},
            "_hasActionBadge": {},
            "_hasAction": {},
            "_hasSelector": {},
            "_isMouseDown": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprCardClick",
                "name": "wdprCardClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ selected: boolean, value: string | null }",
                    "resolved": "{ selected: boolean; value: string; }",
                    "references": {}
                }
            }, {
                "method": "wdprSelectedChange",
                "name": "wdprSelectedChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ selected: boolean }",
                    "resolved": "{ selected: boolean; }",
                    "references": {}
                }
            }, {
                "method": "wdprDisabledChange",
                "name": "wdprDisabledChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "refreshInternals": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "disabled",
                "methodName": "handleDisabledChange"
            }, {
                "propName": "selected",
                "methodName": "onSelectedPropChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "formreset",
                "method": "handleFormReset",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=wdpr-card-micro.js.map
