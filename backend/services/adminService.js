const { pool } = require("../config/db");
const sql = require("mssql");

// ============ QUẢN LÝ MÓN ĂN ============
exports.getAllDishes = async () => {
  try {
    const result = await pool.request().query(`
      SELECT * FROM Dishes ORDER BY DishID DESC
    `);
    return { success: true, data: result.recordset };
  } catch (err) {
    throw new Error("Lỗi lấy danh sách món ăn: " + err.message);
  }
};

exports.createDish = async (data) => {
  try {
    const { dishName, price, description, imageUrl, featured, isVisible, category } = data;
    
    if (!dishName || !price) {
      throw new Error("Tên và giá món ăn không được để trống");
    }

    const result = await pool.request()
      .input("DishName", sql.NVarChar, dishName)
      .input("Price", sql.Decimal(10, 2), price)
      .input("Description", sql.NVarChar, description || null)
      .input("ImageUrl", sql.NVarChar, imageUrl || null)
      .input("Featured", sql.Bit, featured ? 1 : 0)
      .input("IsVisible", sql.Bit, isVisible !== undefined ? (isVisible ? 1 : 0) : 1)
      .input("Category", sql.NVarChar, category || "Phở")
      .query(`
        INSERT INTO Dishes (DishName, Price, Description, ImageUrl, Featured, IsVisible, Category, CreatedAt)
        VALUES (@DishName, @Price, @Description, @ImageUrl, @Featured, @IsVisible, @Category, GETDATE())
        SELECT SCOPE_IDENTITY() as DishID
      `);

    return {
      success: true,
      message: "Thêm món ăn thành công",
      dishId: result.recordset[0].DishID
    };
  } catch (err) {
    throw new Error("Lỗi thêm món ăn: " + err.message);
  }
};

exports.updateDish = async (dishId, data) => {
  try {
    let request = pool.request();
    request.input("DishID", sql.Int, dishId);
    
    // Build UPDATE statement dynamically based on provided fields
    let updateFields = ["UpdatedAt = GETDATE()"];
    
    if (data.dishName !== undefined) {
      request.input("DishName", sql.NVarChar, data.dishName);
      updateFields.push("DishName = @DishName");
    }
    
    if (data.price !== undefined) {
      request.input("Price", sql.Decimal(10, 2), data.price);
      updateFields.push("Price = @Price");
    }
    
    if (data.description !== undefined) {
      request.input("Description", sql.NVarChar, data.description || null);
      updateFields.push("Description = @Description");
    }
    
    if (data.imageUrl !== undefined) {
      request.input("ImageUrl", sql.NVarChar, data.imageUrl || null);
      updateFields.push("ImageUrl = @ImageUrl");
    }
    
    if (data.featured !== undefined) {
      request.input("Featured", sql.Bit, data.featured ? 1 : 0);
      updateFields.push("Featured = @Featured");
    }
    
    if (data.isVisible !== undefined) {
      request.input("IsVisible", sql.Bit, data.isVisible ? 1 : 0);
      updateFields.push("IsVisible = @IsVisible");
    }

    if (data.category !== undefined) {
      request.input("Category", sql.NVarChar, data.category || "Phở");
      updateFields.push("Category = @Category");
    }
    
    const query = `
      UPDATE Dishes 
      SET ${updateFields.join(", ")}
      WHERE DishID = @DishID
    `;
    
    await request.query(query);

    return { success: true, message: "Cập nhật món ăn thành công" };
  } catch (err) {
    throw new Error("Lỗi cập nhật món ăn: " + err.message);
  }
};

exports.deleteDish = async (dishId) => {
  try {
    await pool.request()
      .input("DishID", sql.Int, dishId)
      .query("DELETE FROM Dishes WHERE DishID = @DishID");

    return { success: true, message: "Xoá món ăn thành công" };
  } catch (err) {
    throw new Error("Lỗi xoá món ăn: " + err.message);
  }
};

// ============ QUẢN LÝ BÀN ============
exports.getAllTables = async () => {
  try {
    const result = await pool.request().query(`
      SELECT * FROM Tables ORDER BY TableNumber
    `);
    return { success: true, data: result.recordset };
  } catch (err) {
    throw new Error("Lỗi lấy danh sách bàn: " + err.message);
  }
};

