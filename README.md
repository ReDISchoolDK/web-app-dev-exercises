# Exercise: Custom Hook — `useLocalStorage`

> **You are on the solution branch.** This is the answer key. To do the
> exercise yourself, switch to `exercise-use-local-storage` first.

Keep this file open while you work.

You will build a hook called `useLocalStorage(key, initial)`. It works just like `useState`, but the value also gets saved in the browser. When you reload the page, the value is still there.

**Don't read ahead.** Do the steps in order. Hints are there for when you get stuck — read them when you need them, not before.

---

## Setup

You should be on the branch `exercise-use-local-storage`. Check with:

```
git status
```

Then:

```
pnpm install
pnpm dev
```

The route, the stub hook, and the UI are already scaffolded. You only have to fill in the hook.

**Open three things side by side:**

1. This file
2. `src/hooks/useLocalStorage.ts` — the file you will fill in
3. The browser at <http://localhost:5173/exercise/use-local-storage>

Also open **DevTools → Application → Local Storage → http://localhost:5173**. Keep it visible. You will watch the keys appear and update as you go.

---

## How the repo is laid out

| File | What's already there |
| ---- | -------------------- |
| `src/hooks/useLocalStorage.ts` | The hook stub, with TODOs. This is the exercise. |
| `src/routes/exercise/use-local-storage/index.tsx` | The Counter UI, wired to placeholder values |

---

## What you're building

A custom hook with this shape:

```ts
const [count, setCount] = useLocalStorage("count", 0);
```

Same return shape as `useState`. The difference: `count` survives a page reload, because the hook saves it to `localStorage`.

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

# Step 1 — Inline first

Write the Counter using raw `useState` + `useEffect` + `localStorage`. No custom hook yet. You will pull this apart in Step 2.

**Read aloud (navigator):** "Step 1 — we make it work inline. No hook yet. We'll move it into a hook in Step 2."

## File to edit

`src/routes/exercise/use-local-storage/index.tsx`

## Do this

1. Find the line `const count = 0;` in the component.
2. Replace it with a `useState` call that reads `"count"` from `localStorage` on first render. If the key is missing, fall back to `0`.
3. Add a `useEffect` that writes `count` to `localStorage` every time it changes.
4. Wire the `+1` button: `onClick={() => setCount(count + 1)}`. Remove `disabled`.
5. Save the file.

## Code to write

```tsx
import { useEffect, useState } from "react";

// Inside the component:
const [count, setCount] = useState(() => {
  const stored = localStorage.getItem("count");
  return stored !== null ? JSON.parse(stored) : 0;
});

useEffect(() => {
  localStorage.setItem("count", JSON.stringify(count));
}, [count]);
```

## How you know it's working (navigator: tick these out loud)

- [ ] Click `+1`. The number goes up.
- [ ] Refresh the page. The count is still where you left it.
- [ ] DevTools → Application → Local Storage shows a `count` entry. Watch it update as you click.

**Don't move on until all three tick.** Ask your instructor if something looks weird.

## 💡 Hint — `localStorage` only stores strings

`localStorage.setItem("count", 3)` actually stores the string `"3"`. That's why we wrap the value with `JSON.stringify` when we write it, and `JSON.parse` when we read it. The value goes in as a number, gets stored as a string, comes back out as a number.

## 💡 Hint — `getItem` returns `null` when the key is missing

If `"count"` has never been set, `localStorage.getItem("count")` returns `null` — not `undefined`. Check for `null` directly. Don't write `stored || 0` — if you ever store an empty string, it's falsy and would also fall back to `0`, overwriting a real value. Use `stored !== null` or the `??` operator instead. Those only fall back when the value is actually missing.

---

# Step 2 — Extract the hook

Now move the Step 1 logic into a custom hook. After this step, the Counter line shrinks to just `useLocalStorage("count", 0)`.

**Read aloud (navigator):** "Step 2 — we pull the logic out of the component and put it in a hook. Same behavior, less code in the component."

## File to edit

`src/hooks/useLocalStorage.ts` — already exists with TODOs. You're going to fill in the body.

Then update `src/routes/exercise/use-local-storage/index.tsx` to call the hook.

## Do this

1. Open `src/hooks/useLocalStorage.ts`.
2. Replace the `useState<T>(initial)` line with a lazy initializer that reads from `localStorage` and falls back to `initial`.
3. Wrap `JSON.parse` in `try`/`catch`. If the stored value is bad, fall back to `initial` — don't crash.
4. Fill in the `useEffect` body: write `value` to `localStorage` under `key`.
5. The return line `[value, setValue] as const` is already there. Leave it.
6. Save the file.
7. Open the route file. Uncomment the import at the top:

   ```tsx
   import { useLocalStorage } from "@/hooks/useLocalStorage";
   ```

8. Replace the Step 1 `useState` + `useEffect` block with one line:

   ```tsx
   const [count, setCount] = useLocalStorage("count", 0);
   ```

9. Delete the old inline `useEffect` and the now-unused `useState` / `useEffect` imports.

## What `useLocalStorage.ts` ends up looking like

