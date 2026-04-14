/* eslint-disable no-unused-vars */
import createField, { getPersistedFieldValues } from './form-fields.js';
import { openModal } from '../modal/modal.js';

// register callback functions here
window.callbacks = {
  // contactUs: async (form, response) => {
  // },
  // whyIRun: async (form, response) => {
  // },
  // emailSignup: async (form, response) => {
  // },
};

// register preprocessor functions here. Triggered before form submission
window.formPreProcessor = {
  // contactUs: async (form) => {
  // },
  // whyIRun: async (form) => {
  // },
  // emailSignup: async (form) => {
  // },
};

// register preprocessor functions here. Triggered on form load.
window.onFormLoad = {
  // contactUs: async (form) => {
  // },
  // whyIRun: async (form) => {
  // },
  // emailSignup: async (form) => {
  // },
};

// register preprocessor functions here. Triggered on form submit button click.
window.formSubmit = {
  // contactUs: async (form) => {
  // },
  // whyIRun: async (form) => {
  // },
  // emailSignup: async (form) => {
  // },
};

window.formError = {
  // contactUs: async (error) => {
  // },
  // whyIRun: async (error) => {
  // },
  // emailSignup: async (error) => {
  // },
};

function sanitize(value) {
  if (value !== null) {
    const allowlistPattern = /[A-Za-z0-9@\-\\+_.\s]+/;
    const result = value.match(allowlistPattern);
    if (result) return result[0];
  }
  return null;
}

