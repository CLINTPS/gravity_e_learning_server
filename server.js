const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const inquiryRoutes = require("./routes/inquiries");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/gravity_e_learning");

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.get("/", (req, res) => {
  res.send("Cokonet Academy API is running...");
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
