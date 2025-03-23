import { api } from '../../services/api.js';
import { storage } from '../../services/storage.js';
import { EducationManager } from '../education/educationManager.js';

export class ResumeForm {
  constructor() {
    this.form = document.getElementById('resume-form');
    this.educationManager = new EducationManager();
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.loadSavedData();
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formData = this.collectFormData();
    try {
      const { token } = await storage.get('token');
      const response = await api.saveResume(formData, token);
      // Handle response
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  }

  // ... other methods
} 