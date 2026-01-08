import AnprEvent from "../models/anprmodel.model.js";

// 1️⃣ Get all ANPR events (latest first)
export const getAllEvents = async (req, res) => {
  const events = await AnprEvent.find().sort({ createdAt: -1 }).limit(100); // safety limit

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
};

// 2️⃣ Get event by MongoDB ID
export const getEventById = async (req, res) => {
  const event = await AnprEvent.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  res.status(200).json({
    success: true,
    data: event,
  });
};

// 3️⃣ Get event by messageId
export const getEventByMessageId = async (req, res) => {
  const event = await AnprEvent.findOne({
    messageId: req.params.messageId,
  });

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  res.status(200).json({
    success: true,
    data: event,
  });
};

// 4️⃣ Get events by number plate
export const getEventsByPlate = async (req, res) => {
  const events = await AnprEvent.find({
    numberPlate: req.params.numberPlate,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
};

// 5️⃣ Get entry events
export const getEntryEvents = async (req, res) => {
  const events = await AnprEvent.find({ isEntry: true }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
};

// 6️⃣ Get exit events
export const getExitEvents = async (req, res) => {
  const events = await AnprEvent.find({ isEntry: false }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
};
