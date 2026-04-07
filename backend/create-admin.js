const { pool } = require("./config/db");
const bcrypt = require("bcryptjs");

async function createAdmin() {
    try {
        // Kết nối database
        await pool.connect();
        console.log("✅ Kết nối database DACCJS thành công");

        // Kiểm tra admin đã tồn tại chưa
        const checkAdmin = await pool.request()
            .input("email", "admin@gmail.com")
            .query("SELECT * FROM Users WHERE Email = @email");

        if (checkAdmin.recordset.length > 0) {
            console.log("⚠️ Admin account đã tồn tại!");
            const admin = checkAdmin.recordset[0];
            console.log(`📧 Email: ${admin.Email}`);
            console.log(`👤 Tên: ${admin.FullName}`);
            console.log(`🔑 Role: ${admin.Role}`);
            await pool.close();
            process.exit(0);
        }

        // Hash mật khẩu "123456"
        const password = "123456";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("\n🔒 Tạo admin account:");
        console.log(`📧 Email: admin@gmail.com`);
        console.log(`🔑 Mật khẩu: ${password}`);
        console.log(`Hash: ${hashedPassword.substring(0, 30)}...`);

        // Insert admin vào database
        await pool.request()
            .input("fullName", "Quản trị viên")
            .input("email", "admin@gmail.com")
            .input("password", hashedPassword)
            .input("role", "admin")
            .query(`
                INSERT INTO Users (FullName, Email, Password, Role) 
                VALUES (@fullName, @email, @password, @role)
            `);

        console.log("\n✅ Tạo admin account thành công!");
        console.log("\n📝 Thông tin đăng nhập:");
        console.log("─".repeat(40));
        console.log(`📧 Email:    admin@gmail.com`);
        console.log(`🔑 Mật khẩu: 123456`);
        console.log("─".repeat(40));

        await pool.close();
        process.exit(0);

    } catch (err) {
        console.error("❌ Lỗi:", err.message);
        process.exit(1);
    }
}

createAdmin();
