# Exercise: Tailwind — Style a Page in Three Layers

> **You are on the solution branch.** This is the answer key. To do the
> exercise yourself, switch to `exercise-tailwind` first.

Keep this file open while you work.

You will style an unstyled page using only **Tailwind utility classes** — no CSS files. The page is a team grid: six profile cards and a row of action buttons. Right now it's plain black text on a gray page. When you're done it looks like something you'd ship.

You don't need to memorize class names. Install the **Tailwind CSS IntelliSense** VS Code extension (`bradlc.vscode-tailwindcss`) so classes autocomplete as you type, and search <https://tailwindcss.com/docs> for anything else.

**Don't read ahead.** Do the steps in order. Hints are there for when you get stuck — read them when you need them, not before.

---

## Setup

You should be on the branch `exercise-tailwind`. Check with:

```
git status
```

Then:

```
pnpm install
pnpm dev
```

(`pnpm install` won't download anything new — Tailwind is already part of the template.)

Open <http://localhost:5173/exercise/tailwind>.

---

## How the repo is laid out

Everything lives in one route folder. The structure is done — you only add classes.

| File | What you do to it |
| ---- | ----------------- |
| `src/routes/exercise/tailwind/ProfileCard.tsx` | Step 1 — style one card |
| `src/routes/exercise/tailwind/ProfileGrid.tsx` | Step 2 — make the grid responsive |
| `src/routes/exercise/tailwind/ActionButtons.tsx` | Step 3 — hover, focus, press, disabled |
| `src/routes/exercise/tailwind/index.tsx` | The page shell. Read it, don't touch it. |
| `src/routes/exercise/tailwind/profiles.ts` | The data. Don't touch it. |

---

## Background: how Tailwind classes work

Every class is `property-value`: `p-4` is padding, `bg-white` is background color, `text-xl` is font size. You stack them in `className` and the element is styled — no CSS file, no naming things.

Two prefixes unlock the rest of the exercise:

- `hover:bg-blue-700` — apply **only in a state** (hover, focus, active, disabled)
- `md:grid-cols-2` — apply **only from a screen width** (768px and up)

That's the whole system. The three steps walk up exactly that ladder.

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

# Step 1 — Style the profile card

## File

`src/routes/exercise/tailwind/ProfileCard.tsx`

## Goal

Turn the plain markup into a card. Target:

```
┌───────────────────────────────┐
│  ⬤  Ada Morgan               │   ← avatar: 64px circle
│      Frontend Developer       │   ← role: small, gray
│                               │
│  Builds interfaces that feel  │   ← bio: regular, some
│  fast. Will argue about ...   │      space above
└───────────────────────────────┘
     white bg · rounded corners · shadow · thin border · padding
```

## Steps

1. **The card box** — on the outer `div`: white background, generous rounded corners, a medium shadow, a thin gray border, padding.
2. **Avatar next to text** — wrap the `img` and the name/role block in a flex row with a gap. Make the avatar a fixed 64px circle that crops the image instead of squashing it.
3. **Type hierarchy** — name: larger and bold. Role: small and muted gray. Bio: regular, with margin above so it breathes.

## Class reference for this step

You still have to decide where each one goes:

| What | Classes |
| ---- | ------- |
| Card box | `bg-white` `rounded-xl` `shadow-md` `border` `border-gray-200` `p-6` |
| Flex row | `flex` `items-start` `gap-4` |
| Avatar | `size-16` `rounded-full` `object-cover` `shrink-0` |
| Text | `text-xl` `font-bold` `text-gray-900` · `text-sm` `text-gray-500` · `text-gray-700` `mt-4` |

## How you know it's working (navigator: tick these out loud)

- [ ] The card is a white, rounded, shadowed box on the gray page
- [ ] The avatar is a circle, left of the name, and not squeezed
- [ ] Name / role / bio read as three clearly different levels
- [ ] Nothing is clipped or overflowing

## 💡 Hint — nothing changes when I add a class

Check the spelling — `text-grey-500` doesn't exist (US spelling: `gray`). If IntelliSense doesn't autocomplete it, Tailwind doesn't know it either.

## 💡 Hint — the avatar is a squashed oval, not a circle

Shape: the `img` needs a fixed square size **and** `rounded-full` **and** `object-cover`. `size-16` sets width and height at once; `object-cover` crops the picture to fill the square instead of stretching it.

## 💡 Hint — reveal: the avatar line

```tsx
<img
  src={profile.avatarUrl}
  alt={profile.name}
  className="size-16 shrink-0 rounded-full object-cover"
/>
```

`shrink-0` stops flexbox from squeezing the image when the text next to it is long.

---

# 🛑 STOP

Wait here. Your instructor will debrief Step 1 and demo Step 2.

---

# Step 2 — Responsive card grid

## File

`src/routes/exercise/tailwind/ProfileGrid.tsx`

## Goal

One column on a phone, two on a tablet, three on a laptop. Tailwind is **mobile-first**: classes without a prefix are the phone layout, and prefixed classes add rules from that width **up**.

| Prefix | Applies from |
| ------ | ------------ |
| (none) | always — this is your phone layout |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

So `md:grid-cols-2` means "two columns at 768px **and wider**" — not "only at 768px".

## Steps

1. Make the wrapper a grid: one column, a gap between cards, padding around the whole thing.
2. Add `md:` and `lg:` versions of `grid-cols-*` for two and three columns.

## How to test it

1. Open DevTools (`F12`) and click the **device toolbar** icon (`Ctrl+Shift+M` / `Cmd+Shift+M`).
2. Set the width to **375** — you should see one column.
3. Drag the width slowly out to ~1440 and watch the grid snap to 2 columns (at 768) and 3 (at 1024). No reload needed.

## How you know it's working

- [ ] 1 column at 375px
- [ ] 2 columns at 800px
- [ ] 3 columns at 1100px
- [ ] Visible gaps between cards — they never touch

## 💡 Hint — which classes?

Grid classes are `grid`, `grid-cols-1`, `grid-cols-2`, `grid-cols-3`, and `gap-6`. Now add prefixes to the right ones.

## 💡 Hint — reveal: the whole line

```tsx
<div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
```

---

# 🛑 STOP

Wait here. Your instructor will debrief Step 2 and demo Step 3.

---

# Step 3 — Interactive action buttons

## File

`src/routes/exercise/tailwind/ActionButtons.tsx`

## Goal

Four buttons: **Save changes** (blue), **Cancel** (gray), **Delete account** (red), and a disabled **Processing…**. Every one of them:

- darkens on hover
- shows a visible ring when focused **with the keyboard**
- shrinks slightly while pressed
- fades out and blocks the cursor when disabled

## Steps

1. Build the shared part once, in a string, so you don't repeat it four times:

   ```tsx
   const baseButton =
   	"rounded-lg px-4 py-2 font-medium transition duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50";
   ```

2. Each button combines the base with its own colors:

   ```tsx
   <button type="button" className={`${baseButton} bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500`}>
   ```

3. Do the same for gray (`bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:ring-gray-500`) and red (`bg-red-600 hover:bg-red-700 focus-visible:ring-red-500`). The disabled button reuses the blue variant — the `disabled:` classes do the rest.

## The keyboard test

Click somewhere empty on the page, then press **Tab** a few times. A ring should jump from button to button. Press **Space** or **Enter** — the button should visibly shrink.

**If you can't tell which button is focused, keyboard users can't either.** That ring is not decoration; for anyone who navigates without a mouse it's the cursor.

## How you know it's working

- [ ] Three clearly different button colors, plus one faded disabled one
- [ ] Hover darkens each button
- [ ] Tab moves a visible ring between the buttons
- [ ] Click (or Space/Enter) makes the button shrink slightly
- [ ] The disabled button ignores hover and shows a `not-allowed` cursor

## 💡 Hint — what's `focus-visible:`?

`focus:` fires on every focus, including mouse clicks. `focus-visible:` fires when the browser thinks the ring is *needed* — keyboard navigation. That's why clicking shows no ring but Tab does. Both are real Tailwind prefixes; here we want `focus-visible:`.

## 💡 Hint — my ring is invisible

Shape: a ring needs a width **and** a color: `focus-visible:ring-2 focus-visible:ring-blue-500`. Without a color it uses the text color, which can disappear against the background. `ring-offset-2` adds a white gap that makes it pop.

## 💡 Hint — why `outline-hidden`?

The browser draws its own default focus outline. `focus-visible:outline-hidden` hides it so your ring is the only indicator — but keeps an invisible outline for Windows High Contrast mode. (Tailwind also has `outline-none`, which removes even that. Prefer `outline-hidden`.)

---

## Stretch — only if you finish early

### Stretch 1 — a category color bar

Give each card a colored left edge: `border-l-4 border-blue-500` on the card box. Try making it depend on the profile's role.

### Stretch 2 — responsive page title

Make the "Team" heading grow with the screen: `text-xl md:text-2xl lg:text-3xl`. Same prefix system, third property.

### Stretch 3 — a real `<Button>` component

Extract `<Button variant="primary" | "secondary" | "danger">`. Keep the base string, and map variant → color classes with an object:

```tsx
const variantClasses = {
	primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
	// ...
} satisfies Record<string, string>;
```

---

# Done

| Step | You built | The concept |
| ---- | --------- | ----------- |
| 1 | A profile card | `property-value` classes: spacing, color, type, flexbox |
| 2 | A responsive grid | `breakpoint:property-value`, mobile-first |
| 3 | Interactive buttons | `state:property-value`, keyboard accessibility |

The whole utility system is four shapes:

```
p-4                   property-value
hover:bg-blue-700     state:property-value
md:grid-cols-2        breakpoint:property-value
md:hover:bg-blue-700  breakpoint:state:property-value  (they stack)
```

Every Tailwind class you'll ever write fits one of those.

**One convention note:** this exercise uses raw palette classes (`bg-white`, `text-gray-500`) on purpose, to teach the utility system. App code in this repo uses the semantic shadcn colors (`bg-primary`, `text-muted-foreground`) — see `docs/conventions.md`.

## Want to see the finished version?

```
git checkout exercise-tailwind-solution
```

## What we did not cover

- **`dark:`** — a prefix like the others, for dark mode.
- **Design tokens** — Tailwind v4 is configured in CSS with `@theme` (there is no `tailwind.config.js`). That's where custom colors and fonts come from.
- **`cn()` and `tailwind-merge`** — combining class strings without conflicts, used all over `src/components/ui/`.
- **Animations** — `animate-spin`, `transition-*` beyond what buttons needed.
- **Component libraries on top of Tailwind** — shadcn/ui, which this repo uses for its own UI.

These are the next layer. Start with what you learned here.
