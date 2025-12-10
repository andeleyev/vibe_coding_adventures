// Load saved settings and selected text
chrome.storage.local.get(['apiKey', 'model', 'selectedText', 'selectedTimestamp'], function(data) {
  // Check if API key is configured
  if (!data.apiKey) {
    document.getElementById('warning').textContent = '⚠️ Please configure your API key in Settings';
    document.getElementById('warning').style.display = 'block';
  }

  // Only use selected text if it was selected in the last 5 seconds
  if (data.selectedText && data.selectedTimestamp) {
    const timeSinceSelection = Date.now() - data.selectedTimestamp;
    if (timeSinceSelection < 5000) {
      document.getElementById('abbreviation').value = data.selectedText;
    }
  }
  // Clear the selected text after using it
  chrome.storage.local.remove(['selectedText', 'selectedTimestamp']);
});

// Open settings page
document.getElementById('openSettings').addEventListener('click', function(e) {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});

// Explain button click handler
document.getElementById('explainBtn').addEventListener('click', async function() {
  console.log('Explain button clicked');
  const abbreviation = document.getElementById('abbreviation').value.trim();
  const useContext = document.getElementById('useContext').checked;
  const resultDiv = document.getElementById('result');
  const btn = this;

  console.log('Abbreviation:', abbreviation);
  console.log('Use context:', useContext);

  if (!abbreviation) {
    showResult('Please enter an abbreviation', true);
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Explaining...';
  resultDiv.style.display = 'none';

  try {
    // Load API key and model from storage
    const settings = await chrome.storage.local.get(['apiKey', 'model']);
    
    if (!settings.apiKey) {
      throw new Error('Please configure your API key in Settings');
    }

    const model = settings.model || 'google/gemini-flash-1.5';
    console.log('Using model:', model);

    let contextText = '';
    
    if (useContext) {
      try {
        // Get page context from content script
        console.log('Getting active tab...');
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log('Active tab:', tab.id, tab.url);
        
        // Check if we can access this tab
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('edge://')) {
          console.log('Cannot access Chrome internal pages, using no context');
          document.getElementById('useContext').checked = false;
        } else {
          console.log('Sending message to content script...');
          const context = await chrome.tabs.sendMessage(tab.id, { action: 'getContext' });
          console.log('Context received, length:', context.pageText.length);
          contextText = context.pageText.substring(0, 3000);
        }
      } catch (contextError) {
        console.error('Failed to get context:', contextError);
        console.log('Continuing without context');
        document.getElementById('useContext').checked = false;
      }
    }

    // Build prompt based on whether we have context
    let prompt;
    if (contextText) {
      prompt = `Given this webpage context: "${contextText}"

Please explain what the abbreviation "${abbreviation}" means in this specific context. Be concise (2-3 sentences max).`;
    } else {
      prompt = `Please explain what the abbreviation "${abbreviation}" commonly means. Be concise (2-3 sentences max).`;
    }

    // Call OpenRouter API
    console.log('Calling OpenRouter API...');
    console.log('Using model:', model);
    
    const requestBody = {
      model: model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 150
    };
    
    console.log('Request body:', requestBody);
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://chrome-extension-abbrev-explainer',
        'X-Title': 'Abbreviation Explainer Extension'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const error = JSON.parse(responseText);
        console.error('API error object:', error);
        errorMessage = error.error?.message || errorMessage;
      } catch (e) {
        console.error('Could not parse error response');
      }
      throw new Error(errorMessage);
    }

    const data = JSON.parse(responseText);
    console.log('Parsed API response:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid API response format');
    }
    
    const explanation = data.choices[0].message.content;
    
    showResult(explanation, false);
  } catch (error) {
    console.error('Error:', error);
    showResult(`Error: ${error.message}`, true);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Explain';
  }
});

function showResult(text, isError) {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = text;
  resultDiv.className = isError ? 'result error' : 'result';
  resultDiv.style.display = 'block';
}