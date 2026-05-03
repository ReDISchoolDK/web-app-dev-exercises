// Dog CEO API — free, no API key needed
// Docs: https://dog.ceo/dog-api/

interface DogApiResponse<T> {
	message: T;
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
	const data: DogApiResponse<string> = await res.json();
	return data.message;
}

/**
 * Fetches the list of sub-breed names for a given breed.
 *
 * For example, `fetchSubBreeds("hound")` returns `["afghan", "basset", ...]`.
 * If the breed has no sub-breeds, the API returns an empty array.
 *
 * Use the breed name in the queryKey so React Query caches each breed separately:
 *
 * ```ts
 * const { data: subBreeds } = useQuery({
 *   queryKey: ["subBreeds", breed],
 *   queryFn: () => fetchSubBreeds(breed),
 * });
 * ```
 */
export async function fetchSubBreeds(breed: string): Promise<string[]> {
	const res = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
	if (!res.ok) throw new Error(`API error: ${res.status}`);
	const data: DogApiResponse<string[]> = await res.json();
	return data.message;
}

/**
 * Fetches `count` random dog image URLs in a single request.
 *
 * Put the count in the queryKey so each count gets its own cache entry:
 *
 * ```ts
 * const { data: images } = useQuery({
 *   queryKey: ["randomDogs", count],
 *   queryFn: () => fetchRandomDogs(count),
 * });
 * ```
 */
export async function fetchRandomDogs(count: number): Promise<string[]> {
	const res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
	if (!res.ok) throw new Error(`API error: ${res.status}`);
	const data: DogApiResponse<string[]> = await res.json();
	return data.message;
}
