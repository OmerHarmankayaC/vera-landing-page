# Vera Landing Page — Q&A Widget Integration Requirements

## Context

This repo is the Vera-Finance marketing landing page (Next.js / React / Vite stack). A separate, already-deployed project (`rag.omerharmankaya.com`) runs a RAG chatbot that answers questions about Vera-Finance. This task wires a chat widget on this landing page to that backend through a server-side proxy.

**This spec covers data flow and functional behavior only — no visual design, layout, or styling.** Component styling is handled separately by the person; do not make styling decisions, choose colors, fonts, or layout. Build the component logic and markup structurally (semantic HTML, no inline visual styling beyond what's needed for the component to function), and leave presentation to a later pass.

The backend repo cannot see this project and this project cannot see the backend repo. The **Integration Contract** section below is the shared source of truth — it is copied verbatim into both requirements files. If the shared contract needs to change, flag it explicitly in your output; do not silently diverge from it.

## Goal

1. A server-side API route in this Next.js app that proxies chat requests to the external RAG backend, without ever exposing the backend URL or shared secret to the client.
2. A client-side component that manages conversation state and calls that proxy route.

## In scope

- Next.js Route Handler at `/api/vera-qa`
- Client-side state management for a conversation (messages, loading, error states)
- Input validation (client and server side)
- Environment variables for backend URL and shared secret

## Out of scope

- Any visual design, colors, typography, spacing, or layout
- Placement decisions on the page (that's a separate design task)
- Multi-turn conversation memory sent to the backend (v1 sends `history: []`; see Integration Contract)
- Streaming/typing-effect responses (v1 is request/response)

## Functional requirements

### 1. Proxy route — `/api/vera-qa`

- Runs server-side only (Route Handler, not client code). Must never bundle the backend URL or secret into client-side JavaScript.
- Reads two environment variables:
  - `VERA_QA_BACKEND_URL` — full URL of the backend endpoint, e.g. `https://rag.omerharmankaya.com/api/external/vera-qa`
  - `VERA_QA_SHARED_SECRET` — must be set to the exact same value configured in the backend repo
- On receiving a POST request from the client:
  1. Validate `question` is present, non-empty, and ≤1000 characters. If invalid, respond `400` with `{ "error": { "code": "invalid_request", "message": "..." } }` without calling the backend.
  2. Forward the request to `VERA_QA_BACKEND_URL` with header `X-Vera-QA-Secret: <VERA_QA_SHARED_SECRET>` and body `{ "question": ..., "history": [] }`.
  3. Relay the backend's response (status code and JSON body) back to the client as-is.
  4. If the backend call fails entirely (network error, timeout), respond `500` with `{ "error": { "code": "internal_error", "message": "Something went wrong. Please try again." } }` — do not leak the backend URL or raw error details to the client.
- Suggested timeout on the outbound call to the backend: 15 seconds.

### 2. Client-side widget component

Functional behavior only (no styling):

- Maintains conversation state as an array of messages: `{ role: 'user' | 'assistant', content: string, sources?: { title: string, excerpt: string, url: string | null }[] }`
- On submit:
  - Ignore empty/whitespace-only input
  - Append the user's message to state immediately
  - Set a loading flag while awaiting the response
  - POST `{ question, history: [] }` to `/api/vera-qa`
  - On success, append an assistant message with `content = answer` and `sources = sources`
  - On error response, append an assistant-role message with a generic error string (e.g. "Something went wrong. Please try again.") — do not surface raw error codes to the user
  - Clear loading flag when the request settles (success or failure)
- No persistence across page reloads required — in-memory React state (`useState`/`useReducer`) is sufficient for v1
- Enforce the same 1000-character max length on the input client-side as a first line of defense (server still validates independently)

### 3. Environment variables

- `VERA_QA_BACKEND_URL` — set once, points at the backend's external endpoint
- `VERA_QA_SHARED_SECRET` — must match the value set in the backend repo exactly (see Integration Contract). This value is generated once by the human and placed in both repos manually — do not generate a new one in this repo.

## Integration Contract (identical in both requirements files — do not modify one without updating the other)

**Endpoint**
```
POST /api/external/vera-qa
Host: rag.omerharmankaya.com
```

**Required header**
```
X-Vera-QA-Secret: <shared secret value>
```

**Request body**
```json
{
  "question": "string, required, 1-1000 chars",
  "history": [
    { "role": "user" | "assistant", "content": "string" }
  ]
}
```
`history` is optional and may be omitted or sent as an empty array in v1.

**Success response — `200`**
```json
{
  "answer": "string",
  "sources": [
    { "title": "string", "excerpt": "string", "url": "string | null" }
  ]
}
```

**Error response — any non-200**
```json
{
  "error": {
    "code": "unauthorized" | "invalid_request" | "rate_limited" | "internal_error",
    "message": "string, human-readable, safe to display"
  }
}
```

## Acceptance criteria

- [ ] Submitting a question with no `VERA_QA_BACKEND_URL`/secret misconfiguration returns a real answer end-to-end
- [ ] Empty input cannot be submitted (blocked client-side, and rejected server-side if it somehow arrives)
- [ ] Input over 1000 characters is rejected before hitting the backend
- [ ] Backend URL and shared secret never appear in any client-side bundle or network request visible in browser devtools
- [ ] A simulated backend failure (e.g. wrong URL) results in a graceful in-UI error message, not a crash
- [ ] Conversation state correctly accumulates multiple question/answer turns in one session
