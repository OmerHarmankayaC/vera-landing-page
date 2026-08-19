# Vera Finance — Landing Page

The marketing site for [Vera Finance](https://apps.apple.com/tr/app/vera-finance/id6760785410),
an AI-assisted personal finance app for iOS.

**Live:** [vera-landing-page-three.vercel.app](https://vera-landing-page-three.vercel.app)

Besides the landing page it carries the pages a published App Store app needs
to have somewhere: privacy policy, terms of service, support, and a waitlist.

## Q&A widget

The site embeds a question-answering widget (`qa-widget.js`) that answers
questions about the app from its documentation rather than from a language
model's memory. Questions go to a serverless function (`api/vera-qa.js`) which
attaches a shared secret and forwards them to the RAG backend — the browser
never sees the credential.

| Variable | Description |
|---|---|
| `VERA_QA_BACKEND_URL` | RAG backend endpoint |
| `VERA_QA_SHARED_SECRET` | Sent as `X-Vera-QA-Secret` |

The retrieval side lives in a separate repository:
[Vera_RAG_Assistant](https://github.com/OmerHarmankayaC/Vera_RAG_Assistant).

## Structure

```
index.html          landing
about.html          about the app
privacy.html        privacy policy      ← docs/privacy-policy.md
terms.html          terms of service    ← docs/terms-of-service.md
support.html        support
waitlist.html       waitlist signup
verify.html         account verification
translations.js     Turkish / English copy
qa-widget.js/.css   Q&A widget
api/vera-qa.js      serverless proxy to the RAG backend
```

Static HTML, CSS and JavaScript — no framework and no build step. Bilingual
(Turkish / English) through `translations.js`. Deployed on Vercel.

## Development

```bash
npm run dev      # npx live-server
```

`npm run build` is a no-op; the site is served as it is.
