import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { d as defineCustomElement$e } from './p-B0ImOrmz.js';
import { d as defineCustomElement$d } from './p-DS0cKrSV.js';
import { d as defineCustomElement$c } from './p-NtKrtVUm.js';
import { d as defineCustomElement$b } from './p-yYLjtNN2.js';
import { d as defineCustomElement$a } from './p-C9v7aPHi.js';
import { d as defineCustomElement$9 } from './p-DTaaOZwt.js';
import { d as defineCustomElement$8 } from './p-Cgr7ipmz.js';
import { d as defineCustomElement$7 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$6 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$5 } from './p-_QubyXiP.js';
import { d as defineCustomElement$4 } from './p-BOubPl_u.js';
import { d as defineCustomElement$3 } from './p-DuX_0jwp.js';
import { d as defineCustomElement$2 } from './p-DsPXJJ-e.js';

const WdprStandaloneResultsListGuestCardItem$1 = /*@__PURE__*/ proxyCustomElement(class WdprStandaloneResultsListGuestCardItem extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprSelect = createEvent(this, "wdprSelect", 7);
        this.wdprActionClick = createEvent(this, "wdprActionClick", 7);
    }
    value;
    selected = false;
    disabled = false;
    mode = 'single';
    label;
    description;
    buttonActionText;
    imageSrc;
    singleSelectionActionType = 'none';
    a11yAlt;
    a11yLabel;
    wdprSelect;
    wdprActionClick;
    _handleSelection = (event) => {
        event.stopPropagation();
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, selected: event.detail.selected });
    };
    _handleActionClick = (event) => {
        event.stopPropagation();
        this.wdprActionClick.emit();
    };
    render() {
        return (h(Host, { key: '02fd95d97a2263f1b24dcf9674e76b99b64a916b', role: "listitem", "data-standalone-results-list-item": true }, h("wdpr-guest-card", { key: '398a3c20acc199628a61c4712680fcc6a1ce0be3', isOnSurface: false, actionPosition: "trailing", onWdprSelectedChange: this._handleSelection, selected: this.selected, disabled: this.disabled }, h("wdpr-avatar", { key: '9a0306bceb2a213d3f4896adcf03fd4e034deca2', slot: "media", size: "medium", "image-src": this.imageSrc, "alt-text": this.a11yAlt, labelPosition: "stacked", isInteractive: false }), h("wdpr-card-micro-content", { key: '77dbc15dfdc8356fbf49076dd28ff13d413d561a', slot: "content", primaryHeadline: this.label, body: this.description }), this.singleSelectionActionType !== 'none' && this.mode === 'single' && (h("wdpr-card-link", { key: '487537f36806a0466dcaf1ac20b4da6c803fa5a8', slot: "link", type: this.singleSelectionActionType, onClick: this._handleActionClick }, this.buttonActionText)), this.mode === 'multiple' && (h("wdpr-card-link", { key: 'b3005dd9d43c1876226ba08ad2cead0497fd393c', slot: "link", type: "checkbox", a11yLabel: this.a11yLabel, checked: this.selected, onClick: this._handleActionClick })))));
    }
}, [257, "wdpr-standalone-results-list-guest-card-item", {
        "value": [1],
        "selected": [516],
        "disabled": [516],
        "mode": [1],
        "label": [1],
        "description": [1],
        "buttonActionText": [1, "button-action-text"],
        "imageSrc": [1, "image-src"],
        "singleSelectionActionType": [1, "single-selection-action-type"],
        "a11yAlt": [1, "a11y-alt"],
        "a11yLabel": [1, "a11y-label"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-standalone-results-list-guest-card-item", "wdpr-avatar", "wdpr-button", "wdpr-card-link", "wdpr-card-micro", "wdpr-card-micro-content", "wdpr-checkbox", "wdpr-guest-card", "wdpr-icon-button", "wdpr-icon-library", "wdpr-inline-message", "wdpr-notification-indicator", "wdpr-radio-button", "wdpr-status-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-standalone-results-list-guest-card-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprStandaloneResultsListGuestCardItem$1);
            }
            break;
        case "wdpr-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "wdpr-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "wdpr-card-link":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "wdpr-card-micro":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "wdpr-card-micro-content":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "wdpr-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "wdpr-guest-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-inline-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-radio-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprStandaloneResultsListGuestCardItem = WdprStandaloneResultsListGuestCardItem$1;
const defineCustomElement = defineCustomElement$1;

export { WdprStandaloneResultsListGuestCardItem, defineCustomElement };
//# sourceMappingURL=wdpr-standalone-results-list-guest-card-item.js.map

//# sourceMappingURL=wdpr-standalone-results-list-guest-card-item.js.map