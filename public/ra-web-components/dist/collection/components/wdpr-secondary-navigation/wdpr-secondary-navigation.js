import { h, Host } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
/**
 * Secondary navigation header used for page titles, back button, breadcrumbs, and actions.
 *
 * Layout:
 * - Title row (back button + title + actions)
 * - Breadcrumb row beneath the title
 *
 * Variants:
 * - 'default': Divider is controlled by showDivider, background is bg-page-default.
 * - 'page-with-left-panel': Divider is controlled by showDivider, background is bg-page-default-alt.
 *
 * @slot breadcrumbs - Breadcrumb row inside the header, below the title row.
 * @slot actions - Trailing actions on the right of the title row (e.g. X or primary button).
 * @slot back-icon - Optional override for the back icon button.
 */
export class WdprSecondaryNavigation {
    /**
     * Page title shown in the secondary navigation.
     * Also used as the accessible label for the section.
     */
    pageTitle;
    /**
     * Variant of the secondary navigation.
     * - 'default': Divider is controlled by showDivider, background is bg-page-default.
     * - 'page-with-left-panel': Divider is controlled by showDivider, background is bg-page-default-alt.
     */
    variant = 'default';
    /**
     * Whether the back icon button should be rendered.
     */
    showBackButton = false;
    /**
     * Controls the horizontal divider beneath the header.
     */
    showDivider = true;
    /**
     * Whether the close icon button should be rendered.
     */
    showCloseButton = true;
    /**
     * Visually hides the page title but keeps it accessible to assistive technologies.
     */
    hideTitle = false;
    /**
     * Accessible label for the back button.
     */
    backButtonLabel = 'Go back';
    /**
     * The HTML tag to use for the page title. Defaults to 'h1'.
     */
    titleTag = 'h1';
    /**
     * Event emitted when the back button is clicked.
     */
    backButtonClicked;
    _onBackButtonClick = () => {
        this.backButtonClicked.emit();
    };
    /**
     * Event emitted when the close button is clicked.
     */
    wdprCloseClick;
    _onCloseButtonClick = () => {
        this.wdprCloseClick.emit();
    };
    get _rootClasses() {
        const bgClass = this.variant === 'default' ? 'bg-page-default' : 'bg-page-default-alt';
        return customTwMerge('flex flex-col w-full', bgClass, 'rounded-tl-300 rounded-tr-300');
    }
    get _headerClasses() {
        return customTwMerge('flex flex-col w-full', 'rounded-300', 'py-200 px-300', 'min-h-[64px]', 'gap-050');
    }
    get _titleRowClasses() {
        return customTwMerge('flex items-center justify-between w-full');
    }
    get _titleGroupClasses() {
        return customTwMerge('flex items-center min-w-0 gap-150 flex-1');
    }
    get _titleTextClasses() {
        return customTwMerge('truncate text-text-heading text-[length:var(--font-size-20)] font-body-default leading-[length:var(--line-height-24)] tracking--05', this.hideTitle ? 'sr-only' : '');
    }
    get _actionsClasses() {
        return customTwMerge('flex items-center gap-150 shrink-0');
    }
    get _breadcrumbContainerClasses() {
        return customTwMerge('pl-[41px] w-full');
    }
    render() {
        const TitleTag = this.titleTag; // Dynamically set the tag
        return (h(Host, { key: '03ad50b80a831b7988abd4f98b4366c125051f4e' }, h("section", { key: '8c4c8acf4a040789a4cebc407228450d7f17cb02', class: this._rootClasses, "aria-label": this.pageTitle }, h("div", { key: '00d38a7b21c4922f595d0f880d73a3be52e67cac', class: this._headerClasses }, h("div", { key: '279ed02b65949339e2a07ec03ec174ed0e85deb6', class: this._titleRowClasses }, h("div", { key: 'ee8a36b672d7413a56bacde8d20d0f0601032554', class: this._titleGroupClasses }, this.showBackButton && (h("slot", { key: 'f5b0bba644cf349165de418ac5e98dfa5c894e4b', name: "back-icon" }, h("wdpr-icon-button", { key: 'f02c426980cbbf34de11a328a6b5e391216a4354', variant: "primary", size: "medium", iconName: "previous-caret-2.0", a11yLabel: this.backButtonLabel, onClicked: this._onBackButtonClick }))), this.showBackButton && h("div", { key: '48c5c26fce4cea4b4cf7a05a5c45c6ac87040f38', class: "hidden md:flex h-400 items-stretch" }, !this.hideTitle && h("wdpr-divider", { key: 'd14849a020382b02662024081a36aed5cb9db836', orientation: "vertical", "aria-hidden": "true" })), h(TitleTag, { key: 'd5c69622584e0afb2df426c896676cdaed2d675a', class: this._titleTextClasses }, this.pageTitle)), h("div", { key: 'd315736328974bbe2ba0b8c1ddad4158f0466522', class: this._actionsClasses }, h("slot", { key: '85866e8f76faf5bf4e239975f8417a37f8c445f0', name: "actions" }, this.showCloseButton && h("wdpr-icon-button", { key: '657709d8b8b2f9e7a206d1d189105d04e66acd90', variant: "bgPrimary", size: "small", iconName: "close-reversed", a11yLabel: "Close", onClick: this._onCloseButtonClick })))), h("div", { key: '86f26c352a217ea1592f7b7e1f2da96a8034e301', class: this._breadcrumbContainerClasses }, h("slot", { key: '91fa15fc95f81ffb87ac8fd1f78aba512c6a316a', name: "breadcrumbs" }))), this.showDivider && h("wdpr-divider", { key: '0a26a663d8e3a8539ad1f8ff32113a9d366dba8e', orientation: "horizontal", "aria-hidden": "true" }))));
    }
    static get is() { return "wdpr-secondary-navigation"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "pageTitle": {
                "type": "string",
                "attribute": "page-title",
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
                    "text": "Page title shown in the secondary navigation.\nAlso used as the accessible label for the section."
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
                    "original": "'default' | 'page-with-left-panel'",
                    "resolved": "\"default\" | \"page-with-left-panel\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Variant of the secondary navigation.\n- 'default': Divider is controlled by showDivider, background is bg-page-default.\n- 'page-with-left-panel': Divider is controlled by showDivider, background is bg-page-default-alt."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'default'"
            },
            "showBackButton": {
                "type": "boolean",
                "attribute": "show-back-button",
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
                    "text": "Whether the back icon button should be rendered."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "showDivider": {
                "type": "boolean",
                "attribute": "show-divider",
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
                    "text": "Controls the horizontal divider beneath the header."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "showCloseButton": {
                "type": "boolean",
                "attribute": "show-close-button",
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
                    "text": "Whether the close icon button should be rendered."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "hideTitle": {
                "type": "boolean",
                "attribute": "hide-title",
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
                    "text": "Visually hides the page title but keeps it accessible to assistive technologies."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "backButtonLabel": {
                "type": "string",
                "attribute": "back-button-label",
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
                    "text": "Accessible label for the back button."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Go back'"
            },
            "titleTag": {
                "type": "string",
                "attribute": "title-tag",
                "mutable": false,
                "complexType": {
                    "original": "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
                    "resolved": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The HTML tag to use for the page title. Defaults to 'h1'."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'h1'"
            }
        };
    }
    static get events() {
        return [{
                "method": "backButtonClicked",
                "name": "backButtonClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the back button is clicked."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "wdprCloseClick",
                "name": "wdprCloseClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the close button is clicked."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=wdpr-secondary-navigation.js.map
