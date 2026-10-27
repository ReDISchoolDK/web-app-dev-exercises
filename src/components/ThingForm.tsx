import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useThingStore } from "@/stores/things";

export const ThingForm = () => {
	// LEARN: The typed text stays in local `useState`, not in the store. Only this
	// LEARN: component needs it, so sharing it with the whole app would be pointless.
	const [name, setName] = useState("");

	// LEARN: Select only `add`. This function never changes, so this component
	// LEARN: does not re-render when the list changes.
	const add = useThingStore((s) => s.add);
	// const {add} = useThingStore((s) => ({ add: s.add }));

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name.trim()) return;
		add({ name: name.trim() });
		setName("");
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<Input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Thing name"
			/>
			<Button type="submit">Add</Button>
		</form>
	);
};
