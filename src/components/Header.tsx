import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<header className="border-b bg-background">
			<div className="mx-auto flex h-14 max-w-5xl items-center px-4">
				<Link to="/" className="text-lg font-semibold">
					My App
				</Link>

				<nav className="ml-8 flex gap-4">
					<Link
						to="/"
						className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
					>
						Home
					</Link>
					<Link
						to="/exercise/random-dog"
						className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
					>
						Step 1
					</Link>
					<Link
						to="/exercise/sub-breeds"
						className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
					>
						Step 2
					</Link>
					<Link
						to="/exercise/image-count"
						className="text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
					>
						Step 3
					</Link>
				</nav>
			</div>
		</header>
	);
}
