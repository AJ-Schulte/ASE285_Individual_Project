import { domains } from "./ontologyData";

/**
 * Returns all available domains
 */
export const getDomains = () => {
    return domains;
};

/**
 * Returns a specific domain by ID
 */
export const getDomainById = (id) => {
    return domains.find((d) => d.id === id) || domains[0];
};

/**
 * Builds a system prompt based on domain ontology definitions
 */
export const buildSystemPrompt = (domainId) => {
    const domain = getDomainById(domainId);

    if (domain.id === 'general') {
        return domain.systemPromptExtra;
    }

    let prompt = `You are an expert acting in the domain of ${domain.name}. ${domain.systemPromptExtra}\n\n`;

    if (domain.concepts.length > 0) {
        prompt += "Key Concepts you are aware of:\n";
        domain.concepts.forEach(c => {
            prompt += `- ${c.name}: ${c.description}\n`;
        });
    }

    if (domain.relationships.length > 0) {
        prompt += "\nStructured Knowledge Relationships:\n";
        domain.relationships.forEach(r => {
            prompt += `- ${r.subject} ${r.predicate} ${r.object}\n`;
        });
    }

    return prompt;
};

/**
 * Extracts concept tags from AI response text based on the domain ontology
 */
export const extractConceptTags = (text, domainId) => {
    if (!text) return [];
    const domain = getDomainById(domainId);
    if (!domain || !domain.concepts) return [];

    const tags = [];
    const lowerText = text.toLowerCase();

    domain.concepts.forEach(concept => {
        // Simple substring match for MVP. Can be upgraded to Regex later.
        if (lowerText.includes(concept.name.toLowerCase())) {
            tags.push(concept.name);
        }
    });

    return tags;
};
