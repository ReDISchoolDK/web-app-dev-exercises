// =====================================================================
// SOLUTION — Bookmarks page
//
// Goal: Wire a form and a list up to the Zustand store in
// `src/stores/bookmarks.ts`.
//
// Success criteria:
//   [x] Submitting the form adds a bookmark and clears the inputs
//   [x] The heart button toggles only the bookmark you clicked
//   [x] The trash button removes only the bookmark you clicked
//   [x] The empty state shows when there are no bookmarks
//
// Navigator's reading:
//   https://zustand.docs.pmnd.rs/getting-started/introduction
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useBookmarksStore } from "@/stores/bookmarks";

export const Route = createFileRoute("/exercise/bookmarks/")({
	component: BookmarksPage,
});

function BookmarksPage() {
	// Form inputs are local state — they belong to this component only.
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");

	// The bookmark list is shared state — it lives in the store.
	const { bookmarks, add, toggleFavorite, remove } = useBookmarksStore();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		// Stop the browser from reloading the page on submit.
		e.preventDefault();
		if (!title.trim() || !url.trim()) return;

		add({ title, url });

		// Clear the form so it's ready for the next entry.
		setTitle("");
		setUrl("");
	};

	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Bookmarks</h1>
			<p className="mb-6 text-muted-foreground">
				Add bookmarks, star your favorites, and remove them. The list lives in a
				Zustand store with the Immer middleware.
			</p>

			<form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3">
				<Input
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<Input
					placeholder="https://example.com"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				<Button type="submit" disabled={!title.trim() || !url.trim()}>
					Add bookmark
				</Button>
			</form>

			{bookmarks.length === 0 ? (
				<p className="rounded-md border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
					No bookmarks yet. Add one above.
				</p>
			) : (
				<div className="flex flex-col gap-3">
					{bookmarks.map((bookmark) => (
						<Card key={bookmark.id}>
							<CardContent className="flex items-center justify-between gap-4">
								<div className="min-w-0">
									<div className="truncate font-medium">{bookmark.title}</div>
									<div className="truncate text-sm text-muted-foreground">
										{bookmark.url}
									</div>
								</div>
								<div className="flex shrink-0 gap-2">
									<Button
										variant="outline"
										size="icon"
										aria-label={
											bookmark.isFavorite
												? `Unfavorite ${bookmark.title}`
												: `Favorite ${bookmark.title}`
										}
										onClick={() => toggleFavorite(bookmark.id)}
									>
										<Heart
											className={bookmark.isFavorite ? "fill-current" : ""}
										/>
									</Button>
									<Button
										variant="outline"
										size="icon"
										aria-label={`Delete ${bookmark.title}`}
										onClick={() => remove(bookmark.id)}
									>
										<Trash2 />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
