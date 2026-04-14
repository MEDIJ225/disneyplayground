import { toClassName } from '../../scripts/aem.js';
import { createElement, createIcon } from '../../utils/dom.js';

// Global object to store field references that should persist to thank you page
window.formPersistedFields = window.formPersistedFields || {};

function createFieldWrapper(fd) {
  const fieldWrapper = document.createElement('div');
  if (fd.Style) fieldWrapper.className = fd.Style.split(',').map((s) => s.trim()).join(' ');
  fieldWrapper.classList.add('field-wrapper', `${fd.Type}-wrapper`);

  fieldWrapper.dataset.fieldset = fd.Fieldset;
  fieldWrapper.dataset.group = fd.Group;

  return fieldWrapper;
}

const ids = [];
function generateFieldId(fd, suffix = '') {
  const slug = toClassName(`form-${fd.Name}${suffix}`);
  ids[slug] = ids[slug] || 0;
  const idSuffix = ids[slug] ? `-${ids[slug]}` : '';
  ids[slug] += 1;
  return `${slug}${idSuffix}`;
}

function createLabel(fd) {
  const label = document.createElement('label');
  label.id = generateFieldId(fd, '-label');
  label.textContent = fd.Label || fd.Name;
  label.setAttribute('for', fd.Id);
  if (fd.Mandatory && (fd.Mandatory.toLowerCase() === 'true' || fd.Mandatory.toLowerCase() === 'x')) {
    label.dataset.required = true;
  }
  return label;
}

const createErrorMessage = (fd) => {
  const errorMessage = createElement('div', { class: 'form-validation-error', id: generateFieldId(fd, '-error-message') }, fd.ErrorMessage || 'This field is required');
  const errorAlert = createElement('div', { class: 'error-alert', style: 'display: none', role: 'alert' });
  errorAlert.append(errorMessage);
  return errorAlert;
};

function setCommonAttributes(field, fd) {
  field.id = fd.Id;
  field.name = fd.Name;
  if (fd.Type !== 'radio') {
    field.required = fd.Mandatory && (fd.Mandatory.toLowerCase() === 'true' || fd.Mandatory.toLowerCase() === 'x');
    if (field.required) {
      field.setAttribute('required', '');
      field.setAttribute('aria-required', field.required);
    }
  }
  field.placeholder = fd.Placeholder;
  field.value = fd.Value;
  if (fd.Style) field.className = fd.Style.split(',').map((s) => s.trim()).join(' ');
  if (fd.MaxLength) {
    field.setAttribute('maxlength', fd.MaxLength);
  }
  if (fd.MinLength) {
    field.setAttribute('minlength', fd.MinLength);
  }
  if (fd.InputType) {
    field.setAttribute('type', fd.InputType);
  }
  field.hidden = fd.Hidden && (fd.Hidden.toLowerCase() === 'true' || fd.Hidden.toLowerCase() === 'x');
}

const announceSelection = (selectEl) => {
  let announcer = selectEl.parentElement.querySelector('.select-announcer');

  if (!announcer) {
    announcer = document.createElement('div');
    announcer.className = 'select-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    selectEl.parentElement.appendChild(announcer);
  }

  const options = Array.from(selectEl.options).filter((o) => !o.disabled);
  const selected = selectEl.options[selectEl.selectedIndex];
  if (!selected) return;

  const position = options.indexOf(selected) + 1;
  const total = options.length;

  announcer.textContent = `${selected.text}, option ${position} of ${total}`;
};

function removeErrorFromField(inputField) {
  inputField.setCustomValidity('');
  inputField.classList.remove('error');
  inputField.removeAttribute('aria-invalid');
  inputField.removeAttribute('aria-describedby');
  inputField.closest('.field-wrapper')?.querySelector('.error-alert')?.setAttribute('style', 'display: none');
}

const createHeading = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);
  if (fd.Style) fieldWrapper.className = fd.Style.split(',').map((s) => s.trim()).join(' ');
  const level = fd.Style && fd.Style.includes('sub-heading') ? 3 : 2;
  const heading = document.createElement(`h${level}`);
  heading.textContent = fd.Value || fd.Label;
  heading.id = fd.Id;

  fieldWrapper.append(heading);

  return { field: heading, fieldWrapper };
};

const createPlaintext = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);

  const text = document.createElement('p');
  text.textContent = fd.Value || fd.Label;
  text.id = fd.Id;
  setCommonAttributes(text, fd);
  fieldWrapper.append(text);

  return { field: text, fieldWrapper };
};

