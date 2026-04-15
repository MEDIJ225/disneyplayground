import { customTwMerge } from "../../utils/utils";
export const getLabelClass = (colorClass, allowBoldText) => {
    return customTwMerge(labelBaseClass, allowBoldText ? labelBoldClass : labelDefaultClass, colorClass);
};
export const getColorClass = (disabled, isInverse) => {
    const baseClass = 'text-text-actionable-alt-default hover:text-text-actionable-alt-hover active:text-text-actionable-alt-pressed';
    const disabledClass = 'text-text-actionable-alt-disabled cursor-not-allowed';
    const inverseDisabledClass = 'text-text-actionable-inverse-disabled hover:text-text-actionable-inverse-disabled active:text-text-actionable-inverse-disabled cursor-not-allowed';
    const inverseClass = 'text-text-actionable-inverse-default hover:text-text-actionable-inverse-hover active:text-text-actionable-inverse-pressed';
    if (disabled)
        return isInverse ? inverseDisabledClass : disabledClass;
    if (isInverse)
        return inverseClass;
    return baseClass;
};
const labelBaseClass = 'leading-[24px] text-[20px] tracking-05 px-025 py-100';
const labelDefaultClass = 'font-heading-alt';
const labelBoldClass = 'font-heading-default';
export const containerBaseClass = `
  flex items-center justify-between rounded-075 h-full group cursor-pointer
  border-012 border-solid border-transparent
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[1px]
  focus-visible:outline-025
`;
//# sourceMappingURL=wdpr-nav-item-large.utils.js.map
