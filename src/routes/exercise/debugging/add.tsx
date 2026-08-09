// =====================================================================
// SOLUTION — Step 2: add a task
//
// The bug on the exercise branch: the fetch URL was misspelled, so the
// request 404'd. The catch block swallowed the error, so nothing appeared
// on screen and nothing appeared in the console. Completely silent.
//
// Tool: the Network tab. The failed request is visible there even though
// the app says nothing.
//
// Two fixes are in here:
//   1. The URL is correct (that's the bug).
//   2. Failures are now shown to the user, so the next one won't be silent.
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask, type Task } from "@/lib/tasks";

export const Route = createFileRoute("/exercise/debugging/add")({
	component: AddTaskPage,
});

function AddTaskPage() {
	const [title, setTitle] = useState("");
	const [saved, setSaved] = useState<Task[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!title.trim()) return;

		setIsSaving(true);
		setError(null);

		try {
			const task = await createTask(title);
			setSaved((current) => [...current, task]);
			setTitle("");
		} catch (caught) {
			// Don't swallow it. A failure the user can't see is a failure
			// nobody reports and nobody fixes.
			setError(caught instanceof Error ? caught.message : "Something broke");
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Add a task</h1>
			<p className="mb-6 text-muted-foreground">
				Step 2 — pressing Save appeared to do nothing at all.
			</p>

			<form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
				<Input
					placeholder="What needs doing?"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<Button type="submit" disabled={!title.trim() || isSaving}>
					{isSaving ? "Saving…" : "Save"}
				</Button>
			</form>

			{error && (
				<p className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
					Could not save: {error}
				</p>
			)}

			{saved.length > 0 && (
				<>
					<h2 className="mb-3 text-xl font-semibold">Saved this session</h2>
					<ul className="flex flex-col gap-2 text-muted-foreground">
						{saved.map((task) => (
							<li key={task.id}>
								#{task.id} — {task.title}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
