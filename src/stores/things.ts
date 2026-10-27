import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Thing {
	id: string;
	name: string;
}

interface ThingStore {
	things: Thing[];
	add: (input: { name: string }) => void;
}

// `create` builds a store: one shared object that lives outside React.
// `useThingStore` is a React hook. Call it in a component to read store data.
// The double parentheses in `create<ThingStore>()(...)`: the first call only
// sets the TypeScript type. The second call takes the store creator. We need
// this two-step form whenever we use middleware like `immer`.
export const useThingStore = create<ThingStore>()(
	immer((set) => ({
		things: [],
		add: (input) =>
			// `set` updates the store. React only re-renders when it sees a NEW
			// object or array, so changing state in place would not update the screen.
			set((state) => {
				// `state` is a draft. It looks like you are changing the real data
				// with `push`, but Immer secretly builds a new copy for Zustand.
				// `crypto.randomUUID()` makes a unique id, so each list item has a stable key.
				state.things.push({ id: crypto.randomUUID(), ...input });
			}),
	})),
);

// Nested state example WITH Immer (compare with things.without-immer.ts).
//
// interface UserStore {
// 	user: {
// 		name: string;
// 		profile: {
// 			address: { city: string; street: string };
// 		};
// 	};
// 	setCity: (city: string) => void;
// }
//
// export const useUserStore = create<UserStore>()(
// 	immer((set) => ({
// 		user: {
// 			name: "Iga",
// 			profile: { address: { city: "Berlin", street: "Main St" } },
// 		},
// 		setCity: (city) =>
// 			set((state) => {
// 				// Change it directly. Immer makes the copies for you.
// 				state.user.profile.address.city = city;
// 			}),
// 	})),
// );
