import { Router } from "express";

const router = Router();
const contentTypes = ["Video", "Social", "Product visuals", "Campaign", "Branding", "Editorial"];
const aspectRatios = ["9:16 · Vertical", "1:1 · Square", "4:5 · Portrait", "16:9 · Landscape", "Flexible"];
const responseSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "A clear, concise campaign title." },
    campaignObjective: { type: "string", description: "The campaign goal, grounded in the idea provided." },
    targetAudience: { type: "string", description: "A plausible target audience; state assumptions as assumptions." },
    contentType: { type: "string", enum: contentTypes },
    style: { type: "string", description: "A short visual or editorial direction." },
    aspectRatio: { type: "string", enum: aspectRatios },
    deliverables: { type: "array", items: { type: "string" }, description: "A concise suggested deliverable list." },
    commercialUse: { type: "boolean", description: "True only if commercial use is explicitly requested or clearly required by the idea." }
  },
  required: ["title", "campaignObjective", "targetAudience", "contentType", "style", "aspectRatio", "deliverables", "commercialUse"],
  additionalProperties: false
};

router.post("/brief", async (req, res) => {
  const idea = String(req.body?.idea || "").trim();
  if (!idea) return res.status(400).json({ error: "Enter a rough idea to generate a brief." });
  if (idea.length > 2000) return res.status(400).json({ error: "Keep the idea under 2,000 characters." });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "Gemini is not configured. Add GEMINI_API_KEY to server/.env and restart the API." });

  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const prompt = `Turn this rough campaign idea into a useful first-draft creative brief. Preserve the user's intent, do not invent brand facts, and make assumptions conservative. The draft will be reviewed and edited by a human. Choose contentType and aspectRatio only from the supplied schema. Set commercialUse true only when the idea says the work is for a brand, product, sale, advertisement, launch, or other commercial campaign.\n\nRough idea:\n${idea}`;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseFormat: { text: { mimeType: "application/json", schema: responseSchema } }, temperature: 0.3 }
      }),
      signal: AbortSignal.timeout(45000)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const providerMessage = payload?.error?.message || `HTTP ${response.status}`;
      return res.status(response.status === 429 ? 429 : 502).json({ error: `Gemini request failed: ${providerMessage}` });
    }
    const text = payload?.candidates?.[0]?.content?.parts?.map(part => part.text || "").join("");
    if (!text) return res.status(502).json({ error: "Gemini returned no brief. Try again with a little more detail." });
    const draft = JSON.parse(text);
    if (!contentTypes.includes(draft.contentType) || !aspectRatios.includes(draft.aspectRatio) || !Array.isArray(draft.deliverables)) {
      return res.status(502).json({ error: "Gemini returned a draft that did not match the brief format. Please try again." });
    }
    res.json({ ...draft, aiGenerated: true, model });
  } catch (error) {
    const timeout = error.name === "TimeoutError" || error.name === "AbortError";
    res.status(timeout ? 504 : 502).json({ error: timeout ? "Gemini took too long to respond. Try again." : "Could not reach Gemini. Check the server connection and try again." });
  }
});

export default router;
