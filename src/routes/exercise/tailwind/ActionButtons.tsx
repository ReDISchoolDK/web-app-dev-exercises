// =====================================================================
// STEP 3 — Interactive action buttons
//
// Build: three visually distinct buttons (primary blue / secondary
// gray / danger red) and a disabled one. Every button darkens on
// hover, shows a ring when focused from the keyboard, shrinks
// slightly while pressed, and fades out when disabled.
//
// Success criteria:
//   [ ] Primary is blue, secondary is gray, danger is red
//   [ ] Hovering darkens the background
//   [ ] Pressing Tab moves a visible ring from button to button
//   [ ] Clicking (or pressing Space/Enter) shrinks the button slightly
//   [ ] The disabled button is faded and shows a not-allowed cursor
//
// 💡 Put the classes every button shares in one string (the README
//    shows the pattern). Then each variant only adds the colors.
//    No copy-paste four times over.
//
// Navigator's reading:
//   https://tailwindcss.com/docs/hover-focus-and-other-states
// =====================================================================

// 1. Build the shared base string here:
//    const baseButton = "rounded-lg px-4 py-2 ...";

export const ActionButtons = () => {
	return (
		// 2. Give this row flex, wrapping, a gap and padding.
		<div>
			{/* 3. className={`${baseButton} ...blue variant...`} — see README Step 3. */}
			<button type="button">Save changes</button>
			{/* 4. Gray variant. */}
			<button type="button">Cancel</button>
			{/* 5. Red variant. */}
			<button type="button">Delete account</button>
			{/* 6. Reuse the blue variant — the disabled: classes handle the rest. */}
			<button type="button" disabled>
				Processing…
			</button>
		</div>
	);
};
