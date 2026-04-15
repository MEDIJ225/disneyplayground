import { iconLoaders } from "../generated/icon-loaders";
const customLoaders = new Map();
const normalizeName = (name) => {
    if (!name) {
        return null;
    }
    return name.trim().toLowerCase();
};
export const registerIconLoader = (name, loader) => {
    const normalized = normalizeName(name);
    if (!normalized || typeof loader !== 'function') {
        return;
    }
    customLoaders.set(normalized, loader);
};
export const unregisterIconLoader = (name) => {
    const normalized = normalizeName(name);
    if (!normalized) {
        return;
    }
    customLoaders.delete(normalized);
};
export const clearIconLoaders = () => {
    customLoaders.clear();
};
export const getRegisteredIconNames = () => {
    return Array.from(new Set([...Object.keys(iconLoaders), ...customLoaders.keys()]));
};
export const resolveIconLoader = (name) => {
    const normalized = normalizeName(name);
    if (!normalized) {
        return undefined;
    }
    return customLoaders.get(normalized) ?? iconLoaders[normalized];
};
export const loadIconContent = async (name) => {
    const loader = resolveIconLoader(name);
    if (!loader) {
        return undefined;
    }
    return loader();
};
//# sourceMappingURL=icon-registry.js.map
