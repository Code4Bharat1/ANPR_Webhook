import express from "express";
import webhookRoutes from "./routes/webhook.routes.js";

const app = express();

// IMPORTANT: camera sends JSON
app.use(express.json({ limit: "20mb" }));

app.use("/api/webhooks", webhookRoutes);

export default app;
