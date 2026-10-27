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
		things: [
			{ id: crypto.randomUUID(), name: "Coffee mug" },
			{ id: crypto.randomUUID(), name: "Desk plant" },
		],
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
