// =====================================================================
// STEP 2 — Saving does nothing.
//
// Type a task, press Save. Nothing happens. No error on screen, nothing
// in the console.
//
// Open the Network tab BEFORE you click. Filter to Fetch/XHR. Press Save
// and read the status and the URL of the request that appears.
//
// Two things are wrong here. One stops it working. The other is why it
// was so quiet about it.
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
	const [isSaving, setIsSaving] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!title.trim()) return;

		setIsSaving(true);

		try {
			const task = await createTask(title);
			setSaved((current) => [...current, task]);
			setTitle("");
		} catch {
			// Nothing to see here.
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Add a task</h1>
			<p className="mb-6 text-muted-foreground">
				Step 2 — pressing Save does nothing at all.
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
