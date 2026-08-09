// =====================================================================
// EXERCISE — Login page (TanStack Form + Zod + Zustand)
//
// Goal: A login form that validates on blur and, on submit, records the
// email in a shared Zustand store.
//
// Success criteria:
//   [ ] Email must look like an email, password must be 8+ characters
//   [ ] Errors appear on blur, not on every keystroke
//   [ ] The submit button is disabled while the form is invalid
//   [ ] After submit the page swaps to a "Logged in" view
//   [ ] Log out returns you to the form
//
// 💡 Every input needs onBlur={field.handleBlur}, or onBlur validation
//    never runs and the button never enables.
//
// Navigator's reading:
//   https://tanstack.com/form/latest/docs/framework/react/quick-start
//   https://zod.dev/
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
// TODO(step 3): import useForm from "@tanstack/react-form"
// TODO(step 2): import { z } from "zod"
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth";

export const Route = createFileRoute("/exercise/login/")({
	component: LoginPage,
});

// TODO(step 2): describe what "valid" means with a Zod schema.
//   email    — must be a valid email, message "Enter a valid email"
//   password — at least 8 characters, message "At least 8 characters"
// In Zod 4 it's z.email(...), not z.string().email(...).

function LoginPage() {
	// TODO(step 3): also pull `setLoggedIn` out of the store — you'll need it
	// in the form's onSubmit.
	const { loggedInEmail, logout } = useAuthStore();

	// TODO(step 3): create the form with useForm.
	//   defaultValues: { email: "", password: "" }
	//   validators: { onBlur: loginSchema }
	//   onSubmit: ({ value }) => setLoggedIn(value.email)

	// TODO(step 6): when loggedInEmail is set, return a "Logged in" view with
	// the email and a Log out button instead of the form below.

	return (
		<div className="mx-auto max-w-sm p-8">
			<h1 className="mb-2 text-3xl font-bold">Login</h1>
			<p className="mb-6 text-muted-foreground">
				TanStack Form + Zod. Validates on blur. On submit, the email goes into a
				Zustand store.
			</p>

			{/*
				TODO(step 4): replace the two plain fields below with <form.Field>
				wrappers so TanStack Form owns the values and the touched state.
				Each Input needs value, onChange, onBlur and aria-invalid.

				TODO(step 5): wrap the button in <form.Subscribe> and disable it
				while the form can't be submitted.

				Remember e.preventDefault() in onSubmit, then form.handleSubmit().
			*/}
			<form onSubmit={(e) => e.preventDefault()}>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="email">Email</FieldLabel>
						<Input id="email" name="email" type="email" readOnly />
						<FieldError errors={[]} />
					</Field>

					<Field>
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<Input id="password" name="password" type="password" readOnly />
						<FieldError errors={[]} />
					</Field>

					<Button type="submit" disabled>
						Log in
					</Button>
				</FieldGroup>
			</form>

			<p className="mt-6 text-sm text-muted-foreground">
				Signed in as: {loggedInEmail ?? "nobody yet"} ·{" "}
				<button type="button" className="underline" onClick={logout}>
					log out
				</button>
			</p>
		</div>
	);
}
