# Chat GPT Clone - Ontology Ver.

An **Electron + React + Vite** desktop AI assistant built on the MLOD (Multi-level Ontology Description) framework. This application integrates structured domain knowledge to ground AI responses, verify claims against a formal knowledge graph, and flag potential hallucinations in real time.

---

## ✨ Features

### Sprint 1 (Feb 1 – Mar 5, 2026)

| Feature                         | Date     | Requirements                  | Description                                                     |
| ------------------------------- | -------- | ----------------------------- | --------------------------------------------------------------- |
| Electron IPC & Groq Integration | Feb 1    | FR-01, FR-05, FR-06, NFR-03   | Secure IPC bridge + multi-provider AI support (OpenAI/Groq)     |
| Conversation Management         | Feb 8    | FR-02, FR-03, FR-04           | Create, switch, and delete conversations with localStorage      |
| MLOD Domain Definitions         | Feb 8    | FR-07, NFR-05, NFR-07         | Structured ontology data layer with concepts & relationships    |
| Ontology-Grounded Prompts       | Feb 15   | FR-08, NFR-06                 | System prompt enrichment with domain-specific ground truth      |
| Domain Selector & Concept Tags  | Feb 22   | FR-07, FR-10, NFR-04          | UI for switching domains + auto-tagging AI responses            |
| Automated Testing (Vitest)      | Mar 1    | NFR-02                        | 17 unit tests covering core services and Redux slices           |

### Sprint 2 (Mar 15 – Apr 25, 2026)

| Feature                            | Date     | Requirements         | Description                                                     |
| ---------------------------------- | -------- | -------------------- | --------------------------------------------------------------- |
| Interactive Knowledge Panel (D3)   | Mar 15   | FR-09, NFR-04        | Zoomable force-directed graph of ontology concepts              |
| Domain Builder (CRUD Modal)        | Mar 22   | FR-09, NFR-07        | Create, edit, view, and delete custom ontologies                |
| Fact Verification & Hallucination  | Mar 29   | FR-11, NFR-01        | Relationship-level triplet validation with visual indicators    |
| Knowledge Export (JSON)            | Apr 5    | FR-12                | Native save dialog to export ontologies as structured JSON      |
| Full Project Testing               | Apr 12   | NFR-02               | 58 tests across 10 test files (services, UI, integration)       |
| UI/UX Polish & Final Docs         | Apr 19   | NFR-04               | Final responsive design refinements and documentation           |

---

## 📦 Requirements Reference

| ID       | Requirement                                                          |
| -------- | -------------------------------------------------------------------- |
| FR-01    | User can send messages and receive AI responses in real-time         |
| FR-02    | User can create and manage multiple conversations                    |
| FR-03    | User can delete conversations                                        |
| FR-04    | Messages and conversations persist across sessions via localStorage  |
| FR-05    | Secure IPC communication between Electron renderer and main process  |
| FR-06    | Support for multiple AI providers (OpenAI, Groq, OpenRouter)         |
| FR-07    | User can select a knowledge domain to ground the AI's responses      |
| FR-08    | System enriches the AI system prompt with specific domain facts      |
| FR-09    | User can visualize and define ontology concepts and relationships    |
| FR-10    | AI responses are automatically tagged with relevant ontology concepts|
| FR-11    | User can toggle Fact Verification to validate AI claims              |
| FR-12    | User can export ontology structures as structured JSON files         |
| NFR-01   | Total AI response time < 3 seconds despite ontology lookups          |
| NFR-02   | Automated test suite with 90%+ core logic coverage (Vitest)          |
| NFR-03   | Application runs as a native desktop app via Electron                |
| NFR-04   | Interface is responsive across desktop window sizes                  |
| NFR-05   | All API keys are securely managed via environment variables (.env)   |
| NFR-06   | Ontology lookups and prompt building complete in < 500ms             |
| NFR-07   | Domain knowledge persists across sessions via localStorage           |

---

## How to Run This Project

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