```ts
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    if (stored === null) return initial;
    try {
      return JSON.parse(stored) as T;
    } catch {
      // Bad data in storage — fall back, don't crash
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## How you know it's working

- [ ] The Counter component is short — no `useEffect`, no `localStorage` calls in the component file. Just one line: `useLocalStorage("count", 0)`.
- [ ] Click `+1`. Refresh. The count still survives.
- [ ] DevTools shows the `count` key updating — same as Step 1.
- [ ] No red errors in the browser console.

## 💡 Hint — what is the `<T>` for?

The `<T>` is a **type placeholder**. Whatever type you pass as `initial`, TypeScript uses for the whole hook.

Call `useLocalStorage("count", 0)` and `T` becomes `number`. Call `useLocalStorage("name", "")` and `T` becomes `string`. Same code, different type each time.

Without `<T>`, you'd need a separate hook for each type — `useNumberStorage`, `useStringStorage`, and so on. That's no fun.

## 💡 Hint — why is `useState` wrapped in `() => ...`?

That arrow function is called a **lazy initializer**.

Without it, the code inside runs on every render — even though we only need the starting value once. With the arrow function, React calls it just once, on the very first render, and ignores it after that.

`localStorage.getItem` is cheap, but reading it on every render for no reason is still waste. Use this trick any time the initial value is even slightly expensive to compute.

## 💡 Hint — try/catch the `JSON.parse`

If someone manually edits the value in DevTools, or there's leftover bad data, `JSON.parse` throws. A hook that crashes the whole component on bad data is fragile. Wrap it in `try`/`catch` and fall back to `initial`.

## 💡 Hint — why is `key` in the dep array?

The effect uses both `key` and `value` inside its body. Any value the effect reads from outside has to be in the dep array — that's the rule.

If you only list `value`, the effect won't re-run when `key` changes. That works fine as long as nobody ever passes a different key. But if a parent component ever does, the effect would keep writing to the *old* key.

Biome catches this with the `useExhaustiveDependencies` rule when you run `pnpm check`. Listen to it.

## 💡 Hint — `as const` keeps the return type narrow

The return line `[value, setValue] as const` tells TypeScript "this is a tuple of exactly two things." Without `as const`, the type widens and you can't destructure as `[value, setValue]` cleanly. The stub already has this — just don't delete it.

## 💡 Hint — the dev server didn't pick up my new hook

Save the file. Vite reloads on save. If the page still looks the same, check the browser console for a red error — usually a missing import or a typo in the export name.

---

# Step 3 — Reuse the hook

This is the payoff. Show that the same hook works for a different value with no extra work.

**Read aloud (navigator):** "Step 3 — we call the same hook a second time, with a different key, to prove it's reusable."

## File to edit

`src/routes/exercise/use-local-storage/index.tsx`

## Do this

1. Find `const name = "";` near the top of the component.
2. Replace it with a second `useLocalStorage` call — different key, string default:

   ```tsx
   const [name, setName] = useLocalStorage("name", "");
   ```

3. Wire the input: `onChange={(e) => setName(e.target.value)}`. Remove `readOnly`.
4. Save.

## How you know it's working

- [ ] Type your name in the input. The greeting updates live.
- [ ] Click `+1` a few times.
- [ ] Refresh. Both the name and the count survive.
- [ ] DevTools → Local Storage shows two entries: `count` and `name`.

That's the point of a custom hook. Same shape, different data, no duplication.

---

## Stretch — only if you finish early

### Stretch 1 — accept an updater function

`useState` lets you pass either a value or a function: `setCount(c => c + 1)`. Your hook only accepts a value right now. Make it accept either.

```tsx
setCount((c) => c + 1); // should work
setCount(7); // should also still work
```

### Stretch 2 — cross-tab sync

Open two tabs of your app side by side. Click `+1` in tab A. Tab B doesn't update. That's because `localStorage` writes don't fire any event in the writing tab — they fire a `storage` event in *other* tabs.

Subscribe to the `storage` event inside your hook with a `useEffect`. When it fires for your key, update the state.

```ts
useEffect(() => {
  function onStorage(e: StorageEvent) {
    if (e.key === key && e.newValue !== null) {
      try {
        setValue(JSON.parse(e.newValue) as T);
      } catch {
        // ignore
      }
    }
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, [key]);
```

Reload both tabs. Click `+1` in tab A. Tab B updates without a reload.

**Modern alternative:** `useSyncExternalStore` is the React-native primitive for subscribing components to an external store like `localStorage`. Overkill here, but the right tool when you need it. Worth knowing the name.

---

# Done

You did three things:

1. Built a feature using `useState` + `useEffect` + `localStorage` inline (Step 1).
2. **Extracted** that logic into a custom hook (Step 2). The component got shorter and the logic became reusable.
3. **Reused** the hook for a second value (Step 3) — different key, no duplication.

That's the whole skill. Anywhere in your project where you see the same `useState` + `useEffect` shape twice, ask: *is there a custom hook in here?*

## Want to see the finished version?

```
git checkout exercise-use-local-storage-solution
```

Compare the diff to your code. Then jump back to your branch:

```
git checkout exercise-use-local-storage
```

## What we did not cover

- **`useMemo`** and **`useCallback`** — for stable references and memoized values.
- **`useRef`** — for DOM access (focus, scroll, measure) and mutable values that don't trigger re-renders.
- **`useReducer`** — for complex state updates where multiple values change together.
- **`useSyncExternalStore`** — the modern primitive for subscribing to external stores. (Touched in Stretch 2.)

These are the next layer. Start with what you learned here.
