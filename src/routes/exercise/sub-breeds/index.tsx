// =====================================================================
// STEP 2 — Parameters belong in the queryKey (sub-breeds)
//
// Build: a component where the user picks a breed from a hardcoded list
// (husky, hound, terrier, spaniel) and we show that breed's sub-breeds.
//
// Success criteria:
//   [ ] Selected breed is local state (useState)
//   [ ] Query auto-refetches when the breed changes — *without* calling
//       refetch() (the queryKey changes, so the query identity changes)
//   [ ] Switching back to a previously-selected breed returns instantly
//       from cache (verify in React Query Devtools)
//
// Stretch: remove the breed from the queryKey, observe what breaks in
// devtools, and discuss with your pair why.
//
// Navigator's reading: Query Keys guide
//   https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exercise/sub-breeds/")({
	component: ExercisePage,
});

const BREEDS = ["husky", "hound", "terrier", "spaniel"];

function ExercisePage() {
	// 1. Track the selected breed with useState. Default to BREEDS[0].

	// 2. Call useQuery with queryKey: ["subBreeds", breed] and queryFn that
	//    calls fetchSubBreeds(breed) from @/lib/api. NO refetch() call.

	// 3. Render a <select> for the breeds, then loading / empty / list states.

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Sub-breeds</h1>
			<p className="mb-6 text-muted-foreground">
				Pick a breed; show its sub-breeds. Watch the cache in devtools.
			</p>
			{/* TODO: breed select, sub-breed list, loading state */}
			<p className="text-sm text-muted-foreground">
				Breeds available: {BREEDS.join(", ")}
			</p>
		</div>
	);
}
