import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
import { SelectedPinSvg, UnselectedPinSvg } from "./wdpr-map-pin.assets";
export class WdprMapPin {
    el;
    styleVariant = 'icon';
    label = 'trailing';
    selected = false;
    iconName;
    labelText = '';
    disabled = false;
    layout = 'none';
    a11yLabel = '';
    mapPinClick;
    /**
     * Icon name to display when style is 'icon' and state is 'selected'
     * If not provided, falls back to iconName
     */
    selectedIconName;
    /**
     * Time in minutes to display when style is 'time'
     * Only used when style='time'
     */
    time;
    /**
     * Get background color classes for the pin SVG
     */
    get _pinBackgroundColorClasses() {
        if (this.selected) {
            return 'text-surface-actionable-default group-hover:!text-surface-actionable-hover group-active:!text-surface-actionable-pressed';
        }
        return 'text-text-inverse group-hover:text-text-inverse group-active:text-text-inverse';
    }
    /**
     * Get color classes based on current state
     */
    get _iconColorClasses() {
        if (this.selected) {
            return 'heading-small text-text-inverse';
        }
        return 'component-medium text-text-actionable-default group-hover:!text-text-actionable-hover group-active:!text-text-actionable-pressed pl-[14px] pr-[10px]';
    }
    _renderIconContent() {
        const iconToUse = this.selected && this.selectedIconName ? this.selectedIconName : this.iconName;
        const position = this.selected ? 'ml-[21px] mb-[24px] mt-[5px]' : '';
        if (!iconToUse)
            return null;
        return (h("wdpr-icon-library", { icon: iconToUse, size: this.selected ? 'small' : 'medium', decorative: true, class: `transition-colors relative z-10 ${position} ${this._iconColorClasses}` }));
    }
    _renderTimeContent() {
        if (this.time === undefined)
            return null;
        const minSize = this.selected ? 'component-medium' : 'component-xxsmall';
        const position = this.selected ? (this.layout === 'inline' ? 'ml-[10px] mb-[12px] mt-[5px]' : 'ml-[21px] mb-[12px] mt-[5px]') : 'mt-[3px]';
        return (h("span", { class: `transition-colors relative z-10 ${position} ${this._iconColorClasses} ${!this.selected ? 'font-normal' : ''}` }, this.time, h("span", { class: `${minSize} block font-normal ${this.selected ? '-mt-100' : '-mt-075'}` }, "min")));
    }
    /**
     * Render the pin content (icon or time)
     */
    _renderPinContent() {
        if (this.styleVariant === 'icon') {
            return this._renderIconContent();
        }
        if (this.styleVariant === 'time') {
            return this._renderTimeContent();
        }
        return null;
    }
    _handleClick = () => {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this.mapPinClick.emit({ selected: this.selected });
    };
    /**
     * Get container classes for flex layout based on label position and layout
     */
    get _containerClasses() {
        const isStacked = this.layout === 'stacked' || (this.layout === 'none' && this.selected);
        const flexDirection = isStacked ? 'flex-col gap-050' : 'flex-row gap-100';
        const disabledClasses = this.disabled ? 'cursor-not-allowed opacity-50' : '';
        return customTwMerge(containerBaseClasses, flexDirection, disabledClasses);
    }
    _getBackgroundSVG() {
        return this.selected ? h(SelectedPinSvg, null) : h(UnselectedPinSvg, null);
    }
    get _backgroundPinClasses() {
        return customTwMerge('relative flex items-start justify-center', this.styleVariant !== 'time' ? 'pt-100' : '', (this.layout === 'stacked' || this.layout === 'none') && this.selected ? 'pr-200' : '', this.selected ? 'w-dimension-700 h-dimension-750' : 'w-[43px] h-dimension-600 pb-150', this._pinBackgroundColorClasses);
    }
    render() {
        return (h("button", { key: '1892a0de47023083666aa46a0183e523b3ff5da6', class: this._containerClasses, onClick: this._handleClick, disabled: this.disabled, type: "button", "aria-label": this.a11yLabel || undefined, "aria-pressed": this.selected.toString() }, this.labelText && this.label === 'leading' && h("span", { key: '39e4fda5c810b591040b74d9d65bfea9dfb7cb08', class: labelBaseClasses }, this.labelText), h("div", { key: '3575a59a9d7af3a746f271c2bcbd8dd7a8a5fc54', class: this._backgroundPinClasses, role: "presentation" }, this._getBackgroundSVG(), this._renderPinContent()), this.labelText && this.label === 'trailing' && h("span", { key: '9cc8c588ceb64d95258da206ad53f3548c58ab49', class: labelBaseClasses }, this.labelText)));
    }
    static get is() { return "wdpr-map-pin"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "styleVariant": {
                "type": "string",
                "attribute": "style-variant",
                "mutable": false,
                "complexType": {
                    "original": "MapPinStyle",
                    "resolved": "\"icon\" | \"time\"",
                    "references": {
                        "MapPinStyle": {
                            "location": "import",
                            "path": "./wdpr-map-pin.model",
                            "id": "src/components/wdpr-map-pin/wdpr-map-pin.model.ts::MapPinStyle"
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
                "defaultValue": "'icon'"
            },
            "label": {
                "type": "string",
                "attribute": "label",
                "mutable": false,
                "complexType": {
                    "original": "MapPinLabel",
                    "resolved": "\"leading\" | \"none\" | \"trailing\"",
                    "references": {
                        "MapPinLabel": {
                            "location": "import",
                            "path": "./wdpr-map-pin.model",
                            "id": "src/components/wdpr-map-pin/wdpr-map-pin.model.ts::MapPinLabel"
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
            "selected": {
                "type": "boolean",
                "attribute": "selected",
                "mutable": true,
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "labelText": {
                "type": "string",
                "attribute": "label-text",
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
            "layout": {
                "type": "string",
                "attribute": "layout",
                "mutable": false,
                "complexType": {
                    "original": "MapPinLayout",
                    "resolved": "\"inline\" | \"none\" | \"stacked\"",
                    "references": {
                        "MapPinLayout": {
                            "location": "import",
                            "path": "./wdpr-map-pin.model",
                            "id": "src/components/wdpr-map-pin/wdpr-map-pin.model.ts::MapPinLayout"
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
                "reflect": false,
                "defaultValue": "''"
            },
            "selectedIconName": {
                "type": "string",
                "attribute": "selected-icon-name",
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
                    "text": "Icon name to display when style is 'icon' and state is 'selected'\nIf not provided, falls back to iconName"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "time": {
                "type": "number",
                "attribute": "time",
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
                    "text": "Time in minutes to display when style is 'time'\nOnly used when style='time'"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "mapPinClick",
                "name": "wdprMapPinClick",
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
            }];
    }
    static get elementRef() { return "el"; }
}
const containerBaseClasses = `flex items-center cursor-pointer transition-colors group focus:outline-none focus-visible:outline-solid
  focus-visible:outline-037 focus-visible:outline-offset-2 focus-visible:outline-stroke-actionable-focused
  focus-visible:rounded-050`;
const labelBaseClasses = `transition-colors duration-200 label-medium !text-text-inverse text-stroke-shadow group-hover:!text-text-actionable-hover
  group-hover:text-stroke-shadow-active group-active:!text-text-actionable-pressed group-active:text-stroke-shadow-active`;
//# sourceMappingURL=wdpr-map-pin.js.map
