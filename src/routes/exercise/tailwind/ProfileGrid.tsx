// =====================================================================
// STEP 2 — Responsive card grid (solved)
//
// One column on a phone, two from `md` (768px), three from `lg`
// (1024px). No prefix = the mobile base; prefixes add rules on top
// as the screen gets wider.
//
// Success criteria:
//   [x] 1 column at ~375px wide
//   [x] 2 columns at ~800px wide
//   [x] 3 columns at ~1100px wide
//   [x] Visible gaps between the cards, padding around the grid
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
		<div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
			{profiles.map((profile) => (
				<ProfileCard key={profile.id} profile={profile} />
			))}
		</div>
	);
};
