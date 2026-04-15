import { EventEmitter } from '../../stencil-public-runtime';
import { NavItemSelectableDetail } from '../wdpr-nav-item-selectable/wdpr-nav-item-selectable.model';
export declare class WdprSecondaryNavSection {
    el: HTMLWdprSecondaryNavSectionElement;
    private _internalId;
    private _hasLabelSlot;
    sectionId: string;
    a11yLabel: string;
    variant: 'loud' | 'quiet';
    wdprSecondaryNavSectionClick: EventEmitter<string>;
    componentWillLoad(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    handleNavItemSmallClick(event: CustomEvent<string>): void;
    handleNavItemSelectableChange(event: CustomEvent<NavItemSelectableDetail>): void;
    private _updateSlots;
    private get _labelClass();
    render(): any;
}
