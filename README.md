# Exercise: Express + JSON + React Query — Dog Favorites

This is your reference for tonight. Keep it open while you pair.

You will build a tiny backend with Express that saves data to a JSON file. Then you will read and update that data from React using TanStack Query. By the end you'll have a page where you save your favorite dogs — and they're still there when you reload.

**Don't read ahead.** Do the steps in order. Hints are there for when you get stuck — read them when you need them, not before.

---

## Setup

You should be on the branch `exercise-express-json`. Check with:

```
git status
```

If you see `On branch exercise-express-json`, you're set. The Express skeleton, the UI, and the client fetch helpers are already wired. You only have to fill in the two pieces that matter: the server handlers and the React Query calls.

**You need two terminals tonight.** One runs the website. The other runs your backend.

Terminal 1:

```
pnpm dev
```

Terminal 2:

```
pnpm dev:server
```

Leave both running for the whole exercise.

**Open four things side by side:**

1. This file (`README.md`)
2. `server/index.ts` — your backend (filled in during Part A)
3. `src/routes/exercise/dog-favorites/index.tsx` — your frontend (filled in during Part B)
4. The browser at `http://localhost:5173/exercise/dog-favorites`

Also keep **DevTools → Network** open in the browser. You will watch real HTTP requests fly between the frontend and your server. The TanStack Query Devtools panel (bottom-right of the page) should also stay open the whole time.

---

## What you're building

A page with two parts. Pick a random dog. Click "Save to favorites." It's saved. Reload the page — still there. Click "Remove" — gone.

The list lives in a file on disk: `server/db.json`. The frontend never touches that file. It asks the backend for it.

---

## The picture

```
Browser (React)         Express server      Disk
   useQuery   ──GET───►  /api/favorites  ──►  server/db.json
   useMutation ──POST──►                 ──►  (writes)
   useMutation ──DELETE►                 ──►  (writes)
```

Three HTTP routes. One file. React Query handles the back-and-forth and keeps the screen in sync.

---

## Pair format

- **Driver** — writes the code.
- **Navigator** — reads this file out loud and tells the driver what's next.

The instructor will call a swap about 10 minutes in. The navigator's job is real: read the file, watch the screen, catch typos, ask "what does that line do?" If the navigator is quiet, only one person is working. Talk.

---

# 🛑 STOP

## Wait for the demo before you start coding.

The instructor will demo first. **Laptops closed.** Watch. Then come back to this file.

---

# Part A — Build the API

Write the three Express handlers in `server/index.ts`. They read and write `server/db.json`.

**Read aloud (navigator):** "Part A — we build the backend. Three routes: GET, POST, DELETE. They all read or write one JSON file."

## File to edit

`server/index.ts`

## What's already there

- `readDb()` — reads `server/db.json` and gives you back `{ favorites: [...] }`.
- `writeDb(db)` — writes the same shape back to disk.
- `express.json()` middleware — parses JSON request bodies into `req.body` for you.
- Three handler stubs that return `501 Not Implemented`. You'll replace those bodies.

You will NOT write any `fetch`, any `fs` calls, or any middleware. The setup is done. You're filling in three handler bodies.

## Step 1 — GET /api/favorites

The smallest possible loop: ask the server for the list, get an array back.

### Do this

1. Open `server/index.ts`.
2. Find the `app.get("/api/favorites", ...)` handler.
3. Replace the body so it reads the db and responds with the favorites array.

### Code to write

```ts
app.get("/api/favorites", async (_req, res) => {
	const db = await readDb();
	res.json(db.favorites);
});
```

### How you know it's working (navigator: tick these out loud)

In Terminal 2 you should see `api on http://localhost:8787`. In a third terminal, run:

```
curl http://localhost:8787/api/favorites
```

- [ ] You see `[]` — an empty array. The server read the file and gave it back.

If you get `501`, you didn't save. If you get an error, check Terminal 2 for a stack trace.

## Step 2 — POST /api/favorites

Save a URL to the list. The frontend will send `{ "url": "..." }` as a JSON body.

### Do this

