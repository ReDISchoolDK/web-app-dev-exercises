import { create } from "zustand";
import type { Thing } from "./things";

interface ThingStore {
	things: Thing[];
	add: (input: { name: string }) => void;
}

// Same store as things.ts, but plain Zustand: no `immer`, no draft.
export const useThingStoreNoImmer = create<ThingStore>()((set) => ({
	things: [],
	// Without Immer we must return a brand new object ourselves.
	// `set` merges top-level keys, so we only return the `things` key.
	add: (input) =>
		set((state) => ({
			// `...s.things` copies every old item into a new array.
			// The new item goes at the end. We never touch the old array.
			// The `...input` copies `name` into the new item, next to its id.
			things: [...state.things, { id: crypto.randomUUID(), ...input }],
		})),
}));

// Nested state example WITHOUT Immer (compare with things.ts).
// Uses the same UserStore interface shown in things.ts.
//
// export const useUserStoreNoImmer = create<UserStore>()((set) => ({
// 	user: {
// 		name: "Iga",
// 		profile: { address: { city: "Berlin", street: "Main St" } },
// 	},
// 	setCity: (city) =>
// 		set((state) => ({
// 			// Copy every level on the path to `city`.
// 			// If you skip one spread, that level keeps the old reference
// 			// and React may not re-render.
// 			user: {
// 				...state.user,
// 				profile: {
// 					...state.user.profile,
// 					address: {
// 						...state.user.profile.address,
// 						city,
// 					},
// 				},
// 			},
// 		})),
// }));
