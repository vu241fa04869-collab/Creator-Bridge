import { Router } from "express";
import { createBrief, listBriefs } from "../dataStore.js";

const router = Router();
router.get("/", async (_req, res) => res.json(await listBriefs()));
router.post("/", async (req, res) => {
  const { title, brand, contentType, type, idea, challenge, evidence, unknowns, budget } = req.body || {};
  if (!String(title || "").trim() || !String(brand || "").trim() || !String(contentType || type || "").trim() || !String(idea || "").trim()) {
    return res.status(400).json({ error: "Title, brand, content type, and idea are required." });
  }
  if (String(title).length > 120 || String(brand).length > 100 || String(idea).length > 4000) return res.status(400).json({ error: "One or more brief fields are too long." });
  if ([challenge, evidence, unknowns].some(value => value != null && String(value).length > 600)) return res.status(400).json({ error: "Clarity notes must be 600 characters or fewer each." });
  if (budget !== "" && budget != null && (!Number.isFinite(Number(budget)) || Number(budget) < 0)) return res.status(400).json({ error: "Budget must be a non-negative number." });
  res.status(201).json(await createBrief(req.body));
});
export default router;
