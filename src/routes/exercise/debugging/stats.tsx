// =====================================================================
// SOLUTION — Step 3: stats
//
// The bug on the exercise branch: the useEffect that recalculated the
// visible tasks had an empty dependency array, so it ran once on mount and
// never again. Clicking a filter changed `filter` in state, but `visible`
// stayed frozen at whatever it was on the first render.
//
// Tool: React DevTools → Components → this component's state. You can watch
// `filter` change while `visible` does not.
//
// The fix below adds `filter` to the dependency array. See the README
// stretch for the better fix — deleting the effect entirely.
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
		// `filter` is read inside the effect, so it belongs in the deps.
		setVisible(applyFilter(INITIAL_TASKS, filter));
	}, [filter]);

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Stats</h1>
			<p className="mb-6 text-muted-foreground">
				Step 3 — the count never changed when you picked a different filter.
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
