# Exercise: React Query

Keep this file open while you work.

You'll build three small things in one app. Each one teaches one new idea about React Query.

**This file is not a tutorial.** Don't read ahead. Each step starts with a demo. After the demo, you build. After you build, you debrief. Then you move on.

---

## Setup

You should be on the branch `exercise-react-query-step-1`. Check with:

```
git status
```

Then:

```
pnpm install
pnpm dev
```

Already wired up for you: **React Query**, **React Query devtools**, **Zustand**, **TanStack Router**, **shadcn/ui**, Tailwind.

Open the page in your browser. The home page lists the three steps. Click **Step 1** to start.

Look for a small floating button near the bottom corner of the page. That's the **React Query devtools panel** — a different thing from your browser's devtools. Click it to open. Keep it open the whole time.

> **What devtools shows you:** every active `useQuery` in your app. The cache entries. Whether the data is fresh or stale. The status of each fetch. You'll learn to read it as you go.

**Set up your screen** so you can see all three at once:

- This file
- The route file you're editing
- The browser, with the dev server and the React Query devtools open

---

## How the repo is laid out

You'll edit three route files and one Zustand store. Everything else is set up.

| Step | File | What's already there |
| ---- | ---- | -------------------- |
| 1 | `src/routes/exercise/random-dog/index.tsx` | Stub with the success criteria as a comment |
| 2 | `src/routes/exercise/sub-breeds/index.tsx` | Stub + a `BREEDS` array |
| 3 | `src/routes/exercise/image-count/index.tsx` + `src/stores/image-count.ts` | Stub + a half-finished store |

The fetch helpers live in `src/lib/api.ts`. They already call the Dog CEO API and unwrap the JSON, so you don't have to:

```ts
import { fetchRandomDog, fetchSubBreeds, fetchRandomDogs } from "@/lib/api";

await fetchRandomDog();         // → "https://images.dog.ceo/.../dog.jpg"      (one image URL)
await fetchSubBreeds("husky");  // → ["siberian"]                             (sub-breed names)
await fetchRandomDogs(5);       // → ["url1", "url2", "url3", "url4", "url5"] (N image URLs)
```

> **Heads up: you don't usually call these yourself.** You hand them to `useQuery` as the `queryFn` and React Query calls them for you. The shapes above are what comes out the other side as `data`.

---

## What `useQuery` gives you

Every `useQuery({ queryKey, queryFn })` call returns an object with these fields. You'll use them a lot, so this is your reference card:

| Field | Meaning |
| ----- | ------- |
| `data` | The thing your `queryFn` returned. Starts as `undefined`. |
| `isPending` | `true` until the **first** fetch finishes. Use this for the initial loading state. |
| `isFetching` | `true` whenever **any** fetch is happening (initial load OR a later refetch). |
| `isError` | `true` if the `queryFn` threw. |
| `error` | The thrown error. `error.message` is the string. |
| `refetch()` | Call this to fetch again on demand. |

---

## Pair format

You're working in pairs.

- **Driver** — writes the code.
- **Navigator** — reads this file out loud and calls out the next step.

Your instructor will call a swap partway through each step. When they do, the navigator becomes the driver on the same laptop. Switch seats if it helps.

The navigator's job is real. They're not just watching. They keep this file open. They notice when the screen doesn't match the docs. They flag when devtools shows something weird.

If the navigator is quiet, only one person is working. Talk to each other.

---

# 🛑 STOP

## Wait for the Step 1 demo before you start coding.

Your instructor will demo first. **Laptops closed.** Watch. Then come back here.

Working through this on your own? Just keep going.

---

# Step 1 — `useQuery` basics

## File

`src/routes/exercise/random-dog/index.tsx`

Read the comment block at the top. It restates the success criteria.

## Goal

Fetch one random dog image. Show it. Add a "Next dog" button that fetches another.

## Helper

```ts
import { fetchRandomDog } from "@/lib/api";
// fetchRandomDog(): Promise<string>  — returns the image URL
```

## Steps

1. Call `useQuery` inside the route component. Use a `queryKey` of `["randomDog"]` and `queryFn: fetchRandomDog`.
2. Show a loading state while `isPending` is true.
3. Show the error if `isError` is true.
4. Otherwise, render an `<img>` with the data as the `src`.
5. Add a button. On click, call the query's `refetch()`.

