import { create } from "zustand";
import type { Thing } from "./things";

interface ThingStore {
	things: Thing[];
	add: (input: { name: string }) => void;
}

// LEARN: Facilitator reference only. The page does not use this file.
// LEARN: Same store as things.ts, but plain Zustand: no `immer`, no draft.
export const useThingStoreNoImmer = create<ThingStore>()((set) => ({
	things: [],
	// LEARN: Without Immer we must return a brand new object ourselves.
	// LEARN: `set` merges top-level keys, so we only return the `things` key.
	add: (input) =>
		set((s) => ({
			// LEARN: `...s.things` copies every old item into a new array.
			// LEARN: The new item goes at the end. We never touch the old array.
			// LEARN: The `...input` copies `name` into the new item, next to its id.
			things: [...s.things, { id: crypto.randomUUID(), ...input }],
		})),
}));
