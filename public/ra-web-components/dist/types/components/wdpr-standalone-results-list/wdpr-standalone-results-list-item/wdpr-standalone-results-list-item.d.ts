import { EventEmitter } from '../../../stencil-public-runtime';
import { StandaloneResultListSelectionMode } from '../wdpr-standalone-results-list.model';
export declare class WdprStandaloneResultsListItem {
    el: HTMLWdprStandaloneResultsListItemElement;
    _showDivider: boolean;
    value: string;
    label: string;
    description: string;
    disabled: boolean;
    selected: boolean;
    mode: StandaloneResultListSelectionMode;
    wdprSelect: EventEmitter<{
        value: string;
        selected: boolean;
    }>;
    hideDivider(): Promise<void>;
    private _handleCheckboxKeyDown;
    private _handleSelection;
    private _handleMultipleCheckboxChange;
    private _suppressCheckboxClickBubble;
    renderVariant(): any;
    render(): any;
}
