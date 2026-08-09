// =====================================================================
// SOLUTION — Step 1: the task list
//
// The bug on the exercise branch: useState() was called with no initial
// value, so `tasks` was undefined and `tasks.map(...)` threw.
//
// Tools: Console (read the error) + Sources (set a breakpoint).
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { INITIAL_TASKS, type Task } from "@/lib/tasks";

export const Route = createFileRoute("/exercise/debugging/")({
	component: TaskListPage,
});

function TaskListPage() {
	// The fix: give useState an initial value. Without one it returns
	// undefined, and undefined has no .map().
	const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

	function toggle(id: number) {
		setTasks((current) =>
			current.map((task) =>
				task.id === id ? { ...task, done: !task.done } : task,
			),
		);
	}

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Tasks</h1>
			<p className="mb-6 text-muted-foreground">
				Step 1 — the page crashed before it could render anything.
			</p>

			<div className="flex flex-col gap-3">
				{tasks.map((task) => (
					<Card key={task.id}>
						<CardContent className="flex items-center justify-between gap-4">
							<span className={task.done ? "line-through opacity-60" : ""}>
								{task.title}
							</span>
							<Button
								variant="outline"
								size="sm"
								onClick={() => toggle(task.id)}
							>
								{task.done ? "Undo" : "Done"}
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
