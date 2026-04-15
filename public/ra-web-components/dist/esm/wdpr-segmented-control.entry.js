import { a as getElement, r as registerInstance, c as createEvent, h, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId, c as customTwMerge } from './utils-B2sDCMk6.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprSegmentedControl = class {
    get el() { return getElement(this); }
    internals;
    /**
     * Array of segment options (for programmatic creation)
     */
    options;
    /**
     * Currently selected value
     */
    value;
    /**
     * Default selected value
     */
    defaultValue;
    /**
     * Whether to use icon variant for all segments
     */
    withIcons = false;
    /**
     * Name attribute for form submission and radio group
     */
    name;
    /**
     * Aria label for the segmented control (radio group label)
     */
    a11yLabel;
    /**
     * Whether the entire control is disabled
     */
    disabled = false;
    /**
     * Whether the control is required for form validation
     */
    required = false;
    /**
     * Size of the control: 'hug' fits the content, 'fill' takes full width
     */
    size = 'hug';
    /**
     * Helper text for the radio group
     */
    helperText;
    /**
     * Internal state for selected index
     */
    selectedIndex = 0;
    /**
     * Event emitted when selection changes
     */
    segmentChange;
    _segments = [];
    _groupId;
    _helperTextId;
    _defaultValue;
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.segmentChange = createEvent(this, "segmentChange", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this._groupId = `segmented-control-${generateRandId()}`;
        this._helperTextId = `${this._groupId}-helper`;
    }
    valueChanged(newValue) {
        this._updateSelectedSegment(newValue);
        this._updateFormValue();
    }
    optionsChanged() {
        requestAnimationFrame(() => this._initializeSegments());
    }
    disabledChanged(newValue) {
        // When parent control is disabled, disable all segments
        // When parent is enabled, re-initialize to respect individual segment disabled states
        if (newValue) {
            this._segments.forEach(segment => {
                segment.disabled = true;
            });
        }
        else {
            // Re-initialize to reset proper disabled states
            requestAnimationFrame(() => this._initializeSegments());
        }
        this._updateFormValue();
    }
    nameChanged() {
        this._updateFormValue();
    }
    requiredChanged() {
        this._updateFormValue();
    }
    componentWillLoad() {
        this._initializeSegments();
        this._defaultValue = this.value;
        this._updateFormValue();
    }
    componentDidRender() {
        if (this._segments.length === 0) {
            this._initializeSegments();
        }
    }
    connectedCallback() {
        (this.internals?.form ?? this.el.closest('form'))?.addEventListener('reset', this._handleFormReset);
    }
    disconnectedCallback() {
        (this.internals?.form ?? this.el.closest('form'))?.removeEventListener('reset', this._handleFormReset);
    }
    handleSegmentClick(event) {
        if (!this.disabled) {
            event.stopPropagation();
            this._selectSegment(event.detail.value, event.detail.index);
        }
    }
    _initializeSegments() {
        // Set default value if provided and no value is set
        if (this.defaultValue && !this.value) {
            this.value = this.defaultValue;
        }
        // Query segments from shadow DOM (options prop) or light DOM (slotted)
        const shadowSegments = Array.from(this.el.shadowRoot?.querySelectorAll('wdpr-segment') || []);
        const lightSegments = shadowSegments.length === 0
            ? Array.from(this.el.querySelectorAll('wdpr-segment'))
            : [];
        this._segments = shadowSegments.length > 0 ? shadowSegments : lightSegments;
        if (this._segments.length === 0) {
            return;
        }
        // Validate that value exists in segments if set
        if (this.value) {
            const valueExists = this._segments.some(segment => (segment.value || segment.label) === this.value);
            if (!valueExists) {
                console.warn(`[wdpr-segmented-control] Value "${this.value}" does not exist in segments. Selecting first segment.`);
                this.value = undefined;
            }
        }
        this._segments.forEach((segment, index) => {
            segment.index = index;
            segment.name = this.name || this._groupId;
            segment.segmentId = `${this._groupId}-option-${index}`;
            // Propagate parent disabled state to slotted segments
            if (this.disabled) {
                segment.disabled = true;
            }
            const segmentValue = segment.value || segment.label;
            if (this.value === segmentValue) {
                this.selectedIndex = index;
                segment.selected = true;
            }
            else if (!this.value && index === 0) {
                this.value = segmentValue;
                this.selectedIndex = 0;
                segment.selected = true;
            }
            else {
                segment.selected = false;
            }
        });
    }
    _selectSegment(value, index) {
        if (this.value === value)
            return;
        this.value = value;
        this.selectedIndex = index;
        this._segments.forEach((segment, i) => {
            segment.selected = i === index;
        });
        this.segmentChange.emit({ value, index });
    }
    _handleFormReset = () => {
        this.value = this._defaultValue;
        this._updateFormValue();
    };
    _updateFormValue() {
        const shouldSubmit = !this.disabled && !!this.name && !!this.value;
        this.internals?.setFormValue?.(shouldSubmit ? this.value : null);
        this._updateValidity();
    }
    _updateValidity() {
        if (this.disabled || !this.required) {
            this.internals?.setValidity?.({});
            return;
        }
        if (this.value) {
            this.internals?.setValidity?.({});
        }
        else {
            this.internals?.setValidity?.({ valueMissing: true }, 'Please select an option');
        }
    }
    _updateSelectedSegment(value) {
        const index = this._segments.findIndex(segment => (segment.value || segment.label) === value);
        if (index !== -1) {
            this.selectedIndex = index;
            this._segments.forEach((segment, i) => {
                segment.selected = i === index;
            });
        }
    }
    _handleKeyDown = (event) => {
        if (this.disabled) {
            return;
        }
        const key = event.key;
        let newIndex = this.selectedIndex;
        switch (key) {
            case KEYBOARD_KEYS.ARROW_LEFT:
            case KEYBOARD_KEYS.ARROW_UP:
                event.preventDefault();
                newIndex = this.selectedIndex > 0 ? this.selectedIndex - 1 : this._segments.length - 1;
                break;
            case KEYBOARD_KEYS.ARROW_RIGHT:
            case KEYBOARD_KEYS.ARROW_DOWN:
                event.preventDefault();
                newIndex = this.selectedIndex < this._segments.length - 1 ? this.selectedIndex + 1 : 0;
                break;
            case KEYBOARD_KEYS.HOME:
                event.preventDefault();
                newIndex = 0;
                break;
            case KEYBOARD_KEYS.END:
                event.preventDefault();
                newIndex = this._segments.length - 1;
                break;
            case ' ':
            case 'Enter':
                // Space and Enter should activate the focused radio button
                event.preventDefault();
                return;
            default:
                return;
        }
        // Skip disabled segments with infinite loop prevention
        const maxAttempts = this._segments.length;
        let attempts = 0;
        const isForward = key === KEYBOARD_KEYS.ARROW_RIGHT || key === KEYBOARD_KEYS.ARROW_DOWN;
        while (this._segments[newIndex]?.disabled && newIndex !== this.selectedIndex && attempts < maxAttempts) {
            if (isForward) {
                newIndex = newIndex < this._segments.length - 1 ? newIndex + 1 : 0;
            }
            else {
                newIndex = newIndex > 0 ? newIndex - 1 : this._segments.length - 1;
            }
            attempts++;
        }
        // Only select if we found a valid segment
        if (newIndex !== this.selectedIndex && !this._segments[newIndex]?.disabled) {
            const segment = this._segments[newIndex];
            this._selectSegment(segment.value || segment.label, newIndex);
            segment.setFocus();
        }
    };
    /**
     * Focus the selected segment
     */
    async setFocus() {
        const selectedSegment = this._segments[this.selectedIndex];
        selectedSegment?.setFocus();
    }
    _getContainerClasses() {
        const baseClasses = `
      relative inline-flex items-center
      bg-[var(--color-indigo-100)] rounded-pill
      p-050 min-w-0
    `;
        const heightClass = this.withIcons ? 'h-[58px]' : 'h-[44px]';
        const widthClass = this.size === 'fill' ? 'w-full' : 'w-fit';
        const disabledClasses = this.disabled ? 'pointer-events-none' : '';
        return customTwMerge(baseClasses, heightClass, widthClass, disabledClasses);
    }
    _getSegmentsContainerClasses() {
        // Use CSS grid with equal columns so all segments match the width of the longest label
        const baseClasses = 'segments-container relative grid items-center gap-050 grid-flow-col auto-cols-[1fr]';
        // For fill mode, stretch to full width
        const widthClass = this.size === 'fill' ? 'w-full' : '';
        return customTwMerge(baseClasses, widthClass);
    }
    _renderSegments() {
        if (this.options && this.options.length > 0) {
            return this.options.map((option, index) => (h("wdpr-segment", { label: option.label, value: option.value, iconName: option.iconName, disabled: option.disabled || this.disabled, variant: this.withIcons ? 'icon-label' : 'label-only', selected: this.selectedIndex === index, index: index, name: this.name || this._groupId, segmentId: `${this._groupId}-option-${index}` })));
        }
        // Render slotted content
        return h("slot", null);
    }
    render() {
        const groupLabel = this.a11yLabel || 'Segmented control options';
        const describedBy = this.helperText ? this._helperTextId : undefined;
        return (h(Host, { key: '52f84c0deddb06edbc7537c20f620ddabc17a9d6' }, h("div", { key: '97e65b4251bf9f33b70a511945a00c147832aab5', class: this._getContainerClasses(), role: "radiogroup", "aria-label": groupLabel, "aria-required": this.required ? 'true' : undefined, "aria-disabled": this.disabled ? 'true' : undefined, "aria-describedby": describedBy, onKeyDown: this._handleKeyDown }, h("div", { key: 'be3c269645150fd97cc2e29262b062eba25ee4b5', class: this._getSegmentsContainerClasses() }, this._renderSegments())), this.helperText && (h("div", { key: '2be7635376fccb177fd84a0efe1eac7f43ff3008', id: this._helperTextId, class: "helper-text text-text-disclaimer component-small mt-100" }, this.helperText))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["valueChanged"],
        "options": ["optionsChanged"],
        "disabled": ["disabledChanged"],
        "name": ["nameChanged"],
        "required": ["requiredChanged"]
    }; }
};

export { WdprSegmentedControl as wdpr_segmented_control };
//# sourceMappingURL=wdpr-segmented-control.entry.js.map

//# sourceMappingURL=wdpr-segmented-control.entry.js.map