/**
 * MLOD Layer 1 & 2: Domain Data Definitions
 * This file acts as our local knowledge base.
 */

export const domains = [
  {
    id: "general",
    name: "General Assistant",
    description: "Standard AI chat without domain-specific grounding.",
    concepts: [],
    relationships: [],
    systemPromptExtra: "You are a helpful general-purpose AI assistant.",
  },
  {
    id: "software-engineering",
    name: "Software Engineering",
    description: "Expertise in system design, algorithms, and clean code.",
    concepts: [
      { name: "Singleton", description: "Ensures a class has only one instance." },
      { name: "DRY", description: "Don't Repeat Yourself - minimizing repetition of patterns." },
      { name: "SOLID", description: "Five design principles for understandable, flexible software." },
      { name: "Technical Debt", description: "The implied cost of additional rework caused by choosing an easy solution now." },
    ],
    relationships: [
      { subject: "Clean Code", predicate: "reduces", object: "Technical Debt" },
      { subject: "Design Patterns", predicate: "implement", object: "SOLID" },
      { subject: "Refactoring", predicate: "improves", object: "Maintainability" },
    ],
    systemPromptExtra: "Always prioritize maintainability, security, and scalability. Use standardized software engineering terminology.",
  },
  {
    id: "medical",
    name: "Medical / Health",
    description: "Focus on anatomical concepts and medical evidence.",
    concepts: [
      { name: "Diagnosis", description: "The identification of the nature of an illness." },
      { name: "Prognosis", description: "The likely course of a disease." },
      { name: "Pathogen", description: "A bacterium, virus, or other microorganism that can cause disease." },
    ],
    relationships: [
      { subject: "Symptoms", predicate: "lead to", object: "Diagnosis" },
      { subject: "Treatment", predicate: "addresses", object: "Pathogen" },
    ],
    systemPromptExtra: "You are a medically-grounded assistant. Use precise terminology and emphasize evidence-based findings. (Note: Always advise consulting a professional).",
  },
];
