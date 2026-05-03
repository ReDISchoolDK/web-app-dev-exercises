// =====================================================================
// STEP 1 — useQuery basics (random dog)
//
// Build: a component that fetches and displays a single random dog image.
//
// Success criteria:
//   [x] Uses useQuery from @tanstack/react-query
//   [x] Has a sensible queryKey (an array)
//   [x] Renders the image when loaded
//   [x] Shows loading and error states
//   [x] A button re-runs the query (hint: the `refetch` return value)
//
// Stretch: disable the button while a refetch is in flight using `isFetching`.
//
// Navigator's reading: useQuery reference
//   https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
// =====================================================================

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchRandomDog } from "@/lib/api";

export const Route = createFileRoute("/exercise/random-dog/")({
	component: ExercisePage,
});

function ExercisePage() {
	const dogQuery = useQuery({
		queryKey: ["randomDog"],
		queryFn: fetchRandomDog,
	});

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Random dog</h1>
			<p className="mb-6 text-muted-foreground">
				One useQuery call. Loading, error, success — all handled by React Query.
			</p>

			<Card className="mb-6 overflow-hidden bg-black">
				<CardContent>
					{dogQuery.isPending ? (
						<div className="h-72 animate-pulse bg-muted" />
					) : dogQuery.isError ? (
						<div className="flex h-72 items-center justify-center text-destructive">
							Error: {dogQuery.error.message}
						</div>
					) : (
						<img
							src={dogQuery.data}
							alt="A random dog"
							className="h-72 w-full object-contain"
						/>
					)}
				</CardContent>
			</Card>

			<Button onClick={() => dogQuery.refetch()} disabled={dogQuery.isFetching}>
				{dogQuery.isFetching ? "Loading…" : "Next dog"}
			</Button>
		</div>
	);
}
