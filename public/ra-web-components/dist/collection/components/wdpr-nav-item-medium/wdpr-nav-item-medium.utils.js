import { customTwMerge } from "../../utils/utils";
const containerBaseClass = `
  flex items-center gap-150 rounded-075 w-full
  border-012 border-solid
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[1px]
  focus-visible:outline-025
`;
const defaultClass = `
  text-text-actionable-alt-default border-transparent cursor-pointer
  hover:text-text-actionable-alt-hover
  active:text-text-actionable-alt-pressed
`;
const disabledClass = 'text-text-actionable-alt-disabled border-transparent cursor-not-allowed';
const inverseDisabledClass = 'text-text-actionable-inverse-disabled border-transparent cursor-not-allowed';
const inverseClass = `
  text-text-actionable-inverse-default border-transparent cursor-pointer
  hover:text-text-actionable-inverse-hover
  active:text-text-actionable-inverse-pressed
`;
const inverseOutlineClass = 'focus-visible:outline-stroke-inverse';
const labelBaseClass = 'block min-w-0 leading-heading-small text-heading-small tracking-05 py-200 line-clamp-2';
const labelDefaultClass = 'font-heading-alt';
const labelBoldClass = 'font-heading-default';
const mediaSizeClassMap = {
    medium: 'w-[40px] h-[40px] rounded-100',
    large: 'w-[56px] h-[56px] rounded-150',
    xlarge: 'w-[64px] h-[64px] rounded-150',
};
export const getContainerClass = (disabled, isInverse) => {
    if (disabled) {
        return customTwMerge(containerBaseClass, isInverse ? inverseDisabledClass : disabledClass, isInverse ? inverseOutlineClass : '');
    }
    if (isInverse) {
        return customTwMerge(containerBaseClass, inverseClass, inverseOutlineClass);
    }
    return customTwMerge(containerBaseClass, defaultClass);
};
export const getLabelClass = (customLabelClass, allowBoldText) => {
    return customTwMerge(labelBaseClass, allowBoldText ? labelBoldClass : labelDefaultClass, customLabelClass);
};
export const getMediaClass = (mediaSize) => {
    return customTwMerge('overflow-hidden shrink-0', mediaSizeClassMap[mediaSize]);
};
//# sourceMappingURL=wdpr-nav-item-medium.utils.js.map
