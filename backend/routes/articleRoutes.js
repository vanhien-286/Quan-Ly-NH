const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authMiddleware = require("../middlewares/authMiddleware");

// Middleware kiểm tra Admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Chỉ admin mới có quyền truy cập" });
  }
};

// ============ ROUTE PUBLIC (KHÔNG CẦN AUTH) ============
router.get("/public", articleController.getAllArticles);
router.get("/public/:id", articleController.getArticleById);

// ============ QUẢN LÝ BÀI VIẾT (ADMIN ONLY) ============
router.get("/", authMiddleware, adminOnly, articleController.getAllArticles);
router.post("/", authMiddleware, adminOnly, articleController.createArticle);
router.put("/:id", authMiddleware, adminOnly, articleController.updateArticle);
router.delete("/:id", authMiddleware, adminOnly, articleController.deleteArticle);

module.exports = router;
