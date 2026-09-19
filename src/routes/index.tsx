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
			<p className="mb-6 text-sm text-muted-foreground">Exercise branch</p>

			<h1 className="mb-2 text-3xl font-bold">Debugging React</h1>

			<p className="mb-6 text-muted-foreground">
				Your instructions are in{" "}
				<code className="rounded bg-muted px-1">README.md</code> on this branch.
				Keep it open while you work.
			</p>

			<div className="rounded-md border border-dashed px-4 py-3">
				<p className="mb-3 text-sm text-muted-foreground">
					Three bugs, one per page:
				</p>
				<ol className="flex list-inside list-decimal flex-col gap-2 text-sm text-muted-foreground">
					<li>
						<Link to="/exercise/debugging" className="underline">
							/exercise/debugging
						</Link>{" "}
						— the list
					</li>
					<li>
						<Link to="/exercise/debugging/add" className="underline">
							/exercise/debugging/add
						</Link>{" "}
						— adding a task
					</li>
					<li>
						<Link to="/exercise/debugging/stats" className="underline">
							/exercise/debugging/stats
						</Link>{" "}
						— the counts
					</li>
				</ol>
			</div>
		</div>
	);
}
