// =====================================================================
// STEP 3 — The filter buttons do nothing.
//
// Clicking "done" or "todo" should change the count and the list. It
// doesn't.
//
// Open React DevTools -> Components, select StatsPage, and watch its
// state while you click. One value updates. One doesn't.
//
// When you've fixed it, read the "better fix" stretch in the README —
// there's a change that makes this bug impossible to write.
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	applyFilter,
	type Filter,
	INITIAL_TASKS,
	type Task,
} from "@/lib/tasks";

export const Route = createFileRoute("/exercise/debugging/stats")({
	component: StatsPage,
});

const FILTERS: Filter[] = ["all", "done", "todo"];

function StatsPage() {
	const [filter, setFilter] = useState<Filter>("all");
	const [visible, setVisible] = useState<Task[]>([]);

	useEffect(() => {
		setVisible(applyFilter(INITIAL_TASKS, filter));
	}, []);

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Stats</h1>
			<p className="mb-6 text-muted-foreground">
				Step 3 — the count never changes when you pick a different filter.
			</p>

			<div className="mb-6 flex gap-2">
				{FILTERS.map((option) => (
					<Button
						key={option}
						variant={option === filter ? "default" : "outline"}
						size="sm"
						onClick={() => setFilter(option)}
					>
						{option}
					</Button>
				))}
			</div>

			<p className="mb-4 text-2xl font-semibold">
				{visible.length} task{visible.length === 1 ? "" : "s"}
			</p>

			<ul className="flex flex-col gap-2 text-muted-foreground">
				{visible.map((task) => (
					<li key={task.id}>{task.title}</li>
				))}
			</ul>
		</div>
	);
}
