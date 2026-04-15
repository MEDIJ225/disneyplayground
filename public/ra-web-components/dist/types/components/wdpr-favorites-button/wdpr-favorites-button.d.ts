import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprFavoritesButton {
    /**
     * Reference to host element
     * @type {HTMLWdprFavoritesButtonElement}
     */
    el: HTMLWdprFavoritesButtonElement;
    internals: ElementInternals;
    /**
     * Marks the favorites button as selected (toggles `aria-pressed`)
     * @default false
     * @type {boolean}
     */
    selected: boolean;
    /**
     * Disables interactivity and applies disabled styling
     * @default false
     * @type {boolean}
     */
    disabled: boolean;
    required: boolean;
    name?: string;
    value: string;
    /**
     * ARIA label for accessibility
     * @type {string}
     */
    ariaLabel: string;
    /**
     * On favorite button toggled. Sends the state of the button (selected or not selected).
     * @event
     * @type {{ selected: boolean }}
     */
    wdprFavoritesToggle: EventEmitter<{
        selected: boolean;
    }>;
    componentWillLoad(): void;
    formPropsChanged(): void;
    get selectedIconClass(): string;
    get unselectedIconClass(): string;
    get buttonClasses(): string;
    private handleClick;
    private _updateFormValue;
    private _updateValidity;
    render(): any;
}
