export declare const getPrimaryLabelClasses: (disabled: boolean) => string;
export declare const getSecondaryLabelClasses: (disabled: boolean) => string;
export declare const getDisabledClasses: (baseClasses: string) => string;
export declare const getFocusClasses: (orientation: "horizontal" | "vertical") => string;
export declare const getCustomIconClass: (isDisabled: boolean, backgroundIcon: "circle" | "square" | "none") => string;
export declare const getIconClass: (isDisabled: boolean) => string;
export declare const getDefaultClasses: (baseClasses: string, orientation: "horizontal" | "vertical", backgroundIcon: "circle" | "square" | "none", hasSublabel: boolean) => string;
export declare const getBaseClasses: (orientation: "horizontal" | "vertical", hasAvatarGroup: boolean, iconJustified: boolean) => string;
export declare const variantClasses: {
    default: string;
    hover: string;
    active: string;
    focus: string;
    disabled: string;
};
export declare const iconClasses: {
    disabled: string;
};
