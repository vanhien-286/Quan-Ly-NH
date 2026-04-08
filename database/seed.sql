-- =======================================================
-- SEED DATA SCRIPT: DACCJS (Dữ liệu mẫu)
-- =======================================================

USE DACCJS;
GO

-- 1. Chèn Admin mặc định (Email: admin@gmail.com | Pass: 123456)
-- Mật khẩu đã được hash bằng bcrypt: $2a$10$7R9I6.9Y7mG0S1.5C6yO3eR6f6g6f6f6f6f6f6f6f6f6f6f6f6f6f
IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'admin@gmail.com')
BEGIN
    INSERT INTO Users (FullName, Email, Password, Role)
    VALUES (N'Quản Trị Viên', 'admin@gmail.com', '$2a$10$7R9I6.9Y7mG0S1.5C6yO3eR6f6g6f6f6f6f6f6f6f6f6f6f6f6f6f', 'admin');
    PRINT '✅ Seeded Admin user.';
END
GO

-- 2. Chèn các bàn mẫu (Bàn 1, 2, 3)
IF NOT EXISTS (SELECT 1 FROM Tables WHERE TableNumber = 1)
BEGIN
    INSERT INTO Tables (TableNumber, Capacity, Status)
    VALUES (1, 2, 'Available'), (2, 4, 'Available'), (3, 6, 'Available');
    PRINT '✅ Seeded initial tables.';
END
GO

-- 3. Chèn các món ăn & nước uống mẫu
IF NOT EXISTS (SELECT 1 FROM Dishes WHERE DishName = N'Phở Bò' AND Category = N'Phở')
BEGIN
    INSERT INTO Dishes (DishName, Price, Category, ImageUrl, Description, Featured)
    VALUES 
    (N'Phở Bò', 80000, N'Phở', N'https://images.unsplash.com/photo-1582878826629-29b7ad1c602d', N'Phở bò truyền thống với nước dùng đặc biệt', 1),
    (N'Phở Gà', 70000, N'Phở', N'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec', N'Phở gà mềm mại, thanh nhẹ', 0),
    (N'Phở Đặc Biệt', 120000, N'Phở', N'https://images.unsplash.com/photo-1591814468924-caf68b4ac5e0', N'Phở đầy đủ bò tái, nạm, gầu', 1);
END

IF NOT EXISTS (SELECT 1 FROM Dishes WHERE DishName = N'Trà Đá' AND Category = N'Nước Uống')
BEGIN
    INSERT INTO Dishes (DishName, Price, Category, ImageUrl, Description)
    VALUES 
    (N'Trà Đá', 10000, N'Nước Uống', N'https://images.unsplash.com/photo-1556679343-c7306c1976bc', N'Trà đá mát lạnh'),
    (N'Cà Phê Sữa Đá', 25000, N'Nước Uống', N'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda', N'Cà phê phin truyền thống');
END

IF NOT EXISTS (SELECT 1 FROM Dishes WHERE DishName = N'Quẩy' AND Category = N'Sides')
BEGIN
    INSERT INTO Dishes (DishName, Price, Category, ImageUrl, Description)
    VALUES 
    (N'Quẩy', 5000, N'Sides', N'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec', N'Quẩy giòn ăn kèm phở');
END
PRINT '✅ Seeded dishes and drinks.';
GO

-- 4. Chèn bài viết mẫu
IF NOT EXISTS (SELECT 1 FROM Articles WHERE Title = N'Linh Hồn Tô Phở Bò')
BEGIN
    INSERT INTO Articles (Title, Summary, Content, ImageUrl)
    VALUES 
    (N'Linh Hồn Tô Phở Bò', N'Phở bò là tinh hoa ẩm thực Hà Nội...', N'Chi tiết bài viết về phở bò...', N'https://images.unsplash.com/photo-1582878826629-29b7ad1c602d'),
    (N'Bí quyết nấu nước dùng', N'Cách sắc nước dùng ngọt thanh từ xương...', N'Ninh xương bò trong 12 tiếng...', N'https://images.unsplash.com/photo-1591814468924-caf68b4ac5e0');
    PRINT '✅ Seeded articles.';
END
GO