exports.createTable = async (data) => {
  try {
    const { tableNumber, capacity } = data;

    if (!tableNumber || !capacity) {
      throw new Error("Số bàn và sức chứa không được để trống");
    }

    const parsedTableNumber = parseInt(tableNumber, 10);
    const parsedCapacity = parseInt(capacity, 10);

    if (isNaN(parsedTableNumber) || isNaN(parsedCapacity) || parsedTableNumber <= 0 || parsedCapacity <= 0) {
        throw new Error("Số bàn và sức chứa phải là số nguyên dương hợp lệ");
    }

    // Kiểm tra xem số bàn đã tồn tại chưa
    const checkExist = await pool.request()
        .input("TableNumber", sql.Int, parsedTableNumber)
        .query("SELECT TableID FROM Tables WHERE TableNumber = @TableNumber");
    
    if (checkExist.recordset.length > 0) {
        throw new Error("Số bàn này đã tồn tại trong hệ thống");
    }

    const result = await pool.request()
      .input("TableNumber", sql.Int, parsedTableNumber)
      .input("Capacity", sql.Int, parsedCapacity)
      .query(`
        INSERT INTO Tables (TableNumber, Capacity, Status, CreatedAt)
        VALUES (@TableNumber, @Capacity, 'Available', GETDATE())
        SELECT SCOPE_IDENTITY() as TableID
      `);

    return {
      success: true,
      message: "Thêm bàn thành công",
      tableId: result.recordset[0].TableID
    };
  } catch (err) {
    throw new Error("Lỗi thêm bàn: " + err.message);
  }
};

exports.updateTable = async (tableId, data) => {
  try {
    const { tableNumber, capacity } = data;

    const parsedTableNumber = parseInt(tableNumber, 10);
    const parsedCapacity = parseInt(capacity, 10);

    if (isNaN(parsedTableNumber) || isNaN(parsedCapacity) || parsedTableNumber <= 0 || parsedCapacity <= 0) {
        throw new Error("Số bàn và sức chứa phải là số nguyên dương hợp lệ");
    }

    // Kiểm tra trùng lặp số bàn (trừ bàn hiện tại)
    const checkExist = await pool.request()
        .input("TableNumber", sql.Int, parsedTableNumber)
        .input("TableID", sql.Int, tableId)
        .query("SELECT TableID FROM Tables WHERE TableNumber = @TableNumber AND TableID != @TableID");
    
    if (checkExist.recordset.length > 0) {
        throw new Error("Số bàn này đã tồn tại");
    }

    await pool.request()
      .input("TableID", sql.Int, tableId)
      .input("TableNumber", sql.Int, parsedTableNumber)
      .input("Capacity", sql.Int, parsedCapacity)
      .query(`
        UPDATE Tables 
        SET TableNumber = @TableNumber, Capacity = @Capacity
        WHERE TableID = @TableID
      `);

    return { success: true, message: "Cập nhật bàn thành công" };
  } catch (err) {
    throw new Error("Lỗi cập nhật bàn: " + err.message);
  }
};

exports.deleteTable = async (tableId) => {
  try {
    await pool.request()
      .input("TableID", sql.Int, tableId)
      .query("DELETE FROM Tables WHERE TableID = @TableID");

    return { success: true, message: "Xoá bàn thành công" };
  } catch (err) {
    throw new Error("Lỗi xoá bàn: " + err.message);
  }
};

exports.updateTableStatus = async (tableId, status) => {
  try {
    const validStatuses = ["Available", "Reserved", "Occupied"];

    if (!validStatuses.includes(status)) {
      throw new Error("Trạng thái bàn không hợp lệ");
    }

    await pool.request()
      .input("TableID", sql.Int, tableId)
      .input("Status", sql.VarChar, status)
      .query(`
        UPDATE Tables 
        SET Status = @Status
        WHERE TableID = @TableID
      `);

    return { success: true, message: "Cập nhật trạng thái bàn thành công" };
  } catch (err) {
    throw new Error("Lỗi cập nhật trạng thái bàn: " + err.message);
  }
};

// ============ QUẢN LÝ NGƯỜI DÙNG ============
exports.getAllUsers = async () => {
  try {
    const result = await pool.request().query(`
      SELECT Id, FullName, Email, Role, CreatedAt
      FROM Users 
      ORDER BY CreatedAt DESC
    `);
    return { success: true, data: result.recordset };
  } catch (err) {
    throw new Error("Lỗi lấy danh sách người dùng: " + err.message);
  }
};

exports.updateUserRole = async (userId, role) => {
  try {
    const validRoles = ["user", "staff", "admin"];

    if (!validRoles.includes(role)) {
      throw new Error("Vai trò không hợp lệ");
    }

    await pool.request()
      .input("UserId", sql.Int, userId)
      .input("Role", sql.VarChar, role)
      .query(`
        UPDATE Users 
        SET Role = @Role
        WHERE Id = @UserId
      `);

    return { success: true, message: "Cập nhật vai trò thành công" };
  } catch (err) {
    throw new Error("Lỗi cập nhật vai trò: " + err.message);
  }
};

