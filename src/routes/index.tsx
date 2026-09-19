// =====================================================================
// HOME PAGE — this is your app's front door. Replace it with your own.
//
// The file name decides the URL: src/routes/index.tsx is "/",
// src/routes/about.tsx would be "/about".
// =====================================================================

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="mx-auto max-w-2xl p-8">
			<h1 className="mb-2 text-3xl font-bold">Your app starts here</h1>
			<p className="mb-6 text-muted-foreground">
				This is the starter template, running. Edit{" "}
				<code className="rounded bg-muted px-1">src/routes/index.tsx</code> to
				make this page your own — save, and the browser updates by itself.
			</p>

			<div className="mb-8 rounded-md border border-dashed px-4 py-3">
				<p className="text-sm text-muted-foreground">
					Not sure where to start? The{" "}
					<Link to="/example" className="underline">
						example page
					</Link>{" "}
					is a small working feature — it fetches from an API and saves
					favorites. Read its code in{" "}
					<code className="rounded bg-muted px-1">
						src/routes/example/index.tsx
					</code>{" "}
					and copy the patterns.
				</p>
			</div>

			<h2 className="mb-3 text-xl font-semibold">How to</h2>
			<ul className="flex flex-col gap-3 text-muted-foreground">
				<li>
					<strong className="text-foreground">Add a page</strong> — create a
					file in <code className="rounded bg-muted px-1">src/routes/</code>.
					The file name becomes the URL.
				</li>
				<li>
					<strong className="text-foreground">Add a UI component</strong> — run{" "}
					<code className="rounded bg-muted px-1">
						pnpm dlx shadcn@latest add button
					</code>
					.
				</li>
				<li>
					<strong className="text-foreground">Fetch data</strong> — use TanStack
					Query's <code className="rounded bg-muted px-1">useQuery</code>. See{" "}
					<code className="rounded bg-muted px-1">src/lib/api.ts</code>.
				</li>
				<li>
					<strong className="text-foreground">Share state</strong> — use a
					Zustand store. See{" "}
					<code className="rounded bg-muted px-1">src/stores/example.ts</code>.
				</li>
			</ul>
		</div>
	);
}
