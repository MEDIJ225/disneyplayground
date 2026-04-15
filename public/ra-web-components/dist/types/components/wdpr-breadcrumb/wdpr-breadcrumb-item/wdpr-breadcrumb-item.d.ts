import { EventEmitter } from '../../../stencil-public-runtime';
import type { Target, TextLinkSizes, TextLinkVariants } from '../../../models/text-link.types';
export declare class WdprBreadcrumbItem {
    /**
     * Reference to host element
     * @type {HTMLWdprBreadcrumbItemElement}
     */
    el: HTMLWdprBreadcrumbItemElement;
    /**
     * @internal
     * Marks if the leading slot has content or not
     * @default false
     * @type {boolean}
     */
    private _hasLeadingIcon;
    /**
     * @internal
     * Marks if the trailing slot has content or not
     * @default false
     * @type {boolean}
     */
    private _hasTrailingIcon;
    /**
     * Flag to indicate if this breadcrumb item is the first one in the breadcrumb list.
     * @internal
     */
    private _first;
    /**
     * Flag to indicate if this breadcrumb item is the last one in the breadcrumb list.
     * @internal
     */
    private _last;
    /**
     * If true, shows a truncation marker (`…`) for this breadcrumb item.
     * Used internally by `WdprBreadcrumb` to collapse the item on smaller screens.
     * @internal
     * Design remove the truncation in Design 1.2.0 but not really clear how they want to handle this, we will leave it and change the logic if needed
     */
    showTruncation: boolean;
    /**
     * The URL to navigate to when the item is clicked.
     * @type {string}
     */
    href?: string;
    /**
     * The target attribute of the item. Possible values: '_blank', '_self', '_parent', '_top'.
     * @type {string}
     */
    target?: Target;
    /**
     * If true, show a separator between this breadcrumb and the next.
     * @type {boolean}
     */
    separator: boolean;
    /**
     * **Required** The text to display in the item.
     * @type {string}
     */
    label: string;
    /**
     * The variant of the text item.
     * @type {TextLinkVariants}
     */
    variant?: TextLinkVariants;
    /**
     * The size of the text link. Possible values: 'xxsmall', 'xsmall', 'small', 'medium', 'large'.
     * @type {TextLinkSizes}
     */
    size: TextLinkSizes;
    /**
     * The rel attribute of the item.
     * @type {string}
     */
    rel?: string;
    truncationClick: EventEmitter<void>;
    /**
     * Marks this item as the first breadcrumb in the sequence.
     * Should only be called internally by `<wdpr-breadcrumb>`.
     * @internal
     */
    setFirstBreadcrumb(): Promise<void>;
    /**
     * Marks this item as the last breadcrumb in the sequence.
     * Should only be called internally by `<wdpr-breadcrumb>`.
     * @internal
     */
    setLastBreadcrumb(): Promise<void>;
    componentWillLoad(): void;
    private _handleTruncationClick;
    private get _isInverseVariant();
    private get _separatorColorClass();
    render(): any;
}
