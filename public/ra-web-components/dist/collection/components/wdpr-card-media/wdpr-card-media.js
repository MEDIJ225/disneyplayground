import { h, Host } from "@stencil/core";
export class WdprCardMedia {
    /**
     * Reference to the host element of the component.
     */
    el;
    /**
     * Type of media to display: blue-gradient, gold-gradient, green-gradient, image, or icon.
     * @default 'image'
     */
    type = 'image';
    /**
     * Size variant for the media: micro, small, medium, or large.
     * @default 'medium'
     */
    variant = 'medium';
    /**
     * Icon name to display (used only if type is 'icon').
     */
    icon;
    /**
     * Image URL to display (used only if type is 'image').
     */
    src;
    /**
     * Base layout classes for the container.
     */
    get layoutClasses() {
        return 'flex items-center justify-center overflow-hidden';
    }
    /**
     * Returns CSS classes for the background based on the gradient type.
     */
    get bgGradientClasses() {
        switch (this.type) {
            case 'blue-gradient':
                return 'bg-[linear-gradient(210deg,_#F7F0FF_0%,_rgba(212,232,251,0.8193)_100%)]';
            case 'gold-gradient':
                return 'bg-surface-status-warning-alt-2';
            case 'green-gradient':
                return 'bg-surface-status-success-alt-2';
            default:
                return '';
        }
    }
    /**
     * Returns the gradient colors for the icon based on the type.
     */
    get iconColor() {
        switch (this.type) {
            case 'blue-gradient':
            case 'icon':
                return 'text-text-body';
            case 'gold-gradient':
                return 'text-icon-with-background-gold';
            case 'green-gradient':
                return 'text-icon-with-background-green-alt';
            default:
                return '';
        }
    }
    /**
     * Renders the media content (image or icon) based on the props.
     */
    get cardMedia() {
        const iconSize = this.variant === 'micro' ? 'medium' : this.variant === 'medium' && this.type !== 'icon' ? 'xlarge' : 'large';
        return (h("div", { class: this.baseClasses }, this.type === 'image' && this.variant !== 'micro' ? (h("img", { src: this.src, alt: "Card Media Image", class: "w-full h-full object-cover" })) : (h("div", { class: this.iconColor }, h("wdpr-icon-library", { icon: this.icon, size: iconSize, ariaTitle: this.icon, ariaDescription: this.icon })))));
    }
    /**ˇ
     * Returns the base CSS classes depending on the media type and variant.
     */
    get baseClasses() {
        const microIconClasses = `w-dimension-500 h-dimension-500 rounded-100 bg-component-icon ${this.layoutClasses}`;
        const microGradientClasses = `w-dimension-500 h-dimension-500 rounded-100 ${this.layoutClasses} ${this.bgGradientClasses}`;
        const smallIconClasses = `w-dimension-800 h-dimension-800 rounded-pill bg-component-icon ${this.layoutClasses}`;
        const smallImageClasses = 'w-dimension-1000 h-dimension-1000 rounded-150 overflow-hidden';
        const smallGradientClasses = `w-dimension-800 h-dimension-800 rounded-pill ${this.layoutClasses} ${this.bgGradientClasses}`;
        const mediumIconClasses = `w-dimension-800 h-dimension-800 ${this.layoutClasses}`;
        const mediumImageClasses = 'w-dimension-1200 h-32 rounded-150 overflow-hidden';
        const mediumGradientClasses = `w-dimension-1200 h-32 rounded-150 ${this.layoutClasses} ${this.bgGradientClasses}`;
        switch (this.variant) {
            case 'micro':
                return this.type === 'icon'
                    ? microIconClasses
                    : microGradientClasses;
            case 'small':
                if (this.type === 'icon')
                    return smallIconClasses;
                if (this.type === 'image')
                    return smallImageClasses;
                return smallGradientClasses;
            case 'medium':
                if (this.type === 'icon')
                    return mediumIconClasses;
                if (this.type === 'image')
                    return mediumImageClasses;
                return mediumGradientClasses;
            default:
                return '';
        }
    }
    render() {
        return (h(Host, { key: '19a1b03d62e63f71632a042d7984429bebfe3b06', class: 'w-24' }, this.cardMedia));
    }
    static get is() { return "wdpr-card-media"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "type": {
                "type": "string",
                "attribute": "type",
                "mutable": false,
                "complexType": {
                    "original": "MediaType",
                    "resolved": "\"blue-gradient\" | \"gold-gradient\" | \"green-gradient\" | \"icon\" | \"image\"",
                    "references": {
                        "MediaType": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-card-media/wdpr-card-media.tsx",
                            "id": "src/components/wdpr-card-media/wdpr-card-media.tsx::MediaType"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "'image'"
                        }],
                    "text": "Type of media to display: blue-gradient, gold-gradient, green-gradient, image, or icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'image'"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "MediaVariant",
                    "resolved": "\"large\" | \"medium\" | \"micro\" | \"small\"",
                    "references": {
                        "MediaVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-card-media/wdpr-card-media.tsx",
                            "id": "src/components/wdpr-card-media/wdpr-card-media.tsx::MediaVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "'medium'"
                        }],
                    "text": "Size variant for the media: micro, small, medium, or large."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'medium'"
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
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Icon name to display (used only if type is 'icon')."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "src": {
                "type": "string",
                "attribute": "src",
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
                    "text": "Image URL to display (used only if type is 'image')."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-card-media.js.map
