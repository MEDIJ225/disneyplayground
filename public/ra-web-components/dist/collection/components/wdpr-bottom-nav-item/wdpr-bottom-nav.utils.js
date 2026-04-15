import { customTwMerge } from "../../utils/utils";
export const getLabelClass = (colorClass, customLabelClass) => {
    return customTwMerge(labelBaseClass, colorClass, customLabelClass);
};
export const getColorClass = (disabled) => {
    const baseClass = 'text-text-actionable-alt-default cursor-pointer group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed';
    const disabledClass = 'text-text-actionable-alt-disabled cursor-not-allowed';
    return disabled ? disabledClass : baseClass;
};
const labelBaseClass = 'label-container font-[var(--font-weight-component-alt)] leading-component-medium-alt text-component-large tracking-default px-075 pt-025';
export const containerBaseClass = `
  flex items-center rounded-075 h-full group
  border-transparent border-012 border-solid
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[3px]
  focus-visible:outline-025
`;
//# sourceMappingURL=wdpr-bottom-nav.utils.js.map
