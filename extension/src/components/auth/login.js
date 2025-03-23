import { api } from '../../services/api.js';
import { storage } from '../../services/storage.js';

export class Login {
  constructor() {
    this.loginForm = document.getElementById("user-login");
    this.emailInput = document.getElementById("login-email");
    this.passwordInput = document.getElementById("login-password");
    this.loginButton = document.getElementById("login");
    this.init();
  }

  init() {
    this.loginButton.addEventListener("click", () => this.handleLogin());
  }

  async handleLogin() {
    try {
      const response = await api.login(
        this.emailInput.value,
        this.passwordInput.value
      );

      if (response.data) {
        await storage.set({
          token: response.data.token,
          user: response.data.user,
        });
        this.loginForm.style.display = "none";
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }
} 