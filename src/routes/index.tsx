import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Session 7 — React Query</h1>
			<p className="mb-6 text-muted-foreground">
				One exercise, three steps. Check out an{" "}
				<code className="rounded bg-muted px-1">
					exercise-react-query-step-*
				</code>{" "}
				branch to start. Devtools (bottom-right) should stay open the entire
				time.
			</p>
			<ul className="flex flex-col gap-3 text-muted-foreground">
				<li>Step 1 — Random dog (useQuery basics)</li>
				<li>Step 2 — Sub-breeds (parameters in the queryKey)</li>
				<li>Step 3 — Image count (Zustand + React Query)</li>
			</ul>
		</div>
	);
}
