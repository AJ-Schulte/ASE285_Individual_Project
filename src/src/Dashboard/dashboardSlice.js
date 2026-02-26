import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { sendMessageToAI } from "../services/openaiService";
import { buildSystemPrompt, extractConceptTags } from "../services/ontologyService";

// Async thunk to send message and get AI response
export const sendConversationMessage = createAsyncThunk(
  'dashboard/sendMessage',
  async ({ message, conversationId, conversationMessages, domainId }) => {
    // 1. Build ground-truth system message from ontology
    const systemPrompt = buildSystemPrompt(domainId);

    // 2. Build message history for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    conversationMessages.forEach(m => {
      // Avoid duplicating the message that was just added to the store
      if (m.id !== message.id) {
        messages.push({
          role: m.aiMessage ? 'assistant' : 'user',
          content: m.content
        });
      }
    });

    // Add new user message
    messages.push({ role: 'user', content: message.content });

    console.log("Sending to AI with Ontology context:", messages);

    // 3. Get AI response
    const aiContent = await sendMessageToAI(messages);

    // 4. Extract concept tags from the response
    const conceptTags = extractConceptTags(aiContent, domainId);

    const aiMessage = {
      content: aiContent,
      id: uuid(),
      aiMessage: true,
      conceptTags: conceptTags,
    };

    return { message, aiMessage, conversationId };
  }
);

const initialState = {
  conversations: [],
  selectedConversationId: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSelectedConversationId: (state, action) => {
      state.selectedConversationId = action.payload;
    },
    addMessage: (state, action) => {
      const { message, conversationId } = action.payload;
      const conversation = state.conversations.find(
        (c) => c.id === conversationId
      );

      if (conversation) {
        conversation.messages.push(message);
      } else {
        state.conversations.push({
          id: conversationId,
          messages: [message],
        });
      }
    },
    deleteConversations: (state) => {
      state.conversations = [];
      state.selectedConversationId = null;
    },
    loadConversations: (state) => {
      // Load conversations from localStorage
      const saved = localStorage.getItem('conversations');
      if (saved) {
        state.conversations = JSON.parse(saved);
      }
    },
    saveConversations: (state) => {
      // Save conversations to localStorage
      localStorage.setItem('conversations', JSON.stringify(state.conversations));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendConversationMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendConversationMessage.fulfilled, (state, action) => {
        const { message, aiMessage, conversationId } = action.payload;
        const conversation = state.conversations.find(c => c.id === conversationId);

        if (conversation) {
          conversation.messages.push(aiMessage);
        }

        state.loading = false;

        // Save to localStorage
        localStorage.setItem('conversations', JSON.stringify(state.conversations));
      })
      .addCase(sendConversationMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;

        // Add error message to conversation
        const { conversationId } = action.meta.arg;
        const conversation = state.conversations.find(c => c.id === conversationId);

        if (conversation) {
          conversation.messages.push({
            content: `AI Error: ${action.error.message || "Sorry, I couldn't process your message. Please try again."}`,
            id: uuid(),
            aiMessage: true,
            error: true,
          });
        }
      });
  },
});

export const {
  setSelectedConversationId,
  addMessage,
  deleteConversations,
  loadConversations,
  saveConversations,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
