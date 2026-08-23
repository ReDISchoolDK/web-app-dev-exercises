// =====================================================================
// STEP 3 — Interactive action buttons (solved)
//
// Three visually distinct buttons (primary / secondary / danger) and
// a disabled one. Every button darkens on hover, shows a ring when
// focused from the keyboard, shrinks slightly while pressed, and
// fades out when disabled.
//
// Success criteria:
//   [x] Primary is blue, secondary is gray, danger is red
//   [x] Hovering darkens the background
//   [x] Pressing Tab moves a visible ring from button to button
//   [x] Clicking (or pressing Space/Enter) shrinks the button slightly
//   [x] The disabled button is faded and shows a not-allowed cursor
//
// 💡 Put the classes every button shares in one string. Then each
//    variant only adds the colors. No copy-paste four times over.
//
// Navigator's reading:
//   https://tailwindcss.com/docs/hover-focus-and-other-states
// =====================================================================

const baseButton =
	"rounded-lg px-4 py-2 font-medium transition duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50";

export const ActionButtons = () => {
	return (
		<div className="flex flex-wrap gap-3 p-6">
			<button
				type="button"
				className={`${baseButton} bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500`}
			>
				Save changes
			</button>
			<button
				type="button"
				className={`${baseButton} bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:ring-gray-500`}
			>
				Cancel
			</button>
			<button
				type="button"
				className={`${baseButton} bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500`}
			>
				Delete account
			</button>
			<button
				type="button"
				className={`${baseButton} bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500`}
				disabled
			>
				Processing…
			</button>
		</div>
	);
};
