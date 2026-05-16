import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Session 8 — Custom Hooks</h1>
			<p className="mb-6 text-muted-foreground">
				One exercise tonight: build a <code>useLocalStorage</code> hook. Keep{" "}
				<code>exercise.md</code> open while you pair. Keep DevTools →
				Application → Local Storage visible the whole time.
			</p>
			<ul className="flex flex-col gap-3">
				<li>
					<Link to="/exercise/use-local-storage" className="underline">
						Exercise — useLocalStorage (Counter that survives reload)
					</Link>
				</li>
			</ul>
		</div>
	);
}
