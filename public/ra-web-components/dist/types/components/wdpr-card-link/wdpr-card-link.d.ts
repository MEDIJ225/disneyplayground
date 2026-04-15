import { EventEmitter } from '../../stencil-public-runtime';
export type CardLinkType = 'button' | 'caret' | 'radio' | 'checkbox' | 'ellipses' | 'slot';
/**
 * Card link component: renders a button, caret, ellipses, radio, checkbox, or custom slot content.
 */
export declare class WdprCardLink {
    el: HTMLElement;
    type: CardLinkType;
    disabled?: boolean;
    checked?: boolean;
    name?: string;
    value?: string;
    a11yLabel?: string;
    clicked: EventEmitter<void>;
    private _handleClick;
    render(): any;
}
