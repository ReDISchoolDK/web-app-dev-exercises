import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ImageCountStore {
	/** How many random dog images the slider is asking for. Client state. */
	count: number;
	setCount: (count: number) => void;

	/**
	 * URLs the user has favorited. This is *user preference* — the app fully
	 * owns it, no server tells us what's a favorite. So it lives in Zustand,
	 * NOT in the React Query cache.
	 */
	favorites: string[];
	addFavorite: (url: string) => void;
	removeFavorite: (url: string) => void;
}

export const useImageCountStore = create<ImageCountStore>()(
	immer((set) => ({
		count: 3,
		setCount: (count) =>
			set((state) => {
				state.count = count;
			}),
		favorites: [],
		addFavorite: (url) =>
			set((state) => {
				state.favorites.push(url);
			}),
		removeFavorite: (url) =>
			set((state) => {
				state.favorites = state.favorites.filter((f) => f !== url);
			}),
	})),
);
