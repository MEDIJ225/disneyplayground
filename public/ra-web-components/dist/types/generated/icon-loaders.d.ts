export type IconLoader = () => Promise<string>;
export declare const iconLoaders: Record<string, IconLoader>;
export declare const availableIcons: string[];
