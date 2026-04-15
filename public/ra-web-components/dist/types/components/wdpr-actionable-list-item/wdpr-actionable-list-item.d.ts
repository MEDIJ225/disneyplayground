import { Target, TextLinkVariants } from '../../models/text-link.types';
import { TextHeaderSizes } from '../wdpr-text-header/wdpr-text-header.model';
export declare class WdprActionableListItem {
    /**
     * Reference to the component's host element.
     */
    el: HTMLElement;
    /**
     * Unique ID for the list item.
     */
    itemId?: string;
    /**
     * The main text to display in the header.
     */
    headerLabel: string;
    /**
     * The pre-header text to display above the main header. Hidden if empty.
     */
    preHeader?: string;
    /**
     * The subtext to display below the header. The subtext is hidden if this is empty.
     */
    subtextLabel?: string;
    /**
     * icon content for the leading-icon
     */
    headerLeadingIcon: string;
    /**
     * set the main Text size
     */
    headerSize: TextHeaderSizes;
    /**
     * The main text to display in the link
     */
    linkText: string;
    /**
     * The URL the link points to.
     */
    linkHref: string;
    /**
     * text icon name to add to the left of the link text
     */
    linkLeadingIcon?: string;
    /**
     * text icon name to add at the right of the link text
     */
    linkTrailingIcon?: string;
    /**
     * The visual style of the link.
     */
    linkVariant?: TextLinkVariants;
    /**
     * Specifies where to open the linked document.
     */
    linkTarget?: Target;
    /**
     * Sets an accessible label for the link.
     */
    linkA11yLabel: string;
    /**
     * Disables user interaction and applies disabled styling.
     */
    linkDisabled: boolean;
    /**
     * Specifies the relationship of the target object to the link object.
     */
    linkRel?: string;
    render(): any;
}
