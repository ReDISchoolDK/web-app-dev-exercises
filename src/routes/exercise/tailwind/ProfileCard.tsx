// =====================================================================
// STEP 1 — Style the profile card (solved)
//
// A white card with rounded corners, a shadow, a subtle border and
// padding. The avatar is a 64px circle beside the name and role,
// laid out with flexbox. The bio sits below with a little top margin.
//
// Success criteria:
//   [x] The card has a white background, rounded corners, a shadow and padding
//   [x] The avatar is circular and sits to the left of the name
//   [x] Name is large and bold, role is small and gray, bio is regular
//   [x] Nothing is clipped or overflowing
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
		<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
			<div className="flex items-start gap-4">
				<img
					src={profile.avatarUrl}
					alt={profile.name}
					className="size-16 shrink-0 rounded-full object-cover"
				/>
				<div>
					<h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
					<p className="text-sm text-gray-500">{profile.role}</p>
				</div>
			</div>
			<p className="mt-4 text-gray-700">{profile.bio}</p>
		</div>
	);
};
