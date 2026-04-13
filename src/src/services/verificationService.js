import { getDomainById } from "./ontologyService";

/**
 * Splits text into sentences using common delimiters.
 * Handles periods, exclamation marks, question marks, and newlines.
 */
export const splitIntoSentences = (text) => {
  if (!text) return [];

  // Split on sentence-ending punctuation followed by space or end of string,
  // or on newlines separating distinct lines.
  const raw = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return raw;
};

/**
 * Checks whether a single sentence references any known concept or 
 * relationship triplet from the given domain.
 * 
 * Returns { sentence, verified, level, matchedConcepts, matchedRelationships }
 * level: 'none' | 'concept' | 'relationship'
 */
export const verifySentence = (sentence, domain) => {
  if (!domain || ((!domain.concepts || domain.concepts.length === 0) && (!domain.relationships || domain.relationships.length === 0))) {
    return { sentence, verified: false, level: 'none', matchedConcepts: [], matchedRelationships: [] };
  }

  const lowerSentence = sentence.toLowerCase();
  const matchedConcepts = [];
  const matchedRelationships = [];

  // 1. Check concepts
  domain.concepts.forEach((concept) => {
    if (lowerSentence.includes(concept.name.toLowerCase())) {
      matchedConcepts.push(concept.name);
    }
  });

  // 2. Check for Relationship Triplets (Subject - Predicate - Object)
  // A triplet is matched if both subject and object are mentioned.
  // We prioritize this as 'relationship' level verification.
  domain.relationships.forEach((rel) => {
    const hasSubject = lowerSentence.includes(rel.subject.toLowerCase());
    const hasObject = lowerSentence.includes(rel.object.toLowerCase());
    
    if (hasSubject && hasObject) {
      // If subject/object aren't in concepts list, add them to matchedConcepts for the badge
      if (!matchedConcepts.includes(rel.subject)) matchedConcepts.push(rel.subject);
      if (!matchedConcepts.includes(rel.object)) matchedConcepts.push(rel.object);

      // Check if predicate is also mentioned (even partially)
      const hasPredicate = lowerSentence.includes(rel.predicate.toLowerCase());
      
      matchedRelationships.push({
        ...rel,
        fullMatch: hasPredicate
      });
    } else if (hasSubject || hasObject) {
      // Partial concept match from relationship
      const name = hasSubject ? rel.subject : rel.object;
      if (!matchedConcepts.includes(name)) matchedConcepts.push(name);
    }
  });

  const hasRelationship = matchedRelationships.length > 0;
  const hasConcept = matchedConcepts.length > 0;

  return {
    sentence,
    verified: hasRelationship || hasConcept,
    level: hasRelationship ? 'relationship' : (hasConcept ? 'concept' : 'none'),
    matchedConcepts,
    matchedRelationships,
  };
};

/**
 * Verifies all claims in a response text against the ontology for the given domain.
 */
export const verifyClaims = (responseText, domainId) => {
  if (!responseText) return [];

  const domain = getDomainById(domainId);

  if (!domain || domain.id === "general") {
    return [];
  }

  const sentences = splitIntoSentences(responseText);
  return sentences.map((sentence) => verifySentence(sentence, domain));
};
