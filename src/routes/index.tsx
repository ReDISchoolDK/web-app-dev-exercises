// =====================================================================
// EXERCISE BRANCH LANDING PAGE
//
// You are on an exercise branch. Your instructions live in README.md at
// the root of this branch — keep that file open while you work.
//
// This exercise is plain HTML, CSS and TypeScript in the bridge/ folder,
// not part of this React app. It is served next to the app at /bridge/.
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="mx-auto max-w-2xl p-8">
			<p className="mb-6 text-sm text-muted-foreground">Exercise branch</p>

			<h1 className="mb-2 text-3xl font-bold">
				The Bridge — First Contact with the Web
			</h1>
			<p className="mb-6 text-muted-foreground">
				Your instructions are in{" "}
				<code className="rounded bg-muted px-1">README.md</code> on this branch.
				Keep it open while you work.
			</p>

			<div className="mb-6 rounded-md border border-dashed px-4 py-3">
				<p className="text-sm text-muted-foreground">
					Your page is at{" "}
					<a href="/bridge/" className="underline">
						/bridge/
					</a>{" "}
					— mind the trailing slash. The files are in{" "}
					<code className="rounded bg-muted px-1">bridge/</code>.
				</p>
			</div>

			<p className="text-sm text-muted-foreground">
				You are looking at the React app this course builds later. It is not
				part of this exercise — you can ignore it.
			</p>
		</div>
	);
}
