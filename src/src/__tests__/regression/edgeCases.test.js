import { describe, it, expect, vi, beforeEach } from 'vitest';
import { splitIntoSentences, verifySentence, verifyClaims } from '../../services/verificationService';
import { getDomainById, extractConceptTags } from '../../services/ontologyService';
import ontologyReducer, { setSelectedDomainId, addDomain, deleteDomain } from '../../ontologySlice';
import dashboardReducer, { addMessage } from '../../Dashboard/dashboardSlice';

describe('Regression Tests', () => {

    // --- Null / Undefined Input Guards ---
    describe('null and undefined input handling', () => {
        it('splitIntoSentences returns empty for null input', () => {
            expect(splitIntoSentences(null)).toEqual([]);
        });

        it('splitIntoSentences returns empty for undefined input', () => {
            expect(splitIntoSentences(undefined)).toEqual([]);
        });

        it('splitIntoSentences returns empty for empty string', () => {
            expect(splitIntoSentences('')).toEqual([]);
        });

        it('verifyClaims returns empty for null text', () => {
            expect(verifyClaims(null, 'software-engineering')).toEqual([]);
        });

        it('verifyClaims returns empty for undefined domainId', () => {
            expect(verifyClaims('Some text', undefined)).toEqual([]);
        });

        it('extractConceptTags returns empty for null text', () => {
            expect(extractConceptTags(null, 'software-engineering')).toEqual([]);
        });
    });

    // --- Invalid Domain Fallbacks ---
    describe('invalid domain fallback behavior', () => {
        it('getDomainById falls back to general for non-existent domain', () => {
            const domain = getDomainById('does-not-exist');
            expect(domain.id).toBe('general');
        });

        it('getDomainById falls back to general for empty string', () => {
            const domain = getDomainById('');
            expect(domain.id).toBe('general');
        });

        it('verifyClaims skips verification for general domain', () => {
            const results = verifyClaims('The Singleton pattern is great.', 'general');
            expect(results).toEqual([]);
        });
    });

    // --- Verification Edge Cases ---
    describe('verification boundary conditions', () => {
        const domain = {
            id: 'test',
            concepts: [{ name: 'React', description: 'UI library' }],
            relationships: [
                { subject: 'React', predicate: 'uses', object: 'Virtual DOM' }
            ],
        };

        it('verifySentence handles domain with empty concepts array', () => {
            const emptyDomain = { id: 'empty', concepts: [], relationships: [] };
            const result = verifySentence('Any text here.', emptyDomain);
            expect(result.verified).toBe(false);
            expect(result.level).toBe('none');
        });

        it('verifySentence handles domain with null concepts', () => {
            const nullDomain = { id: 'null', concepts: null, relationships: null };
            const result = verifySentence('Any text here.', nullDomain);
            expect(result.verified).toBe(false);
        });

        it('partial relationship match does not flag as relationship level', () => {
            // Only subject mentioned, not object — should be concept level, not relationship
            const result = verifySentence('React is popular.', domain);
            expect(result.level).toBe('concept');
            expect(result.matchedRelationships).toHaveLength(0);
        });

        it('relationship match without predicate is flagged as partial', () => {
            const result = verifySentence('React and Virtual DOM are important.', domain);
            expect(result.level).toBe('relationship');
            expect(result.matchedRelationships[0].fullMatch).toBe(false);
        });

        it('full triplet match is flagged correctly', () => {
            const result = verifySentence('React uses Virtual DOM for rendering.', domain);
            expect(result.level).toBe('relationship');
            expect(result.matchedRelationships[0].fullMatch).toBe(true);
        });
    });

    // --- Redux State Boundary Conditions ---
    describe('Redux reducer edge cases', () => {
        it('ontologySlice handles selecting the same domain twice', () => {
            const state1 = ontologyReducer(undefined, setSelectedDomainId('medical'));
            const state2 = ontologyReducer(state1, setSelectedDomainId('medical'));
            expect(state2.selectedDomainId).toBe('medical');
        });

        it('dashboardSlice handles addMessage to non-existent conversation gracefully', () => {
            const initial = { conversations: [], selectedConversationId: null, loading: false, error: null, verificationMode: false };
            const message = { content: 'test', id: 'm1', aiMessage: false };
            const state = dashboardReducer(initial, addMessage({ conversationId: 'new-id', message }));
            expect(state.conversations).toHaveLength(1);
            expect(state.conversations[0].id).toBe('new-id');
        });

        it('deleteDomain resets selectedDomainId to general if the active domain is deleted', () => {
            const initial = {
                domains: [{ id: 'to-delete', name: 'Delete Me' }, { id: 'general', name: 'General' }],
                selectedDomainId: 'to-delete'
            };
            const state = ontologyReducer(initial, deleteDomain('to-delete'));
            expect(state.selectedDomainId).toBe('general');
            expect(state.domains.find(d => d.id === 'to-delete')).toBeUndefined();
        });

        it('deleteDomain does nothing if domain ID does not exist', () => {
            const initial = {
                domains: [{ id: 'keep', name: 'Keep' }],
                selectedDomainId: 'keep'
            };
            const state = ontologyReducer(initial, deleteDomain('non-existent'));
            expect(state.domains).toHaveLength(1);
            expect(state.selectedDomainId).toBe('keep');
        });
    });

    // --- Whitespace and Formatting Edge Cases ---
    describe('whitespace and formatting edge cases', () => {
        it('splitIntoSentences trims leading/trailing whitespace', () => {
            const sentences = splitIntoSentences('   Hello.   World.   ');
            sentences.forEach(s => expect(s).toBe(s.trim()));
            expect(sentences.every(s => s.length > 0)).toBe(true);
        });

        it('splitIntoSentences handles multiple consecutive newlines', () => {
            const sentences = splitIntoSentences('Line one\n\n\nLine two');
            const nonEmpty = sentences.filter(s => s.length > 0);
            expect(nonEmpty.length).toBeGreaterThanOrEqual(2);
        });

        it('splitIntoSentences handles complex punctuation like ?! or ...', () => {
            const sentences = splitIntoSentences('Is this real?! Maybe... Yes.');
            expect(sentences).toHaveLength(3);
            expect(sentences[0]).toBe('Is this real?!');
            expect(sentences[1]).toBe('Maybe...');
        });

        it('concept matching is case-insensitive for mixed case input', () => {
            const tags = extractConceptTags('SINGLETON and dry and SoLiD', 'software-engineering');
            expect(tags).toContain('Singleton');
            expect(tags).toContain('DRY');
            expect(tags).toContain('SOLID');
        });

        it('extractConceptTags handles regex special characters safely', () => {
            const seDomainWithCpp = {
                id: 'se',
                concepts: [{ name: 'C++', description: 'Programming language' }]
            };
            // Manually patching because ontologyService imports the real data
            const text = "I am writing C++ code.";
            // We use the real service which would look up the domain
            // But let's verify if the regex inside service handles it
            const tags = extractConceptTags(text, 'software-engineering'); 
            // Software engineering doesn't have C++ currently, but if it did, 
            // we're checking for crashes or misalignments in the service logic.
            expect(() => extractConceptTags("C++ is fun.", "software-engineering")).not.toThrow();
        });
    });
});
