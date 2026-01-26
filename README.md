# ASE285_Individual_Project

A full-stack ChatGPT clone built with **React** and **Node.js Express**, integrating the OpenAI API for conversational AI functionality.

## 1. Project Title and Description
**ChatGPT Clone** is a real-time conversational AI application. It replicates the core functionality of ChatGPT, allowing users to interact with the OpenAI API through a modern web interface. The project is built using **React**, **Node.js Express**, and **WebSockets**, with a strong focus on mastering these technologies during development.

## 2. Problem Domain
In the rapidly evolving field of AI, there is a constant need for intuitive and responsive user interfaces that can bridge the gap between complex AI models and end-users. Accessing AI through command-line interfaces or raw API calls is not ideal for the general public.


## 3. Features and Requirements
### Features
- **Sprint 1 (Technology Understanding):**
    - Real-time messaging via WebSockets.
    - Basic AI response generation using OpenAI API.
    - Simple conversation history stored locally.
    - Multi-conversation support (creating and switching chats).
- **Sprint 2 (Non-Trivial Implementation):**
    - Dark/Light mode implementation for UX enhancement.
    - Markdown rendering for chat messages (rich text).
    - Code syntax highlighting for technical conversations.
    - Exporting conversation history to files.
    - Renaming and managing existing chat sessions.

### Requirements
- **Functional**: Users must be able to send/receive messages, persist history, and manage multiple chat sessions.
- **Non-Functional**: The application should have < 3s response times, handle WebSocket reconnections gracefully, and be responsive across devices.

## 4. Data Model and Architecture
### Architecture
The application follows a client-server architecture using WebSockets for bidirectional communication:
- **Frontend**: React-based UI that handles user input and displays chat responses.
- **Backend**: Node.js Express server that acts as a proxy between the client and the OpenAI API.
- **Storage**: IndexedDB on the client side for persistent session and conversation data.

### Data Model
- **Session**: Contains user-specific settings and a list of conversations.
- **Conversation**: Includes a unique ID, title, and a sequence of messages.
- **Message**: Consists of the sender (user/AI), timestamp, and content.

## 5. Tests
Quality assurance is managed through:
- **Manual Testing**: Verifying real-time messaging and API response accuracy.
- **Lighthouse/Performance Audits**: Ensuring responsiveness and load times meet requirements.
- **Automated Testing**: (Planned for Sprint 2) Unit and integration tests for core logic.

## 6. Team Members and Roles
- **AJ Schulte**: Individual Developer

## 7. Links
- **Code Repository**: [GitHub Repo](https://github.com/AJ-Schulte/ASE285_Individual_Project)
- **Documentation**: [Docs Folder](./docs)
- **Presentation**: [Project Presentation](./docs/presentation/ppp_individual.md)
- **Tests**: [Tests Folder](./tests)