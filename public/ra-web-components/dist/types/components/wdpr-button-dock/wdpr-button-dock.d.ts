import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprButtonDock {
    el: HTMLWdprButtonDockElement;
    /**
     * @internal
     * State to detect content in slot total
     */
    private hasTotal;
    /** The label that will be displayed
     * @type {string}
     */
    label?: string;
    /** The sublabel that will be displayed
     * @type {string}
     */
    subLabel?: string;
    /** The centered label that will be displayed
     * @type {string}
     */
    centeredLabel?: string;
    /** Accessible name for the region container
     * @default 'Actions'
     * @type {string}
     */
    a11yLabel: string;
    showDivider: boolean;
    /**
     * Visually dim + sets aria-disabled on the container
     * @default false
     * @type {boolean}
     */
    disabled: boolean;
    handleDisabledChange(next: boolean): void;
    /** Event emitted when disabled changes
     * @event
     * @type {boolean}
     */
    disabledChanged: EventEmitter<boolean>;
    componentDidLoad(): void;
    private get headerAndTotalRowWrapperClasses();
    private syncButtonBarSlot;
    private onTotalSlotChange;
    private onButtonBarSlotChange;
    private renderHeaderAndTotalRow;
    render(): any;
}
