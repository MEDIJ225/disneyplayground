import { EventEmitter } from '../../stencil-public-runtime';
import { StandaloneResultListSelectionMode } from './wdpr-standalone-results-list.model';
import { IconLibrarySize } from '../wdpr-icon-library/wdpr-icon-library.model';
import { RadialLabelPlacement, RadialLoaderSize } from '../wdpr-radial-loader/wdpr-radial-loader.model';
import { InlineMessageSize } from '../wdpr-inline-message/wdpr-inline-message.model';
export declare class WdprStandaloneResultsList {
    el: HTMLWdprStandaloneResultsListElement;
    _measuredMaxHeight: string | null;
    _readyToShow: boolean;
    _selectedValues: Set<string>;
    mode: StandaloneResultListSelectionMode;
    maxViewableItems: number | null;
    showDivider: boolean;
    isLoading: boolean;
    loadingText: string;
    loaderSize: RadialLoaderSize;
    loaderLabelPlacement: RadialLabelPlacement;
    showLoaderLabel: boolean;
    isEmpty: boolean;
    emptyText: string;
    emptyIcon: string;
    emptyIconSize: IconLibrarySize;
    errorOnLoad: boolean;
    errorText: string;
    errorTextSize: InlineMessageSize;
    wdprSelectionChange: EventEmitter<{
        selectedValues: string[];
    }>;
    updateSelectedValues(): void;
    handleMaxViewableItemsChange(): void;
    handleItemSelect(event: CustomEvent<{
        value: string;
        selected: boolean;
    }>): void;
    componentDidLoad(): void;
    private _getAllListItems;
    private _initAllItems;
    private _updateSelectedValues;
    private _updateValuesFromSingleSelection;
    private _updateValuesFromMultipleSelection;
    private _syncSelectionItemsState;
    /**
     * Measures the height of the standalone result list and sets the max height for scrollable lists.
     * Calculates based on the number of visible items and their bounding rectangles.
     */
    private _measureItemHeights;
    private _handleSlotChange;
    private _renderContent;
    private get _wrapperClasses();
    render(): any;
}
