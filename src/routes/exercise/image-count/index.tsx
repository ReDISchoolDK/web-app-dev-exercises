// =====================================================================
// STEP 3 — Zustand and React Query division of labor (image count)
//
// Build: a slider (1–10) whose value lives in a Zustand store. The query
// fetches that many random dog images.
//
// Critical verbal step (do this BEFORE writing code):
//   - Why is the slider value client state?
//   - Where do the images live? (Trick question — the React Query cache,
//     NOT Zustand.)
//
// Success criteria:
//   [ ] Slider value lives in a Zustand store (src/stores/image-count.ts),
//       NOT in component state
//   [ ] The query reads the count from the store
//   [ ] The queryKey includes the count
//   [ ] Changing the slider triggers a new fetch and a new cache entry
//
// Stretch: add a `favorites: string[]` field to the Zustand store with
// add/remove handlers. Discuss why this is client state and not server
// state (it's user preference data that the app fully owns).
//
// Navigator's reading: Zustand quick-start
//   https://zustand.docs.pmnd.rs/getting-started/introduction
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exercise/image-count/")({
	component: ExercisePage,
});

function ExercisePage() {
	// 1. Read `count` and `setCount` from useImageCountStore (@/stores/image-count).

	// 2. Call useQuery with queryKey: ["randomDogs", count] and queryFn that
	//    calls fetchRandomDogs(count) from @/lib/api.

	// 3. Render <input type="range" min={1} max={10} value={count}
	//    onChange={(e) => setCount(Number(e.target.value))} />.

	// 4. Render a grid of <img> for the fetched images. Show a loading state.

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Image count</h1>
			<p className="mb-6 text-muted-foreground">
				Slider count lives in Zustand. Images live in the React Query cache.
			</p>
			{/* TODO: slider, images grid, loading state */}
		</div>
	);
}
