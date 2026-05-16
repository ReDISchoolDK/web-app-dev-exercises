// =====================================================================
// EXERCISE — Custom hook: useLocalStorage (solved)
//
// Counter and a name input. Both values persist across page reload
// because they both go through the same custom hook.
//
// Success criteria:
//   [x] Counter increments and the count survives a reload
//   [x] useLocalStorage<T>(key, initial) lives in src/hooks/useLocalStorage.ts
//   [x] Counter uses the hook (no raw localStorage left in this file)
//   [x] A second value (name) uses the same hook with a different key
//   [x] DevTools → Application → Local Storage shows two entries updating
//
// Note for the navigator: the payoff is the diff between Step 1 (inline
// useState + useEffect + localStorage) and this file. Same behavior,
// no duplication, and the second value (name) was almost free.
//
// Navigator's reading: writing custom Hooks
//   https://react.dev/learn/reusing-logic-with-custom-hooks
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const Route = createFileRoute("/exercise/use-local-storage/")({
	component: ExercisePage,
});

function ExercisePage() {
	const [count, setCount] = useLocalStorage("count", 0);
	const [name, setName] = useLocalStorage("name", "");

	const nameInputId = useId();

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">useLocalStorage</h1>
			<p className="mb-6 text-muted-foreground">
				Both the count and the name go through one hook. Refresh the page — they
				both stay. DevTools → Application → Local Storage shows the two keys
				updating live.
			</p>

			<Card className="mb-6">
				<CardContent className="flex items-center justify-between gap-4 p-6">
					<p className="text-lg">
						Hi {name || "stranger"}! Count:{" "}
						<span className="font-mono">{count}</span>
					</p>
					<Button type="button" onClick={() => setCount(count + 1)}>
						+1
					</Button>
				</CardContent>
			</Card>

			<label htmlFor={nameInputId} className="mb-2 block text-sm font-medium">
				Your name
			</label>
			<Input
				id={nameInputId}
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Type your name…"
			/>
		</div>
	);
}
