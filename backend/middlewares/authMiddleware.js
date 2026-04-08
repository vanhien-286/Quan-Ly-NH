const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");
const sql = require("mssql");

const SECRET_KEY = "SECRET_KEY";

// 1. Middleware bắt buộc (Strict)
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const user = await decodeAndGetUser(token);
    if (!user) return res.status(401).json({ message: "User not found" });
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token: " + err.message });
  }
};

// 2. Middleware không bắt buộc (Optional)
const optionalToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(); // Không có token thì cứ đi tiếp, req.user sẽ là undefined
  }

  try {
    console.log("Decoding token:", token);
    const user = await decodeAndGetUser(token);
    console.log("Decoded user:", user);
    if (user) req.user = user;
    next();
  } catch (err) {
    console.error("Optional token error:", err.message);
    next();
  }
};

// Helper function
async function decodeAndGetUser(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const result = await pool.request()
      .input("userId", sql.Int, decoded.id)
      .query("SELECT Id, FullName, Email, Role FROM Users WHERE Id = @userId");
    
    if (result.recordset.length === 0) return null;
    
    const user = result.recordset[0];
    return {
      id: user.Id,
      fullName: user.FullName,
      email: user.Email,
      role: user.Role || 'user'
    };
  } catch (err) {
    return null;
  }
}

module.exports = { verifyToken, optionalToken };