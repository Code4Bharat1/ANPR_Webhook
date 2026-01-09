import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import anprWebhook from "../controllers/webhook.controller.js";

const router = express.Router();

router.post("/anpr", asyncHandler(anprWebhook));

export default router;
