export default function decorate(block) {
  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const cols = [...row.children];
    const linkEl = cols[0]?.querySelector('a');
    const label = linkEl?.textContent?.trim() || cols[0]?.textContent?.trim() || 'Button';
    const variant = cols[1]?.textContent?.trim() || 'primary';
    const size = cols[2]?.textContent?.trim() || 'medium';
    const display = cols[3]?.textContent?.trim() || 'fit';
    const disabled = cols[4]?.textContent?.trim().toLowerCase() === 'true';
    const a11yLabel = cols[5]?.textContent?.trim() || '';
    const type = cols[6]?.textContent?.trim() || 'button';
    const href = linkEl?.href || '';

    const btn = document.createElement('wdpr-button');
    btn.setAttribute('variant', variant);
    btn.setAttribute('size', size);
    btn.setAttribute('display', display);
    btn.setAttribute('type', type);
    if (disabled) btn.setAttribute('disabled', '');
    if (a11yLabel) btn.setAttribute('a11y-label', a11yLabel);
    btn.textContent = label;

    btn.addEventListener('wdprClick', (e) => {
      // eslint-disable-next-line no-console
      console.warn('vista-button wdprClick', {
        label, variant, size, display, type, disabled, a11yLabel, href, event: e,
      });
      if (href) window.location.href = href;
    });

    btn.addEventListener('wdprDisabledChange', (e) => {
      // eslint-disable-next-line no-console
      console.warn('vista-button wdprDisabledChange', { label, disabled: e.detail });
    });

    row.replaceWith(btn);
  });
}

/*
* ============================================================
* wdpr-button — Properties, events and AEM authoring table
* ============================================================
*
* AUTHORING TABLE (columns in the Google Docs / Word document)
* ┌────────┬──────────────────────────────────────────────────────────────────┬──────────────┐
* │ Column │ Description                                                      │ Default      │
* ├────────┼──────────────────────────────────────────────────────────────────┼──────────────┤
* │ col 0  │ Button text or link (text slot / href)                           │ 'Button'     │
* │ col 1  │ variant: primary | secondary | secondary-alt | tertiary |        │ 'primary'    │
* │        │          tertiary-alt | transactional | text | text-no-padding   │              │
* │ col 2  │ size: xsmall | small | medium | large                            │ 'medium'     │
* │ col 3  │ display: fit | block                                              │ 'fit'        │
* │ col 4  │ disabled: true | false                                           │ false        │
* │ col 5  │ a11yLabel: accessible label for screen readers                   │ ''           │
* │ col 6  │ type: button | submit | reset                                    │ 'button'     │
* └────────┴──────────────────────────────────────────────────────────────────┴──────────────┘
*
* PROPS
* ┌──────────────┬──────────────────────────────────────────────────────────────┬──────────────┐
* │ Prop         │ Description                                                  │ Default      │
* ├──────────────┼──────────────────────────────────────────────────────────────┼──────────────┤
* │ type         │ HTML type attribute for the button (button | submit | reset) │ 'button'     │
* │ variant      │ Visual style of the button                                   │ 'primary'    │
* │ size         │ Visual size (xsmall | small | medium | large)                │ 'medium'     │
* │ disabled     │ Disables the button, preventing user interaction (boolean)   │ false        │
* │ a11yLabel    │ Accessible label for screen readers                          │ ''           │
* │ display      │ Width behavior: fit (content width) | block (full width)      │ 'fit'         │
* └──────────────┴──────────────────────────────────────────────────────────────┴──────────────┘
*
* EVENTS
* ┌──────────────────────┬──────────────────────────────────────────────────────┐
* │ Event                │ Description                                          │
* ├──────────────────────┼──────────────────────────────────────────────────────┤
* │ wdprClick            │ Emitted when the button is clicked                   │
* │ wdprDisabledChange   │ Emitted when the button's disabled state changes     │
* └──────────────────────┴──────────────────────────────────────────────────────┘
*
* SLOTS
* ┌──────────┬──────────────────────────────────────────────────────────────────┐
* │ Slot     │ Description                                                      │
* ├──────────┼──────────────────────────────────────────────────────────────────┤
* │ (default)│ Button text — mapped from col 0 of the block                     │
* └──────────┴──────────────────────────────────────────────────────────────────┘
*/
