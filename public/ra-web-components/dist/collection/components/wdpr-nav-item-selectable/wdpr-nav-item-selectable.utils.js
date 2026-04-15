import { customTwMerge } from "../../utils/utils";
export const getLabelClass = (colorClass, allowBoldText) => {
    return customTwMerge(labelBaseClass, allowBoldText ? labelBoldClass : labelDefaultClass, colorClass);
};
export const getColorClass = (disabled, selected, isInverse) => {
    const altBase = 'text-text-actionable-alt-default group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed';
    const altDisabled = 'text-text-actionable-alt-disabled cursor-not-allowed';
    const altSelected = 'text-text-inverse';
    const inverseBase = 'text-text-actionable-inverse-default group-hover:text-text-actionable-inverse-hover group-active:text-text-actionable-inverse-pressed';
    const inverseDisabled = 'text-text-actionable-inverse-disabled group-hover:text-text-actionable-inverse-disabled group-active:text-text-actionable-inverse-disabled cursor-not-allowed';
    const inverseSelected = 'text-text-inverse group-hover:text-text-inverse group-active:text-text-inverse';
    if (disabled)
        return isInverse ? inverseDisabled : altDisabled;
    if (selected)
        return isInverse ? inverseSelected : altSelected;
    return isInverse ? inverseBase : altBase;
};
const selectedSurfaceClass = `
  bg-surface-actionable-alt-selected
  hover:bg-surface-actionable-alt-hover
  active:bg-surface-actionable-alt-pressed
`;
/** Keeps selected row visually flat on inverse (no selected/hover/pressed surface fill). */
const inverseSelectedSurfaceClass = `
  bg-transparent
  hover:bg-transparent
  active:bg-transparent
`;
export const getContainerClass = (disabled, selected, isInverse) => {
    const inverseOutline = isInverse ? 'focus-visible:outline-stroke-inverse' : '';
    if (disabled || !selected) {
        return customTwMerge(containerBaseClass, inverseOutline);
    }
    if (isInverse) {
        return customTwMerge(containerBaseClass, inverseSelectedSurfaceClass, inverseOutline);
    }
    return customTwMerge(containerBaseClass, selectedSurfaceClass, inverseOutline);
};
const labelBaseClass = 'block min-w-0 leading-component-medium-alt text-component-large tracking-default line-clamp-2';
const labelDefaultClass = 'font-component-alt';
const labelBoldClass = 'font-component-default';
export const containerBaseClass = `
  flex justify-between rounded-075 group cursor-pointer
  border-012 border-solid border-transparent
  px-100 py-100
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[3px]
  focus-visible:outline-025
`;
//# sourceMappingURL=wdpr-nav-item-selectable.utils.js.map
