import { SpecPage } from '@stencil/core/testing';
type StencilComponent = {
    new (...args: unknown[]): unknown;
};
type Props<T> = {
    [K in keyof T as T[K] extends (...args: unknown[]) => unknown ? never : K]: T[K];
};
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
export declare function createSpecPage<T>(component: new (...args: unknown[]) => T, props?: Partial<Props<T>>, slots?: {
    [name: string]: string;
}, hostAttributes?: {
    [key: string]: string;
}, componentDeps?: StencilComponent[]): Promise<SpecPage>;
export {};
