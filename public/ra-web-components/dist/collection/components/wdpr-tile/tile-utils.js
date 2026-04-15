import { customTwMerge, twMerge } from "../../utils/utils";
export const getPrimaryLabelClasses = (disabled) => {
    const textColor = disabled ? 'text-text-disabled' : 'text-text-label';
    return customTwMerge('main-label line-clamp-2', 'text-component-medium font-component-default leading-component-small tracking-default', textColor);
};
export const getSecondaryLabelClasses = (disabled) => {
    const textColor = disabled ? 'text-text-disabled' : 'text-text-disclaimer';
    return customTwMerge('secondary-label mt-050 line-clamp-1', 'text-label-small font-label-default leading-label-small tracking-default', textColor);
};
export const getDisabledClasses = (baseClasses) => {
    return customTwMerge(baseClasses, variantClasses.default, variantClasses.disabled, 'bg-surface-disabled', 'text-text-disabled');
};
export const getFocusClasses = (orientation) => {
    return `
    focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-050
    ${orientation === 'vertical' ? 'focus-visible:outline-stroke-actionable-alt-pressed' : 'focus-visible:outline-stroke-actionable-focused'}
  `;
};
export const getCustomIconClass = (isDisabled, backgroundIcon) => {
    const noneStyles = 'p-0 flex';
    if (isDisabled) {
        const disabledTextColor = 'text-text-disabled';
        return backgroundIcon !== 'none' ? iconClasses.disabled : twMerge(disabledTextColor, noneStyles);
    }
    return backgroundIcon === 'none' ? twMerge('text-text-label', noneStyles) : '';
};
export const getIconClass = (isDisabled) => {
    return ['text-text-body', 'text-text-disabled'][isDisabled ? 1 : 0];
};
export const getDefaultClasses = (baseClasses, orientation, backgroundIcon, hasSublabel) => {
    const alignmentClasses = orientation === 'horizontal' && backgroundIcon === 'none' && hasSublabel ? 'items-start' : '';
    return customTwMerge(baseClasses, alignmentClasses, variantClasses.focus, variantClasses.default, variantClasses.hover, variantClasses.active, getFocusClasses(orientation));
};
export const getBaseClasses = (orientation, hasAvatarGroup, iconJustified) => {
    const gapClass = orientation === 'vertical' && hasAvatarGroup ? 'gap-050' : 'gap-100';
    const iconAlignClasses = iconJustified && orientation === 'horizontal' ? 'justify-center' : '';
    const orientationClasses = orientation === 'vertical' ? 'flex-col justify-center p-150' : 'flex-row items-center p-150';
    return customTwMerge(gapClass, orientationClasses, iconAlignClasses, 'w-full');
};
export const variantClasses = {
    default: 'bg-surface-default elevation-xsmall-soft flex rounded-200 h-full border-transparent border-012 border-solid cursor-pointer',
    hover: 'hover:border-stroke-neutral-light',
    active: 'active:border-stroke-neutral-medium',
    focus: 'focus-visible:outline-solid focus-visible:outline-offset-[3px] focus-visible:outline-025',
    disabled: 'text-text-disabled bg-surface-disabled cursor-not-allowed elevation-none',
};
export const iconClasses = {
    disabled: 'bg-surface-actionable-alt-disabled text-text-inverse',
};
//# sourceMappingURL=tile-utils.js.map
