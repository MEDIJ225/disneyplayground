export type MapPinStyle = 'icon' | 'time';
export type MapPinLabel = 'leading' | 'trailing' | 'none';
/**
 * Map Pin Layout - determines the layout of the pin
 * - stacked: Always uses vertical layout (flex-col)
 * - inline: Always uses horizontal layout (flex-row)
 * - none: Uses inline when not selected, stacked when selected
 */
export type MapPinLayout = 'stacked' | 'inline' | 'none';
