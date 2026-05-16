// =====================================================================
// useLocalStorage — custom hook
//
// Goal: behaves like useState, but the value survives a page reload
// because it gets saved to window.localStorage.
//
// Read exercise.md (Step 2) for the full walkthrough. This file is the
// target — fill it in here.
//
// Success criteria:
//   [ ] Reads from localStorage on first render, falls back to `initial`
//   [ ] Writes to localStorage whenever the value changes (useEffect)
//   [ ] Returns `[value, setValue]` — same shape as useState
//   [ ] JSON.parse is wrapped in try/catch so bad data doesn't crash
//
// 💡 Hint — `as const` at the end keeps the tuple type narrow.
// 💡 Hint — localStorage.getItem returns `null` (not undefined) for missing keys.
// =====================================================================

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
	// 1. useState — read from localStorage on first render. If the key is
	//    missing or the stored JSON is bad, fall back to `initial`.
	//    Hint: pass a function to useState so it only runs once.
	const [value, setValue] = useState<T>(initial);

	// 2. useEffect — write to localStorage whenever `value` or `key` changes.
	// biome-ignore lint/correctness/useExhaustiveDependencies: stub — deps line up once you write the body
	useEffect(() => {
		// TODO: localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	// 3. Return `[value, setValue] as const`.
	return [value, setValue] as const;
}