## What it should look like (skeleton)

```tsx
import { useQuery } from "@tanstack/react-query";
import { fetchRandomDog } from "@/lib/api";

function ExercisePage() {
  // 1. Hand the fetch to React Query. It manages loading / error / caching.
  const dogQuery = useQuery({
    queryKey: ["randomDog"],   // identity of this query in the cache
    queryFn: fetchRandomDog,   // what to run on a cache miss
  });

  // 2. Three states to handle: loading, error, success.
  if (dogQuery.isPending) return <p>Loading…</p>;
  if (dogQuery.isError) return <p>Error: {dogQuery.error.message}</p>;

  // 3. Success: data is the thing fetchRandomDog returned (the image URL).
  return (
    <div>
      <img src={dogQuery.data} alt="A random dog" width={300} />
      <button type="button" onClick={() => dogQuery.refetch()}>
        Next dog
      </button>
    </div>
  );
}
```

## How you know it's working

- [ ] You see a dog image when the page loads.
- [ ] In devtools, there's one cache entry: `["randomDog"]`.
- [ ] Clicking **Next dog** swaps in a different image.
- [ ] No `useState`. No `useEffect`. No manual `fetch`.

## Try this in devtools

- Find the `["randomDog"]` entry. Click it.
- Tab away from the browser tab. Wait a second. Tab back. Watch the entry.
- Click your **Next dog** button a few times.

You'll learn what each of these does after Step 1. Just notice for now.

## Stretch (if you finish early)

Disable the **Next dog** button while a refetch is in flight. Use `dogQuery.isFetching` — that's `true` any time a fetch is happening, including refetches (`isPending` is only `true` for the very first one). Spam-click the button and watch it disable until the new image lands.

---

# 🛑 STOP

## Wait for the Step 1 debrief and the Step 2 demo.

Don't start Step 2 yet. Your instructor will lead a short debrief on what you saw, show one slide on `staleTime` vs `gcTime`, then demo Step 2.

**Behind, or working alone?** You can jump straight to the next checkpoint — Step 1 is already solved there:

```
git checkout exercise-react-query-step-2
```

---

# Step 2 — Query keys with parameters

## File

`src/routes/exercise/sub-breeds/index.tsx`

## Goal

The user picks a breed from a small list. The page shows that breed's sub-breeds.

A "sub-breed" is a kind of breed inside a breed. Hound has sub-breeds like "afghan" and "basset". Bulldog has "english", "french", and so on.

## Helper

```ts
import { fetchSubBreeds } from "@/lib/api";
// fetchSubBreeds(breed): Promise<string[]>  — sub-breed names
```

## Steps

The route file already declares `const BREEDS = ["husky", "hound", "terrier", "spaniel"]`. Use it.

1. Hold the picked breed in component state with `useState`. Default to `BREEDS[0]`.
2. Render a `<select>` with the four breeds. The select updates the state.
3. Call `useQuery`. The `queryKey` must include the picked breed: `["subBreeds", breed]`.
4. The `queryFn` calls `fetchSubBreeds(breed)`.
5. Show loading. Show error. Otherwise show the list.

**Notice what you did not write:** there's no `refetch()` call when the breed changes. The queryKey changed, so React Query treats it as a different query and fetches automatically.

## What it should look like (skeleton)

```tsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchSubBreeds } from "@/lib/api";

const BREEDS = ["husky", "hound", "terrier", "spaniel"];

function ExercisePage() {
  // Picked breed is plain client state — useState is fine.
  const [breed, setBreed] = useState(BREEDS[0]);

  const subBreedsQuery = useQuery({
    // The breed is PART OF THE KEY. Change breed → React Query treats it
    // as a different query and fetches automatically.
    queryKey: ["subBreeds", breed],
    queryFn: () => fetchSubBreeds(breed),
  });

  return (
    <div>
      <select value={breed} onChange={(e) => setBreed(e.target.value)}>
        {BREEDS.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      {subBreedsQuery.isPending && <p>Loading…</p>}
      {subBreedsQuery.isError && <p>Error: {subBreedsQuery.error.message}</p>}
      {subBreedsQuery.data && (
        <ul>
          {subBreedsQuery.data.map((sub) => <li key={sub}>{sub}</li>)}
        </ul>
      )}
    </div>
  );
}
```

