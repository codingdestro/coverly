// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage with empty saved tabs array
  chrome.storage.local.set({ savedTabs: [] });
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getTabs') {
    chrome.storage.local.get('savedTabs', (result) => {
      sendResponse({ savedTabs: result.savedTabs || [] });
    });
    return true; // Will respond asynchronously
  }
}); 