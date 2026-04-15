import { IconLoader } from '../generated/icon-loaders';
export declare const registerIconLoader: (name: string, loader: IconLoader) => void;
export declare const unregisterIconLoader: (name: string) => void;
export declare const clearIconLoaders: () => void;
export declare const getRegisteredIconNames: () => string[];
export declare const resolveIconLoader: (name: string) => IconLoader | undefined;
export declare const loadIconContent: (name: string) => Promise<string | undefined>;
