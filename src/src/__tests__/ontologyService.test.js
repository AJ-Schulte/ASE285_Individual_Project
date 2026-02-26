import { describe, it, expect } from 'vitest';
import { getDomains, getDomainById, buildSystemPrompt, extractConceptTags } from '../services/ontologyService';

describe('ontologyService', () => {
    describe('getDomains', () => {
        it('should return an array of domains', () => {
            const domains = getDomains();
            expect(Array.isArray(domains)).toBe(true);
            expect(domains.length).toBeGreaterThan(0);
        });
    });

    describe('getDomainById', () => {
        it('should return the correct domain for a valid ID', () => {
            const domain = getDomainById('software-engineering');
            expect(domain.name).toBe('Software Engineering');
        });

        it('should return the default domain for an invalid ID', () => {
            const domain = getDomainById('invalid-id');
            expect(domain.id).toBe('general');
        });
    });

    describe('buildSystemPrompt', () => {
        it('should build a simple prompt for general domain', () => {
            const prompt = buildSystemPrompt('general');
            expect(prompt).toContain('helpful general-purpose AI assistant');
        });

        it('should build a grounded prompt for software engineering', () => {
            const prompt = buildSystemPrompt('software-engineering');
            expect(prompt).toContain('Software Engineering');
            expect(prompt).toContain('Singleton');
            expect(prompt).toContain('DRY');
            expect(prompt).toContain('Clean Code reduces Technical Debt');
        });
    });

    describe('extractConceptTags', () => {
        it('should extract tags from software engineering text', () => {
            const text = "I am using a Singleton to ensure DRY principles and avoid Technical Debt.";
            const tags = extractConceptTags(text, 'software-engineering');
            expect(tags).toContain('Singleton');
            expect(tags).toContain('DRY');
            expect(tags).toContain('Technical Debt');
        });

        it('should be case-insensitive', () => {
            const text = "singleton is a pattern.";
            const tags = extractConceptTags(text, 'software-engineering');
            expect(tags).toContain('Singleton');
        });

        it('should return empty for general domain', () => {
            const text = "Any text here.";
            const tags = extractConceptTags(text, 'general');
            expect(tags).toEqual([]);
        });
    });
});
