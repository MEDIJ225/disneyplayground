import type { Target, TextLinkSizes, TextLinkVariants } from '../../models/text-link.types';
export declare class WdprTextLink {
    /**
     * Reference to host element
     * @type {HTMLWdprTextLinkElement}
     */
    el: HTMLWdprTextLinkElement;
    /**
     * @internal
     * Marks if the leading slot has content or not
     * @default false
     * @type {boolean}
     */
    hasLeadingIcon: boolean;
    /**
     * @internal
     * Marks if the trailing slot has content or not
     * @default false
     * @type {boolean}
     */
    hasTrailingIcon: boolean;
    /**
     * The URL to navigate to when the link is clicked.
     * @type {string}
     */
    href: string;
    /**
     * The target attribute of the link. Possible values: '_blank', '_self', '_parent', '_top'.
     * @type {string}
     */
    target?: Target;
    /**
     * The rel attribute of the link.
     * @type {string}
     */
    rel?: string;
    /**
     * The size of the text link. Possible values: 'xxsmall', 'xsmall', 'small', 'medium', 'large'.
     * @type {TextLinkSizes}
     */
    size: TextLinkSizes;
    /**
     * The variant of the text link.
     * @type {TextLinkVariants}
     */
    variant: TextLinkVariants;
    /**
     * Defines a string value that labels the element being focused.
     * Use this when the visible text is ambiguous (e.g., "Read more").
     * @type {string}
     */
    a11yLabel: string;
    disabled: boolean;
    /**
     * Optional override for the tab index.
     * @type {number}
     */
    customTabIndex?: number;
    componentWillLoad(): void;
    private get containerClasses();
    private get iconContainerClasses();
    private get iconClasses();
    private get textClasses();
    private get disabledClasses();
    private get focusVisibleClasses();
    private get computedRel();
    render(): any;
}
