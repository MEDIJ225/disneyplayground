'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprApplicationHeader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.primaryButtonClicked = index.createEvent(this, "primaryButtonClicked", 7);
        this.avatarClicked = index.createEvent(this, "avatarClicked", 7);
        this.wdprMenuButtonClick = index.createEvent(this, "wdprMenuButtonClick", 7);
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
        return utils.customTwMerge('flex items-center justify-between w-full', 'p-200', 'min-h-[68px]');
    }
    get _appLogoClasses() {
        return utils.customTwMerge('flex items-center min-w-0 gap-150');
    }
    get _titleClasses() {
        return utils.customTwMerge(this.hideLabel ? 'sr-only' : '', 'min-w-0 hidden sm:block');
    }
    get _actionsClasses() {
        return utils.customTwMerge('flex items-center justify-end', 'shrink-0', 'gap-300');
    }
    render() {
        const hasAvatar = !!this.avatarText || !!this.avatarImgSrc;
        return (index.h(index.Host, { key: 'eb51d091640d629e5d4b89fb8b8b4b6fc42276ad' }, index.h("header", { key: 'e292e19e9f298417c6c13e5cc713c53f2b014ea3', class: this._rootClasses, role: "banner", "aria-label": this.appName }, index.h("div", { key: '11a01f5549b463824ac59544c31e5d41dfff4776', class: this._appLogoClasses }, index.h("wdpr-icon-button", { key: '6e7f95dbae7a34e18faa484ff9c20ada22a1b6c6', slot: "leading", variant: "secondary", size: "medium", iconName: "menu-global-nav", a11yLabel: "menu", onClick: this._onMenuButtonClicked }), index.h("wdpr-text-link", { key: '8fa4c4a6ec21e45bed535aa56d58f544392227de', customTabIndex: this.hideLabel ? -1 : undefined, href: this.appLink, variant: "secondary", size: "medium", class: this._titleClasses, a11yLabel: this.appName }, this.appName), index.h("slot", { key: '16d61df04f6ee80a273cb72c1e3b0c98b2c0ff63', name: "site-badge" }, this.environment && index.h("wdpr-environment-site-badge", { key: '260ac195d43842866b660b4cca72f64baca95128', environment: this.environment, site: this.site, environmentOnly: !this.site }))), index.h("div", { key: '790b789fc5750f35a85524adf46553c83cd1c078', class: this._actionsClasses }, index.h("slot", { key: '227d468b030d9970bb5ca012cc68447b31fc4255', name: "actions" }, !hasAvatar && (index.h("wdpr-button", { key: '715239a56c05bda8a6c287c545630976821ef7e1', variant: "secondary", size: "medium", a11yLabel: "Action Button", onClick: this._onPrimaryButtonClicked }, this.actionButtonText)), hasAvatar && (index.h("wdpr-avatar", { key: '623b4849b7cc8766809807181ab5c59fc52790ed', onWdprToggle: this._onAvatarClicked, imageSrc: this.avatarImgSrc, altText: this.avatarText, size: "small", text: this.avatarText })))))));
    }
};

exports.wdpr_application_header = WdprApplicationHeader;
//# sourceMappingURL=wdpr-application-header.entry.cjs.js.map

//# sourceMappingURL=wdpr-application-header.cjs.entry.js.map