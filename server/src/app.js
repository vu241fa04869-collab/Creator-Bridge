import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { connectDatabase, databaseMode } from "./dataStore.js";
import aiRouter from "./routes/ai.js";
import briefsRouter from "./routes/briefs.js";
import creatorsRouter from "./routes/creators.js";

const app = express();
const serverDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectDir = resolve(serverDir, "..");
const staticDir = resolve(projectDir, "public");
dotenv.config({ path: resolve(serverDir, ".env") });
const allowedOrigins = String(process.env.CORS_ALLOWED_ORIGINS || "").split(",").map(origin => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.use(cors({ origin(origin, callback) { callback(null, !origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)); } }));
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (_req, res) => res.json({ ok: true, database: databaseMode(), ai: Boolean(process.env.GEMINI_API_KEY) }));
app.use("/api/creators", creatorsRouter);
app.use("/api/briefs", briefsRouter);
app.use("/api/ai", aiRouter);

if (existsSync(staticDir)) {
  app.use(express.static(staticDir));
  app.get("/", (_req, res) => res.sendFile(resolve(staticDir, "index.html")));
}
app.use((req, res) => res.status(404).json({ error: `No route for ${req.method} ${req.path}` }));
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "The server could not complete that request." });
});

await connectDatabase(process.env.MONGODB_URI);

export default app;
