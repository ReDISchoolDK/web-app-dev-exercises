import { createFileRoute, Link } from "@tanstack/react-router";
import { ThingCount } from "../../../components/ThingCount";
import { ThingForm } from "../../../components/ThingForm";
import { ThingList } from "../../../components/ThingList";

export const Route = createFileRoute("/exercise/store-demo/")({
	component: StoreDemoPage,
});

function StoreDemoPage() {
	return (
		<div className="mx-auto max-w-2xl space-y-6 p-8">
			<h1 className="text-3xl font-bold">Store demo</h1>
			<p className="rounded-md border border-dashed px-4 py-3 text-sm text-muted-foreground">
				These components never talk to each other. They only share the store.
			</p>
			<ThingForm />
			<ThingCount />
			<ThingList />
			<Link to="/exercise/store-demo/summary" className="text-sm underline">
				Go to the summary page
			</Link>
		</div>
	);
}
