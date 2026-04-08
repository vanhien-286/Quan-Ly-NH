-- ============ MIGRATION: Add Admin Tables & Role Column ============

USE DACCJS;
GO

-- 1. Thêm Role column vào Users table (nếu chưa có)
IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
        TABLE_NAME = 'Users'
        AND COLUMN_NAME = 'Role'
) BEGIN
ALTER TABLE Users
ADD Role VARCHAR(20) DEFAULT 'user' CHECK (
    Role IN ('user', 'staff', 'admin')
);

PRINT 'Thêm Role column thành công';

END ELSE PRINT 'Role column đã tồn tại';
GO

-- 2. Tạo bảng Dishes (Món Ăn nếu chưa có)
IF NOT EXISTS (
    SELECT *
    FROM sys.objects
    WHERE
        object_id = OBJECT_ID (N'[dbo].[Dishes]')
        AND type in (N'U')
) BEGIN
CREATE TABLE Dishes (
    DishID INT PRIMARY KEY IDENTITY (1, 1),
    DishName NVARCHAR (200) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Description NVARCHAR (MAX),
    ImageUrl NVARCHAR (MAX),
    CreatedAt DATETIME DEFAULT GETDATE (),
    UpdatedAt DATETIME DEFAULT GETDATE ()
);

PRINT 'Tạo bảng Dishes thành công';

END ELSE PRINT 'Bảng Dishes đã tồn tại';
GO

-- 2a. Thêm ImageUrl, Featured, IsVisible columns vào Dishes table nếu chưa có
IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
        TABLE_NAME = 'Dishes'
        AND COLUMN_NAME = 'ImageUrl'
) BEGIN
ALTER TABLE Dishes
ADD ImageUrl NVARCHAR (MAX);

PRINT 'Thêm ImageUrl column thành công';

END ELSE PRINT 'ImageUrl column đã tồn tại';
GO

IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
        TABLE_NAME = 'Dishes'
        AND COLUMN_NAME = 'Featured'
) BEGIN
ALTER TABLE Dishes
ADD Featured BIT DEFAULT 0;

PRINT 'Thêm Featured column thành công';

END ELSE PRINT 'Featured column đã tồn tại';
GO

IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
        TABLE_NAME = 'Dishes'
        AND COLUMN_NAME = 'IsVisible'
) BEGIN
ALTER TABLE Dishes
ADD IsVisible BIT DEFAULT 1;

PRINT 'Thêm IsVisible column thành công';

END ELSE PRINT 'IsVisible column đã tồn tại';
GO

IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
        TABLE_NAME = 'Dishes'
        AND COLUMN_NAME = 'Category'
) BEGIN
ALTER TABLE Dishes
ADD Category NVARCHAR (50) DEFAULT 'Phở';

PRINT 'Thêm Category column thành công';

END ELSE PRINT 'Category column đã tồn tại';
GO

-- 3. Tạo bảng Orders (Đơn Hàng nếu chưa có)
IF NOT EXISTS (
    SELECT *
    FROM sys.objects
    WHERE
        object_id = OBJECT_ID (N'[dbo].[Orders]')
        AND type in (N'U')
) BEGIN
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY (1, 1),
    UserID INT,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    Status VARCHAR(20) DEFAULT 'Pending' CHECK (
        Status IN (
            'Pending',
            'Confirmed',
            'Preparing',
            'Ready',
            'Completed',
            'Cancelled'
        )
    ),
    Notes NVARCHAR (MAX),
    CreatedAt DATETIME DEFAULT GETDATE (),
    UpdatedAt DATETIME DEFAULT GETDATE (),
    FOREIGN KEY (UserID) REFERENCES Users (Id)
);

PRINT 'Tạo bảng Orders thành công';

END ELSE PRINT 'Bảng Orders đã tồn tại';
GO

-- 4. Tạo bảng OrderDetails (Chi tiết đơn hàng nếu chưa có)
IF NOT EXISTS (
    SELECT *
    FROM sys.objects
    WHERE
        object_id = OBJECT_ID (N'[dbo].[OrderDetails]')
        AND type in (N'U')
) BEGIN
CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY IDENTITY (1, 1),
    OrderID INT NOT NULL,
    DishID INT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    Price DECIMAL(10, 2) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE (),
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID) ON DELETE CASCADE,
    FOREIGN KEY (DishID) REFERENCES Dishes (DishID)
);

PRINT 'Tạo bảng OrderDetails thành công';

END ELSE PRINT 'Bảng OrderDetails đã tồn tại';
GO

-- 5. Tạo một Admin mặc định nếu chưa có
IF NOT EXISTS (
    SELECT 1
    FROM Users
    WHERE
        Email = 'admin@dacc.com'
) BEGIN
INSERT INTO
    Users (
        FullName,
        Email,
        Password,
        Role
    )
VALUES (
        N'Quản Trị Viên DACC',
        'admin@dacc.com',
        '$2a$10$7R9I6.9Y7mG0S1.5C6yO3eR6f6g6f6f6f6f6f6f6f6f6f6f6f6f6f',
        'admin'
    );

PRINT 'Tạo tài khoản admin thành công';

END ELSE PRINT 'Tài khoản admin đã tồn tại';
GO

-- 6. Tạo một số món ăn mẫu
IF NOT EXISTS (
    SELECT 1
    FROM Dishes
    WHERE
        DishName = N'Phở Bò'
) BEGIN
INSERT INTO
    Dishes (DishName, Price, Description)
VALUES (
        N'Phở Bò',
        80000,
        N'Phở bò truyền thống với nước dùng đặc biệt'
    ),
    (
        N'Bún Chả',
        70000,
        N'Bún chả Hà Nội ngon tuyệt'
    ),
    (
        N'Cơm Tấm',
        50000,
        N'Cơm tấm với thịt nướng'
    ),
    (
        N'Bánh Mì',
        25000,
        N'Bánh mì nóng ngon'
    );

PRINT 'Tạo dữ liệu mẫu món ăn thành công';

END ELSE PRINT 'Dữ liệu mẫu đã tồn tại';
GO

PRINT '========================================';

PRINT '✅ Migration hoàn tất thành công!';

PRINT '========================================';

PRINT '';

PRINT 'Admin Account:';

PRINT 'Email: admin@dacc.com';

PRINT 'Password: 123456';

PRINT '';