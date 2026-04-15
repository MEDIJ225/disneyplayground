import { Fragment, h } from "@stencil/core";
import { customTwMerge, generateRandId } from "../../utils/utils";
import { getNavItemLinkRel } from "../../utils/nav-item-link";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { getColorClass, getContainerClass, getLabelClass } from "./wdpr-nav-item-small.utils";
export class WdprNavItemSmall {
    el;
    _internalId;
    _isTwoLineClamp = false;
    label;
    variant = 'label';
    disabled = false;
    inverse = false;
    allowBoldText = false;
    showNotificationBadge = false;
    notificationNumber = 0;
    itemId;
    a11yLabel;
    href;
    target;
    rel;
    wdprNavItemSmallClick;
    _leadingSlot;
    _trailingSlot;
    _labelElement;
    _resizeObserver;
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleWindowResize() {
        this._updateClampState();
    }
    componentWillLoad() {
        this._updateSlots();
        this._internalId = this.itemId || `wdpr-nav-item-small-${generateRandId()}`;
    }
    componentDidLoad() {
        this._updateClampState();
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => this._updateClampState());
            this._resizeObserver.observe(this.el);
            if (this._labelElement) {
                this._resizeObserver.observe(this._labelElement);
            }
        }
    }
    componentDidRender() {
        this._updateClampState();
    }
    disconnectedCallback() {
        this._resizeObserver?.disconnect();
    }
    get _labelClass() {
        return getLabelClass(this._colorClass, this.allowBoldText);
    }
    get _containerClass() {
        return getContainerClass(this.variant, this.inverse);
    }
    get _contentAlignmentClass() {
        return this._isTwoLineClamp ? 'items-start' : 'items-center';
    }
    get _colorClass() {
        return getColorClass(this.disabled, this.inverse);
    }
    get _paddingClass() {
        if (this.variant === 'label-icon' && this._isTwoLineClamp) {
            return '';
        }
        return ['label-icon', 'icon-avatar-aligned'].includes(this.variant) ? '-mt-025' : '';
    }
    get _trailingAlignmentOffsetClass() {
        return '-mt-025';
    }
    get _trailingSectionAlignmentClass() {
        return this._isTwoLineClamp ? 'self-start' : '';
    }
    get _sideAlignmentClass() {
        return this._isTwoLineClamp ? 'self-start' : '';
    }
    get labelAvatarAligned() {
        return this.variant === 'icon-avatar-aligned' ? 'px-075 ml-075' : '';
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
    _emitClick() {
        this.wdprNavItemSmallClick.emit(this._internalId);
    }
    _onItemInteraction = (ev) => {
        ev.preventDefault();
        if (this.disabled)
            return;
        this._emitClick();
    };
    _onItemKeyDown = (ev) => {
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
            this._onItemInteraction(ev);
        }
    };
    _onLinkClick = () => {
        if (this.disabled)
            return;
        this._emitClick();
    };
    _updateSlots = () => {
        this._leadingSlot = this.el.querySelector('[slot="leading-icon"]');
        this._trailingSlot = this.el.querySelector('[slot="trailing-icon"]');
    };
    _updateClampState = () => {
        if (!this._labelElement || typeof window === 'undefined')
            return;
        // keep explicit calculation to not hardcode the line height value
        const lineHeight = Number.parseFloat(window.getComputedStyle(this._labelElement).lineHeight);
        const isTwoLineClamp = this._labelElement.scrollHeight > lineHeight * 1.5;
        if (isTwoLineClamp !== this._isTwoLineClamp) {
            this._isTwoLineClamp = isTwoLineClamp;
        }
    };
    render() {
        const body = (h(Fragment, null, h("section", { class: `flex min-w-0 flex-1 gap-100 ${this._contentAlignmentClass}` }, this._leadingSlot && (h("div", { class: `shrink-0 flex items-center ${this._paddingClass} ${this.labelAvatarAligned} ${this._colorClass}` }, h("slot", { name: "leading-icon", onSlotchange: this._updateSlots }))), h("span", { class: this._labelClass, ref: el => (this._labelElement = el) }, this.label)), h("section", { class: `flex shrink-0 ${this._trailingSectionAlignmentClass} ${this._trailingAlignmentOffsetClass} ${this._contentAlignmentClass}` }, this.showNotificationBadge && (h("span", { class: `flex items-center ${this._sideAlignmentClass} px-075` }, h("wdpr-notification-indicator", { size: "small", number: this.notificationNumber, decorative: true }))), this._trailingSlot && (h("div", { class: `flex items-center ${this._sideAlignmentClass} ${this._colorClass}` }, h("slot", { name: "trailing-icon", onSlotchange: this._updateSlots }))))));
        if (this._isNavLink) {
            return (h("a", { class: this._anchorClass, href: this.href.trim(), id: this._internalId, "aria-label": this._accessibleLabel, target: this.target, rel: getNavItemLinkRel(this.target, this.rel), onClick: this._onLinkClick }, body));
        }
        return (h("div", { tabIndex: this.disabled ? -1 : 0, class: this._containerClass, id: this._internalId, role: "button", "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this._accessibleLabel, onClick: this._onItemInteraction, onKeyDown: this._onItemKeyDown }, body));
    }
    static get is() { return "wdpr-nav-item-small"; }
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
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "NavItemSmallVariant",
                    "resolved": "\"avatar\" | \"icon-avatar-aligned\" | \"label\" | \"label-icon\"",
                    "references": {
                        "NavItemSmallVariant": {
                            "location": "import",
                            "path": "./wdpr-nav-item-small.model",
                            "id": "src/components/wdpr-nav-item-small/wdpr-nav-item-small.model.ts::NavItemSmallVariant"
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
                "reflect": true,
                "defaultValue": "'label'"
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
            "showNotificationBadge": {
                "type": "boolean",
                "attribute": "show-notification-badge",
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
            "notificationNumber": {
                "type": "number",
                "attribute": "notification-number",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0"
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
            "_internalId": {},
            "_isTwoLineClamp": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprNavItemSmallClick",
                "name": "wdprNavItemSmallClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "NavItemClickDetail",
                    "resolved": "string",
                    "references": {
                        "NavItemClickDetail": {
                            "location": "import",
                            "path": "./wdpr-nav-item-small.model",
                            "id": "src/components/wdpr-nav-item-small/wdpr-nav-item-small.model.ts::NavItemClickDetail"
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
//# sourceMappingURL=wdpr-nav-item-small.js.map
