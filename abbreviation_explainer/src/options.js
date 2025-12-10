// Load saved settings
chrome.storage.local.get(['apiKey', 'model'], function(data) {
  if (data.apiKey) {
    document.getElementById('apiKey').value = data.apiKey;
  }
  if (data.model) {
    document.getElementById('model').value = data.model;
  } else {
    document.getElementById('model').value = 'google/gemini-flash-1.5';
  }
});

// Save settings
document.getElementById('saveBtn').addEventListener('click', function() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const model = document.getElementById('model').value;
  const statusDiv = document.getElementById('status');

  if (!apiKey) {
    statusDiv.textContent = 'Please enter an API key';
    statusDiv.className = 'status error';
    statusDiv.style.display = 'block';
    return;
  }

  chrome.storage.local.set({
    apiKey: apiKey,
    model: model
  }, function() {
    statusDiv.textContent = '✓ Settings saved successfully!';
    statusDiv.className = 'status success';
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  });
});