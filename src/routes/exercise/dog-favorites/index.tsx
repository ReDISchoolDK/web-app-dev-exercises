// =====================================================================
// EXERCISE — Part B: wire React Query to your Express API
//
// Goal: hook up this page to the API you built in Part A
// (server/index.ts). Read the favorites with useQuery; add/remove them
// with useMutation; keep the displayed list in sync via cache
// invalidation.
//
// The UI is already built — buttons, loading/empty states, layout. Your
// job is to replace the placeholder values + the no-op handlers with
// real React Query calls.
//
// Success criteria:
//   [ ] Random dog image loads via useQuery on fetchRandomDog
//       (reuse the queryKey ["randomDog"])
//   [ ] Favorites list loads via useQuery on getFavorites
//       (queryKey ["favorites"])
//   [ ] "Save to favorites" calls a useMutation on addFavorite and on
//       success invalidates ["favorites"] so the list refetches
//   [ ] "Remove" calls a useMutation on removeFavorite, same
//       invalidation
//   [ ] Refreshing the page keeps the same favorites (proves the JSON
//       file is doing its job — only possible once Part A is done)
//
// 💡 useQueryClient() gives you the cache handle for invalidation.
// 💡 useMutation returns an object — call `.mutate(value)` to fire it.
// 💡 The fetchers (getFavorites, addFavorite, removeFavorite) are
//    already written in src/lib/api.ts. Don't rewrite fetch — import
//    them.
//
// Navigator's reading: useMutation reference
//   https://tanstack.com/query/latest/docs/framework/react/guides/mutations
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { Heart, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Step 1: uncomment these as you wire them in.
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
// 	addFavorite,
// 	fetchRandomDog,
// 	getFavorites,
// 	removeFavorite,
// } from "@/lib/api";

export const Route = createFileRoute("/exercise/dog-favorites/")({
	component: ExercisePage,
});

function ExercisePage() {
	// 1. Read the random dog with useQuery (queryFn: fetchRandomDog).
	// 2. Read the favorites with useQuery (queryFn: getFavorites).
	// 3. Build two useMutation calls (addFavorite, removeFavorite). On
	//    success, invalidate ["favorites"] via useQueryClient().
	// 4. Replace the placeholders below with the real values + handlers,
	//    and drop the `disabled` flags that are TODO-gated.

	const dog: { data?: string; isPending: boolean; isError: boolean } = {
		isPending: false,
		isError: false,
	};
	const favorites: string[] = [];
	const favoritesPending = false;
	const isSaved = false;

	const onPickNext = () => {
		// TODO: dogQuery.refetch()
	};
	const onSave = () => {
		// TODO: add.mutate(dogQuery.data)
	};
	const onRemove = (_url: string) => {
		// TODO: remove.mutate(_url)
	};

	return (
		<div className="mx-auto max-w-3xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Dog favorites</h1>
			<p className="mb-6 text-muted-foreground">
				Pick a random dog and save the good ones. The list is stored on the
				server in <code className="rounded bg-muted px-1">server/db.json</code>{" "}
				— reload the page and they're still there (once you finish the
				exercise).
			</p>

			<Card className="mb-8 overflow-hidden bg-black">
				<CardContent className="p-3">
					{dog.isPending ? (
						<div className="flex h-64 items-center justify-center text-muted-foreground">
							Loading…
						</div>
					) : dog.isError ? (
						<div className="flex h-64 items-center justify-center text-destructive">
							Error loading dog
						</div>
					) : dog.data ? (
						<img
							src={dog.data}
							alt="A random dog"
							className="h-64 w-full object-contain"
						/>
					) : (
						<div className="flex h-64 items-center justify-center text-muted-foreground">
							No dog yet — wire useQuery in step 1.
						</div>
					)}
					<div className="mt-3 flex gap-2">
						<Button
							variant="outline"
							className="flex-1"
							onClick={onPickNext}
							disabled /* TODO: drop once dogQuery is wired */
						>
							<RefreshCw />
							Next dog
						</Button>
						<Button
							className="flex-1"
							onClick={onSave}
							disabled /* TODO: drop once add.mutate is wired */
						>
							<Heart className={isSaved ? "fill-current" : ""} />
							{isSaved ? "Saved" : "Save to favorites"}
						</Button>
					</div>
				</CardContent>
			</Card>

			<h2 className="mb-3 text-xl font-semibold">Saved ({favorites.length})</h2>
			{favoritesPending ? (
				<div className="text-muted-foreground">Loading favorites…</div>
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
									onClick={() => onRemove(url)}
									disabled /* TODO: drop once remove.mutate is wired */
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
