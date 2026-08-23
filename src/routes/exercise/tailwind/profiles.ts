export interface Profile {
	id: number;
	name: string;
	role: string;
	bio: string;
	avatarUrl: string;
}

/** Six made-up people. The avatars are local SVGs in `public/avatars/`. */
export const profiles: Profile[] = [
	{
		id: 1,
		name: "Ada Morgan",
		role: "Frontend Developer",
		bio: "Builds interfaces that feel fast. Will argue about button padding for longer than is reasonable.",
		avatarUrl: "/avatars/ada.svg",
	},
	{
		id: 2,
		name: "Ben Okafor",
		role: "Product Designer",
		bio: "Sketches on paper first, then in Figma, then asks why the handoff never matches.",
		avatarUrl: "/avatars/ben.svg",
	},
	{
		id: 3,
		name: "Cleo Vance",
		role: "Backend Engineer",
		bio: "Happiest when the API returns in under 50 ms. Keeps a sourdough starter named Postgres.",
		avatarUrl: "/avatars/cleo.svg",
	},
	{
		id: 4,
		name: "Dev Rao",
		role: "QA Engineer",
		bio: "Finds the bug you swore was impossible, then writes a test so it stays fixed.",
		avatarUrl: "/avatars/dev.svg",
	},
	{
		id: 5,
		name: "Emi Kato",
		role: "Data Analyst",
		bio: "Turns messy spreadsheets into one chart that ends the meeting early.",
		avatarUrl: "/avatars/emi.svg",
	},
	{
		id: 6,
		name: "Finn Larsen",
		role: "DevOps",
		bio: "Automates everything twice. The second time is so nobody has to ask how it works.",
		avatarUrl: "/avatars/finn.svg",
	},
];
