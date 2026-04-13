import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from '../Dashboard/Dashboard';
import dashboardReducer from '../Dashboard/dashboardSlice';
import ontologyReducer from '../ontologySlice';

// Helper to create a full store
const createFullStore = () => {
    return configureStore({
        reducer: {
            dashboard: dashboardReducer,
            ontology: ontologyReducer,
        }
    });
};

describe('App Integration', () => {
    beforeEach(() => {
        // Mock Electron API
        window.electron = {
            sendMessage: vi.fn(),
            saveFile: vi.fn()
        };
        // Mock localStorage
        vi.stubGlobal('localStorage', {
            getItem: vi.fn(),
            setItem: vi.fn(),
        });
    });

    it('successfully sends a message and receives a verified response', async () => {
        window.electron.sendMessage.mockResolvedValue('The Singleton pattern is a design pattern.');
        
        render(
            <Provider store={createFullStore()}>
                <Dashboard />
            </Provider>
        );

        // 1. Select Software Engineering Domain
        const selector = screen.getByRole('combobox');
        fireEvent.change(selector, { target: { value: 'software-engineering' } });

        // 2. Type and send a message
        const input = screen.getByPlaceholderText(/Type your message/i);
        fireEvent.change(input, { target: { value: 'What is a singleton?' } });
        
        const sendBtn = screen.getByRole('button', { name: /send/i });
        fireEvent.click(sendBtn);

        // 3. Verify optimistic update (user message appears)
        expect(screen.getByText('What is a singleton?')).toBeInTheDocument();

        // 4. Wait for AI response and verification
        // (Verification is enabled by default in our test state or we can toggle it)
        // Let's toggle it to be sure
        const toggle = screen.getByLabelText(/Fact Check/i);
        fireEvent.click(toggle);

        await waitFor(() => {
            expect(screen.getByText('The Singleton pattern is a design pattern.')).toBeInTheDocument();
        });

        // 5. Check if it's verified (should have the ✅ or 🛡️ icon)
        // Since "Singleton" is a concept in our software-engineering domain
        expect(screen.getByText('✅')).toBeInTheDocument();
    });

    it('shows the domain builder modal', () => {
        render(
            <Provider store={createFullStore()}>
                <Dashboard />
            </Provider>
        );

        const builderBtn = screen.getByText('Domain Builder');
        fireEvent.click(builderBtn);

        // Should see the modal title (now there are two "Domain Builder" texts: button and title)
        const titles = screen.getAllByText('Domain Builder');
        expect(titles.length).toBeGreaterThan(1);
        
        // Find "General Assistant" specifically inside the modal (it's also in the DomainSelector)
        const modal = screen.getByRole('dialog');
        expect(modal).toHaveTextContent('General Assistant');
    });
});

