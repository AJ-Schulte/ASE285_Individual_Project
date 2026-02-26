# Sprint 1 Retrospective & Sprint 2 Planning
**Project:** Ontology-Aware AI Knowledge Assistant
**Date:** February 26, 2026
**Individual:** AJ Schulte

---

## 📊 1. Sprint 1 Quantitative Metrics

| Metric                                 | Value      |
| -------------------------------------- | ---------- |
| **Lines of Code (LoC) Added/Modified** | ~621 lines |
| **Total Features for Sprint 1**        | 3          |
| **Features Completed**                 | 3 (100%)   |
| **Total Requirements for Sprint 1**    | 5          |
| **Requirements Completed**             | 5 (100%)   |
| **Burndown Rate (Features/Reqs)**      | **100%**   |

---

## ✅ 2. What Went Well

*   **Technology Migration**: Successfully shifted from a paid OpenAI model to a free **Groq** tier without losing functionality, ensuring the project remains cost-effective.
*   **Architecture Stability**: Refactored the app to use Electron's **Main Process** for API calls, resolving browser sandbox restrictions.
*   **Automated Testing**: Integrated **Vitest** and wrote 17 tests, providing a solid safety net for future development.
*   **UI Polish**: Achieved a clean, "locked" 100vh layout that prevents unnecessary scrolling.

---

## ⚠️ 3. What Went Wrong (Challenges)

*   **External Service Deprecation**: The original Groq model was decommissioned mid-sprint, requiring an emergency `.env` update.
*   **Generic Error Reporting**: Initial error messages were too vague, making it difficult to diagnose model support issues.

---

## 🔍 4. Analysis & Improvement Plan

Moving forward, the architecture is modular and ready for growth. The biggest risk is external API stability.
**Improvement Plan:**
- Implement more descriptive UI-based error handling for the AI service.
- Maintain a separate mock-service for testing when APIs are down.

---

## 🎯 5. Individual Sprint 2 Goals

- **Interactive Knowledge Panel**: Build a visual graph side panel using MLOD Layer 2/3 data (Concepts & Relationships).
- **Low-Code Domain Builder**: Implement a form-based UI for users to create and edit their own ontologies without technical knowledge.
- **Fact Verification & Hallucination Warnings**: Add logic to verify AI claims against the ontology and flag unverified statements.

---

##  6. Individual Sprint 2 Metrics

- **Number of team features planned for this sprint**: **4**
  - (Knowledge Panel, Domain Builder, Fact Verification Mode, Knowledge Export)
- **Number of team requirements planned for this sprint**: **5**
  - (FR-09, FR-11, FR-12, NFR-01 polish, NFR-04 responsiveness)

---

## 📅 7. Updated Individual Timeline and Milestones

- **Week 1**: Implement Visual Knowledge Panel (D3.js or react-force-graph Integration).
- **Week 2**: Build Domain Builder UI and Redux state for user-defined ontologies (MLOD Layer 1).
- **Week 3**: Implement Fact Verification Logic and "Hallucination Warning" UI indicators.
- **Week 4**: Implement Knowledge Export (JSON), final bug fixes, UI/UX polish, and final documentation.

---

## 🔄 8. Any Additional Changes from the Initial Plan

- **Free Tier Focus**: Formally committed to Groq/OpenRouter compatibility to allow the project to be run without a paid API subscription.
- **Test-Driven Foundation**: Added Vitest as a core requirement for all new logic, which was not in the original scope.

---

## 📌 9. Key Individual Dates

- **Individual milestones**:
  - **Mar 5**: Visual Knowledge Panel Prototype
  - **Mar 12**: Domain Builder CRUD complete
  - **Mar 19**: Fact Verification Logic stable
  - **Mar 26**: Final Project Handover/Demo
