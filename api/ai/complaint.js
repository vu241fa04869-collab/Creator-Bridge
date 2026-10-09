import express from "express";
import application from "../../server/src/app.js";
// Expose the nested AI endpoint as an explicit Vercel function route.
const app = express();
app.use(application);
export default app;
