require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { pool, connectDB } = require("./config/db");
const sql = require("mssql");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // Cho phép cả 2 port
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

// 2. Gọi hàm kết nối database
connectDB(); 

// 3. Sửa lại đường dẫn import cho đúng tên file
const authRoutes = require("./routes/authRoutes"); 
app.use("/api/auth", authRoutes);

const reservationRoutes = require("./routes/reservationRoutes");
app.use("/api/reservations", reservationRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const articleRoutes = require("./routes/articleRoutes");
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});