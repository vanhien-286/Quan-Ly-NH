const sql = require("mssql");

const config = {
    user: "sa",              // Tài khoản sa bạn đã bật
    password: "123456",         // Mật khẩu bạn đã đặt cho sa
    server: "LAPTOP-0BP3Q4T5", // Tên server của bạn
    database: "DACCJS",
    options: {
        encrypt: false, 
        trustServerCertificate: true,
    },
    port: 1433
};

const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("✅ Connected SQL Server: LAPTOP-0BP3Q4T5");
    } catch (err) {
        console.error("❌ DB Error:", err.message);
    }
};

module.exports = { sql, connectDB };