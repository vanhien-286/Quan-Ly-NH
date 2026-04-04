const { pool } = require("../config/db");
const sql = require("mssql");

// Lấy danh sách bàn có sẵn
exports.getAvailableTables = async (numberOfGuests, reservationDate, reservationTime) => {
    try {
        const result = await pool.request()
            .input("numberOfGuests", sql.Int, numberOfGuests)
            .query(`
                SELECT * FROM Tables 
                WHERE Capacity >= @numberOfGuests 
                AND Status = 'Available'
            `);
        return result.recordset;
    } catch (err) {
        console.error("DB Error:", err.message);
        throw new Error("Lỗi khi lấy danh sách bàn: " + err.message);
    }
};

// Tạo đặt bàn mới
exports.createReservation = async ({
    userId,
    fullName,
    email,
    phone,
    reservationDate,
    reservationTime,
    numberOfGuests,
    specialRequests,
    tableId
}) => {
    try {
        const availableTables = await this.getAvailableTables(numberOfGuests, reservationDate, reservationTime);
        
        if (availableTables.length === 0) {
            throw new Error("Không có bàn trống phù hợp cho thời gian này!");
        }

        // Nếu không chọn bàn, tự động chọn bàn phù hợp
        const selectedTableId = tableId || availableTables[0].TableID;

        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .input("fullName", sql.NVarChar, fullName)
            .input("email", sql.VarChar, email)
            .input("phone", sql.VarChar, phone)
            .input("reservationDate", sql.Date, new Date(reservationDate))
            .input("reservationTime", sql.VarChar, reservationTime) // Thay sql.Time thành sql.VarChar
            .input("numberOfGuests", sql.Int, numberOfGuests)
            .input("specialRequests", sql.NVarChar, specialRequests || null)
            .input("tableId", sql.Int, selectedTableId)
            .query(`
                INSERT INTO Reservations (UserID, FullName, Email, Phone, ReservationDate, ReservationTime, NumberOfGuests, SpecialRequests, TableID, Status)
                VALUES (@userId, @fullName, @email, @phone, @reservationDate, @reservationTime, @numberOfGuests, @specialRequests, @tableId, 'Pending')
                SELECT SCOPE_IDENTITY() AS ReservationID
            `);

        // Cập nhật trạng thái bàn
        await pool.request()
            .input("tableId", sql.Int, selectedTableId)
            .query(`UPDATE Tables SET Status = 'Reserved' WHERE TableID = @tableId`);

        return {
            message: "Đặt bàn thành công! Vui lòng chờ xác nhận.",
            reservationId: result.recordset[0].ReservationID
        };
    } catch (err) {
        throw new Error("Lỗi khi tạo đặt bàn: " + err.message);
    }
};

// Lấy danh sách đặt bàn của user
exports.getUserReservations = async (userId) => {
    try {
        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .query(`
                SELECT r.*, t.TableNumber, t.Capacity FROM Reservations r
                LEFT JOIN Tables t ON r.TableID = t.TableID
                WHERE r.UserID = @userId
                ORDER BY r.ReservationDate DESC, r.ReservationTime DESC
            `);
        return result.recordset;
    } catch (err) {
        throw new Error("Lỗi khi lấy danh sách đặt bàn: " + err.message);
    }
};

// Hủy đặt bàn
exports.cancelReservation = async (reservationId) => {
    try {
        // Lấy thông tin reservation để update trạng thái bàn
        const res = await pool.request()
            .input("reservationId", sql.Int, reservationId)
            .query(`SELECT TableID FROM Reservations WHERE ReservationID = @reservationId`);

        if (res.recordset.length === 0) {
            throw new Error("Không tìm thấy đặt bàn!");
        }

        const tableId = res.recordset[0].TableID;

        // Update trạng thái đặt bàn
        await pool.request()
            .input("reservationId", sql.Int, reservationId)
            .query(`UPDATE Reservations SET Status = 'Cancelled', UpdatedAt = GETDATE() WHERE ReservationID = @reservationId`);

        // Update trạng thái bàn
        await pool.request()
            .input("tableId", sql.Int, tableId)
            .query(`UPDATE Tables SET Status = 'Available' WHERE TableID = @tableId`);

        return { message: "Hủy đặt bàn thành công!" };
    } catch (err) {
        throw new Error("Lỗi khi hủy đặt bàn: " + err.message);
    }
};

// Admin: Lấy tất cả reservation
exports.getAllReservations = async () => {
    try {
        const result = await pool.request()
            .query(`
                SELECT r.*, t.TableNumber, t.Capacity, u.FullName as UserName FROM Reservations r
                LEFT JOIN Tables t ON r.TableID = t.TableID
                LEFT JOIN Users u ON r.UserID = u.Id
                ORDER BY r.ReservationDate DESC, r.ReservationTime DESC
            `);
        return result.recordset;
    } catch (err) {
        throw new Error("Lỗi khi lấy danh sách đặt bàn: " + err.message);
    }
};

// Admin: Cập nhật trạng thái reservation
exports.updateReservationStatus = async (reservationId, status) => {
    try {
        await pool.request()
            .input("reservationId", sql.Int, reservationId)
            .input("status", sql.VarChar, status)
            .query(`UPDATE Reservations SET Status = @status, UpdatedAt = GETDATE() WHERE ReservationID = @reservationId`);

        return { message: "Cập nhật trạng thái thành công!" };
    } catch (err) {
        throw new Error("Lỗi khi cập nhật trạng thái: " + err.message);
    }
};
