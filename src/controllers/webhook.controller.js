import AnprEvent from "../models/anprmodel.model.js";

const anprWebhook = async (req, res) => {
  const payload = req.body;

  // Basic validation
  if (!payload || payload.type !== "event") {
    return res.status(200).json({ success: true });
  }

  const data = payload.data;
  const metadata = data?.metadata;

  if (!data?.messageid || !metadata) {
    return res.status(200).json({ success: true });
  }

  // Check for duplicate message
  const exists = await AnprEvent.findOne({
    messageId: data.messageid,
  });

  if (exists) {
    return res.status(200).json({ success: true });
  }

  // Store event
  await AnprEvent.create({
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

  // Always ACK success
  return res.status(200).json({ success: true });
};

export default anprWebhook;
