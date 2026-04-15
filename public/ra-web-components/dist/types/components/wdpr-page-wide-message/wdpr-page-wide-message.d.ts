import { EventEmitter } from '../../stencil-public-runtime';
import { A11yAriaRole } from './wdpr-page-wide-message.model';
export type PageMessageVariant = 'success' | 'informational' | 'warning' | 'error';
export declare class WdprPageWideMessage {
    el: HTMLElement;
    variant: PageMessageVariant;
    titleMessage: string;
    description?: string;
    showDescription: boolean;
    buttonText?: string;
    showButton: boolean;
    a11yAriaRole?: A11yAriaRole;
    a11yButtonLabel?: string;
    actionClicked: EventEmitter<void>;
    handleKeyDown(event: KeyboardEvent): void;
    private _handleClick;
    private _getCapitalValue;
    private get _mapVariant();
    private get _ariaRole();
    private get _buttonVariant();
    private get _containerClasses();
    private get _contentClasses();
    private get _titleClasses();
    private get _descriptionClasses();
    render(): any;
}
