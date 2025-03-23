import { api } from './services/api.js';
import { Login } from './components/auth/login.js';
import { ResumeForm } from './components/resume/resumeForm.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    api.init();
    this.login = new Login();
    this.resumeForm = new ResumeForm();
    await this.checkAuth();
  }

  async checkAuth() {
    try {
      const { token } = await chrome.storage.local.get('token');
      const response = await api.authenticate(token);
      // Handle authentication response
    } catch (error) {
      console.error('Auth error:', error);
    }
  }
}

// Initialize app
new App(); 