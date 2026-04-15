'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprCardMedia = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
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
        return (index.h("div", { class: this.baseClasses }, this.type === 'image' && this.variant !== 'micro' ? (index.h("img", { src: this.src, alt: "Card Media Image", class: "w-full h-full object-cover" })) : (index.h("div", { class: this.iconColor }, index.h("wdpr-icon-library", { icon: this.icon, size: iconSize, ariaTitle: this.icon, ariaDescription: this.icon })))));
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
        return (index.h(index.Host, { key: '19a1b03d62e63f71632a042d7984429bebfe3b06', class: 'w-24' }, this.cardMedia));
    }
};

exports.wdpr_card_media = WdprCardMedia;
//# sourceMappingURL=wdpr-card-media.entry.cjs.js.map

//# sourceMappingURL=wdpr-card-media.cjs.entry.js.map