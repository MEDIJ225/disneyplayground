import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$a } from './p-B0ImOrmz.js';
import { d as defineCustomElement$9 } from './p-KzTfvkfy.js';
import { d as defineCustomElement$8 } from './p-DS0cKrSV.js';
import { d as defineCustomElement$7 } from './p-B5JhXit7.js';
import { d as defineCustomElement$6 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$5 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$4 } from './p-BOubPl_u.js';
import { d as defineCustomElement$3 } from './p-BeIHu0tu.js';
import { d as defineCustomElement$2 } from './p-Cb7GjcQn.js';

const WdprApplicationHeader$1 = /*@__PURE__*/ proxyCustomElement(class WdprApplicationHeader extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.primaryButtonClicked = createEvent(this, "primaryButtonClicked", 7);
        this.avatarClicked = createEvent(this, "avatarClicked", 7);
        this.wdprMenuButtonClick = createEvent(this, "wdprMenuButtonClick", 7);
    }
    /**
     * Application name rendered in the header.
     * This value is also used as the accessible label for the banner.
     */
    appName;
    /**
     * Hides the visible label but keeps it exposed to assistive technologies.
     */
    hideLabel = false;
    /**
     * Environment label shown in the badge.
     */
    environment;
    /**
     * Site indicator shown in the badge.
     */
    site;
    /**
     * Href for the application name link.
     */
    appLink = '#';
    /**
     * Label for the default primary action button.
     * Used when no custom actions and no avatar are provided.
     */
    actionButtonText = 'Sign In';
    /**
     * Text used to render the default avatar.
     * When defined (or combined with `avatarImgSrc`), the default avatar is shown.
     */
    avatarText;
    /**
     * Image source for the default avatar.
     * When defined (or combined with `avatarText`), the default avatar is shown.
     */
    avatarImgSrc;
    /**
     * Event emitted when the primary action button is clicked.
     * This only fires when the default Sign In button is rendered (no avatar and no custom actions).
     */
    primaryButtonClicked;
    /**
     * Event emitted when the default avatar is activated.
     * This only fires when the default avatar is rendered (avatarText and/or avatarImgSrc provided, and no custom actions).
     */
    avatarClicked;
    _onPrimaryButtonClicked = () => {
        this.primaryButtonClicked.emit(true);
    };
    /**
     * Event emitted when the menu (hamburger) button is clicked.
     */
    wdprMenuButtonClick;
    _onAvatarClicked = () => {
        this.avatarClicked.emit(true);
    };
    _onMenuButtonClicked = () => {
        this.wdprMenuButtonClick.emit();
    };
    get _rootClasses() {
        return customTwMerge('flex items-center justify-between w-full', 'p-200', 'min-h-[68px]');
    }
    get _appLogoClasses() {
        return customTwMerge('flex items-center min-w-0 gap-150');
    }
    get _titleClasses() {
        return customTwMerge(this.hideLabel ? 'sr-only' : '', 'min-w-0 hidden sm:block');
    }
    get _actionsClasses() {
        return customTwMerge('flex items-center justify-end', 'shrink-0', 'gap-300');
    }
    render() {
        const hasAvatar = !!this.avatarText || !!this.avatarImgSrc;
        return (h(Host, { key: 'eb51d091640d629e5d4b89fb8b8b4b6fc42276ad' }, h("header", { key: 'e292e19e9f298417c6c13e5cc713c53f2b014ea3', class: this._rootClasses, role: "banner", "aria-label": this.appName }, h("div", { key: '11a01f5549b463824ac59544c31e5d41dfff4776', class: this._appLogoClasses }, h("wdpr-icon-button", { key: '6e7f95dbae7a34e18faa484ff9c20ada22a1b6c6', slot: "leading", variant: "secondary", size: "medium", iconName: "menu-global-nav", a11yLabel: "menu", onClick: this._onMenuButtonClicked }), h("wdpr-text-link", { key: '8fa4c4a6ec21e45bed535aa56d58f544392227de', customTabIndex: this.hideLabel ? -1 : undefined, href: this.appLink, variant: "secondary", size: "medium", class: this._titleClasses, a11yLabel: this.appName }, this.appName), h("slot", { key: '16d61df04f6ee80a273cb72c1e3b0c98b2c0ff63', name: "site-badge" }, this.environment && h("wdpr-environment-site-badge", { key: '260ac195d43842866b660b4cca72f64baca95128', environment: this.environment, site: this.site, environmentOnly: !this.site }))), h("div", { key: '790b789fc5750f35a85524adf46553c83cd1c078', class: this._actionsClasses }, h("slot", { key: '227d468b030d9970bb5ca012cc68447b31fc4255', name: "actions" }, !hasAvatar && (h("wdpr-button", { key: '715239a56c05bda8a6c287c545630976821ef7e1', variant: "secondary", size: "medium", a11yLabel: "Action Button", onClick: this._onPrimaryButtonClicked }, this.actionButtonText)), hasAvatar && (h("wdpr-avatar", { key: '623b4849b7cc8766809807181ab5c59fc52790ed', onWdprToggle: this._onAvatarClicked, imageSrc: this.avatarImgSrc, altText: this.avatarText, size: "small", text: this.avatarText })))))));
    }
}, [257, "wdpr-application-header", {
        "appName": [1, "app-name"],
        "hideLabel": [4, "hide-label"],
        "environment": [1],
        "site": [1],
        "appLink": [1, "app-link"],
        "actionButtonText": [1, "action-button-text"],
        "avatarText": [1, "avatar-text"],
        "avatarImgSrc": [1, "avatar-img-src"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-application-header", "wdpr-avatar", "wdpr-badge", "wdpr-button", "wdpr-environment-site-badge", "wdpr-icon-button", "wdpr-icon-library", "wdpr-notification-indicator", "wdpr-surface-style", "wdpr-text-link"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-application-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprApplicationHeader$1);
            }
            break;
        case "wdpr-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "wdpr-badge":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "wdpr-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "wdpr-environment-site-badge":
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
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-surface-style":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-text-link":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprApplicationHeader = WdprApplicationHeader$1;
const defineCustomElement = defineCustomElement$1;

export { WdprApplicationHeader, defineCustomElement };
//# sourceMappingURL=wdpr-application-header.js.map

//# sourceMappingURL=wdpr-application-header.js.map