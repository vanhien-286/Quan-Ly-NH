const jwt = require("jsonwebtoken");

// Middleware kiểm tra token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token: " + err.message });
  }
};

module.exports = { verifyToken };