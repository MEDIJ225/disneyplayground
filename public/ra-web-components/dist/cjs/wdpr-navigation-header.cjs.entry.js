'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprNavigationHeader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprNavigationHeaderMenuButtonClick = index.createEvent(this, "wdprNavigationHeaderMenuButtonClick", 7);
        this.wdprNavigationHeaderCloseClick = index.createEvent(this, "wdprNavigationHeaderCloseClick", 7);
        this.wdprNavigationHeaderSearchClick = index.createEvent(this, "wdprNavigationHeaderSearchClick", 7);
        this.wdprNavigationHeaderButtonClick = index.createEvent(this, "wdprNavigationHeaderButtonClick", 7);
    }
    get el() { return index.getElement(this); }
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
        return utils.customTwMerge(baseContainerClass, bgClass, floatingClass);
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
        return (index.h("nav", { key: '4a049221166d83de44dfbac3143b7365cb8b9686', class: this._containerClass, "aria-label": this.a11yLabel || 'Main navigation header' }, index.h("figure", { key: '8ca7d266af9079e79d26d0a3edc5cfb387ccc3df', "aria-hidden": "true" }, index.h("img", { key: '4b0348fbde085875f3993c88ca6d0db0d804977c', src: this.logoPath })), index.h("ul", { key: '662d1bed3519b865da57cd222bbcd5ddfb887b4e', class: this._iconsContainerClass, role: "list" }, this._showDlrButton && (index.h("li", { key: 'df116d1d0ddc2604b0125f9dc12f0cf2ac1b3529', class: "px-100 py-200" }, index.h("wdpr-button", { key: '878a153989158ee074c7d6885e37e2a80ac6e856', variant: this._dlrButtonVariant, size: "xsmall", display: "fit", a11yLabel: this.buttonLabel, onWdprClick: this._onTicketsButtonClick }, this.buttonLabel))), this._actions.map(action => (index.h("li", { class: "px-150 py-200" }, index.h("wdpr-icon-button", { iconName: action.iconName, a11yLabel: action.a11yLabel, a11yExpanded: action.a11yExpanded, variant: this._iconButtonVariant, onClicked: action.onClick })))))));
    }
};

exports.wdpr_navigation_header = WdprNavigationHeader;
//# sourceMappingURL=wdpr-navigation-header.entry.cjs.js.map

//# sourceMappingURL=wdpr-navigation-header.cjs.entry.js.map