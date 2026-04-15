import { newSpecPage } from "@stencil/core/testing";
/**
 * Creates a SpecPage for testing Stencil components.
 *
 * @param component The component to test.
 * @param props Optional props to assign to the component.
 * @param slots Optional slots to assign to the component.
 * @param hostAttributes Optional attributes to assign to the component's host element.
 * @param componentDeps Optional dependencies of the component to register.
 * @returns A SpecPage containing the component.
 */
export async function createSpecPage(component, props = {}, slots = {}, hostAttributes = {}, componentDeps = []) {
    const slotContent = Object.values(slots).join('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tagName = component.COMPILER_META.tagName;
    if (!tagName) {
        // @Component({
        //   tag: 'tag-name', <-- Tag name is required to use this function
        // })
        throw new Error('Tag name not defined.');
    }
    const htmlAttributes = Object.keys(hostAttributes)
        .map(key => `${key}="${hostAttributes[key]}"`)
        .join(' ');
    const componentsToRegister = [component, ...componentDeps];
    const page = await newSpecPage({
        components: componentsToRegister,
        html: `<${tagName} ${htmlAttributes}>${slotContent}</${tagName}>`,
    });
    Object.assign(page.root, props);
    await page.waitForChanges();
    return page;
}
//# sourceMappingURL=spec-page.utils.js.map