const createSelect = async (fd, form = null) => {
  const select = document.createElement('select');
  setCommonAttributes(select, fd);

  // Add data-type attribute if type is provided in field definition
  if (fd.type) {
    select.setAttribute('data-type', fd.type);
  }
  const addOption = ({ text, value, type }) => {
    const option = document.createElement('option');
    option.text = text.trim();
    option.value = value.trim();
    if (type) {
      option.setAttribute('data-type', type);
    }
    if (option.value === fd.Value) {
      option.setAttribute('selected', '');
      // Set initial data-type on select if option is pre-selected
      if (type) {
        select.setAttribute('data-type', type);
      }
    }
    select.add(option);
    return option;
  };

  // Set first option text as "Select a " + field title
  const fieldTitle = fd.Label || fd.Name || '';
  const firstOptionText = fd.Placeholder ? fd.Placeholder : `Select a ${fieldTitle}`;

  if (fd.Options) {
    let options = [];
    if (fd.Options.startsWith('https://')) {
      const optionsUrl = new URL(fd.Options);
      const resp = await fetch(`${optionsUrl.pathname}${optionsUrl.search}`);
      const json = await resp.json();
      json.data.forEach((opt) => {
        options.push({
          text: opt.Option,
          value: opt.Value || opt.Option,
          type: opt.Type || '', // Store Type value from JSON
        });
      });
    } else {
      options = fd.Options.split(',').map((opt) => ({
        text: opt.trim(),
        value: opt.trim(),
        type: '', // No type for comma-separated options
      }));
    }

    // Always add first option with "Select a " + field title
    if (options.length > 0 && fieldTitle) {
      const firstOption = addOption({ text: firstOptionText, value: '' });
      firstOption.setAttribute('disabled', '');
    }

    options.forEach((opt) => addOption(opt));
  } else if (fd.Placeholder) {
    // If no options but has placeholder, use placeholder
    const ph = addOption({ text: fd.Placeholder, value: '' });
    ph.setAttribute('disabled', '');
  }

  setTimeout(() => announceSelection(select), 0);

  // -------------------------------------------------------
  // ✅ ARIA-selected support for this <select>
  // -------------------------------------------------------
  // 1. Set initial aria-selected for the default selected option
  const initOptions = select.querySelectorAll('option');
  initOptions.forEach((opt) => opt.removeAttribute('aria-selected'));

  const initiallySelected = select.options[select.selectedIndex];
  if (initiallySelected) {
    initiallySelected.setAttribute('aria-selected', 'true');
  }

  // 2. Update aria-selected on selection change
  select.addEventListener('change', () => {
    announceSelection(select);
    const allOpts = select.querySelectorAll('option');
    allOpts.forEach((o) => o.removeAttribute('aria-selected'));
    const sel = select.options[select.selectedIndex];
    if (sel) {
      sel.setAttribute('aria-selected', 'true');
      // Update data-type on select element based on selected option's Type
      const selectedType = sel.getAttribute('data-type');
      if (selectedType) {
        select.setAttribute('data-type', selectedType);
      } else {
        select.removeAttribute('data-type');
      }
    }

    // Custom logic: if country is US and formsSelect is visible, check formsSelect
    if (fd.Name && fd.Name.toLowerCase() === 'country' && form) {
      const countryValue = select.value.trim();

      if (countryValue === 'US') {
        const formsSelectCheckbox = form.querySelector(
          '#formsSelect, input[name="formsSelect"], input[id*="formsSelect"]',
        );

        if (formsSelectCheckbox && formsSelectCheckbox.type === 'checkbox') {
          // Check if formsSelect checkbox is visible (not hidden)
          const formsSelectWrapper = formsSelectCheckbox.closest('.field-wrapper');
          const isFormsSelectVisible = formsSelectWrapper
            && !formsSelectWrapper.hasAttribute('hidden')
            && formsSelectWrapper.style.display !== 'none'
            && !formsSelectWrapper.hidden;

          if (isFormsSelectVisible) {
            formsSelectCheckbox.checked = true;
            // Trigger change event to ensure any other listeners are notified
            formsSelectCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      }
    }
  });
  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(select);
  fieldWrapper.prepend(createLabel(fd));

  return { field: select, fieldWrapper };
};

const createConfirmation = (fd, form) => {
  form.dataset.confirmation = new URL(fd.Value).pathname;

  return {};
};

const createSubmit = (fd) => {
  const button = document.createElement('button');
  button.textContent = fd.Label || fd.Name;
  button.classList.add('button');
  button.type = 'submit';
  if (fd.Style && fd.Style !== '') {
    const styles = fd.Style.split(',').map((s) => s.trim().toLowerCase());
    styles.forEach((style) => {
      button.classList.add(style);
    });
  }
  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(button);
  return { field: button, fieldWrapper };
};

function addCharacterCounter(field, fieldWrapper) {
  if (!field || !fieldWrapper) return;
  // Only add counter for text inputs, email inputs, and textareas
  const fieldType = field.getAttribute('type') || field.type || '';
  const isTextInput = field.tagName === 'INPUT' && (fieldType === 'text' || fieldType === 'email' || fieldType === 'textfield' || !fieldType);
  const isTextarea = field.tagName === 'TEXTAREA';
  if (!isTextInput && !isTextarea) return;
  const maxLength = parseInt(field.getAttribute('maxlength'), 10) || 500;
  const counter = createElement('span', { class: 'character-counter' });
  // Announce character length
  counter.id = `${field.id}-counter`;
  counter.setAttribute('aria-live', 'polite');
  counter.setAttribute('role', 'status');
  counter.setAttribute('aria-atomic', 'true');
  const updateCounter = () => {
    field.setAttribute('aria-live', 'off');
    const remaining = maxLength - field.value.length;
    counter.textContent = `${remaining} characters remaining (${maxLength} maximum)`;
  };
  updateCounter();
  field.addEventListener('input', updateCounter);
  fieldWrapper.append(counter);
}

const createTextArea = (fd) => {
  const field = document.createElement('textarea');
  setCommonAttributes(field, fd);
  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute('aria-labelledby', label.id);
  // Announce character length
  if (fd.LengthCounter === 'true' || fd.LengthCounter === true) {
    field.setAttribute('aria-describedby', `${field.id}-counter`);
  }
  fieldWrapper.append(field);
  fieldWrapper.prepend(label);

  // Add character counter if LengthCounter is enabled on this field
  if (fd.LengthCounter === 'true' || fd.LengthCounter === true) {
    addCharacterCounter(field, fieldWrapper);
  }

  return { field, fieldWrapper };
};

const createInput = (fd) => {
  const field = document.createElement('input');
  field.type = fd.Type;
  setCommonAttributes(field, fd);

  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute('aria-labelledby', label.id);
  field.setAttribute('autocomplete', fd.AutoComplete || 'on');
  fieldWrapper.append(field);
  if (fd.Type === 'radio' || fd.Type === 'checkbox') {
    fieldWrapper.append(label);
  } else {
    fieldWrapper.prepend(label);
  }

  // Add character counter if LengthCounter is enabled on this field
  if (fd.LengthCounter === 'true' || fd.LengthCounter === true) {
    addCharacterCounter(field, fieldWrapper);
  }

  // Restrict tel input fields to numbers only
  if (fd.InputType === 'tel' || field.type === 'tel') {
    field.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Also prevent non-numeric characters on keypress
    field.addEventListener('keypress', (e) => {
      // Allow: backspace, delete, tab, escape, enter
      if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key)) {
        return;
      }
      // Only allow numbers (0-9)
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  // ---------------------------------------------------
  // ✅ Restrict first name / last name to letters only
  // ---------------------------------------------------
  if (fd.InputType === 'textonly' || field.type === 'textonly') {
    // Replace anything that is NOT A–Z / a–z / space / ' / -
    field.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
    });

    // Block invalid keystrokes before they appear
    field.addEventListener('keypress', (e) => {
      if (!/[a-zA-Z\s'-]/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  // ---------------------------------------------------
  // ✅ Regex validation support
  // ---------------------------------------------------
  if (fd.InputType && fd.InputType.startsWith('regex:')) {
    // Extract regex pattern from InputType (format: regex:/pattern/ or regex:pattern)
    const regexMatch = fd.InputType.match(/^regex:(.+)$/);
    if (regexMatch) {
      try {
        let regexPattern = regexMatch[1].trim();

        // Remove leading and trailing forward slashes if present (regex delimiters)
        // This handles both regex:/pattern/ and regex:pattern formats
        if (regexPattern.startsWith('/') && regexPattern.endsWith('/')) {
          regexPattern = regexPattern.slice(1, -1);
        }

        const regex = new RegExp(regexPattern);

        // Store regex pattern and InputTypeErrorMessage on the field
        // InputTypeErrorMessage is used specifically for regex validation failures
        field.dataset.regexPattern = regexPattern;
        if (fd.InputTypeErrorMessage) {
          field.dataset.regexErrorMessage = fd.InputTypeErrorMessage;
        }

        // Validation function
        const validateRegex = () => {
          const value = field.value.trim();

          // If field is not required and empty, skip validation
          if (!field.required && value === '') {
            // Clear regex validation if it was set
            if (field.dataset.regexErrorMessage) {
              const currentValidity = field.validationMessage;
              if (currentValidity === field.dataset.regexErrorMessage) {
                field.setCustomValidity('');
                removeErrorFromField(field);
              }
            }
            return;
          }

          // If field is required and empty, let HTML5 validation handle it (will use ErrorMessage)
          if (field.required && value === '') {
            // Clear regex validation, let required validation use ErrorMessage
            if (field.dataset.regexErrorMessage) {
              const currentValidity = field.validationMessage;
              if (currentValidity === field.dataset.regexErrorMessage) {
                field.setCustomValidity('');
                removeErrorFromField(field);
              }
            }
            return;
          }

          // Validate against regex pattern (only when field has a value)
          if (value !== '' && !regex.test(value)) {
            // Use InputTypeErrorMessage for regex validation failures
            const errorMsg = fd.InputTypeErrorMessage || 'This field format is invalid';
            field.setCustomValidity(errorMsg);

            // Show error message immediately
            const errorFieldWrapper = field.closest('.field-wrapper');
            if (errorFieldWrapper) {
              const errorAlert = errorFieldWrapper.querySelector('.error-alert');
              if (errorAlert) {
                const errorMessageElement = errorAlert.querySelector('.form-validation-error');
                if (errorMessageElement) {
                  errorMessageElement.textContent = errorMsg;
                }
                errorAlert.setAttribute('style', 'display: block');
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
                field.setAttribute('aria-describedby', errorMessageElement?.id || '');
              }
            }
          } else if (field.dataset.regexErrorMessage) {
            // Clear regex validation if it was set
            const currentValidity = field.validationMessage;
            if (currentValidity === field.dataset.regexErrorMessage) {
              field.setCustomValidity('');
              removeErrorFromField(field);
            }
          }
        };

        // Use debouncing for input events to reduce validation calls
        let regexTimeout;
        const debouncedValidateRegex = () => {
          clearTimeout(regexTimeout);
          regexTimeout = setTimeout(validateRegex, 150);
        };

        // Validate on keypress for real-time validation (immediate)
        field.addEventListener('keypress', () => {
          // Use setTimeout to validate after the key is processed
          setTimeout(validateRegex, 0);
        });

        // Also validate on input (debounced), change, and blur events
        field.addEventListener('input', debouncedValidateRegex);
        field.addEventListener('change', validateRegex);
        field.addEventListener('blur', validateRegex);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Invalid regex pattern in InputType:', fd.InputType, e);
      }
    }
  }

  return { field, fieldWrapper };
};

const createFileInput = (fd) => {
  const field = document.createElement('input');
  field.type = 'file';
  field.classList.add('file-input-native');
  setCommonAttributes(field, fd);

  // Handle accept attribute (file types allowed)
  // Use Accept field (preferred) or Options field (fallback)
  // Accepts comma-separated values like: ".pdf,.doc,.docx" or "image/*,application/pdf"
  let acceptValue = '';
  if (fd.Accept) {
    acceptValue = fd.Accept;
  } else if (fd.Options) {
    acceptValue = fd.Options;
  }

  if (acceptValue) {
    // Ensure proper formatting: trim spaces and join with comma
    const acceptTypes = acceptValue.split(',').map((type) => type.trim()).filter((type) => type);
    field.setAttribute('accept', acceptTypes.join(','));
  }

  // Handle multiple file selection
  if (fd.Multiple && (fd.Multiple.toLowerCase() === 'true' || fd.Multiple.toLowerCase() === 'x')) {
    field.setAttribute('multiple', '');
  }

  // Handle max file size (in bytes) if provided
  if (fd.MaxSize) {
    field.setAttribute('data-max-size', fd.MaxSize);
  }

  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute('aria-labelledby', label.id);
  fieldWrapper.prepend(label);

  // Visible UI: text-like box + Browse button, matching design
  const fileInputWrapper = createElement('div', { class: 'file-input-wrapper' });

  // Read-only text box that shows selected file name(s)
  const displayInput = document.createElement('input');
  displayInput.type = 'text';
  displayInput.readOnly = true;
  displayInput.classList.add('file-display');
  if (fd.Placeholder) {
    displayInput.placeholder = fd.Placeholder;
  }

  // Browse button that triggers native file dialog
  const browseButton = createElement(
    'button',
    { type: 'button', class: 'button file-browse-button' },
    fd.BrowseLabel || 'Browse',
  );

  // Keep native input for accessibility, but visually hidden
  fileInputWrapper.append(displayInput);
  fileInputWrapper.append(browseButton);
  fileInputWrapper.append(field);
  fieldWrapper.append(fileInputWrapper);

  browseButton.addEventListener('click', () => {
    field.click();
  });

  // Update UI and validate when files are selected
  field.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) {
      displayInput.value = '';
      field.setCustomValidity('');
      removeErrorFromField(field);
      return;
    }

    // Show file names in the text box
    displayInput.value = files.map((file) => file.name).join(', ');

    // Validate file sizes against MaxSize, if provided
    if (fd.MaxSize) {
      const maxSize = parseInt(fd.MaxSize, 10);
      const tooLarge = files.find((file) => file.size > maxSize);

      if (tooLarge) {
        const maxMb = (maxSize / 1024 / 1024).toFixed(2);
        field.setCustomValidity(`File "${tooLarge.name}" exceeds maximum size of ${maxMb} MB`);
      } else {
        field.setCustomValidity('');
      }
    } else {
      field.setCustomValidity('');
    }

    // Clear any visual error state if now valid
    if (field.validationMessage === '') {
      removeErrorFromField(field);
    }
  });

  return { field, fieldWrapper };
};

const createFieldset = (fd) => {
  const field = document.createElement('fieldset');
  setCommonAttributes(field, fd);

  if (fd.Label) {
    const legend = document.createElement('legend');
    legend.textContent = fd.Label;
    field.append(legend);
  }

  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(field);

  return { field, fieldWrapper };
};

const createToggle = (fd) => {
  const { field, fieldWrapper } = createInput(fd);
  field.type = 'checkbox';
  if (!field.value) field.value = 'on';
  field.classList.add('toggle');
  fieldWrapper.classList.add('selection-wrapper');

  const toggleSwitch = document.createElement('div');
  toggleSwitch.classList.add('switch');
  toggleSwitch.append(field);
  fieldWrapper.append(toggleSwitch);

  const slider = document.createElement('span');
  slider.classList.add('slider');
  toggleSwitch.append(slider);
  slider.addEventListener('click', () => {
    field.checked = !field.checked;
  });

  return { field, fieldWrapper };
};

const createCheckbox = (fd) => {
  const { field, fieldWrapper } = createInput(fd);
  if (!field.value) field.value = 'checked';
  fieldWrapper.classList.add('selection-wrapper');

  return { field, fieldWrapper };
};

const createRadio = (fd) => {
  const { field, fieldWrapper } = createInput(fd);
  if (!field.value) field.value = fd.Label || 'on';
  fieldWrapper.classList.add('selection-wrapper');

  return { field, fieldWrapper };
};

const createAlert = (fd) => {
  const alert = createElement('div', { style: 'display: none' });
  const alertInnerWrapper = createElement('div');
  alert.classList.add('error-alert');
  alertInnerWrapper.classList.add('form-validation-error');
  alertInnerWrapper.setAttribute('role', 'alert');
  alertInnerWrapper.innerHTML = fd.Value || fd.Label;
  alert.append(alertInnerWrapper);
  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(alert);
  return { field: alert, fieldWrapper };
};

const createExperiencePlan = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.classList.add('experience-plan-wrapper');

  // Add label if provided
  if (fd.Label) {
    const label = createLabel(fd);
    fieldWrapper.append(label);
  }

  // Create container for tiles
  const container = createElement('div', { class: 'experience-plan' });

  // Parse tile options from Options field
  let tiles = [];
  if (fd.Options) {
    try {
      // Handle if Options is already an array (from JSON)
      if (Array.isArray(fd.Options)) {
        tiles = fd.Options;
      } else {
        let optionsValue = String(fd.Options); // Ensure it's a string

        // Remove surrounding quotes if present (from Excel/CSV export)
        optionsValue = optionsValue.trim();
        if ((optionsValue.startsWith('"') && optionsValue.endsWith('"'))
            || (optionsValue.startsWith("'") && optionsValue.endsWith("'"))) {
          optionsValue = optionsValue.slice(1, -1);
          optionsValue = optionsValue.trim();
        }

        // Remove BOM and invisible characters that Excel might add
        optionsValue = optionsValue.replace(/^\uFEFF/, ''); // Remove BOM
        optionsValue = optionsValue.replace(/[\u200B-\u200D\uFEFF]/g, ''); // Remove zero-width spaces
        optionsValue = optionsValue.trim();

        // Check if it looks like JSON
        const trimmedForJson = optionsValue.trim();
        const looksLikeJson = (trimmedForJson.startsWith('[') || trimmedForJson.startsWith('{'))
                              && (trimmedForJson.endsWith(']') || trimmedForJson.endsWith('}'));

        if (looksLikeJson) {
          // Clean: Remove invalid characters right after opening bracket (common Excel issue)
          let cleaned = optionsValue;
          if (cleaned.startsWith('[') && cleaned.length > 1) {
            const charAt1 = cleaned[1];
            const charCodeAt1 = charAt1.charCodeAt(0);
            // Remove invalid characters at position 1 (causes error at position 2)
            if (!/[{"\s0-9-]/.test(charAt1)
              || (charCodeAt1 < 32 && charCodeAt1 !== 9 && charCodeAt1 !== 10 && charCodeAt1 !== 13)
              || (charCodeAt1 > 126 && charCodeAt1 < 160)) {
              cleaned = cleaned[0] + cleaned.substring(2);
            }
          }

          // Remove any remaining non-printable characters
          // eslint-disable-next-line no-control-regex
          cleaned = cleaned.replace(/[\x00-\x1F\x7F-\x9F\uFEFF\u200B-\u200D]/g, '');

          // Handle smart quotes and escaped characters
          cleaned = cleaned.replace(/[""]/g, '"').replace(/['']/g, "'");
          cleaned = cleaned.replace(/\\"/g, '"');
          cleaned = cleaned.trim();

          try {
            tiles = JSON.parse(cleaned);
          } catch (jsonError) {
            // eslint-disable-next-line no-console
            console.error('JSON parsing failed:', jsonError.message);
            tiles = [];
          }
        } else {
          // Fallback: pipe-delimited format (only if it doesn't look like JSON)
          // Replace escaped pipes with regular pipes
          optionsValue = optionsValue.replace(/\\\\\|/g, '|');
          optionsValue = optionsValue.replace(/\\\|/g, '|');
          optionsValue = optionsValue.replace(/\\|/g, '|');

          // Parse pipe-delimited format:
          // "title|desc|value|icon|class|oid|lid|hideResortClass,title2|..."
          const tileStrings = [];
          let currentTile = '';
          let pipeCount = 0;

          for (let i = 0; i < optionsValue.length; i += 1) {
            const char = optionsValue[i];
            if (char === '|') {
              pipeCount += 1;
              currentTile += char;
            } else if (char === ',') {
              // Only split on comma if we have a complete tile
              // (6 pipes = 7 parts, or 7 pipes = 8 parts with hideResortClass)
              if (pipeCount === 6 || pipeCount === 7) {
                if (currentTile.trim()) {
                  tileStrings.push(currentTile.trim());
                }
                currentTile = '';
                pipeCount = 0;
              } else {
                currentTile += char; // Comma is inside description
              }
            } else {
              currentTile += char;
            }
          }

          if (currentTile.trim()) {
            tileStrings.push(currentTile.trim());
          }

          tiles = tileStrings.map((tileStr, index) => {
            const parts = tileStr.split('|').map((p) => p.trim().replace(/^["']|["']$/g, ''));
            return {
              title: parts[0] || `Option ${index + 1}`,
              desc: parts[1] || '',
              value: parts[2] || parts[0]?.toLowerCase().replace(/\s+/g, '-') || `option-${index + 1}`,
              icon: parts[3] || '',
              class: parts[4] || `exp-${parts[2] || parts[0]?.toLowerCase().replace(/\s+/g, '-')}`,
              oid: parts[5] || '',
              lid: parts[6] || '',
              hideResortClass: parts[7] || '', // Optional: class to hide in resort-select
            };
          });
        }
      } // Close else block
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error parsing experience plan options:', e);
      tiles = [];
    }
  }

  // Create hidden radio inputs and visible tiles
  const radioInputs = [];
  tiles.forEach((tile, index) => {
    // Create hidden radio input
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = fd.Name;
    radioInput.id = `${fd.Id}-${index}`;
    radioInput.value = tile.value;
    radioInput.hidden = true;
    // Store hideResortClass if provided
    // (class to hide in resort-select when this option is selected)
    if (tile.hideResortClass) {
      radioInput.dataset.hideResortClass = tile.hideResortClass;
    }
    if (fd.Mandatory && (fd.Mandatory.toLowerCase() === 'true' || fd.Mandatory.toLowerCase() === 'x')) {
      radioInput.required = true;
    }
    // Only pre-select if Value matches this tile's value
    if (fd.Value === tile.value) {
      radioInput.checked = true;
    }
    radioInputs.push(radioInput);

    // Create tile - the entire tile acts as the radio button
    const tileDiv = createElement('div', {
      class: `experience-plan-tile ${tile.class}${radioInput.checked ? ' btn-selected' : ''}`,
      role: 'radio',
      tabindex: '0',
      'aria-checked': radioInput.checked ? 'true' : 'false',
      'data-value': tile.value,
      'data-oid': tile.oid || '',
    });

    // Add radio input as first element inside the tile
    tileDiv.append(radioInput);

    // Create icon container (just for display, not clickable separately)
    const iconContainer = createElement('div', { class: 'btn' });

    // Create icon if provided
    if (tile.icon) {
      // Use the standard createIcon function from utils
      const icon = createIcon(tile.icon);
      icon.setAttribute('aria-hidden', 'true');
      iconContainer.append(icon);
    }

    // Create title
    const titleDiv = createElement('div', { class: 'title' }, tile.title);

    // Create description
    const descDiv = createElement('div', { class: 'brief-desc' }, tile.desc);

    tileDiv.append(iconContainer);
    tileDiv.append(titleDiv);
    tileDiv.append(descDiv);

    // Add click handler to entire tile
    tileDiv.addEventListener('click', (e) => {
      e.preventDefault();

      // Update radio input
      radioInput.checked = true;
      radioInput.dispatchEvent(new Event('change', { bubbles: true }));

      // Update all tiles
      container.querySelectorAll('.experience-plan-tile').forEach((tileEl) => {
        tileEl.classList.remove('btn-selected');
        tileEl.setAttribute('aria-checked', 'false');
      });

      // Update clicked tile
      tileDiv.classList.add('btn-selected');
      tileDiv.setAttribute('aria-checked', 'true');

      // Remove error state
      removeErrorFromField(radioInput);
    });

    // Add keyboard support
    tileDiv.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tileDiv.click();
      }
    });

    container.append(tileDiv);
  });

  fieldWrapper.append(container);

  // Return the first radio input as the field for validation purposes
  return { field: radioInputs[0] || null, fieldWrapper };
};

const createResortSelect = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.classList.add('location-interest-div');

  if (fd.Label) {
    const label = createLabel(fd);
    fieldWrapper.append(label);
  }

  const container = createElement('div', { class: 'special-events-thumbnails' });
  let resorts = [];

  if (fd.Options) {
    try {
      let optionsValue = String(fd.Options).trim();

      // Remove surrounding quotes if present (from Excel/CSV export)
      if ((optionsValue.startsWith('"') && optionsValue.endsWith('"'))
          || (optionsValue.startsWith("'") && optionsValue.endsWith("'"))) {
        optionsValue = optionsValue.slice(1, -1).trim();
      }

      // Remove BOM and invisible characters
      optionsValue = optionsValue.replace(/^\uFEFF/, '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();

      // Try JSON parsing first
      const looksLikeJson = (optionsValue.startsWith('[') || optionsValue.startsWith('{'))
                            && (optionsValue.endsWith(']') || optionsValue.endsWith('}'));

      if (looksLikeJson) {
        // Clean: Remove invalid characters right after opening bracket
        let cleaned = optionsValue;
        if (cleaned.startsWith('[') && cleaned.length > 1) {
          const charAt1 = cleaned[1];
          const charCodeAt1 = charAt1.charCodeAt(0);
          if (!/[{"\s0-9-]/.test(charAt1)
            || (charCodeAt1 < 32 && charCodeAt1 !== 9 && charCodeAt1 !== 10 && charCodeAt1 !== 13)
            || (charCodeAt1 > 126 && charCodeAt1 < 160)) {
            cleaned = cleaned[0] + cleaned.substring(2);
          }
        }
        cleaned = cleaned.trim();

        try {
          resorts = JSON.parse(cleaned);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('JSON parsing failed:', e.message);
          // eslint-disable-next-line no-console
          console.error('Cleaned value:', cleaned);
          resorts = [];
        }
      } else {
        // Fallback: pipe-delimited format
        // Format: "title|imageUrl|value|class|dataId|dataOid|icon|type,title2|..."
        optionsValue = optionsValue.replace(/\\\\\|/g, '|')
          .replace(/\\\|/g, '|')
          .replace(/\\|/g, '|');

        const resortStrings = [];
        let currentResort = '';
        let pipeCount = 0;

        for (let i = 0; i < optionsValue.length; i += 1) {
          const char = optionsValue[i];
          if (char === '|') {
            pipeCount += 1;
            currentResort += char;
          } else if (char === ',') {
            // Only split on comma if we have a complete resort
            // (7 pipes = 8 parts, or 6 pipes = 7 parts if no type)
            if (pipeCount === 7 || pipeCount === 6) {
              if (currentResort.trim()) {
                resortStrings.push(currentResort.trim());
              }
              currentResort = '';
              pipeCount = 0;
            } else {
              currentResort += char;
            }
          } else {
            currentResort += char;
          }
        }

        if (currentResort.trim()) {
          resortStrings.push(currentResort.trim());
        }

        resorts = resortStrings.map((resortStr, index) => {
          const parts = resortStr.split('|').map((p) => p.trim().replace(/^["']|["']$/g, ''));
          return {
            title: parts[0] || `Resort ${index + 1}`,
            imageUrl: parts[1] || '',
            value: parts[2] || parts[0]?.toLowerCase().replace(/\s+/g, '-') || `resort-${index + 1}`,
            class: parts[3] || `loc-${parts[2] || parts[0]?.toLowerCase().replace(/\s+/g, '-')}`,
            dataId: parts[4] || '',
            dataOid: parts[5] || '',
            icon: parts[6] || 'dining-plan-accepted',
            type: parts[7] || '', // Optional type field
          };
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error parsing resort select options:', e);
      resorts = [];
    }
  }

  // Create hidden radio inputs and visible resort thumbnails
  const radioInputs = [];
  resorts.forEach((resort, index) => {
    // Create hidden radio input
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = fd.Name;
    radioInput.id = `${fd.Id}-${index}`;
    radioInput.value = resort.value;
    radioInput.hidden = true;
    if (fd.Mandatory && (fd.Mandatory.toLowerCase() === 'true' || fd.Mandatory.toLowerCase() === 'x')) {
      radioInput.required = true;
    }
    if (fd.Value === resort.value) {
      radioInput.checked = true;
    }
    radioInputs.push(radioInput);

    // Create resort thumbnail container
    const thumbnailDiv = createElement('div', {
      class: 'resort-thumbnail',
    });

    // Create check icon
    const checkIcon = createIcon(resort.icon);
    checkIcon.setAttribute('role', 'img');
    checkIcon.setAttribute('aria-label', 'icon check');
    checkIcon.setAttribute('aria-pressed', radioInput.checked ? 'true' : 'false');
    if (radioInput.checked) {
      checkIcon.classList.add('selected');
    }
    thumbnailDiv.append(checkIcon);

    // Create anchor/link element
    const linkAttributes = {
      type: 'button',
      class: resort.class,
      href: '#',
      title: resort.title,
      'data-id': resort.dataId,
      'data-value': resort.value,
      'aria-pressed': radioInput.checked ? 'true' : 'false',
    };

    // Add data-type attribute if type is provided in JSON
    if (resort.type) {
      linkAttributes['data-type'] = resort.type;
    }

    const link = createElement('a', linkAttributes);

    // Create image if URL provided
    if (resort.imageUrl) {
      const img = createElement('img', {
        src: resort.imageUrl,
        alt: resort.title,
        title: resort.title,
        'data-oid': resort.dataOid,
      });
      link.append(img);
    }

    // Create offscreen text for accessibility
    const offscreenText = createElement('span', { class: 'offscreen' }, resort.title);
    link.append(offscreenText);

    // Create resort title
    const titleDiv = createElement('div', {
      class: 'resort-title',
      'aria-pressed': radioInput.checked ? 'true' : 'false',
    }, resort.title);
    if (radioInput.checked) {
      titleDiv.classList.add('selected');
    }
    link.append(titleDiv);

    thumbnailDiv.append(link);

    // Set initial selected state on thumbnail container
    if (radioInput.checked) {
      thumbnailDiv.classList.add('selected');
    }

    container.append(thumbnailDiv);

    // Add click handler
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Update radio input
      radioInput.checked = true;
      radioInput.dispatchEvent(new Event('change', { bubbles: true }));

      // Update all thumbnails
      container.querySelectorAll('.resort-thumbnail').forEach((thumb) => {
        const thumbLink = thumb.querySelector('a');
        const thumbCheckIcon = thumb.querySelector('i');
        const thumbTitle = thumb.querySelector('.resort-title');
        thumbLink.setAttribute('aria-pressed', 'false');
        thumbCheckIcon.setAttribute('aria-pressed', 'false');
        thumbCheckIcon.classList.remove('selected');
        if (thumbTitle) {
          thumbTitle.setAttribute('aria-pressed', 'false');
          thumbTitle.classList.remove('selected');
        }
        thumb.classList.remove('selected');
      });

      // Update clicked thumbnail
      link.setAttribute('aria-pressed', 'true');
      checkIcon.setAttribute('aria-pressed', 'true');
      checkIcon.classList.add('selected');
      titleDiv.setAttribute('aria-pressed', 'true');
      titleDiv.classList.add('selected');
      thumbnailDiv.classList.add('selected');

      // Remove error state
      removeErrorFromField(radioInput);
    });

    // Add keyboard support
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });

  // Add hidden input for form submission (if needed)
  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = `${fd.Name}Hidden`;
  hiddenInput.id = `${fd.Id}Hidden`;
  hiddenInput.value = '';
  if (fd.Mandatory && (fd.Mandatory.toLowerCase() === 'true' || fd.Mandatory.toLowerCase() === 'x')) {
    hiddenInput.setAttribute('data-errorvalidate', 'required');
  }
  hiddenInput.setAttribute('data-formtype', 'hidden');
  hiddenInput.className = 'formElement required captionTxt input-lg';
  hiddenInput.setAttribute('tabindex', '0');

  // Update hidden input when radio changes
  radioInputs.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        hiddenInput.value = radio.value;
      }
    });
  });

  fieldWrapper.append(container);

  // Create wrapper for hidden input
  const hiddenWrapper = createElement('dt', { id: `${fd.Id}Hidden-label` }, '\u00A0');
  const hiddenDd = createElement('dd', { id: `${fd.Id}Hidden-element` });
  hiddenDd.append(hiddenInput);
  fieldWrapper.append(hiddenWrapper);
  fieldWrapper.append(hiddenDd);

  return { field: radioInputs[0] || null, fieldWrapper };
};

const FIELD_CREATOR_FUNCTIONS = {
  select: createSelect,
  heading: createHeading,
  plaintext: createPlaintext,
  'text-area': createTextArea,
  textarea: createTextArea,
  toggle: createToggle,
  submit: createSubmit,
  confirmation: createConfirmation,
  fieldset: createFieldset,
  checkbox: createCheckbox,
  radio: createRadio,
  alert: createAlert,
  file: createFileInput,
  'experience-plan': createExperiencePlan,
  'tile-select': createExperiencePlan,
  'resort-select': createResortSelect,
  'location-select': createResortSelect,
};

export default async function createField(fd, form) {
  fd.Id = fd.Id || generateFieldId(fd);
  const type = fd.Type.toLowerCase();
  const createFieldFunc = FIELD_CREATOR_FUNCTIONS[type] || createInput;
  const fieldElements = await createFieldFunc(fd, form);

  // Skip field handling for confirmation type (it doesn't have a field element)
  if (type === 'confirmation') {
    return fieldElements.fieldWrapper || null;
  }

  // Store field references that persist to thank you page when Style includes "persisteddfields"
  if (fd.Style && fd.Style.toLowerCase().includes('persisteddfields')) {
    const { field } = fieldElements;
    if (field && field.name) {
      window.formPersistedFields[field.name] = field;
    }
  }

  // Create error message element if ErrorMessage exists
  // Also create it if InputTypeErrorMessage exists (for regex validation)
  if (fd.ErrorMessage || fd.InputTypeErrorMessage) {
    const errorMessage = createErrorMessage(fd);
    fieldElements.fieldWrapper.prepend(errorMessage);
    // Store ErrorMessage on the field for easy access
    if (fd.ErrorMessage && fieldElements.field) {
      fieldElements.field.setAttribute('data-error-message', fd.ErrorMessage);
    }
  }
  if (type === 'submit') {
    if (fd.Success) form.dataset.success = new URL(fd.Success).pathname;
    if (fd.Failure) form.dataset.failure = new URL(fd.Failure).pathname;
    if (fd.Callback) form.dataset.callback = fd.Callback;
    if (fd.ErrorMessage) form.dataset.errorMessage = fd.ErrorMessage;
  }

  // show/hide fields based on conditional logic
  if (fd.Conditional && fd.Conditional !== '') {
    // Check if this is a complex conditional with || (OR) or && (AND)
    const isComplexConditional = fd.Conditional.includes('||') || fd.Conditional.includes('&&');

    if (isComplexConditional) {
      // Complex conditional: just store it, evaluation will be handled in form.js
      // For complex conditionals, hide by default (will be shown if condition matches)
      fieldElements.fieldWrapper.setAttribute('hidden', '');
      fieldElements.fieldWrapper.hidden = true;
      fieldElements.fieldWrapper.style.display = 'none';
      fieldElements.fieldWrapper.dataset.conditional = fd.Conditional;
    } else {
      // Simple conditional - parse as before
      const conditionalArr = fd.Conditional.split(',');
      if (conditionalArr.length === 2) {
        // Check if second part contains except condition
        const secondPart = conditionalArr[1].trim();

        // Extract [except=...] pattern
        const exceptMatch = secondPart.match(/\[except=([^\]]+)\]/);

        if (exceptMatch) {
          // Parse except condition: [except=US~CA] - use ~ as separator
          const exceptContent = exceptMatch[1];
          const exceptValues = exceptContent.split('~').map((v) => v.trim());

          // Set hidden with both attribute and style to ensure it's hidden
          fieldElements.fieldWrapper.setAttribute('hidden', '');
          fieldElements.fieldWrapper.hidden = true;
          // Force display none to ensure it's hidden
          fieldElements.fieldWrapper.style.display = 'none';

          fieldElements.fieldWrapper.dataset.conditional = fd.Conditional;
          fieldElements.fieldWrapper.dataset.conditionalType = 'except';
          fieldElements.fieldWrapper.dataset.exceptValues = exceptValues.join('~');

          // Verify the conditional was set (for debugging)
          if (!fieldElements.fieldWrapper.dataset.conditional) {
            // eslint-disable-next-line no-console
            console.warn('Conditional not set on field wrapper:', fd.Name, fd.Conditional);
          }
        } else {
          // this is for simple cases like checking the value of another field
          fieldElements.fieldWrapper.hidden = true;
          fieldElements.fieldWrapper.dataset.conditional = fd.Conditional;
        }
      } else if (conditionalArr.length === 3) {
        // if the third value is default, show the field by default
        if (conditionalArr[2].trim().toLowerCase() === 'default') {
          fieldElements.fieldWrapper.hidden = false;
          fieldElements.fieldWrapper.dataset.conditional = fd.Conditional;
        }
      } else {
        // eslint-disable-next-line no-console
        console.warn('Conditional logic is not formatted correctly');
      }
    }
  }

  // Add error handling and validation handling
  const inputField = fieldElements.field;
  if (!inputField) {
    return fieldElements.fieldWrapper;
  }

  // Add email confirmation validation
  // Check if this is an emailconfirm field or email field
  const fieldNameLower = inputField.name ? inputField.name.toLowerCase() : '';
  const isEmailConfirm = fieldNameLower === 'emailconfirm';
  const isEmail = (fieldNameLower === 'email' || inputField.type === 'email') && !isEmailConfirm;

  if (isEmailConfirm || isEmail) {
    // Cache DOM references once instead of querying on every event
    const emailConfirmField = form.querySelector('input[name="emailconfirm"]');
    const emailField = form.querySelector('input[name="email"]');

    if (emailConfirmField && emailField) {
      // Cache wrapper and error elements once
      const emailConfirmWrapper = emailConfirmField.closest('.field-wrapper');
      const emailConfirmErrorAlert = emailConfirmWrapper?.querySelector('.error-alert');
      const emailConfirmErrorMessage = emailConfirmErrorAlert?.querySelector('.form-validation-error');
      const emailConfirmErrorMessageText = emailConfirmField.getAttribute('data-error-message')
                                          || emailConfirmErrorMessage?.textContent
                                          || 'Email addresses do not match';

      // Optimized visibility check - avoid getComputedStyle if possible
      const isWrapperVisible = () => {
        if (!emailConfirmWrapper) return false;
        if (emailConfirmWrapper.hasAttribute('hidden') || emailConfirmWrapper.hidden) return false;
        if (emailConfirmWrapper.style.display === 'none') return false;
        // Only use getComputedStyle as last resort
        return window.getComputedStyle(emailConfirmWrapper).display !== 'none';
      };

      const validateEmailMatch = () => {
        if (!isWrapperVisible()) return;

        const emailValue = emailField.value.trim();
        const emailConfirmValue = emailConfirmField.value.trim();

        // Only validate if both fields have values
        if (emailValue !== '' && emailConfirmValue !== '') {
          if (emailValue !== emailConfirmValue) {
            // Emails don't match - set custom validity
            emailConfirmField.setCustomValidity(emailConfirmErrorMessageText);

            // Show error message immediately
            if (emailConfirmErrorAlert) {
              if (emailConfirmErrorMessage) {
                emailConfirmErrorMessage.textContent = emailConfirmErrorMessageText;
              }
              emailConfirmErrorAlert.style.display = 'block';
              emailConfirmField.classList.add('error');
              emailConfirmField.setAttribute('aria-invalid', 'true');
              emailConfirmField.setAttribute('aria-describedby', emailConfirmErrorMessage?.id || '');
            }
          } else {
            // Emails match - clear error
            emailConfirmField.setCustomValidity('');
            removeErrorFromField(emailConfirmField);
          }
        } else if (
          emailConfirmField.validationMessage
          && emailConfirmField.validationMessage.includes('match')
        ) {
          // One or both fields are empty - clear mismatch error
          // (let required validation handle empty fields)
          emailConfirmField.setCustomValidity('');
          removeErrorFromField(emailConfirmField);
        }
      };

      // Use debouncing for input events to reduce validation calls
      let inputTimeout;
      const debouncedValidate = () => {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(validateEmailMatch, 150);
      };

      // Validate on input (debounced), change, and blur events
      inputField.addEventListener('input', debouncedValidate);
      inputField.addEventListener('change', validateEmailMatch);
      inputField.addEventListener('blur', validateEmailMatch);

      // Also validate the other field when it changes
      const otherField = isEmailConfirm ? emailField : emailConfirmField;
      if (otherField) {
        otherField.addEventListener('input', debouncedValidate);
        otherField.addEventListener('change', validateEmailMatch);
      }
    }
  }

  inputField.addEventListener('invalid', (e) => {
    e.preventDefault();
    form.querySelector('.error-alert')?.setAttribute('style', 'display: block');
    const errorAlert = fieldElements.fieldWrapper?.querySelector('.error-alert');
    if (errorAlert) {
      errorAlert.setAttribute('style', 'display: block');
      // Update error message content with the field's validation message
      // This ensures regex validation errors (InputTypeErrorMessage) are displayed
      const errorMessageElement = errorAlert.querySelector('.form-validation-error');
      if (errorMessageElement && inputField.validationMessage) {
        errorMessageElement.textContent = inputField.validationMessage;
      }
    }
    // Always update error state, even if already has error class
    // This ensures the error message is updated if validation changes
    inputField.classList.add('error');
    inputField.setAttribute('aria-invalid', true);
    inputField.setAttribute('aria-describedby', errorAlert?.querySelector('.form-validation-error')?.id || '');
  });

  if (form.dataset.error && !form.parentElement.querySelector('#formErrorMessage')) {
    form.insertAdjacentElement('beforebegin', form.dataset.errorMessage);
  }
  // Remove error from field when radio or checkbox is changed
  if (inputField.type === 'radio') {
    inputField.addEventListener('change', () => {
      removeErrorFromField(inputField, form);
    });
  } else if (inputField.type !== undefined) {
    inputField.addEventListener('input', () => {
      removeErrorFromField(inputField, form);
      if (inputField.type === 'checkbox' && fd.Mandatory === 'atleast-one') {
        const fieldSet = inputField.closest('fieldset');
        const checkboxes = fieldSet.querySelectorAll('.checkbox');
        if (checkboxes.length) {
          checkboxes.forEach((checkbox) => {
            if (fieldSet.querySelector('.checkbox:checked')) {
              if (!checkbox.checked) {
                checkbox.removeAttribute('required');
                removeErrorFromField(checkbox, form);
              }
            } else {
              checkbox.setAttribute('required', '');
            }
          });
        }
      }
    });
  }
  return fieldElements.fieldWrapper;
}

export function getPersistedFieldValues() {
  const persistedData = {};
  Object.keys(window.formPersistedFields || {}).forEach((fieldName) => {
    const field = window.formPersistedFields[fieldName];
    if (field && field.name) {
      if (field.type === 'radio' || field.type === 'checkbox') {
        if (field.checked) {
          persistedData[field.name] = field.value;
        }
      } else {
        persistedData[field.name] = field.value;
      }
    }
  });
  return persistedData;
}