exports.deleteUser = async (userId) => {
  try {
    await pool.request()
      .input("UserId", sql.Int, userId)
      .query("DELETE FROM Users WHERE Id = @UserId");

    return { success: true, message: "Xoá người dùng thành công" };
  } catch (err) {
    throw new Error("Lỗi xoá người dùng: " + err.message);
  }
};

// ============ THỐNG KÊ DOANH THU ============
exports.getRevenueOverview = async () => {
  try {
    const result = await pool.request().query(`
      SELECT 
        COUNT(DISTINCT o.OrderID) as TotalOrders,
        COUNT(DISTINCT o.UserID) as TotalCustomers,
        ISNULL(SUM(o.TotalAmount), 0) as TotalRevenue,
        ISNULL(SUM(CASE WHEN DATEDIFF(day, o.CreatedAt, GETDATE()) = 0 THEN o.TotalAmount ELSE 0 END), 0) as TodayRevenue,
        ISNULL(SUM(CASE WHEN DATEDIFF(month, o.CreatedAt, GETDATE()) = 0 AND DATEDIFF(year, o.CreatedAt, GETDATE()) = 0 THEN o.TotalAmount ELSE 0 END), 0) as MonthRevenue
      FROM Orders o
      WHERE o.Status = 'Completed'
    `);

    return { success: true, data: result.recordset[0] };
  } catch (err) {
    throw new Error("Lỗi lấy overview doanh thu: " + err.message);
  }
};

exports.getRevenueByDate = async (startDate, endDate) => {
  try {
    const result = await pool.request()
      .input("StartDate", sql.DateTime, startDate)
      .input("EndDate", sql.DateTime, endDate)
      .query(`
        SELECT 
          CAST(CreatedAt AS DATE) as OrderDate,
          COUNT(OrderID) as OrderCount,
          ISNULL(SUM(TotalAmount), 0) as DailyRevenue
        FROM Orders
        WHERE Status = 'Completed' 
          AND CreatedAt BETWEEN @StartDate AND @EndDate
        GROUP BY CAST(CreatedAt AS DATE)
        ORDER BY OrderDate DESC
      `);

    return { success: true, data: result.recordset };
  } catch (err) {
    throw new Error("Lỗi lấy doanh thu theo ngày: " + err.message);
  }
};

exports.getRevenueByProduct = async () => {
  try {
    const result = await pool.request().query(`
      SELECT 
        d.DishID,
        d.DishName,
        COUNT(od.OrderDetailID) as Quantity,
        ISNULL(SUM(od.Quantity * od.Price), 0) as Revenue
      FROM OrderDetails od
      JOIN Dishes d ON od.DishID = d.DishID
      JOIN Orders o ON od.OrderID = o.OrderID
      WHERE o.Status = 'Completed'
      GROUP BY d.DishID, d.DishName
      ORDER BY Revenue DESC
    `);

    return { success: true, data: result.recordset };
  } catch (err) {
    throw new Error("Lỗi lấy doanh thu theo sản phẩm: " + err.message);
  }
};

exports.getMonthlyRevenue = async () => {
  try {
    const result = await pool.request().query(`
      SELECT 
        YEAR(CreatedAt) as Year,
        MONTH(CreatedAt) as Month,
        ISNULL(SUM(TotalAmount), 0) as Revenue,
        COUNT(OrderID) as OrderCount
      FROM Orders
      WHERE Status = 'Completed'
      GROUP BY YEAR(CreatedAt), MONTH(CreatedAt)
      ORDER BY Year DESC, Month DESC
    `);

    return { success: true, data: result.recordset };
  } catch (err) {
    throw new Error("Lỗi lấy doanh thu theo tháng: " + err.message);
  }
};
exports.initializeDatabase = async () => {
  try {
    // 1. Tạo bảng Categories
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categories')
      BEGIN
        CREATE TABLE Categories (
          CategoryID INT IDENTITY(1,1) PRIMARY KEY,
          CategoryName NVARCHAR(100) NOT NULL,
          Description NVARCHAR(255)
        );
        INSERT INTO Categories (CategoryName) VALUES (N'Phở'), (N'Sides'), (N'Bestseller');
      END
    `);

    // 2. Thêm cột CategoryID vào bảng Dishes nếu chưa có
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Dishes') AND name = 'CategoryID')
      BEGIN
        ALTER TABLE Dishes ADD CategoryID INT FOREIGN KEY REFERENCES Categories(CategoryID);
      END
    `);
    console.log("Database Migration hoàn tất!");
  } catch (err) {
    console.error("Lỗi Migration:", err.message);
  }
};


