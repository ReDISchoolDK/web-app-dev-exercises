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

// LEARN: `create` builds a store: one shared object that lives outside React.
// LEARN: `useThingStore` is a React hook. Call it in a component to read store data.
// LEARN: The double parentheses in `create<ThingStore>()(...)`: the first call only
// LEARN: sets the TypeScript type. The second call takes the store creator. We need
// LEARN: this two-step form whenever we use middleware like `immer`.
export const useThingStore = create<ThingStore>()(
	// LEARN: `immer(...)` wraps the store creator. It gives us a `state` draft in `set`.
	immer((set) => ({
		// LEARN: Fake starting data so the list is not empty on first load.
		things: [
			{ id: crypto.randomUUID(), name: "Coffee mug" },
			{ id: crypto.randomUUID(), name: "Desk plant" },
		],
		add: (input) =>
			// LEARN: `set` updates the store. React only re-renders when it sees a NEW
			// LEARN: object or array, so changing state in place would not update the screen.
			set((state) => {
				// LEARN: `state` is a draft. It looks like you are changing the real data
				// LEARN: with `push`, but Immer secretly builds a new copy for Zustand.
				// LEARN: `crypto.randomUUID()` makes a unique id, so each list item has a stable key.
				state.things.push({ id: crypto.randomUUID(), ...input });
			}),
	})),
);
