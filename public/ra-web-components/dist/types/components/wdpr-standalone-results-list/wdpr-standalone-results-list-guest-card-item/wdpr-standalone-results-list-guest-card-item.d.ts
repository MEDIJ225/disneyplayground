import { EventEmitter } from '../../../stencil-public-runtime';
import { StandaloneResultListSelectionMode } from '../wdpr-standalone-results-list.model';
export declare class WdprStandaloneResultsListGuestCardItem {
    value: string;
    selected: boolean;
    disabled: boolean;
    mode: StandaloneResultListSelectionMode;
    label: string;
    description: string;
    buttonActionText: string;
    imageSrc: string;
    singleSelectionActionType: 'button' | 'radio' | 'ellipses' | 'none';
    a11yAlt: string;
    a11yLabel: string;
    wdprSelect: EventEmitter<{
        value: string;
        selected: boolean;
    }>;
    wdprActionClick: EventEmitter<void>;
    private _handleSelection;
    private _handleActionClick;
    render(): any;
}
