// =====================================================================
// STEP 1 — Style the profile card
//
// Build: a white card with rounded corners, a shadow, a subtle border
// and padding. The avatar becomes a 64px circle beside the name and
// role, laid out with flexbox. The bio sits below with a little
// top margin.
//
// The structure is done. You only add className props — read the
// README (Step 1) for the walkthrough and the class reference.
//
// Success criteria:
//   [ ] The card has a white background, rounded corners, a shadow and padding
//   [ ] The avatar is circular and sits to the left of the name
//   [ ] Name is large and bold, role is small and gray, bio is regular
//   [ ] Nothing is clipped or overflowing
//
// 💡 `shrink-0` stops flexbox from squeezing the avatar when the text
//    is long. `object-cover` crops the image instead of squashing it.
//
// Navigator's reading:
//   https://tailwindcss.com/docs/styling-with-utility-classes
// =====================================================================

import type { Profile } from "./profiles";

interface ProfileCardProps {
	profile: Profile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
	return (
		// 1. Make this div the card box: white bg, rounded, shadow, border, padding.
		<div>
			{/* 2. Make this div a flex row with a gap, items aligned to the top. */}
			<div>
				{/* 3. Avatar: fixed 64px square, circular, cropped — not squashed. */}
				<img src={profile.avatarUrl} alt={profile.name} />
				<div>
					{/* 4. Name large + bold, role small + gray. */}
					<h2>{profile.name}</h2>
					<p>{profile.role}</p>
				</div>
			</div>
			{/* 5. Bio: regular text with margin above. */}
			<p>{profile.bio}</p>
		</div>
	);
};
