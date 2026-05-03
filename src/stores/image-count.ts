import { create } from "zustand";

interface ImageCountStore {
	count: number;
	setCount: (count: number) => void;
}

// "set" is a function provided by Zustand to update the store's state.
// (Underscore-prefixed here because the stub doesn't use it yet.)
export const useImageCountStore = create<ImageCountStore>((_set) => ({
	count: 3,
	setCount: (_count) => {
		// TODO: update count in the store
	},
}));
