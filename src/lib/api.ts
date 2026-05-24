// Dog CEO API — free, no API key needed
// Docs: https://dog.ceo/dog-api/

interface DogApiResponse {
	message: string;
	status: string;
}

/**
 * Fetches a random dog image URL from the Dog CEO API.
 *
 * The API returns a JSON object like `{ message: "https://...jpg", status: "success" }`.
 * This function unwraps that and gives you just the image URL as a string.
 *
 * Use this with TanStack Query's `useQuery` hook in your components:
 *
 * ```ts
 * const { data: imageUrl } = useQuery({
 *   queryKey: ["randomDog"],
 *   queryFn: fetchRandomDog,
 * });
 * ```
 */
export async function fetchRandomDog(): Promise<string> {
	const res = await fetch("https://dog.ceo/api/breeds/image/random");
	if (!res.ok) throw new Error(`API error: ${res.status}`);
	const data: DogApiResponse = await res.json();
	return data.message;
}

// ---------------------------------------------------------------------
// Favorites API — talks to our own Express server (server/index.ts).
// Vite proxies /api → http://localhost:8787 in dev. Run the server with
// `pnpm dev:server` in a second terminal.
// ---------------------------------------------------------------------

/**
 * Fetches the list of saved dog image URLs.
 *
 * ```ts
 * const { data: favorites = [] } = useQuery({
 *   queryKey: ["favorites"],
 *   queryFn: getFavorites,
 * });
 * ```
 */
export async function getFavorites(): Promise<string[]> {
	const res = await fetch("/api/favorites");
	if (!res.ok) throw new Error(`API error: ${res.status}`);
	return res.json();
}

/**
 * Saves a dog image URL to the server. Returns the updated list.
 *
 * Pair with React Query's useMutation and invalidate ["favorites"] on success:
 *
 * ```ts
 * const add = useMutation({
 *   mutationFn: addFavorite,
 *   onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
 * });
 * ```
 */
export async function addFavorite(url: string): Promise<string[]> {
	const res = await fetch("/api/favorites", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ url }),
	});
	if (!res.ok) throw new Error(`API error: ${res.status}`);
	return res.json();
}

/**
 * Removes a dog image URL from the server. Returns the updated list.
 *
 * Same shape as addFavorite — invalidate ["favorites"] on success.
 */
export async function removeFavorite(url: string): Promise<string[]> {
	const res = await fetch("/api/favorites", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ url }),
	});
	if (!res.ok) throw new Error(`API error: ${res.status}`);
	return res.json();
}
