import { h } from "@stencil/core";
export class WdprFabTrigger {
    el;
    open = false;
    size = 'large';
    label = 'Menu';
    icon = '';
    disabled = false;
    closeA11yLabel = 'Close menu';
    /**
     * Emitted when the FAB trigger is toggled
     */
    wdprToggle;
    _handleToggle = () => {
        if (this.disabled)
            return;
        this.wdprToggle.emit();
    };
    get _iconSize() {
        return iconSizeMap[this.size];
    }
    get _closedButtonClass() {
        return `${closedBaseClasses} ${closedSizeClasses[this.size]}`;
    }
    get _iconButtonClass() {
        return `${iconButtonBaseClasses} ${iconButtonSizeClasses[this.size]}`;
    }
    render() {
        if (!this.open) {
            return (h("button", { type: "button", class: this._closedButtonClass, onClick: this._handleToggle, disabled: this.disabled, "aria-haspopup": "true", "aria-expanded": "false", "aria-disabled": this.disabled ? 'true' : undefined }, this.icon && (h("span", { class: "flex items-center", "aria-hidden": "true" }, h("wdpr-icon-library", { icon: this.icon, size: this._iconSize, decorative: true }))), this.label));
        }
        return (h("button", { type: "button", class: this._iconButtonClass, onClick: this._handleToggle, disabled: this.disabled, "aria-label": this.closeA11yLabel, "aria-expanded": "true", "aria-disabled": this.disabled ? 'true' : undefined }, h("wdpr-icon-library", { icon: "close-reversed", size: this._iconSize, decorative: true })));
    }
    static get is() { return "wdpr-fab-trigger"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "open": {
                "type": "boolean",
                "attribute": "open",
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
                "reflect": false,
                "defaultValue": "false"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "FabTriggerSize",
                    "resolved": "\"large\" | \"medium\"",
                    "references": {
                        "FabTriggerSize": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-fab/wdpr-fab-trigger/wdpr-fab-trigger.tsx",
                            "id": "src/components/wdpr-fab/wdpr-fab-trigger/wdpr-fab-trigger.tsx::FabTriggerSize"
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
                "defaultValue": "'large'"
            },
            "label": {
                "type": "string",
                "attribute": "label",
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
                "reflect": false,
                "defaultValue": "'Menu'"
            },
            "icon": {
                "type": "string",
                "attribute": "icon",
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
                "reflect": false,
                "defaultValue": "''"
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
                "reflect": false,
                "defaultValue": "false"
            },
            "closeA11yLabel": {
                "type": "string",
                "attribute": "close-a11y-label",
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
                "reflect": false,
                "defaultValue": "'Close menu'"
            }
        };
    }
    static get events() {
        return [{
                "method": "wdprToggle",
                "name": "wdprToggle",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the FAB trigger is toggled"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
// FAB button (closed state) - base classes
const closedBaseClasses = `inline-flex items-center justify-center gap-2 rounded-pill
  component-medium whitespace-nowrap
  bg-surface-actionable-default text-text-inverse
  hover:bg-surface-actionable-hover active:bg-surface-actionable-focus
  elevation-xsmall-soft cursor-pointer
  focus:outline-none focus-visible:outline-solid focus-visible:outline-offset-2
  focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused
  disabled:bg-surface-actionable-disabled-alt disabled:text-text-actionable-disabled
  disabled:cursor-not-allowed disabled:elevation-none`;
// FAB button size classes
const closedSizeClasses = {
    medium: 'px-4 py-2 h-10',
    large: 'px-6 py-4 h-14',
};
// Icon button (open state) - base classes
const iconButtonBaseClasses = `relative inline-flex items-center justify-center rounded-pill
  bg-surface-default text-text-actionable-alt-default
  hover:bg-surface-actionable-alt-hover hover:text-text-inverse
  active:bg-surface-actionable-alt-pressed active:text-text-inverse
  elevation-xsmall-soft cursor-pointer
  focus:outline-none focus-visible:outline-solid focus-visible:outline-offset-2
  focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused
  disabled:bg-surface-disabled disabled:text-icon-disabled
  disabled:cursor-not-allowed disabled:elevation-none`;
// Icon button size classes
const iconButtonSizeClasses = {
    medium: 'w-10 h-10',
    large: 'w-14 h-14',
};
// Icon size mapping
const iconSizeMap = {
    medium: 'small',
    large: 'medium',
};
//# sourceMappingURL=wdpr-fab-trigger.js.map
