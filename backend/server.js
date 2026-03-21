require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db"); // 1. Import hàm kết nối DB

const app = express();

app.use(cors());
app.use(express.json());

// 2. Gọi hàm kết nối database
connectDB(); 

// 3. Sửa lại đường dẫn import cho đúng tên file
const authRoutes = require("./routes/authRoutes"); 
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});