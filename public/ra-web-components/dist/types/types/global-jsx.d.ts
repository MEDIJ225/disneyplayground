/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSX as StencilJSX } from '../stencil-public-runtime';

declare global {
  namespace JSX {
    interface IntrinsicElements extends StencilJSX.IntrinsicElements {}
    // Add these lines for MDX compatibility:
    type Element = any;
    type ElementClass = { render: any };
  }
}
