import { ComboboxValueItem } from './wdpr-combobox.model';
export interface TagRenderConfig {
    selectedItems: ComboboxValueItem[];
    maxVisibleTags: number;
}
/**
 * Renders the multi-select tags/chips.
 *
 * @param config - Tag rendering configuration
 * @returns JSX fragment with tags and overflow indicator
 */
export declare function renderTags(config: TagRenderConfig): any;
export interface VisibleTagsCalcConfig {
    tagsContainerRef: HTMLDivElement | undefined;
    showIcon: boolean;
    currentMaxVisibleTags: number;
    onMaxVisibleTagsChange: (count: number) => void;
}
/**
 * Calculates how many tags can fit in the container using estimation.
 *
 * @param config - Configuration for the calculation
 */
export declare function calculateVisibleTags(config: VisibleTagsCalcConfig): void;
export interface ResizeObserverConfig {
    tagsContainerRef: HTMLDivElement | undefined;
    onResize: () => void;
}
/**
 * Creates a ResizeObserver for the tags container.
 *
 * @param config - Configuration for the observer
 * @returns The ResizeObserver instance or undefined
 */
export declare function createTagsResizeObserver(config: ResizeObserverConfig): ResizeObserver | undefined;
