import { TextHeaderSizes } from './wdpr-text-header.model';
export declare class WdprTextHeader {
    /**
     * Reference to host element
     * @type {HTMLWdprTextHeaderElement}
     */
    el: HTMLWdprTextHeaderElement;
    hasLeadingIcon: boolean;
    hasSwapContent: boolean;
    /**
     * The main text to display in the header.
     * @type {string}
     */
    headerLabel: string;
    /**
     * The subtext to display below the main header.
     * @type {string}
     */
    subtextLabel?: string;
    /**
     * The pre-header text to display above the main header.
     * @type {string}
     */
    preHeader?: string;
    /**
     * The size of the header.
     * @type {TextHeaderSizes}
     */
    size: TextHeaderSizes;
    componentDidLoad(): void;
    private updateSlotStates;
    private get mainContentClasses();
    private get headerClasses();
    private get subtextClasses();
    render(): any;
}
