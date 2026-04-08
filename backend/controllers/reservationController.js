const reservationService = require("../services/reservationService");

// Lấy danh sách bàn có sẵn
exports.getAvailableTables = async (req, res) => {
    try {
        const { numberOfGuests, reservationDate, reservationTime } = req.query;
        const tables = await reservationService.getAvailableTables(numberOfGuests, reservationDate, reservationTime);
        res.json({ success: true, data: tables });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Tạo đặt bàn
exports.createReservation = async (req, res) => {
    try {
        console.log("Create Reservation Body:", req.body);
        console.log("Request User:", req.user);
        const { fullName, email, phone, reservationDate, reservationTime, numberOfGuests, specialRequests, tableId, orderItems } = req.body;
        const userId = req.user?.id || null; 
        console.log("Detected UserID:", userId);

        const result = await reservationService.createReservation({
            userId,
            fullName,
            email,
            phone,
            reservationDate,
            reservationTime,
            numberOfGuests,
            specialRequests,
            tableId,
            orderItems
        });

        res.json({ success: true, message: result.message, reservationId: result.reservationId });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Lấy danh sách đặt bàn của user
exports.getUserReservations = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Vui lòng đăng nhập!" });
        }

        const reservations = await reservationService.getUserReservations(userId);
        res.json({ success: true, data: reservations });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Hủy đặt bàn
exports.cancelReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const result = await reservationService.cancelReservation(reservationId);
        res.json({ success: true, message: result.message });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Admin: Lấy tất cả reservation
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.json({ success: true, data: reservations });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Admin: Cập nhật trạng thái reservation
exports.updateReservationStatus = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { status } = req.body;

        if (!['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
            return res.status(400).json({ success: false, message: "Trạng thái không hợp lệ!" });
        }

        const result = await reservationService.updateReservationStatus(reservationId, status);
        res.json({ success: true, message: result.message });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Cập nhật đặt bàn (User sửa)
exports.updateReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { fullName, email, phone, reservationDate, reservationTime, numberOfGuests, specialRequests, tableId, orderItems } = req.body;
        
        const result = await reservationService.updateReservation(reservationId, {
            fullName,
            email,
            phone,
            reservationDate,
            reservationTime,
            numberOfGuests,
            specialRequests,
            tableId,
            orderItems
        });

        res.json({ success: true, message: result.message });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

