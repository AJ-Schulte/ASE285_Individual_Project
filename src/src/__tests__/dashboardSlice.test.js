import { describe, it, expect, vi } from 'vitest';
import dashboardReducer, { addMessage, setSelectedConversationId } from '../Dashboard/dashboardSlice';

describe('dashboardSlice', () => {
    const initialState = {
        conversations: [],
        selectedConversationId: null,
        loading: false,
        error: null,
    };

    it('should handle initial state', () => {
        expect(dashboardReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setSelectedConversationId', () => {
        const actual = dashboardReducer(initialState, setSelectedConversationId('123'));
        expect(actual.selectedConversationId).toBe('123');
    });

    it('should handle addMessage for existing conversation', () => {
        const stateWithConvo = {
            ...initialState,
            conversations: [{ id: '123', messages: [] }]
        };
        const message = { content: 'hello', id: 'm1', aiMessage: false };
        const actual = dashboardReducer(stateWithConvo, addMessage({ conversationId: '123', message }));
        expect(actual.conversations[0].messages).toHaveLength(1);
        expect(actual.conversations[0].messages[0]).toEqual(message);
    });

    it('should create new conversation if addMessage target does not exist', () => {
        const message = { content: 'hello', id: 'm1', aiMessage: false };
        const actual = dashboardReducer(initialState, addMessage({ conversationId: '123', message }));
        expect(actual.conversations).toHaveLength(1);
        expect(actual.conversations[0].id).toBe('123');
        expect(actual.conversations[0].messages[0]).toEqual(message);
    });
});
