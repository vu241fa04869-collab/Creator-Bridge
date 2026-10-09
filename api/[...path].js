import express from "express";
import application from "../server/src/app.js";

const app = express();
app.use(application);

export default app;
