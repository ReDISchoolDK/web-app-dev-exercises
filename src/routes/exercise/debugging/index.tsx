// =====================================================================
// STEP 1 — The task list crashes.
//
// Load http://localhost:5173/exercise/debugging and open the Console.
// Read the error. Then use Sources to set a breakpoint on the line it
// names, reload, and hover the variable to see what it really holds.
//
// The fix is one line. It is not the line that throws.
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "@/lib/tasks";

export const Route = createFileRoute("/exercise/debugging/")({
	component: TaskListPage,
});

function TaskListPage() {
	const [tasks, setTasks] = useState<Task[]>();

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
				Step 1 — this page crashes before it can render anything.
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
