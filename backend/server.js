require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { pool, connectDB } = require("./config/db");
const sql = require("mssql");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // Cho phép cả 2 port
  methods: ["GET", "POST", "PUT", "DELETE"],
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

app.get("/", (req, res) => {
  res.send("API running...");
});

// Initialize Database - Tạo tất cả các bảng cần thiết
app.post("/init-db", async (req, res) => {
  try {
    // 1. Tạo bảng Tables
    await pool.request().query(`
      IF NOT EXISTS (
        SELECT *
        FROM sys.objects
        WHERE object_id = OBJECT_ID (N'[dbo].[Tables]')
        AND type in (N'U')
      ) BEGIN
        CREATE TABLE Tables (
          TableID INT PRIMARY KEY IDENTITY (1, 1),
          TableNumber INT NOT NULL UNIQUE,
          Capacity INT NOT NULL CHECK (Capacity > 0),
          Status VARCHAR(20) DEFAULT 'Available' CHECK (Status IN ('Available', 'Reserved', 'Occupied')),
          CreatedAt DATETIME DEFAULT GETDATE()
        );
      END
    `);

    // 2. Tạo bảng Reservations
    await pool.request().query(`
      IF NOT EXISTS (
        SELECT *
        FROM sys.objects
        WHERE object_id = OBJECT_ID (N'[dbo].[Reservations]')
        AND type in (N'U')
      ) BEGIN
        CREATE TABLE Reservations (
          ReservationID INT PRIMARY KEY IDENTITY (1, 1),
          UserID INT NULL,
          FullName NVARCHAR (100) NOT NULL,
          Email VARCHAR(100) NOT NULL,
          Phone VARCHAR(20) NOT NULL,
          ReservationDate DATE NOT NULL,
          ReservationTime VARCHAR(10) NOT NULL,
          NumberOfGuests INT NOT NULL CHECK (NumberOfGuests > 0),
          TableID INT NULL,
          SpecialRequests NVARCHAR(MAX),
          Status VARCHAR(20) DEFAULT 'Pending' CHECK (Status IN ('Pending', 'Confirmed', 'Cancelled')),
          CreatedAt DATETIME DEFAULT GETDATE(),
          UpdatedAt DATETIME DEFAULT GETDATE()
        );
      END
    `);

    // 3. Xóa dữ liệu cũ & insert bàn mẫu
    await pool.request().query("DELETE FROM Tables");
    
    await pool.request()
      .input("table1Number", sql.Int, 1)
      .input("table1Capacity", sql.Int, 2)
      .input("table2Number", sql.Int, 2)
      .input("table2Capacity", sql.Int, 4)
      .input("table3Number", sql.Int, 3)
      .input("table3Capacity", sql.Int, 6)
      .query(`
        INSERT INTO Tables (TableNumber, Capacity, Status)
        VALUES 
          (@table1Number, @table1Capacity, 'Available'),
          (@table2Number, @table2Capacity, 'Available'),
          (@table3Number, @table3Capacity, 'Available')
      `);

    res.json({ success: true, message: "✅ Database initialized successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "❌ Error: " + err.message });
  }
});

// Seed tables (tạm thời - xóa sau khi dùng)
app.post("/seed-tables", async (req, res) => {
  try {
    // Tạo bảng Tables nếu chưa tồn tại
    await pool.request().query(`
      IF NOT EXISTS (
        SELECT *
        FROM sys.objects
        WHERE object_id = OBJECT_ID (N'[dbo].[Tables]')
        AND type in (N'U')
      ) BEGIN
        CREATE TABLE Tables (
          TableID INT PRIMARY KEY IDENTITY (1, 1),
          TableNumber INT NOT NULL UNIQUE,
          Capacity INT NOT NULL CHECK (Capacity > 0),
          Status VARCHAR(20) DEFAULT 'Available' CHECK (Status IN ('Available', 'Reserved', 'Occupied')),
          CreatedAt DATETIME DEFAULT GETDATE()
        );
      END
    `);

    // Xóa dữ liệu cũ nếu có
    await pool.request().query("DELETE FROM Tables");
    
    // Insert 3 bàn mẫu
    await pool.request()
      .input("table1Number", sql.Int, 1)
      .input("table1Capacity", sql.Int, 2)
      .input("table2Number", sql.Int, 2)
      .input("table2Capacity", sql.Int, 4)
      .input("table3Number", sql.Int, 3)
      .input("table3Capacity", sql.Int, 6)
      .query(`
        INSERT INTO Tables (TableNumber, Capacity, Status)
        VALUES 
          (@table1Number, @table1Capacity, 'Available'),
          (@table2Number, @table2Capacity, 'Available'),
          (@table3Number, @table3Capacity, 'Available')
      `);

    res.json({ success: true, message: "✅ Đã tạo 3 bàn mẫu thành công!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi: " + err.message });
  }
});

// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.request().query("SELECT COUNT(*) as tableCount FROM Tables");
    res.json({ 
      success: true, 
      message: "✅ Database connected!",
      data: result.recordset[0]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "❌ Database error: " + err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});