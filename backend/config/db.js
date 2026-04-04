const sql = require("mssql");

const config = {
    user: "sa",              // Tài khoản sa bạn đã bật
    password: "123456",         // Mật khẩu bạn đã đặt cho sa
    server: "localhost", // Tên server của bạn
    database: "DACCJS",
    options: {
        encrypt: false, 
        trustServerCertificate: true,
    },
    port: 1433
};

// Tạo connection pool
const pool = new sql.ConnectionPool(config);
let poolConnection = null;

const connectDB = async () => {
    try {
        poolConnection = await pool.connect();
        console.log("✅ Connected SQL Server: LAPTOP-0BP3Q4T5");
    } catch (err) {
        console.error("❌ DB Error:", err.message);
    }
};

module.exports = { pool, connectDB };