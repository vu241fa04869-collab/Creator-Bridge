import { Router } from "express";
import { getCreator, listCreators } from "../dataStore.js";

const router = Router();
router.get("/", async (req, res) => {
  const { search, q, specialty, tool, type } = req.query;
  res.json(await listCreators({ search: String(search || q || "").slice(0, 100), specialty: String(specialty || "").slice(0, 100), tool: String(tool || "").slice(0, 100), type: String(type || "").slice(0, 100) }));
});
router.get("/:id", async (req, res) => {
  const creator = await getCreator(String(req.params.id).slice(0, 100));
  if (!creator) return res.status(404).json({ error: "Creator not found." });
  res.json(creator);
});
export default router;
