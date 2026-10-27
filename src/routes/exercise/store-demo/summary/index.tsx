import { createFileRoute, Link } from "@tanstack/react-router";
import { ThingCount } from "../ThingCount";
import { ThingList } from "../ThingList";

export const Route = createFileRoute("/exercise/store-demo/summary/")({
	component: SummaryPage,
});

function SummaryPage() {
	return (
		<div className="mx-auto max-w-2xl space-y-6 p-8">
			<h1 className="text-3xl font-bold">Summary page</h1>
			<p className="rounded-md border border-dashed px-4 py-3 text-sm text-muted-foreground">
				Different page, same store. Anything you added on the other page is
				already here.
			</p>
			<ThingCount />
			<ThingList />
			<Link to="/exercise/store-demo" className="text-sm underline">
				Back to the form
			</Link>
		</div>
	);
}
