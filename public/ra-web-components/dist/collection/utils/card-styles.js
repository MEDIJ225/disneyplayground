export const CLASSES = {
    micro: 'flex flex-col flex-1 min-w-0 items-start justify-center',
    small: 'flex flex-col content-stretch items-start justify-center',
    generic: 'flex flex-col items-start justify-center',
    genericSlot: 'pt-100 mb-050 body-small',
    bullet: 'list-none m-0 pt-100 body-medium flex flex-row flex-wrap gap-x-300 gap-y-050 line-clamp-1',
    body: 'relative shrink-0 w-full',
    headline: 'm-0 p-0 relative shrink-0 w-full',
    headlineSubtext: 'overflow-hidden relative shrink-0 w-full line-clamp-2',
    tagLabel: 'overflow-hidden relative shrink-0 w-full line-clamp-2',
    headlineLabel: 'overflow-hidden relative shrink-0 w-full line-clamp-1',
};
export const cardBaseClasses = 'flex flex-col items-center rounded-200 md:w-[358px] max-w-[358px] min-w-[200px] min-h-[72px] overflow-hidden select-none box-border content-stretch relative';
export const cardXlargeBaseClasses = 'block rounded-300 overflow-hidden min-h-[240px] min-w-[280px] max-w-[410px] md:min-h-[500px] md:min-w-[426px] md:max-w-[426px] md:min-h-[100%] md:min-w-[100%] md:max-w-[100%] md:h-[100%] select-none box-border content-stretch relative';
export const cardXlargePortraitBaseClasses = 'block rounded-300 overflow-hidden min-h-[240px] min-w-[160px] w-[342px] h-[513px] md:w-[410px] md:h-[615px] select-none box-border content-stretch relative';
export const cardDisabledClasses = `${cardBaseClasses} border border-solid border-025 border-transparent pointer-events-none`;
export const cardElevationClasses = 'bg-surface-default elevation-small-soft';
export const cardNoElevationClasses = 'bg-surface-default elevation-none';
export const cardOnSurfaceClasses = 'bg-surface-default border-none';
export const cardOffSurfaceClasses = 'bg-transparent border-none';
export const cardBaseBorderClasses = 'border border-solid border-025';
export const cardGhostBorderClasses = [
    'border-025',
    'border-dashed',
    'border-stroke-actionable-alt-disabled',
    'bg-surface-white-000-a48',
    'cursor-pointer',
    'hover:border-stroke-actionable-hover',
    'active:border-stroke-actionable-focused',
    'focus-visible:outline',
    'focus-visible:outline-solid',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-stroke-actionable-focused',
    'focus-visible:outline-037',
].join(' ');
export function resolveTextStyles(disabled, inverse) {
    const textDisabled = 'text-text-disabled';
    const textInverse = 'text-text-inverse';
    if (disabled) {
        return { heading: textDisabled, subtext: textDisabled, disclaimer: textDisabled, body: textDisabled, tag: textDisabled };
    }
    if (inverse) {
        return { heading: textInverse, subtext: textInverse, disclaimer: textInverse, body: textInverse, tag: textInverse };
    }
    return { heading: 'text-text-heading', subtext: 'text-text-label', disclaimer: 'text-text-disclaimer', body: 'text-text-body', tag: 'text-text-label' };
}
//# sourceMappingURL=card-styles.js.map
