import { EventEmitter } from '../../stencil-public-runtime';
import { IconLibrarySize } from '../wdpr-icon-library/wdpr-icon-library.model';
export type ModalVariant = 'default' | 'default-alt';
export declare class WdprModalHeader {
    headerText: string;
    icon: string;
    iconSize: IconLibrarySize;
    subtext: string;
    showCloseIcon: boolean;
    /** Visual variant of the header. 'default-alt' uses alternate background color. */
    variant: ModalVariant;
    close: EventEmitter<void>;
    private getHeaderClasses;
    render(): any;
}
