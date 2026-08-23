// =====================================================================
// EXERCISE — Tailwind: utility-class styling in three layers
//
// Build: a grid of profile cards and a row of action buttons, styled
// with nothing but Tailwind utility classes. Three files, one layer
// each — read the README for the walkthrough:
//
// Step 1 — ProfileCard.tsx:   colors, spacing, typography, flexbox
// Step 2 — ProfileGrid.tsx:   responsive grid with md: / lg: prefixes
// Step 3 — ActionButtons.tsx: hover: / focus-visible: / active: / disabled:
//
// This file is the page shell — read it, don't touch it. The light
// gray background is here on purpose so your white card has something
// to stand out against.
//
// Success criteria:
//   [ ] Step 1: a styled card — white, rounded, shadowed, avatar circle
//   [ ] Step 2: 1 / 2 / 3 grid columns as the screen gets wider
//   [ ] Step 3: buttons with hover, keyboard focus ring, press, disabled
//
// Navigator's reading: styling with utility classes
//   https://tailwindcss.com/docs/styling-with-utility-classes
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
