import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$8 } from './p-DS0cKrSV.js';
import { d as defineCustomElement$7 } from './p-DTaaOZwt.js';
import { d as defineCustomElement$6 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$5 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$4 } from './p-_QubyXiP.js';
import { d as defineCustomElement$3 } from './p-BOubPl_u.js';
import { d as defineCustomElement$2 } from './p-DuX_0jwp.js';
import { d as defineCustomElement$1 } from './p-DsPXJJ-e.js';

const WdprCardLink = /*@__PURE__*/ proxyCustomElement(class WdprCardLink extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.clicked = createEvent(this, "clicked", 7);
    }
    get el() { return this; }
    type = 'button';
    disabled = false;
    checked = false;
    name;
    value;
    a11yLabel;
    clicked;
    _handleClick = (e) => {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (this.type === 'button' || this.type === 'caret' || this.type === 'ellipses' || this.type === 'radio' || this.type === 'checkbox' || this.type === 'slot') {
            e.preventDefault();
            e.stopPropagation();
            this.clicked.emit();
        }
    };
    render() {
        if (this.type === 'button') {
            return (h("wdpr-button", { variant: "secondary", a11yLabel: "Card Button", size: "small", disabled: this.disabled, onClick: this._handleClick }, h("slot", null)));
        }
        if (this.type === 'caret') {
            return (h("wdpr-icon-button", { iconName: "next-caret-2.0", size: "small", disabled: this.disabled, a11yLabel: "Card Caret Link", onClick: this._handleClick, onClicked: e => e.stopPropagation(), "aria-disabled": this.disabled ? 'true' : 'false' }));
        }
        if (this.type === 'ellipses') {
            return (h("wdpr-icon-button", { iconName: "more", size: "small", disabled: this.disabled, a11yLabel: this.a11yLabel || 'More options', onClick: this._handleClick, "aria-disabled": this.disabled ? 'true' : 'false' }));
        }
        if (this.type === 'radio') {
            return h("wdpr-radio-button", { onClick: this._handleClick, name: "option", value: "option1", customAriaLabel: this.a11yLabel, disabled: this.disabled });
        }
        if (this.type === 'checkbox') {
            return h("wdpr-checkbox", { onClick: this._handleClick, checked: this.checked, labelPosition: "none", customAriaLabel: this.a11yLabel, disabled: this.disabled });
        }
        if (this.type === 'slot') {
            return (h("div", { onClick: this._handleClick }, h("slot", null)));
        }
    }
    static get style() { return ":host {\n      display: flex;\n      align-items: center;\n    }"; }
}, [257, "wdpr-card-link", {
        "type": [1],
        "disabled": [4],
        "checked": [1540],
        "name": [1],
        "value": [1],
        "a11yLabel": [1, "a11y-label"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-link", "wdpr-button", "wdpr-checkbox", "wdpr-icon-button", "wdpr-icon-library", "wdpr-inline-message", "wdpr-notification-indicator", "wdpr-radio-button", "wdpr-status-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-link":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardLink);
            }
            break;
        case "wdpr-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "wdpr-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-inline-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-radio-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprCardLink as W, defineCustomElement as d };
//# sourceMappingURL=p-NtKrtVUm.js.map

//# sourceMappingURL=p-NtKrtVUm.js.map