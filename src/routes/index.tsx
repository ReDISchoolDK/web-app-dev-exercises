import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Session 7 — React Query</h1>
			<p className="mb-6 text-muted-foreground">
				One exercise, three steps. Work through them in order. Devtools
				(bottom-right) should stay open the entire time.
			</p>
			<ul className="flex flex-col gap-3">
				<li>
					<Link to="/exercise/random-dog" className="underline">
						Step 1 — Random dog (useQuery basics)
					</Link>
				</li>
				<li>
					<Link to="/exercise/sub-breeds" className="underline">
						Step 2 — Sub-breeds (parameters in the queryKey)
					</Link>
				</li>
				<li>
					<Link to="/exercise/image-count" className="underline">
						Step 3 — Image count (Zustand + React Query)
					</Link>
				</li>
			</ul>
		</div>
	);
}
