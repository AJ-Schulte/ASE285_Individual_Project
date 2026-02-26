import { describe, it, expect } from 'vitest';
import ontologyReducer, { setSelectedDomainId, loadDomains } from '../ontologySlice';

describe('ontologySlice', () => {
    const initialState = {
        domains: [],
        selectedDomainId: "general",
    };

    it('should handle initial state', () => {
        expect(ontologyReducer(undefined, { type: 'unknown' })).toEqual({
            domains: expect.any(Array),
            selectedDomainId: 'general',
        });
    });

    it('should handle setSelectedDomainId', () => {
        const actual = ontologyReducer(initialState, setSelectedDomainId('medical'));
        expect(actual.selectedDomainId).toBe('medical');
    });

    it('should handle loadDomains', () => {
        const actual = ontologyReducer(initialState, loadDomains());
        expect(actual.domains.length).toBeGreaterThan(0);
        expect(actual.domains.find(d => d.id === 'software-engineering')).toBeDefined();
    });
});
