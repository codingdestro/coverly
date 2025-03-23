import { EducationEntry } from './educationEntry.js';

export class EducationManager {
  constructor() {
    this.container = document.getElementById('education-container');
    this.addButton = document.getElementById('add-education-btn');
    this.entries = [];
    this.init();
  }

  init() {
    this.addButton.addEventListener('click', () => this.addNewEntry());
    // Initialize first entry
    this.addNewEntry();
  }

  addNewEntry() {
    const entry = new EducationEntry(this.entries.length);
    this.entries.push(entry);
    this.container.appendChild(entry.template);
  }

  // ... other methods
} 