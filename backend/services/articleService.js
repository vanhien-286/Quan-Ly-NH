const { pool } = require("../config/db");
const sql = require("mssql");

exports.getAllArticles = async () => {
  try {
    const result = await pool.request().query(`
      SELECT * FROM Articles ORDER BY CreatedAt DESC
    `);
    return { success: true, data: result.recordset };
  } catch (err) {
    throw new Error("Lỗi lấy danh sách bài viết: " + err.message);
  }
};

exports.getArticleById = async (id) => {
  try {
    const result = await pool.request()
      .input("ArticleID", sql.Int, id)
      .query(`SELECT * FROM Articles WHERE ArticleID = @ArticleID`);
    if (result.recordset.length === 0) {
      throw new Error("Không tìm thấy bài viết");
    }
    return { success: true, data: result.recordset[0] };
  } catch (err) {
    throw new Error("Lỗi xem chi tiết bài viết: " + err.message);
  }
};

exports.createArticle = async (data) => {
  try {
    const { title, summary, content, imageUrl, isVisible } = data;
    if (!title) throw new Error("Tiêu đề bài viết không được để trống");

    const result = await pool.request()
      .input("Title", sql.NVarChar, title)
      .input("Summary", sql.NVarChar, summary || null)
      .input("Content", sql.NVarChar, content || null)
      .input("ImageUrl", sql.NVarChar, imageUrl || null)
      .input("IsVisible", sql.Bit, isVisible !== undefined ? (isVisible ? 1 : 0) : 1)
      .query(`
        INSERT INTO Articles (Title, Summary, Content, ImageUrl, IsVisible, CreatedAt, UpdatedAt)
        VALUES (@Title, @Summary, @Content, @ImageUrl, @IsVisible, GETDATE(), GETDATE())
        SELECT SCOPE_IDENTITY() as ArticleID
      `);

    return {
      success: true,
      message: "Thêm bài viết thành công",
      articleId: result.recordset[0].ArticleID
    };
  } catch (err) {
    throw new Error("Lỗi thêm bài viết: " + err.message);
  }
};

exports.updateArticle = async (id, data) => {
  try {
    let request = pool.request();
    request.input("ArticleID", sql.Int, id);
    
    let updateFields = ["UpdatedAt = GETDATE()"];
    
    if (data.title !== undefined) {
      request.input("Title", sql.NVarChar, data.title);
      updateFields.push("Title = @Title");
    }
    if (data.summary !== undefined) {
      request.input("Summary", sql.NVarChar, data.summary || null);
      updateFields.push("Summary = @Summary");
    }
    if (data.content !== undefined) {
      request.input("Content", sql.NVarChar, data.content || null);
      updateFields.push("Content = @Content");
    }
    if (data.imageUrl !== undefined) {
      request.input("ImageUrl", sql.NVarChar, data.imageUrl || null);
      updateFields.push("ImageUrl = @ImageUrl");
    }
    if (data.isVisible !== undefined) {
      request.input("IsVisible", sql.Bit, data.isVisible ? 1 : 0);
      updateFields.push("IsVisible = @IsVisible");
    }
    
    const query = `
      UPDATE Articles
      SET ${updateFields.join(", ")}
      WHERE ArticleID = @ArticleID
    `;
    await request.query(query);

    return { success: true, message: "Cập nhật bài viết thành công" };
  } catch (err) {
    throw new Error("Lỗi cập nhật bài viết: " + err.message);
  }
};

exports.deleteArticle = async (id) => {
  try {
    await pool.request()
      .input("ArticleID", sql.Int, id)
      .query("DELETE FROM Articles WHERE ArticleID = @ArticleID");
    return { success: true, message: "Xoá bài viết thành công" };
  } catch (err) {
    throw new Error("Lỗi xoá bài viết: " + err.message);
  }
};
