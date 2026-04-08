const { pool } = require("../config/db");
const sql = require("mssql");
const orderService = require("./orderService");

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
    tableId,
    orderItems
}) => {
    const transaction = new sql.Transaction(pool);
    try {
        const availableTables = await this.getAvailableTables(numberOfGuests, reservationDate, reservationTime);
        if (availableTables.length === 0) {
            throw new Error("Không có bàn trống phù hợp cho thời gian này!");
        }

        const selectedTableId = tableId || availableTables[0].TableID;

        await transaction.begin();

        const result = await transaction.request()
            .input("userId", sql.Int, userId)
            .input("fullName", sql.NVarChar, fullName)
            .input("email", sql.VarChar, email)
            .input("phone", sql.VarChar, phone)
            .input("reservationDate", sql.Date, new Date(reservationDate))
            .input("reservationTime", sql.VarChar, reservationTime)
            .input("numberOfGuests", sql.Int, numberOfGuests)
            .input("specialRequests", sql.NVarChar, specialRequests || null)
            .input("tableId", sql.Int, selectedTableId)
            .query(`
                INSERT INTO Reservations (UserID, FullName, Email, Phone, ReservationDate, ReservationTime, NumberOfGuests, SpecialRequests, TableID, Status)
                VALUES (@userId, @fullName, @email, @phone, @reservationDate, @reservationTime, @numberOfGuests, @specialRequests, @tableId, 'Pending')
                SELECT SCOPE_IDENTITY() AS ReservationID
            `);

        const reservationId = result.recordset[0].ReservationID;

        if (orderItems && orderItems.length > 0) {
            const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            await orderService.createOrderForReservation(transaction, {
                userId,
                reservationId,
                totalAmount,
                notes: specialRequests,
                items: orderItems
            });
        }

        await transaction.request()
            .input("tableId", sql.Int, selectedTableId)
            .query(`UPDATE Tables SET Status = 'Reserved' WHERE TableID = @tableId`);

        await transaction.commit();

        return {
            message: "Đặt bàn thành công! Vui lòng chờ xác nhận.",
            reservationId: reservationId
        };
    } catch (err) {
        if (transaction._started) await transaction.rollback();
        throw new Error("Lỗi khi tạo đặt bàn: " + err.message);
    }
};

// Cập nhật đặt bàn (User sửa)
exports.updateReservation = async (reservationId, {
    fullName,
    email,
    phone,
    reservationDate,
    reservationTime,
    numberOfGuests,
    specialRequests,
    tableId,
    orderItems
}) => {
    const transaction = new sql.Transaction(pool);
    try {
        // Kiểm tra trạng thái hiện tại
        const currentRes = await pool.request()
            .input("id", sql.Int, reservationId)
            .query("SELECT Status, TableID FROM Reservations WHERE ReservationID = @id");
        
        if (currentRes.recordset.length === 0) throw new Error("Không tìm thấy đặt bàn!");
        if (currentRes.recordset[0].Status !== 'Pending') throw new Error("Chỉ có thể sửa khi đơn đang ở trạng thái 'Chờ xác nhận'!");

        await transaction.begin();

        // 1. Cập nhật reservation
        await transaction.request()
            .input("id", sql.Int, reservationId)
            .input("fullName", sql.NVarChar, fullName)
            .input("email", sql.VarChar, email)
            .input("phone", sql.VarChar, phone)
            .input("reservationDate", sql.Date, new Date(reservationDate))
            .input("reservationTime", sql.VarChar, reservationTime)
            .input("numberOfGuests", sql.Int, numberOfGuests)
            .input("specialRequests", sql.NVarChar, specialRequests || null)
            .input("tableId", sql.Int, tableId)
            .query(`
                UPDATE Reservations SET 
                    FullName = @fullName, Email = @email, Phone = @phone,
                    ReservationDate = @reservationDate, ReservationTime = @reservationTime,
                    NumberOfGuests = @numberOfGuests, SpecialRequests = @specialRequests,
                    TableID = @tableId, UpdatedAt = GETDATE()
                WHERE ReservationID = @id
            `);

        // 2. Cửa sổ sửa đơn hàng (Nếu có orderItems)
        // Xóa order cũ và details cũ để tạo mới (đơn giản nhất cho trạng thái Pending)
        const orderRes = await transaction.request()
            .input("id", sql.Int, reservationId)
            .query("SELECT OrderID FROM Orders WHERE ReservationID = @id");
        
        if (orderRes.recordset.length > 0) {
            const orderId = orderRes.recordset[0].OrderID;
            await transaction.request().input("oid", sql.Int, orderId).query("DELETE FROM OrderDetails WHERE OrderID = @oid");
            await transaction.request().input("rid", sql.Int, reservationId).query("DELETE FROM Orders WHERE ReservationID = @rid");
        }

        if (orderItems && orderItems.length > 0) {
            const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
             // Tìm UserID
            const userRes = await transaction.request()
                .input("id", sql.Int, reservationId)
                .query("SELECT UserID FROM Reservations WHERE ReservationID = @id");
            const userId = userRes.recordset[0].UserID;

            await orderService.createOrderForReservation(transaction, {
                userId,
                reservationId,
                totalAmount,
                notes: specialRequests,
                items: orderItems
            });
        }

        await transaction.commit();
        return { message: "Cập nhật thành công!" };
    } catch (err) {
        if (transaction._started) await transaction.rollback();
        throw new Error("Lỗi khi cập nhật đặt bàn: " + err.message);
    }
};