## How you know it's working

- [ ] Picking a breed shows that breed's sub-breeds (or "no sub-breeds" — terrier has lots, husky has just `siberian`).
- [ ] In devtools, switching breeds creates a new cache entry per breed: `["subBreeds", "husky"]`, `["subBreeds", "hound"]`, and so on.
- [ ] Switching back to a breed you already loaded shows the list **instantly**, no spinner.

## Watch devtools

Switch breeds three times. Look at the cache.

You should see three different cache entries. One per breed. They all stay around. When you switch back to a breed you already loaded, the data shows up instantly.

That's the whole point of putting the breed in the queryKey. **Same key = same cache entry. Different key = different entry.**

> **One detail you may notice in devtools:** when you switch back to a breed you already loaded, the UI is instant — but a small background refetch fires. That's `staleTime: 0`, the default. Sub-breed lists never change while you're sitting here, so you can pin the cache by adding `staleTime: Number.POSITIVE_INFINITY` to the `useQuery` call. Cache hits then become pure — zero network. Try it. This is the right per-query knob; the wrong one is disabling refetch globally.

## Stretch — *important, do this if you have time*

Take `breed` out of the queryKey. Change `["subBreeds", breed]` to just `["subBreeds"]`.

Now switch breeds. What happens? What does the list show? What does devtools show?

This is the lesson. Spend two minutes here. Talk to your partner about *why* the bug looks the way it does. The queryKey *is* the cache identity. When React Query sees a key it already has data for, it skips the `queryFn` entirely and hands you the old data — a "cache hit". The `queryFn` only runs when nothing matches the key — a "cache miss".

When you're done, put `breed` back in the queryKey.

---

# 🛑 STOP

## Wait for the Step 2 debrief and the Step 3 demo.

Three things still to come before Step 3:

1. A group debrief on Step 2.
2. A slide on queryKey discipline.
3. The **decision rule** for server state vs. client state.

Don't read ahead. The decision rule changes how you'll think about Step 3.

**Behind, or working alone?** Steps 1 and 2 are already solved at the next checkpoint:

```
git checkout exercise-react-query-step-3
```

---

# Step 3 — Server state vs. client state

## Files

- `src/routes/exercise/image-count/index.tsx` — the route
- `src/stores/image-count.ts` — the Zustand store (half-finished)

## Goal

A slider goes from 1 to 10. The number on the slider tells the API how many random dog images to fetch. Render that many images.

The slider value lives in **Zustand**. The images live in the **React Query cache**. Two stores. Two responsibilities.

## Helper

```ts
import { fetchRandomDogs } from "@/lib/api";
// fetchRandomDogs(count): Promise<string[]>  — count image URLs
```

## Before you write any code

Talk to your partner. Answer these out loud:

1. The **count** the user picked — is that server state or client state?
2. The **list of image URLs** the API returned — is that server state or client state?
3. Where does each one live in your code?

Use the decision rule: *"If you closed the tab and reopened it, would the user expect this back from the server?"*

Don't skip this. The whole point of Step 3 is the question, not the code.

## Steps

1. Open `src/stores/image-count.ts`. The store already has `count: 3` and a `setCount` stub. **Finish `setCount`** — it should update `count` in the store.
2. Open the route file. Read `count` and `setCount` from `useImageCountStore()`.
3. Render `<input type="range" min={1} max={10} value={count} />` and wire `onChange` to `setCount(Number(e.target.value))`.
4. Call `useQuery` with `queryKey: ["randomDogs", count]` and `queryFn: () => fetchRandomDogs(count)`.
5. Render the count, then the images in a grid.

## What it should look like (skeleton)

```ts
// src/stores/image-count.ts — finish setCount (it's a one-liner)
import { create } from "zustand";

interface ImageCountStore {
  count: number;
  setCount: (count: number) => void;
}

export const useImageCountStore = create<ImageCountStore>((set) => ({
  count: 3,
  setCount: (count) => set({ count }), // ← write this body
}));
```

