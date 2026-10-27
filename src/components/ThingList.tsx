import { useThingStore } from "@/stores/things";

export const ThingList = () => {
	// The selector `(s) => s.things` picks one slice of the store. This
	// component re-renders only when `things` changes. If you select the whole
	// store (no selector), it re-renders on every change to anything in it.
	const things = useThingStore((s) => s.things);

	return (
		<ul className="list-disc pl-6">
			{things.map((thing) => (
				<li key={thing.id}>{thing.name}</li>
			))}
		</ul>
	);
};
