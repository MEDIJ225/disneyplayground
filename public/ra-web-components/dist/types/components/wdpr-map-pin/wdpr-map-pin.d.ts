import { EventEmitter } from '../../stencil-public-runtime';
import { MapPinStyle, MapPinLabel, MapPinLayout } from './wdpr-map-pin.model';
export declare class WdprMapPin {
    el: HTMLWdprMapPinElement;
    styleVariant: MapPinStyle;
    label: MapPinLabel;
    selected: boolean;
    iconName?: string;
    labelText: string;
    disabled: boolean;
    layout: MapPinLayout;
    a11yLabel: string;
    mapPinClick: EventEmitter<{
        selected: boolean;
    }>;
    /**
     * Icon name to display when style is 'icon' and state is 'selected'
     * If not provided, falls back to iconName
     */
    selectedIconName?: string;
    /**
     * Time in minutes to display when style is 'time'
     * Only used when style='time'
     */
    time?: number;
    /**
     * Get background color classes for the pin SVG
     */
    private get _pinBackgroundColorClasses();
    /**
     * Get color classes based on current state
     */
    private get _iconColorClasses();
    private _renderIconContent;
    private _renderTimeContent;
    /**
     * Render the pin content (icon or time)
     */
    private _renderPinContent;
    private _handleClick;
    /**
     * Get container classes for flex layout based on label position and layout
     */
    private get _containerClasses();
    private _getBackgroundSVG;
    private get _backgroundPinClasses();
    render(): any;
}
