import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprTab {
    el: HTMLElement;
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
     * if `true`, the tab will grow to fill the available space.
     * @type {boolean}
     */
    grow: boolean;
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
    showInactiveBorderBottom: boolean;
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
