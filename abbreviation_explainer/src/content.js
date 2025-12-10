// Listen for text selection
document.addEventListener('mouseup', function() {
  const selectedText = window.getSelection().toString().trim();
  console.log('Text selected:', selectedText);
  if (selectedText) {
    chrome.storage.local.set({ 
      selectedText: selectedText,
      selectedTimestamp: Date.now()
    });
    console.log('Saved selected text to storage');
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Message received in content script:', request);
  if (request.action === 'getContext') {
    // Get page context - main text content
    const pageText = document.body.innerText || document.body.textContent;
    const pageTitle = document.title;
    const pageUrl = window.location.href;
    
    console.log('Sending context back, text length:', pageText.length);
    sendResponse({
      pageText: pageText,
      pageTitle: pageTitle,
      pageUrl: pageUrl
    });
  }
  return true;
});