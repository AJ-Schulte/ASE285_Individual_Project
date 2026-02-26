# Ontology Implementation Guide

This document provides a detailed technical explanation of how the ontology features are implemented in this project, mapping the MLOD layers to the codebase.

## 1. MLOD Layer Mapping

| MLOD Layer                      | Project Component                        | Role                                                              |
| ------------------------------- | ---------------------------------------- | ----------------------------------------------------------------- |
| **Layer 1: Configuration**      | `ontologyData.js`                        | Defines the high-level domain structure (ID, Name, Description).  |
| **Layer 2: Domain Description** | `ontologyData.js` + `ontologyService.js` | Defines concepts, relationships, and human-readable domain logic. |
| **Layer 3: Formal RDF**         | (Planned for Sprint 2)                   | Formal graph representation and reasoning.                        |

## 2. Core Ontology Files

### `src/src/services/ontologyData.js`
The "Hardcoded Knowledge Base." It stores the raw data for each domain.
- **Concepts**: The "Things" in the domain (e.g., "Patient", "Algorithm").
- **Relationships**: How things connect (e.g., "Algorithm" -> "solves" -> "Problem").
- **SystemPromptExtra**: Strategic text injected into the AI system prompt to guide its behavior.

### `src/src/services/ontologyService.js`
The "Engine" of the ontology system.
- **Prompt Building**: Combines domain concepts and relationships into a structured prompt that the AI can understand.
- **Concept Tagging**: Scans AI responses for keywords defined in the ontology and flags them as structured "Tags."

### `src/src/ontologySlice.js`
The "State Manager."
- Manages which domain is currently active.
- Provides the UI with the list of available domains.

## 3. Data Flow: How it Works

1. **Selection**: User picks a domain in the `DomainSelector` UI.
2. **Injection**: When the user sends a message, `dashboardSlice` calls `ontologyService.buildSystemPrompt()`.
3. **Prompt Enrichment**: This prompt is prepended to the AI conversation, "grounding" the AI in the domain facts.
4. **Tagging**: When the AI responds, the system scans the text for concepts using `ontologyService.extractConceptTags()`.
5. **Rendering**: Matched tags are stored with the message and displayed as pills in the chat UI.