async function createForm(formHref, submitHref) {
  // Clear persisted fields object for new form
  if (window.formPersistedFields) {
    window.formPersistedFields = {};
  }

  const { pathname } = new URL(formHref);
  const resp = await fetch(pathname);
  const json = await resp.json();

  const form = document.createElement('form');
  form.dataset.action = submitHref;

  // Add aria-label from h1 text + " form" (remove special characters)
  const h1 = document.querySelector('h1');
  if (h1) {
    let h1Text = h1.textContent.trim();
    // Remove special characters (keep only alphanumeric, spaces, and basic punctuation)
    h1Text = h1Text.replace(/[^\w\s-]/g, '').trim();
    form.setAttribute('aria-label', `${h1Text}`);
  }

  // set form error message if there is one
  json.data.forEach((fd) => {
    if (fd.Type.toLowerCase() === 'submit') {
      form.dataset.errorMessage = fd.Error;
    }
  });
  const fields = await Promise.all(json.data.map((fd) => createField(fd, form)));
  fields.forEach((field) => {
    if (field) {
      form.append(field);
    }
  });

  // group fields into fieldsets
  const fieldsets = form.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    const required = fieldset.hasAttribute('required');
    form.querySelectorAll(`[data-fieldset="${fieldset.name}"`).forEach((field) => {
      fieldset.append(field);
      if (required) {
        const input = field.querySelector('input, select, textarea');
        input.setAttribute('aria-required', 'true');
      }
      if (field.getAttribute('type') === 'checkbox' || field.getAttribute('type') === 'radio') {
        if (!fieldset.classList.contains('checkbox-group')) fieldset.classList.add('checkbox-group');
      }
    });
  });

  // Handle experience-plan change: hide resort thumbnails based on hideResortClass
  const experiencePlanInputs = form.querySelectorAll('.experience-plan-wrapper input[type="radio"]');

  experiencePlanInputs.forEach((radioInput) => {
    const { hideResortClass } = radioInput.dataset;

    radioInput.addEventListener('change', () => {
      // First, show all resort thumbnails that were previously hidden
      const resortSelectContainers = form.querySelectorAll('.location-interest-div .special-events-thumbnails');
      resortSelectContainers.forEach((container) => {
        const allThumbnails = container.querySelectorAll('.resort-thumbnail');
        allThumbnails.forEach((thumb) => {
          thumb.hidden = false;
        });
      });

      // Then, hide the resort thumbnail(s) for the currently selected option
      if (radioInput.checked && hideResortClass) {
        const classesToHide = hideResortClass.split(',').map((c) => c.trim()).filter((c) => c);
        resortSelectContainers.forEach((container) => {
          classesToHide.forEach((classToHide) => {
            // Find resort thumbnail by the class on the link/button
            const thumbnailLink = container.querySelector(`.resort-thumbnail a.${classToHide}`);
            if (thumbnailLink) {
              const thumbnailDiv = thumbnailLink.closest('.resort-thumbnail');
              if (thumbnailDiv) {
                thumbnailDiv.hidden = true;
              }
            }
          });
        });
      }
    });

    // Check initial state on page load
    if (radioInput.checked && hideResortClass) {
      const classesToHide = hideResortClass.split(',').map((c) => c.trim()).filter((c) => c);
      const resortSelectContainers = form.querySelectorAll('.location-interest-div .special-events-thumbnails');
      resortSelectContainers.forEach((container) => {
        classesToHide.forEach((classToHide) => {
          const thumbnailLink = container.querySelector(`.resort-thumbnail a.${classToHide}`);
          if (thumbnailLink) {
            const thumbnailDiv = thumbnailLink.closest('.resort-thumbnail');
            if (thumbnailDiv) {
              thumbnailDiv.hidden = true;
            }
          }
        });
      });
    }
  });

  // Helper function to get field value (reusable)
  const getFieldValueForCondition = (fieldName, formElement) => {
    const fieldElements = formElement.querySelectorAll(`input[name="${fieldName}"], select[name="${fieldName}"], textarea[name="${fieldName}"]`);
    if (fieldElements.length === 0) return '';

    const field = fieldElements[0];
    let value = '';

    if (field.tagName === 'SELECT') {
      const selectValue = field.value;
      if (!selectValue || selectValue.trim() === '') {
        value = '';
      } else {
        value = selectValue.trim();
      }
      if (field.selectedIndex === 0 && field.options.length > 0) {
        const firstOption = field.options[0];
        if (firstOption.disabled || !firstOption.value || firstOption.value.trim() === '') {
          value = '';
        }
      }
    } else if (field.type === 'radio') {
      const checkedRadio = formElement.querySelector(`input[name="${fieldName}"]:checked`);
      if (checkedRadio) {
        value = checkedRadio.value || '';
      } else {
        value = '';
      }
    } else {
      value = field.value || '';
    }

    return value.trim();
  };

  // Helper function to evaluate a single condition string
  const evaluateSingleConditionString = (conditionStr, formElement) => {
    const trimmed = conditionStr.trim();

    // Handle parentheses for AND conditions: (field1,val1&&field2,val2)
    if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
      const innerCondition = trimmed.slice(1, -1);
      const andConditions = innerCondition.split('&&').map((c) => c.trim()).filter((c) => c);

      // All AND conditions must be true
      return andConditions.every((cond) => evaluateSingleConditionString(cond, formElement));
    }

    // Handle AND conditions without outer parentheses: field1,val1&&field2,val2
    if (trimmed.includes('&&')) {
      const andConditions = trimmed.split('&&').map((c) => c.trim()).filter((c) => c);
      return andConditions.every((cond) => evaluateSingleConditionString(cond, formElement));
    }

    // Parse simple condition: fieldName,[except=val1~val2] or fieldName,expectedValue
    const parts = trimmed.split(',');
    if (parts.length < 2) return false;

    const fieldName = parts[0].trim();
    const conditionPart = parts.slice(1).join(',').trim();

    const fieldValue = getFieldValueForCondition(fieldName, formElement);
    if (fieldValue === '') return false;

    // Check for except condition: [except=val1~val2]
    const exceptMatch = conditionPart.match(/\[except=([^\]]+)\]/);
    if (exceptMatch) {
      const exceptValues = exceptMatch[1].split('~').map((v) => v.trim());
      return !exceptValues.includes(fieldValue);
    }

    // Regular condition: check if value matches
    const expectedValue = conditionPart.trim();
    return fieldValue === expectedValue;
  };

  // handle simple hide/show conditional logic
  const conditionalFields = form.querySelectorAll('[data-conditional]');
  conditionalFields.forEach((field) => {
    const { conditional } = field.dataset;

    // Check if this is a complex conditional with || (OR) or && (AND) logic
    const isComplexConditional = conditional.includes('||') || conditional.includes('&&');

    // Set initial hidden state for select elements
    const selects = field.querySelectorAll('select');
    selects.forEach((select) => {
      select.setAttribute('hidden', field.hidden);
    });

    // Check if this is an except condition (for simple conditionals)
    const isExceptCondition = field.dataset.conditionalType === 'except';
    const exceptValues = isExceptCondition && field.dataset.exceptValues
      ? field.dataset.exceptValues.split('~').map((v) => v.trim())
      : [];

    // Function to evaluate the condition (for simple conditionals)
    const evaluateCondition = (f, expectedValue) => {
      if (isExceptCondition) {
        // For except condition: show if value is NOT empty AND NOT in except list
        let currentValue = '';

        // Handle different field types
        if (f.tagName === 'SELECT') {
          // For select, use the value property directly (most reliable)
          // Check the actual value property
          const selectValue = f.value;

          // If value is empty string, null, undefined, or whitespace, treat as empty
          if (!selectValue || selectValue.trim() === '') {
            currentValue = '';
          } else {
            currentValue = selectValue.trim();
          }

          // Double-check: if first option is selected, verify it's actually empty
          if (f.selectedIndex === 0 && f.options.length > 0) {
            const firstOption = f.options[0];
            // If first option is disabled or has empty value, force to empty
            if (firstOption.disabled || !firstOption.value || firstOption.value.trim() === '') {
              currentValue = '';
            }
          }
        } else if (f.type === 'radio') {
          // For radio, only get value if checked
          if (f.checked) {
            currentValue = f.value || '';
          } else {
            currentValue = ''; // Not checked = empty
          }
        } else {
          // For other inputs (text, checkbox, etc.), get the value directly
          currentValue = f.value || '';
        }

        currentValue = currentValue.trim();

        // Hide if empty - explicitly return false
        if (currentValue === '' || currentValue === null || currentValue === undefined) {
          return false;
        }
        // Hide if value is in except list, show otherwise
        return !exceptValues.includes(currentValue);
      }
      // Original logic: show if value matches
      if (!expectedValue) return false; // If no value specified, hide the field
      let show = false;
      const targetValue = expectedValue.trim();
      if (f.type === 'radio') {
        show = f.value === targetValue && f.checked;
      } else if (f.type === 'checkbox') {
        show = f.value === targetValue && f.checked;
      } else {
        show = f.value === targetValue;
      }
      return show;
    };

    // Function to update field visibility
    const updateVisibility = () => {
      let show = false;

      if (isComplexConditional) {
        // Handle complex conditional with OR (||) or AND (&&) logic
        // Delegate actual evaluation (including nested AND) to evaluateSingleConditionString
        // For OR, split first so any true sub-expression will show the field
        if (conditional.includes('||')) {
          const orConditions = conditional.split('||').map((c) => c.trim()).filter((c) => c);
          show = orConditions.some(
            (conditionStr) => evaluateSingleConditionString(conditionStr, form),
          );
        } else {
          // Pure AND case (no ||) – evaluate the full expression
          show = evaluateSingleConditionString(conditional, form);
        }
      } else {
        // Simple conditional - use original logic
        const conditionalArr = conditional.split(',');
        const [fieldName, value] = conditionalArr;

        // Check if value contains except condition (in case dataset.conditionalType wasn't set)
        const valueStr = value ? value.trim() : '';
        const hasExceptInValue = valueStr.includes('[except=');
        const actualIsExceptCondition = isExceptCondition || hasExceptInValue;

        // Extract except values if present in value string
        let actualExceptValues = exceptValues;
        if (hasExceptInValue) {
          const exceptMatch = valueStr.match(/\[except=([^\]]+)\]/);
          if (exceptMatch) {
            // Use values from value string if dataset values are empty,
            // otherwise use dataset values
            if (actualExceptValues.length === 0) {
              actualExceptValues = exceptMatch[1].split('~').map((v) => v.trim()).filter((v) => v);
            }
          }
        }

        const targetFields = form.querySelectorAll(`input[name="${fieldName.trim()}"], select[name="${fieldName.trim()}"], textarea[name="${fieldName.trim()}"]`);

        if (targetFields.length === 0) {
          // No target fields found - keep hidden for except conditions
          if (actualIsExceptCondition) {
            field.setAttribute('hidden', '');
            field.hidden = true;
            field.style.display = 'none';
          }
          return;
        }

        // For radio buttons, check all with the same name
        if (targetFields[0].type === 'radio') {
          // Re-query to get the currently checked radio (in case it changed)
          const checkedRadio = form.querySelector(`input[name="${fieldName.trim()}"]:checked`);
          if (checkedRadio) {
            // Use actualIsExceptCondition and actualExceptValues
            if (actualIsExceptCondition) {
              const currentValue = checkedRadio.value ? checkedRadio.value.trim() : '';
              if (currentValue === '') {
                show = false;
              } else {
                show = !actualExceptValues.includes(currentValue);
              }
            } else {
              show = evaluateCondition(checkedRadio, value);
            }
          } else {
            // No radio selected - treat as empty
            show = false; // Always hide if empty for except condition
          }
        } else {
          // For other field types (select, text, etc.), check the first one
          const firstField = targetFields[0];
          if (firstField) {
            try {
              // For select fields, double-check the value directly
              if (firstField.tagName === 'SELECT' && actualIsExceptCondition) {
                const directValue = firstField.value || '';
                // If value is empty, definitely hide
                if (directValue.trim() === '') {
                  show = false;
                } else {
                  const currentValue = directValue.trim();
                  show = !actualExceptValues.includes(currentValue);
                }
              } else if (actualIsExceptCondition) {
                // Handle except condition for non-select fields
                let currentValue = '';
                if (firstField.type === 'radio') {
                  if (firstField.checked) {
                    currentValue = firstField.value || '';
                  } else {
                    currentValue = '';
                  }
                } else {
                  currentValue = firstField.value || '';
                }
                currentValue = currentValue.trim();
                if (currentValue === '') {
                  show = false;
                } else {
                  show = !actualExceptValues.includes(currentValue);
                }
              } else {
                show = evaluateCondition(firstField, value);
              }
            } catch (e) {
              // If evaluation fails, keep hidden for except conditions
              show = false;
            }
          } else {
            // Field not found - keep hidden
            show = false;
          }
        }
      }

      // For except conditions, ensure we only show if value is explicitly valid
      if (isExceptCondition && !show && !isComplexConditional) {
        // Double-check: if we're hiding, make sure it's really hidden
        field.setAttribute('hidden', '');
        field.hidden = true;
        field.style.display = 'none';
      }

      // Set hidden attribute explicitly (field is the fieldWrapper)
      if (show) {
        field.removeAttribute('hidden');
        field.hidden = false;
        field.style.display = '';
        field.style.setProperty('display', '', 'important');
      } else {
        field.setAttribute('hidden', '');
        field.hidden = true;
        // Force display none to ensure it's hidden
        field.style.display = 'none';
      }

      // Set hidden attribute on select elements
      selects.forEach((select) => {
        if (show) {
          select.removeAttribute('hidden');
        } else {
          select.setAttribute('hidden', '');
        }
      });

      // Clear default values when field is hidden
      if (!show) {
        const inputs = field.querySelectorAll('input, textarea, select');
        inputs.forEach((input) => {
          // For radio & checkbox inputs, clear checked state
          if (input.type === 'radio' || input.type === 'checkbox') {
            input.checked = false;
          } else if (input.tagName === 'SELECT') {
            // For select fields, reset to placeholder (index 0) instead of first real option
            if (input.options && input.options.length > 0) {
              input.selectedIndex = 0;
            }
          }
        });
      }
    };

    // For except conditions, ensure field is hidden initially (unless it is complex)
    if (isExceptCondition && !isComplexConditional) {
      field.setAttribute('hidden', '');
      field.hidden = true;
      field.style.display = 'none';
    }

    // For complex conditionals, hide initially (will be shown if condition matches)
    if (isComplexConditional) {
      field.setAttribute('hidden', '');
      field.hidden = true;
      field.style.display = 'none';
    }

    // Set initial state - run immediately and also after a short delay
    // to catch async field creation
    updateVisibility();

    // Also run after a delay to ensure all fields are fully initialized
    setTimeout(() => {
      updateVisibility();
    }, 100);

    // Run one more time after a longer delay to catch any late field initialization
    setTimeout(() => {
      updateVisibility();
    }, 500);

    // Add event listeners
    if (isComplexConditional) {
      // For complex conditionals, collect all field names that need monitoring
      const fieldsToMonitor = new Set();

      // Helper to extract field names from a single condition string
      const extractFieldNames = (conditionStr) => {
        const trimmed = conditionStr.trim();

        // Strip outer parentheses, if present
        let inner = trimmed;
        if (inner.startsWith('(') && inner.endsWith(')')) {
          inner = inner.slice(1, -1).trim();
        }

        // If this inner string still contains &&, split and recurse
        if (inner.includes('&&')) {
          inner.split('&&').map((c) => c.trim()).filter((c) => c).forEach(extractFieldNames);
          return;
        }

        // Base case: simple "fieldName,condition" string
        const fieldName = inner.split(',')[0]?.trim();
        if (fieldName) fieldsToMonitor.add(fieldName);
      };

      if (conditional.includes('||')) {
        conditional.split('||').map((c) => c.trim()).filter((c) => c).forEach(extractFieldNames);
      } else if (conditional.includes('&&')) {
        conditional.split('&&').map((c) => c.trim()).filter((c) => c).forEach(extractFieldNames);
      } else {
        // Fallback: treat whole conditional as a single simple expression
        extractFieldNames(conditional);
      }

      // Attach listeners to all fields that need monitoring
      fieldsToMonitor.forEach((fieldName) => {
        const fieldElements = form.querySelectorAll(`input[name="${fieldName}"], select[name="${fieldName}"], textarea[name="${fieldName}"]`);
        fieldElements.forEach((f) => {
          f.addEventListener('input', updateVisibility);
          f.addEventListener('change', updateVisibility);
        });
      });
    } else {
      // Simple conditional - use original logic
      const conditionalArr = conditional.split(',');
      const [fieldName] = conditionalArr;
      const fieldNameTrimmed = fieldName.trim();
      const targetFields = form.querySelectorAll(`input[name="${fieldNameTrimmed}"], select[name="${fieldNameTrimmed}"], textarea[name="${fieldNameTrimmed}"]`);

      // For radio buttons, ensure we attach to ALL radio buttons with that name
      if (targetFields.length > 0 && targetFields[0].type === 'radio') {
        // Re-query to make sure we get all radio buttons (in case they're added dynamically)
        const allRadioButtons = form.querySelectorAll(`input[name="${fieldNameTrimmed}"][type="radio"]`);
        allRadioButtons.forEach((radio) => {
          radio.addEventListener('change', updateVisibility);
        });
      } else {
        [...targetFields].forEach((f) => {
          f.addEventListener('input', updateVisibility);
          f.addEventListener('change', updateVisibility);
        });
      }
    }
  });

  // Final verification: ensure all except condition fields are properly hidden if country is empty
  // This catches any fields that might have been missed
  setTimeout(() => {
    const allConditionalFields = form.querySelectorAll('[data-conditional-type="except"]');
    allConditionalFields.forEach((field) => {
      const { conditional } = field.dataset;
      if (conditional) {
        const conditionalArr = conditional.split(',');
        const fieldName = conditionalArr[0]?.trim();
        if (fieldName) {
          const targetFields = form.querySelectorAll(`input[name="${fieldName}"], select[name="${fieldName}"], textarea[name="${fieldName}"]`);
          if (targetFields.length > 0) {
            const firstField = targetFields[0];
            if (firstField && firstField.tagName === 'SELECT') {
              const countryValue = firstField.value || '';
              if (countryValue.trim() === '') {
                // Country is empty, ensure field is hidden
                field.setAttribute('hidden', '');
                field.hidden = true;
                field.style.display = 'none';
              }
            }
          }
        }
      }
    });
  }, 1000);

  return form;
}

