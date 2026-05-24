import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Express + React Query demo</h1>
			<p className="mb-6 text-muted-foreground">
				A tiny end-to-end example: an Express server persists a list to{" "}
				<code className="rounded bg-muted px-1">server/db.json</code>, and the
				React frontend reads / mutates it through TanStack Query. Run{" "}
				<code className="rounded bg-muted px-1">pnpm dev</code> and{" "}
				<code className="rounded bg-muted px-1">pnpm dev:server</code> in two
				terminals.
			</p>
			<ul className="flex flex-col gap-3">
				<li>
					<Link to="/exercise/dog-favorites" className="underline">
						Dog favorites — save dogs to a JSON file via Express
					</Link>
				</li>
			</ul>
		</div>
	);
}
