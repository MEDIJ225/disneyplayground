import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprTextLink {
    /**
     * Reference to host element
     * @type {HTMLWdprTextLinkElement}
     */
    el;
    /**
     * @internal
     * Marks if the leading slot has content or not
     * @default false
     * @type {boolean}
     */
    hasLeadingIcon = false;
    /**
     * @internal
     * Marks if the trailing slot has content or not
     * @default false
     * @type {boolean}
     */
    hasTrailingIcon = false;
    /**
     * The URL to navigate to when the link is clicked.
     * @type {string}
     */
    href;
    /**
     * The target attribute of the link. Possible values: '_blank', '_self', '_parent', '_top'.
     * @type {string}
     */
    target = '_self';
    /**
     * The rel attribute of the link.
     * @type {string}
     */
    rel;
    /**
     * The size of the text link. Possible values: 'xxsmall', 'xsmall', 'small', 'medium', 'large'.
     * @type {TextLinkSizes}
     */
    size = 'medium';
    /**
     * The variant of the text link.
     * @type {TextLinkVariants}
     */
    variant = 'primary';
    /**
     * Defines a string value that labels the element being focused.
     * Use this when the visible text is ambiguous (e.g., "Read more").
     * @type {string}
     */
    a11yLabel = '';
    disabled = false;
    /**
     * Optional override for the tab index.
     * @type {number}
     */
    customTabIndex;
    componentWillLoad() {
        this.hasLeadingIcon = !!this.el.querySelector('[slot="leading-icon"]');
        this.hasTrailingIcon = !!this.el.querySelector('[slot="trailing-icon"]');
    }
    get containerClasses() {
        if (this.disabled) {
            return customTwMerge(baseClasses, containerSizeGaps[this.size], this.disabledClasses);
        }
        let variantColorClasses;
        switch (this.variant) {
            case 'primary':
            case 'primary-underline':
                variantColorClasses = primaryColorClasses;
                break;
            case 'secondary':
                variantColorClasses = secondaryColorClasses;
                break;
            case 'primary-inverse':
            case 'primary-underline-inverse':
                variantColorClasses = primaryInverseColorClasses;
                break;
            case 'secondary-inverse':
                variantColorClasses = secondaryInverseColorClasses;
                break;
            default:
                variantColorClasses = primaryColorClasses;
        }
        return customTwMerge(baseClasses, containerSizeGaps[this.size], variantColorClasses, this.focusVisibleClasses);
    }
    get iconContainerClasses() {
        return customTwMerge(`flex gap-100 items-center`, iconHeightContainerClasses[this.size], iconVerticalOffsetBySize[this.size]);
    }
    get iconClasses() {
        return customTwMerge(`size-icon-${this.size}`);
    }
    get textClasses() {
        return customTwMerge(textLinkSizes[this.size], variantTextClasses[this.variant]);
    }
    get disabledClasses() {
        return this.variant.includes('inverse') ? 'text-text-actionable-inverse-disabled pointer-events-none' : 'text-text-actionable-disabled pointer-events-none';
    }
    get focusVisibleClasses() {
        const focusVisible = this.variant.includes('inverse') ? 'focus-visible:outline-stroke-actionable-inverse-focused' : 'focus-visible:outline-stroke-actionable-focused';
        return customTwMerge(focusVisible, 'focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-037');
    }
    get computedRel() {
        if (this.target === '_blank' && !this.rel) {
            return 'noopener noreferrer';
        }
        return this.rel;
    }
    render() {
        return (h("a", { key: '624a4de06cc571783a1e3dff89d333480844b681', href: this.href, target: this.target, rel: this.computedRel, class: this.containerClasses, "aria-current": this.el.getAttribute('aria-current'), "aria-label": this.a11yLabel || undefined, "aria-disabled": this.disabled ? 'true' : undefined, tabIndex: this.disabled ? -1 : this.customTabIndex }, this.hasLeadingIcon && (h("div", { key: 'f1cb852e78d2d6f34628cbc78422b041050773cf', class: this.iconContainerClasses, part: "icon-container" }, h("span", { key: '8d9f66248d5e307f8257ae4a878236526c0099f7', class: this.iconClasses, "aria-hidden": "true" }, h("slot", { key: '3602fdd21a6679b3c9dc9c70a799d4b428ab5147', name: "leading-icon" })))), h("span", { key: '11632240db39488606de96232798a64f93230b9f', class: this.textClasses, style: { display: 'var(--wdpr-text-link-text-display, inline)' } }, h("slot", { key: '95f6145aadc77465c84359980f793ad9e983410d' })), this.hasTrailingIcon && (h("div", { key: '5c8f3394c2c213b390ae0ad7a80bd95a4bf01939', class: this.iconContainerClasses, part: "icon-container" }, h("span", { key: 'b93d4ebfa360476a1312156c929f0862fd4b1080', class: this.iconClasses, "aria-hidden": "true" }, h("slot", { key: '966be44137f490423ec5505e074287fe22d39815', name: "trailing-icon" }))))));
    }
    static get is() { return "wdpr-text-link"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "href": {
                "type": "string",
                "attribute": "href",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The URL to navigate to when the link is clicked."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "target": {
                "type": "string",
                "attribute": "target",
                "mutable": false,
                "complexType": {
                    "original": "Target",
                    "resolved": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\"",
                    "references": {
                        "Target": {
                            "location": "import",
                            "path": "../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::Target"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The target attribute of the link. Possible values: '_blank', '_self', '_parent', '_top'."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'_self'"
            },
            "rel": {
                "type": "string",
                "attribute": "rel",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The rel attribute of the link."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "TextLinkSizes",
                    "resolved": "\"large\" | \"medium\" | \"small\" | \"xsmall\" | \"xxsmall\"",
                    "references": {
                        "TextLinkSizes": {
                            "location": "import",
                            "path": "../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::TextLinkSizes"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{TextLinkSizes}"
                        }],
                    "text": "The size of the text link. Possible values: 'xxsmall', 'xsmall', 'small', 'medium', 'large'."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'medium'"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "TextLinkVariants",
                    "resolved": "\"primary\" | \"primary-inverse\" | \"primary-underline\" | \"primary-underline-inverse\" | \"secondary\" | \"secondary-inverse\"",
                    "references": {
                        "TextLinkVariants": {
                            "location": "import",
                            "path": "../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::TextLinkVariants"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{TextLinkVariants}"
                        }],
                    "text": "The variant of the text link."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'primary'"
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
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "Defines a string value that labels the element being focused.\nUse this when the visible text is ambiguous (e.g., \"Read more\")."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
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
                "reflect": true,
                "defaultValue": "false"
            },
            "customTabIndex": {
                "type": "number",
                "attribute": "custom-tab-index",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{number}"
                        }],
                    "text": "Optional override for the tab index."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "hasLeadingIcon": {},
            "hasTrailingIcon": {}
        };
    }
    static get elementRef() { return "el"; }
}
const baseClasses = 'inline-flex items-start align-middle no-underline rounded-050 group';
const primaryColorClasses = 'text-text-actionable-default hover:text-text-actionable-hover active:text-text-actionable-focused';
const secondaryColorClasses = 'text-text-actionable-alt-default hover:text-text-actionable-alt-hover active:text-text-actionable-alt-pressed';
const primaryInverseColorClasses = 'text-text-actionable-inverse-default hover:text-text-actionable-inverse-hover active:text-text-actionable-inverse-pressed';
const secondaryInverseColorClasses = 'text-text-inverse hover:text-text-actionable-inverse-hover active:text-text-actionable-inverse-pressed';
const textLinkSizes = {
    xxsmall: 'text-component-small font-component-alt leading-component-small tracking-normal' /* .component/text link xxsmall */,
    xsmall: 'text-component-medium font-component-alt leading-component-small tracking-normal' /* .component/text link xsmall */,
    small: 'text-component-large font-component-alt leading-component-medium tracking-normal' /* .component/text link small */,
    medium: 'text-component-xlarge font-component-alt leading-component-large tracking-normal' /* .component/text link medium */,
    large: 'text-component-xxlarge font-component-default leading-component-xxlarge tracking--05' /* .component/text link large */,
};
const containerSizeGaps = {
    xxsmall: 'gap-x-050',
    xsmall: 'gap-x-050',
    small: 'gap-x-050',
    medium: 'gap-x-150',
    large: 'gap-x-150',
};
const variantTextClasses = {
    'primary': '',
    'primary-underline': 'underline',
    'secondary': 'group-hover:underline group-active:underline',
    'primary-inverse': '',
    'secondary-inverse': 'group-hover:underline group-active:underline',
    'primary-underline-inverse': 'underline',
};
const iconHeightContainerClasses = {
    xxsmall: 'h-[var(--theme-typography-line-height-component-small)]',
    xsmall: 'h-[var(--theme-typography-line-height-component-small)]',
    small: 'h-[var(--theme-typography-line-height-component-medium)]',
    medium: 'h-[var(--theme-typography-line-height-component-large)]',
    large: '',
};
const iconVerticalOffsetBySize = {
    xxsmall: 'relative top-[-1px]',
    xsmall: 'relative top-[-0.5px]',
    small: 'relative top-[-1px]',
    medium: 'relative top-[-1px]',
    large: '',
};
//# sourceMappingURL=wdpr-text-link.js.map
