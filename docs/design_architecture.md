# Design & Architecture Document: Chat GPT Clone - Ontology Ver.

## 1. System Overview
The **Chat GPT Clone - Ontology Ver.** is an Electron-based desktop application that bridges the gap between Large Language Models (LLMs) and structured domain knowledge (Ontologies). It uses a "Grounded Generation" approach to influence AI behavior and verify its claims.

---

## 2. Technology Stack
- **Framework**: [Electron](https://www.electronjs.org/) (Desktop Container)
- **Frontend**: React.js with Vite
- **State Management**: Redux Toolkit (Slices for Ontology and Dashboard)
- **Visualization**: D3.js (Force-directed graphs)
- **Styling**: Vanilla CSS (Tailored UI system)
- **Testing**: Vitest + React Testing Library + JSDOM
- **API**: OpenAI / Groq / OpenRouter (via HTTP)

---

## 3. High-Level Architecture

### Process Model
- **Main Process (Node.js)**: Handles window management, native file system access (Export), and secure IPC communication.
- **Renderer Process (Chromium/React)**: Manages the user interface, application state (Redux), and domain logic.

### IPC Bridge (Secure Isolation)
All communication between the UI and native OS features passes through a `preload.js` script using `contextBridge`. This ensures the renderer cannot access Node.js APIs directly, preventing security vulnerabilities.

---

## 4. Domain Knowledge Engine

### 1. Data Structure (Ontology)
Each knowledge domain is defined as:
- **Concepts**: Nodes with a Name and Description.
- **Relationships**: Typed triplets (Subject-Predicate-Object).
- **System Prompt Extra**: Additional instructions for the AI behavior in that domain.

---
## 4. Domain Knowledge Engine Cont.

### 2. Grounded Prompting
When a user sends a message, the `ontologyService` builds a context-aware system prompt:
1.  Retrieves the selected domain's facts.
2.  Injects concepts and relationships into the `system` message.
3.  Instructs the AI to stay within these boundaries.
---
## 4. Domain Knowledge Engine Cont.

### 3. Claim Verification Algorithm
The `verificationService` performs a transformation on AI responses:
1.  **Sentencing**: Splits response into individual claims.
2.  **Triplet Matching**:
    - Scans sentence for `Subject` and `Object` pairs from the ontology.
    - If found, it checks if the `Predicate` matches.
    - If only concepts are found, it flags it as Concept Level.
    - Otherwise, it flags as Unverified.

---

## 5. State Management (Redux)

### `ontologySlice`
- Manages the list of available domains (Built-in + User-defined).
- Tracks the `selectedDomainId`.
- Handles persistence of custom ontologies to `localStorage`.
---
### `dashboardSlice`
- Manages conversation history (`conversations` array).
- Tracks `selectedConversationId`.
- Manages UI states like `loading`, `error`, and `verificationMode`.

---

## 6. Visualization (D3.js Panel)
The `KnowledgePanel` uses a **Force-Directed Graph** layout:
- Nodes represent Concepts and Relationships.
- Links represent connections between them.
- Features include Zoom, Pan, Drag-and-Drop, and detail tooltips.
- The simulation is triggered whenever the `selectedDomainId` changes.

---

## 7. Security & Persistence
- **Environment Variables**: API keys are loaded via `.env` and kept in the Main process where possible.
- **Local Storage**: All application data (Conversations and User Domains) is persisted in `localStorage`.
- **Sandbox**: Electron's `sandbox: true` is enabled to limit renderer access to system resources.

---

## 8. Testing Strategy
The project follows a tiered testing approach (81 total tests):
- **Unit (40)**: Individual service functions and Redux reducers.
- **Regression (23)**: Guarding against null inputs and complex regex/logic boundaries.
- **Integration (6)**: Verifying Redux state synchronization with D3 and UI components.
- **Acceptance (12)**: Verifying complete features like the Domain Builder CRUD and IPC messaging.
