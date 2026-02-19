const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Get API key (kept for compatibility)
  getApiKey: () => ipcRenderer.invoke('get-api-key'),

  // Send messages to OpenAI via the main process (Node.js, no browser restrictions)
  sendMessage: (messages) => ipcRenderer.invoke('ai-send-message', messages),
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('ChatGPT Electron app loaded (serverless version)');
});
