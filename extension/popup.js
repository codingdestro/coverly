document.addEventListener('DOMContentLoaded', () => {
  const tabsList = document.getElementById('tabs-list');
  const saveTabButton = document.getElementById('save-tab');
  const clearAllButton = document.getElementById('clear-all');

  // Load saved tabs
  loadSavedTabs();

  // Save current tab
  saveTabButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    saveTab(tab);
  });

  // Clear all saved tabs
  clearAllButton.addEventListener('click', () => {
    chrome.storage.local.set({ savedTabs: [] }, () => {
      loadSavedTabs();
    });
  });
});

async function loadSavedTabs() {
  const { savedTabs = [] } = await chrome.storage.local.get('savedTabs');
  const tabsList = document.getElementById('tabs-list');
  tabsList.innerHTML = '';

  savedTabs.forEach(tab => {
    const tabElement = createTabElement(tab);
    tabsList.appendChild(tabElement);
  });
}

function createTabElement(tab) {
  const div = document.createElement('div');
  div.className = 'tab-item';
  
  const favicon = document.createElement('img');
  favicon.className = 'tab-favicon';
  favicon.src = tab.favIconUrl || 'icons/icon16.png';
  
  const title = document.createElement('span');
  title.className = 'tab-title';
  title.textContent = tab.title;
  
  div.appendChild(favicon);
  div.appendChild(title);
  
  div.addEventListener('click', () => {
    chrome.tabs.create({ url: tab.url });
  });
  
  return div;
}

async function saveTab(tab) {
  const { savedTabs = [] } = await chrome.storage.local.get('savedTabs');
  
  // Check if tab is already saved
  if (!savedTabs.some(savedTab => savedTab.url === tab.url)) {
    savedTabs.push({
      title: tab.title,
      url: tab.url,
      favIconUrl: tab.favIconUrl
    });
    
    await chrome.storage.local.set({ savedTabs });
    loadSavedTabs();
  }
} 