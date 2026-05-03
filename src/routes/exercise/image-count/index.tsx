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
//   [x] Slider value lives in a Zustand store (src/stores/image-count.ts),
//       NOT in component state
//   [x] The query reads the count from the store
//   [x] The queryKey includes the count
//   [x] Changing the slider triggers a new fetch and a new cache entry
//
// Stretch (implemented): favorites: string[] in the Zustand store with
// add/remove handlers. Favorites are user preference data the app fully
// owns — that's why they belong in Zustand, not in the cache.
//
// Navigator's reading: Zustand quick-start
//   https://zustand.docs.pmnd.rs/getting-started/introduction
// =====================================================================

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchRandomDogs } from "@/lib/api";
import { useImageCountStore } from "@/stores/image-count";

export const Route = createFileRoute("/exercise/image-count/")({
	component: ExercisePage,
});

function ExercisePage() {
	const { count, setCount, favorites, addFavorite, removeFavorite } =
		useImageCountStore();

	const dogsQuery = useQuery({
		queryKey: ["randomDogs", count],
		queryFn: () => fetchRandomDogs(count),
	});

	return (
		<div className="mx-auto max-w-3xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Image count</h1>
			<p className="mb-6 text-muted-foreground">
				Slider count lives in Zustand. Images live in the React Query cache.
				Favorites live in Zustand because they're user preference, not server
				data.
			</p>

			<label className="mb-6 flex items-center gap-4">
				<span className="w-24 text-sm font-medium">Count: {count}</span>
				<input
					type="range"
					min={1}
					max={10}
					value={count}
					onChange={(e) => setCount(Number(e.target.value))}
					className="flex-1"
				/>
			</label>

			{dogsQuery.isPending ? (
				<div className="text-muted-foreground">Loading…</div>
			) : dogsQuery.isError ? (
				<div className="text-destructive">Error: {dogsQuery.error.message}</div>
			) : (
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
					{dogsQuery.data.map((url) => {
						const saved = favorites.includes(url);
						return (
							<Card key={url} className="overflow-hidden bg-black">
								<CardContent className="p-2">
									<img
										src={url}
										alt="A random dog"
										className="h-40 w-full object-contain"
									/>
									<Button
										variant="outline"
										size="sm"
										className="mt-2 w-full"
										onClick={() =>
											saved ? removeFavorite(url) : addFavorite(url)
										}
									>
										<Heart className={saved ? "fill-current" : ""} />
										{saved ? "Saved" : "Save"}
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			)}

			{favorites.length > 0 && (
				<>
					<div className="mt-10 mb-4 flex items-center gap-2">
						<h2 className="text-xl font-semibold">Favorites</h2>
						<Badge variant="secondary">{favorites.length}</Badge>
					</div>
					<p className="mb-4 text-sm text-muted-foreground">
						These persist when you change the slider — they're in the Zustand
						store, not the per-count cache entry.
					</p>
					<div className="grid grid-cols-3 gap-4 md:grid-cols-4">
						{favorites.map((url) => (
							<Card key={url} className="overflow-hidden bg-black">
								<CardContent className="p-2">
									<img
										src={url}
										alt="A favorite dog"
										className="h-24 w-full object-contain"
									/>
								</CardContent>
							</Card>
						))}
					</div>
				</>
			)}
		</div>
	);
}
