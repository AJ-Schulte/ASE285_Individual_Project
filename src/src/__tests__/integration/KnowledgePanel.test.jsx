import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import KnowledgePanel from '../../Dashboard/KnowledgePanel/KnowledgePanel';
import ontologyReducer from '../../ontologySlice';

// Mock D3 — chain-friendly mock that covers all methods used by KnowledgePanel
vi.mock('d3', () => {
    const createChainMock = () => {
        const mock = {};
        const methods = [
            'attr', 'style', 'text', 'on', 'append', 'selectAll', 'select',
            'data', 'enter', 'call', 'remove',
        ];
        methods.forEach((m) => {
            mock[m] = vi.fn(() => mock);
        });
        return mock;
    };

    return {
        select: vi.fn(() => createChainMock()),
        forceSimulation: vi.fn(() => ({
            force: vi.fn().mockReturnThis(),
            on: vi.fn().mockReturnThis(),
            alphaTarget: vi.fn().mockReturnThis(),
            restart: vi.fn().mockReturnThis(),
            stop: vi.fn(),
        })),
        forceLink: vi.fn(() => ({
            id: vi.fn().mockReturnThis(),
            distance: vi.fn().mockReturnThis(),
        })),
        forceManyBody: vi.fn(() => ({
            strength: vi.fn().mockReturnThis(),
        })),
        forceCenter: vi.fn(),
        forceCollide: vi.fn(() => ({
            radius: vi.fn().mockReturnThis(),
        })),
        scaleOrdinal: vi.fn(() => ({
            domain: vi.fn().mockReturnThis(),
            range: vi.fn(() => vi.fn(() => '#6366f1')),
        })),
        drag: vi.fn(() => ({
            on: vi.fn().mockReturnThis(),
        })),
        zoom: vi.fn(() => ({
            scaleExtent: vi.fn().mockReturnThis(),
            on: vi.fn().mockReturnThis(),
        })),
    };
});

const createTestStore = (selectedDomainId = 'software-engineering') => {
    return configureStore({
        reducer: {
            ontology: ontologyReducer,
            dashboard: () => ({
                selectedConversationId: null,
                conversations: [],
                loading: false,
                error: null,
                verificationMode: false,
            }),
        },
        preloadedState: {
            ontology: {
                domains: [
                    {
                        id: 'general', name: 'General Assistant', description: 'General',
                        concepts: [], relationships: [], systemPromptExtra: '',
                    },
                    {
                        id: 'software-engineering', name: 'Software Engineering', description: 'SE domain',
                        concepts: [
                            { name: 'Singleton', description: 'One instance' },
                            { name: 'DRY', description: 'Dont repeat' },
                        ],
                        relationships: [
                            { subject: 'Clean Code', predicate: 'reduces', object: 'Technical Debt' },
                        ],
                        systemPromptExtra: '',
                    },
                ],
                selectedDomainId,
            },
        },
    });
};

describe('KnowledgePanel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the toggle button', () => {
        render(
            <Provider store={createTestStore()}>
                <KnowledgePanel />
            </Provider>
        );
        expect(screen.getByTitle('Toggle Knowledge Panel')).toBeInTheDocument();
    });

    it('opens the panel on toggle click', () => {
        render(
            <Provider store={createTestStore()}>
                <KnowledgePanel />
            </Provider>
        );
        const toggle = screen.getByTitle('Toggle Knowledge Panel');
        fireEvent.click(toggle);

        // Multiple elements with this text (toggle and header)
        expect(screen.getAllByText('Knowledge Graph')[0]).toBeInTheDocument();
        expect(screen.getByText('Software Engineering')).toBeInTheDocument();
    });

    it('shows empty state for general domain', () => {
        render(
            <Provider store={createTestStore('general')}>
                <KnowledgePanel />
            </Provider>
        );
        const toggle = screen.getByTitle('Toggle Knowledge Panel');
        fireEvent.click(toggle);

        expect(screen.getByText(/No concepts defined/)).toBeInTheDocument();
    });

    it('closes panel when close button is clicked', () => {
        render(
            <Provider store={createTestStore()}>
                <KnowledgePanel />
            </Provider>
        );
        // Open
        fireEvent.click(screen.getByTitle('Toggle Knowledge Panel'));
        expect(screen.getAllByText('Knowledge Graph')[0]).toBeInTheDocument();

        // Close — the ✕ button
        fireEvent.click(screen.getByText('✕'));

        // Toggle should no longer be active
        const toggle = screen.getByTitle('Toggle Knowledge Panel');
        expect(toggle.classList.contains('kp-toggle-active')).toBe(false);
    });
});
