// =====================================================================
// SOLUTION — Bookmarks store (Zustand + Immer)
//
// Goal: Build a Zustand store that holds a list of bookmarks and can add,
// favorite and remove them — using Immer so you can "mutate" the draft.
//
// Success criteria:
//   [x] Store holds an array of bookmarks
//   [x] `add` appends a new bookmark with a generated id
//   [x] `toggleFavorite` flips `isFavorite` on one bookmark only
//   [x] `remove` deletes a bookmark by id
//   [x] No `useState` for the list — the store is the single source of truth
//
// Navigator's reading:
//   https://zustand.docs.pmnd.rs/integrations/immer-middleware
// =====================================================================

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Bookmark {
	id: string;
	title: string;
	url: string;
	isFavorite: boolean;
}

interface BookmarksStore {
	bookmarks: Bookmark[];
	add: (input: { title: string; url: string }) => void;
	toggleFavorite: (id: string) => void;
	remove: (id: string) => void;
}

export const useBookmarksStore = create<BookmarksStore>()(
	immer((set) => ({
		bookmarks: [],

		// Immer lets you push onto the draft directly. Without it you would
		// have to spread a whole new array:
		//   set((state) => ({ bookmarks: [...state.bookmarks, newBookmark] }))
		add: ({ title, url }) =>
			set((state) => {
				state.bookmarks.push({
					id: crypto.randomUUID(),
					title,
					url,
					isFavorite: false,
				});
			}),

		// This is where Immer really pays off. Without it you rebuild every
		// item just to flip one boolean:
		//   bookmarks: state.bookmarks.map((b) =>
		//     b.id === id ? { ...b, isFavorite: !b.isFavorite } : b,
		//   )
		toggleFavorite: (id) =>
			set((state) => {
				const bookmark = state.bookmarks.find((b) => b.id === id);
				if (bookmark) bookmark.isFavorite = !bookmark.isFavorite;
			}),

		// filter already returns a new array, so Immer buys you nothing here.
		// Reassigning the draft is still the clearest way to write it.
		remove: (id) =>
			set((state) => {
				state.bookmarks = state.bookmarks.filter((b) => b.id !== id);
			}),
	})),
);
