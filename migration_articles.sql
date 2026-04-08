-- ============ MIGRATION: Tạo bảng Articles ============
USE DACCJS;
GO

IF NOT EXISTS (
    SELECT *
    FROM sys.objects
    WHERE
        object_id = OBJECT_ID (N'[dbo].[Articles]')
        AND type in (N'U')
) BEGIN
CREATE TABLE Articles (
    ArticleID INT PRIMARY KEY IDENTITY (1, 1),
    Title NVARCHAR(200) NOT NULL,
    Summary NVARCHAR(500),
    Content NVARCHAR(MAX),
    ImageUrl NVARCHAR(MAX),
    IsVisible BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);
PRINT N'✅ Tạo bảng Articles thành công';
END ELSE PRINT N'⚠️ Bảng Articles đã tồn tại';
GO

-- Xóa dữ liệu mẫu cũ (nếu có ở bảng Dishes bị trùng) hoặc để kệ.
-- Chèn một số bài viết mẫu
IF NOT EXISTS (SELECT 1 FROM Articles WHERE Title = N'Linh Hồn Tô Phở Bò')
BEGIN
INSERT INTO Articles (Title, Summary, Content, ImageUrl)
VALUES 
    (N'Linh Hồn Tô Phở Bò', N'Phở bò là tinh hoa ẩm thực Hà Nội, với nước dùng được sắc từ xương bò, hành, gừng lâu ngày.', N'Linh hồn tô phở bò nằm ở cách sắc nước dùng. Khi nước sôi, các đặc chất từ xương bò từ từ hòa tan tạo thành nước dùng ngọt ngào, bao trùm từng sợi bánh. Không gì tuyệt vời hơn một buổi sáng se lạnh thưởng thức bát phở nóng hổi.', N'https://images.unsplash.com/photo-1582878826629-29b7ad1c602d?w=800&h=600&fit=crop'),
    (N'Linh Hồn Tô Phở Gà', N'Phở gà mềm mại, thanh nhẹ, là lựa chọn hoàn hảo cho những ai yêu vị ngọt ngào nhẹ nhàng.', N'Nước dùng phở gà được sắc từ gà thả vườn, hành tây, gừng nướng tạo nên vị thanh mát độc đáo. Khác với sự đậm đà của phở bò, phở gà đem lại trải nghiệm nhẹ nhàng, tinh tế và cực kỳ thanh khiết.', N'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&h=600&fit=crop'),
    (N'Linh Hồn Tô Phở Đặc Biệt', N'Phở đặc biệt kết hợp cả thịt bò tái và nạm, tạo nên độ phong phú về hương vị cực độc đáo.', N'Tô phở đặc biệt là sự giao thoa hài hòa giữa thịt xơ mỏng mọng nước và phần nạm bò sần sật. Nước dùng có độ béo hoàn hảo từ tuỷ xương bò ninh kỹ, tạo ra một trải nghiệm ẩm thực đa chiều.', N'https://images.unsplash.com/photo-1591814468924-caf68b4ac5e0?w=800&h=600&fit=crop');
    
PRINT N'✅ Đã chèn dữ liệu mẫu cho Bài Viết';
END
GO
