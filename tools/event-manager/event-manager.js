/* eslint-disable */

import DA_SDK from 'https://da.live/nx/utils/sdk.js';

(async function init() {
  const { context, token, actions } = await DA_SDK;
  
  let categoryCount = 0;
  let logoFile = null;
  let currentView = 'list';
  let editingEventId = null;
  let existingEvents = [];
  
  initializeForm();
  initializeNavigation();
  initializeModal();
  loadExistingEvents();

  function initializeNavigation() {
    document.getElementById('createViewBtn').addEventListener('click', () => switchView('create'));
    document.getElementById('listViewBtn').addEventListener('click', () => switchView('list'));
    document.getElementById('refreshEventsBtn').addEventListener('click', loadExistingEvents);
  }

  function initializeModal() {
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('modalClose');
    const okBtn = document.getElementById('modalOkBtn');

    function closeModal() {
      modal.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);
    okBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  function showSuccessModal(message) {
    const modal = document.getElementById('successModal');
    const messageEl = document.getElementById('modalMessage');
    
    messageEl.textContent = message;
    modal.style.display = 'flex';
  }



  function switchView(view, skipReset = false) {
    currentView = view;
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(view === 'create' ? 'createViewBtn' : 'listViewBtn').classList.add('active');
    
    if (view === 'create') {
      document.querySelector('.form-container').style.display = 'block';
      document.getElementById('eventsListContainer').style.display = 'none';
      if (!skipReset) {
        resetForm();
      }
    } else {
      document.querySelector('.form-container').style.display = 'none';
      document.getElementById('eventsListContainer').style.display = 'block';
      loadExistingEvents();
    }
  }

  function initializeForm() {
    addCategory();
    
    document.getElementById('addCategoryBtn').addEventListener('click', addCategory);
    document.getElementById('eventForm').addEventListener('submit', handleSubmit);
    
    const imageUpload = document.getElementById('imageUpload');
    const logoFileInput = document.getElementById('logoFile');
    
    imageUpload.addEventListener('click', () => logoFileInput.click());
    imageUpload.addEventListener('dragover', handleDragOver);
    imageUpload.addEventListener('dragleave', handleDragLeave);
    imageUpload.addEventListener('drop', handleDrop);
    logoFileInput.addEventListener('change', handleFileSelect);
  }

  function addCategory() {
    categoryCount++;
    const container = document.getElementById('categoriesContainer');

    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category-item';
    categoryDiv.innerHTML = `
      <div class="category-field">
        <label>Category Name</label>
        <input type="text" placeholder="e.g., Half Marathon" name="categoryName_${categoryCount}" required>
      </div>
      <div class="category-field">
        <label>Category ID</label>
        <input type="text" placeholder="e.g., half-marathon-2024" name="categoryId_${categoryCount}" required>
      </div>
      <div class="category-field">
        <label>Start Date</label>
        <input type="date" name="startDate_${categoryCount}" required>
      </div>
      <div class="category-field">
        <label>Price</label>
        <input type="text" placeholder="e.g., $199" name="price_${categoryCount}" required>
      </div>
      <div class="category-field">
        <label>Registration Link</label>
        <input type="url" placeholder="https://..." name="registrationLink_${categoryCount}" required>
      </div>
      <div class="category-field">
        <button type="button" class="btn btn-danger" onclick="removeCategory(this)">Remove</button>
      </div>
    `;

    container.appendChild(categoryDiv);
  }

  function removeCategory(button) {
    button.parentElement.remove();
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  }

  function handleDragLeave(e) {
    e.currentTarget.classList.remove('dragover');
  }

  function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      showStatus('Please select an image file.', 'error');
      return;
    }

    logoFile = file;
    
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById('logoPreview');
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const status = document.getElementById('status');
    const isEditing = editingEventId !== null;

    submitBtn.disabled = true;
    submitBtn.textContent = isEditing ? 'Updating...' : 'Creating...';
    hideStatus();

    try {
      const formData = new FormData(e.target);
      const eventData = collectEventData(formData);

      if (logoFile) {
        const logoUrl = await uploadImage(logoFile);
        eventData.logo = logoUrl;
      }
      
      await writeToSheet(eventData, isEditing);

      showSuccessModal(isEditing ? 'Event updated successfully!' : 'Event created successfully!');
      resetForm();
      
      if (isEditing) {
        switchView('list');
      } else if (currentView === 'list') {
        loadExistingEvents();
      } else {
        loadExistingEvents();
      }

    } catch (error) {
      console.error('Error saving event:', error);
      showStatus(`Error saving event: ${error.message}`, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = isEditing ? 'Update Event' : 'Create Event';
    }
  }

  function collectEventData(formData) {
    const eventName = formData.get('eventName');
    const eventId = formData.get('eventId');
    const eventPath = formData.get('eventPath');
    const eventStartDate = formData.get('eventStartDate');
    const startDateTimestamp = eventStartDate ? new Date(eventStartDate).toISOString() : '';
    const eventDescription = formData.get('eventDescription');
    
    const categories = [];
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach((item, index) => {
      const categoryName = item.querySelector(`input[name="categoryName_${index + 1}"]`)?.value;
      const categoryId = item.querySelector(`input[name="categoryId_${index + 1}"]`)?.value;
      const startDate = item.querySelector(`input[name="startDate_${index + 1}"]`)?.value;
      const price = item.querySelector(`input[name="price_${index + 1}"]`)?.value;
      const registrationLink = item.querySelector(`input[name="registrationLink_${index + 1}"]`)?.value;
      
      if (categoryName && categoryId && startDate && price && registrationLink) {
        categories.push({
          categoryName,
          categoryId,
          startDate,
          price,
          registrationLink
        });
      }
    });
    
    return {
      name: eventName,
      path: eventPath,
      id: eventId,
      startDate: startDateTimestamp,
      description: eventDescription || '',
      categories: JSON.stringify(categories),
      created: new Date().toISOString()
    };
  }

  async function uploadImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function writeToSheet(eventData, isEditing = false) {
    try {
      let existingData = { data: [] };
      
      try {
        const cacheBuster = `?t=${Date.now()}`;
        const response = await actions.daFetch(`/events.json${cacheBuster}`);
        if (response.ok) {
          existingData = await response.json();
        }
      } catch (error) {
      }
      
      if (isEditing && editingEventId) {
        const eventIndex = existingData.data.findIndex(event => event.id === editingEventId);
        if (eventIndex !== -1) {
          existingData.data[eventIndex] = eventData;
        } else {
          existingData.data.push(eventData);
        }
      } else {
        existingData.data.push(eventData);
      }
      
      const url = `https://admin.da.live/source/${context.org}/${context.repo}/events.json`;
      
      const body = new FormData();
      body.append('data', new Blob([JSON.stringify(existingData)], { type: 'application/json' }));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body,
      });
      
      if (response.ok) {
        return true;
      } else {
        throw new Error(`Failed to save event: ${response.statusText}`);
      }
      
    } catch (error) {
      console.error('Error writing to sheet:', error);
      throw error;
    }
  }

  function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
  }

  function hideStatus() {
    const status = document.getElementById('status');
    status.style.display = 'none';
  }

  function resetForm() {
    editingEventId = null;
    document.getElementById('eventForm').reset();
    document.getElementById('categoriesContainer').innerHTML = '';
    categoryCount = 0;
    addCategory();
    
    document.getElementById('submitBtn').textContent = 'Create Event';
    document.getElementById('logoPreview').style.display = 'none';
    logoFile = null;
  }

  async function loadExistingEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '<div class="loading">Loading events...</div>';
    
    try {
      const cacheBuster = `?t=${Date.now()}`;
      const response = await actions.daFetch(`/events.json${cacheBuster}`);
      if (response.ok) {
        const data = await response.json();
        existingEvents = Array.isArray(data.data) ? data.data : [];
        renderEventsList(existingEvents);
      } else {
        eventsList.innerHTML = '<div class="empty-state"><h3>No events found</h3><p>Create your first event to get started.</p></div>';
      }
    } catch (error) {
      console.error('Error loading events:', error);
      eventsList.innerHTML = '<div class="empty-state"><h3>Error loading events</h3><p>Please try refreshing the page.</p></div>';
    }
  }

  function renderEventsList(events) {
    const eventsList = document.getElementById('eventsList');
    
    const validEvents = events.filter(event => event && event.id && event.name);
    
    if (validEvents.length === 0) {
      eventsList.innerHTML = '<div class="empty-state"><h3>No events found</h3><p>Create your first event to get started.</p></div>';
      return;
    }
    
    eventsList.innerHTML = validEvents.map(event => {
      const categories = JSON.parse(event.categories || '[]');
      const sponsors = event.sponsors ? event.sponsors.split(',') : [];
      const startDate = new Date(event.startDate).toLocaleDateString();
      
      return `
        <div class="event-card">
          <div class="event-card-header">
            <h3 class="event-card-title">${event.name}</h3>
            <div class="event-card-actions">
              <button type="button" class="btn btn-small" onclick="editEvent('${event.id}')">Edit</button>
              <button type="button" class="btn btn-small btn-danger" onclick="deleteEvent('${event.id}')">Delete</button>
            </div>
          </div>
          <div class="event-card-meta">
            <div><strong>ID:</strong> ${event.id}</div>
            <div><strong>Start Date:</strong> ${startDate}</div>
            <div><strong>Categories:</strong> ${categories.length}</div>
            <div><strong>Sponsors:</strong> ${sponsors.length}</div>
          </div>
          ${event.description ? `<p>${event.description}</p>` : ''}
          ${categories.length > 0 ? `
            <div class="event-card-categories">
              <h4>Categories:</h4>
              <div class="category-tags">
                ${categories.map(cat => `<span class="category-tag">${cat.categoryName || cat.categoryId}${cat.categoryName ? ` <small>(${cat.categoryId})</small>` : ''}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  function editEvent(eventId) {
    const event = existingEvents.find(e => e.id === eventId);
    if (!event) {
      return;
    }
    
    editingEventId = eventId;
    switchView('create', true);
    populateFormWithEvent(event);
    
    document.getElementById('submitBtn').textContent = 'Update Event';
  }

  function populateFormWithEvent(event) {
    document.getElementById('eventForm').reset();
    document.getElementById('categoriesContainer').innerHTML = '';
    categoryCount = 0;
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventId').value = event.id;
    document.getElementById('eventPath').value = event.path;
    document.getElementById('eventStartDate').value = new Date(event.startDate).toISOString().split('T')[0];
    document.getElementById('eventDescription').value = event.description || '';
    
    const categories = JSON.parse(event.categories || '[]');
    
    categories.forEach(category => {
      addCategory();
      const categoryItem = document.querySelector('.category-item:last-child');
      categoryItem.querySelector('input[name^="categoryName_"]').value = category.categoryName || '';
      categoryItem.querySelector('input[name^="categoryId_"]').value = category.categoryId;
      categoryItem.querySelector('input[name^="startDate_"]').value = new Date(category.startDate).toISOString().split('T')[0];
      categoryItem.querySelector('input[name^="price_"]').value = category.price;
      categoryItem.querySelector('input[name^="registrationLink_"]').value = category.registrationLink;
    });
    
    if (categories.length === 0) {
      addCategory();
    }
  }

  async function deleteEvent(eventId) {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }
    
    try {
      const cacheBuster = `?t=${Date.now()}`;
      const response = await actions.daFetch(`/events.json${cacheBuster}`);
      if (response.ok) {
        const data = await response.json();
        const events = data.data || [];
        const updatedEvents = events.filter(event => event.id !== eventId);
        
        const formData = new FormData();
        const blob = new Blob([JSON.stringify({ data: updatedEvents })], { type: 'application/json' });
        formData.append('data', blob, 'events.json');
        
        const updateResponse = await fetch(`https://admin.da.live/source/${context.org}/${context.repo}/events.json`, {
          method: 'POST',
          body: formData
        });
        
        if (updateResponse.ok) {
          showSuccessModal('Event deleted successfully!');
          loadExistingEvents();
        } else {
          showStatus('Failed to delete event. Please try again.', 'error');
        }
      }
    } catch (error) {
      showStatus('Error deleting event. Please try again.', 'error');
    }
  }

  window.editEvent = editEvent;
  window.deleteEvent = deleteEvent;
  window.removeCategory = removeCategory;

})();
