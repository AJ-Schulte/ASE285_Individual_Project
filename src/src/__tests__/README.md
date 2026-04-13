# Test Suite

## How to Run Tests

From the `src/` directory:

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run only unit tests
npx vitest run src/__tests__/unit

# Run only integration tests
npx vitest run src/__tests__/integration

# Run only acceptance tests
npx vitest run src/__tests__/acceptance
```

---

## Test Organization

Tests are organized into four categories:

### Unit Tests (`unit/`) — 40 tests

Isolated tests for individual functions, reducers, and components. No cross-layer dependencies.

| File                         | Tests | What it covers                                      |
| ---------------------------- | ----- | --------------------------------------------------- |
| `ontologyService.test.js`    | 8     | Domain lookup, prompt building, concept extraction   |
| `verificationService.test.js`| 16    | Sentence splitting, concept matching, triplet logic  |
| `ontologySlice.test.js`      | 3     | Redux reducer: initial state, domain selection       |
| `dashboardSlice.test.js`     | 4     | Redux reducer: conversations, messages               |
| `Message.test.jsx`           | 6     | Message rendering, verification badges, tooltips     |
| `Sidebar.test.jsx`           | 3     | Sidebar rendering, conversation list, button events  |

### Regression Tests (`regression/`) — 23 tests

Guards against bugs in edge cases, null handling, and complex logic boundaries.

| File                         | Tests | What it covers                                      |
| ---------------------------- | ----- | --------------------------------------------------- |
| `edgeCases.test.js`          | 23    | Null inputs, boundary logic, regex safety, Redux delete |

### Integration Tests (`integration/`) — 6 tests

Tests that verify multiple layers working together (Redux store + UI components).

| File                         | Tests | What it covers                                      |
| ---------------------------- | ----- | --------------------------------------------------- |
| `KnowledgePanel.test.jsx`    | 4     | Redux + D3 mock + toggle/close panel interactions    |
| `DomainSelector.test.jsx`    | 2     | Redux store updates when user selects a domain       |

### Acceptance Tests (`acceptance/`) — 12 tests

End-to-end tests that verify complete user stories and feature requirements.

| File                         | Tests | What it covers                                      |
| ---------------------------- | ----- | --------------------------------------------------- |
| `DomainBuilder.test.jsx`     | 10    | Full CRUD: create, view, edit domains + persistence  |
| `AppIntegration.test.jsx`    | 2     | Full flow: send message → conversation management    |

---

## Test Counts Summary

| Category         | Count |
| ---------------- | ----- |
| Unit             | 40    |
| Regression       | 23    |
| Integration      | 6     |
| Acceptance       | 12    |
| **Total**        | **81**|

---

## Dependencies

- **Vitest** — Test runner (configured in `vitest.config.js`)
- **React Testing Library** — Component rendering and DOM queries
- **jsdom** — Browser-like environment for component tests
