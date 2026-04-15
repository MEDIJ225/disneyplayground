import { customTwMerge } from "../../utils/utils";
export const getLabelClass = (colorClass, customClass) => {
    return customTwMerge(labelBaseClass, colorClass, customClass);
};
export const getColorClass = (disabled) => {
    const baseClass = 'text-text-actionable-alt-default cursor-pointer group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed';
    const disabledClass = 'text-text-actionable-alt-disabled cursor-not-allowed';
    return disabled ? disabledClass : baseClass;
};
export const getMediaClass = (showBackground) => {
    const baseClass = 'w-dimension-700 h-dimension-700';
    const backgroundClass = 'w-dimension-500 h-dimension-500';
    return showBackground ? backgroundClass : baseClass;
};
export const getContainerClass = (showBackground) => {
    const backgroundClass = 'rounded-100 bg-white elevation-small-soft p-200';
    const hoverClass = "hover:outline-stroke-actionable-alt-hover hover:outline-solid hover:outline-[1px]";
    const activeClass = "active:outline-stroke-actionable-alt-pressed active:outline-solid active:outline-[1px]";
    return showBackground ? customTwMerge(containerBaseClass, backgroundClass, hoverClass, activeClass) : containerBaseClass;
};
const labelBaseClass = 'font-[var(--font-weight-heading-alt)] leading-heading-small text-[18px] tracking--05 px-075 pt-025';
export const containerBaseClass = `
  flex items-center rounded-075 h-full group border-transparent
  border-012 border-solid
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[3px]
  focus-visible:outline-025
`;
//# sourceMappingURL=wdpr-secondary-quick-action-item.utils.js.map
