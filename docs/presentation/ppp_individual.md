---
marp: true
size: 16:9
paginate: true
title: Chat GPT Clone - Ontology Ver.
theme: default
backgroundColor: white
---

# Chat GPT Clone - Ontology Ver.
## Project Plan Presentation

**Individual Project - A.J. Schulte**

ASE285 – Software Engineering

---

## Problem Domain

Standard AI chatbots generate responses without any grounding in verified, domain-specific knowledge, leading to hallucinations and unreliable outputs for specialized fields like medicine or software engineering.

## Solution

A desktop AI assistant built on an ontology framework (MLOD) that enriches prompts with structured domain knowledge, verifies AI claims against a formal knowledge graph, and flags unverified statements in real time.

---

## Technology Stack

| Layer            | Technology                                     |
| ---------------- | ---------------------------------------------- |
| **Frontend**     | React, Redux Toolkit                           |
| **App Shell**    | Electron (Desktop)                             |
| **Visualization**| D3.js (Force-directed Knowledge Graphs)        |
| **AI Provider**  | Groq / OpenAI API (LLM)                        |
| **IPC**          | Electron Main ↔ Renderer (contextBridge)       |
| **Persistence**  | localStorage                                   |
| **Testing**      | Vitest + React Testing Library                 |

---

## Sprint 1 Features (Feb 1 – Mar 5, 2026)

| Feature                         | Date     | Requirements                  |
| ------------------------------- | -------- | ----------------------------- |
| Electron IPC & Groq Integration | Feb 1    | FR-01, FR-05, FR-06, NFR-03   |
| Conversation Management         | Feb 8    | FR-02, FR-03, FR-04           |
| MLOD Domain Definitions         | Feb 8    | FR-07, NFR-05, NFR-07         |
| Ontology-Grounded Prompts       | Feb 15   | FR-08, NFR-06                 |
| Domain Selector & Concept Tags  | Feb 22   | FR-07, FR-10, NFR-04          |
| Automated Testing (Vitest)      | Mar 1    | NFR-02                        |

---

## Sprint 2 Features (Mar 15 – Apr 25, 2026)

| Feature                            | Date     | Requirements         |
| ---------------------------------- | -------- | -------------------- |
| Interactive Knowledge Panel (D3)   | Mar 15   | FR-09, NFR-04        |
| Domain Builder (CRUD Modal)        | Mar 22   | FR-09, NFR-07        |
| Fact Verification & Hallucination  | Mar 29   | FR-11, NFR-01        |
| Knowledge Export (JSON)            | Apr 5    | FR-12                |
| Full Project Testing               | Apr 12   | NFR-02               |
| UI/UX Polish & Final Docs         | Apr 19   | NFR-04               |

---

## Functional Requirements

- **FR-01:** User can send messages and receive AI responses in real-time.
- **FR-02:** User can create and manage multiple conversations.
- **FR-03:** User can delete conversations.
- **FR-04:** Messages and conversations persist across sessions via localStorage.
- **FR-05:** Secure IPC communication between Electron renderer and main process.
- **FR-06:** Support for multiple AI providers (OpenAI, Groq, OpenRouter).
- **FR-07:** User can select a knowledge domain to ground the AI's responses.
- **FR-08:** System enriches the AI system prompt with specific domain facts.
- **FR-09:** User can visualize and define ontology concepts and relationships.
- **FR-10:** AI responses are automatically tagged with relevant ontology concepts.
- **FR-11:** User can toggle Fact Verification to validate AI claims against the ontology.
- **FR-12:** User can export ontology structures as structured JSON files.

---

## Non-Functional Requirements

- **NFR-01:** Total AI response time < 3 seconds despite ontology lookups.
- **NFR-02:** Automated test suite with 90%+ core logic coverage (Vitest).
- **NFR-03:** Application runs as a native desktop app via Electron.
- **NFR-04:** Interface is responsive across desktop window sizes.
- **NFR-05:** All API keys are securely managed via environment variables (.env).
- **NFR-06:** Ontology lookups and prompt building complete in < 500ms.
- **NFR-07:** Domain knowledge persists across sessions via localStorage.

---

## Timeline Overview

```
 Sprint 1 (Feb 1 – Mar 5)          Sprint 2 (Mar 15 – Apr 25)
 ─────────────────────────          ──────────────────────────────
 Feb 1  │ IPC & Groq Setup         Mar 15 │ Knowledge Panel (D3)
 Feb 8  │ Domain Definitions        Mar 22 │ Domain Builder CRUD
 Feb 15 │ Prompt Enrichment         Mar 29 │ Fact Verification
 Feb 22 │ Domain Selector & Tags    Apr 5  │ Knowledge Export
 Mar 1  │ Testing (Vitest)          Apr 12 │ Full Project Testing
                                    Apr 19 │ Polish & Demo Prep
```
