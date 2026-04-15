import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    icon;
    size = 'medium';
    background = 'none';
    variant = 'primary';
    iconTitle;
    iconDescription;
    customClass;
    decorative = false;
    a11yLabel;
    // Size configuration using Record
    sizeConfig = {
        'xxsmall': 'p-087',
        'xsmall': 'p-125',
        'small': 'p-125',
        'medium': 'p-125',
        'medium-alt': 'p-200',
        'large': 'p-200',
        'xlarge': 'p-250',
    };
    // Variant configuration for icons without background
    variantColorsOnly = {
        primary: 'text-surface-actionable-default',
        secondary: 'text-text-neutral-default',
        success: 'text-surface-status-success',
        warning: 'text-surface-status-warning',
        error: 'text-surface-status-critical',
        info: 'text-surface-status-informational',
        neutral: 'text-neutral-dark',
    };
    // Variant configuration for icons with background
    variantWithBackground = {
        primary: {
            bg: 'bg-surface-actionable-default',
            color: 'text-white',
        },
        secondary: {
            bg: 'bg-component-icon',
            color: 'text-text-neutral-dark',
        },
        success: {
            bg: 'bg-surface-status-success-alt',
            color: 'text-text-status-success',
        },
        warning: {
            bg: 'bg-surface-status-warning-alt',
            color: 'text-text-status-warning',
        },
        error: {
            bg: 'bg-surface-status-critical-alt',
            color: 'text-text-status-critical',
        },
        info: {
            bg: 'bg-surface-status-informational-alt',
            color: 'text-text-status-informational',
        },
        neutral: {
            bg: 'bg-surface-neutral-medium',
            color: 'text-neutral-extra-dark',
        },
    };
    // Background shape configuration
    backgroundShapes = {
        none: '',
        circle: 'rounded-pill',
        square: '', // Dynamic based on size
    };
    // Square border radius by size
    squareBorderRadius = {
        'xxsmall': 'rounded-050',
        'xsmall': 'rounded-100',
        'small': 'rounded-100',
        'medium': 'rounded-100',
        'medium-alt': 'rounded-150',
        'large': 'rounded-150',
        'xlarge': 'rounded-150',
    };
    getSizeClasses() {
        if (this.size === 'xlarge' && this.background === 'circle')
            return 'p-200';
        return this.sizeConfig[this.size];
    }
    getVariantClasses() {
        if (this.background === 'none') {
            return {
                bg: '',
                color: this.variantColorsOnly[this.variant],
            };
        }
        return this.variantWithBackground[this.variant];
    }
    getContainerClasses() {
        const sizeClasses = this.getSizeClasses();
        const variantClasses = this.getVariantClasses();
        const backgroundShape = this.backgroundShapes[this.background];
        const squareRadius = this.background === 'square' ? this.squareBorderRadius[this.size] : '';
        const baseClasses = 'inline-flex items-center justify-center relative transition-all duration-100';
        return customTwMerge(baseClasses, sizeClasses, variantClasses.bg, variantClasses.color, backgroundShape, squareRadius, this.customClass || '');
    }
    render() {
        return (h("wdpr-surface-style", { key: 'cc41d6b1ad935840a0634d08520e07cdd6c5de8b', variant: "none", padding: "none" }, h("div", { key: '0e86ab750f3514ca7c52ee38034ee2c9958b6318', class: this.getContainerClasses() }, h("wdpr-icon-library", { key: 'cc489640b7512fffbe103872b518d3c93ceb4ac1', icon: this.icon, size: this.size, ariaTitle: this.iconTitle, ariaDescription: this.iconDescription, a11yLabel: this.a11yLabel, decorative: this.decorative }), this.iconDescription && h("span", { key: '2e66982f02c34d935a41c767d6c91787692cc6f4', class: "sr-only" }, this.iconDescription))));
    }
};
WdprIcon.style = ":host {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }";

export { WdprIcon as wdpr_icon };
//# sourceMappingURL=wdpr-icon.entry.js.map

//# sourceMappingURL=wdpr-icon.entry.js.map