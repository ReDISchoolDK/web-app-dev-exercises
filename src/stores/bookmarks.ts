// =====================================================================
// EXERCISE — Bookmarks store (Zustand + Immer)
//
// Goal: Build a Zustand store that holds a list of bookmarks and can add,
// favorite and remove them — using Immer so you can "mutate" the draft.
//
// Success criteria:
//   [ ] Store holds an array of bookmarks
//   [ ] `add` appends a new bookmark with a generated id
//   [ ] `toggleFavorite` flips `isFavorite` on one bookmark only
//   [ ] `remove` deletes a bookmark by id
//   [ ] No `useState` for the list — the store is the single source of truth
//
// 💡 Middleware needs the extra `()`:
//    create<BookmarksStore>()(immer((set) => ({ ... })))
//
// Navigator's reading:
//   https://zustand.docs.pmnd.rs/integrations/immer-middleware
// =====================================================================

import { create } from "zustand";
// TODO(step 1): import the Immer middleware
// import { immer } from "zustand/middleware/immer";

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

// TODO(step 1): wrap this initializer in the `immer` middleware, then fill in
// the three actions below.
//
// TODO(step 2): `add` — push a new bookmark. Use crypto.randomUUID() for the
//               id and start with isFavorite: false.
// TODO(step 3): `toggleFavorite` — find the bookmark by id and flip its
//               isFavorite. Only that one should change.
// TODO(step 4): `remove` — filter the bookmark out by id.
export const useBookmarksStore = create<BookmarksStore>()((set) => ({
	bookmarks: [],

	add: ({ title, url }) => {
		// Remove this line once you implement the action.
		console.warn("add() not implemented", { title, url }, set);
	},

	toggleFavorite: (id) => {
		console.warn("toggleFavorite() not implemented", id);
	},

	remove: (id) => {
		console.warn("remove() not implemented", id);
	},
}));
