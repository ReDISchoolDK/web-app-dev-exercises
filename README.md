# Exercise: Forms — Login with TanStack Form + Zod

> **You are on the solution branch.** This is the answer key. To do the
> exercise yourself, switch to `exercise-login` first.

Keep this file open while you work.

You will build a login form. It checks that the email looks like an email and that the password is long enough. It shows errors only after someone leaves a field, and it keeps the submit button disabled until everything is valid. When the form is submitted, the email goes into a **Zustand store** so the rest of the app knows who is signed in.

> ⚠️ This is **fake** auth. There is no server, no token, and no password check. Never keep a real password or token in client-side state like this. This exercise is about forms and shared state, not security.

**Don't read ahead.** Do the steps in order. Hints are there for when you get stuck — read them when you need them, not before.

---

## Setup

You should be on the branch `exercise-login`. Check with:

```
git status
```

Then:

```
pnpm install
pnpm dev
```

Open <http://localhost:5173/exercise/login>.

Also open **React DevTools**. If errors aren't appearing, inspect `field.state.meta.errors` directly — much faster than guessing from the UI.

---

## How the repo is laid out

| File | What you do to it |
| ---- | ----------------- |
| `src/routes/exercise/login/index.tsx` | Build the form. This is the exercise. |
| `src/stores/auth.ts` | A small store for who is logged in. |

`@tanstack/react-form` and `zod` are already installed, and shadcn's `Field`, `FieldLabel`, `FieldError` and `FieldGroup` are already in `src/components/ui/field.tsx`. You don't have to add any of them.

---

## Background: why a form library?

You could do this with `useState` per field, plus a `touched` flag per field, plus an `errors` object, plus your own validation. That's a lot of moving parts, and it's the same lot every single time.

TanStack Form holds the values, tracks which fields were touched, runs your validation, and tells you whether the form can be submitted. **Zod** is where you describe what valid means:

```ts
const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});
```

One schema, both fields, and the messages live right next to the rules.

---

## Pair format

- **Driver** — writes the code.
- **Navigator** — reads this file out loud and tells the driver what's next.

Your instructor will call a swap partway through. The navigator's job is real: read the file, watch the screen, catch typos, ask "what does that line do?" If the navigator is quiet, only one person is working. Talk.

---

# First: try it by hand

Before the guided steps, open <http://localhost:5173/exercise/login-by-hand>. It's a working form with **zero validation**, in `src/routes/exercise/login-by-hand/index.tsx`. Typing and submitting already work — that part is not the exercise.

The task:

> Make this form reject bad input. A valid email, a password of at least 8 characters. Show an error next to the field — but **only after the user has touched it**. No form library.

No hints for this part, and no solution anywhere. The point is to feel where it hurts: checking an email is fiddly, "has this field been touched?" needs tracking, and every field needs its own error wiring. Keep whatever mess you end up with — you'll want to compare it with what the library does below.

---

# 🛑 STOP

## Wait for the demo before you start coding.

Your instructor will demo first. **Laptops closed.** Watch. Then come back here.

Working through this on your own? Just keep going.

---

# Step 1 — The auth store

## File

`src/stores/auth.ts`

## Goal

A small Zustand store that remembers who is signed in.

## Steps

1. Wrap the store in the `immer` middleware.
2. `loggedInEmail: string | null` — starts as `null`.
3. `setLoggedIn(email)` — saves the email.
4. `logout()` — sets it back to `null`.

## What it should look like (skeleton)

```ts
export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    loggedInEmail: null,
    setLoggedIn: (email) =>
      set((state) => {
        state.loggedInEmail = email;
      }),
    logout: () =>
      set((state) => {
        state.loggedInEmail = null;
      }),
  })),
);
```

## How you know it's working

- [ ] `pnpm typecheck` passes.

## 💡 Hint — you've seen this before

Same pattern as the bookmarks exercise, including the double parentheses after `create<AuthStore>()`.

---

# Step 2 — The schema

## File

`src/routes/exercise/login/index.tsx`

## Goal

Describe what valid input looks like, with Zod.

## Steps

1. `email` must be a valid email. Message: `"Enter a valid email"`.
2. `password` must be at least 8 characters. Message: `"At least 8 characters"`.

## What it should look like (skeleton)

```ts
const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});
```

## 💡 Hint — the error message is the argument

`z.string().min(8, "At least 8 characters")` — when validation fails, that string is what shows up next to the field.

## 💡 Hint — `z.email()` is top-level

In Zod 4 it's `z.email(...)`, not `z.string().email(...)`. Zod has top-level helpers for common types: `z.email`, `z.url`, `z.uuid`.

