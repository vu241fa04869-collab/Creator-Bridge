import app from "./app.js";
const port = Number(process.env.PORT || 8787);
app.listen(port, () => console.info(`CreatorBridge API listening on port ${port}.`));
