import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Message from '../Dashboard/Chat/Message';

describe('Message', () => {
    it('renders user message correctly', () => {
        render(<Message content="Hello" aiMessage={false} />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('renders AI message correctly', () => {
        render(<Message content="I am AI" aiMessage={true} />);
        expect(screen.getByText('I am AI')).toBeInTheDocument();
    });

    it('renders concept verification badge', () => {
        const results = [{
            sentence: 'This is a concept.',
            verified: true,
            level: 'concept',
            matchedConcepts: ['Logic']
        }];
        render(<Message content="This is a concept." aiMessage={true} verificationResults={results} />);
        
        expect(screen.getByText('✅')).toBeInTheDocument();
        expect(screen.getByText('This is a concept.')).toBeInTheDocument();
    });

    it('renders relationship verification badge', () => {
        const results = [{
            sentence: 'A is related to B.',
            verified: true,
            level: 'relationship',
            matchedRelationships: [{ subject: 'A', predicate: 'related to', object: 'B' }]
        }];
        render(<Message content="A is related to B." aiMessage={true} verificationResults={results} />);
        
        expect(screen.getByText('🛡️')).toBeInTheDocument();
        expect(screen.getByText('A is related to B.')).toBeInTheDocument();
    });

    it('shows tooltip on hover', () => {
        const results = [{
            sentence: 'Fact.',
            verified: true,
            level: 'concept',
            matchedConcepts: ['Truth']
        }];
        render(<Message content="Fact." aiMessage={true} verificationResults={results} />);
        
        const sentence = screen.getByText('Fact.');
        fireEvent.mouseEnter(sentence);
        
        expect(screen.getByText('Grounded in concepts: Truth')).toBeInTheDocument();
    });

    it('renders concept tags when provided', () => {
        render(<Message content="Tags" aiMessage={true} conceptTags={['Tag1', 'Tag2']} />);
        expect(screen.getByText('Tag1')).toBeInTheDocument();
        expect(screen.getByText('Tag2')).toBeInTheDocument();
    });
});
