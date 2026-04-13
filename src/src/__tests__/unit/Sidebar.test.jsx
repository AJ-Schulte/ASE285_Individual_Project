import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';
import dashboardReducer from '../../Dashboard/dashboardSlice';

const createTestStore = (initialState) => {
    return configureStore({
        reducer: {
            dashboard: dashboardReducer,
        },
        preloadedState: {
            dashboard: {
                conversations: [],
                selectedConversationId: null,
                loading: false,
                error: null,
                ...initialState
            }
        }
    });
};

describe('Sidebar', () => {
    it('renders basic sidebar elements', () => {
        render(
            <Provider store={createTestStore()}>
                <Sidebar onOpenDomainBuilder={() => {}} />
            </Provider>
        );
        expect(screen.getByText('New Chat')).toBeInTheDocument();
        expect(screen.getByText('Delete conversations')).toBeInTheDocument();
        expect(screen.getByText('Domain Builder')).toBeInTheDocument();
    });

    it('renders conversation list', () => {
        const conversations = [
            { id: '1', messages: [{ content: 'Hi' }] },
            { id: '2', messages: [{ content: 'Hello' }] }
        ];
        render(
            <Provider store={createTestStore({ conversations })}>
                <Sidebar onOpenDomainBuilder={() => {}} />
            </Provider>
        );
        expect(screen.getByText('Hi')).toBeInTheDocument();
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('triggers onOpenDomainBuilder when button is clicked', () => {
        const handleOpen = vi.fn();
        render(
            <Provider store={createTestStore()}>
                <Sidebar onOpenDomainBuilder={handleOpen} />
            </Provider>
        );
        fireEvent.click(screen.getByText('Domain Builder'));
        expect(handleOpen).toHaveBeenCalled();
    });
});
