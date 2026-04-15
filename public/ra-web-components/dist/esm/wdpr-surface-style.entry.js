import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const SURFACE_STYLE_CONFIG = {
    paddingMap: {
        none: '',
        sm: 'p-100',
        md: 'p-200',
        lg: 'p-300',
        xl: 'p-400',
    },
    staticVariantMap: {
        // No styling
        'none': '',
        // Basic cards
        'basic': 'bg-surface-default elevation-medium-soft rounded-200',
        'mini': 'bg-surface-default elevation-small-soft rounded-200',
        // Critical variants
        'critical-extra-bright-small': 'bg-surface-status-critical-alt-2 border-006 border-stroke-status-critical rounded-050',
        'critical-dim-large': 'bg-surface-status-critical rounded-100',
        'critical-dim-large-elevated': 'bg-surface-status-critical elevation-large-soft rounded-100',
        'critical-dim-sharp': 'bg-surface-status-critical rounded-000',
        // Informational variants
        'informational-extra-bright-small': 'bg-surface-status-informational-alt-2 border-006 border-stroke-status-informational rounded-050',
        'informational-extra-bright-large': 'bg-surface-status-informational-alt-2 border-006 border-stroke-status-informational rounded-100',
        'informational-extra-bright-large-elevated': 'bg-surface-status-informational-alt-2 border-012 border-stroke-status-informational elevation-large-soft rounded-100',
        // Success variants
        'success-extra-bright-small': 'bg-surface-status-success-alt-2 border-006 border-stroke-status-success-alt rounded-050',
        'success-extra-bright-large': 'bg-surface-status-success-alt-2 border-012 border-stroke-status-success-alt rounded-100',
        'success-extra-bright-large-elevated': 'bg-surface-status-success-alt-2 border-012 border-stroke-status-success-alt elevation-large-soft rounded-100',
        // Warning variants
        'warning-extra-bright-small': 'bg-surface-status-warning-alt-2 border-006 border-stroke-status-warning-alt rounded-050',
        'warning-extra-bright-large': 'bg-surface-status-warning-alt-2 border-012 border-stroke-status-warning rounded-100',
        'warning-extra-bright-large-elevated': 'bg-surface-status-warning-alt-2 border-012 border-stroke-status-warning elevation-large-soft rounded-100',
        // Neutral variants
        'neutral-extra-bright-small': 'bg-surface-status-neutral border-006 border-stroke-status-neutral rounded-050',
        'top-pick-extra-bright-small': 'bg-surface-status-top-pick border-006 border-stroke-status-top-pick rounded-050',
        'ghost': 'rounded-200 bg-surface-white-000-a48 border border-dashed border-stroke-actionable-alt-disabled',
        'results-list': 'rounded-150 border-012 bg-surface-default border-stroke-neutral-light elevation-medium-soft',
        // Dark
        'dark': 'bg-surface-neutral-dark-small border border-006 border-transparent rounded-050',
    },
    actionableVariantMap: {
        // Actionable variants
        'actionable-tile-medium': {
            default: {
                default: 'bg-surface-default rounded-150 elevation-small-soft',
                disabled: `bg-surface-actionable-card-disabled border-stroke-disabled cursor-not-allowed rounded-150 `,
                hover: `hover:border-stroke-actionable-alt-hover hover:border-012`,
                active: `active:border-stroke-actionable-alt-pressed active:border-012`,
            },
            selected: {
                default: `bg-surface-actionable-alt-selected cursor-pointer elevation-small-soft rounded-150`,
                hover: `hover:bg-surface-actionable-alt-hover`,
                active: `active:bg-surface-actionable-alt-pressed`,
                disabled: `bg-surface-actionable-alt-disabled border-stroke-disabled cursor-not-allowed rounded-150`,
            },
        },
        'actionable-tile-large': {
            default: {
                default: `bg-surface-default elevation-xsmall-soft rounded-200`,
                hover: `hover:border-stroke-actionable-alt-hover hover:border-012`,
                active: `active:border-stroke-actionable-alt-pressed active:border-012`,
                disabled: `bg-surface-actionable-card-disabled border-stroke-disabled cursor-not-allowed rounded-200`,
            },
            selected: {
                default: `bg-surface-actionable-alt-selected elevation-small-soft rounded-200`,
                hover: `hover:bg-surface-actionable-alt-hover`,
                active: `active:bg-surface-actionable-alt-pressed`,
                disabled: `bg-surface-actionable-alt-disabled border-stroke-disabled cursor-not-allowed rounded-200`,
            },
        },
        'actionable-card-micro': {
            default: {
                default: `bg-surface-default rounded-150 elevation-small-soft`,
                hover: `hover:border-stroke-actionable-alt-hover hover:border-012`,
                active: `active:border-stroke-actionable-alt-pressed active:border-012`,
                disabled: `bg-surface-actionable-card-disabled border-stroke-disabled cursor-not-allowed rounded-150`,
            },
            selected: {
                default: `bg-surface-default border-stroke-default border-stroke-actionable-alt-pressed border-025 rounded-150`,
                hover: `hover:border-stroke-actionable-alt-hover hover:border-012`,
                active: `active:border-stroke-actionable-alt-pressed active:border-012`,
                disabled: `bg-surface-actionable-card-disabled border-stroke-disabled cursor-not-allowed rounded-150`,
            },
        },
        'actionable-card-large': {
            default: {
                default: `bg-surface-default rounded-200 elevation-small-soft`,
                hover: `hover:border-stroke-actionable-alt-hover hover:border-012`,
                active: `active:border-stroke-actionable-alt-pressed active:border-012`,
                disabled: `bg-surface-actionable-card-disabled border-stroke-disabled cursor-not-allowed rounded-200`,
            },
            selected: {
                default: `bg-surface-default border-stroke-default border-stroke-actionable-alt-pressed border-025 rounded-200`,
                hover: `hover:border-stroke-actionable-alt-hover hover:border-012`,
                active: `active:border-stroke-actionable-alt-pressed active:border-012`,
                disabled: `bg-surface-actionable-card-disabled border-stroke-disabled cursor-not-allowed rounded-200`,
            },
        },
        'actionable-card-xlarge': {
            default: {
                default: `bg-surface-default rounded-300 elevation-small-soft`,
                hover: `hover:border-stroke-actionable-alt-hover hover:border-012`,
                active: `active:border-stroke-actionable-alt-pressed active:border-012`,
                disabled: `bg-page-overlay-disabled border-stroke-disabled cursor-not-allowed rounded-300`,
            },
            selected: {
                default: `bg-surface-default border-stroke-default border-stroke-actionable-alt-pressed border-025 rounded-300`,
                hover: `hover:border-stroke-actionable-alt-hover hover:border-012`,
                active: `active:border-stroke-actionable-alt-pressed active:border-012`,
                disabled: `bg-page-overlay-disabled border-stroke-disabled cursor-not-allowed rounded-300`,
            },
        },
        'actionable-list-option': {
            default: {
                default: 'bg-surface-transparent border:none elevation-none rounded-300',
                hover: 'hover:bg-surface-actionable-alt-hover',
                active: 'active:bg-surface-actionable-alt-pressed',
                disabled: 'bg-surface-actionable-alt-disabled border-stroke-disabled cursor-not-allowed rounded-300',
            },
            selected: {
                default: 'bg-surface-actionable-alt-selected rounded-100',
            },
        },
    },
};
const SEMANTIC_ROLES = {
    'critical-extra-bright-small': 'alert',
    'critical-dim-large': 'alert',
    'critical-dim-large-elevated': 'alert',
    'critical-dim-sharp': 'alert',
    'warning-extra-bright-small': 'alert',
    'warning-extra-bright-large': 'alert',
    'warning-extra-bright-large-elevated': 'alert',
    'informational-extra-bright-small': 'status',
    'informational-extra-bright-large': 'status',
    'informational-extra-bright-large-elevated': 'status',
    'success-extra-bright-small': 'status',
    'success-extra-bright-large': 'status',
    'success-extra-bright-large-elevated': 'status',
    'dark': 'status',
};

