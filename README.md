# Exercise: Forms — Login with TanStack Form + Zod

> **You are on the solution branch.** This is the answer key. If you want to
> do the exercise yourself, switch to `exercise-login` first.

You will build a login form. It checks that the email looks like an email and
that the password is long enough, it shows errors only after someone leaves a
field, and it keeps the submit button disabled until everything is valid.
When the form is submitted, the email goes into a **Zustand store** so the
rest of the app knows who is signed in.

> ⚠️ This is **fake** auth. There is no server, no token, and no password
> check. Never keep a real password or token in client-side state like this.
> Tonight is about forms and shared state, not security.

**Don't read ahead.** Do the steps in order. Hints are there for when you get
stuck — read them when you need them, not before.

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

| File | What you do to it |
| ---- | ----------------- |
| `src/routes/exercise/login/index.tsx` | Build the form. This is the exercise. |
| `src/stores/auth.ts` | Small store for who is logged in. |

The `Field`, `FieldLabel` and `FieldError` components are already in
`src/components/ui/` — you don't have to build those.

---

## Background: why a form library?

You could do this with `useState` per field, plus a `touched` flag per field,
plus an `errors` object, plus your own validation. That's a lot of moving
parts, and it's the same lot every single time.

TanStack Form holds the values, tracks which fields were touched, runs your
validation and tells you whether the form can be submitted. **Zod** is where
you describe what valid means:

```ts
const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});
```

One schema, both fields, and the messages live next to the rules.

---

## Step 1 — The auth store

Open `src/stores/auth.ts`. Make a small Zustand store with:

- `loggedInEmail: string | null` — starts as `null`
- `setLoggedIn(email)` — saves the email
- `logout()` — sets it back to `null`

💡 Same Immer middleware pattern as the bookmarks exercise.

---

## Step 2 — The schema

In `src/routes/exercise/login/index.tsx`, write `loginSchema` with Zod:

- `email` must be a valid email, message `"Enter a valid email"`
- `password` must be at least 8 characters, message `"At least 8 characters"`

💡 In Zod 4 it's `z.email(...)` at the top level, not `z.string().email(...)`.

---

## Step 3 — Create the form

Call `useForm` with `defaultValues` for both fields, and hook the schema up:

```ts
validators: {
  onBlur: loginSchema,
}
```

💡 `onBlur`, not `onChange`. Nobody likes being told their email is invalid
while they're still typing the first letter.

💡 In the `<form onSubmit>` handler you still need `e.preventDefault()` before
calling `form.handleSubmit()`, or the browser reloads the page.

---

## Step 4 — Render the fields

For each field, use `<form.Field name="...">` and render an `Input` inside a
`Field`. Each input needs:

- `value={field.state.value}`
- `onChange={(e) => field.handleChange(e.target.value)}`
- `onBlur={field.handleBlur}` ← without this, `onBlur` validation never runs

Show the error only once the field has been touched **and** is invalid:

```ts
const invalid = field.state.meta.isTouched && !field.state.meta.isValid;
```

💡 Set `aria-invalid={invalid}` on the `Input` too. That's what tells a screen
reader the field is wrong — the red border alone doesn't.

---

## Step 5 — The submit button

Wrap the button in `<form.Subscribe>` and disable it while the form can't be
submitted:

```tsx
<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
```

💡 `Subscribe` re-renders just the button instead of the whole form on every
keystroke.

---

## Step 6 — Log in and out

In `onSubmit`, call `setLoggedIn(value.email)`. When `loggedInEmail` is set,
render a "Logged in" view with a **Log out** button instead of the form.

---

## Done when

- [ ] Typing a bad email and clicking away shows "Enter a valid email"
- [ ] A short password shows "At least 8 characters"
- [ ] The Log in button is disabled while the form is invalid
- [ ] Submitting valid details switches to the "Logged in" view
- [ ] Log out brings the form back
- [ ] `pnpm typecheck` and `pnpm check` are clean

## Stuck?

The answer key is on `exercise-login-solution`:

```
git diff exercise-login-solution -- src/routes/exercise/login/index.tsx
```

## Going further

- Add a "confirm password" field that must match. Zod's `.refine()` handles
  cross-field rules.
- Make the Header show the logged-in email and a Log out button.
- Protect a route: redirect to `/exercise/login` if `loggedInEmail` is null.
