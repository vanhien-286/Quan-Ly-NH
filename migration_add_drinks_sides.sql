-- ============ MIGRATION: Thêm dữ liệu mẫu cho Nước Uống & Món Kèm ============

USE DACCJS;
GO

-- 1. Thêm dữ liệu mẫu cho category "Nước Uống" (Drinks)
IF NOT EXISTS (
    SELECT 1
    FROM Dishes
    WHERE
        DishName = N'Trà Đá'
        AND Category = N'Nước Uống'
) BEGIN
INSERT INTO
    Dishes (DishName, Price, Description, ImageUrl, Featured, IsVisible, Category, CreatedAt)
VALUES 
    (
        N'Trà Đá',
        10000,
        N'Trà đá truyền thống Việt Nam, thức uống giải khát hoàn hảo khi thưởng thức phở',
        N'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=600&fit=crop',
        1,
        1,
        N'Nước Uống',
        GETDATE()
    ),
    (
        N'Nước Chanh',
        15000,
        N'Nước chanh tươi mát lạnh, vị chua ngọt cân bằng tuyệt vời',
        N'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&h=600&fit=crop',
        0,
        1,
        N'Nước Uống',
        GETDATE()
    ),
    (
        N'Cà Phê Sữa Đá',
        25000,
        N'Cà phê sữa đá đậm đà theo phong cách Việt Nam, pha phin truyền thống',
        N'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=500&h=600&fit=crop',
        0,
        1,
        N'Nước Uống',
        GETDATE()
    ),
    (
        N'Nước Dừa Tươi',
        20000,
        N'Nước dừa tươi nguyên chất, giải nhiệt và bổ dưỡng',
        N'https://images.unsplash.com/photo-1525385133512-2f3bdd585d7d?w=500&h=600&fit=crop',
        0,
        1,
        N'Nước Uống',
        GETDATE()
    ),
    (
        N'Trà Tắc',
        18000,
        N'Trà tắc (quất) thơm mát, vị chua nhẹ kết hợp mật ong',
        N'https://images.unsplash.com/photo-1571934811356-5cc061b6211f?w=500&h=600&fit=crop',
        0,
        1,
        N'Nước Uống',
        GETDATE()
    );

PRINT N'✅ Đã thêm 5 món Nước Uống thành công';

END ELSE PRINT N'⚠️ Dữ liệu Nước Uống đã tồn tại';
GO

-- 2. Thêm dữ liệu mẫu cho category "Sides" (Món Kèm)
IF NOT EXISTS (
    SELECT 1
    FROM Dishes
    WHERE
        DishName = N'Quẩy'
        AND Category = N'Sides'
) BEGIN
INSERT INTO
    Dishes (DishName, Price, Description, ImageUrl, Featured, IsVisible, Category, CreatedAt)
VALUES 
    (
        N'Quẩy',
        5000,
        N'Quẩy giòn tan, món ăn kèm không thể thiếu khi ăn phở',
        N'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500&h=600&fit=crop',
        1,
        1,
        N'Sides',
        GETDATE()
    ),
    (
        N'Nem Chua Rán',
        30000,
        N'Nem chua rán giòn rụm, nhân thịt đậm đà',
        N'https://images.unsplash.com/photo-1548507200-e4b1b5e21df3?w=500&h=600&fit=crop',
        0,
        1,
        N'Sides',
        GETDATE()
    ),
    (
        N'Rau Sống',
        10000,
        N'Dĩa rau sống tươi ngon: giá, rau mùi, hành, ớt, chanh',
        N'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=600&fit=crop',
        0,
        1,
        N'Sides',
        GETDATE()
    ),
    (
        N'Trứng Trần',
        8000,
        N'Trứng gà trần lòng đào, thêm vào phở cho bổ dưỡng hơn',
        N'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&h=600&fit=crop',
        0,
        1,
        N'Sides',
        GETDATE()
    );

PRINT N'✅ Đã thêm 4 món Sides (Món Kèm) thành công';

END ELSE PRINT N'⚠️ Dữ liệu Sides đã tồn tại';
GO

PRINT N'========================================';
PRINT N'✅ Migration thêm Nước Uống & Sides hoàn tất!';
PRINT N'========================================';
