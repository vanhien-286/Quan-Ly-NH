import { useState, useEffect } from "react";
import request from "../../config/requets";
import "./Admin.css";

const Admin = ({ user }) => {
  const [activeTab, setActiveTab] = useState("dishes");
  const [dishes, setDishes] = useState([]);
  const [tables, setTables] = useState([]);
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [articles, setArticles] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredDishes = filterCategory === "All"
    ? dishes
    : dishes.filter(dish => (dish.Category || "Phở") === filterCategory);

  // Form states
  const [dishForm, setDishForm] = useState({ dishName: "", price: "", description: "", imageUrl: "", featured: false, isVisible: true, category: "Phở" });
  const [articleForm, setArticleForm] = useState({ title: "", summary: "", content: "", imageUrl: "", isVisible: true });

  // Danh sách categories
  const CATEGORIES = [
    { value: "Phở", label: "🍜 Phở" },
    { value: "Nước Uống", label: "🥤 Nước Uống" },
    { value: "Sides", label: "🥢 Món Kèm" }
  ];
  const [tableForm, setTableForm] = useState({ tableNumber: "", capacity: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (user?.role !== "admin") return;

    if (activeTab === "dishes") fetchDishes();
    else if (activeTab === "articles") fetchArticles();
    else if (activeTab === "tables") fetchTables();
    else if (activeTab === "reservations") fetchReservations();
    else if (activeTab === "users") fetchUsers();
    else if (activeTab === "revenue") fetchRevenue();
  }, [activeTab, user]);

  // ============ QUẢN LÝ MÓN ĂN ============
  const fetchDishes = async () => {
    try {
      setLoading(true);
      const response = await request.get("/admin/dishes");
      setDishes(response.data.data || []);
    } catch (err) {
      alert("Lỗi lấy danh sách món ăn: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    if (!dishForm.dishName || !dishForm.price) {
      alert("Vui lòng điền đầy đủ tên và giá món ăn");
      return;
    }

    try {
      if (editingId) {
        await request.put(`/admin/dishes/${editingId}`, dishForm);
        alert("Cập nhật món ăn thành công");
        setEditingId(null);
      } else {
        await request.post("/admin/dishes", dishForm);
        alert("Thêm món ăn thành công");
      }
      setDishForm({ dishName: "", price: "", description: "", imageUrl: "", featured: false, isVisible: true, category: "Phở" });
      fetchDishes();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleEditDish = (dish) => {
    setDishForm({
      dishName: dish.DishName,
      price: dish.Price,
      description: dish.Description || "",
      imageUrl: dish.ImageUrl || "",
      featured: dish.Featured || false,
      isVisible: dish.IsVisible !== undefined ? dish.IsVisible : true,
      category: dish.Category || "Phở"
    });
    setEditingId(dish.DishID);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => document.getElementById("dishNameInput")?.focus(), 100);
  };

  const handleDeleteDish = async (dishId) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá?")) return;
    try {
      await request.delete(`/admin/dishes/${dishId}`);
      alert("Xoá thành công");
      fetchDishes();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleUpdateDishFlag = async (dishId, flag, value) => {
    try {
      await request.put(`/admin/dishes/${dishId}`, { [flag]: value });
      fetchDishes();
    } catch (err) {
      alert("Lỗi cập nhật: " + err.message);
    }
  };

  // ============ QUẢN LÝ BÀI VIẾT ============
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await request.get("/articles");
      setArticles(response.data.data || []);
    } catch (err) {
      alert("Lỗi lấy danh sách bài viết: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (!articleForm.title) {
      alert("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    try {
      if (editingId) {
        await request.put(`/articles/${editingId}`, articleForm);
        alert("Cập nhật bài viết thành công");
        setEditingId(null);
      } else {
        // Kiểm tra giới hạn 3 bài viết khi thêm mới bài viết ở trạng thái hiển thị
        if (articleForm.isVisible && articles.filter(a => a.IsVisible).length >= 3) {
          alert("Giao diện trang chủ chỉ hỗ trợ hiển thị tối đa 3 bài viết. Bài viết mới đã được chuyển về trạng thái Ẩn.");
          articleForm.isVisible = false;
        }
        await request.post("/articles", articleForm);
        alert("Thêm bài viết thành công");
      }
      setArticleForm({ title: "", summary: "", content: "", imageUrl: "", isVisible: true });
      fetchArticles();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleEditArticle = (article) => {
    setArticleForm({
      title: article.Title,
      summary: article.Summary || "",
      content: article.Content || "",
      imageUrl: article.ImageUrl || "",
      isVisible: article.IsVisible !== undefined ? article.IsVisible : true
    });
    setEditingId(article.ArticleID);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => document.getElementById("articleTitleInput")?.focus(), 100);
  };

  const handleDeleteArticle = async (articleId) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá bài viết này?")) return;
    try {
      await request.delete(`/articles/${articleId}`);
      alert("Xoá thành công");
      fetchArticles();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleUpdateArticleFlag = async (articleId, flag, value) => {
    // Kiểm tra giới hạn 3 bài viết khi bật hiển thị
    if (flag === 'isVisible' && value === true) {
      const visibleCount = articles.filter(a => a.IsVisible).length;
      if (visibleCount >= 3) {
        alert("Chỉ được hiển thị tối đa 3 bài viết trên trang chủ. Vui lòng tắt bớt bài viết khác trước.");
        return;
      }
    }

    try {
      await request.put(`/articles/${articleId}`, { [flag]: value });
      fetchArticles();
    } catch (err) {
      alert("Lỗi cập nhật: " + err.message);
    }
  };
  // ============ QUẢN LÝ BÀN ============
  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await request.get("/admin/tables");
      setTables(response.data.data || []);
    } catch (err) {
      alert("Lỗi lấy danh sách bàn: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTable = async (e) => {
    e.preventDefault();
    if (!tableForm.tableNumber || !tableForm.capacity) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      if (editingId) {
        await request.put(`/admin/tables/${editingId}`, tableForm);
        alert("Cập nhật bàn thành công");
        setEditingId(null);
      } else {
        await request.post("/admin/tables", tableForm);
        alert("Thêm bàn thành công");
      }
      setTableForm({ tableNumber: "", capacity: "" });
      fetchTables();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleEditTable = (table) => {
    if (table.Status !== 'Available') {
      alert(`Bàn số ${table.TableNumber} đang ${table.Status === 'Reserved' ? 'đã được đặt' : 'được sử dụng'}, không thể sửa!`);
      return;
    }
    setTableForm({
      tableNumber: table.TableNumber,
      capacity: table.Capacity
    });
    setEditingId(table.TableID);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => document.getElementById("tableNumberInput")?.focus(), 100);
  };

  const handleDeleteTable = async (table) => {
    if (table.Status !== 'Available') {
      alert(`Bàn số ${table.TableNumber} đang có khách hoặc đã đặt, không thể xoá!`);
      return;
    }
    if (!window.confirm(`Bạn chắc chắn muốn xoá bàn số ${table.TableNumber}?`)) return;
    try {
      await request.delete(`/admin/tables/${table.TableID}`);
      alert("Xoá thành công");
      fetchTables();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  // ============ QUẢN LÝ NGƯỜI DÙNG ============
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await request.get("/admin/users");
      setUsers(response.data.data || []);
    } catch (err) {
      alert("Lỗi lấy danh sách người dùng: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserRole = async (userId, role) => {
    try {
      await request.put(`/admin/users/${userId}/role`, { role });
      alert("Cập nhật vai trò thành công");
      fetchUsers();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá?")) return;
    try {
      await request.delete(`/admin/users/${userId}`);
      alert("Xoá thành công");
      fetchUsers();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  // ============ THỐNG KÊ DOANH THU ============
  const fetchRevenue = async () => {
    try {
      setLoading(true);
      const response = await request.get("/admin/revenue/overview");
      setRevenue(response.data.data);
    } catch (err) {
      alert("Lỗi lấy thống kê: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ============ QUẢN LÝ ĐẶT BÀN ============
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await request.get("/reservations/all");
      setReservations(response.data.data || []);
    } catch (err) {
      alert("Lỗi lấy danh sách đặt bàn: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReservationStatus = async (id, status) => {
    if (!window.confirm(`Xác nhận chuyển trạng thái sang: ${status}?`)) return;
    try {
      await request.put(`/reservations/update-status/${id}`, { status });
      alert("Cập nhật thành công");
      fetchReservations();
      fetchRevenue(); // Tải lại doanh thu ngay lập tức
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  if (user?.role !== "admin") {
    return <div className="admin-warning">⚠️ Bạn không có quyền truy cập trang quản lý</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🍽️ Quản Lý Nhà Hàng</h1>
        <p>Chào mừng, {user?.fullName}</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "dishes" ? "active" : ""}`}
          onClick={() => setActiveTab("dishes")}
        >
          📝 Món Ăn - Nước Uống
        </button>
        <button
          className={`tab-btn ${activeTab === "articles" ? "active" : ""}`}
          onClick={() => setActiveTab("articles")}
        >
          📰 Bài Viết
        </button>
        <button
          className={`tab-btn ${activeTab === "tables" ? "active" : ""}`}
          onClick={() => setActiveTab("tables")}
        >
          🪑 Bàn
        </button>
        <button
          className={`tab-btn ${activeTab === "reservations" ? "active" : ""}`}
          onClick={() => setActiveTab("reservations")}
        >
          📦 Đơn Đặt Bàn
        </button>
        <button
          className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 Người Dùng
        </button>
        <button
          className={`tab-btn ${activeTab === "revenue" ? "active" : ""}`}
          onClick={() => setActiveTab("revenue")}
        >
          📊 Doanh Thu
        </button>
      </div>

      <div className="tab-content">
        {/* ============ QUẢN LÝ MÓN ĂN ============ */}
        {activeTab === "dishes" && (
          <div className="dish-section">
            <h2>Quản Lý Món Ăn - Nước Uống</h2>
            <form onSubmit={handleAddDish} className="admin-form">
              <input
                id="dishNameInput"
                type="text"
                placeholder="Tên món ăn / nước uống"
                value={dishForm.dishName}
                onChange={(e) => setDishForm({ ...dishForm, dishName: e.target.value })}
              />
              <input
                type="number"
                placeholder="Giá"
                step="0.01"
                value={dishForm.price}
                onChange={(e) => setDishForm({ ...dishForm, price: e.target.value })}
              />
              <textarea
                placeholder="Mô tả"
                value={dishForm.description}
                onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
              />
              <input
                type="url"
                placeholder="URL Hình Ảnh (vd: https://example.com/image.jpg)"
                value={dishForm.imageUrl}
                onChange={(e) => setDishForm({ ...dishForm, imageUrl: e.target.value })}
              />
              <select
                value={dishForm.category}
                onChange={(e) => setDishForm({ ...dishForm, category: e.target.value })}
                className="admin-select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              <div className="form-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={dishForm.isVisible}
                    onChange={(e) => setDishForm({ ...dishForm, isVisible: e.target.checked })}
                  />
                  Hiển thị trên website
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={dishForm.featured}
                    onChange={(e) => setDishForm({ ...dishForm, featured: e.target.checked })}
                  />
                  Đánh dấu Bestseller (nổi bật)
                </label>
              </div>
              <button type="submit" className="btn-submit">
                {editingId ? "Cập Nhật" : "Thêm"} Sản Phẩm
              </button>
              {editingId && (
                <button type="button" onClick={() => {
                  setEditingId(null);
                  setDishForm({ dishName: "", price: "", description: "", imageUrl: "", featured: false, isVisible: true });
                }} className="btn-cancel">
                  Huỷ
                </button>
              )}
            </form>

            <div className="list-section">
              <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontWeight: 'bold' }}>Lọc danh sách:</label>
                <select
                  className="admin-select"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{ minWidth: '200px' }}
                >
                  <option value="All">Tất cả sản phẩm</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              {loading ? <p>Đang tải...</p> : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Hình Ảnh</th>
                      <th>Tên Món Ăn</th>
                      <th>Giá</th>
                      <th>Danh Mục</th>
                      <th>Mô Tả</th>
                      <th>Bestseller</th>
                      <th>Hiển Thị</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDishes.map((dish, index) => (
                      <tr key={dish.DishID}>
                        <td>{index + 1}</td>
                        <td className="image-cell">
                          {dish.ImageUrl ? (
                            <img src={dish.ImageUrl} alt={dish.DishName} className="dish-thumbnail" />
                          ) : (
                            <span className="no-image">No Image</span>
                          )}
                        </td>
                        <td>{dish.DishName}</td>
                        <td>{dish.Price.toLocaleString("vi-VN")} đ</td>
                        <td><span className={`category-badge cat-${(dish.Category || "pho").toLowerCase().replace(/ /g, '-')}`}>{dish.Category || "Phở"}</span></td>
                        <td>{dish.Description || "-"}</td>
                        <td className="checkbox-cell">
                          <input
                            type="checkbox"
                            checked={dish.Featured || false}
                            onChange={(e) => handleUpdateDishFlag(dish.DishID, "featured", e.target.checked)}
                          />
                        </td>
                        <td className="checkbox-cell">
                          <input
                            type="checkbox"
                            checked={dish.IsVisible !== undefined ? dish.IsVisible : true}
                            onChange={(e) => handleUpdateDishFlag(dish.DishID, "isVisible", e.target.checked)}
                          />
                        </td>
                        <td className="action-cell">
                          <button
                            className="btn-edit"
                            onClick={() => handleEditDish(dish)}
                          >
                            ✎ Sửa
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteDish(dish.DishID)}
                          >
                            🗑️ Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ============ QUẢN LÝ BÀI VIẾT ============ */}
        {activeTab === "articles" && (
          <div className="article-section">
            <h2>Quản Lý Bài Viết</h2>
            <form onSubmit={handleAddArticle} className="admin-form">
              <input
                id="articleTitleInput"
                type="text"
                placeholder="Tiêu đề bài viết"
                value={articleForm.title}
                onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
              />
              <textarea
                placeholder="Nội dung tóm tắt (hiển thị trên thẻ)"
                value={articleForm.summary}
                onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
              />
              <textarea
                placeholder="Nội dung chi tiết của bài viết..."
                style={{ minHeight: "150px" }}
                value={articleForm.content}
                onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
              />
              <input
                type="url"
                placeholder="URL Hình Ảnh (vd: https://example.com/image.jpg)"
                value={articleForm.imageUrl}
                onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
              />
              <div className="form-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={articleForm.isVisible}
                    onChange={(e) => setArticleForm({ ...articleForm, isVisible: e.target.checked })}
                  />
                  Hiển thị trên website
                </label>
              </div>
              <button type="submit" className="btn-submit">
                {editingId ? "Cập Nhật" : "Thêm"} Bài Viết
              </button>
              {editingId && (
                <button type="button" onClick={() => {
                  setEditingId(null);
                  setArticleForm({ title: "", summary: "", content: "", imageUrl: "", isVisible: true });
                }} className="btn-cancel">
                  Huỷ
                </button>
              )}
            </form>

            <div className="list-section">
              {loading ? <p>Đang tải...</p> : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Hình Ảnh</th>
                      <th>Tiêu Đề</th>
                      <th>Tóm Tắt</th>
                      <th>Hiển Thị</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article, index) => (
                      <tr key={article.ArticleID}>
                        <td>{index + 1}</td>
                        <td className="image-cell">
                          {article.ImageUrl ? (
                            <img src={article.ImageUrl} alt={article.Title} className="dish-thumbnail" />
                          ) : (
                            <span className="no-image">No Image</span>
                          )}
                        </td>
                        <td>{article.Title}</td>
                        <td>{article.Summary || "-"}</td>
                        <td className="checkbox-cell">
                          <input
                            type="checkbox"
                            checked={article.IsVisible !== undefined ? article.IsVisible : true}
                            disabled={!article.IsVisible && articles.filter(a => a.IsVisible).length >= 3}
                            title={!article.IsVisible && articles.filter(a => a.IsVisible).length >= 3 ? "Đã đạt giới hạn 3 bài viết hiển thị" : ""}
                            onChange={(e) => handleUpdateArticleFlag(article.ArticleID, "isVisible", e.target.checked)}
                          />
                        </td>
                        <td className="action-cell">
                          <button className="btn-edit" onClick={() => handleEditArticle(article)}>✎ Sửa</button>
                          <button className="btn-delete" onClick={() => handleDeleteArticle(article.ArticleID)}>🗑️ Xoá</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ============ QUẢN LÝ BÀN ============ */}
        {activeTab === "tables" && (
          <div className="table-section">
            <h2>Quản Lý Bàn</h2>
            <form onSubmit={handleAddTable} className="admin-form">
              <input
                id="tableNumberInput"
                type="number"
                min="1"
                placeholder="Số Bàn"
                value={tableForm.tableNumber}
                onChange={(e) => setTableForm({ ...tableForm, tableNumber: e.target.value })}
              />
              <input
                type="number"
                min="1"
                placeholder="Sức Chứa"
                value={tableForm.capacity}
                onChange={(e) => setTableForm({ ...tableForm, capacity: e.target.value })}
              />
              <button type="submit" className="btn-submit">
                {editingId ? "Cập Nhật" : "Thêm"} Bàn
              </button>
              {editingId && (
                <button type="button" onClick={() => {
                  setEditingId(null);
                  setTableForm({ tableNumber: "", capacity: "" });
                }} className="btn-cancel">
                  Huỷ
                </button>
              )}
            </form>

            <div className="list-section">
              {loading ? <p>Đang tải...</p> : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Số Bàn</th>
                      <th>Sức Chứa</th>
                      <th>Trạng Thái</th>
                      <th>Ngày Tạo</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tables.map((table) => (
                      <tr key={table.TableID}>
                        <td>{table.TableID}</td>
                        <td>{table.TableNumber}</td>
                        <td>{table.Capacity} chỗ</td>
                        <td>
                          <span className={`status-badge ${table.Status.toLowerCase()}`}>
                            {table.Status === "Available" ? "Có sẵn" :
                              table.Status === "Reserved" ? "Đã đặt" : "Đang sử dụng"}
                          </span>
                        </td>
                        <td>{new Date(table.CreatedAt).toLocaleDateString("vi-VN")}</td>
                        <td className="action-cell">
                          <button
                            className={`btn-edit ${table.Status !== 'Available' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => handleEditTable(table)}
                            disabled={table.Status !== 'Available'}
                            title={table.Status !== 'Available' ? "Không thể sửa bàn đang có khách hoặc đã đặt" : ""}
                          >
                            ✎ Sửa
                          </button>
                          <button
                            className={`btn-delete ${table.Status !== 'Available' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => handleDeleteTable(table)}
                            disabled={table.Status !== 'Available'}
                            title={table.Status !== 'Available' ? "Không thể xoá bàn đang có khách hoặc đã đặt" : ""}
                          >
                            🗑️ Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ============ QUẢN LÝ NGƯỜI DÙNG ============ */}
        {activeTab === "users" && (
          <div className="user-section">
            <h2>Quản Lý Người Dùng</h2>
            <div className="list-section">
              {loading ? <p>Đang tải...</p> : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Vai Trò</th>
                      <th>Ngày Tạo</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.Id}>
                        <td>{u.Id}</td>
                        <td>{u.FullName}</td>
                        <td>{u.Email}</td>
                        <td>
                          <select
                            value={u.Role || "user"}
                            onChange={(e) => handleUpdateUserRole(u.Id, e.target.value)}
                            className="role-select"
                          >
                            <option value="user">Khách Hàng</option>
                            <option value="staff">Nhân Viên</option>
                            <option value="admin">Quản Trị Viên</option>
                          </select>
                        </td>
                        <td>{new Date(u.CreatedAt).toLocaleDateString("vi-VN")}</td>
                        <td>
                          {u.Id !== user.id && (
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteUser(u.Id)}
                            >
                              🗑️ Xoá
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ============ QUẢN LÝ ĐẶT BÀN ============ */}
        {activeTab === "reservations" && (
          <div className="reservation-section">
             <h2>📦 Quản Lý Đơn Đặt Bàn</h2>
             <div className="list-section">
                {loading ? <p>Đang tải...</p> : reservations.length === 0 ? <p>Chưa có lượt đặt bàn nào.</p> : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Mã Đơn</th>
                        <th>Khách Hàng</th>
                        <th>Thông Tin Tiệc</th>
                        <th>Thực Đơn Đã Chọn</th>
                        <th>Ngày Đặt</th>
                        <th>Trạng Thái</th>
                        <th>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map(res => (
                        <tr key={res.ReservationID}>
                          <td>#{res.ReservationID}</td>
                          <td>
                             <div className="user-info-cell">
                                <p className="font-bold">{res.FullName}</p>
                                <p className="text-xs">{res.Phone}</p>
                                <p className="text-xs italic">{res.Email}</p>
                             </div>
                          </td>
                          <td>
                             <div className="booking-info-cell">
                                <p>Bàn số: <span className="font-bold">{res.TableNumber}</span></p>
                                <p>Số khách: {res.NumberOfGuests}</p>
                                <p>Thời gian: {new Date(res.ReservationDate).toLocaleDateString()} {res.ReservationTime}</p>
                             </div>
                          </td>
                          <td>
                             {res.OrderDetails && res.OrderDetails.length > 0 ? (
                               <div className="order-items-summary">
                                  {res.OrderDetails.map((item, i) => (
                                    <p key={i} className="text-xs">
                                      • {item.DishName} (x{item.Quantity})
                                    </p>
                                  ))}
                                  <p className="font-bold text-emerald-700 mt-1 border-t border-emerald-100">
                                    Tổng: {res.TotalAmount?.toLocaleString()} đ
                                  </p>
                               </div>
                             ) : (
                               <span className="text-xs text-gray-400 italic">Không gọi món trước</span>
                             )}
                          </td>
                          <td>{new Date(res.CreatedAt).toLocaleDateString()}</td>
                          <td>
                             <span className={`status-badge ${res.Status.toLowerCase()}`}>
                                {res.Status === 'Pending' ? '🕒 Chờ xác nhận' :
                                 res.Status === 'Confirmed' ? '✅ Đã xác nhận' :
                                 res.Status === 'Cancelled' ? '❌ Đã hủy' : '✨ Hoàn tất'}
                             </span>
                          </td>
                          <td className="action-cell flex flex-col gap-2">
                             {res.Status === 'Pending' && (
                               <button 
                                onClick={() => handleUpdateReservationStatus(res.ReservationID, 'Confirmed')}
                                className="btn-confirm-text text-emerald-600 hover:text-emerald-700 font-bold text-xs"
                               >
                                 ✔ Xác nhận
                               </button>
                             )}
                             {(res.Status === 'Pending' || res.Status === 'Confirmed') && (
                               <button 
                                onClick={() => handleUpdateReservationStatus(res.ReservationID, 'Cancelled')}
                                className="btn-cancel-text text-red-500 hover:text-red-700 font-bold text-xs"
                               >
                                 ✖ Hủy đơn
                               </button>
                             )}
                             {res.Status === 'Confirmed' && (
                               <button 
                                onClick={() => handleUpdateReservationStatus(res.ReservationID, 'Completed')}
                                className="btn-complete-text text-blue-600 hover:text-blue-700 font-bold text-xs"
                               >
                                 🎉 Hoàn tất
                               </button>
                             )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
             </div>
          </div>
        )}

        {/* ============ THỐNG KÊ DOANH THU ============ */}
        {activeTab === "revenue" && (
          <div className="revenue-section">
            <h2>📊 Thống Kê Doanh Thu</h2>
            {loading ? <p>Đang tải...</p> : revenue ? (
              <div className="revenue-cards">
                <div className="revenue-card">
                  <h3>Tổng Đơn Hàng</h3>
                  <p className="revenue-number">{revenue.TotalOrders || 0}</p>
                </div>
                <div className="revenue-card">
                  <h3>Tổng Khách Hàng</h3>
                  <p className="revenue-number">{revenue.TotalCustomers || 0}</p>
                </div>
                <div className="revenue-card highlight">
                  <h3>Tổng Doanh Thu</h3>
                  <p className="revenue-number">
                    {revenue.TotalRevenue?.toLocaleString("vi-VN")} đ
                  </p>
                </div>
                <div className="revenue-card today">
                  <h3>Doanh Thu Hôm Nay</h3>
                  <p className="revenue-number">
                    {revenue.TodayRevenue?.toLocaleString("vi-VN")} đ
                  </p>
                </div>
                <div className="revenue-card month">
                  <h3>Doanh Thu Tháng Này</h3>
                  <p className="revenue-number">
                    {revenue.MonthRevenue?.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </div>
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
