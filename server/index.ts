// =====================================================================
// EXERCISE — Part A: tiny Express API backed by a JSON file
//
// Goal: implement three handlers that read and write server/db.json.
// The frontend (src/routes/exercise/dog-favorites) will call them via
// Vite's /api proxy.
//
// Run this in its own terminal: `pnpm dev:server`. tsx watches the file
// and restarts on save.
//
// Success criteria:
//   [ ] GET /api/favorites returns the favorites array from db.json
//   [ ] POST /api/favorites with { url } appends the url (no duplicates)
//       and persists the new list to db.json
//   [ ] DELETE /api/favorites with { url } removes the url and persists
//   [ ] All three handlers return the updated list as JSON
//   [ ] POST/DELETE respond 400 when `url` is missing
//
// 💡 readDb() and writeDb() are already wired up — call them from the
//    handlers. The point of the exercise is the HTTP shape, not Node fs.
// 💡 express.json() (already mounted below) parses JSON bodies into
//    `req.body` for you. You do NOT need to read the raw stream.
// =====================================================================

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const PORT = 8787;
const DB_PATH = join(dirname(fileURLToPath(import.meta.url)), "db.json");

type Db = { favorites: string[] };

const readDb = async (): Promise<Db> =>
	JSON.parse(await readFile(DB_PATH, "utf8"));
const writeDb = (db: Db) =>
	writeFile(DB_PATH, `${JSON.stringify(db, null, 2)}\n`);

// Keep TS happy with the unused helpers — delete these two `void` lines
// once your handlers actually call readDb() / writeDb().
void readDb;
void writeDb;

const app = express();
app.use(express.json());

app.get("/api/favorites", async (_req, res) => {
	// TODO: const db = await readDb(); res.json(db.favorites);
	res.status(501).json({ error: "TODO: implement GET /api/favorites" });
});

app.post("/api/favorites", async (_req, res) => {
	// TODO:
	//   1. Pull `url` out of _req.body (and rename `_req` → `req`).
	//      If missing, respond 400 with { error: "url is required" }.
	//   2. await readDb(), push the url onto db.favorites (skip duplicates).
	//   3. await writeDb(db).
	//   4. Respond with the updated favorites array as JSON.
	res.status(501).json({ error: "TODO: implement POST /api/favorites" });
});

app.delete("/api/favorites", async (_req, res) => {
	// TODO: same shape as POST, but filter the url out of the array.
	res.status(501).json({ error: "TODO: implement DELETE /api/favorites" });
});

app.listen(PORT, () => {
	console.log(`api on http://localhost:${PORT}`);
});
