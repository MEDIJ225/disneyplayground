import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$5 } from './p-DS0cKrSV.js';
import { d as defineCustomElement$4 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$3 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$2 } from './p-BOubPl_u.js';

const WdprNavigationHeader$1 = /*@__PURE__*/ proxyCustomElement(class WdprNavigationHeader extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprNavigationHeaderMenuButtonClick = createEvent(this, "wdprNavigationHeaderMenuButtonClick", 7);
        this.wdprNavigationHeaderCloseClick = createEvent(this, "wdprNavigationHeaderCloseClick", 7);
        this.wdprNavigationHeaderSearchClick = createEvent(this, "wdprNavigationHeaderSearchClick", 7);
        this.wdprNavigationHeaderButtonClick = createEvent(this, "wdprNavigationHeaderButtonClick", 7);
    }
    get el() { return this; }
    theme = 'WDW';
    logoPath = '';
    a11yLabel = '';
    isOpen = false;
    isGradient = false;
    isFloating = false;
    isInverse = false;
    buttonLabel = 'Tickets';
    _shouldRestoreFocus = false;
    wdprNavigationHeaderMenuButtonClick;
    wdprNavigationHeaderCloseClick;
    wdprNavigationHeaderSearchClick;
    wdprNavigationHeaderButtonClick;
    get _actions() {
        return [
            {
                iconName: 'search',
                a11yLabel: 'Search site',
                a11yExpanded: undefined,
                onClick: this._onSearchClick,
            },
            {
                iconName: this.isOpen ? 'close-reversed' : 'menu-global-nav',
                a11yLabel: this.isOpen ? 'Close navigation menu' : 'Open navigation menu',
                a11yExpanded: this.isOpen ? 'true' : 'false',
                onClick: this._onNavigationToggleClick,
            },
        ];
    }
    _onSearchClick = () => {
        this.wdprNavigationHeaderSearchClick.emit();
    };
    _onTicketsButtonClick = () => {
        this.wdprNavigationHeaderButtonClick.emit();
    };
    _onNavigationToggleClick = () => {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.wdprNavigationHeaderMenuButtonClick.emit();
            return;
        }
        this.wdprNavigationHeaderCloseClick.emit();
        this._shouldRestoreFocus = true;
    };
    _getToggleButton() {
        const toggle = this.el.shadowRoot?.querySelector('wdpr-icon-button[iconname="menu-global-nav"]');
        return toggle?.shadowRoot?.querySelector('button') ?? null;
    }
    componentDidRender() {
        if (!this._shouldRestoreFocus)
            return;
        this._shouldRestoreFocus = false;
        this._getToggleButton()?.focus();
    }
    get _containerClass() {
        const baseContainerClass = 'flex items-center justify-between pl-150';
        const bgClass = this.isFloating ? 'bg-surface-translucent' : 'bg-surface-transparent';
        const floatingClass = this.isFloating ? 'rounded-300 elevation-xsmall-soft backdrop-blur-[calc(var(--effect-400)/2)]' : '';
        return customTwMerge(baseContainerClass, bgClass, floatingClass);
    }
    get _iconsContainerClass() {
        return 'flex items-center h-[52px]';
    }
    get _showDlrButton() {
        return this.theme === 'DLR';
    }
    get _dlrButtonVariant() {
        return (this.isInverse || this.isGradient) && !this.isFloating ? 'secondary' : 'primary';
    }
    get _iconButtonVariant() {
        return (this.isInverse || this.isGradient) && !this.isFloating ? 'inverse' : 'primary';
    }
    render() {
        return (h("nav", { key: '4a049221166d83de44dfbac3143b7365cb8b9686', class: this._containerClass, "aria-label": this.a11yLabel || 'Main navigation header' }, h("figure", { key: '8ca7d266af9079e79d26d0a3edc5cfb387ccc3df', "aria-hidden": "true" }, h("img", { key: '4b0348fbde085875f3993c88ca6d0db0d804977c', src: this.logoPath })), h("ul", { key: '662d1bed3519b865da57cd222bbcd5ddfb887b4e', class: this._iconsContainerClass, role: "list" }, this._showDlrButton && (h("li", { key: 'df116d1d0ddc2604b0125f9dc12f0cf2ac1b3529', class: "px-100 py-200" }, h("wdpr-button", { key: '878a153989158ee074c7d6885e37e2a80ac6e856', variant: this._dlrButtonVariant, size: "xsmall", display: "fit", a11yLabel: this.buttonLabel, onWdprClick: this._onTicketsButtonClick }, this.buttonLabel))), this._actions.map(action => (h("li", { class: "px-150 py-200" }, h("wdpr-icon-button", { iconName: action.iconName, a11yLabel: action.a11yLabel, a11yExpanded: action.a11yExpanded, variant: this._iconButtonVariant, onClicked: action.onClick })))))));
    }
}, [257, "wdpr-navigation-header", {
        "theme": [1],
        "logoPath": [1, "logo-path"],
        "a11yLabel": [1, "a11y-label"],
        "isOpen": [1540, "is-open"],
        "isGradient": [4, "is-gradient"],
        "isFloating": [4, "is-floating"],
        "isInverse": [4, "is-inverse"],
        "buttonLabel": [1, "button-label"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-navigation-header", "wdpr-button", "wdpr-icon-button", "wdpr-icon-library", "wdpr-notification-indicator"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-navigation-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprNavigationHeader$1);
            }
            break;
        case "wdpr-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprNavigationHeader = WdprNavigationHeader$1;
const defineCustomElement = defineCustomElement$1;

export { WdprNavigationHeader, defineCustomElement };
//# sourceMappingURL=wdpr-navigation-header.js.map

//# sourceMappingURL=wdpr-navigation-header.js.map