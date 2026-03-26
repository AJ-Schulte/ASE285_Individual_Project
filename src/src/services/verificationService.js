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
 * relationship term from the given domain.
 *
 * Returns { sentence, verified, matchedConcepts }
 */
export const verifySentence = (sentence, domain) => {
  if (!domain || !domain.concepts || domain.concepts.length === 0) {
    return { sentence, verified: false, matchedConcepts: [] };
  }

  const lowerSentence = sentence.toLowerCase();
  const matchedConcepts = [];

  // Check concepts
  domain.concepts.forEach((concept) => {
    if (lowerSentence.includes(concept.name.toLowerCase())) {
      matchedConcepts.push(concept.name);
    }
  });

  // Check relationship subjects / objects for additional matches
  domain.relationships.forEach((rel) => {
    if (
      lowerSentence.includes(rel.subject.toLowerCase()) &&
      !matchedConcepts.includes(rel.subject)
    ) {
      matchedConcepts.push(rel.subject);
    }
    if (
      lowerSentence.includes(rel.object.toLowerCase()) &&
      !matchedConcepts.includes(rel.object)
    ) {
      matchedConcepts.push(rel.object);
    }
  });

  return {
    sentence,
    verified: matchedConcepts.length > 0,
    matchedConcepts,
  };
};

/**
 * Verifies all claims in a response text against the ontology for the given domain.
 *
 * @param {string} responseText - The full AI response text
 * @param {string} domainId     - The active domain ID
 * @returns {Array<{ sentence: string, verified: boolean, matchedConcepts: string[] }>}
 */
export const verifyClaims = (responseText, domainId) => {
  if (!responseText) return [];

  const domain = getDomainById(domainId);

  // General domain has no ground-truth → skip verification
  if (!domain || domain.id === "general") {
    return [];
  }

  const sentences = splitIntoSentences(responseText);
  return sentences.map((sentence) => verifySentence(sentence, domain));
};
