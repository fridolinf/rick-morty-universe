# 🛸 Rick & Morty Universe

Small Next.js app to explore characters and episodes from the **Rick and Morty** TV series, built for the **Transportech Frontend** assessment.

You can search, filter, paginate through characters, open detail pages, and see which ones you’ve marked as favorites (stored locally in the browser).

---

## 🎬 Live demo

https://rick-morty-universe.frally.workers.dev

---

## ⚙️ Tech stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS + a small design system of reusable components
- **UI libraries**: shadcn-style components, and Radix UI under the hood
- **State management**:
  - **TanStack Query** – data fetching + caching for API calls
  - **Zustand** – small store for favorite characters (persisted to `localStorage`)
- **Testing**: Vitest + React Testing Library
- **Package manager**: works with `npm` / `yarn`

---

## ✨ Features

- Browse a paginated list of characters with image, name, and status badge.
- Search characters by name with a small debounce.
- Filter characters by status (Alive / Dead / Unknown).
- Character detail page with origin, last known location, and episode list.
- Episodes page with a list of episodes, code, air date, and character count.
- Mark/unmark favorite characters (saved in `localStorage` via Zustand persist).
- Skeleton loading states and friendly empty/error states.
- Fully responsive layout for mobile and desktop.

---

## 🧩 Project structure

High level folders:

- `app/`
  - `page.tsx` – characters home page
  - `characters/[characterId]/` – character detail page
  - `episodes/` – episodes list + episode detail page
- `features/characters/`
  - `components/` – character cards, home layout, pagination, filters
  - `stores/characters.store.ts` – Zustand store for favorites
  - `types/characters.types.ts` – typed API responses
- `features/episodes/`
  - `components/` – episode cards, filters
  - `types/episodes.types.ts`
- `shared/`
  - `components/ui/` – buttons, inputs, skeletons, badges, etc.
  - `lib/` – helpers like `cn`, API utils, etc.

---

## 🛠️ Running the project locally

You’ll need at least **Node 20+** (I’m running it on Node 24).

#### Install dependencies:

```bash
npm install
# or
yarn install
```

#### Start the dev server:

```bash
npm run dev
# or
yarn dev
```

Then open:

http://localhost:3000

---

## 🔎 Testing

I’m using **Vitest** with **React Testing Library** for a few focused component tests:

- `CharacterCard` – renders character info and integrates with the favorites store.
- `EpisodeCard` – loading vs loaded states and basic episode info.
- `CharactersPagination` – page buttons and `onPageChange` behaviour.
- `EpisodesFilterComponent` – search input and “N results” label.

### Run tests:

```bash
npm run test
# or
yarn test

```

### Run test coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

---

## 🕰 Time tracking

**Total time spent**: ~17 hours

---

## 📝 Breakdown by task

- **Project setup & tooling** – ~1.5h
  Next.js app setup, ESLint/Prettier, Vitest config, base folders.

- **Design & layout** – ~5h
  Global layout, navigation, card layout, responsive grid, theming.

- **Characters flow (list, search, filters, pagination)** – ~3h
  Integrating the API, query hooks, search & status filters, pagination.

- **Detail pages (characters & episodes)** – ~2.5h
  Dynamic routes, loading states, plugging episode/character relations.

- **Favorites (Zustand + persist)** – ~1.5h
  Store setup, toggling logic, integrating with cards, `localStorage` persistence.

- **Testing & small refactors** – ~1.5h
  Setting up tests for cards, filters, and pagination, plus minor cleanups.

- **Polish & bug fixes** – ~1h
  Copy tweaks, handling empty/error states, small visual adjustments.

- **Deployment & README** – ~1h
  Cloudflare Pages setup, writing this README and time breakdown.

```md
I didn’t track every minute with a timer, so the numbers are approximate, but they reflect how the time was actually spent across the main tasks.
```
