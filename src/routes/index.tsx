// =====================================================================
// EXERCISE BRANCH LANDING PAGE
//
// You are on an exercise branch. Your instructions live in README.md at
// the root of this branch — keep that file open while you work.
// =====================================================================

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="mx-auto max-w-2xl p-8">
			<p className="mb-6 text-sm text-muted-foreground">Solution branch</p>

			<h1 className="mb-2 text-3xl font-bold">
				Express + JSON + React Query — Dog Favorites
			</h1>

			<p className="mb-6 rounded-md border border-dashed px-4 py-3 text-sm text-muted-foreground">
				<strong className="text-foreground">This is the answer key.</strong> To
				do the exercise yourself, switch to{" "}
				<code className="rounded bg-muted px-1">exercise-express-json</code>{" "}
				first.
			</p>

			<p className="mb-6 text-muted-foreground">
				Your instructions are in{" "}
				<code className="rounded bg-muted px-1">README.md</code> on this branch.
				Keep it open while you work.
			</p>

			<div className="rounded-md border border-dashed px-4 py-3">
				<p className="text-sm text-muted-foreground">
					Start here:{" "}
					<Link to="/exercise/dog-favorites" className="underline">
						/exercise/dog-favorites
					</Link>
				</p>
				<p className="mt-3 text-sm text-muted-foreground">
					This exercise talks to the small Express API in{" "}
					<code className="rounded bg-muted px-1">server/</code>. It has to be
					running too — see the README for the command.
				</p>
			</div>
		</div>
	);
}
