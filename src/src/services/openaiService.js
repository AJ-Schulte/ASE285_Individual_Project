import OpenAI from "openai";

let openaiClient = null;

// Initialize OpenAI client — only used in browser/Vite dev mode.
// In Electron, API calls go via IPC to the main process instead (see preload.js).
export const initializeOpenAI = async () => {
  // If running in Electron, the main process handles OpenAI — nothing to do here.
  const isElectron =
    typeof window !== "undefined" &&
    window.electron &&
    typeof window.electron.sendMessage === "function";

  if (isElectron) return true;

  // Browser / Vite dev mode: initialize client directly
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const baseURL = import.meta.env.VITE_OPENAI_API_BASE;

    if (!apiKey) {
      console.error("Missing VITE_OPENAI_API_KEY in .env");
      return false;
    }

    openaiClient = new OpenAI({
      apiKey,
      baseURL: baseURL || undefined,
      dangerouslyAllowBrowser: true, // Required for browser context
    });

    console.log("OpenAI-compatible client initialized in browser mode.");
    return true;
  } catch (error) {
    console.error("Failed to initialize OpenAI:", error);
    return false;
  }
};

// Send messages to ChatGPT.
// In Electron: routes through the main process via IPC (no browser restrictions).
// In browser dev mode: calls OpenAI directly using the Vite env variable.
export const sendMessageToAI = async (messages) => {
  const isElectron =
    typeof window !== "undefined" &&
    window.electron &&
    typeof window.electron.sendMessage === "function";

  // Electron path — secure, runs in Node.js main process
  if (isElectron) {
    console.log("Sending messages to OpenAI via Electron IPC:", messages);
    const content = await window.electron.sendMessage(messages);
    console.log("OpenAI response via IPC:", content);
    return content;
  }

  // Browser path — direct API call
  if (!openaiClient) {
    throw new Error("OpenAI client not initialized");
  }

  try {
    console.log("Sending messages to OpenAI (browser mode):", messages);

    const response = await openaiClient.chat.completions.create({
      model: import.meta.env.VITE_OPENAI_MODEL || "gpt-3.5-turbo",
      messages: messages,
    });

    console.log("OpenAI raw response choice:", response.choices[0]);

    return response?.choices?.[0]?.message?.content ?? "No response from AI";
  } catch (error) {
    console.error("OpenAI API error:", error);
    const errorMsg = error.error?.message || error.message || "Failed to get response from AI";
    throw new Error(errorMsg);
  }
};
