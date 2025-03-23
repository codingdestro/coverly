# Coverly Chrome Extension

A Chrome extension for managing and organizing your browser tabs.

## Features

- Save current tab for later reference
- View all saved tabs in a clean interface
- Click on saved tabs to open them
- Clear all saved tabs with one click

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files

## Development

The extension is built using vanilla JavaScript and Chrome Extension APIs. The main components are:

- `manifest.json`: Extension configuration
- `popup.html`: The extension's popup interface
- `popup.js`: Popup functionality
- `background.js`: Background service worker
- `content.js`: Content script for page interaction
- `styles/popup.css`: Styling for the popup

### File Structure

```
coverly/
├── manifest.json
├── popup.html
├── popup.js
├── background.js
├── content.js
├── styles/
│   └── popup.css
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Usage

1. Click the extension icon in your Chrome toolbar
2. Use the "Save Current Tab" button to save the current tab
3. View all saved tabs in the popup
4. Click on any saved tab to open it in a new tab
5. Use the "Clear All" button to remove all saved tabs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 