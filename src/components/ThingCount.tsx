import { useThingStore } from "@/stores/things";

export const ThingCount = () => {
	// Same store, different component. No props needed to get the same data.
	const things = useThingStore((s) => s.things);

	return <p className="font-medium">Things in store: {things.length}</p>;
};
