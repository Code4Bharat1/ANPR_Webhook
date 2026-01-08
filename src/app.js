import express from "express";
import webhookRoutes from "./routes/webhook.routes.js";
import anprRoutes from "./routes/anpr.routes.js";

const app = express();

app.use(express.json({ limit: "20mb" }));

app.use("/api/webhooks", webhookRoutes);
app.use("/api/anpr", anprRoutes);

export default app;
