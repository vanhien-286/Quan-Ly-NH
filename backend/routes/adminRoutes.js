const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
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
// Lấy danh sách tất cả dishes - dùng cho menu hiển thị công khai
router.get("/dishes/public", adminController.getDishes);

// ============ QUẢN LÝ MÓN ĂN ============
router.get("/dishes", authMiddleware, adminOnly, adminController.getDishes);
router.post("/dishes", authMiddleware, adminOnly, adminController.createDish);
router.put("/dishes/:dishId", authMiddleware, adminOnly, adminController.updateDish);
router.delete("/dishes/:dishId", authMiddleware, adminOnly, adminController.deleteDish);

// ============ QUẢN LÝ ĐƠN HÀNG ============
router.get("/orders", authMiddleware, adminOnly, adminController.getOrders);
router.get("/orders/:orderId", authMiddleware, adminOnly, adminController.getOrderDetail);
router.put("/orders/:orderId/status", authMiddleware, adminOnly, adminController.updateOrderStatus);
router.delete("/orders/:orderId", authMiddleware, adminOnly, adminController.deleteOrder);

// ============ QUẢN LÝ BÀN ============
router.get("/tables", authMiddleware, adminOnly, adminController.getTables);
router.post("/tables", authMiddleware, adminOnly, adminController.createTable);
router.put("/tables/:tableId", authMiddleware, adminOnly, adminController.updateTable);
router.delete("/tables/:tableId", authMiddleware, adminOnly, adminController.deleteTable);
router.put("/tables/:tableId/status", authMiddleware, adminOnly, adminController.updateTableStatus);

// ============ QUẢN LÝ NGƯỜI DÙNG ============
router.get("/users", authMiddleware, adminOnly, adminController.getUsers);
router.put("/users/:userId/role", authMiddleware, adminOnly, adminController.updateUserRole);
router.delete("/users/:userId", authMiddleware, adminOnly, adminController.deleteUser);

// ============ THỐNG KÊ DOANH THU ============
router.get("/revenue/overview", authMiddleware, adminOnly, adminController.getRevenueOverview);
router.get("/revenue/by-date", authMiddleware, adminOnly, adminController.getRevenueByDate);
router.get("/revenue/by-product", authMiddleware, adminOnly, adminController.getRevenueByProduct);
router.get("/revenue/monthly", authMiddleware, adminOnly, adminController.getMonthlyRevenue);

module.exports = router;
