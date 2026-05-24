// =====================================================================
// EXERCISE — Express + JSON + React Query (dog favorites)
//
// Build: a "save your favorite dogs" page. The list of favorites is
// persisted to a JSON file by a tiny Express server (server/index.ts),
// and React Query is responsible for reading + mutating that list from
// the browser.
//
// Two learning moments:
//   Part A — server/index.ts: implement GET / POST / DELETE handlers
//            that read and write server/db.json.
//   Part B — this file: wire useQuery (read) and two useMutations
//            (add + remove) with cache invalidation.
//
// Success criteria:
//   [x] Random dog image loads via useQuery on fetchRandomDog
//   [x] Favorites list loads via useQuery on getFavorites
//   [x] "Save" calls a useMutation that invalidates ["favorites"]
//   [x] "Remove" calls a useMutation that invalidates ["favorites"]
//   [x] Refreshing the page keeps the same favorites (proves the JSON
//       file is doing its job)
//
// Navigator's reading: useMutation reference
//   https://tanstack.com/query/latest/docs/framework/react/guides/mutations
// =====================================================================

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Heart, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	addFavorite,
	fetchRandomDog,
	getFavorites,
	removeFavorite,
} from "@/lib/api";

export const Route = createFileRoute("/exercise/dog-favorites/")({
	component: ExercisePage,
});

function ExercisePage() {
	const qc = useQueryClient();

	const dogQuery = useQuery({
		queryKey: ["randomDog"],
		queryFn: fetchRandomDog,
	});

	const favoritesQuery = useQuery({
		queryKey: ["favorites"],
		queryFn: getFavorites,
	});

	const add = useMutation({
		mutationFn: addFavorite,
		onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
	});

	const remove = useMutation({
		mutationFn: removeFavorite,
		onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
	});

	const favorites = favoritesQuery.data ?? [];
	const isSaved =
		dogQuery.data !== undefined && favorites.includes(dogQuery.data);

	return (
		<div className="mx-auto max-w-3xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Dog favorites</h1>
			<p className="mb-6 text-muted-foreground">
				Pick a random dog and save the good ones. The list is stored on the
				server in <code className="rounded bg-muted px-1">server/db.json</code>{" "}
				— reload the page and they're still there.
			</p>

			<Card className="mb-8 overflow-hidden bg-black">
				<CardContent className="p-3">
					{dogQuery.isPending ? (
						<div className="flex h-64 items-center justify-center text-muted-foreground">
							Loading…
						</div>
					) : dogQuery.isError ? (
						<div className="flex h-64 items-center justify-center text-destructive">
							Error: {dogQuery.error.message}
						</div>
					) : (
						<img
							src={dogQuery.data}
							alt="A random dog"
							className="h-64 w-full object-contain"
						/>
					)}
					<div className="mt-3 flex gap-2">
						<Button
							variant="outline"
							className="flex-1"
							onClick={() => dogQuery.refetch()}
							disabled={dogQuery.isFetching}
						>
							<RefreshCw
								className={dogQuery.isFetching ? "animate-spin" : ""}
							/>
							Next dog
						</Button>
						<Button
							className="flex-1"
							onClick={() => {
								if (dogQuery.data) add.mutate(dogQuery.data);
							}}
							disabled={!dogQuery.data || add.isPending || isSaved}
						>
							<Heart className={isSaved ? "fill-current" : ""} />
							{isSaved ? "Saved" : "Save to favorites"}
						</Button>
					</div>
				</CardContent>
			</Card>

			<h2 className="mb-3 text-xl font-semibold">Saved ({favorites.length})</h2>
			{favoritesQuery.isPending ? (
				<div className="text-muted-foreground">Loading favorites…</div>
			) : favoritesQuery.isError ? (
				<div className="text-destructive">
					Error: {favoritesQuery.error.message}
				</div>
			) : favorites.length === 0 ? (
				<div className="text-muted-foreground">
					Nothing saved yet. Click "Save to favorites" above.
				</div>
			) : (
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
					{favorites.map((url) => (
						<Card key={url} className="overflow-hidden bg-black">
							<CardContent className="p-2">
								<img
									src={url}
									alt="Saved dog"
									className="h-40 w-full object-contain"
								/>
								<Button
									variant="outline"
									size="sm"
									className="mt-2 w-full"
									onClick={() => remove.mutate(url)}
									disabled={remove.isPending}
								>
									<X />
									Remove
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
