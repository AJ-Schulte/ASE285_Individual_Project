# Project Plan Presentation (PPP)
## Ontology-Aware AI Knowledge Assistant (ChatGPT Clone)
**Individual Project - A.J. Schulte**

---

## 📋 Executive Summary

A real-time desktop AI assistant built on the **MLOD (Multi-level Ontology Description)** framework. Unlike standard ChatGPT clones, this application integrates a structured knowledge layer (ontology) to ground AI responses in verified facts, reduce hallucinations, and allow domain experts to define the "ground truth" for their conversations.

---

## 🎯 Project Overview

| Attribute        | Details                                 |
| ---------------- | --------------------------------------- |
| **Project Name** | Ontology-Aware AI Assistant             |
| **Type**         | Electron Desktop Application            |
| **Duration**     | 11 Weeks (2 Sprints)                    |
| **Target Users** | Domain Experts, Researchers, Developers |

---

## 🛠️ Technology Stack

### Frontend & App Shell
- **React** – Component-based UI framework
- **Electron** – Native desktop shell (Mac/Windows/Linux)
- **Redux Toolkit** – State management for conversations and ontology

### Data & Knowledge
- **MLOD Framework** – Multi-level ontology modeling
- **IndexedDB** – Persistent local knowledge storage

### AI Integration
- **Groq / OpenAI API** – High-performance LLM integration (llama-3.1-8b-instant)
- **Electron IPC** – Secure communication between renderer and API services

---

## ✨ Key Features

### Sprint 1: Technology Foundation & Ontology Awareness
*Completed*

| Feature              | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| **Domain Selector**  | Choose specialized knowledge domains (e.g., General, Medical, SE).    |
| **Grounded Prompts** | System enriches AI prompts with ground-truth facts from the ontology. |
| **Concept Tagging**  | AI responses are tagged with key ontology concepts they reference.    |
| **Real-Time IPC**    | Secure communication between Electron and React for AI responses.     |

### Sprint 2: Visualization & Formal Verification
*Planned*

| Feature                 | Description                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| **Knowledge Panel**     | Visual graph displaying active ontology concepts and relationships.  |
| **Domain Builder**      | Low-code UI for defining new concepts and relationships.             |
| **Fact Verification**   | AI validates its own claims against the formal knowledge graph.      |
| **Hallucination Flags** | visual warnings when the AI says something unverified in the domain. |

---

## 🚀 Sprint Structure

### Sprint 1: Ontology Integration (5 Weeks)

| Week | Phase          | Deliverable                                      |
| ---- | -------------- | ------------------------------------------------ |
| 1    | Infrastructure | IPC Setup & Groq API Integration (Free Tier)     |
| 2    | MLOD Layer 1   | Domain Definitions & Concept Tree implementation |
| 3    | MLOD Layer 2   | Prompt Enrichment Engine (Logical Injection)     |
| 4    | UI Systems     | Domain Selector & Concept Tagging interface      |
| 5    | Testing        | Vitest Integration (100% core logic coverage)    |

### Sprint 2: Advanced Knowledge Ops (6 Weeks)

| Week | Phase          | Deliverable                                     |
| ---- | -------------- | ----------------------------------------------- |
| 6    | Visualization  | Interactive Knowledge Graph (D3.js integration) |
| 7    | Low-Code UI    | Domain Builder CRUD (User-defined ontologies)   |
| 8    | Logical Proofs | Fact Verification Mode toggle & logic           |
| 9    | UI Alerts      | Hallucination Warning system                    |
| 10   | Data Output    | Knowledge Export (Structured JSON/RDF)          |
| 11   | Polish         | UI/UX Refinement & Final Presentation Prep      |

---

## 📦 Functional Requirements

- **FR-07:** User can select a knowledge domain to ground the AI's responses.
- **FR-08:** System enriches the AI system prompt with specific domain facts.
- **FR-09:** User can define new concepts and relationships via the Domain Builder.
- **FR-10:** AI responses are automatically tagged with relevant ontology concepts.
- **FR-11:** User can toggle Fact Verification to validate AI claims against the ontology.
- **FR-12:** User can export ontology structures alongside conversation history.

---

## 🔒 Non-Functional Requirements

- **NFR-01:** Total AI response time < 3 seconds despite ontology lookups.
- **NFR-04:** Interface is responsive across shared desktop window sizes.
- **NFR-06:** Ontology lookups and prompt building must complete in < 500ms.
- **NFR-07:** Domain knowledge (ontology) persists across sessions via IndexedDB.

---

## 📅 Timeline Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         SPRINT 1 (5 Weeks)                      │
│                        Ontology Foundation                      │
├─────────────────────────────────────────────────────────────────┤
│ Week 1: Infrastructure     ████░░░░░░░░░░░░░░░░░░░░             │
│ Week 2: MLOD Layer 1       ░░░░████░░░░░░░░░░░░░░░░             │
│ Week 3: MLOD Layer 2       ░░░░░░░░████░░░░░░░░░░░░             │
│ Week 4: UI Development     ░░░░░░░░░░░░████░░░░░░░░             │
│ Week 5: Testing (Vitest)   ░░░░░░░░░░░░░░░░████░░░░             │
├─────────────────────────────────────────────────────────────────┤
│                         SPRINT 2 (6 Weeks)                      │
│                        Visual Knowledge                         │
├─────────────────────────────────────────────────────────────────┤
│ Week 6: Visualization      ░░░░░░░░░░░░░░░░░░░░████             │
│ Week 7: Domain Builder     ░░░░░░░░░░░░░░░░░░░░░░░░████         │
│ Week 8: Verification       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░████     │
│ Week 9: Hallucination Flags░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████ │
│ Week 10: Data Export       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ Week 11: Polish & Demo     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────────────────────────────┘
```