---

# Step 3 — Create the form

## Goal

Wire `useForm` to the schema.

## What it should look like (skeleton)

```tsx
const form = useForm({
  defaultValues: {
    email: "",
    password: "",
  },
  validators: {
    onBlur: loginSchema,
  },
  onSubmit: async ({ value }) => {
    setLoggedIn(value.email);
  },
});
```

You'll also need to pull `setLoggedIn` out of the store alongside `loggedInEmail` and `logout`.

## 💡 Hint — why `onBlur` and not `onChange`?

`onBlur` runs the schema when a field loses focus. That's the right default for most forms: you don't want errors yelling at someone on every keystroke, but you do want feedback before they hit submit.

`onChange` validates on every keystroke — noisier. `onSubmit` only validates at the end — too late. Try each and feel the difference.

## 💡 Hint — `onSubmit` only runs if validation passes

If the schema rejects the input, your handler never fires. You don't need to check again inside it.

---

# Step 4 — Render the fields

## Goal

Each input is wrapped in `form.Field`, which hands you that field's own state and handlers.

## What it should look like (skeleton)

```tsx
<form.Field name="email">
  {(field) => {
    const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
    return (
      <Field data-invalid={invalid}>
        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
        <Input
          id={field.name}
          name={field.name}
          type="email"
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={invalid}
        />
        {invalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    );
  }}
</form.Field>
```

Repeat the same pattern for `password`, with `type="password"`. Wrap both in a `<form>` and a `<FieldGroup>`, and remember `e.preventDefault()` before `form.handleSubmit()`.

## How you know it's working

- [ ] Type `not-an-email`, click outside the field → "Enter a valid email" appears.
- [ ] Type a 5-character password, click outside → "At least 8 characters" appears.
- [ ] Fix both → the errors disappear.

## 💡 Hint — `isTouched && !isValid`

Only show an error after the user has actually interacted with the field. Showing "required" before they've typed anything is hostile.

## 💡 Hint — errors never show up

Check that every `Input` has `onBlur={field.handleBlur}`. Without it the field is never marked as touched, `onBlur` validation never runs, and the submit button never enables.

## 💡 Hint — `aria-invalid` is not decoration

`aria-invalid` is what tells a screen reader the field is wrong. The red border alone only helps people who can see it. `data-invalid` is the one shadcn styles against.

---

# Step 5 — The submit button

## Goal

Keep the button disabled until the form is valid.

## What it should look like (skeleton)

```tsx
<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
  {([canSubmit, isSubmitting]) => (
    <Button type="submit" disabled={!canSubmit}>
      {isSubmitting ? "Logging in..." : "Log in"}
    </Button>
  )}
</form.Subscribe>
```

## 💡 Hint — why `Subscribe` instead of reading the form directly?

`Subscribe` re-renders just the button when those two values change, instead of re-rendering the whole form on every keystroke.

---

# Step 6 — Log in and out

## Goal

When someone is signed in, show that instead of the form.

## Steps

1. In `onSubmit`, call `setLoggedIn(value.email)`.
2. When `loggedInEmail` is set, return a "Logged in" view with the email and a **Log out** button.

## How you know it's working

- [ ] Submitting valid details switches to the logged-in view.
- [ ] The email you typed is shown.
- [ ] **Log out** brings the form back.
- [ ] `pnpm typecheck` and `pnpm check` are clean.

---

## Stretch — only if you finish early

### Stretch 1 — feel the difference

Temporarily change `validators: { onBlur: loginSchema }` to `onChange`. Reload, type in the email field, and watch errors fire on every keystroke before you've finished typing. Switch back when you're done.

### Stretch 2 — confirm password

Add a "confirm password" field that has to match. Zod's `.refine()` handles rules that span two fields.

### Stretch 3 — show it in the header

Read `loggedInEmail` from the store in `Header.tsx` and show it there. That's the payoff of putting it in a store instead of local state.

---

# Done

You wired four things together:

1. **Zod** describes what valid means, in one place.
2. **TanStack Form** holds the values, tracks touched fields, and runs the schema.
3. **shadcn's Field** components render the labels and the errors.
4. **Zustand** holds the result, so the rest of the app can see it.

That "form → validate → action → state" flow is the same in almost every app you'll build.

## Want to see the finished version?

```
git checkout exercise-login-solution
```

## What we did not cover

- **Async validation** — checking a username against a server while typing.
- **Real auth** — tokens, sessions, protected routes, hashing.
- **`useMutation`** — posting the form to an actual API.

These are the next layer. Start with what you learned here.
