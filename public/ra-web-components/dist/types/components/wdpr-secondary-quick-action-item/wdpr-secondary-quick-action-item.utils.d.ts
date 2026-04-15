export declare const getLabelClass: (colorClass: string, customClass: string) => string;
export declare const getColorClass: (disabled: boolean) => "text-text-actionable-alt-disabled cursor-not-allowed" | "text-text-actionable-alt-default cursor-pointer group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed";
export declare const getMediaClass: (showBackground: boolean) => "w-dimension-500 h-dimension-500" | "w-dimension-700 h-dimension-700";
export declare const getContainerClass: (showBackground: boolean) => string;
export declare const containerBaseClass = "\n  flex items-center rounded-075 h-full group border-transparent\n  border-012 border-solid\n  focus-visible:outline-stroke-actionable-focused\n  focus-visible:outline-solid\n  focus-visible:outline-offset-[3px]\n  focus-visible:outline-025\n";
