// =====================================================================
// SOLUTION — Login page (TanStack Form + Zod + Zustand)
//
// Goal: A login form that validates on blur and, on submit, records the
// email in a shared Zustand store.
//
// Success criteria:
//   [x] Email must look like an email, password must be 8+ characters
//   [x] Errors appear on blur, not on every keystroke
//   [x] The submit button is disabled while the form is invalid
//   [x] After submit the page swaps to a "Logged in" view
//   [x] Log out returns you to the form
//
// Navigator's reading:
//   https://tanstack.com/form/latest/docs/framework/react/quick-start
//   https://zod.dev/
// =====================================================================

import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
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

// The schema is the single source of truth for what "valid" means.
// TanStack Form runs it for you — you never write if-statements per field.
const loginSchema = z.object({
	email: z.email("Enter a valid email"),
	password: z.string().min(8, "At least 8 characters"),
});

function LoginPage() {
	const { loggedInEmail, setLoggedIn, logout } = useAuthStore();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			// onBlur, not onChange: don't shout at people while they type.
			onBlur: loginSchema,
		},
		onSubmit: async ({ value }) => {
			setLoggedIn(value.email);
		},
	});

	if (loggedInEmail) {
		return (
			<div className="mx-auto max-w-sm p-8">
				<h1 className="mb-2 text-3xl font-bold">Logged in</h1>
				<p className="mb-6 text-muted-foreground">
					Signed in as <span className="font-medium">{loggedInEmail}</span>
				</p>
				<Button variant="outline" onClick={logout}>
					Log out
				</Button>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-sm p-8">
			<h1 className="mb-2 text-3xl font-bold">Login</h1>
			<p className="mb-6 text-muted-foreground">
				TanStack Form + Zod. Validates on blur. On submit, the email goes into a
				Zustand store.
			</p>

			<form
				onSubmit={(e) => {
					// The browser would reload the page otherwise.
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<FieldGroup>
					<form.Field name="email">
						{(field) => {
							const invalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
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

					<form.Field name="password">
						{(field) => {
							const invalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={invalid}>
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
									<Input
										id={field.name}
										name={field.name}
										type="password"
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

					{/* Subscribe re-renders only this button, not the whole form. */}
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button type="submit" disabled={!canSubmit}>
								{isSubmitting ? "Logging in..." : "Log in"}
							</Button>
						)}
					</form.Subscribe>
				</FieldGroup>
			</form>
		</div>
	);
}