// Lấy danh sách đặt bàn của user
exports.getUserReservations = async (userId) => {
    try {
        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .query(`
                SELECT 
                    r.*, 
                    t.TableNumber, 
                    t.Capacity,
                    o.OrderID,
                    o.TotalAmount,
                    (
                        SELECT od.Quantity, od.Price, d.DishName, d.Category, d.DishID
                        FROM OrderDetails od
                        JOIN Dishes d ON od.DishID = d.DishID
                        WHERE od.OrderID = o.OrderID
                        FOR JSON PATH
                    ) as OrderDetailsJSON
                FROM Reservations r
                LEFT JOIN Tables t ON r.TableID = t.TableID
                LEFT JOIN Orders o ON r.ReservationID = o.ReservationID
                WHERE r.UserID = @userId
                ORDER BY r.ReservationID DESC
            `);
        
        return result.recordset.map(row => ({
            ...row,
            OrderDetails: row.OrderDetailsJSON ? JSON.parse(row.OrderDetailsJSON) : []
        }));
    } catch (err) {
        throw new Error("Lỗi khi lấy danh sách đặt bàn: " + err.message);
    }
};

// Hủy đặt bàn
exports.cancelReservation = async (reservationId) => {
    try {
        const res = await pool.request()
            .input("reservationId", sql.Int, reservationId)
            .query(`SELECT TableID FROM Reservations WHERE ReservationID = @reservationId`);

        if (res.recordset.length === 0) throw new Error("Không tìm thấy đặt bàn!");
        const tableId = res.recordset[0].TableID;

        await pool.request()
            .input("reservationId", sql.Int, reservationId)
            .query(`UPDATE Reservations SET Status = 'Cancelled', UpdatedAt = GETDATE() WHERE ReservationID = @reservationId`);

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
                SELECT 
                    r.*, t.TableNumber, t.Capacity, u.FullName as UserName,
                    o.OrderID, o.TotalAmount,
                    (
                        SELECT od.Quantity, od.Price, d.DishName, d.Category, d.DishID
                        FROM OrderDetails od
                        JOIN Dishes d ON od.DishID = d.DishID
                        WHERE od.OrderID = o.OrderID
                        FOR JSON PATH
                    ) as OrderDetailsJSON
                FROM Reservations r
                LEFT JOIN Tables t ON r.TableID = t.TableID
                LEFT JOIN Users u ON r.UserID = u.Id
                LEFT JOIN Orders o ON r.ReservationID = o.ReservationID
                ORDER BY r.ReservationID DESC
            `);
        return result.recordset.map(row => ({
            ...row,
            OrderDetails: row.OrderDetailsJSON ? JSON.parse(row.OrderDetailsJSON) : []
        }));
    } catch (err) {
        throw new Error("Lỗi khi lấy danh sách đặt bàn: " + err.message);
    }
};

// Admin: Cập nhật trạng thái reservation (Xác nhận, Huỷ, Hoàn tất)
exports.updateReservationStatus = async (reservationId, status) => {
    const transaction = new sql.Transaction(pool);
    try {
        await transaction.begin();

        // 1. Lấy tableId trước
        const res = await transaction.request()
            .input("id", sql.Int, reservationId)
            .query(`SELECT TableID FROM Reservations WHERE ReservationID = @id`);
        
        if (res.recordset.length === 0) throw new Error("Không tìm thấy đặt bàn!");
        const tableId = res.recordset[0].TableID;

        // 2. Cập nhật Reservation Status
        await transaction.request()
            .input("reservationId", sql.Int, reservationId)
            .input("status", sql.VarChar, status)
            .query(`UPDATE Reservations SET Status = @status, UpdatedAt = GETDATE() WHERE ReservationID = @reservationId`);

        // 3. Cập nhật Order Status (quan trọng để tính doanh thu)
        await transaction.request()
            .input("rid", sql.Int, reservationId)
            .input("status", sql.VarChar, status)
            .query(`UPDATE Orders SET Status = @status, UpdatedAt = GETDATE() WHERE ReservationID = @rid`);

        // 4. Nếu là 'Cancelled' hoặc 'Completed' -> Giải phóng bàn
        if (status === 'Cancelled' || status === 'Completed') {
            await transaction.request()
                .input("tableId", sql.Int, tableId)
                .query(`UPDATE Tables SET Status = 'Available' WHERE TableID = @tableId`);
        }

        await transaction.commit();
        return { message: `Cập nhật trạng thái thành '${status}' thành công!` };
    } catch (err) {
        if (transaction._started) await transaction.rollback();
        throw new Error("Lỗi khi cập nhật trạng thái: " + err.message);
    }
};
