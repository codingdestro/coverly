// API configuration and endpoints
const API_BASE_URL = 'http://localhost:3000';

export const api = {
  init() {
    axios.defaults.baseURL = API_BASE_URL;
    axios.defaults.headers.common["Content-Type"] = "application/json";
  },

  async authenticate(token) {
    return axios.post("/api/authenticate", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async login(email, password) {
    return axios.post("/api/login", { email, password });
  },

  async register(userData) {
    return axios.post("/api/register", userData);
  },

  async saveResume(resumeData, token) {
    return axios.post("/api/resume", resumeData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}; 