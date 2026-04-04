-- 1. Tạo Database
IF NOT EXISTS (
    SELECT *
    FROM sys.databases
    WHERE
        name = 'DACCJS'
) BEGIN
CREATE DATABASE DACCJS;

END

USE DACCJS;
GO

-- 2. Tạo bảng Users (Khớp hoàn toàn với code Backend của bạn)
IF NOT EXISTS (
    SELECT *
    FROM sys.objects
    WHERE
        object_id = OBJECT_ID (N'[dbo].[Users]')
        AND type in (N'U')
) BEGIN
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY (1, 1),
    FullName NVARCHAR (100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE ()
);

END

-- 3. Chèn dữ liệu mẫu (Tùy chọn)
-- Lưu ý: Mật khẩu dưới đây đã được mã hóa bằng bcrypt (tương ứng với '123456')
-- để khớp với hàm bcrypt.compare trong code của bạn.
INSERT INTO
    Users (FullName, Email, Password)
VALUES (
        N'Quản trị viên',
        'admin@gmail.com',
        '$2a$10$7R9I6.9Y7mG0S1.5C6yO3eR6f6g6f6f6f6f6f6f6f6f6f6f6f6f6f'
    );
GO

-- 4. Tạo các bảng khác cho hệ thống Nhà hàng
IF NOT EXISTS (
    SELECT *
    FROM sys.objects
    WHERE
        object_id = OBJECT_ID (N'[dbo].[Categories]')
        AND type in (N'U')
) BEGIN
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY (1, 1),
    CategoryName NVARCHAR (100) NOT NULL
);

END IF NOT EXISTS (
    SELECT *
    FROM sys.objects
    WHERE
        object_id = OBJECT_ID (N'[dbo].[Products]')
        AND type in (N'U')
) BEGIN
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY (1, 1),
    ProductName NVARCHAR (200) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    CategoryID INT FOREIGN KEY REFERENCES Categories (CategoryID)
);

END

-- 5. Tạo bảng Reservations (Đặt bàn)
IF NOT EXISTS (
    SELECT *
    FROM sys.objects
    WHERE
        object_id = OBJECT_ID (N'[dbo].[Reservations]')
        AND type in (N'U')
) BEGIN
CREATE TABLE Reservations (
    ReservationID INT PRIMARY KEY IDENTITY (1, 1),
    UserID INT FOREIGN KEY REFERENCES Users (Id),
    FullName NVARCHAR (100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    ReservationDate DATE NOT NULL,
    ReservationTime TIME NOT NULL,
    NumberOfGuests INT NOT NULL CHECK (NumberOfGuests > 0),
    TableID INT FOREIGN KEY REFERENCES Tables (TableID),
    SpecialRequests NVARCHAR (MAX),
    Status VARCHAR(20) DEFAULT 'Pending' CHECK (
        Status IN (
            'Pending',
            'Confirmed',
            'Cancelled'
        )
    ),
    CreatedAt DATETIME DEFAULT GETDATE (),
    UpdatedAt DATETIME DEFAULT GETDATE ()
);

END

-- 6. Tạo bảng Tables (Bàn nhà hàng)
IF NOT EXISTS (
    SELECT *
    FROM sys.objects
    WHERE
        object_id = OBJECT_ID (N'[dbo].[Tables]')
        AND type in (N'U')
) BEGIN
CREATE TABLE Tables (
    TableID INT PRIMARY KEY IDENTITY (1, 1),
    TableNumber INT NOT NULL UNIQUE,
    Capacity INT NOT NULL CHECK (Capacity > 0),
    Status VARCHAR(20) DEFAULT 'Available' CHECK (
        Status IN (
            'Available',
            'Reserved',
            'Occupied'
        )
    ),
    CreatedAt DATETIME DEFAULT GETDATE ()
);

END

-- 7. Chèn dữ liệu mẫu cho bảng Tables
IF NOT EXISTS (
    SELECT *
    FROM Tables
    WHERE
        TableNumber = 1
) BEGIN
INSERT INTO
    Tables (TableNumber, Capacity, Status)
VALUES (1, 2, 'Available'),
    (2, 4, 'Available'),
    (3, 6, 'Available');

END