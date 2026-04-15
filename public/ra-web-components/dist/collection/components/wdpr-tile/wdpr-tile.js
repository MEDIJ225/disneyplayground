import { h, Host } from "@stencil/core";
import { generateRandId } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { getIconClass, getBaseClasses, getDisabledClasses, getDefaultClasses, getCustomIconClass, getPrimaryLabelClasses, getSecondaryLabelClasses } from "./tile-utils";
export class WdprTile {
    el;
    _hasAvatarGroup = false;
    _internalId;
    label = '';
    disabled = false;
    visualContent = 'icon';
    roleType = 'button';
    iconJustified = false;
    secondaryLabel = null;
    iconName;
    mediaSrc;
    orientation = 'vertical';
    fullWidth = 'false';
    backgroundIcon = 'none';
    tileId;
    showNotificationIcon = false;
    navigationPath = '';
    a11yLabel = '';
    a11yIconLabel;
    wdprClick;
    componentWillLoad() {
        this._hasAvatarGroup = !!this.el.querySelector('[slot="avatar-group"]');
        this._internalId = this.tileId || `wdpr-tile-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    get _baseClasses() {
        return getBaseClasses(this.orientation, this._hasAvatarGroup, this.iconJustified);
    }
    get _disabledClasses() {
        return getDisabledClasses(this._baseClasses);
    }
    get _defaultClasses() {
        return getDefaultClasses(this._baseClasses, this.orientation, this.backgroundIcon, !!this.secondaryLabel);
    }
    get _customClass() {
        return getCustomIconClass(this.disabled, this.backgroundIcon);
    }
    get _iconClass() {
        return getIconClass(this.disabled);
    }
    _onPress = () => {
        if (this.disabled)
            return;
        this.wdprClick.emit({ tileElement: this.el, navigationPath: this.navigationPath });
    };
    _onKeyDown = (event) => {
        const key = event.key;
        if (key == KEYBOARD_KEYS.ENTER || (key == KEYBOARD_KEYS.SPACE && this.roleType !== 'link')) {
            event.preventDefault();
            this._onPress();
        }
    };
    render() {
        const isLink = this.roleType === 'link' && !!this.navigationPath;
        const Tag = this.roleType === 'link' ? 'a' : 'div';
        const linkProps = isLink ? { href: this.navigationPath } : {};
        return (h(Host, { key: '6b7dd28e3b8809c8d990f96ee64a9bc855e18568', class: { 'full-width': this.fullWidth == 'true' || this.fullWidth === true } }, this.showNotificationIcon && h("wdpr-notification-indicator", { key: 'ed22ac35859a9768c294846ea8de1bb44a33db7e', class: "absolute top-[-8] right-[-2]" }), h(Tag, { key: '69fa7b95903f51b2f661cc0a59bc685b283352bd', ...linkProps, class: this.disabled ? this._disabledClasses : this._defaultClasses, role: this.roleType === 'button' ? 'button' : undefined, tabindex: this.disabled ? -1 : 0, "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this.a11yLabel || undefined, id: this._internalId, onClick: this._onPress, onKeyDown: this._onKeyDown }, this.visualContent === 'icon' && (h("div", { key: '02c9141d1020e6a19d11dbf442ebfd12b3cc429f', class: this._iconClass }, this.orientation === 'vertical' && h("wdpr-icon-library", { key: '8d7d56dc6d1f77676bef3d087f112b2646afcf06', icon: this.iconName, size: "large", decorative: !this.a11yIconLabel, a11yLabel: this.a11yIconLabel }), this.orientation === 'horizontal' && (h("wdpr-icon", { key: '8b8e1b2eb2624a6b5ff01c7c26cfb70d66b7ed3a', icon: this.iconName, size: "medium", background: this.backgroundIcon, variant: "secondary", customClass: this._customClass, decorative: !this.a11yIconLabel, a11yLabel: this.a11yIconLabel })))), this.visualContent === 'media' && (h("div", { key: 'ae927145ffb5f55456c377f61ecfea2d6e2a9ff0', class: "w-dimension-400 h-dimension-400" }, h("wdpr-media", { key: '35d406bf43fce276d081f40e5c28f2520cbfee57', src: this.mediaSrc, alt: "alt", fade: true, aspect: "square", shape: "flat", objectFit: "fill", landscapeRatio: "16:9", portraitRatio: "3:4" }))), this.visualContent == 'avatarGroup' && this.orientation === 'vertical' && (h("div", { key: '834a1326ce9f6432211f1e18d3bfbd74e2e24d96', class: "ml-[-5px]" }, h("slot", { key: '62f7342fdc6dd9a97b5c09c306210adf1d900bf5', name: "avatar-group" }))), h("div", { key: '16b38c44b5d15a0aadaeb0523fdc782e92269d15', class: "content-wrapper overflow-hidden text-ellipsis" }, this.label && h("div", { key: 'b6d3a89459230b8e2ea3469d6cc7d7ceafdbd400', class: getPrimaryLabelClasses(this.disabled) }, this.label), this.secondaryLabel && h("div", { key: 'ee7c82f0a355c695685f002bc0874a6400e020ae', class: getSecondaryLabelClasses(this.disabled) }, this.secondaryLabel)))));
    }
    static get is() { return "wdpr-tile"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-tile.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-tile.css"]
        };
    }
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
            "visualContent": {
                "type": "string",
                "attribute": "visual-content",
                "mutable": false,
                "complexType": {
                    "original": "TileVisualContent",
                    "resolved": "\"avatarGroup\" | \"icon\" | \"media\"",
                    "references": {
                        "TileVisualContent": {
                            "location": "import",
                            "path": "./wdpr-tile.model",
                            "id": "src/components/wdpr-tile/wdpr-tile.model.ts::TileVisualContent"
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
            "roleType": {
                "type": "string",
                "attribute": "role-type",
                "mutable": false,
                "complexType": {
                    "original": "'button' | 'link'",
                    "resolved": "\"button\" | \"link\"",
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
                "defaultValue": "'button'"
            },
            "iconJustified": {
                "type": "boolean",
                "attribute": "icon-justified",
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
            "secondaryLabel": {
                "type": "string",
                "attribute": "secondary-label",
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
                "reflect": false,
                "defaultValue": "null"
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
            "mediaSrc": {
                "type": "string",
                "attribute": "media-src",
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
            "orientation": {
                "type": "string",
                "attribute": "orientation",
                "mutable": false,
                "complexType": {
                    "original": "TileOrientation",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {
                        "TileOrientation": {
                            "location": "import",
                            "path": "./wdpr-tile.model",
                            "id": "src/components/wdpr-tile/wdpr-tile.model.ts::TileOrientation"
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
                "defaultValue": "'vertical'"
            },
            "fullWidth": {
                "type": "any",
                "attribute": "full-width",
                "mutable": false,
                "complexType": {
                    "original": "StringBoolean | boolean",
                    "resolved": "\"false\" | \"true\" | boolean",
                    "references": {
                        "StringBoolean": {
                            "location": "import",
                            "path": "../wdpr-text-area/wdpr-text-field.model",
                            "id": "src/components/wdpr-text-area/wdpr-text-field.model.ts::StringBoolean"
                        }
                    }
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
                "defaultValue": "'false'"
            },
            "backgroundIcon": {
                "type": "string",
                "attribute": "background-icon",
                "mutable": false,
                "complexType": {
                    "original": "TileBackgroundIcon",
                    "resolved": "\"circle\" | \"none\" | \"square\"",
                    "references": {
                        "TileBackgroundIcon": {
                            "location": "import",
                            "path": "./wdpr-tile.model",
                            "id": "src/components/wdpr-tile/wdpr-tile.model.ts::TileBackgroundIcon"
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
            "tileId": {
                "type": "string",
                "attribute": "tile-id",
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
            "showNotificationIcon": {
                "type": "boolean",
                "attribute": "show-notification-icon",
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
                "reflect": false,
                "defaultValue": "false"
            },
            "navigationPath": {
                "type": "string",
                "attribute": "navigation-path",
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
            "a11yIconLabel": {
                "type": "string",
                "attribute": "a11y-icon-label",
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
            }
        };
    }
    static get states() {
        return {
            "_hasAvatarGroup": {},
            "_internalId": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprClick",
                "name": "wdprClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ tileElement: unknown; navigationPath?: string }",
                    "resolved": "{ tileElement: unknown; navigationPath?: string; }",
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
//# sourceMappingURL=wdpr-tile.js.map
