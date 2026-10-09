import express from "express";
import app from "./server/src/app.js";

// Vercel uses this default-exported Express app as the serverless entry point.
const handler = express();
handler.use(app);

export default handler;
