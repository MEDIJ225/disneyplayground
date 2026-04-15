import { EventEmitter } from '../../stencil-public-runtime';
import type { ListItem, ListStyle, Spacing } from '../../models/list.types';
import type { Target, TextLinkVariants, TextLinkSizes } from '../../models/text-link.types';
export declare class WdprList {
    private _listEl?;
    /**
     * Reference to the component's host element.
     * @type {HTMLWdprListElement}
     */
    el: HTMLWdprListElement;
    private _computedScrollStyle;
    /**
     * The style to apply to the list items.
     * @type {ListStyle}
     */
    listStyle: ListStyle;
    /**
     * The spacing to apply between list items.
     * @type {Spacing}
     */
    spacing: Spacing;
    /**
     * Shows or hides the leading text.
     * @type {boolean}
     */
    showLeadingText: boolean;
    /**
     * Shows or hides the text link.
     * @type {boolean}
     */
    showTextLink: boolean;
    /**
     * The name of the radio group.
     * @type {string}
     */
    name?: string;
    /**
     * The items to display in the list.
     * @type {ListItem[]}
     */
    items: ListItem[];
    /**
     * The icon to display next to the list items.
     * @type {string}
     */
    showDivider: boolean;
    /**
     * The ID of the item to be visually highlighted.
     * @type {string | number}
     */
    highlightedId?: string | number;
    /**
     * Emitted when a list item is checked or unchecked.
     * @type {EventEmitter<{ selectedItem: ListItem }>}
     */
    itemChange: EventEmitter<{
        selectedItem: {
            id: string | number;
            text: string;
            value: string;
            checked: boolean;
            icon?: string;
        };
    }>;
    /**
     * The main text to display in the header.
     * @type {string}
     */
    headerLabel: string;
    /**
     * The subtext to display below the main header.
     * @type {string}
     */
    subtextLabel: string;
    /**
     * Shows or hides the leading icon.
     */
    showHeaderLeadingIcon: boolean;
    /**
     * The name of the leading icon.
     */
    headerLeadingIconName: string;
    /**
     * Shows or hides the trailing icon.
     */
    showHeaderTrailingIcon: boolean;
    /**
     * The name of the trailing icon.
     */
    headerTrailingIconName: string;
    /**
     * **Required** The text to display in the link.
     * @type {string}
     */
    label: string;
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
     * The variant of the text link. Possible values: 'primary', 'secondary'.
     * @type {TextLinkVariants}
     */
    variant: TextLinkVariants;
    /**
     * Defines a string value that labels the element being focused.
     * Use this when the visible text is ambiguous (e.g., "Read more").
     * @type {string}
     */
    linkAriaLabel: string;
    /**
     * Shows or hides the text link leading icon.
     */
    showLinkLeadingIcon: boolean;
    /**
     * The name of the text link leading icon.
     */
    linkLeadingIconName: string;
    /**
     * Shows or hides the text link trailing icon.
     */
    showLinkTrailingIcon: boolean;
    /**
     * The name of the text link trailing icon.
     */
    linkTrailingIconName: string;
    /**
     * The maximum number of items to display. A scrollbar will be shown if the total count exceeds this limit.
     */
    maxViewableItems: number | null;
    componentDidRender(): void;
    private _calculateListHeight;
    /**
     * Handles a change event for a list item and emits the itemChange event.
     * @param item The list item that was changed.
     * @param newCheckedState The new checked state of the list item.
     */
    private handleChange;
    /**
     * Handles a change event from a radio group and emits the itemChange event accordingly.
     * Finds the list item that corresponds to the selected radio button value and emits the itemChange event with the updated list item.
     */
    private handleRadioGroupChange;
    /**
     * Returns a Tailwind CSS class string that controls the spacing between list items.
     * The class string is determined by the value of the `spacing` property.
     * @returns {string} The Tailwind CSS class string.
     */
    private get spacingClass();
    /**
     * Returns a Tailwind CSS class string for the divider's top margin.
     * This matches the gap spacing to maintain visual consistency.
     * @returns {string} The Tailwind CSS class string.
     */
    private get dividerSpacingClass();
    /**
     * Returns a Tailwind CSS class string that resets the styles of a button component.
     * The class string is used to reset the styles of the list item buttons.
     * @returns {string} The Tailwind CSS class string.
     */
    private get buttonResetClasses();
    /**
     * Renders a list item based on the provided ListItem object.
     * The rendered list item can be a checkbox, a text-only item, or an item with a leading or trailing icon.
     * The item's text and icon are conditionally styled based on the checked state of the item.
     * The item is wrapped in a reset button class string to remove any unwanted CSS styles.
     * @param {ListItem} item - The ListItem object to render.
     * @returns {JSX.Element} - The rendered list item element.
     */
    private renderListItem;
    private renderRadioGroup;
    render(): any;
}
