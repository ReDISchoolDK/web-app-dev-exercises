// =====================================================================
// STEP 1 — useQuery basics (random dog)
//
// Build: a component that fetches and displays a single random dog image.
//
// Success criteria:
//   [ ] Uses useQuery from @tanstack/react-query
//   [ ] Has a sensible queryKey (an array)
//   [ ] Renders the image when loaded
//   [ ] Shows loading and error states
//   [ ] A button re-runs the query (hint: the `refetch` return value)
//
// Stretch: disable the button while a refetch is in flight using `isFetching`.
//
// Navigator's reading: useQuery reference
//   https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exercise/random-dog/")({
	component: ExercisePage,
});

function ExercisePage() {
	// 1. Call useQuery with a queryKey and queryFn (use fetchRandomDog from @/lib/api).
	//    const dogQuery = useQuery({ queryKey: [...], queryFn: ... })

	// 2. Render the loading state, the error state, and the image.

	// 3. Add a "Next dog" button that calls refetch().

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Random dog</h1>
			<p className="mb-6 text-muted-foreground">
				Fetch a random dog with useQuery.
			</p>
			{/* TODO: image, loading state, error state, refetch button */}
		</div>
	);
}