function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    // Skip fields with hidden="true" attribute
    if (field.hasAttribute('hidden') && field.getAttribute('hidden') === 'true') {
      return;
    }

    if (field.name && field.type !== 'submit' && !field.disabled) {
      if (field.type === 'radio') {
        if (field.checked) payload[field.name] = sanitize(field.value);
      } else if (field.type === 'checkbox') {
        if (field.checked) payload[field.name] = payload[field.name] ? `${payload[field.name]},${sanitize(field.value)}` : sanitize(field.value);
      } else {
        /* eslint-disable no-lonely-if */
        if (sanitize(field.value) != null) {
          payload[field.name] = sanitize(field.value);
        }
      }
    }
  });
  return payload;
}

function generateContactPayload(form) {
  const flatPayload = generatePayload(form);

  // Format field labels for comment body
  const fieldLabels = {
    fname: 'First Name',
    lname: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    country: 'Country / Region',
    address: 'Address',
    address2: 'Address2',
    city: 'City',
    state: 'State / Province',
    pcode: 'Zip/Postal Code',
    topic: 'Topic',
    subject: 'Email Subject',
    sender_questions: 'Question(s)',
  };

  // Build comment body in specific order
  const fieldOrder = ['fname', 'lname', 'email', 'country', 'address', 'address2', 'city', 'state', 'pcode', 'phone', 'topic', 'subject'];
  let commentBody = 'Contact Information\r\n\r\n';

  fieldOrder.forEach((key) => {
    if (flatPayload[key]) {
      const label = fieldLabels[key] || key;
      commentBody += `${label}: ${flatPayload[key]}\r\n`;
    }
  });

  if (flatPayload.sender_questions) {
    commentBody += `\r\n${fieldLabels.sender_questions}:\r\n${flatPayload.sender_questions}`;
  }

  return {
    request: {
      requester: {
        name: `${flatPayload.fname || ''} ${flatPayload.lname || ''}`.trim(),
        email: flatPayload.email || '',
      },
      subject: flatPayload.subject || 'RunDisney - Contact Us',
      comment: {
        body: commentBody,
      },
      custom_fields: '',
    },
  };
}

