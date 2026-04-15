export function measureBreadcrumbWidths(breadcrumbs) {
    // Save original styles
    const originalStyles = breadcrumbs.map(breadcrumb => ({
        display: breadcrumb.style.display,
    }));
    // Make all breadcrumbs visible for measurement
    breadcrumbs.forEach(breadcrumb => {
        breadcrumb.classList.remove('hidden');
    });
    const widths = breadcrumbs.map(breadcrumb => breadcrumb.getBoundingClientRect().width);
    // Restore original styles
    breadcrumbs.forEach((breadcrumb, i) => {
        breadcrumb.classList.toggle('hidden', originalStyles[i].display === 'none');
    });
    return widths;
}
/**
 * Waits for fonts to load and layout to stabilize before measuring
 */
export async function waitForStableLayout() {
    // Wait for document fonts to be ready
    if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
    }
    // Give the browser a frame to complete layout
    await new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resolve();
            });
        });
    });
}
//# sourceMappingURL=wdpr-breadcrumb.utils.js.map
