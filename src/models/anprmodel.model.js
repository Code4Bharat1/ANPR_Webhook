import mongoose from "mongoose";

const AnprEventSchema = new mongoose.Schema(
  {
    messageId: { type: String, required: true, unique: true },

    cameraId: Number,
    cameraName: String,

    numberPlate: String,
    hashedNumberPlate: String,

    isEntry: Boolean,
    laneId: Number,
    direction: Number,

    vehicleType: Number,
    speed: Number,

    siteId: Number,
    siteName: String,

    timestamp: Date,

    image: String,
    frame: String,

    rawPayload: Object, // FULL RAW JSON (important for future debugging)
  },
  { timestamps: true }
);

export default mongoose.model("AnprEvent", AnprEventSchema);
