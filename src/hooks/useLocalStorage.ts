// =====================================================================
// useLocalStorage — custom hook
//
// Behaves like useState, but the value survives a page reload because
// it gets saved to window.localStorage.
//
// Success criteria:
//   [x] Reads from localStorage on first render, falls back to `initial`
//   [x] Writes to localStorage whenever the value changes (useEffect)
//   [x] Returns `[value, setValue]` — same shape as useState
//   [x] JSON.parse is wrapped in try/catch so bad data doesn't crash
//
// 💡 `as const` at the end keeps the tuple type narrow.
// 💡 localStorage.getItem returns `null` (not undefined) for missing keys.
// =====================================================================

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
	const [value, setValue] = useState<T>(() => {
		const stored = localStorage.getItem(key);
		if (stored === null) return initial;
		try {
			return JSON.parse(stored) as T;
		} catch {
			// Bad data in storage — fall back, don't crash
			return initial;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
}
