import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { getColorClass, getLabelClass, containerBaseClass } from "./wdpr-bottom-nav.utils";
export class WdprBottomNavItem {
    el;
    label;
    mediaType = 'icon';
    mediaSize = 'medium';
    iconName;
    iconBackground = 'none';
    iconVariant = 'secondary';
    customLabelClass = '';
    imageUrl;
    disabled = false;
    selected = false;
    itemSelected;
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ENTER || ev.key == KEYBOARD_KEYS.SPACE) {
            ev.preventDefault();
            this._itemClick();
        }
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    get _labelClass() {
        return getLabelClass(this._colorClass, this.customLabelClass);
    }
    get _colorClass() {
        return getColorClass(this.disabled);
    }
    _itemClick() {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this.itemSelected.emit(this.selected);
    }
    render() {
        return (h("div", { key: 'b341baf490414d6f7926c79b424d68423c73ed3f', class: containerBaseClass, tabIndex: this.disabled ? -1 : 0, role: "button", "aria-pressed": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : undefined, onClick: this._itemClick.bind(this) }, this.mediaType == 'avatar' && this.imageUrl && (h("span", { key: 'da604ca68e95ca825320a9615f9f4b3064ed7d23', class: "w-400 h-400 mr-025" }, h("wdpr-avatar", { key: '6cc7b1883097d2f08d2516bd1bd6b74eead34350', imageSrc: this.imageUrl, size: this.mediaSize, isInteractive: false }))), this.mediaType == 'icon' && this.iconBackground === 'none' && (h("span", { key: '92a5fabfa8822d9114fe7d32932dd7d335439e69', class: this._colorClass + ' p-075' }, h("wdpr-icon-library", { key: '6da24deb49619f575a066ff490e742e8c451b6a1', size: this.mediaSize, icon: this.iconName, decorative: true }))), this.mediaType == 'icon' && this.iconBackground !== 'none' && (h("wdpr-icon", { key: 'befa65f74d588afb5323b11954521d6bd589a2fb', size: this.mediaSize, icon: this.iconName, customClass: this._colorClass, decorative: true, background: this.iconBackground, variant: this.iconVariant })), h("span", { key: 'ce320e8b0083d0155464b3466f744d3b73df86a4', class: this._labelClass }, this.label)));
    }
    static get is() { return "wdpr-bottom-nav-item"; }
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "mediaType": {
                "type": "string",
                "attribute": "media-type",
                "mutable": false,
                "complexType": {
                    "original": "'icon' | 'avatar'",
                    "resolved": "\"avatar\" | \"icon\"",
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
                "reflect": false,
                "defaultValue": "'icon'"
            },
            "mediaSize": {
                "type": "string",
                "attribute": "media-size",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'medium' | 'large'",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
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
                "reflect": false,
                "defaultValue": "'medium'"
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
            "iconBackground": {
                "type": "string",
                "attribute": "icon-background",
                "mutable": false,
                "complexType": {
                    "original": "'circle' | 'square' | 'none'",
                    "resolved": "\"circle\" | \"none\" | \"square\"",
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
                "reflect": false,
                "defaultValue": "'none'"
            },
            "iconVariant": {
                "type": "string",
                "attribute": "icon-variant",
                "mutable": false,
                "complexType": {
                    "original": "'primary' | 'secondary'",
                    "resolved": "\"primary\" | \"secondary\"",
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
                "reflect": false,
                "defaultValue": "'secondary'"
            },
            "customLabelClass": {
                "type": "string",
                "attribute": "custom-label-class",
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
                "reflect": false,
                "defaultValue": "''"
            },
            "imageUrl": {
                "type": "string",
                "attribute": "image-url",
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
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
                "optional": true,
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
    static get events() {
        return [{
                "method": "itemSelected",
                "name": "itemSelected",
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
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-bottom-nav-item.js.map
