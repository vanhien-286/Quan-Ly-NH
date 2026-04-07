const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");
const sql = require("mssql");

// Middleware kiểm tra token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    
    // Lấy thông tin người dùng từ database để có role
    const result = await pool.request()
      .input("userId", sql.Int, decoded.id)
      .query("SELECT Id, FullName, Email, Role FROM Users WHERE Id = @userId");
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }
    
    const user = result.recordset[0];
    req.user = {
      id: user.Id,
      fullName: user.FullName,
      email: user.Email,
      role: user.Role || 'user'
    };
    
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token: " + err.message });
  }
};

module.exports = verifyToken;