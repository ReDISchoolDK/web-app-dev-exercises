// =====================================================================
// STEP 2 — Parameters belong in the queryKey (sub-breeds)
//
// Build: a component where the user picks a breed from a hardcoded list
// (husky, hound, terrier, spaniel) and we show that breed's sub-breeds.
//
// Success criteria:
//   [x] Selected breed is local state (useState)
//   [x] Query auto-refetches when the breed changes — *without* calling
//       refetch() (the queryKey changes, so the query identity changes)
//   [x] Switching back to a previously-selected breed returns instantly
//       from cache (verify in React Query Devtools)
//
// Stretch: remove the breed from the queryKey, observe what breaks in
// devtools, and discuss with your pair why.
//
// Navigator's reading: Query Keys guide
//   https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
// =====================================================================

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { fetchSubBreeds } from "@/lib/api";

export const Route = createFileRoute("/exercise/sub-breeds/")({
	component: ExercisePage,
});

const BREEDS = ["husky", "hound", "terrier", "spaniel"];

function ExercisePage() {
	const [breed, setBreed] = useState(BREEDS[0]);

	const subBreedsQuery = useQuery({
		queryKey: ["subBreeds", breed],
		queryFn: () => fetchSubBreeds(breed),
		// Sub-breed lists are reference data — never change in our session.
		// staleTime: Infinity means React Query won't auto-refetch in the
		// background after a cache hit. So switching back to a previously-
		// loaded breed is a pure cache read with zero network calls.
		staleTime: Number.POSITIVE_INFINITY,
	});

	// ANTI-PATTERN — for the stretch discussion. Don't ship this.
	//
	// useQuery({
	//   queryKey: ["subBreeds"],          // ← breed missing! same key for every breed
	//   queryFn: () => fetchSubBreeds(breed),
	// });
	//
	// What breaks:
	//  - Switching breeds returns the cached result of the FIRST breed you loaded.
	//  - Devtools shows one cache entry instead of one-per-breed.
	//  - React Query has no way to know the request "identity" changed —
	//    the queryKey *is* the identity.

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Sub-breeds</h1>
			<p className="mb-6 text-muted-foreground">
				Pick a breed; the queryKey changes, so React Query refetches. Switch
				back to a breed you already loaded — instant from cache. Watch the cache
				in devtools.
			</p>

			<label className="mb-6 flex items-center gap-3">
				<span className="text-sm font-medium">Breed</span>
				<select
					value={breed}
					onChange={(e) => setBreed(e.target.value)}
					className="rounded-md border bg-background px-3 py-2 text-sm"
				>
					{BREEDS.map((b) => (
						<option key={b} value={b}>
							{b}
						</option>
					))}
				</select>
			</label>

			{subBreedsQuery.isPending ? (
				<div className="text-muted-foreground">Loading…</div>
			) : subBreedsQuery.isError ? (
				<div className="text-destructive">
					Error: {subBreedsQuery.error.message}
				</div>
			) : subBreedsQuery.data.length === 0 ? (
				<div className="text-muted-foreground">
					No sub-breeds for this breed.
				</div>
			) : (
				<ul className="list-disc pl-5">
					{subBreedsQuery.data.map((sub) => (
						<li key={sub}>{sub}</li>
					))}
				</ul>
			)}
		</div>
	);
}
