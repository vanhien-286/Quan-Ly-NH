const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { verifyToken: authMiddleware, optionalToken } = require("../middlewares/authMiddleware");

// Public routes
router.get("/available-tables", reservationController.getAvailableTables);
// Sử dụng optionalToken để ghi nhận UserID nếu khách đã đăng nhập
router.post("/create", optionalToken, reservationController.createReservation);

// Protected routes (cần đăng nhập)
router.get("/my-reservations", authMiddleware, reservationController.getUserReservations);
router.put("/update/:reservationId", authMiddleware, reservationController.updateReservation);
router.delete("/cancel/:reservationId", authMiddleware, reservationController.cancelReservation);

// Admin routes
router.get("/all", authMiddleware, reservationController.getAllReservations);
router.put("/update-status/:reservationId", authMiddleware, reservationController.updateReservationStatus);

module.exports = router;
