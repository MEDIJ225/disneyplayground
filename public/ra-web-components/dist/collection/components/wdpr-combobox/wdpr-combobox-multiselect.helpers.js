import { h, Fragment } from "@stencil/core";
/**
 * Renders the multi-select tags/chips.
 *
 * @param config - Tag rendering configuration
 * @returns JSX fragment with tags and overflow indicator
 */
export function renderTags(config) {
    const { selectedItems, maxVisibleTags } = config;
    if (selectedItems.length === 0) {
        return null;
    }
    const visibleTags = selectedItems.slice(0, maxVisibleTags);
    const overflowCount = Math.max(0, selectedItems.length - maxVisibleTags);
    return (h(Fragment, null, visibleTags.map((item) => (h("wdpr-combobox-tag", { key: item.id, label: item.label }))), overflowCount > 0 && (h("span", { class: "inline-flex items-center justify-center h-250 px-100 body-medium-alt text-text-status-neutral bg-surface-status-neutral rounded-050 shrink-0" }, "+", overflowCount))));
}
/**
 * Calculates how many tags can fit in the container using estimation.
 *
 * @param config - Configuration for the calculation
 */
export function calculateVisibleTags(config) {
    const { tagsContainerRef, showIcon, currentMaxVisibleTags, onMaxVisibleTagsChange } = config;
    if (!tagsContainerRef)
        return;
    const containerWidth = tagsContainerRef.offsetWidth;
    if (!containerWidth || !Number.isFinite(containerWidth))
        return;
    const wrapperPadding = 32;
    const wrapperGap = showIcon ? 16 : 0;
    const iconButtonWidth = showIcon ? 32 : 0;
    const inputMinWidth = 50;
    const overflowBadgeWidth = 32;
    const avgTagWidth = 60;
    const tagGap = 4;
    const reservedSpace = wrapperPadding + wrapperGap + iconButtonWidth + inputMinWidth + overflowBadgeWidth;
    const availableWidth = containerWidth - reservedSpace;
    const estimatedMaxTags = Math.max(1, Math.floor(availableWidth / (avgTagWidth + tagGap)));
    if (estimatedMaxTags !== currentMaxVisibleTags) {
        onMaxVisibleTagsChange(estimatedMaxTags);
    }
}
/**
 * Creates a ResizeObserver for the tags container.
 *
 * @param config - Configuration for the observer
 * @returns The ResizeObserver instance or undefined
 */
export function createTagsResizeObserver(config) {
    const { tagsContainerRef, onResize } = config;
    if (!tagsContainerRef)
        return undefined;
    const observer = new ResizeObserver(() => {
        onResize();
    });
    observer.observe(tagsContainerRef);
    return observer;
}
//# sourceMappingURL=wdpr-combobox-multiselect.helpers.js.map
