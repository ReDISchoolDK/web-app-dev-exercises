// =====================================================================
// EXERCISE — Auth store (Zustand + Immer)
//
// Goal: Hold who is currently logged in, so any component can read it.
//
// Success criteria:
//   [ ] `loggedInEmail` is null when nobody is signed in
//   [ ] `setLoggedIn` stores the email
//   [ ] `logout` clears it
//
// This is deliberately fake auth — no server, no token, no password check.
// The lesson is form validation and shared state, not security. Never store
// a real password or token in a client-side store like this.
//
// 💡 Same middleware pattern as the bookmarks exercise:
//    create<AuthStore>()(immer((set) => ({ ... })))
//
// Navigator's reading:
//   https://zustand.docs.pmnd.rs/integrations/immer-middleware
// =====================================================================

import { create } from "zustand";

// TODO(step 1): import the Immer middleware
// import { immer } from "zustand/middleware/immer";

interface AuthStore {
	loggedInEmail: string | null;
	setLoggedIn: (email: string) => void;
	logout: () => void;
}

// TODO(step 1): wrap this in the `immer` middleware and implement the two
// actions so the page can log in and out.
export const useAuthStore = create<AuthStore>()((set) => ({
	loggedInEmail: null,

	setLoggedIn: (email) => {
		console.warn("setLoggedIn() not implemented", email, set);
	},

	logout: () => {
		console.warn("logout() not implemented");
	},
}));
