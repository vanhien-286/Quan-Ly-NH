const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes
router.get("/available-tables", reservationController.getAvailableTables);
router.post("/create", reservationController.createReservation);

// Protected routes (cần đăng nhập)
router.get("/my-reservations", authMiddleware.verifyToken, reservationController.getUserReservations);
router.delete("/cancel/:reservationId", authMiddleware.verifyToken, reservationController.cancelReservation);

// Admin routes
router.get("/all", authMiddleware.verifyToken, reservationController.getAllReservations);
router.put("/update-status/:reservationId", authMiddleware.verifyToken, reservationController.updateReservationStatus);

module.exports = router;
