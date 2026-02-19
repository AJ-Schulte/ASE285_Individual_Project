# How to Run This Project

This is an **Electron + React + Vite** desktop application. It runs as a standalone desktop app — no MongoDB or external database is required.

---

## ⚠️ Before You Start: What You Need

### 1. Node.js
Make sure you have **Node.js v18 or higher** installed.
- Check: `node --version`
- Download: [nodejs.org](https://nodejs.org)

### 2. OpenAI API Key ✅ REQUIRED
You **do need** an OpenAI API key. This is the only external credential required — **no MongoDB, no Firebase, no other database**.

- Get a key at: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### 💡 Free Alternative: Groq
If you don't want to pay for OpenAI, you can use **Groq** (extremely fast and has a free tier).
1. Get a free key at [console.groq.com](https://console.groq.com/keys).
2. In your `.env`, set:
   - `OPENAI_API_KEY=your_groq_key`
   - `OPENAI_API_BASE=https://api.groq.com/openai/v1`
   - `OPENAI_MODEL=llama-3.1-8b-instant`
   - `VITE_OPENAI_API_KEY=your_groq_key`
   - `VITE_OPENAI_API_BASE=https://api.groq.com/openai/v1`
   - `VITE_OPENAI_MODEL=llama-3.1-8b-instant`
3. Restart your app (press Ctrl+C in the terminal and run `npm run electron-dev` again).

---

## Setup Steps

### Step 1 — Install Dependencies

Navigate into the `src` folder and install packages:

```bash
cd src
npm install
```

### Step 2 — Create Your `.env` File

In the `src` folder, create a file named **`.env`** (note the dot at the beginning):

```
OPENAI_API_KEY=sk-your-actual-key-here
VITE_OPENAI_API_KEY=sk-your-actual-key-here
```

> ⚠️ **Both keys should be identical** — the same OpenAI key. One is used by Electron's main process and one is used by Vite in browser/dev mode.

> 🔒 **Never commit this file to GitHub.** The `.gitignore` already excludes `.env` files.

There is an `env` file in this folder showing the expected format — just rename it to `.env` and fill in your real key.

---

## Running the App

### Option A: Browser / Web Mode (Vite Dev Server)

Runs the React app in your regular browser at `http://localhost:3000`. This is the fastest way to develop and test.

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option B: Electron Desktop App (Development)

Runs the app as a native desktop window using Electron. The React dev server starts first, then Electron loads it.

```bash
npm run electron-dev
```

> ⏳ Wait a few seconds after running — Electron waits for the Vite dev server to start before opening.

### Option C: Electron Desktop App (Production Build)

Builds the React app first, then launches Electron loading the built files.

```bash
npm run electron-prod
```

### Option D: Create a Distributable Installer

Packages the app into an installable file (`.exe` on Windows, `.dmg` on Mac):

```bash
npm run dist
```

Output will be in the `release/` folder.

---

## Common Issues

| Problem                              | Fix                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| App opens but AI won't respond       | Check that your `.env` file exists and has a valid key                          |
| `VITE_OPENAI_API_KEY is not defined` | Make sure you used `.env` (with the dot), not `env`                             |
| Port 3000 already in use             | Kill whatever is running on port 3000, or change it in `vite.config.js`         |
| Electron window doesn't appear       | Run `npm run dev` first to confirm the React app works, then try `electron-dev` |
| `npm install` fails                  | Make sure you're inside the `src/` folder, not the root of the repo             |

---

## Project Structure (inside `src/`)

```
src/
├── main.js               # Electron main process — loads env, creates window, handles IPC
├── preload.js            # Electron preload — bridges main process and renderer safely
├── vite.config.js        # Vite (React build tool) configuration
├── package.json          # Dependencies and npm scripts
├── index.html            # HTML shell for the React app
├── .env                  # ← YOU CREATE THIS with your OpenAI key (never commit!)
└── src/
    ├── App.jsx            # Root React component
    ├── main.jsx           # React entry point
    ├── store.js           # Redux store setup
    ├── index.css          # Global styles
    ├── services/
    │   └── openaiService.js   # OpenAI API client (sends/receives messages)
    └── Dashboard/
        ├── Dashboard.jsx      # Main layout component
        ├── dashboardSlice.js  # Redux state (conversations, messages, AI calls)
        ├── dashboard.css      # Dashboard styles
        ├── Chat/              # Chat window components (messages, input)
        └── Sidebar/           # Sidebar components (conversation list, new chat, delete)
```

---

## Do I Need MongoDB?

**No.** This project uses **no external database**. Conversation data is stored locally using:
- **`localStorage`** — conversation data saved in your browser/Electron's storage (persists between sessions)

MongoDB, PostgreSQL, Firebase, or any other database are **not required**.

---

## Summary

| Item               | Required? | Where to Get It                                             |
| ------------------ | --------- | ----------------------------------------------------------- |
| Node.js v18+       | ✅ Yes     | [nodejs.org](https://nodejs.org)                            |
| OpenAI API Key     | ✅ Yes     | [platform.openai.com](https://platform.openai.com/api-keys) |
| MongoDB            | ❌ No      | N/A                                                         |
| Any other database | ❌ No      | N/A                                                         |
| Any other accounts | ❌ No      | N/A                                                         |
