# Context Abbreviation Explainer

A Chrome extension that uses AI to explain abbreviations in context. Select any abbreviation on a webpage and get an instant, context-aware explanation powered by your choice of AI models.

## ✨ Features

- **Context-Aware Explanations**: Automatically captures 2 paragraphs before and after your selected text for accurate, contextual definitions
- **Smart Text Selection**: Simply select an abbreviation on any webpage, and it's automatically populated in the extension popup
- **Multiple AI Models**: Choose from various AI models including free and paid options:
  - Google Gemma 3 (Free)
  - Google Gemini Flash 1.5
  - Claude 3 Haiku
  - GPT-3.5 Turbo
  - GPT-4o Mini
  - Llama 3.1 8B (Free)
- **Privacy-Focused**: Your API key is stored locally and only sent to OpenRouter
- **Lightweight**: Minimal performance impact on browsing

## 🚀 Installation

### Option 1: Install from Packed Extension (.crx)

1. Download the `src.crx` file from the releases
2. Open Chrome or your chromium based browser and navigate to `chrome://extensions/` (or `edge://extensions/` etc.)
3. Enable "Developer mode" using the toggle in the top right
4. Drag and drop the `src.crx` file into the extensions page
5. Click "Add extension" when prompted

### Option 2: Install from Source (Unpacked)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/yourusername/abbreviation_explainer.git
   ```

2. Open Chrome or your chromium based browser and navigate to `chrome://extensions/` (or `edge://extensions/` etc.)

3. Enable "Developer mode" using the toggle in the top right

4. Click "Load unpacked"

5. Select the `abbreviation_explainer/src` folder

6. The extension icon should now appear in your toolbar

## ⚙️ Setup

1. Get an API key from [OpenRouter](https://openrouter.ai/keys)

2. Click "⚙️ Settings" in the extension

3. Enter your OpenRouter API key

4. Select your preferred AI model

5. Click "Save Settings"

## 📖 Usage

### Method 1: Select Text (Recommended)
1. Select any abbreviation on a webpage
2. Click the extension icon (must be within 5 seconds of selection)
3. The abbreviation will be pre-filled
4. Click "Explain" to get the context-aware definition

### Method 2: Manual Entry
1. Click the extension icon
2. Type the abbreviation you want explained
3. Check/uncheck "Use page context" as needed
4. Click "Explain"

## 🏗️ Project Structure

```
abbreviation_explainer/
├── src/
│   ├── manifest.json      # Extension configuration
│   ├── popup.html         # Extension popup interface
│   ├── popup.js           # Popup logic and API calls
│   ├── content.js         # Content script for text selection
│   ├── options.html       # Settings page
│   ├── options.js         # Settings page logic
│   └── icon*.png          # Extension icons
├── assets/                # Additional assets and scripts used 
│   └── ...
├── src.crx                # packaged extension
└── README.md
```

## 🔒 Privacy & Security

- Your API key is stored locally in your browser using Chrome's storage API
- The API key is never sent anywhere except to OpenRouter's API
- No browsing data is collected or transmitted
- The extension only accesses the active tab when you request an explanation
- use with caution as i am no security expert and don't know if the key could be exposed through the extension

## 👤 Author

Created by **Claude Sonnet 4.5** (Anthropic) 

took two sessions and multiple prompt to get the code working 

---

**Enjoy context-aware abbreviation explanations! 🎉**