import { EventEmitter } from '../../stencil-public-runtime';
export type OverlayRole = 'region' | 'dialog';
export type OverlayVariant = 'surface' | 'scrim';
export declare class WdprOverlay {
    el: HTMLElement;
    open: boolean;
    overlayRole: OverlayRole;
    overlayStyle?: 'light' | 'disabled' | 'default';
    a11yLabel: string;
    cover: boolean;
    zIndex: number;
    /** surface = your card-like surface; scrim = full-bleed backdrop */
    variant: OverlayVariant;
    /** Background class for the overlay */
    bgClass?: string;
    /** Click on empty overlay area */
    overlayClick: EventEmitter<void>;
    private onSurfaceClick;
    private get surfaceClass();
    render(): any;
}
