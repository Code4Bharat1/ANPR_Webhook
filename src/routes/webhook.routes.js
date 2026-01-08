import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { handleWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();

router.post("/anpr", asyncHandler(handleWebhook));

export default router;