const WdprSurfaceStyle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    /**
     * Surface variant style
     */
    variant = 'none';
    /**
     * Padding inside the surface
     */
    padding = 'none';
    /**
     * Additional custom CSS classes
     */
    customClass;
    /**
     * ARIA role for the surface
     */
    role;
    /**
     * ARIA label for accessibility
     */
    a11yLabel;
    /**
     * Whether the surface is selected (only applies to actionable variants)
     */
    selected = false;
    /**
     * Whether the surface is disabled (only applies to actionable variants)
     */
    disabled = false;
    _getActionableStateClasses() {
        if (!this._isActionableVariant()) {
            return '';
        }
        const config = SURFACE_STYLE_CONFIG.actionableVariantMap[this.variant];
        if (!config)
            return '';
        const stateConfig = this.selected && config.selected ? config.selected : config.default;
        let cssClasses = '';
        if (this.disabled) {
            if (stateConfig.disabled) {
                cssClasses = stateConfig.disabled;
            }
            else {
                cssClasses = customTwMerge(cssClasses, 'bg-surface-actionable-card-disabled border-stroke-disabled cursor-not-allowed');
            }
        }
        else {
            cssClasses = customTwMerge(cssClasses, stateConfig.default, stateConfig.hover, stateConfig.active);
        }
        return cssClasses;
    }
    _isActionableVariant() {
        return Object.prototype.hasOwnProperty.call(SURFACE_STYLE_CONFIG.actionableVariantMap, this.variant);
    }
    _getSurfaceClasses() {
        const baseClasses = 'block w-full';
        const paddingClasses = SURFACE_STYLE_CONFIG.paddingMap[this.padding];
        const variantClass = SURFACE_STYLE_CONFIG.staticVariantMap[this.variant];
        const stateClasses = this._getActionableStateClasses();
        return customTwMerge(baseClasses, paddingClasses, variantClass, stateClasses, this.customClass);
    }
    _getSemanticRole() {
        if (this.role)
            return this.role;
        return SEMANTIC_ROLES[this.variant];
    }
    _getOverlayActionClasses() {
        return customTwMerge('absolute inset-0 w-full h-full z-[1]', 'bg-transparent border-none m-0 p-0', 'cursor-pointer appearance-none', 'focus:outline-none', 'rounded-[inherit]', 'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused');
    }
    render() {
        const role = this._getSemanticRole();
        const isActionable = this._isActionableVariant();
        return (h("div", { key: '0ac0b257b6deec23abe9240f4bc6f18ac22ceca2', class: customTwMerge(this._getSurfaceClasses(), 'relative'), role: role, part: "surface" }, h("slot", { key: 'e5afa413d4aa1c54ae7bb06b96fda414c11ed99f' }), isActionable && (h("button", { key: 'b33e8a7b82e0a31c2cac62841938762e740b81f6', type: "button", disabled: this.disabled, "aria-pressed": this.selected ? 'true' : 'false', "aria-label": this.a11yLabel, class: this._getOverlayActionClasses() }))));
    }
};

export { WdprSurfaceStyle as wdpr_surface_style };
//# sourceMappingURL=wdpr-surface-style.entry.js.map

//# sourceMappingURL=wdpr-surface-style.entry.js.map