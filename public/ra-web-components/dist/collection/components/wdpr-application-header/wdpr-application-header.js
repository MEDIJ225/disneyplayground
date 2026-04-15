import { h, Host } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
/**
 * Cast-specific application header for Vista experiences.
 *
 * Layout:
 * - Left "AppLogo" group: icon, application name, optional site badge.
 * - Right actions group: fixed-width container for icon buttons, avatar, etc.
 *
 * This component owns only the layout and the stateful application text.
 * All controls are composed via slots.
 *
 * @slot leading - Leading icon (e.g. app/menu icon) inside the AppLogo group.
 * @slot site-badge - Optional badge rendered next to the application name.
 * @slot actions - Trailing actions on the right (notifications, avatar, etc.).
 */
export class WdprApplicationHeader {
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
    static get is() { return "wdpr-application-header"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "appName": {
                "type": "string",
                "attribute": "app-name",
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
                    "text": "Application name rendered in the header.\nThis value is also used as the accessible label for the banner."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "hideLabel": {
                "type": "boolean",
                "attribute": "hide-label",
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
                    "text": "Hides the visible label but keeps it exposed to assistive technologies."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "environment": {
                "type": "string",
                "attribute": "environment",
                "mutable": false,
                "complexType": {
                    "original": "EnvironmentBadgeEnvironment",
                    "resolved": "\"LATEST\" | \"PROD\" | \"STAGE\"",
                    "references": {
                        "EnvironmentBadgeEnvironment": {
                            "location": "import",
                            "path": "../../models/environment-site-badge.model",
                            "id": "src/models/environment-site-badge.model.ts::EnvironmentBadgeEnvironment"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Environment label shown in the badge."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "site": {
                "type": "string",
                "attribute": "site",
                "mutable": false,
                "complexType": {
                    "original": "EnvironmentBadgeSite",
                    "resolved": "\"DLP\" | \"DLR\" | \"WDW\"",
                    "references": {
                        "EnvironmentBadgeSite": {
                            "location": "import",
                            "path": "../../models/environment-site-badge.model",
                            "id": "src/models/environment-site-badge.model.ts::EnvironmentBadgeSite"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Site indicator shown in the badge."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "appLink": {
                "type": "string",
                "attribute": "app-link",
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
                    "text": "Href for the application name link."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'#'"
            },
            "actionButtonText": {
                "type": "string",
                "attribute": "action-button-text",
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
                    "text": "Label for the default primary action button.\nUsed when no custom actions and no avatar are provided."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Sign In'"
            },
            "avatarText": {
                "type": "string",
                "attribute": "avatar-text",
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
                    "text": "Text used to render the default avatar.\nWhen defined (or combined with `avatarImgSrc`), the default avatar is shown."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "avatarImgSrc": {
                "type": "string",
                "attribute": "avatar-img-src",
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
                    "text": "Image source for the default avatar.\nWhen defined (or combined with `avatarText`), the default avatar is shown."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "primaryButtonClicked",
                "name": "primaryButtonClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the primary action button is clicked.\nThis only fires when the default Sign In button is rendered (no avatar and no custom actions)."
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }, {
                "method": "avatarClicked",
                "name": "avatarClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the default avatar is activated.\nThis only fires when the default avatar is rendered (avatarText and/or avatarImgSrc provided, and no custom actions)."
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }, {
                "method": "wdprMenuButtonClick",
                "name": "wdprMenuButtonClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the menu (hamburger) button is clicked."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=wdpr-application-header.js.map
