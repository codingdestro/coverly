export class EducationEntry {
  constructor(id) {
    this.id = id;
    this.template = this.createTemplate();
  }

  createTemplate() {
    const entry = document.createElement('div');
    entry.className = 'education-entry';
    entry.dataset.entryId = this.id;
    entry.innerHTML = `
      <div class="education-header">
        <h4>Education #${this.id + 1}</h4>
        <button type="button" class="remove-education">×</button>
      </div>
      <!-- Rest of the education entry template -->
    `;
    this.attachEventListeners(entry);
    return entry;
  }

  attachEventListeners(entry) {
    const removeBtn = entry.querySelector('.remove-education');
    removeBtn.addEventListener('click', () => this.remove());
    
    const currentCheckbox = entry.querySelector('input[name="current"]');
    currentCheckbox.addEventListener('change', (e) => this.toggleEndDate(e));
  }

  // ... other methods
} 