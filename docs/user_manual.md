# User Manual: Chat GPT Clone - Ontology Ver.

Welcome to the **Chat GPT Clone - Ontology Ver.** This application is a desktop-based AI assistant that uses domain-specific knowledge (Ontologies) to ground AI responses, ensuring higher accuracy and providing visual fact-verification.

---

## 🚀 Getting Started

### 1. Installation
The application runs as a standalone desktop app. Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- NPM or Yarn

---

### 2. Setting up API Keys
To use the AI features, you need an API key from a supported provider (OpenAI or Groq).
1. Create a `.env` file in the root directory.
2. Add your keys:
   ```env
   VITE_OPENAI_API_KEY=your_key_here
   VITE_OPENAI_API_BASE=https://api.openai.com/v1 (or Groq/OpenRouter base)
   ```

---

## 💬 Core Features

### 1. Chatting & Conversations
- **New Chat**: Click the **"+ New Chat"** button in the sidebar to start a fresh conversation.
- **Switching**: Click on any previous conversation preview in the sidebar to resume it.
- **Deleting**: Use the **"Delete conversations"** button to clear your history.

---

### 2. Selecting a Knowledge Domain
Once a conversation is active, use the **Knowledge Domain** dropdown at the top of the chat area to ground the AI's "brain" in a specific topic (e.g., Software Engineering or Medical).

---

### 3. Fact Verification
The assistant can verify AI claims against the selected domain's grounded truth:
- **Toggle**: Switch the **"Fact Check"** toggle (🛡️) on at the top of the chat.
- **Indicators**:
    - 🛡️ **Relationship Verified**: The claim perfectly matches a known subject-predicate-object relationship in the ontology.
    - ✅ **Concept Verified**: The claim mentions a known concept, but the specific relationship wasn't found.
    - ⚠️ **Unverified**: No matching concepts or relationships were found in the ontology for this sentence.
- **Tooltips**: Hover over icons to see exactly what grounded facts were used for verification.

---

## 🧩 Knowledge Management

### 1. Domain Builder
Create your own custom domains by clicking the **"Domain Builder"** button in the sidebar.
- **Create**: Add a name, description, and list of concepts/relationships.
- **Edit/View**: Modify existing user-defined domains or view the structure of built-in ones.
- **Persistence**: Your custom domains are saved locally on your machine and persist across sessions.

---

### 2. Knowledge Graph (D3)
Visualize your domain's structure using the **Knowledge Graph** panel:
- **Access**: Click the **"Knowledge Graph"** button (bottom right) to open the overlay.
- **Interact**: 
    - **Zoom**: Use your mouse wheel or pinch to zoom.
    - **Pan**: Click and drag the background to move the view.
    - **Nodes**: Drag individual nodes to rearrange the layout.
    - **Details**: Click a node to see its description and connections.

---

### 3. Exporting Knowledge
In the **Domain Builder**, select a domain and click the **"Export JSON"** button to save its structure as a `.json` file for backup or sharing.

---

## 🛠️ Troubleshooting
- **AI not responding**: Check your internet connection and verify your API keys in the `.env` file.
- **Verification icons missing**: Ensure you have selected a domain other than "General Assistant" and have the "Fact Check" toggle enabled.
- **App won't start**: Run `npm install` to ensure all dependencies are correctly set up.