function storePersistedFields() {
  const persistedData = getPersistedFieldValues();
  if (Object.keys(persistedData).length > 0) {
    localStorage.setItem('persistedData', JSON.stringify(persistedData));
  }
}

async function handleSubmit(form) {
  form.querySelector('.error-alert')?.setAttribute('style', 'display: none');
  if (form.getAttribute('data-submitting') === 'true') return;

  const submit = form.querySelector('button[type="submit"]');
  try {
    form.setAttribute('data-submitting', 'true');
    submit.disabled = true;

    // Run any preprocessor functions here before the form is submitted
    if (window.formPreProcessor[form.dataset.callback]) {
      await window.formPreProcessor[form.dataset.callback](form);
    }
    const formEndpoint = new URL(form.dataset.action);
    if (formEndpoint.pathname.startsWith('/modals/') || formEndpoint.pathname.startsWith('/fragments/')) {
      // Assume it is the modal endpoint
      openModal(formEndpoint.pathname, true);
      // remove loading phase
      // call the callback function if there is one
      if (form.dataset.callback) {
        await window.callbacks[form.dataset.callback](form);
      }
    } else if (formEndpoint.pathname.startsWith('/api/')) {
      // Check if URL contains /contact and format payload accordingly
      const isContactForm = window.location.pathname.includes('/contact');
      const payload = isContactForm ? generateContactPayload(form) : generatePayload(form);

      const response = await fetch(form.dataset.action, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Store persisted field values in localStorage for thank you page if status is 200 or 201
        if (response.status === 200 || response.status === 201) {
          storePersistedFields();
          // analytics event
          const section = form.closest('.section');
          const analyticsId = section?.dataset.analyticsid || '';
          if (analyticsId && window.s_wdpro && typeof window.s_wdpro.trackClick === 'function') {
            window.s_wdpro.trackClick(form, analyticsId);
            // Wait half second to get analytics event to fire
            await new Promise((resolve) => {
              setTimeout(resolve, 200);
            });
          }
          if (form.dataset.confirmation) {
            window.location.href = form.dataset.confirmation;
          }
        }
        // call the callback function if there is one
        if (form.dataset.callback) {
          await window.callbacks[form.dataset.callback](form, response);
        }
        // remove loading phase
        // reset form
        form.reset();
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    }
  } catch (e) {
    // set loading button to error state
    if (window.formError[form.dataset.callback]) {
      await window.formError[form.dataset.callback](e);
    }
  } finally {
    form.setAttribute('data-submitting', 'false');
    submit.disabled = false;
  }
}

function formValidator(form) {
  try {
    const allFields = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    const invalidFields = [];
    const processedRadioGroups = new Set(); // Track processed radio groups

    // STEP 1: FIRST validate all mandatory/required fields
    // Explicitly check each field to see if it's required and empty

    allFields.forEach((field) => {
    // Skip hidden fields and submit buttons
      if (field.type === 'submit' || field.type === 'hidden' || field.hidden) {
        return;
      }

      // Skip fields whose parent .field-wrapper is hidden
      // Optimized visibility check - avoid getComputedStyle if possible
      const fieldWrapper = field.closest('.field-wrapper');
      if (fieldWrapper) {
        if (fieldWrapper.hasAttribute('hidden') || fieldWrapper.hidden === true) {
          return;
        }
        if (fieldWrapper.style.display === 'none') {
          return;
        }
        // Only use getComputedStyle as last resort (expensive operation)
        if (window.getComputedStyle(fieldWrapper).display === 'none') {
          return;
        }
      }

      // Skip radio buttons that aren't the first in their group
      if (field.type === 'radio') {
        const radioGroup = form.querySelectorAll(`input[name="${field.name}"][type="radio"]`);
        if (field !== Array.from(radioGroup)[0]) {
          return;
        }
        // Skip if we've already processed this radio group
        if (processedRadioGroups.has(field.name)) {
          return;
        }
        processedRadioGroups.add(field.name);
      }

      // Check if field is required - check multiple ways to be thorough
      // First check the most reliable methods
      let isRequired = false;

      // Check required property (most reliable)
      if (field.required === true) {
        isRequired = true;
      } else if (field.hasAttribute('required')) {
        // Check required attribute
        isRequired = true;
        // Ensure the property is also set
        if (!field.required) {
          field.required = true;
        }
      } else if (field.getAttribute('aria-required') === 'true' || field.getAttribute('aria-required') === true) {
        // Check aria-required
        isRequired = true;
        // Set the required attribute
        if (!field.hasAttribute('required')) {
          field.setAttribute('required', '');
          field.required = true;
        }
      } else {
        // Check label data-required
        const requiredFieldWrapper = field.closest('.field-wrapper');
        const hasLabelRequired = requiredFieldWrapper?.querySelector('label[data-required]');
        if (hasLabelRequired) {
          isRequired = true;
          // Set the required attribute
          if (!field.hasAttribute('required')) {
            field.setAttribute('required', '');
            field.required = true;
          }
        }
      }

      // For required fields, explicitly check if they're empty
      if (isRequired) {
        let isEmpty = false;

        if (field.type === 'checkbox') {
          isEmpty = !field.checked;
        } else if (field.type === 'radio') {
          const radioGroup = form.querySelectorAll(`input[name="${field.name}"][type="radio"]`);
          isEmpty = !Array.from(radioGroup).some((radio) => radio.checked);
        } else if (field.tagName === 'SELECT') {
          const selectedOption = field.options[field.selectedIndex];
          isEmpty = !field.value || field.value === ''
                  || (selectedOption && (selectedOption.disabled || !selectedOption.value || selectedOption.value === ''));
        } else {
          isEmpty = !field.value || field.value.trim() === '';
        }

        // If required field is empty, mark it as invalid and add to invalidFields
        if (isEmpty) {
        // Ensure the field has the required attribute set for native validation
          if (!field.hasAttribute('required')) {
            field.setAttribute('required', '');
            field.required = true;
          }

          // For required empty fields, ALWAYS clear regex validation
          // Required validation takes priority over regex validation
          // We'll validate regex in Step 2 only if field has a value
          field.setCustomValidity('');

          // Force the field to be invalid by calling checkValidity
          // This should set validity.valid to false and validity.valueMissing to true
          field.checkValidity();

          // ALWAYS directly add to invalidFields - don't rely on checkValidity working
          // This ensures required empty fields are always collected
          let fieldToAdd = field;
          if (field.type === 'radio') {
            const radioGroup = form.querySelectorAll(`input[name="${field.name}"][type="radio"]`);
            [fieldToAdd] = Array.from(radioGroup);
          }

          // Check if already added
          if (!invalidFields.includes(fieldToAdd)) {
            isValid = false;
            invalidFields.push(fieldToAdd);
          }
        } else {
        // Field has value, validate it normally
          field.checkValidity();
        }
      } else {
      // For non-required fields, just validate normally
        field.checkValidity();
      }
    });

    // STEP 2: THEN validate regex patterns (only for fields that have values)
    try {
      const regexFields = form.querySelectorAll('input[data-regex-pattern], textarea[data-regex-pattern]');
      regexFields.forEach((field) => {
      // Skip fields whose parent .field-wrapper is hidden
      // Optimized visibility check - avoid getComputedStyle if possible
        const fieldWrapper = field.closest('.field-wrapper');
        if (fieldWrapper) {
          if (fieldWrapper.hasAttribute('hidden') || fieldWrapper.hidden === true) {
            return;
          }
          if (fieldWrapper.style.display === 'none') {
            return;
          }
          // Only use getComputedStyle as last resort (expensive operation)
          if (window.getComputedStyle(fieldWrapper).display === 'none') {
            return;
          }
        }

        const value = field.value.trim();
        const { regexPattern } = field.dataset;

        if (regexPattern) {
          try {
          // Remove leading and trailing forward slashes if present (regex delimiters)
            let pattern = regexPattern.trim();
            if (pattern.startsWith('/') && pattern.endsWith('/')) {
              pattern = pattern.slice(1, -1);
            }
            const regex = new RegExp(pattern);

            // Only validate regex if field has a value (required validation already handled above)
            if (value !== '') {
            // Validate against regex pattern
              if (!regex.test(value)) {
              // Use InputTypeErrorMessage for regex validation failures
                const errorMessage = field.dataset.regexErrorMessage || 'This field format is invalid';
                field.setCustomValidity(errorMessage);
                // Call checkValidity to set validation state
                field.checkValidity();
              } else {
              // Clear regex validation if it was set and value is now valid
                if (field.dataset.regexErrorMessage) {
                  const currentValidity = field.validationMessage;
                  if (currentValidity === field.dataset.regexErrorMessage) {
                    field.setCustomValidity('');
                    field.checkValidity();
                  }
                }
              }
            } else {
            // Field is empty - clear regex validation (required validation will handle it)
              if (field.dataset.regexErrorMessage) {
                const currentValidity = field.validationMessage;
                if (currentValidity === field.dataset.regexErrorMessage) {
                  field.setCustomValidity('');
                }
              }
            }
          } catch (e) {
          // Error validating regex - pattern might be invalid
          }
        }
      });
    } catch (e) {
    // Error in regex validation step
    }

    // STEP 2.5: Validate email confirmation field
    const emailConfirmField = form.querySelector('input[name="emailconfirm"]');
    const emailField = form.querySelector('input[name="email"]');

    if (emailConfirmField && emailField) {
    // Skip if emailconfirm field's parent .field-wrapper is hidden
    // Optimized visibility check - avoid getComputedStyle if possible
      const emailConfirmWrapper = emailConfirmField.closest('.field-wrapper');
      let isEmailConfirmHidden = false;
      if (emailConfirmWrapper) {
        if (emailConfirmWrapper.hasAttribute('hidden') || emailConfirmWrapper.hidden === true) {
          isEmailConfirmHidden = true;
        } else if (emailConfirmWrapper.style.display === 'none') {
          isEmailConfirmHidden = true;
        } else {
        // Only use getComputedStyle as last resort (expensive operation)
          isEmailConfirmHidden = window.getComputedStyle(emailConfirmWrapper).display === 'none';
        }
      }

      if (!isEmailConfirmHidden) {
        const emailValue = emailField.value.trim();
        const emailConfirmValue = emailConfirmField.value.trim();

        // Only validate if both fields have values
        if (emailValue !== '' && emailConfirmValue !== '') {
          if (emailValue !== emailConfirmValue) {
          // Emails don't match - set custom validity
          // Cache error message lookup
            const errorMessage = emailConfirmField.getAttribute('data-error-message')
                              || emailConfirmWrapper?.querySelector('.form-validation-error')?.textContent
                              || 'Email addresses do not match';
            emailConfirmField.setCustomValidity(errorMessage);
            emailConfirmField.checkValidity();
          } else {
          // Emails match - clear any existing error
            if (emailConfirmField.validationMessage) {
              emailConfirmField.setCustomValidity('');
              emailConfirmField.checkValidity();
            }
          }
        } else if (emailConfirmField.required && emailConfirmValue === '') {
        // If emailconfirm is required and empty, let required validation handle it
          emailConfirmField.setCustomValidity('');
          emailConfirmField.checkValidity();
        } else if (emailConfirmValue !== '' && emailValue === '') {
        // If emailconfirm has value but email is empty, clear the mismatch error
          emailConfirmField.setCustomValidity('');
          emailConfirmField.checkValidity();
        }
      }
    }

    // STEP 3: Collect all invalid fields
    // Explicitly check for required empty fields and fields with validation errors
    allFields.forEach((field) => {
    // Skip hidden fields and submit buttons
      if (field.type === 'submit' || field.type === 'hidden' || field.hidden) {
        return;
      }

      // Skip fields whose parent .field-wrapper is hidden
      // Optimized visibility check - avoid getComputedStyle if possible
      const fieldWrapper = field.closest('.field-wrapper');
      if (fieldWrapper) {
        if (fieldWrapper.hasAttribute('hidden') || fieldWrapper.hidden === true) {
          return;
        }
        if (fieldWrapper.style.display === 'none') {
          return;
        }
        // Only use getComputedStyle as last resort (expensive operation)
        if (window.getComputedStyle(fieldWrapper).display === 'none') {
          return;
        }
      }

      // Skip radio buttons that aren't the first in their group
      if (field.type === 'radio') {
        const radioGroup = form.querySelectorAll(`input[name="${field.name}"][type="radio"]`);
        if (field !== Array.from(radioGroup)[0]) {
          return;
        }

        // For radio groups, explicitly check if any is checked
        const hasChecked = Array.from(radioGroup).some((radio) => radio.checked);
        if (field.required && !hasChecked) {
          isValid = false;
          invalidFields.push(Array.from(radioGroup)[0]);
          return;
        }
      }

      // Check if field is invalid - check both validity.valid and explicitly check required fields
      let isInvalid = false;

      // First, explicitly check for required empty fields (this takes priority)
      // Use the same logic as Step 1 to detect required fields
      const isRequired = field.required
                       || field.hasAttribute('required')
                       || field.getAttribute('aria-required') === 'true'
                       || field.closest('.field-wrapper')?.querySelector('label[data-required]');

      if (isRequired) {
        let isEmpty = false;

        if (field.type === 'checkbox') {
          isEmpty = !field.checked;
        } else if (field.type === 'radio') {
          const radioGroup = form.querySelectorAll(`input[name="${field.name}"][type="radio"]`);
          isEmpty = !Array.from(radioGroup).some((radio) => radio.checked);
        } else if (field.tagName === 'SELECT') {
          const selectedOption = field.options[field.selectedIndex];
          isEmpty = !field.value || field.value === ''
                  || (selectedOption && (selectedOption.disabled || !selectedOption.value || selectedOption.value === ''));
        } else {
          isEmpty = !field.value || field.value.trim() === '';
        }

        if (isEmpty) {
          isInvalid = true;
        }
      }

      // Also check validity state (for regex errors and other validation)
      if (!isInvalid && !field.validity.valid) {
        isInvalid = true;
      }

      if (isInvalid) {
      // Check if field is already in invalidFields (from Step 1)
        const alreadyAdded = field.type === 'radio'
          ? invalidFields.includes(Array.from(form.querySelectorAll(`input[name="${field.name}"][type="radio"]`))[0])
          : invalidFields.includes(field);

        if (!alreadyAdded) {
          isValid = false;
          if (field.type === 'radio') {
            const radioGroup = form.querySelectorAll(`input[name="${field.name}"][type="radio"]`);
            invalidFields.push(Array.from(radioGroup)[0]);
          } else {
            invalidFields.push(field);
          }
        }
      }
    });

    // Now manually show errors for all invalid fields
    // We do this manually to ensure all errors are shown, not just the first one
    invalidFields.forEach((field) => {
      const fieldWrapper = field.closest('.field-wrapper');
      if (!fieldWrapper) return;

      // Get or create error alert
      let errorAlert = fieldWrapper.querySelector('.error-alert');
      if (!errorAlert) {
      // Create error alert if it doesn't exist
        errorAlert = document.createElement('div');
        errorAlert.className = 'error-alert';
        errorAlert.style.display = 'none';
        errorAlert.setAttribute('role', 'alert');

        const errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'form-validation-error';
        errorMessageElement.id = `${field.id}-error-message`;
        errorMessageElement.textContent = field.validationMessage || 'This field is required';

        errorAlert.appendChild(errorMessageElement);
        fieldWrapper.prepend(errorAlert);
      }

      // Update error message
      const errorMessageElement = errorAlert.querySelector('.form-validation-error');
      if (errorMessageElement) {
      // Use validationMessage from field (which includes InputTypeErrorMessage for regex)
      // or fall back to ErrorMessage or default
        const validationMessage = field.validationMessage || 'This field is required';
        errorMessageElement.textContent = validationMessage;
      }

      // Show the error alert
      errorAlert.setAttribute('style', 'display: block');

      // Update field error state
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
      const errorMsgId = errorAlert.querySelector('.form-validation-error')?.id;
      if (errorMsgId) {
        field.setAttribute('aria-describedby', errorMsgId);
      }
    });

    return isValid;
  } catch (e) {
    // Fallback: use native validation
    return form.reportValidity();
  }
}

function setupUSCanadaZipValidation(form) {
  const country = form.querySelector('#form-country');
  const zip = form.querySelector('#form-pcode');

  if (!country || !zip) return;

  // Strict US ZIP: 5 digits only
  const US_ZIP = /^\d{5}$/;

  // Canadian postal code: letter-digit-letter space digit-letter-digit
  const CA_ZIP = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;

  const updateRules = () => {
    zip.setCustomValidity('');

    if (country.value === 'US') {
      zip.maxLength = 5;
    } else if (country.value === 'CA') {
      zip.maxLength = 7;
    }
  };

  const validate = () => {
    const value = zip.value.trim();
    zip.setCustomValidity('');

    if (value.length === 0) {
      zip.setCustomValidity(form.dataset.errorMessage);
      return;
    }

    if (country.value === 'US' && !US_ZIP.test(value)) {
      zip.setCustomValidity(form.dataset.errorMessage);
    }

    if (country.value === 'CA' && !CA_ZIP.test(value)) {
      zip.setCustomValidity(form.dataset.errorMessage);
    }
  };

  country.addEventListener('change', () => {
    updateRules();
    validate();
  });

  zip.addEventListener('input', validate);

  updateRules(); // init
}

export default async function decorate(block) {
  const links = [...block.querySelectorAll('a')].map((a) => a.href);
  const formLink = links.find((link) => link.startsWith(window.location.origin) && link.endsWith('.json'));
  const submitLink = links.find((link) => link !== formLink);
  if (!formLink || !submitLink) return;

  const form = await createForm(formLink, submitLink);

  // Setup US/Canada ZIP validation AFTER form is created
  setupUSCanadaZipValidation(form);

  // Run any preprocessor functions here on form load
  if (window.onFormLoad[form.dataset.callback]) {
    await window.onFormLoad[form.dataset.callback](form);
  }
  block.replaceChildren(form);

  // Use event delegation on the form for button clicks to ensure it always works
  form.addEventListener('click', (e) => {
    const submitButton = e.target.closest('button[type="submit"]');
    if (submitButton) {
      e.preventDefault();
      e.stopPropagation();

      // Call formSubmit callback if exists
      (async () => {
        if (window.formSubmit[form.dataset.callback]) {
          await window.formSubmit[form.dataset.callback](form);
        }

        // Now trigger validation and submit handling
        try {
          const valid = formValidator(form);

          if (valid) {
            handleSubmit(form);
          } else {
            const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
            if (firstInvalidEl) {
              firstInvalidEl.focus();
              firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
            }
            form.querySelector('.error-alert')?.setAttribute('style', 'display: block');
          }
        } catch (error) {
          // Fallback to native validation
          const nativeValid = form.reportValidity();
          if (nativeValid) {
            handleSubmit(form);
          }
        }
      })();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
      if (typeof formValidator !== 'function') {
        // Fallback to native validation
        const nativeValid = form.reportValidity();
        if (nativeValid) {
          handleSubmit(form);
        }
        return nativeValid;
      }

      const valid = formValidator(form);

      if (valid) {
        handleSubmit(form);
      } else {
        const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
        if (firstInvalidEl) {
          firstInvalidEl.focus();
          firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
        }
        form.querySelector('.error-alert')?.setAttribute('style', 'display: block');
        return false;
      }
      return true;
    } catch (error) {
      // Fallback to native validation
      const nativeValid = form.reportValidity();
      if (nativeValid) {
        handleSubmit(form);
      }
      return nativeValid;
    }
  });
}
