import { customTwMerge } from "../../utils/utils";
export const getButtonClass = (variant, size) => {
    return customTwMerge(baseClasses, focusClasses, variant === 'bgPrimary' || variant === 'bgSecondary' ? sizeClass[size] : null, variantClasses[variant].default, variantClasses[variant].hover, variantClasses[variant].focusVisible, variantClasses[variant].active, variantClasses[variant].disabled);
};
export const getNotificationSizeClass = (variant, size) => {
    const map = {
        background: {
            xxsmall: 'xxsmall',
            xsmall: 'xsmall',
            small: 'small',
            medium: 'small',
            large: 'small',
            xlarge: 'small',
        },
        default: {
            xxsmall: 'xxsmall',
            xsmall: 'xxsmall',
            small: 'xsmall',
            medium: 'xsmall',
            large: 'small',
            xlarge: 'small',
        },
    };
    return variant === 'bgPrimary' || variant === 'bgSecondary' ? map['background'][size] : map.default[size];
};
const baseClasses = `relative inline-flex items-center justify-center cursor-pointer rounded-pill
  text-black transition-colors disabled:cursor-not-allowed`;
const focusClasses = 'focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-037';
const variantClasses = {
    'bgPrimary': {
        default: 'bg-surface-default text-text-actionable-alt-default elevation-xsmall-soft',
        hover: 'hover:bg-surface-default hover:text-text-actionable-alt-hover',
        active: 'active:bg-surface-default active:text-text-actionable-alt-pressed',
        focusVisible: 'focus-visible:outline-stroke-actionable-focused',
        disabled: 'disabled:bg-surface-disabled disabled:text-text-actionable-alt-disabled disabled:elevation-xsmall-soft',
    },
    'bgSecondary': {
        default: 'bg-surface-default text-text-actionable-default elevation-xsmall-soft',
        hover: 'hover:bg-surface-default hover:text-text-actionable-hover',
        active: 'active:bg-surface-default active:text-text-actionable-pressed',
        focusVisible: 'focus-visible:outline-stroke-actionable-focused',
        disabled: 'disabled:bg-surface-disabled disabled:text-text-actionable-disabled disabled:elevation-xsmall-soft',
    },
    'primary': {
        default: 'bg-surface-transparent text-text-actionable-alt-default',
        hover: 'hover:text-text-actionable-alt-hover',
        active: 'active:text-text-actionable-alt-pressed',
        focusVisible: 'focus-visible:outline-stroke-actionable-focused',
        disabled: 'disabled:text-text-actionable-alt-disabled',
    },
    'secondary': {
        default: 'bg-surface-transparent text-text-actionable-default',
        hover: 'hover:text-text-actionable-hover',
        active: 'active:text-text-actionable-pressed',
        focusVisible: 'focus-visible:outline-stroke-actionable-focused',
        disabled: 'disabled:text-text-actionable-disabled',
    },
    'inverse': {
        default: 'bg-surface-transparent text-white',
        hover: 'hover:text-text-actionable-inverse-hover',
        active: 'active:text-text-actionable-inverse-pressed',
        focusVisible: 'focus-visible:outline-stroke-inverse',
        disabled: 'disabled:text-text-actionable-inverse-disabled',
    },
    'tertiary-alt': {
        default: 'bg-surface-transparent text-text-inverse',
        hover: 'hover:text-white',
        active: 'active:text-text-actionable-inverse-pressed',
        focusVisible: 'focus-visible:outline-stroke-inverse',
        disabled: 'disabled:text-text-actionable-inverse-disabled',
    },
};
const sizeClass = {
    xxsmall: 'p-087',
    xsmall: 'p-125',
    small: 'p-125',
    medium: 'p-150',
    large: 'p-200',
    xlarge: 'p-200',
};
export const notificationPaddingClasses = {
    'with-bg': {
        xxsmall: '-top-175 -right-025',
        xsmall: '-top-175 -right-025',
        small: '-top-125 -right-025',
        medium: '-top-100 -right-025',
        large: '-top-050 -right-025',
        xlarge: '-top-050 right-025',
    },
    'without-bg': {
        xxsmall: '-top-175 -right-050',
        xsmall: '-top-175 -right-050',
        small: '-top-175 -right-050',
        medium: '-top-175 -right-050',
        large: '-top-125 -right-050',
        xlarge: '-top-100 -right-050',
    },
};
//# sourceMappingURL=wdpr-icon-button.utils.js.map
