import { h } from "@stencil/core";
export class WdprEmptyState {
    el;
    _responsiveSize = 'medium';
    size;
    mediaType = 'icon';
    icon;
    mediaSrc;
    mediaAlt = '';
    mediaShape = 'flat';
    heading;
    bodyContent;
    showPrimaryButton = true;
    showSecondaryButton = false;
    position = 'stacked';
    primaryActionText = 'Label';
    secondaryActionText = 'Label';
    wdprPrimaryClick;
    wdprSecondaryClick;
    componentWillLoad() {
        this._setResponsiveSize();
    }
    componentDidLoad() {
        window.addEventListener('resize', this._setResponsiveSize);
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this._setResponsiveSize);
    }
    _handlePrimaryClick = () => this.wdprPrimaryClick.emit();
    _handleSecondaryClick = () => this.wdprSecondaryClick.emit();
    _setResponsiveSize = () => {
        const width = window.innerWidth;
        if (width < 600) {
            this._responsiveSize = 'small';
        }
        else if (width < 1024) {
            this._responsiveSize = 'medium';
        }
        else {
            this._responsiveSize = 'large';
        }
    };
    get _effectiveSize() {
        return this.size ?? this._responsiveSize;
    }
    render() {
        const effectiveAlt = this.mediaAlt || this.heading;
        const size = this._effectiveSize;
        // Force position to 'stacked' when responsiveSize is 'small'
        const effectivePosition = this._responsiveSize === 'small' ? 'stacked' : this.position;
        return (h("section", { key: 'c29496c305d58dabddf7e71008015a1ef59da48d', "aria-labelledby": "empty-state-heading", class: emptyStateWrapperClasses }, h("div", { key: '7fbd0d6c1b24b5f036ec87f9524b8189f357b741', class: emptyStateMediaWrapperClasses }, h("slot", { key: '438f6fa8647c1f679a1b836d7a7d36bd28f3ac00', name: "media" }, this.mediaType === 'icon' && this.icon && (h("wdpr-icon-library", { key: '194d09242654a834354ecb4145ffe8c18fa25674', icon: this.icon, size: "xlarge", ariaTitle: this.heading, decorative: false })), this.mediaType === 'media' && this.mediaSrc && (h("wdpr-media", { key: '809f889470f2758ab5fa554d8adabff2098824e1', src: this.mediaSrc, alt: effectiveAlt, shape: this.mediaShape, aspect: "square", class: mediaSizeClasses[size] })))), h("div", { key: '23eb1f6457bdc071ea9e823c091868478917edd8', class: emptyStateContentWrapperClasses }, h("div", { key: 'cf44a2fdb91f1e55a3c9cc8474c66e0b865d9536', class: emptyStateTextWrapperClasses }, h("slot", { key: 'a2bddd4a5e3d9485a24a099be6900d675682b3eb', name: "heading" }, this.heading && h("h2", { key: 'd152333ac228f20ac8498870a39d590aeb2b5fe6', id: "empty-state-heading", class: emptyStateHeadingClasses[size] }, this.heading)), h("slot", { key: '903644bd2cc450d5378bf95b5d95f6a6fd4e98b8', name: "body" }, this.bodyContent && h("p", { key: 'a29a4d75d3a11918e3657c82783673efc07138ca', class: emptyStateBodyClasses }, this.bodyContent))), (this.showPrimaryButton || this.showSecondaryButton) && (h("div", { key: '5ead7a5df9f8c3ce3613b75fffcdac2f37d4fe02', class: emptyStateActionsWrapperClasses(effectivePosition, size) }, effectivePosition === 'stacked'
            ? [
                h("slot", { name: "primary-button" }, this.showPrimaryButton && this.primaryActionText && (h("wdpr-button", { type: "button", variant: "primary", class: "w-auto", onWdprClick: this._handlePrimaryClick }, this.primaryActionText))),
                h("slot", { name: "secondary-button" }, this.showSecondaryButton && this.secondaryActionText && (h("wdpr-button", { type: "button", variant: "tertiary", class: "w-auto", onWdprClick: this._handleSecondaryClick }, this.secondaryActionText))),
            ]
            : [
                h("slot", { name: "secondary-button" }, this.showSecondaryButton && this.secondaryActionText && (h("wdpr-button", { type: "button", variant: "tertiary", class: "w-auto", onWdprClick: this._handleSecondaryClick }, this.secondaryActionText))),
                h("slot", { name: "primary-button" }, this.showPrimaryButton && this.primaryActionText && (h("wdpr-button", { type: "button", variant: "primary", class: "w-auto", onWdprClick: this._handlePrimaryClick }, this.primaryActionText))),
            ])))));
    }
    static get is() { return "wdpr-empty-state"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": true,
                "complexType": {
                    "original": "'small' | 'medium' | 'large'",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
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
                "reflect": true
            },
            "mediaType": {
                "type": "string",
                "attribute": "media-type",
                "mutable": false,
                "complexType": {
                    "original": "'icon' | 'media'",
                    "resolved": "\"icon\" | \"media\"",
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
                "defaultValue": "'icon'"
            },
            "icon": {
                "type": "string",
                "attribute": "icon",
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
                "reflect": false
            },
            "mediaSrc": {
                "type": "string",
                "attribute": "media-src",
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
                "reflect": false
            },
            "mediaAlt": {
                "type": "string",
                "attribute": "media-alt",
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
            "mediaShape": {
                "type": "string",
                "attribute": "media-shape",
                "mutable": false,
                "complexType": {
                    "original": "'flat' | 'round'",
                    "resolved": "\"flat\" | \"round\"",
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
                "defaultValue": "'flat'"
            },
            "heading": {
                "type": "string",
                "attribute": "heading",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "bodyContent": {
                "type": "string",
                "attribute": "body-content",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "showPrimaryButton": {
                "type": "boolean",
                "attribute": "show-primary-button",
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
                "defaultValue": "true"
            },
            "showSecondaryButton": {
                "type": "boolean",
                "attribute": "show-secondary-button",
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
            "position": {
                "type": "string",
                "attribute": "position",
                "mutable": false,
                "complexType": {
                    "original": "'inline' | 'stacked'",
                    "resolved": "\"inline\" | \"stacked\"",
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
                "defaultValue": "'stacked'"
            },
            "primaryActionText": {
                "type": "string",
                "attribute": "primary-action-text",
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
                "defaultValue": "'Label'"
            },
            "secondaryActionText": {
                "type": "string",
                "attribute": "secondary-action-text",
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
                "defaultValue": "'Label'"
            }
        };
    }
    static get states() {
        return {
            "_responsiveSize": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprPrimaryClick",
                "name": "wdprPrimaryClick",
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
                "method": "wdprSecondaryClick",
                "name": "wdprSecondaryClick",
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
const emptyStateWrapperClasses = 'flex flex-col items-center justify-center text-center mx-auto bg-surface-transparent';
const emptyStateMediaWrapperClasses = 'flex justify-center items-center mb-300';
const emptyStateContentWrapperClasses = 'flex flex-col items-center self-stretch gap-200';
const emptyStateTextWrapperClasses = 'flex flex-col items-center self-stretch gap-025';
const emptyStateHeadingClasses = {
    small: 'heading-small',
    medium: 'title-medium-alt',
    large: 'title-large-alt',
};
const emptyStateBodyClasses = 'body-large text-text-body max-w-prose';
const mediaSizeClasses = {
    small: 'block w-[min(164px,70vw)] aspect-square',
    medium: 'block w-[min(320px,85vw)] aspect-square',
    large: 'block w-[min(424px,90vw)] aspect-square',
};
const emptyStateActionsWrapperClasses = (position, size) => {
    const layout = position === 'inline' ? 'flex-row flex-wrap justify-center' : 'flex-col items-center';
    const gapSize = position === 'inline' ? (size === 'small' ? 'gap-200' : 'gap-300') : 'gap-150';
    return `flex ${layout} ${gapSize}`;
};
//# sourceMappingURL=wdpr-empty-state.js.map
