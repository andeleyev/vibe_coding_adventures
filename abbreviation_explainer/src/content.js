// Helper function to extract surrounding paragraphs
function extractSurroundingContext(fullText, selectedText, paragraphsBefore = 2, paragraphsAfter = 2) {
  // Find the position of the selected text
  const selectedIndex = fullText.indexOf(selectedText);
  
  if (selectedIndex === -1) {
    // If exact match not found, return limited context from start
    const paragraphs = fullText.split(/\n\n+/);
    return paragraphs.slice(0, Math.min(5, paragraphs.length)).join('\n\n');
  }
  
  // Split text into paragraphs (using double newline as separator)
  const paragraphs = fullText.split(/\n\n+/);
  
  // Find which paragraph contains the selected text
  let currentPos = 0;
  let selectedParagraphIndex = -1;
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraphEnd = currentPos + paragraphs[i].length;
    if (selectedIndex >= currentPos && selectedIndex <= paragraphEnd) {
      selectedParagraphIndex = i;
      break;
    }
    currentPos = paragraphEnd + 2; // +2 for the \n\n separator
  }
  
  if (selectedParagraphIndex === -1) {
    // Fallback: return first few paragraphs
    return paragraphs.slice(0, Math.min(5, paragraphs.length)).join('\n\n');
  }
  
  // Extract paragraphs before and after
  const startIndex = Math.max(0, selectedParagraphIndex - paragraphsBefore);
  const endIndex = Math.min(paragraphs.length, selectedParagraphIndex + paragraphsAfter + 1);
  
  return paragraphs.slice(startIndex, endIndex).join('\n\n');
}

// Listen for text selection
document.addEventListener('mouseup', function() {
  const selectedText = window.getSelection().toString().trim();
  console.log('Text selected:', selectedText);
  
  if (selectedText) {
    // Get the full page text
    const pageText = document.body.innerText || document.body.textContent;
    
    // Extract surrounding context (2 paragraphs before and after)
    const surroundingContext = extractSurroundingContext(pageText, selectedText, 2, 2);
    
    console.log('Context extracted, length:', surroundingContext.length);
    
    chrome.storage.local.set({ 
      selectedText: selectedText,
      selectedTimestamp: Date.now(),
      selectedContext: surroundingContext
    });
    console.log('Saved selected text and context to storage');
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