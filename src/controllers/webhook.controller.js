import AnprEvent from "../models/anprmodel.model.js";
import anprEmitter from "../utils/anprEmitter.js";

export const handleWebhook = async (req, res) => {
  const payload = req.body;

  const event = await AnprEvent.create({
    messageId: payload.messageId,
    cameraId: payload.cameraId,
    cameraName: payload.cameraName,
    numberPlate: payload.numberPlate,
    hashedNumberPlate: payload.hashedNumberPlate,
    isEntry: payload.isEntry,
    laneId: payload.laneId,
    direction: payload.direction,
    vehicleType: payload.vehicleType,
    speed: payload.speed,
    siteId: payload.siteId,
    siteName: payload.siteName,
    timestamp: payload.timestamp,
    image: payload.image,
    frame: payload.frame,
    rawPayload: payload,
  });

  // 🔥 TRIGGER REAL-TIME EVENT
  anprEmitter.emit("NEW_ANPR_EVENT", event);

  res.status(200).json({ success: true });
};
