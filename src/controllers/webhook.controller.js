import AnprEvent from "../models/anprmodel.model.js";
import { getIO } from "../socket.js";

const anprWebhook = async (req, res) => {
  const payload = req.body;

  if (!payload || payload.type !== "event") {
    return res.status(200).json({ success: true });
  }

  const data = payload.data;
  const metadata = data?.metadata;

  if (!data?.messageid || !metadata) {
    return res.status(200).json({ success: true });
  }

  const exists = await AnprEvent.findOne({
    messageId: data.messageid,
  });

  if (exists) {
    console.log("⚠️ Duplicate event:", data.messageid);
    return res.status(200).json({ success: true });
  }

  const savedEvent = await AnprEvent.create({
    messageId: data.messageid,
    cameraId: metadata.camera_id,
    cameraName: metadata.node_name,
    numberPlate: metadata.number_plate,
    hashedNumberPlate: metadata.hashed_number_plate,
    isEntry: metadata.is_entry,
    laneId: metadata.lane_id,
    direction: metadata.direction,
    vehicleType: metadata.vtype,
    speed: metadata.speed,
    siteId: metadata.site,
    siteName: metadata.site_name,
    timestamp: new Date(metadata.timestamp),
    image: metadata.image,
    frame: metadata.frame,
    rawPayload: payload,
  });

  console.log("📦 Event saved:", savedEvent.messageId);

  const io = getIO();

  if (!io) {
    console.log("❌ Socket instance not available");
  } else {
    console.log("📡 Emitting event to clients...");
    io.emit("anpr:new-event", savedEvent.messageId);
  }

  return res.status(200).json({ success: true });
};

export default anprWebhook;
