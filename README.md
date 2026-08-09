# Bholu — Frontend

The React frontend for Bholu, Ashutosh's AI Portfolio Assistant. Built with Vite, Tailwind CSS, Framer Motion, Axios, and React Icons.

## Design

- **Palette:** near-black navy base with a violet → mint-teal signature gradient (Bholu's "living AI" identity), plus a single amber accent reserved only for the recruiter quick-actions card.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (boot sequence + code).
- **Signature element:** the glowing orb avatar (`components/BholuAvatar.jsx`) — present in the boot sequence, header, and every assistant message, pulsing while a response streams in.
- **Structure:** Chat, About, Projects, Skills, and Resume are sidebar-switched views inside one app shell (no router) — keeps the bundle small and keeps chat always one click away, closer to Perplexity/Cursor than a traditional multi-page site.

## Free-tier API discipline

- `POST /chat` only ever fires when the user submits a message (see `hooks/useChat.js`) — never on load, never on a timer.
- `/about`, `/projects`, `/skills`, `/resume` are fetched **once** and cached in memory for the whole session (`hooks/useApiCache.js`) — revisiting a section never re-fetches.
- No polling anywhere in the app.
- Suggestion cards and the recruiter card only ever **prefill** the chat input — they never call the API themselves.

## Streaming

`useChat` tries `GET /chat/stream` (Server-Sent Events) first. If the connection fails before any data arrives, it automatically falls back to a normal `POST /chat` call — the user never sees a broken state either way.

## Running locally

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your backend
npm run dev
```

Visit `http://localhost:5173`.

## Building for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

Deploy the contents of `dist/` to any static host (Vercel, Netlify, Render Static Site, GitHub Pages, etc.), with `VITE_API_URL` set to your deployed backend's URL as a build-time environment variable.

## Folder structure

```
src/
├── components/    # BholuAvatar, BootSequence, Header, Sidebar, Footer,
│                    Hero, SuggestionCard, RecruiterCard, ChatWindow,
│                    MessageBubble, ChatInput, TypingIndicator,
│                    SkeletonLoader, ErrorBanner
├── pages/         # LandingPage (hero + chat), AboutPage, ProjectsPage,
│                    SkillsPage, ResumePage
├── hooks/         # useChat, useApiCache, useTheme
├── services/      # api.js (single Axios instance)
├── utils/         # markdown.jsx (lightweight renderer), debounce.js
└── styles/        # index.css (Tailwind + glass/glow utilities)
```

## Accessibility

- All interactive elements have visible focus rings (`.focus-ring`) and `aria-label`s.
- `prefers-reduced-motion` is respected globally (see `styles/index.css`).
- Sidebar nav marks the active item with `aria-current="page"`.
