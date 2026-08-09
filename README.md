# Exercise: Zustand + Immer — Bookmarks

> **You are on the solution branch.** This is the answer key. If you want to
> do the exercise yourself, switch to `exercise-bookmarks` first.

You will build a bookmarks page. You can add a bookmark, star it as a
favorite, and delete it. All of that state lives in one **Zustand store**,
and you'll use the **Immer middleware** so you can update the state by
writing what looks like normal mutation.

**Don't read ahead.** Do the steps in order. Hints are there for when you get
stuck — read them when you need them, not before.

---

## Setup

You should be on the branch `exercise-bookmarks`. Check with:

```
git status
```

Then:

```
pnpm install
pnpm dev
```

Open <http://localhost:5173/exercise/bookmarks>.

The page and the form are already built for you. Two files matter tonight:

| File | What you do to it |
| ---- | ----------------- |
| `src/stores/bookmarks.ts` | Write the store. This is the real exercise. |
| `src/routes/exercise/bookmarks/index.tsx` | Connect the page to your store. |

---

## Background: why Immer?

A Zustand store must be updated **immutably** — you never change the old
state, you produce a new one. For a list of objects that gets noisy fast.

To flip one boolean on one item, plain Zustand makes you rebuild the array
and the object:

```ts
set((state) => ({
  bookmarks: state.bookmarks.map((b) =>
    b.id === id ? { ...b, isFavorite: !b.isFavorite } : b,
  ),
}));
```

With the Immer middleware you get a **draft** you can write to directly, and
Immer produces the new immutable state for you:

```ts
set((state) => {
  const bookmark = state.bookmarks.find((b) => b.id === id);
  if (bookmark) bookmark.isFavorite = !bookmark.isFavorite;
});
```

Same result. Much easier to read. That's the whole point of this exercise.

---

## Step 1 — Shape the store

Open `src/stores/bookmarks.ts`.

A bookmark is:

```ts
{ id: string; title: string; url: string; isFavorite: boolean }
```

Create the store with the `immer` middleware and give it a `bookmarks` array
that starts empty.

💡 The middleware wraps your initializer:
`create<BookmarksStore>()(immer((set) => ({ ... })))`. Note the extra `()`
after `create<...>` — that's required when you use middleware.

💡 Import it from `zustand/middleware/immer`.

---

## Step 2 — `add`

Add an action that takes `{ title, url }` and appends a new bookmark.

- Generate the id with `crypto.randomUUID()`
- New bookmarks start with `isFavorite: false`

💡 With Immer you can call `state.bookmarks.push(...)` directly.

---

## Step 3 — `toggleFavorite`

Add an action that takes an `id` and flips `isFavorite` on **that bookmark
only**.

💡 `find` the bookmark, then assign to its property.

💡 If nothing happens, check that you're comparing `b.id === id` and not
comparing the whole object.

---

## Step 4 — `remove`

Add an action that takes an `id` and deletes that bookmark.

💡 `filter` already returns a new array, so this one looks the same with or
without Immer. Assign the result back onto the draft.

---

## Step 5 — Wire up the page

Open `src/routes/exercise/bookmarks/index.tsx` and connect it:

- Read `bookmarks`, `add`, `toggleFavorite` and `remove` from the store
- On submit, call `add` and then clear both inputs
- The heart button calls `toggleFavorite`, the trash button calls `remove`

Note that the two text inputs stay as `useState`. They belong to this one
component, so they are **not** store state. Only share what actually needs
sharing.

---

## Done when

- [ ] Adding a bookmark shows it in the list and clears the form
- [ ] The heart toggles only the bookmark you clicked
- [ ] The trash removes only the bookmark you clicked
- [ ] The empty state appears again once you delete the last one
- [ ] `pnpm typecheck` and `pnpm check` are clean

## Stuck?

The answer key is on `exercise-bookmarks-solution`:

```
git diff exercise-bookmarks-solution -- src/stores/bookmarks.ts
```

## Going further

- Add a "favorites only" filter. Should that be store state or local state?
- Persist the list across reloads with Zustand's `persist` middleware, or
  with the `useLocalStorage` hook from the `exercise-use-local-storage`
  exercise.
