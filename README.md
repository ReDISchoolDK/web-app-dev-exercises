# Exercise: Zustand + Immer — Bookmarks

> **You are on the solution branch.** This is the answer key. To do the
> exercise yourself, switch to `exercise-bookmarks` first.

Keep this file open while you work.

You will build a bookmarks page. You can add a bookmark, star it as a favorite, and delete it. All of that state lives in one **Zustand store**, and you'll use the **Immer middleware** so you can update state by writing what looks like normal mutation.

**Don't read ahead.** Do the steps in order. Hints are there for when you get stuck — read them when you need them, not before.

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

Also open **React DevTools**. If something doesn't work, inspect the store's state directly — that's faster than guessing from the UI.

---

## How the repo is laid out

The page and the form are already built. Two files matter:

| File | What you do to it |
| ---- | ----------------- |
| `src/stores/bookmarks.ts` | Write the store. This is the real exercise. |
| `src/routes/exercise/bookmarks/index.tsx` | Already wired. You read it in Step 5. |

---

## Background: why Immer?

A Zustand store must be updated **immutably** — you never change the old state, you produce a new one. For a list of objects, that gets noisy fast.

To flip one boolean on one item, plain Zustand makes you rebuild the array and the object:

```ts
set((state) => ({
  bookmarks: state.bookmarks.map((b) =>
    b.id === id ? { ...b, isFavorite: !b.isFavorite } : b,
  ),
}));
```

With the Immer middleware you get a **draft** you can write to directly, and Immer produces the new immutable state for you:

```ts
set((state) => {
  const bookmark = state.bookmarks.find((b) => b.id === id);
  if (bookmark) bookmark.isFavorite = !bookmark.isFavorite;
});
```

Same result. Much easier to read. That's the whole point of this exercise.

---

## Pair format

- **Driver** — writes the code.
- **Navigator** — reads this file out loud and tells the driver what's next.

Your instructor will call a swap partway through. The navigator's job is real: read the file, watch the screen, catch typos, ask "what does that line do?" If the navigator is quiet, only one person is working. Talk.

---

# 🛑 STOP

## Wait for the demo before you start coding.

Your instructor will demo first. **Laptops closed.** Watch. Then come back here.

Working through this on your own? Just keep going.

---

# Step 1 — Shape the store

## File

`src/stores/bookmarks.ts`

## Goal

Set up the store with the Immer middleware and an empty list.

A bookmark is:

```ts
{ id: string; title: string; url: string; isFavorite: boolean }
```

## Steps

1. Import `immer` from `zustand/middleware/immer`.
2. Wrap the store initializer in it.
3. Start `bookmarks` as an empty array.

## What it should look like (skeleton)

```ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useBookmarksStore = create<BookmarksStore>()(
  immer((set) => ({
    bookmarks: [],
    // actions go here
  })),
);
```

## How you know it's working

- [ ] `pnpm typecheck` passes.
- [ ] The page loads and shows the empty state.

## 💡 Hint — the double parentheses

`create<BookmarksStore>()(immer(...))` — note the extra `()` after the type. That's required whenever you use middleware. Leave it out and TypeScript gives you a confusing error.

---

# Step 2 — `add`

## Goal

Take `{ title, url }` and append a new bookmark.

## Steps

1. Generate the id with `crypto.randomUUID()`.
2. New bookmarks start with `isFavorite: false`.

## What it should look like (skeleton)

```ts
add: ({ title, url }) =>
  set((state) => {
    state.bookmarks.push({
      id: crypto.randomUUID(),
      title,
      url,
      isFavorite: false,
    });
  }),
```

## How you know it's working

- [ ] Typing a title and URL and clicking **Add bookmark** shows it in the list.
- [ ] The form clears after adding.

## 💡 Hint — IDs live in the store

The component shouldn't generate the id. The action takes `{ title, url }` and the store stamps `id` and the defaults. That keeps call sites simple and means there's one place ids come from.

## 💡 Hint — pass an object, not two arguments

`add({ title, url })` beats `add(title, url)`. When you add a fourth field later, every call site still reads clearly and you can't get the order wrong.

---

# Step 3 — `toggleFavorite`

## Goal

Take an `id` and flip `isFavorite` on **that bookmark only**.

## What it should look like (skeleton)

```ts
toggleFavorite: (id) =>
  set((state) => {
    const bookmark = state.bookmarks.find((b) => b.id === id);
    if (bookmark) bookmark.isFavorite = !bookmark.isFavorite;
  }),
```

## How you know it's working

- [ ] Add two bookmarks. Click the heart on one. Only that one changes.
- [ ] The button's label flips between "Favorite" and "Unfavorite".

## 💡 Hint — nothing happens when I click

Check that you're comparing `b.id === id`, not the whole object. Two objects with the same contents are never `===` each other in JavaScript.

---

# Step 4 — `remove`

## Goal

Take an `id` and delete that bookmark.

## What it should look like (skeleton)

```ts
remove: (id) =>
  set((state) => {
    state.bookmarks = state.bookmarks.filter((b) => b.id !== id);
  }),
```

## How you know it's working

- [ ] The trash button removes only the bookmark you clicked.
- [ ] Deleting the last one brings the empty state back.

## 💡 Hint — this one looks the same without Immer

`filter` already returns a new array, so Immer buys you nothing here. Not every action gets shorter — `toggleFavorite` is where the win was.

---

# Step 5 — Read the page

## File

`src/routes/exercise/bookmarks/index.tsx`

It is already wired to your store — you don't have to change it. Read it and make sure you can answer:

- Where does the page get `bookmarks`, `add`, `toggleFavorite` and `remove`?
- Why are `title` and `url` plain `useState` instead of store state?

That second one is the point. Those two inputs belong to this one component, so they are **not** shared state. Only put things in a store when more than one component needs them.

## 💡 Hint — always use a real `key`

The list uses `key={bookmark.id}`. Use an id from your data, never the array index — if you did, deleting an item would make React reuse the wrong row.

---

## Stretch — only if you finish early

### Stretch 1 — favorites filter

Add a "show favorites only" toggle. Before you write it, decide: is that store state or local state? Justify your answer to your partner.

### Stretch 2 — survive a reload

Make the list stick around after a refresh, using either Zustand's `persist` middleware or the `useLocalStorage` hook from the custom-hooks exercise.

---

# Done

You built a store that owns a list, and three actions that change it:

1. **`add`** — push onto the draft.
2. **`toggleFavorite`** — find one item and change one field. This is where Immer pays off.
3. **`remove`** — replace the array with a filtered copy.

That's the shape of almost every list store you'll write.

## Want to see the finished version?

```
git checkout exercise-bookmarks-solution
```

## What we did not cover

- **Selectors** — `useBookmarksStore((s) => s.bookmarks)` to re-render less often.
- **`persist`** — saving the store to `localStorage` automatically.
- **Server state** — none of this touches an API. That's React Query's job, not Zustand's.

These are the next layer. Start with what you learned here.
