import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { generateRandId } from "../../utils/utils";
export class WdprSecondaryNavSection {
    el;
    _internalId;
    _hasLabelSlot = false;
    sectionId;
    a11yLabel = '';
    variant = 'quiet';
    wdprSecondaryNavSectionClick;
    componentWillLoad() {
        this._internalId = this.sectionId || `wdpr-secondary-nav-section-${generateRandId()}`;
        this._updateSlots();
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleNavItemSmallClick(event) {
        if (!event?.detail)
            return;
        this.wdprSecondaryNavSectionClick.emit(event.detail);
    }
    handleNavItemSelectableChange(event) {
        const itemId = event?.detail?.itemId;
        if (!itemId)
            return;
        this.wdprSecondaryNavSectionClick.emit(itemId);
    }
    _updateSlots = () => {
        this._hasLabelSlot = !!this.el.querySelector('[slot="label"]');
    };
    get _labelClass() {
        return this.variant === 'loud'
            ? 'text-text-heading text-heading-small font-weight-heading-default leading-heading-small tracking--05 py-100 mb-200'
            : 'text-text-body text-body-medium font-weight-body-default leading-body-medium tracking-default py-100';
    }
    render() {
        return (h("section", { key: '9ab68a69f6a90a9931064f55b3addb73e2e0359c', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-100" }, this._hasLabelSlot && (h("div", { key: '1f5fa8ccaf284bbe9f402e4458cb1de252aecfeb', class: this._labelClass }, h("slot", { key: '25b3be76538dfbcaa2f1586c3fab648cbcee8792', name: "label", onSlotchange: this._updateSlots }))), h("div", { key: 'e498ae587005b0b65ee7d1e2d6170e33dde9e104', class: "flex flex-col gap-100" }, h("slot", { key: '71dd69b03de92304135aba02d3be3e5ed84919c8' }))));
    }
    static get is() { return "wdpr-secondary-nav-section"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "sectionId": {
                "type": "string",
                "attribute": "section-id",
                "mutable": true,
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
                "reflect": true
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
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "'loud' | 'quiet'",
                    "resolved": "\"loud\" | \"quiet\"",
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
                "defaultValue": "'quiet'"
            }
        };
    }
    static get states() {
        return {
            "_internalId": {},
            "_hasLabelSlot": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprSecondaryNavSectionClick",
                "name": "wdprSecondaryNavSectionClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
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
            }, {
                "name": "wdprNavItemSmallClick",
                "method": "handleNavItemSmallClick",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "wdprSelectChange",
                "method": "handleNavItemSelectableChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-secondary-nav-section.js.map
