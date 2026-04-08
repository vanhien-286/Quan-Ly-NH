-- =======================================================
-- INIT DATABASE SCRIPT: DACCJS (Hệ Thống Quản Lý Nhà Hàng)
-- =======================================================

-- 1. Tạo Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DACCJS')
BEGIN
    CREATE DATABASE DACCJS;
END
GO

USE DACCJS;
GO

-- 2. Bảng Users (Người dùng & Phân quyền)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
    CREATE TABLE Users (
        Id INT PRIMARY KEY IDENTITY(1, 1),
        FullName NVARCHAR(100) NOT NULL,
        Email VARCHAR(100) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL,
        Role VARCHAR(20) DEFAULT 'user' CHECK (Role IN ('user', 'staff', 'admin')),
        CreatedAt DATETIME DEFAULT GETDATE()
    );
END
GO

-- 3. Bảng Tables (Bàn ăn)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Tables]') AND type in (N'U'))
BEGIN
    CREATE TABLE Tables (
        TableID INT PRIMARY KEY IDENTITY(1, 1),
        TableNumber INT NOT NULL UNIQUE,
        Capacity INT NOT NULL CHECK (Capacity > 0),
        Status VARCHAR(20) DEFAULT 'Available' CHECK (Status IN ('Available', 'Reserved', 'Occupied')),
        CreatedAt DATETIME DEFAULT GETDATE()
    );
END
GO

-- 4. Bảng Dishes (Món ăn & Nước uống)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Dishes]') AND type in (N'U'))
BEGIN
    CREATE TABLE Dishes (
        DishID INT PRIMARY KEY IDENTITY(1, 1),
        DishName NVARCHAR(200) NOT NULL,
        Price DECIMAL(10, 2) NOT NULL,
        Category NVARCHAR(50) DEFAULT N'Phở',
        ImageUrl NVARCHAR(MAX),
        Description NVARCHAR(MAX),
        Featured BIT DEFAULT 0,
        IsVisible BIT DEFAULT 1,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
    );
END
GO

-- 5. Bảng Articles (Bài viết / Tin tức)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Articles]') AND type in (N'U'))
BEGIN
    CREATE TABLE Articles (
        ArticleID INT PRIMARY KEY IDENTITY(1, 1),
        Title NVARCHAR(200) NOT NULL,
        Summary NVARCHAR(500),
        Content NVARCHAR(MAX),
        ImageUrl NVARCHAR(MAX),
        IsVisible BIT DEFAULT 1,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
    );
END
GO

-- 6. Bảng Reservations (Đặt bàn)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Reservations]') AND type in (N'U'))
BEGIN
    CREATE TABLE Reservations (
        ReservationID INT PRIMARY KEY IDENTITY(1, 1),
        UserID INT NULL,
        FullName NVARCHAR(100) NOT NULL,
        Email VARCHAR(100) NOT NULL,
        Phone VARCHAR(20) NOT NULL,
        ReservationDate DATE NOT NULL,
        ReservationTime VARCHAR(10) NOT NULL,
        NumberOfGuests INT NOT NULL CHECK (NumberOfGuests > 0),
        TableID INT NULL,
        SpecialRequests NVARCHAR(MAX),
        Status VARCHAR(20) DEFAULT 'Pending' CHECK (Status IN ('Pending', 'Confirmed', 'Cancelled', 'Completed')),
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (UserID) REFERENCES Users(Id) ON DELETE SET NULL,
        FOREIGN KEY (TableID) REFERENCES Tables(TableID) ON DELETE SET NULL
    );
END
GO

-- 7. Bảng Orders (Đơn hàng - Tùy chọn)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND type in (N'U'))
BEGIN
    CREATE TABLE Orders (
        OrderID INT PRIMARY KEY IDENTITY(1, 1),
        UserID INT NULL,
        TotalAmount DECIMAL(10, 2) NOT NULL,
        Status VARCHAR(20) DEFAULT 'Pending' CHECK (Status IN ('Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled')),
        Notes NVARCHAR(MAX),
        ReservationID INT NULL,  -- Thêm cột này để liên kết với đặt bàn
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (UserID) REFERENCES Users(Id) ON DELETE SET NULL,
        FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID) ON DELETE CASCADE
    );
END
GO

-- 8. Bảng OrderDetails (Chi tiết đơn hàng)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[OrderDetails]') AND type in (N'U'))
BEGIN
    CREATE TABLE OrderDetails (
        OrderDetailID INT PRIMARY KEY IDENTITY(1, 1),
        OrderID INT NOT NULL,
        DishID INT NOT NULL,
        Quantity INT NOT NULL CHECK (Quantity > 0),
        Price DECIMAL(10, 2) NOT NULL, -- Giá tại thời điểm mua
        CreatedAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
        FOREIGN KEY (DishID) REFERENCES Dishes(DishID)
    );
END
GO

PRINT '✅ Initialized database schema successfully.';
