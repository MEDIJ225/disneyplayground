import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprSegmentedVerticalTab {
    el: HTMLWdprSegmentedVerticalTabElement;
    /**
     * Tab id
     * @type {string}
     */
    tabId: string;
    /**
     * Tab label
     * @type {string}
     */
    label: string;
    /**
     * Tab secondary label
     * @type {string}
     */
    secondaryLabel: string;
    /**
     * Tab icon
     * @type {string}
     */
    icon: string;
    /**
     * if `true`, the tab is currently active.
     * @type {boolean}
     */
    active: boolean;
    /**
     * if `true`, the tab is disabled
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * The id of the element that this tab controls
     * @type {string}
     */
    controlsId: string;
    /**
     * The tabindex of the tab
     * @type {number}
     */
    customTabIndex: number;
    /**
     * Emitted when the tab button is clicked.
     * This is used by the parent wdpr-tab-bar to manage the active state.
     */
    tabClicked: EventEmitter<{
        tabElement: unknown;
    }>;
    private _handleClick;
    render(): any;
}
