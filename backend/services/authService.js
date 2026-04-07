const { pool } = require("../config/db");
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async ({ fullName, email, password }) => {
    
    // Kiểm tra email tồn tại
    const userExist = await pool.request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM Users WHERE Email = @email");

    if (userExist.recordset.length > 0) {
        throw new Error("Email này đã được đăng ký!"); // Sẽ bị catch bên Controller
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Lưu DB
    await pool.request()
        .input("fullName", sql.NVarChar, fullName)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, hashedPassword)
        .query("INSERT INTO Users (FullName, Email, Password) VALUES (@fullName, @email, @password)");

    return { message: "Đăng ký thành công!" };
};

exports.login = async ({ email, password }) => {
    const result = await pool.request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM Users WHERE Email = @email");

    const user = result.recordset[0];
    if (!user) throw new Error("Email không tồn tại!");

    // So khớp mật khẩu
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) throw new Error("Mật khẩu không đúng!");

    // Tạo Token
    const token = jwt.sign({ id: user.Id }, "SECRET_KEY", { expiresIn: "1h" });

    return { 
      token, 
      user: { 
        id: user.Id, 
        fullName: user.FullName, 
        email: user.Email,
        role: user.Role || 'user'
      } 
    };
};