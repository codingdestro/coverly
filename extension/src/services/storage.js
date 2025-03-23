// Chrome storage wrapper
export const storage = {
  async get(key) {
    return chrome.storage.local.get(key);
  },

  async set(data) {
    return chrome.storage.local.set(data);
  },

  async remove(key) {
    return chrome.storage.local.remove(key);
  }
}; 