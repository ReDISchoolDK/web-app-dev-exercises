// =====================================================================
// EXERCISE — Custom hook: useLocalStorage
//
// Build: a Counter that survives page reload. Then move that logic into
// a reusable hook. Then reuse the hook for a second value to prove the
// payoff.
//
// Read exercise.md for the full walkthrough. This file is the
// scaffolding so you can focus on the hook itself.
//
// Step 1 — Inline: useState + useEffect + localStorage in this component
// Step 2 — Extract: move the logic into src/hooks/useLocalStorage.ts
// Step 3 — Reuse: call useLocalStorage twice (count + name) below
//
// Success criteria:
//   [ ] Counter increments and the count survives a reload
//   [ ] useLocalStorage<T>(key, initial) lives in src/hooks/useLocalStorage.ts
//   [ ] Counter uses the hook (no raw localStorage left in this file)
//   [ ] A second value (name) uses the same hook with a different key
//   [ ] DevTools → Application → Local Storage shows two entries updating
//
// Stretch:
//   - Accept an updater function: setCount(c => c + 1)
//   - Cross-tab sync via the `storage` event (see exercise.md Stretch 2)
//
// Navigator's reading: writing custom Hooks
//   https://react.dev/learn/reusing-logic-with-custom-hooks
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// Step 2: uncomment this import when you're ready to use the hook.
// import { useLocalStorage } from "@/hooks/useLocalStorage";

export const Route = createFileRoute("/exercise/use-local-storage/")({
	component: ExercisePage,
});

function ExercisePage() {
	// Step 1 — start here. Use useState + useEffect + localStorage directly
	//          for `count`. Wire the +1 button below.
	//
	// Step 2 — once Step 1 works, move that logic into
	//          src/hooks/useLocalStorage.ts and replace the lines below with:
	//
	//          const [count, setCount] = useLocalStorage("count", 0);
	//
	// Step 3 — add a second hook call for `name` (a string) and wire the
	//          input below. Same hook, different key.

	// const [count, setCount] = useLocalStorage("count", 0);
	// const [name, setName] = useLocalStorage("name", "");
	const count = 0;
	const name = "";

	const nameInputId = useId();

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">useLocalStorage</h1>
			<p className="mb-6 text-muted-foreground">
				Build the hook in <code>src/hooks/useLocalStorage.ts</code>, then call
				it here. Open DevTools → Application → Local Storage to watch the keys
				update.
			</p>

			<Card className="mb-6">
				<CardContent className="flex items-center justify-between gap-4 p-6">
					<p className="text-lg">
						Hi {name || "stranger"}! Count:{" "}
						<span className="font-mono">{count}</span>
					</p>
					<Button type="button" disabled>
						{/* TODO: onClick={() => setCount(count + 1)} and drop `disabled` */}
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
				// TODO: onChange={(e) => setName(e.target.value)} and drop `readOnly`
				placeholder="Type your name…"
				readOnly
			/>
		</div>
	);
}
