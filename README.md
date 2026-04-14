# Prefill Mapping Challenge

## Overview

This project implements a dynamic prefill system for forms based on a DAG (Directed Acyclic Graph).

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

We use BFS traversal to resolve transitive dependencies.

Example:

Form D depends on:

* Direct: Form B
* Transitive: Form A

---

## Features

* Form list from API
* Prefill editor UI
* Tree-based modal
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
