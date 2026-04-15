import { EventEmitter } from '../../stencil-public-runtime';
export type CarouselCardActionType = 'add' | 'favorite';
export declare class WdprCarouselCard {
    src: string;
    a11yAlt: string;
    actionType?: CarouselCardActionType;
    primaryHeadline: string;
    headlineLabel: string;
    body: string;
    secondaryLabel: string;
    secondaryContent: string;
    wdprFavoritesToggle: EventEmitter<void>;
    wdprAddToggle: EventEmitter<void>;
    private _handleFavoritesToggle;
    private _handleAddToggle;
    private _renderAction;
    render(): any;
}
