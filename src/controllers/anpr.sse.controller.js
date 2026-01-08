import anprEmitter from "../utils/anprEmitter.js";

export const anprEventStream = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  anprEmitter.on("NEW_ANPR_EVENT", sendEvent);

  req.on("close", () => {
    anprEmitter.off("NEW_ANPR_EVENT", sendEvent);
  });
};
