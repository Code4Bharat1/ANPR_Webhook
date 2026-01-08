import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://anpr.nexcorealliance.com",
    "https://anpr-backend-y7aj.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
  credentials: true,
   allowedHeaders: ["Content-Type", "Authorization"],
}));








app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
