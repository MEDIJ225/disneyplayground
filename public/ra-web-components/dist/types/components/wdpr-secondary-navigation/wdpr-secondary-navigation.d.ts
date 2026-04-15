import { EventEmitter } from '../../stencil-public-runtime';
/**
 * Secondary navigation header used for page titles, back button, breadcrumbs, and actions.
 *
 * Layout:
 * - Title row (back button + title + actions)
 * - Breadcrumb row beneath the title
 *
 * Variants:
 * - 'default': Divider is controlled by showDivider, background is bg-page-default.
 * - 'page-with-left-panel': Divider is controlled by showDivider, background is bg-page-default-alt.
 *
 * @slot breadcrumbs - Breadcrumb row inside the header, below the title row.
 * @slot actions - Trailing actions on the right of the title row (e.g. X or primary button).
 * @slot back-icon - Optional override for the back icon button.
 */
export declare class WdprSecondaryNavigation {
    /**
     * Page title shown in the secondary navigation.
     * Also used as the accessible label for the section.
     */
    pageTitle: string;
    /**
     * Variant of the secondary navigation.
     * - 'default': Divider is controlled by showDivider, background is bg-page-default.
     * - 'page-with-left-panel': Divider is controlled by showDivider, background is bg-page-default-alt.
     */
    variant: 'default' | 'page-with-left-panel';
    /**
     * Whether the back icon button should be rendered.
     */
    showBackButton: boolean;
    /**
     * Controls the horizontal divider beneath the header.
     */
    showDivider: boolean;
    /**
     * Whether the close icon button should be rendered.
     */
    showCloseButton: boolean;
    /**
     * Visually hides the page title but keeps it accessible to assistive technologies.
     */
    hideTitle: boolean;
    /**
     * Accessible label for the back button.
     */
    backButtonLabel: string;
    /**
     * The HTML tag to use for the page title. Defaults to 'h1'.
     */
    titleTag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /**
     * Event emitted when the back button is clicked.
     */
    backButtonClicked: EventEmitter<void>;
    private _onBackButtonClick;
    /**
     * Event emitted when the close button is clicked.
     */
    wdprCloseClick: EventEmitter<void>;
    private _onCloseButtonClick;
    private get _rootClasses();
    private get _headerClasses();
    private get _titleRowClasses();
    private get _titleGroupClasses();
    private get _titleTextClasses();
    private get _actionsClasses();
    private get _breadcrumbContainerClasses();
    render(): any;
}
