// =====================================================================
// STRUGGLE — Validation by hand
//
// This form already works: typing works, submitting works. It
// validates NOTHING. Your task (from the README):
//
//   Make this form reject bad input. A valid email, a password of at
//   least 8 characters. Show an error next to the field — but only
//   after the user has touched it. No form library.
//
// There are no hints and no solution for this one. The mess you end
// up with is the point — bring it to the debrief.
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/exercise/login-by-hand/")({
	component: LoginByHandPage,
});

function LoginByHandPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	return (
		<div className="mx-auto max-w-sm p-8">
			<h1 className="mb-2 text-3xl font-bold">Login, by hand</h1>
			<p className="mb-6 text-muted-foreground">
				No form library, no validation — yet. Your job is to add it. The task is
				in the README.
			</p>

			{/* noValidate switches off the browser's built-in bubbles ("Please
			    include an '@'…") — the whole point is that YOU write the checks. */}
			<form
				noValidate
				className="flex flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault();
					setIsSubmitted(true);
				}}
			>
				<div>
					<label htmlFor="email" className="mb-2 block text-sm font-medium">
						Email
					</label>
					<Input
						id="email"
						name="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="password" className="mb-2 block text-sm font-medium">
						Password
					</label>
					<Input
						id="password"
						name="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<Button type="submit">Log in</Button>
			</form>

			{isSubmitted && (
				<p className="mt-6 text-sm text-muted-foreground">
					Submitted. Whether the input was any good is another question.
				</p>
			)}
		</div>
	);
}
