import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprEmptyState {
    el: HTMLWdprEmptyStateElement;
    _responsiveSize: 'small' | 'medium' | 'large';
    size?: 'small' | 'medium' | 'large';
    mediaType: 'icon' | 'media';
    icon?: string;
    mediaSrc?: string;
    mediaAlt: string;
    mediaShape: 'flat' | 'round';
    heading: string;
    bodyContent: string;
    showPrimaryButton: boolean;
    showSecondaryButton: boolean;
    position: 'inline' | 'stacked';
    primaryActionText: string;
    secondaryActionText: string;
    wdprPrimaryClick: EventEmitter<void>;
    wdprSecondaryClick: EventEmitter<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _handlePrimaryClick;
    private _handleSecondaryClick;
    private _setResponsiveSize;
    private get _effectiveSize();
    render(): any;
}
