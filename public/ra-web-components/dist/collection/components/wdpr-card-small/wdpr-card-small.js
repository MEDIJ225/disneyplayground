import { h } from "@stencil/core";
import { customTwMerge, findAssignedElementsByTag } from "../../utils/utils";
import { cardBaseBorderClasses, cardBaseClasses, cardDisabledClasses, cardElevationClasses, cardGhostBorderClasses, cardNoElevationClasses } from "../../utils/card-content-renderer";
import { getCardStateClasses, handleCardKeyDown, handleCardClick } from "../../utils/card.util";
export class WdprCardSmall {
    _wdprCardSmallContent;
    _directActionButton;
    _directActionIconButton;
    _hasLabel = false;
    _hasMedia = false;
    _hasActionBadge = false;
    el;
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
    static get is() { return "wdpr-card-small"; }
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
                            "path": "/harness/packages/stencil-library/src/components/wdpr-card-small/wdpr-card-small.tsx",
                            "id": "src/components/wdpr-card-small/wdpr-card-small.tsx::CardVariant"
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
                    "original": "'leading' | 'trailing' | 'none'",
                    "resolved": "\"leading\" | \"none\" | \"trailing\"",
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
                "reflect": false,
                "defaultValue": "'leading'"
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
            "inverseColor": {
                "type": "boolean",
                "attribute": "inverse-color",
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
            "backgroundSrc": {
                "type": "string",
                "attribute": "background-src",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
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
                "reflect": true,
                "defaultValue": "null"
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
            }
        };
    }
    static get states() {
        return {
            "_selected": {},
            "_isMouseDown": {},
            "_hasAction": {}
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
                "propName": "_selected",
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
//# sourceMappingURL=wdpr-card-small.js.map
