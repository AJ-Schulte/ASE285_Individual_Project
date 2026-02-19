# ASE285_Individual_Project

An **ChatGPT-clone** built with **React**, **Electron**, and the **OpenAI API** — enhanced with **Multi-Level Ontology Description (MLOD)** for structured, knowledge-grounded conversations.

## 1. Project Title and Description

**ChatGPT-clone** is a full-stack desktop AI chat application. Built on a ChatGPT-clone foundation, it extends beyond raw conversation by integrating an **MLOD ontology layer** that structures domain knowledge, reduces AI hallucinations, and enables users to define and verify facts within their area of expertise.

The project is built using **React**, **Electron**, **Redux Toolkit**, and the **OpenAI API**, with ontology concepts modeled across three MLOD layers: a domain configuration layer, a domain description layer, and a formal RDF/knowledge-graph layer.

## 2. Problem Domain

Modern AI assistants like ChatGPT are powerful but suffer from **hallucinations** — generating confident but factually incorrect responses. There is no built-in mechanism for users to define *what is true* in their domain, or for the AI to verify its answers against structured knowledge.

By integrating **ontology** (a formal representation of concepts and relationships within a domain), this project bridges the gap between domain expertise and AI-generated responses. Using the **MLOD framework** from current research, domain experts can work at a human-readable abstraction level without needing to know formal logic languages like RDF or OWL.

## 3. Features and Requirements

### Features

- **Sprint 1 (MVP — Technology Understanding + Ontology Layer 1 & 2):**
  - Real-time messaging via WebSockets / IPC.
  - Basic AI response generation using OpenAI API.
  - Conversation history stored locally (localStorage / IndexedDB).
  - Multi-conversation support (creating and switching chats).
  - **[NEW] Domain Selector** — Choose a knowledge domain (e.g., General, Medical, Software Engineering) before starting a conversation.
  - **[NEW] Knowledge-Grounded Prompts** — The system enriches the AI's system prompt with relevant domain facts from the ontology (MLOD Layer 2).
  - **[NEW] Concept Tagging** — AI responses are tagged with key ontology concepts they reference.

- **Sprint 2 (Final Product — Enhanced Features + Ontology Layer 3):**
  - Dark/Light mode toggle for UX enhancement.
  - Markdown rendering for chat messages (rich text).
  - Code syntax highlighting for technical conversations.
  - Exporting conversation history to files.
  - Renaming and managing existing chat sessions.
  - **[NEW] Ontology Knowledge Panel** — A side panel displaying active concepts and their relationships as a visual graph (MLOD Layer 2 & 3).
  - **[NEW] Domain Builder (Low-Code)** — A form-based UI for defining new concepts and relationships without writing RDF (MLOD Layer 1 & 2).
  - **[NEW] Fact Verification Mode** — A toggle that allows the AI to verify its claims against the stored ontology before responding (MLOD Layer 3).
  - **[NEW] Knowledge Export** — Export the ontology structure alongside conversation history as structured JSON.
  - **[NEW] Hallucination Warnings** — The AI flags responses it cannot verify against the known ontology.

### Requirements

#### Functional Requirements
- **FR-01:** User can send text messages and receive AI responses.
- **FR-02:** User can create new conversations.
- **FR-03:** User can switch between existing conversations.
- **FR-04:** User can view conversation history.
- **FR-05:** User can delete all conversations.
- **FR-06:** Sessions persist across app restarts (localStorage / IndexedDB).
- **FR-07:** User can select or create a knowledge domain before starting a conversation.
- **FR-08:** System enriches the AI prompt with domain-relevant facts from the ontology.
- **FR-09:** User can define new concepts and relationships via a form (Domain Builder).
- **FR-10:** AI responses are tagged with ontology concepts they reference.
- **FR-11:** User can toggle Fact Verification Mode to validate AI claims against the ontology.
- **FR-12:** User can export current ontology structure alongside conversation history.

#### Non-Functional Requirements
- **NFR-01:** Total AI response time < 3 seconds.
- **NFR-02:** WebSocket / IPC connection handles reconnection gracefully.
- **NFR-03:** Storage supports offline history viewing.
- **NFR-04:** Application is responsive across desktop window sizes.
- **NFR-05:** Secure API key management (loaded from `.env`, never exposed to renderer directly).
- **NFR-06:** Ontology lookups complete in < 500ms so they do not impact response time.
- **NFR-07:** Domain knowledge (ontology) persists across sessions via IndexedDB.

## 4. Data Model and Architecture

### Architecture

```
┌─────────────────┐     Electron IPC / WebSocket     ┌──────────────────────────┐
│                 │◄────────────────────────────────►│                          │
│  React Frontend │                                  │   Electron Main Process   │
│  + Ontology UI  │                                  │   + Prompt Builder        │
└─────────────────┘                                  └────────────┬─────────────┘
        │                                                         │
        ▼                                             ┌───────────▼────────────┐
┌──────────────────┐                                 │   MLOD Ontology Layer  │
│  localStorage /  │                                 │ ┌──────────────────┐   │
│  IndexedDB       │                                 │ │ Layer 1: Config  │   │
│  (Conversations  │                                 │ ├──────────────────┤   │
│   + Ontology)    │                                 │ │ Layer 2: Domain  │   │
└──────────────────┘                                 │ ├──────────────────┤   │
                                                     │ │ Layer 3: RDF     │   │
                                                     │ └──────────────────┘   │
                                                     └────────────┬───────────┘
                                                                  │
                                                     ┌────────────▼───────────┐
                                                     │   OpenAI GPT API       │
                                                     │ (grounded prompts)     │
                                                     └────────────────────────┘
```

### Data Model

- **Session**: Contains user settings, selected domain, and a list of conversations.
- **Conversation**: Includes a unique ID, title, domain tag, and a sequence of messages.
- **Message**: Consists of sender (user/AI), timestamp, content, and associated ontology concept tags.
- **OntologyDomain**: A named knowledge domain containing a set of concepts and relationships.
- **Concept**: A named entity within a domain (e.g., "Patient", "Diagnosis", "Function").
- **Relationship**: A named, directional link between two concepts (e.g., "Patient → has-diagnosis → Disease").

## 5. Tests

Quality assurance is managed through:
- **Manual Testing**: Verifying real-time messaging, AI response accuracy, and ontology enrichment behavior.
- **Lighthouse / Performance Audits**: Ensuring responsiveness and load times meet requirements.
- **Automated Testing**: Unit and integration tests for core logic (planned Sprint 2), covering the ontology lookup and prompt-building services.

## 6. Team Members and Roles

- **AJ Schulte**: Individual Developer

## 7. Links

- **Code Repository**: [GitHub Repo](https://github.com/AJ-Schulte/ASE285_Individual_Project)
- **Documentation**: [Docs Folder](./docs)
- **Ontology Overview**: [Ontology Explainer](./docs/ontology_overview.md)
- **Presentation**: [Project Presentation](./docs/presentation/ppp_individual.md)
- **Tests**: [Tests Folder](./tests)
- **Setup Guide**: [How to Run](./src/README.md)