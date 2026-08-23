// =====================================================================
// STEP 2 — Responsive card grid
//
// Build: one column on a phone, two from `md` (768px), three from
// `lg` (1024px). No prefix = the mobile base; prefixes add rules on
// top as the screen gets wider.
//
// Success criteria:
//   [ ] 1 column at ~375px wide
//   [ ] 2 columns at ~800px wide
//   [ ] 3 columns at ~1100px wide
//   [ ] Visible gaps between the cards, padding around the grid
//
// 💡 Tailwind is mobile-first: `md:grid-cols-2` means "2 columns at
//    768px AND wider", not "only at 768px".
//
// Navigator's reading:
//   https://tailwindcss.com/docs/responsive-design
// =====================================================================

import { ProfileCard } from "./ProfileCard";
import { profiles } from "./profiles";

export const ProfileGrid = () => {
	return (
		// 1. Make this div a one-column grid with a gap and padding.
		// 2. Add md: and lg: prefixes for two and three columns.
		<div>
			{profiles.map((profile) => (
				<ProfileCard key={profile.id} profile={profile} />
			))}
		</div>
	);
};
