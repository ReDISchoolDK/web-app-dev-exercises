# Exercise: Debugging React

> **You are on the solution branch.** All three bugs are already fixed. To do
> the exercise yourself, switch to `exercise-debugging` first.

Keep this file open while you work.

You will fix three bugs in a small task-manager app. One bug per page, and each one needs a different tool. By the end you'll have used the whole debugging method.

**You do not need to guess.** Every bug leaves visible evidence. This file tells you which tool to open and what to look for.

---

## Setup

You should be on the branch `exercise-debugging`. Check with:

```
git status
```

Then:

```
pnpm install
pnpm dev
```

Open <http://localhost:5173/exercise/debugging>.

If you haven't installed **React Developer Tools**, do it now — it takes 30 seconds:

- Chrome: <https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi>
- Firefox: <https://addons.mozilla.org/en-US/firefox/addon/react-devtools/>

After installing, close and reopen DevTools. You should see **⚛ Components** and **⚛ Profiler** tabs.

---

## ⚠️ This branch does not pass its own checks — on purpose

Run this now, before you start:

```
pnpm typecheck
pnpm check
```

Both fail. That's intended, and it's part of the lesson. Don't "fix" the errors yet — you'll come back to them at the end and see which bugs the tooling could have caught for you before you ever opened a browser.

Every other exercise branch in this repo is green. This one is the exception.

---

## How the repo is laid out

The app is a small task manager. Three pages, one bug each.

| Step | Route | File | Bug | Tool |
| ---- | ----- | ---- | --- | ---- |
| 1 | `/exercise/debugging` | `src/routes/exercise/debugging/index.tsx` | Runtime crash | Console + Sources |
| 2 | `/exercise/debugging/add` | `src/routes/exercise/debugging/add.tsx` | Silent API failure | Network |
| 3 | `/exercise/debugging/stats` | `src/routes/exercise/debugging/stats.tsx` | Stale state | React DevTools |

Shared data and the API helper live in `src/lib/tasks.ts`. **That file has no bugs** — don't spend time there.

---

## The method

Same four moves every time, whatever the bug:

1. **Reproduce it.** Know exactly which click causes it.
2. **Read the evidence.** The error, the request, the state. Don't guess from the UI.
3. **Narrow it down.** Breakpoint, log, or step through until you find the last line that behaves.
4. **Fix the cause, not the symptom.** Then check the evidence is gone.

---

## Pair format

- **Driver** — writes the code.
- **Navigator** — reads this file out loud and drives the tools.

Your instructor will call a swap at the start of each step. In this exercise the navigator has the more interesting job: they're the one in DevTools. Swap so both of you get time in there.

---

# 🛑 STOP

## Wait for the demo before you start Step 1.

Your instructor will demo the method first. **Laptops closed.** Watch. Then come back here.

Working through this on your own? Just keep going.

---

# Step 1 — The page crashes

## Route

<http://localhost:5173/exercise/debugging>

## Goal

The task list renders nothing and the console has a red error. Make the list appear.

## Where to look

Open the **Console** tab first. Read the actual error text — the whole line, not just the red colour.

Then open **Sources**, find the file in the file tree on the left, and set a breakpoint on the line the error names. Reload. When it pauses, hover over the variable to see what it actually holds.

## Steps

1. Reproduce: load the page. See the crash.
2. Read the console error out loud. What is `undefined`? What was called on it?
3. Open Sources, breakpoint that line, reload.
4. Hover the variable. Confirm what it is.
5. Fix it. Reload. The list should render.

## What the bug looks like

```
TypeError: Cannot read properties of undefined (reading 'map')
```

Something is `undefined` that should be an array.

## 💡 Hint — where does the value come from?

Look at where `tasks` is created, not where it's used. The crash happens at `.map()`, but the cause is one line earlier.

## 💡 Hint — what does `useState()` return with no argument?

`useState()` with nothing passed in gives you `undefined` as the initial value. Not `[]`. Not `null`. `undefined` — and `undefined.map()` throws.

## How you know it's working

- [ ] The five tasks render.
- [ ] The console has no red errors.
- [ ] Clicking **Done** toggles a task and the strike-through appears.

## Stretch (if you finish early)

`pnpm typecheck` catches this one. Run it and read what TypeScript says. Which is faster — the browser or the compiler?

---

# 🛑 STOP

## Wait for the debrief before Step 2.

---

# Step 2 — Saving does nothing

## Route

<http://localhost:5173/exercise/debugging/add>

## Goal

