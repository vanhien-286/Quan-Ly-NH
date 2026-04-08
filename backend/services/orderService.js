const { pool } = require("../config/db");
const sql = require("mssql");

exports.createOrderForReservation = async (transaction, { userId, reservationId, totalAmount, notes, items }) => {
    try {
        // 1. Tạo Order
        const orderResult = await transaction.request()
            .input("userId", sql.Int, userId)
            .input("reservationId", sql.Int, reservationId)
            .input("totalAmount", sql.Decimal(10, 2), totalAmount)
            .input("status", sql.VarChar, 'Pending')
            .input("notes", sql.NVarChar, notes || null)
            .query(`
                INSERT INTO Orders (UserID, ReservationID, TotalAmount, Status, Notes, CreatedAt, UpdatedAt)
                VALUES (@userId, @reservationId, @totalAmount, @status, @notes, GETDATE(), GETDATE())
                SELECT SCOPE_IDENTITY() AS OrderID
            `);

        const orderId = orderResult.recordset[0].OrderID;

        // 2. Tạo OrderDetails cho từng món
        for (const item of items) {
            await transaction.request()
                .input("orderId", sql.Int, orderId)
                .input("dishId", sql.Int, item.dishId)
                .input("quantity", sql.Int, item.quantity)
                .input("price", sql.Decimal(10, 2), item.price)
                .query(`
                    INSERT INTO OrderDetails (OrderID, DishID, Quantity, Price, CreatedAt)
                    VALUES (@orderId, @dishId, @quantity, @price, GETDATE())
                `);
        }

        return orderId;
    } catch (err) {
        console.error("Error creating order:", err.message);
        throw err;
    }
};
