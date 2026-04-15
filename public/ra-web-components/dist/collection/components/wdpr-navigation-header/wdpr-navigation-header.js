import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprNavigationHeader {
    el;
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
    static get is() { return "wdpr-navigation-header"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "theme": {
                "type": "string",
                "attribute": "theme",
                "mutable": false,
                "complexType": {
                    "original": "'WDW' | 'DLR'",
                    "resolved": "\"DLR\" | \"WDW\"",
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
                "defaultValue": "'WDW'"
            },
            "logoPath": {
                "type": "string",
                "attribute": "logo-path",
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
                "reflect": false,
                "defaultValue": "''"
            },
            "isOpen": {
                "type": "boolean",
                "attribute": "is-open",
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
            "isGradient": {
                "type": "boolean",
                "attribute": "is-gradient",
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
                "reflect": false,
                "defaultValue": "false"
            },
            "isFloating": {
                "type": "boolean",
                "attribute": "is-floating",
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
                "reflect": false,
                "defaultValue": "false"
            },
            "isInverse": {
                "type": "boolean",
                "attribute": "is-inverse",
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
                "reflect": false,
                "defaultValue": "false"
            },
            "buttonLabel": {
                "type": "string",
                "attribute": "button-label",
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
                "defaultValue": "'Tickets'"
            }
        };
    }
    static get events() {
        return [{
                "method": "wdprNavigationHeaderMenuButtonClick",
                "name": "wdprNavigationHeaderMenuButtonClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "wdprNavigationHeaderCloseClick",
                "name": "wdprNavigationHeaderCloseClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "wdprNavigationHeaderSearchClick",
                "name": "wdprNavigationHeaderSearchClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "wdprNavigationHeaderButtonClick",
                "name": "wdprNavigationHeaderButtonClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-navigation-header.js.map