Type a task, press **Save**, and nothing happens. No error. No new task. Find out why.

## Where to look

The **Network** tab. This is the point of this step: the app is silent, but the network is not.

Open Network, tick **Fetch/XHR** to filter, then press Save and watch the row that appears. Look at the **status** and the **request URL**.

## Steps

1. Open the Network tab before you click anything.
2. Type a task and press Save.
3. Find the request. What status came back?
4. Read the URL carefully, character by character.
5. Fix it. Save again. Confirm you get a success status.

## What the bug looks like

A request appears in Network with status **404**. The app says nothing at all — no message on screen, nothing in the console.

## 💡 Hint — read the URL character by character

A 404 means the server understood you fine and has nothing at that address. That usually means the path is wrong, not the code around it. Say the URL out loud, slowly.

## 💡 Hint — why was it silent?

Find the `catch` block. Look at what it does with the error. An empty `catch` is how a bug hides: the request fails, the error is caught, and then it's thrown away without telling anyone.

## How you know it's working

- [ ] Network shows a **201**, not a 404.
- [ ] The saved task appears under "Saved this session".
- [ ] The input clears after saving.

## Stretch (if you finish early)

Make the failure loud. Add an error message to the page so that the *next* time a request fails, whoever's using it can see. Then break the URL again on purpose to check your message shows up. This is the real fix — an empty `catch` is a bug even when the URL is right.

---

# 🛑 STOP

## Wait for the debrief before Step 3.

---

# Step 3 — The numbers never change

## Route

<http://localhost:5173/exercise/debugging/stats>

## Goal

Clicking **done** or **todo** should change the count and the list. It doesn't. The page is stuck showing all five tasks.

## Where to look

**React DevTools → ⚛ Components.** Select the `StatsPage` component and look at its state in the right-hand panel.

Click a filter button. Watch both pieces of state. One of them changes. One of them doesn't. That gap is the bug.

## Steps

1. Open React DevTools, Components tab.
2. Select `StatsPage` in the tree.
3. Click **done**. Watch the state panel.
4. Note which value updated and which stayed put.
5. Find the code that should have updated it. Fix it.

## What the bug looks like

`filter` changes to `"done"` in the state panel. `visible` stays exactly as it was. The UI follows `visible`, so nothing moves.

## 💡 Hint — what makes an effect run again?

A `useEffect` only re-runs when something in its dependency array changes. An empty array `[]` means "run once, on mount, and never again."

## 💡 Hint — the rule

Every value the effect reads from outside itself belongs in the dependency array. Read the effect body. What does it use? Is that thing listed?

## How you know it's working

- [ ] Clicking **done** shows only completed tasks and the count drops.
- [ ] Clicking **todo** shows only unfinished tasks.
- [ ] Clicking **all** brings all five back.
- [ ] In React DevTools, `visible` now changes whenever `filter` does.

## Stretch — the better fix

Adding the dependency makes it work. But ask a harder question: **why is this in state at all?**

`visible` is just `filter` applied to a list. It can be worked out during render:

```tsx
const visible = applyFilter(INITIAL_TASKS, filter);
```

Delete the `useState` and the `useEffect` entirely and use that line instead. Now the bug is impossible — there's no second copy of the data to fall out of date.

That's the real lesson. State that mirrors other state will eventually disagree with it. The safest bug is the one you can't write.

---

# Done

Three bugs, three tools:

| Bug | Evidence | Tool |
| --- | -------- | ---- |
| Crash | A thrown error naming the line | Console + Sources |
| Silent failure | A request that failed | Network |
| Stale value | State that didn't update | React DevTools |

The method didn't change. Only the panel did. When something is wrong, ask **where would this leave a trace?** and open that panel.

## Now run the checks

```
pnpm typecheck
pnpm check
```

Bug 1 was a type error. Bug 3 was a lint error. Both were sitting there before you ever opened a browser — the tooling had already found two of your three bugs.

Bug 2 was the only one that needed a human and a Network tab. A wrong URL is still a valid string; no compiler can tell you that `/todoss` isn't a real path.

That's the takeaway: run the cheap checks first, and save the debugging for what they can't catch.

## Want to see the finished version?

```
git checkout exercise-debugging-solution
```

## What we did not cover

- **Performance profiling** — the ⚛ Profiler tab, finding slow renders.
- **Memory leaks** — effects that never clean up, listeners that pile up.
- **Error boundaries** — catching a crash so one broken component doesn't blank the page.
- **Debugging production** — source maps, and tools like Sentry.

These are the next layer. Start with what you learned here.
