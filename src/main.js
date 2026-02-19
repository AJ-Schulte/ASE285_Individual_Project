const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config(); // Load .env at startup

let openaiClient = null;

// Initialize OpenAI in the main process
async function initializeOpenAI() {
  if (openaiClient) return;
  try {
    const { default: OpenAI } = await import('openai');
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_API_BASE || undefined // Allows Groq/OpenRouter
    });
    console.log('OpenAI-compatible client initialized in main process.');
  } catch (err) {
    console.error('Failed to initialize OpenAI client:', err);
  }
}

function createWindow() {
  // Create browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load app
  // app.isPackaged is false when running `electron .` directly (not distributed),
  // so also check NODE_ENV to distinguish electron-dev from electron-prod.
  const isDev = !app.isPackaged && process.env.NODE_ENV !== 'production';

  if (isDev) {
    // Development: load from React dev server
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // Production: load from build folder
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
}

// Create window when ready and pre-initialize OpenAI
app.whenReady().then(async () => {
  await initializeOpenAI();
  createWindow();
});

// Handle API key request from renderer (kept for compatibility)
ipcMain.handle('get-api-key', () => {
  return process.env.OPENAI_API_KEY || null;
});

// Handle AI message request from renderer — runs in Node.js, no browser sandbox
ipcMain.handle('ai-send-message', async (event, messages) => {
  if (!openaiClient) {
    await initializeOpenAI();
  }
  if (!openaiClient) {
    throw new Error('OpenAI client could not be initialized. Check your OPENAI_API_KEY in .env');
  }
  try {
    const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
    const baseURL = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
    console.log(`Calling AI API: model=${model}, baseURL=${baseURL}`);

    const response = await openaiClient.chat.completions.create({
      model: model,
      messages: messages,
    });
    return response?.choices?.[0]?.message?.content ?? 'No response from AI';
  } catch (err) {
    console.error('OpenAI API Error details:', err);
    // Handle quota specifically
    if (err.status === 429 || err.code === 'insufficient_quota' || (err.message && err.message.includes('quota'))) {
      throw new Error("OpenAI Quota Exceeded. Please check your billing/credits.");
    }
    // Return the actual error message from the provider if available
    const errorMsg = err.error?.message || err.message || "Failed to get response from AI";
    throw new Error(errorMsg);
  }
});

// Recreate window on macOS when clicked
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Quit when all windows closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
