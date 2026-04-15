import { twMerge } from "../../utils/utils";
export const getContainerWrapper = (type, size) => {
    const baseClass = "w-fit rounded-pill inline-flex justify-center items-center";
    const backgroundClass = type === "alert" ? "bg-surface-status-critical" : "bg-surface-status-informational-alt";
    const sizeClass = size === 'small' ? 'px-050 min-w-dimension-175 h-dimension-175' :
        size === 'xsmall' ? 'min-w-dimension-100 h-dimension-100' : 'min-w-dimension-075 h-dimension-075';
    return twMerge(baseClass, backgroundClass, sizeClass);
};
export const getNumberClass = (type) => {
    const baseClass = "component-xxsmall";
    const numberColorClass = type === "alert" ? "text-text-inverse" : "text-text-label";
    return twMerge(baseClass, numberColorClass);
};
//# sourceMappingURL=notification-indicator-utils.js.map
