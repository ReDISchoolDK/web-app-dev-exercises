// =====================================================================
// SOLUTION — Auth store (Zustand + Immer)
//
// Goal: Hold who is currently logged in, so any component can read it.
//
// Success criteria:
//   [x] `loggedInEmail` is null when nobody is signed in
//   [x] `setLoggedIn` stores the email
//   [x] `logout` clears it
//
// This is deliberately fake auth — no server, no token, no password check.
// The lesson is form validation and shared state, not security. Never store
// a real password or token in a client-side store like this.
//
// Navigator's reading:
//   https://zustand.docs.pmnd.rs/integrations/immer-middleware
// =====================================================================

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthStore {
	loggedInEmail: string | null;
	setLoggedIn: (email: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
	immer((set) => ({
		loggedInEmail: null,

		setLoggedIn: (email) =>
			set((state) => {
				state.loggedInEmail = email;
			}),

		logout: () =>
			set((state) => {
				state.loggedInEmail = null;
			}),
	})),
);