```tsx
// src/routes/exercise/image-count/index.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchRandomDogs } from "@/lib/api";
import { useImageCountStore } from "@/stores/image-count";

function ExercisePage() {
  // Slider value comes from the Zustand store, NOT useState.
  const { count, setCount } = useImageCountStore();

  const dogsQuery = useQuery({
    // Count is in the key → each count gets its own cache entry.
    queryKey: ["randomDogs", count],
    queryFn: () => fetchRandomDogs(count),
  });

  return (
    <div>
      <input
        type="range"
        min={1}
        max={10}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <p>Showing {count} dogs</p>

      {dogsQuery.isPending && <p>Loading…</p>}
      {dogsQuery.isError && <p>Error: {dogsQuery.error.message}</p>}
      {dogsQuery.data && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {dogsQuery.data.map((url) => (
            <img key={url} src={url} width={120} alt="A dog" />
          ))}
        </div>
      )}
    </div>
  );
}
```

## How you know it's working

- [ ] The slider goes from 1 to 10. Moving it changes how many images appear.
- [ ] In devtools, sliding to 7 creates `["randomDogs", 7]`. Sliding to 4 creates `["randomDogs", 4]`. Old entries stick around.
- [ ] Sliding back to a value you already used → instant, from cache.
- [ ] No `useEffect` that copies data anywhere.

## ❌ Do NOT do this

Some pairs feel pulled toward this. The temptation is "I want the dogs available everywhere, so let me put them in Zustand too":

```tsx
// DON'T — anti-pattern
const dogsQuery = useQuery({
  queryKey: ["randomDogs", count],
  queryFn: () => fetchRandomDogs(count),
});

useEffect(() => {
  if (dogsQuery.data) {
    useImageCountStore.setState({ dogs: dogsQuery.data }); // ← copying!
  }
}, [dogsQuery.data]);
```

This copies the server data into Zustand. Now you have **two places that claim to know what the dogs are** — the React Query cache and the Zustand store. They will go out of sync. When the cache refetches, Zustand has stale data. When something tells the cache to throw its data away, Zustand still has it. The two will disagree, and any component reading from Zustand will show the wrong thing.

**The right way:** any component that wants the same dogs calls `useQuery` with the same queryKey. They all share one cache entry. You don't copy.

## Stretch — favorites

Add favorites to the same Zustand store. The shape:

```ts
interface ImageCountStore {
  count: number;
  setCount: (count: number) => void;
  favorites: string[];                    // ← new
  addFavorite: (url: string) => void;     // ← new
  removeFavorite: (url: string) => void;  // ← new
}
```

Then render a "favorite" button on each dog image. Clicking it toggles that URL in `favorites`. Render the favorited URLs below the grid.

Watch what happens when you move the slider: the grid changes, but your favorites stay. That's the point of putting them in Zustand — they're not tied to one cache entry.

Where *should* `favorites` live? Server or client?

Talk it through with your partner. There's a real answer, but it depends on the app:

- If favorites should still be there when the user comes back tomorrow on a different device → that's server state. You'd save them with a `useMutation` to an API.
- If favorites are just for this session, on this device → that's client state. Zustand.

This is the decision rule, applied. There's no library answer — the answer depends on what your app is for.

---

# Done

You did three reps of the same loop:

1. **`useQuery`** with no input — basic fetch and cache.
2. **`useQuery`** with one input in the queryKey — cache splits per input.
3. **`useQuery`** with client state (Zustand) driving the queryKey — server data on one side, client state on the other, queryKey as the bridge.

That's the whole tool. The rest of React Query is variations on this loop.

## Want to see the finished version?

```
git checkout exercise-react-query-solution
```

## What we did not cover

- **Mutations** (`useMutation`) — for writes. You'll need this when forms post to APIs.
- **Optimistic updates** — show the change instantly, roll back on failure.
- **Infinite queries** — pagination, "load more".
- **Suspense + error boundaries** — declarative loading and error UI.
- **SSR / hydration** — Next.js, TanStack Start.

These are real and useful. They're the next layer. Start with what you learned here.
