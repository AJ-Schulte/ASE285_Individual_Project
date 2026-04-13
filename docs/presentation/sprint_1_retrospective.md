---
marp: true
size: 16:9
paginate: true
title: Sprint 1 Retrospective - Chat GPT Clone Ontology Ver.
theme: default
backgroundColor: white
---

# Chat GPT Clone - Ontology Ver.
## Sprint 1 Individual Project Report

**Ontology-Aware AI Knowledge Assistant**

ASE285 – Software Engineering

---

## Sprint 1 Retrospective

- **Number of individual features completed:** __6__
- **Number of individual requirements completed:** __15__
- **Individual burndown rate (%):** __100__

---

## Sprint 1 Features Delivered (Feb 1 – Mar 5, 2026)

| Feature                         | Date     | Requirements                  |
| ------------------------------- | -------- | ----------------------------- |
| Electron IPC & Groq Integration | Feb 1    | FR-01, FR-05, FR-06, NFR-03   |
| Conversation Management         | Feb 8    | FR-02, FR-03, FR-04           |
| MLOD Domain Definitions         | Feb 8    | FR-07, NFR-05, NFR-07         |
| Ontology-Grounded Prompts       | Feb 15   | FR-08, NFR-06                 |
| Domain Selector & Concept Tags  | Feb 22   | FR-07, FR-10, NFR-04          |
| Automated Testing (Vitest)      | Mar 1    | NFR-02                        |

---

### What Went Wrong:
- External Groq model was decommissioned mid-sprint, requiring an emergency `.env` update
- Initial error messages were too vague to diagnose model support issues

### What Went Well:
- Shifted from paid OpenAI to free Groq tier without losing functionality
- Refactored app to use Electron Main Process for API calls (resolving sandbox restrictions)
- Integrated Vitest with 17 passing tests
- Achieved clean, locked 100vh layout

---

### Analysis & Improvement Plan:
- Implement more descriptive UI-based error handling for the AI service
- Maintain a separate mock-service for testing when APIs are down
- Architecture is modular and ready for Sprint 2 feature growth

---

### Sprint 2 Goals

- Implement Interactive Knowledge Panel with D3.js graph visualization
- Build Domain Builder CRUD modal for user-defined ontologies
- Add Fact Verification with relationship-level triplet validation
- Implement Knowledge Export to structured JSON

---

### Sprint 2 Metrics:

- **Number of individual features planned:** __6__
- **Number of individual requirements planned:** __7__

---

### Sprint 2 Features Planned (Mar 15 – Apr 25, 2026)

| Feature                            | Date     | Requirements         |
| ---------------------------------- | -------- | -------------------- |
| Interactive Knowledge Panel (D3)   | Mar 15   | FR-09, NFR-04        |
| Domain Builder (CRUD Modal)        | Mar 22   | FR-09, NFR-07        |
| Fact Verification & Hallucination  | Mar 29   | FR-11, NFR-01        |
| Knowledge Export (JSON)            | Apr 5    | FR-12                |
| Full Project Testing               | Apr 12   | NFR-02               |
| UI/UX Polish & Final Docs         | Apr 19   | NFR-04               |

---

### Updated Timeline:

- **Week 1:** Implement Knowledge Panel (D3.js force-directed graph)
- **Week 2:** Build Domain Builder CRUD modal + Redux state
- **Week 3:** Implement Fact Verification logic + Hallucination Warnings UI
- **Week 4:** Implement Knowledge Export (JSON) via Electron native save dialog
- **Week 5:** Full project testing (58+ tests) + UI/UX polish
- **Week 6:** Final documentation and demo prep
