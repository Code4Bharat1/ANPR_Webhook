import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";

import {
  getAllEvents,
  getEventById,
  getEventByMessageId,
  getEventsByPlate,
  getEntryEvents,
  getExitEvents,
} from "../controllers/anpr.get.controller.js";

const router = express.Router();

router.get("/events", asyncHandler(getAllEvents));
router.get("/events/:id", asyncHandler(getEventById));
router.get("/events/message/:messageId", asyncHandler(getEventByMessageId));
router.get("/events/plate/:numberPlate", asyncHandler(getEventsByPlate));
router.get("/events/entry", asyncHandler(getEntryEvents));
router.get("/events/exit", asyncHandler(getExitEvents));

export default router;
