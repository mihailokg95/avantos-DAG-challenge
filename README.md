# Prefill Mapping Challenge

## Overview

This project implements a dynamic prefill system for forms based on a Directed graph (assumed acyclic, but traversal is guarded against cycles using a visited set).

Users can map fields of a selected form to data coming from:

* Upstream forms (direct and transitive dependencies)
* Global data sources

The system is designed with extensibility in mind, allowing new data sources to be added without modifying existing logic.

---

## Tech Stack

* React + TypeScript
* Vite
* Tailwind CSS
* Vitest + Testing Library

---

## How to Run Locally

### 1. Start mock server

```bash
git clone https://github.com/mosaic-avantos/frontendchallengeserver.git
cd frontendchallengeserver
npm start
```

Server runs on:

```
http://localhost:3000
```

---

### 2. Start frontend

```bash
npm install
npm run dev
```

---

### 3. Run tests

```bash
npm run test
```

---

## Architecture

The project follows a clean separation of concerns:

```
src/
├── api/               # API calls
├── components/        # UI components
├── features/          # Features
├── domain/            # Business logic (prefill, providers)
├── lib/               # Utilities
├── types/             # TypeScript types
```

---

## Data Source Architecture (Key Part)

The system uses a **Provider (Strategy) Pattern**.

Each data source implements a common interface:

```ts
interface PrefillSourceProvider {
  type: string;
  getOptions(params): PrefillGroup[];
}
```

### Implemented providers:

* Form fields provider (upstream forms)
* Global data provider

---

## Adding a New Data Source

1. Create a new provider:

```ts
export const myProvider: PrefillSourceProvider = {
  type: "my-source",
  getOptions(params) {
    return [
      {
        groupLabel: "My Source",
        options: [
          { label: "Example", value: {...} }
        ]
      }
    ];
  },
};
```

2. Register it:

```ts
const providers = [
  formFieldProvider,
  globalProvider,
  myProvider,
];
```

No other code changes are required.

---

## DAG Traversal

We use **DFS (Depth-First Search)** to resolve transitive dependencies between forms.

The traversal is implemented recursively and uses a `visited` set to prevent duplicate processing and guard against potential graph inconsistencies.

This approach ensures:

* All upstream dependencies (direct and transitive) are resolved
* No infinite loops in case of malformed data
* Linear time complexity relative to nodes and edges (O(V + E))

Example:

Form D depends on:

* Direct: Form B
* Transitive: Form A

---
## Prefill Resolution Flow

1. User selects a form
2. System resolves upstream dependencies via DFS traversal
3. Providers generate structured prefill options:
   - Form fields (from upstream forms)
   - Global data sources
4. Options are merged and displayed in a tree-based selector
5. User selects mappings which are submitted as prefill configuration


---


## Features

* Form list from API
* Prefill editor UI
* Tree-based modal for selecting prefill sources (grouped by provider and structured hierarchically)
* Search
* Keyboard support (ESC / ENTER)
* Submit mapping
* Unit + component tests

---

## Testing Strategy

* Graph traversal (unit tests)
* Providers (unit tests)
* Modal interaction (component tests)

---

## Future Improvements

* Virtualized lists for large datasets
* Server-side filtering
* Persist mapping to backend
* Drag-and-drop mapping UI

---
