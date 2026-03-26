import { describe, it, expect } from 'vitest';
import { splitIntoSentences, verifySentence, verifyClaims } from '../services/verificationService';

describe('verificationService', () => {
    describe('splitIntoSentences', () => {
        it('should split text on periods', () => {
            const sentences = splitIntoSentences('First sentence. Second sentence. Third.');
            expect(sentences).toHaveLength(3);
            expect(sentences[0]).toBe('First sentence.');
            expect(sentences[1]).toBe('Second sentence.');
            expect(sentences[2]).toBe('Third.');
        });

        it('should split on question marks and exclamation marks', () => {
            const sentences = splitIntoSentences('Is this right? Yes! Confirmed.');
            expect(sentences).toHaveLength(3);
        });

        it('should split on newlines', () => {
            const sentences = splitIntoSentences('Line one\nLine two\nLine three');
            expect(sentences).toHaveLength(3);
        });

        it('should return empty array for empty text', () => {
            expect(splitIntoSentences('')).toEqual([]);
            expect(splitIntoSentences(null)).toEqual([]);
        });

        it('should trim whitespace from sentences', () => {
            const sentences = splitIntoSentences('  Hello.   World.  ');
            sentences.forEach(s => expect(s).toBe(s.trim()));
        });
    });

    describe('verifySentence', () => {
        const seDomain = {
            id: 'software-engineering',
            concepts: [
                { name: 'Singleton', description: 'One instance' },
                { name: 'DRY', description: 'Dont repeat' },
                { name: 'SOLID', description: 'Design principles' },
            ],
            relationships: [
                { subject: 'Clean Code', predicate: 'reduces', object: 'Technical Debt' },
            ],
        };

        it('should verify a sentence that contains a concept', () => {
            const result = verifySentence('The Singleton pattern ensures one instance.', seDomain);
            expect(result.verified).toBe(true);
            expect(result.matchedConcepts).toContain('Singleton');
        });

        it('should be case-insensitive', () => {
            const result = verifySentence('always follow dry principles.', seDomain);
            expect(result.verified).toBe(true);
            expect(result.matchedConcepts).toContain('DRY');
        });

        it('should match relationship subjects', () => {
            const result = verifySentence('Clean Code is important for quality.', seDomain);
            expect(result.verified).toBe(true);
            expect(result.matchedConcepts).toContain('Clean Code');
        });

        it('should match relationship objects', () => {
            const result = verifySentence('Avoid Technical Debt at all costs.', seDomain);
            expect(result.verified).toBe(true);
            expect(result.matchedConcepts).toContain('Technical Debt');
        });

        it('should not verify a sentence with no concept matches', () => {
            const result = verifySentence('I like pizza.', seDomain);
            expect(result.verified).toBe(false);
            expect(result.matchedConcepts).toHaveLength(0);
        });

        it('should return unverified for domain with no concepts', () => {
            const emptyDomain = { id: 'empty', concepts: [], relationships: [] };
            const result = verifySentence('Any text here.', emptyDomain);
            expect(result.verified).toBe(false);
        });

        it('should match multiple concepts in one sentence', () => {
            const result = verifySentence('Singleton follows SOLID and DRY.', seDomain);
            expect(result.verified).toBe(true);
            expect(result.matchedConcepts).toContain('Singleton');
            expect(result.matchedConcepts).toContain('SOLID');
            expect(result.matchedConcepts).toContain('DRY');
        });
    });

    describe('verifyClaims', () => {
        it('should return empty array for general domain', () => {
            const results = verifyClaims('Some text about singletons.', 'general');
            expect(results).toEqual([]);
        });

        it('should verify claims for software engineering domain', () => {
            const text = 'The Singleton pattern is useful. Pizza is delicious.';
            const results = verifyClaims(text, 'software-engineering');
            expect(results).toHaveLength(2);
            expect(results[0].verified).toBe(true);
            expect(results[1].verified).toBe(false);
        });

        it('should return empty array for null text', () => {
            expect(verifyClaims(null, 'software-engineering')).toEqual([]);
        });

        it('should handle text with multiple verified sentences', () => {
            const text = 'Use DRY principles. Follow SOLID design.';
            const results = verifyClaims(text, 'software-engineering');
            expect(results.every(r => r.verified)).toBe(true);
        });
    });
});
