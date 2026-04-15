import { HeadingLevel } from '../../models/card.model';
export declare class WdprCardSmallContent {
    primaryHeadline: string;
    body: string;
    bullets: string[];
    contentType: 'stacked' | 'body';
    disabled: boolean;
    inverseColor: boolean;
    headingLevel: HeadingLevel;
    render(): any;
}
