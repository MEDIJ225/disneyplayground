import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprAddButton {
    /**
     * Reference to host element
     * @type {HTMLWdprAddButtonElement}
     */
    el: HTMLWdprAddButtonElement;
    /**
     * Marks the add button as selected (toggles `aria-pressed`)
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
    /**
     * ARIA label for accessibility
     * @type {string}
     */
    a11yLabel: string;
    /**
     * On add button toggled. Sends the state of the button (selected or not selected).
     * @event
     * @type {{ selected: boolean }}
     */
    wdprAddToggle: EventEmitter<{
        selected: boolean;
    }>;
    private _onButtonClick;
    private _getButtonBaseClasses;
    private get _buttonClasses();
    private get _selectedIconClass();
    private get _unselectedIconClass();
    render(): any;
}
