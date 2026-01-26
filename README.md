# ASE285_Individual_Project

A full-stack ChatGPT clone built with **React** and **Node.js Express**, integrating the OpenAI API for conversational AI functionality.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js Express with WebSocket
- **AI Integration:** OpenAI ChatGPT API
- **Storage:** IndexedDB for client-side persistence

## Features

- Real-time messaging via WebSocket
- Session management with conversation history
- Multiple conversation support
- Client-side session persistence using IndexedDB

## Architecture

The application uses a WebSocket-based communication protocol:

- **session-history** – Retrieve conversation history for a session
- **conversation-message** – Send messages and receive AI responses
- **conversation-delete** – Clear conversation history
- **session-details** – Establish and sync session data
- **conversation-details** – Update conversation state