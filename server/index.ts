// Tiny Express + JSON-file API for the dog favorites exercise.
// Run with `pnpm dev:server` in a second terminal. Vite proxies /api → :8787.

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const PORT = 8787;
const DB_PATH = join(dirname(fileURLToPath(import.meta.url)), "db.json");

type Db = { favorites: string[] };

const readDb = async (): Promise<Db> =>
	JSON.parse(await readFile(DB_PATH, "utf8"));
const writeDb = (db: Db) => writeFile(DB_PATH, `${JSON.stringify(db, null, 2)}\n`);

const app = express();
app.use(express.json());

app.get("/api/favorites", async (_req, res) => {
	const db = await readDb();
	res.json(db.favorites);
});

app.post("/api/favorites", async (req, res) => {
	const { url } = req.body as { url?: string };
	if (!url) {
		res.status(400).json({ error: "url is required" });
		return;
	}
	const db = await readDb();
	if (!db.favorites.includes(url)) db.favorites.push(url);
	await writeDb(db);
	res.json(db.favorites);
});

app.delete("/api/favorites", async (req, res) => {
	const { url } = req.body as { url?: string };
	if (!url) {
		res.status(400).json({ error: "url is required" });
		return;
	}
	const db = await readDb();
	db.favorites = db.favorites.filter((f) => f !== url);
	await writeDb(db);
	res.json(db.favorites);
});

app.listen(PORT, () => {
	console.log(`api on http://localhost:${PORT}`);
});
