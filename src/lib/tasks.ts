// Shared data + API helpers for the debugging exercise.

export interface Task {
	id: number;
	title: string;
	done: boolean;
}

/** Seed data for the task list and the stats page. No network needed. */
export const INITIAL_TASKS: Task[] = [
	{ id: 1, title: "Read the exercise README", done: true },
	{ id: 2, title: "Open the browser devtools", done: true },
	{ id: 3, title: "Fix the crash on the task list", done: false },
	{ id: 4, title: "Find out why saving does nothing", done: false },
	{ id: 5, title: "Work out why the stats never change", done: false },
];

const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * Sends a new task to the API.
 *
 * The API is a public fake backend. It doesn't really store anything, but it
 * does answer like a real one: 201 with the created object on success, 404 if
 * you ask for a path that doesn't exist.
 */
export async function createTask(title: string): Promise<Task> {
	const response = await fetch(`${API_URL}/todos`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ title, completed: false }),
	});

	if (!response.ok) {
		throw new Error(`Request failed with ${response.status}`);
	}

	const created = (await response.json()) as { id: number; title: string };
	return { id: created.id, title: created.title, done: false };
}

export type Filter = "all" | "done" | "todo";

export function applyFilter(tasks: Task[], filter: Filter): Task[] {
	if (filter === "done") return tasks.filter((task) => task.done);
	if (filter === "todo") return tasks.filter((task) => !task.done);
	return tasks;
}
