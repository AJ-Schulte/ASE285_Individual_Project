import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ontologyReducer from '../ontologySlice';
import DomainSelector from '../Dashboard/DomainSelector/DomainSelector';
import React from 'react';

// Simplified store for testing
const createTestStore = () => configureStore({
    reducer: {
        ontology: ontologyReducer
    }
});

describe('DomainSelector', () => {
    it('renders with default selected domain', () => {
        const store = createTestStore();
        render(
            <Provider store={store}>
                <DomainSelector />
            </Provider>
        );

        expect(screen.getByText('Knowledge Domain:')).toBeInTheDocument();
        expect(screen.getByDisplayValue('General Assistant')).toBeInTheDocument();
    });

    it('changes domain on user selection', () => {
        const store = createTestStore();
        render(
            <Provider store={store}>
                <DomainSelector />
            </Provider>
        );

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'software-engineering' } });

        expect(screen.getByDisplayValue('Software Engineering')).toBeInTheDocument();
        expect(screen.getByText(/Expertise in system design/)).toBeInTheDocument();
        expect(store.getState().ontology.selectedDomainId).toBe('software-engineering');
    });
});
