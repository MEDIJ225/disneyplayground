// wdpr-segment.tsx
import { h, Host } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprSegment {
    el;
    /**
     * The label text for the segment
     */
    label;
    /**
     * Icon name to display (when variant is icon-label)
     */
    iconName;
    /**
     * Whether this segment is currently selected
     */
    selected = false;
    /**
     * Whether the segment is disabled
     */
    disabled = false;
    /**
     * Variant of the segment
     */
    variant = 'label-only';
    /**
     * Value associated with this segment
     */
    value;
    /**
     * Index of this segment in the group
     */
    index = 0;
    /**
     * Name for the radio group (all segments in same group share this)
     */
    name;
    /**
     * Unique ID for this segment
     */
    segmentId;
    /**
     * Event emitted when segment is clicked
     */
    segmentClick;
    /**
     * Focus the segment programmatically
     */
    async setFocus() {
        const button = this.el.shadowRoot?.querySelector('button');
        button?.focus();
    }
    _handleClick = () => {
        if (!this.disabled) {
            this.segmentClick.emit({
                value: this.value || this.label,
                index: this.index,
            });
        }
    };
    _getSegmentClasses() {
        const baseClasses = `
      relative flex items-center justify-center rounded-pill gap-050
      min-w-0 w-full h-[34px] py-125 px-200
      bg-surface-actionable-alt-default-alt text-text-actionable-alt-default
      transition-colors duration-200 ease-in-out
      cursor-pointer select-none
      focus:outline-none focus-visible:outline-focus
      focus-visible:outline-stroke-actionable-alt-selected
      focus-visible:outline-solid focus-visible:outline-offset-[2px]
      focus-visible:rounded-pill
      hover:text-text-actionable-alt-hover
      active:text-text-actionable-alt-pressed
      disabled:cursor-not-allowed disabled:pointer-events-none disabled:text-text-actionable-alt-disabled
    `;
        const variantClasses = this.variant === 'icon-label'
            ? 'flex-col h-[50px] py-100 px-200'
            : 'flex-row';
        const stateClasses = this.selected
            ? `bg-surface-actionable-alt-pressed text-text-actionable-inverse-default
      hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
      active:bg-surface-actionable-alt-selected active:text-text-actionable-inverse-default
      disabled:bg-surface-actionable-alt-disabled disabled:text-text-actionable-inverse-default z-10`
            : '';
        return customTwMerge(baseClasses, variantClasses, stateClasses);
    }
    _getLabelClasses() {
        return customTwMerge('text-label-small font-label-default leading-label-small tracking-default text-inherit truncate');
    }
    render() {
        const uniqueId = this.segmentId || `segment-${this.index}`;
        return (h(Host, { key: 'efc908e7b478e185598b97449a4d1aecf0cae242', style: { minWidth: '0' } }, h("button", { key: 'febbd9b615c6b18e531c613ddcd2ffd9a57bb0ff', type: "button", id: uniqueId, class: this._getSegmentClasses(), onClick: this._handleClick, disabled: this.disabled, tabIndex: this.selected ? 0 : -1, role: "radio", "aria-checked": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this.label }, this.variant === 'icon-label' && this.iconName && (h("wdpr-icon-library", { key: 'c8d63933f6e1de0be98ac41daee0ae0fec82a068', icon: this.iconName, size: "small", decorative: true })), h("span", { key: 'f4a782f46e9750bd73b9392a22a306ef798cacef', class: this._getLabelClasses() }, this.label))));
    }
    static get is() { return "wdpr-segment"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "label": {
                "type": "string",
                "attribute": "label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The label text for the segment"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "iconName": {
                "type": "string",
                "attribute": "icon-name",
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
                    "text": "Icon name to display (when variant is icon-label)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
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
                    "text": "Whether this segment is currently selected"
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
                    "text": "Whether the segment is disabled"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "SegmentVariant",
                    "resolved": "\"icon-label\" | \"label-only\"",
                    "references": {
                        "SegmentVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-segment/wdpr-segment.tsx",
                            "id": "src/components/wdpr-segment/wdpr-segment.tsx::SegmentVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Variant of the segment"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'label-only'"
            },
            "value": {
                "type": "string",
                "attribute": "value",
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
                    "text": "Value associated with this segment"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "index": {
                "type": "number",
                "attribute": "index",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Index of this segment in the group"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0"
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
                    "text": "Name for the radio group (all segments in same group share this)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "segmentId": {
                "type": "string",
                "attribute": "segment-id",
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
                    "text": "Unique ID for this segment"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "segmentClick",
                "name": "segmentClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when segment is clicked"
                },
                "complexType": {
                    "original": "{ value: string; index: number }",
                    "resolved": "{ value: string; index: number; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "setFocus": {
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
                    "text": "Focus the segment programmatically",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-segment.js.map
