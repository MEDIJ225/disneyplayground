import { Fragment, h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { customTwMerge, generateRandId } from "../../utils/utils";
import { getNavItemLinkRel } from "../../utils/nav-item-link";
import { getContainerClass, getLabelClass, getMediaClass } from "./wdpr-nav-item-medium.utils";
export class WdprNavItemMedium {
    el;
    _hasMedia = false;
    _internalId;
    _isTwoLineClamp = false;
    /**
     * Size of the media element (only applies when mediaType is 'image')
     */
    mediaSize = 'medium';
    /**
     * Optional prop for custom label styling
     * Consistency across media types, as icons may require different label styling than images
     */
    customLabelClass = '';
    allowBoldText = false;
    label;
    mediaType = 'image';
    disabled = false;
    inverse = false;
    itemId;
    a11yLabel;
    href;
    target;
    rel;
    wdprNavItemMediumClick;
    _labelElement;
    _resizeObserver;
    componentWillLoad() {
        this._updateSlots();
        this._internalId = this.itemId || `wdpr-nav-item-medium-${generateRandId()}`;
    }
    componentDidLoad() {
        this._updateClampState();
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => this._updateClampState());
            this._resizeObserver.observe(this.el);
        }
    }
    disconnectedCallback() {
        this._resizeObserver?.disconnect();
    }
    handleKeyDown(ev) {
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleWindowResize() {
        this._updateClampState();
    }
    get _containerClass() {
        return getContainerClass(this.disabled, this.inverse);
    }
    get _accessibleLabel() {
        return this.a11yLabel || this.label;
    }
    get _isNavLink() {
        return Boolean(this.href?.trim()) && !this.disabled;
    }
    get _anchorClass() {
        return customTwMerge(this._containerClass, 'no-underline');
    }
    get _labelClass() {
        return customTwMerge(getLabelClass(this.customLabelClass, this.allowBoldText), this._isTwoLineClamp && '!py-0 -mt-025');
    }
    get _mediaClass() {
        return customTwMerge('self-start', this.mediaType === 'image' && getMediaClass(this.mediaSize));
    }
    _updateSlots = () => {
        const mediaSlot = this.el.querySelector('[slot="media"]');
        this._hasMedia = !!mediaSlot;
    };
    _updateClampState = () => {
        if (!this._labelElement || typeof window === 'undefined')
            return;
        const lineHeight = Number.parseFloat(window.getComputedStyle(this._labelElement).lineHeight);
        const isTwoLineClamp = this._labelElement.scrollHeight > lineHeight * 1.5;
        if (isTwoLineClamp !== this._isTwoLineClamp) {
            this._isTwoLineClamp = isTwoLineClamp;
        }
    };
    _onClick = () => {
        if (this.disabled)
            return;
        this.wdprNavItemMediumClick.emit(this._internalId);
    };
    _onLinkClick = () => {
        if (this.disabled)
            return;
        this.wdprNavItemMediumClick.emit(this._internalId);
    };
    _renderMedia() {
        if (!this._hasMedia)
            return null;
        if (this.mediaType === 'icon') {
            return (h("div", { class: this._mediaClass }, h("slot", { name: "media", onSlotchange: this._updateSlots })));
        }
        return (h("div", { class: this._mediaClass }, h("slot", { name: "media", onSlotchange: this._updateSlots })));
    }
    render() {
        const body = (h(Fragment, null, this._renderMedia(), h("div", { class: this._labelClass, ref: el => (this._labelElement = el) }, this.label)));
        if (this._isNavLink) {
            return (h("a", { class: this._anchorClass, href: this.href.trim(), id: this._internalId, "aria-label": this._accessibleLabel, target: this.target, rel: getNavItemLinkRel(this.target, this.rel), onClick: this._onLinkClick }, body));
        }
        return (h("button", { type: "button", disabled: this.disabled, class: this._containerClass, "aria-label": this._accessibleLabel, id: this._internalId, onClick: this._onClick }, body));
    }
    static get is() { return "wdpr-nav-item-medium"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host([media-type='image']) ::slotted(*) {\n      display: block;\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }"; }
    static get properties() {
        return {
            "mediaSize": {
                "type": "string",
                "attribute": "media-size",
                "mutable": false,
                "complexType": {
                    "original": "NavItemMediumMediaSize",
                    "resolved": "\"large\" | \"medium\" | \"xlarge\"",
                    "references": {
                        "NavItemMediumMediaSize": {
                            "location": "import",
                            "path": "./wdpr-nav-item-medium.model",
                            "id": "src/components/wdpr-nav-item-medium/wdpr-nav-item-medium.model.ts::NavItemMediumMediaSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Size of the media element (only applies when mediaType is 'image')"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'medium'"
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
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Optional prop for custom label styling\nConsistency across media types, as icons may require different label styling than images"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "allowBoldText": {
                "type": "boolean",
                "attribute": "allow-bold-text",
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
                    "original": "NavItemMediumMediaType",
                    "resolved": "\"icon\" | \"image\"",
                    "references": {
                        "NavItemMediumMediaType": {
                            "location": "import",
                            "path": "./wdpr-nav-item-medium.model",
                            "id": "src/components/wdpr-nav-item-medium/wdpr-nav-item-medium.model.ts::NavItemMediumMediaType"
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
                "defaultValue": "'image'"
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
            "inverse": {
                "type": "boolean",
                "attribute": "inverse",
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
            "itemId": {
                "type": "string",
                "attribute": "item-id",
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "href": {
                "type": "string",
                "attribute": "href",
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
            "target": {
                "type": "string",
                "attribute": "target",
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
            "rel": {
                "type": "string",
                "attribute": "rel",
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
            }
        };
    }
    static get states() {
        return {
            "_hasMedia": {},
            "_internalId": {},
            "_isTwoLineClamp": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprNavItemMediumClick",
                "name": "wdprNavItemMediumClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "NavItemMediumClickDetail",
                    "resolved": "string",
                    "references": {
                        "NavItemMediumClickDetail": {
                            "location": "import",
                            "path": "./wdpr-nav-item-medium.model",
                            "id": "src/components/wdpr-nav-item-medium/wdpr-nav-item-medium.model.ts::NavItemMediumClickDetail"
                        }
                    }
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
            }, {
                "name": "window:resize",
                "method": "handleWindowResize",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-nav-item-medium.js.map
