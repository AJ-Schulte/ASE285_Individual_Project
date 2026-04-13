import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock D3 (required because Dashboard renders KnowledgePanel which imports d3)
vi.mock('d3', () => {
    const createChainMock = () => {
        const mock = {};
        ['attr', 'style', 'text', 'on', 'append', 'selectAll', 'select',
         'data', 'enter', 'call', 'remove'].forEach((m) => {
            mock[m] = vi.fn(() => mock);
        });
        return mock;
    };
    return {
        select: vi.fn(() => createChainMock()),
        forceSimulation: vi.fn(() => ({
            force: vi.fn().mockReturnThis(), on: vi.fn().mockReturnThis(),
            alphaTarget: vi.fn().mockReturnThis(), restart: vi.fn().mockReturnThis(), stop: vi.fn(),
        })),
        forceLink: vi.fn(() => ({ id: vi.fn().mockReturnThis(), distance: vi.fn().mockReturnThis() })),
        forceManyBody: vi.fn(() => ({ strength: vi.fn().mockReturnThis() })),
        forceCenter: vi.fn(),
        forceCollide: vi.fn(() => ({ radius: vi.fn().mockReturnThis() })),
        scaleOrdinal: vi.fn(() => ({ domain: vi.fn().mockReturnThis(), range: vi.fn(() => vi.fn(() => '#6366f1')) })),
        drag: vi.fn(() => ({ on: vi.fn().mockReturnThis() })),
        zoom: vi.fn(() => ({ scaleExtent: vi.fn().mockReturnThis(), on: vi.fn().mockReturnThis() })),
    };
});

import Dashboard from '../../Dashboard/Dashboard';
import dashboardReducer from '../../Dashboard/dashboardSlice';
import ontologyReducer from '../../ontologySlice';

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
        // Mock scrollIntoView (not available in jsdom)
        Element.prototype.scrollIntoView = vi.fn();
    });

    it('successfully sends a message in a conversation', () => {
        render(
            <Provider store={createFullStore()}>
                <Dashboard />
            </Provider>
        );

        // 0. Create a new conversation first (required to show DomainSelector & input)
        fireEvent.click(screen.getByText('New Chat'));

        // 1. Select Software Engineering Domain
        const selector = screen.getByRole('combobox');
        fireEvent.change(selector, { target: { value: 'software-engineering' } });

        // 2. Verify domain changed
        expect(screen.getByDisplayValue('Software Engineering')).toBeInTheDocument();

        // 3. Type a message
        const input = screen.getByPlaceholderText(/Send a message/i);
        fireEvent.change(input, { target: { value: 'What is a singleton?' } });
        expect(input.value).toBe('What is a singleton?');

        // 4. Click the send icon container
        const sendIcon = document.querySelector('.new_message_icon_container');
        fireEvent.click(sendIcon);

        // 5. Verify the user message appears in the chat
        const messageElements = screen.getAllByText('What is a singleton?');
        expect(messageElements.length).toBeGreaterThanOrEqual(1);
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
        
        // Verify the modal content is rendered (domain list visible)
        const generalEntries = screen.getAllByText('General Assistant');
        expect(generalEntries.length).toBeGreaterThanOrEqual(1);
    });
});
