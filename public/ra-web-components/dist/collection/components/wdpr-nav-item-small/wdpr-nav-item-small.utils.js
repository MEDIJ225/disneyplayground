import { customTwMerge } from "../../utils/utils";
export const getLabelClass = (colorClass, allowBoldText) => {
    const boldClass = allowBoldText ? 'font-component-default' : 'font-component-alt';
    return customTwMerge(labelBaseClass, colorClass, boldClass);
};
export const getColorClass = (disabled, isInverse) => {
    const baseClass = 'text-text-actionable-alt-default group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed';
    const disabledClass = 'text-text-actionable-alt-disabled cursor-not-allowed';
    const inverseDisabledClass = 'text-text-actionable-inverse-disabled group-hover:text-text-actionable-inverse-disabled group-active:text-text-actionable-inverse-disabled cursor-not-allowed';
    const inverseClass = 'text-text-actionable-inverse-default group-hover:text-text-actionable-inverse-hover group-active:text-text-actionable-inverse-pressed';
    if (disabled)
        return isInverse ? inverseDisabledClass : disabledClass;
    if (isInverse)
        return inverseClass;
    return baseClass;
};
export const getContainerClass = (variant, isInverse) => {
    const paddingYClass = ['label-icon', 'icon-avatar-aligned'].includes(variant) ? 'pt-100 pb-075' : variant === 'avatar' ? 'pt-[4px] h-[37px]' : 'py-100';
    const inverseClass = isInverse ? 'focus-visible:outline-stroke-inverse' : '';
    return customTwMerge(containerBaseClass, paddingYClass, inverseClass);
};
const labelBaseClass = 'block min-w-0 leading-component-medium-alt text-component-large tracking-default line-clamp-2';
export const containerBaseClass = `
  flex justify-between rounded-050 group cursor-pointer
  border-012 border-solid border-transparent mx-025
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[1px]
  focus-visible:outline-025
`;
//# sourceMappingURL=wdpr-nav-item-small.utils.js.map