1. Find the `app.post(...)` handler.
2. Pull `url` out of `req.body`. If it's missing, respond with a `400`.
3. Read the db, push the URL onto `favorites` (skip if it's already there).
4. Write the db back.
5. Respond with the updated favorites array.

### Code to write

```ts
app.post("/api/favorites", async (req, res) => {
	const { url } = req.body as { url?: string };
	if (!url) {
		res.status(400).json({ error: "url is required" });
		return;
	}
	const db = await readDb();
	if (!db.favorites.includes(url)) db.favorites.push(url);
	await writeDb(db);
	res.json(db.favorites);
});
```

### How you know it's working

```
curl -X POST http://localhost:8787/api/favorites \
  -H "Content-Type: application/json" \
  -d '{"url":"https://images.dog.ceo/breeds/proof/test.jpg"}'
```

- [ ] You see `["https://images.dog.ceo/breeds/proof/test.jpg"]`.
- [ ] Open `server/db.json` — the URL is in there.
- [ ] Run the curl again. The array still has just one entry, not two. (Dedup works.)
- [ ] `curl -X POST http://localhost:8787/api/favorites -H "Content-Type: application/json" -d '{}'` returns a `400`.

## Step 3 — DELETE /api/favorites

Same shape as POST, but remove instead of add.

### Do this

1. Find the `app.delete(...)` handler.
2. Same body shape: read `url` from `req.body`, `400` if missing.
3. Filter the URL out of `db.favorites`.
4. Write the db back. Respond with the updated array.

### Code to write

```ts
app.delete("/api/favorites", async (req, res) => {
	const { url } = req.body as { url?: string };
	if (!url) {
		res.status(400).json({ error: "url is required" });
		return;
	}
	const db = await readDb();
	db.favorites = db.favorites.filter((f) => f !== url);
	await writeDb(db);
	res.json(db.favorites);
});
```

### How you know it's working

```
curl -X DELETE http://localhost:8787/api/favorites \
  -H "Content-Type: application/json" \
  -d '{"url":"https://images.dog.ceo/breeds/proof/test.jpg"}'
```

- [ ] You see `[]`.
- [ ] `server/db.json` is back to `{ "favorites": [] }`.

You can also delete the `void readDb; void writeDb;` lines near the top of the file. They were only there to keep TypeScript quiet while the handlers were empty.

## 💡 Hint — what is `express.json()`?

A piece of code that runs before every handler. It reads the raw request body (which arrives as bytes), parses it as JSON, and puts the result on `req.body`. Without it, `req.body` is `undefined`.

You don't have to call it yourself. It's already mounted at the top of the file: `app.use(express.json())`. That's why `const { url } = req.body` works.

## 💡 Hint — what is `tsx watch`?

`tsx` runs TypeScript files directly (no separate build step). `tsx watch` re-runs the file every time it changes. So every time you save `server/index.ts`, the server restarts. Watch Terminal 2 — you'll see `[tsx] change ... Restarting...` each time.

If the server doesn't seem to pick up your changes, look at Terminal 2 for an error. A syntax error stops the restart.

## 💡 Hint — why is the parameter `_req` instead of `req` in the GET handler?

The underscore tells TypeScript "I know I'm not using this, please don't complain." GET doesn't need the request — no body, no parameters — so we mark it as ignored. POST and DELETE do use `req.body`, so they get the plain name `req`.

## 💡 Hint — why `res.status(400)...; return;` and not `return res.status(400)...`?

Both work. Express handlers don't care what you return. Doing them on two lines makes it obvious that you're (1) sending a response and (2) bailing out so the rest of the function doesn't run.

---

# 🛑 STOP

## Part A is done. Check in with your instructor before starting Part B.

Show that:

- All three `curl` commands work.
- `server/db.json` updates when you POST and DELETE.

---

# Part B — Wire it to React Query

Now make the page use the API you just built. The UI is already there — buttons, layout, loading states. Your job is to replace the placeholder values and no-op handlers with real React Query calls.

**Read aloud (navigator):** "Part B — we wire the page to the backend. React Query reads the list with `useQuery`, and updates it with two `useMutation` calls."

## File to edit

`src/routes/exercise/dog-favorites/index.tsx`

## What's already there

- The full UI: a card with the dog image, two action buttons, the saved-favorites grid.
- Placeholder values: `dog`, `favorites`, `isSaved`. You'll replace these with real query state.
- No-op handlers: `onPickNext`, `onSave`, `onRemove`. You'll replace these with mutation calls.

You will NOT write any `fetch` code or layout. Just the React Query calls.

## Step 1 — Read the data with `useQuery`

Load the random dog and the favorites list. Both use the same hook, just with different query functions.

### Do this

1. Uncomment all the imports at the top of the file (the `// import { useMutation ...` and `// import { addFavorite ...` blocks). You will use all of them by the end of Part B.
2. Delete the placeholder block:

   ```tsx
   const dog: { ... } = { isPending: false, isError: false };
   const favorites: string[] = [];
   const favoritesPending = false;
   ```

3. Replace it with two `useQuery` calls.
4. Wire `onPickNext` to refetch the dog query.
5. Update the JSX to use `dogQuery` (and friends) instead of the placeholders. Drop the `disabled` flag on the "Next dog" button — replace it with `disabled={dogQuery.isFetching}`.

### Code to write

```tsx
const dogQuery = useQuery({
	queryKey: ["randomDog"],
	queryFn: fetchRandomDog,
});

const favoritesQuery = useQuery({
	queryKey: ["favorites"],
	queryFn: getFavorites,
});

const favorites = favoritesQuery.data ?? [];

const onPickNext = () => dogQuery.refetch();
```

And update the dog card JSX to read from `dogQuery`:

```tsx
{dogQuery.isPending ? (
	<div className="...">Loading…</div>
) : dogQuery.isError ? (
	<div className="...">Error: {dogQuery.error.message}</div>
) : (
	<img src={dogQuery.data} alt="A random dog" className="..." />
)}
```

And the favorites grid uses `favoritesQuery.isPending` instead of `favoritesPending`.

### How you know it's working

- [ ] A random dog image appears on the page.
- [ ] "Saved (0)" shows up — the favorites query returned the empty array from your server.
- [ ] Open the TanStack Query Devtools (bottom-right). You see two queries: `["randomDog"]` and `["favorites"]`.
- [ ] Open DevTools → Network. You see one request to `/api/favorites` returning `200`.
- [ ] Click "Next dog". A new image loads.

## Step 2 — Save with `useMutation`

Add a new favorite to the list. Reads don't change data — `useQuery` is fine for that. Writes do change data — that's what `useMutation` is for.

### Do this

1. Grab the query client at the top of the component.
2. Add a `useMutation` for adding a favorite.
3. Compute `isSaved` from the real data instead of `false`.
4. Wire the `onSave` handler.
5. Drop the `disabled` flag on the Save button. Replace it with a real condition.

### Code to write

```tsx
const qc = useQueryClient();

const add = useMutation({
	mutationFn: addFavorite,
	onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
});

const isSaved =
	dogQuery.data !== undefined && favorites.includes(dogQuery.data);

const onSave = () => {
	if (dogQuery.data) add.mutate(dogQuery.data);
};
```

Update the Save button:

```tsx
<Button
	className="flex-1"
	onClick={onSave}
	disabled={!dogQuery.data || add.isPending || isSaved}
>
	<Heart className={isSaved ? "fill-current" : ""} />
	{isSaved ? "Saved" : "Save to favorites"}
</Button>
```

### How you know it's working

- [ ] Click "Save to favorites". The button text changes to "Saved" and the heart fills in.
- [ ] The saved dog appears in the "Saved (1)" grid below.
- [ ] Network tab shows a `POST /api/favorites`, then a `GET /api/favorites` right after. That second request is the **invalidation** — React Query asking for fresh data.
- [ ] `server/db.json` has the URL in it.
- [ ] **Reload the page.** The favorite is still there. (This is the whole point of the exercise.)

## Step 3 — Remove with `useMutation`

Same shape as the save mutation, but for delete. This step is about proving you understand the pattern — mutation + invalidation — by writing a second one.

### Do this

1. Add a second `useMutation` for removing a favorite.
2. Wire the `onRemove` handler.
3. Drop the `disabled` flag on each Remove button. Replace it with `disabled={remove.isPending}`.

### Code to write

```tsx
const remove = useMutation({
	mutationFn: removeFavorite,
	onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
});

const onRemove = (url: string) => remove.mutate(url);
```

### How you know it's working

- [ ] Click "Remove" on a saved dog. It disappears from the grid.
- [ ] Network tab shows `DELETE /api/favorites`, then `GET /api/favorites`.
- [ ] `server/db.json` no longer has that URL.
- [ ] No red errors in the browser console.

## 💡 Hint — what is a query key?

The first argument to `useQuery` is the `queryKey`. It's an array of values that uniquely names the query. React Query uses it as the cache key — anywhere else in your app that uses the same key, it shares the same data.

`["randomDog"]` and `["favorites"]` are two separate keys. They cache and refetch independently.

When you call `qc.invalidateQueries({ queryKey: ["favorites"] })`, React Query says: "Mark any query with that key as stale, and refetch any that's currently on screen." That's why the grid updates after a mutation — the favorites query refetches automatically.

## 💡 Hint — `useMutation` vs `useQuery`

- `useQuery` is for **reads**. It runs automatically when the component mounts, retries on failure, and caches the result.
- `useMutation` is for **writes**. It doesn't run automatically — you call `.mutate(value)` when the user clicks a button. After it finishes, you usually want to invalidate the related query so the UI shows the change.

If you find yourself calling `useQuery` for something that changes the server, you want `useMutation` instead.

## 💡 Hint — why invalidate instead of updating the cache by hand?

You could do this after the POST:

```tsx
onSuccess: (newList) => qc.setQueryData(["favorites"], newList),
```

That works. The server returns the updated list, so you set it directly.

But invalidation is safer:

- The server is the source of truth. If anything else changed it (another tab, a background job), `setQueryData` would miss it.
- The pattern is the same for every mutation: invalidate the key. You don't have to think about how to merge.

Use invalidation unless you have a clear reason not to. Optimistic updates are an advanced topic — come back to them later.

## 💡 Hint — the page shows "Loading…" forever

Check the browser console for an error. The most common causes:

1. Your server isn't running. Look at Terminal 2 — should say `api on http://localhost:8787`.
2. A handler still returns `501`. The fetcher throws. Open the Network tab and find the failing request.
3. You returned the wrong shape. `getFavorites` expects a JSON array. If your handler responded with `db` (the whole object) instead of `db.favorites`, the frontend breaks.

## 💡 Hint — what's the `/api` proxy thing?

In `vite.config.ts`:

```ts
server: {
	proxy: { "/api": "http://localhost:8787" },
},
```

This tells the dev server (Vite, on port 5173) to forward any request that starts with `/api` to your Express server (on port 8787). That's why the frontend can call `fetch("/api/favorites")` instead of the full `http://localhost:8787/api/favorites` URL — and why there's no CORS error.

You don't have to touch this. It's just here so it's not magic.

---

## Stretch — only if you finish early

### Stretch 1 — favorites count in the header

Add a `useQuery({ queryKey: ["favorites"], queryFn: getFavorites })` call to `src/components/Header.tsx`. Show the count next to the "Dog favorites" link. Notice how it updates by itself when you save or remove a favorite — that's the **shared cache key** in action. Two components, one query, one source of truth.

### Stretch 2 — handle the duplicate-save case in the UI

Right now the Save button gets disabled when `isSaved` is true. But the server also dedups — if you POSTed the same URL twice somehow, it wouldn't add it twice. What if you instead made the button **unsave** when the current dog is already saved? Same button, opposite action depending on `isSaved`. Wire `remove.mutate(dogQuery.data)` for that case.

### Stretch 3 — add a "saved at" timestamp

Change the data shape on disk from `string[]` to `{ url: string; savedAt: number }[]`. The frontend shows "saved 2 minutes ago." You'll touch the server, the fetchers in `src/lib/api.ts`, and the component. This is closer to what a real feature looks like — small change in the data model, ripples through the whole stack.

---

# Done

You did two things tonight:

1. Built a tiny Express API that persists data to a JSON file (Part A).
2. Wired that API into React using **`useQuery` for reads** and **`useMutation` + invalidation for writes** (Part B).

That's the basic shape of every real app. The "backend" is code somewhere that owns the data and exposes HTTP routes. The "frontend" reads and changes that data through those routes. React Query manages the in-between — caching, refetching, keeping the UI in sync.

## What we did NOT cover tonight

- **Authentication** — anyone who can reach your server can change the data. Real apps lock that down.
- **A real database** — flat JSON files are fine for demos and tiny side projects. Postgres or SQLite is the next step.
- **Optimistic updates** — updating the cache before the server confirms, then rolling back on error. Snappier UX, more code.
- **Error handling and retries** — React Query retries failed queries by default, but mutation errors need handling in the UI.
- **Deployment** — this whole setup is dev-only. Putting an Express server in production has its own checklist.

## Want to see the finished version?

```
git checkout exercise-express-json-solution
```

Compare the diff to your code. Then jump back to your branch:

```
git checkout exercise-express-json
```
