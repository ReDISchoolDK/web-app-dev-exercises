# Exercise: The Bridge — First Contact with the Web

Keep this file open while you work.

You already know how to program. This exercise connects what you know to the web: what a web page is made of, and the handful of JavaScript patterns this course leans on later. Nothing here is React — that comes after.

A web page is three parts:

1. **HTML** — the structure. Nested tags form a tree (the browser calls it the **DOM**).
2. **CSS** — the look. Selectors pick elements in that tree and style them.
3. **JavaScript** — the behavior. Code that runs in the browser.

You'll touch all three, in that order, in one tiny folder.

**Don't read ahead.** Do the tasks in order. Hints are tiered — a nudge first, the shape second, the answer last. Read them when you're stuck, not before.

---

## Setup

You should be on the branch `exercise-bridge`. Check with:

```
git status
```

Then:

```
pnpm install
pnpm dev
```

Open exactly this address: **<http://localhost:5173/bridge/>** (with the trailing slash).

There's also an app at `http://localhost:5173/` — ignore it. That's the React app this course builds later. Your page lives next to it.

Also open **DevTools**: press `F12` (or right-click → Inspect) and pick the **Console** tab. Keep it open the whole time.

---

## How the repo is laid out

Everything for this exercise is in one folder, away from the app:

| File | What it is |
| ---- | ---------- |
| `bridge/index.html` | The structure — a small card |
| `bridge/bridge.css` | The look — styles for that card |
| `bridge/bridge.ts` | The behavior — your three code tasks |

The `src/` folder is the React app. Don't touch it today.

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

# Task 1 — Read the card

## Files to read

`bridge/index.html` and `bridge/bridge.css`

## Do this

1. Read the HTML. Notice the nesting: `html` → `body` → `div.card` → `h2` and `p`. That nesting **is** the DOM tree.
2. Read the CSS. `.card` means "every element with `class="card"`". Predict, out loud: what will the card look like? Background? Corners? Where on the page?
3. Now open <http://localhost:5173/bridge/> and check your prediction.
4. In DevTools, switch to the **Elements** tab and click the `<div class="card">`. The Styles panel shows exactly the CSS you just read, applied to exactly that element. That's the whole trick: HTML is the tree, CSS selects into it.

## How you know it's done

- [ ] You can point at the line in `bridge.css` responsible for the rounded corners
- [ ] You found the card in the Elements tab and saw its styles

---

# Task 2 — Change the card (no guide)

## Do this

Two changes, **predict before you save** each time:

1. Add a second element to the card in `index.html` — another `<p>` with a second fact, or a `<h3>`, your choice.
2. Change one style in `bridge.css` — the background color, the border radius, the shadow, anything visible.

The browser reloads on save. Say what you expect first, then look.

## How you know it's done

- [ ] Your new element shows up inside the card, styled like the rest
- [ ] Your style change looks the way you predicted

## 💡 Hint 1 — where does the new element go?

Inside `<div class="card">` … `</div>`. Nesting decides belonging.

## 💡 Hint 2 — the shape

```html
<div class="card">
	<h2>Grace Hopper</h2>
	<p>…the existing fact…</p>
	<p>…your new fact…</p>
</div>
```

Why is it styled already? Look at the `.card p` selector in the CSS — it targets every `p` inside the card, including yours.

## 💡 Reveal — one style change

In `bridge.css`, change `background-color: #ffffff;` to `background-color: #fef9c3;` (a pale yellow). Any hex color works — DevTools' color picker (click the little square in the Styles panel) lets you try values live before writing them into the file.

---

# Task 3 — Read and predict

## File to read

`bridge/bridge.ts`, **Section 1**

## Do this

1. Read the `tasks` array: it's a list of objects. Each object has a `name`, a number of `minutes`, and an `isDone` flag. Compare with what you know — a list of dicts (Python), a List of objects (Java/C#).
2. Read the three chains. `filter` keeps the elements where the arrow function says `true`. `map` transforms every element. `(task) => task.minutes <= 15` is a whole function: input `task`, returns that comparison.
3. **Write down** what A, B and C will print. Both of you commit to an answer.
4. Check the browser Console. Scores on the board.

## How you know it's done

- [ ] You predicted A, B and C before looking (wrong guesses are fine — they're the point)
- [ ] Whoever guessed wrong can now say *why* the real answer is what it is

## 💡 Hint — B surprised me

`.map((task) => task.name.toUpperCase())` builds a **new** array of shouted names in the same order. Index `[1]` is the second element — counting starts at 0.

---

# Task 4 — Translate the pseudocode (no guide)

## File to edit

`bridge/bridge.ts`, **Section 2**

## Do this

The comment shows pseudocode:

```
for each task in tasks:
  if task is done:
    collect task.name
```

Write it as **one** `filter(...).map(...)` chain, replacing the empty array in `doneTaskNames`. Save, check the Console: it should print the names of the two finished tasks.

## How you know it's done

- [ ] The Console prints `Done tasks:` followed by two names
- [ ] There's no `for` loop anywhere — one chain does it

## 💡 Hint 1 — which method is the `if`?

The `if … collect` part is a `filter`. The "collect **task.name**" part (you want the name, not the whole object) is a `map`.

## 💡 Hint 2 — the shape

```ts
tasks.filter((task) => /* keep the done ones */).map((task) => /* just the name */);
```

## 💡 Reveal — the full line

```ts
const doneTaskNames: string[] = tasks
	.filter((task) => task.isDone)
	.map((task) => task.name);
```

---

# Task 5 — Make TypeScript catch a bug

## File to edit

`bridge/bridge.ts`, **Section 3**

## Do this

1. Add a type annotation: change `const minutesPerDay =` to `const minutesPerDay: number =`. Nothing changes — the value already is a number. You've just written the promise down.
2. Now break the promise: change `30` to `"thirty"`. Look at the editor — red squiggle. Hover it and **read the message out loud**.
3. Put `30` back. Squiggle gone.

That's TypeScript's whole job: it caught a wrong value **before the code ever ran**. In plain JavaScript, `"thirty"` would have sailed through and exploded later, somewhere else, at runtime.

## How you know it's done

- [ ] You saw the red squiggle and can say what the message meant
- [ ] The file is back to a state with no red anywhere

## 💡 Hint — I don't get a squiggle

Make sure you're editing `bridge/bridge.ts` in VS Code with the repo folder open (not a copy of the file elsewhere). The squiggle usually appears a second or two after you stop typing. Still nothing? Run `pnpm typecheck` in the terminal — it prints the same error.

---

# Done

You met the whole stack in one folder:

| Part | File | The idea |
| ---- | ---- | -------- |
| HTML | `index.html` | Nested tags form a tree — the DOM |
| CSS | `bridge.css` | Selectors pick into the tree and style it |
| JS | `bridge.ts` | Arrow functions; `filter` keeps, `map` transforms |
| TS | `bridge.ts` | Types are promises the editor checks before the code runs |

There's no separate solution branch — the reveal hints above already contain every answer.

One heads-up for the rest of this course: this is the **only raw CSS you'll write here**. The app styles everything with Tailwind utility classes instead — the comment at the bottom of `bridge.css` shows a preview of what that looks like.

## What we did not cover

- **How the page updates itself** — clicking a button and changing the DOM from code. That's exactly what React is for, and it's next.
- **`reduce` and friends** — `filter` and `map` carry you a long way first.
- **Real TypeScript types** — interfaces, unions, generics. They arrive one at a time, when a real file needs them.

Start with what you learned here.
