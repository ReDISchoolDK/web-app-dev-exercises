// =====================================================================
// EXERCISE — Tailwind: utility-class styling in three layers (solved)
//
// A grid of profile cards and a row of action buttons, styled with
// nothing but Tailwind utility classes. Three files, one layer each:
//
// Step 1 — ProfileCard.tsx:   colors, spacing, typography, flexbox
// Step 2 — ProfileGrid.tsx:   responsive grid with md: / lg: prefixes
// Step 3 — ActionButtons.tsx: hover: / focus-visible: / active: / disabled:
//
// This file is the page shell. The light gray background is here on
// purpose so a white card has something to stand out against.
//
// Note for the navigator: the whole exercise is one pattern repeated —
// `property-value`, then `state:property-value`, then
// `breakpoint:property-value`. Point at it every time it shows up.
// =====================================================================

import { createFileRoute } from "@tanstack/react-router";
import { ActionButtons } from "./ActionButtons";
import { ProfileGrid } from "./ProfileGrid";

export const Route = createFileRoute("/exercise/tailwind/")({
	component: TailwindPage,
});

function TailwindPage() {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="mx-auto max-w-5xl">
				<h1 className="px-6 pt-8 text-2xl font-bold text-gray-900">Team</h1>
				<ProfileGrid />
				<ActionButtons />
			</div>
		</div>
	);
}
