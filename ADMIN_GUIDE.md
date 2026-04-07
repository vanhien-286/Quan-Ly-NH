# 🍽️ Hướng Dẫn Quản Lý Admin - DACC Restaurant

## 📋 Tổng Quan

Tính năng Admin cho phép chủ nhà hàng và nhân viên quản lý toàn bộ hệ thống nhà hàng, bao gồm:

- ✅ **Quản lý món ăn** (thêm/sửa/xoá)
- ✅ **Quản lý đơn hàng**
- ✅ **Quản lý bàn** (nếu có đặt bàn)
- ✅ **Quản lý người dùng**
- ✅ **Thống kê doanh thu** 📊

---

## 🔐 Đăng Nhập Admin

### Tài Khoản Admin Mặc Định

```
📧 Email:     admin@dacc.com
🔑 Mật khẩu:  123456
```

**⚠️ LƯU Ý:** Đây là tài khoản test. Hãy đổi mật khẩu sau khi đăng nhập!

### Truy Cập Trang Admin

1. Đăng nhập với tài khoản Admin
2. Nhấn nút **"🔧 Admin"** ở góc trên phải
3. Hoặc truy cập trực tiếp: `http://localhost:5173/admin`

---

## 📋 Các Tính Năng Chi Tiết

### 1️⃣ QUẢN LÝ MÓN ĂN 📝

#### Thêm Món Ăn Mới

```
1. Nhấn tab "📝 Món Ăn"
2. Điền form:
   - Tên Món Ăn: (bắt buộc)
   - Giá: (bắt buộc) - VND
   - Mô Tả: (tuỳ chọn)
3. Nhấn "Thêm Món Ăn"
```

#### Sửa Món Ăn

```
1. Tìm món ăn trong bảng
2. Nhấn nút "✎ Sửa"
3. Chỉnh sửa thông tin
4. Nhấn "Cập Nhật Món Ăn"
```

#### Xoá Món Ăn

```
1. Tìm món ăn trong bảng
2. Nhấn nút "🗑️ Xoá"
3. Xác nhận xoá
```

#### Danh Sách Món Ăn

- Hiển thị: ID, Tên, Giá, Mô Tả
- Dữ liệu tự động cập nhật

---

### 2️⃣ QUẢN LÝ ĐƠN HÀNG 📦

#### Xem Danh Sách Đơn Hàng

```
1. Nhấn tab "📦 Đơn Hàng"
2. Xem tất cả đơn hàng trong hệ thống
3. Thông tin: ID, Khách hàng, Tổng tiền, Trạng thái, Ngày
```

#### Cập Nhật Trạng Thái Đơn Hàng

```
Các trạng thái:
- Pending (Chờ Xử Lý)
- Confirmed (Đã Xác Nhận)
- Preparing (Đang Chuẩn Bị)
- Ready (Sẵn Sàng)
- Completed (Hoàn Tất)
- Cancelled (Huỷ)

Cách thay đổi:
1. Click vào dropdown trạng thái
2. Chọn trạng thái mới
3. Trạng thái sẽ cập nhật tự động
```

#### Xoá Đơn Hàng

```
1. Tìm đơn hàng
2. Nhấn "🗑️ Xoá"
3. Xác nhận xoá
```

---

### 3️⃣ QUẢN LÝ BÀN 🪑

#### Thêm Bàn Mới

```
1. Nhấn tab "🪑 Bàn"
2. Điền form:
   - Số Bàn: số thứ tự bàn
   - Sức Chứa: số người ngồi được
3. Nhấn "Thêm Bàn"
```

#### Sửa Thông Tin Bàn

```
1. Tìm bàn trong danh sách
2. Nhấn "✎ Sửa"
3. Thay đổi số bàn hoặc sức chứa
4. Nhấn "Cập Nhật Bàn"
```

#### Xoá Bàn

```
1. Tìm bàn
2. Nhấn "🗑️ Xoá"
3. Xác nhận
```

#### Trạng Thái Bàn

- 🟢 **Available** - Có sẵn
- 🟡 **Reserved** - Đã đặt
- 🔴 **Occupied** - Đang sử dụng

---

### 4️⃣ QUẢN LÝ NGƯỜI DÙNG 👥

#### Xem Danh Sách Người Dùng

```
1. Nhấn tab "👥 Người Dùng"
2. Xem tất cả tài khoản dalam hệ thống
3. Thông tin: ID, Tên, Email, Vai trò, Ngày tạo
```

#### Cập Nhật Vai Trò Người Dùng

```
Các vai trò có sẵn:
- User (Khách Hàng) - Quyền mặc định
- Staff (Nhân Viên) - Quyền cao hơn
- Admin (Quản Trị Viên) - Quyền cao nhất

Cách cập nhật:
1. Click dropdown "Vai Trò"
2. Chọn vai trò mới
3. Vai trò sẽ cập nhật tự động
```

#### Xoá Người Dùng

```
1. Tìm người dùng
2. Nhấn "🗑️ Xoá"
3. Xác nhận xoá
⚠️ Lưu ý: Không thể xoá chính mình
```

---

### 5️⃣ THỐNG KÊ DOANH THU 📊

#### Tổng Quan Doanh Thu

Hiển thị 4 chỉ số chính:

| Chỉ Số                 | Ý Nghĩa                       |
| ---------------------- | ----------------------------- |
| **Tổng Đơn Hàng**      | Số lượng đơn hàng đã hoàn tất |
| **Tổng Khách Hàng**    | Số khách hàng độc lập         |
| **Tổng Doanh Thu**     | Tổng tiền bán hàng (VND)      |
| **Trung Bình Mỗi Đơn** | Giá trị trung bình/đơn        |

#### Thống Kê Chi Tiết (API Ready)

Backend đã chuẩn bị các endpoint:

- `/api/admin/revenue/by-date` - Doanh thu theo ngày
- `/api/admin/revenue/by-product` - Doanh thu theo sản phẩm
- `/api/admin/revenue/monthly` - Doanh thu theo tháng

---

## 🏗️ Cấu Trúc Dự Án

### Frontend

```
client/src/components/sections/
├── Admin.jsx          ✅ Admin dashboard component
└── Admin.css          ✅ Admin styling
```

### Backend

```
backend/
├── routes/
│   └── adminRoutes.js              ✅ 20+ API routes
├── controllers/
│   └── adminController.js          ✅ Request handlers
├── services/
│   └── adminService.js             ✅ Business logic
└── middlewares/
    └── authMiddleware.js           ✅ Role-based auth
```

### Database

```
DACCJS/
├── Users (Role column added)
├── Dishes (New)
├── Orders (New)
├── OrderDetails (New)
├── Reservations (Existing)
└── Tables (Existing)
```

---

## 🌐 API Endpoints (20+ endpoints)

### Quản Lý Món Ăn

```
GET    /api/admin/dishes                  - Lấy danh sách
POST   /api/admin/dishes                  - Thêm mới
PUT    /api/admin/dishes/:dishId          - Cập nhật
DELETE /api/admin/dishes/:dishId          - Xoá
```

### Quản Lý Đơn Hàng

```
GET    /api/admin/orders                  - Lấy danh sách
GET    /api/admin/orders/:orderId         - Chi tiết đơn
PUT    /api/admin/orders/:orderId/status  - Cập nhật trạng thái
DELETE /api/admin/orders/:orderId         - Xoá
```

### Quản Lý Bàn

```
GET    /api/admin/tables                  - Lấy danh sách
POST   /api/admin/tables                  - Thêm mới
PUT    /api/admin/tables/:tableId         - Cập nhật
DELETE /api/admin/tables/:tableId         - Xoá
PUT    /api/admin/tables/:tableId/status  - Cập nhật trạng thái
```

### Quản Lý Người Dùng

```
GET    /api/admin/users                   - Lấy danh sách
PUT    /api/admin/users/:userId/role      - Cập nhật vai trò
DELETE /api/admin/users/:userId           - Xoá
```

### Thống Kê Doanh Thu

```
GET    /api/admin/revenue/overview        - Tổng quan
GET    /api/admin/revenue/by-date         - Theo ngày
GET    /api/admin/revenue/by-product      - Theo sản phẩm
GET    /api/admin/revenue/monthly         - Theo tháng
```

---

## 📦 Cài Đặt & Chạy

### Bước 1: Chạy Migration SQL

```sql
-- Mở SQL Server Management Studio
-- Mở file: migration_admin_tables.sql
-- Chạy để tạo bảng và dữ liệu mẫu
```

### Bước 2: Khởi Động Backend

```bash
cd backend
npm install
npm start
```

### Bước 3: Khởi Động Frontend

```bash
cd client
npm install
npm run dev
```

### Bước 4: Truy Cập

```
Frontend: http://localhost:5173
Backend: http://localhost:5000 (hoặc port khác)
Admin: http://localhost:5173/admin
```

---

## 🔒 Bảo Mật

- ✅ Chỉ Admin có quyền truy cập trang `/admin`
- ✅ Tất cả API đều yêu cầu token JWT
- ✅ Middleware kiểm tra role cho từng endpoint
- ✅ Mật khẩu được mã hóa với bcrypt
- ✅ Token hết hạn sau 1 giờ

**Middleware Admin Check:**

```javascript
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Chỉ admin mới có quyền" });
  }
};
```

---

## 🆘 Khắc Phục Sự Cố

### ❓ Không Thấy Nút Admin

**Giải pháp:**

- Kiểm tra role trong localStorage (phải là "admin")
- Đăng nhập lại bằng tài khoản admin
- Xoá cache và refresh trang

### ❓ Lỗi "Chỉ admin mới có quyền"

**Giải pháp:**

- Kiểm tra token JWT hợp lệ
- Kiểm tra role = "admin" trong database
- Thử đăng nhập lại

### ❓ Dữ Liệu Không Load

**Giải pháp:**

- Kiểm tra backend đang chạy
- Kiểm tra API endpoints (F12 → Network)
- Kiểm tra CORS settings

### ❓ Migration Không Chạy

**Giải pháp:**

- Kiểm tra SQL Server đang chạy
- Kiểm tra USE DACCJS; ở đầu file
- Kiểm tra quyền CREATE TABLE

---

## 📊 Các Tác Vụ Thường Gặp

### Tác Vụ 1: Thêm Món Ăn Mới

```
1. Đăng nhập Admin
2. Nhấn tab "📝 Món Ăn"
3. Điền: Tên món, Giá
4. Nhấn "Thêm Món Ăn"
✅ Xong!
```

### Tác Vụ 2: Xác Nhận Đơn Hàng

```
1. Nhấn tab "📦 Đơn Hàng"
2. Tìm đơn hàng
3. Chọn "Confirmed" từ dropdown
4. Trạng thái cập nhật ngay
✅ Xong!
```

### Tác Vụ 3: Chuẩn Bị Bàn Mới

```
1. Nhấn tab "🪑 Bàn"
2. Điền Số Bàn (vd: 10) và Sức Chứa (vd: 6)
3. Nhấn "Thêm Bàn"
✅ Xong!
```

### Tác Vụ 4: Nâng Cấp Nhân Viên

```
1. Nhấn tab "👥 Người Dùng"
2. Tìm người dùng
3. Chọn "staff" từ dropdown vai trò
4. Vai trò cập nhật ngay
✅ Xong!
```

---

## 📈 Phát Triển Thêm

### Tính năng có thể thêm:

- [ ] Biểu đồ doanh thu (Chart.js)
- [ ] Báo cáo PDF
- [ ] Quản lý kho hàng
- [ ] Quản lý nhân viên (lương, shift)
- [ ] Khách hàng VIP
- [ ] Mã giảm giá / Voucher
- [ ] Tích hợp thanh toán
- [ ] Đánh giá khách hàng
- [ ] Multi-language support
- [ ] Dark mode

---

## 📁 File Structure

```
DACC Restaurant/
├── backend/
│   ├── routes/adminRoutes.js       ✨ Admin routes
│   ├── controllers/adminController.js
│   ├── services/adminService.js
│   ├── middlewares/authMiddleware.js
│   └── server.js                   ⚡ Updated
├── client/
│   └── src/components/sections/
│       ├── Admin.jsx               ✨ New
│       ├── Admin.css               ✨ New
│       └── ... (other components)
├── migration_admin_tables.sql      ✨ New
└── ADMIN_GUIDE.md                  ✨ This file
```

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. **Kiểm tra Console**
   - Mở DevTools (F12)
   - Xem Network tab cho API errors
   - Kiểm tra Console tab cho JS errors

2. **Kiểm tra Backend**
   - Terminal backend có lỗi?
   - Port chính xác?
   - Database connected?

3. **Kiểm tra Database**
   - SQL Server running?
   - Database DACCJS exists?
   - Tables created (post /init-db)?

4. **Reset Database**
   - Xoá dữ liệu cũ
   - Chạy lại migration file
   - Khởi động lại backend

---

## ✨ Tóm Tắt

| Tính Năng          | Trạng Thái  | Ghi Chú          |
| ------------------ | ----------- | ---------------- |
| Quản Lý Món Ăn     | ✅ Hoàn tất | CRUD + danh sách |
| Quản Lý Đơn Hàng   | ✅ Hoàn tất | Status + delete  |
| Quản Lý Bàn        | ✅ Hoàn tất | CRUD + status    |
| Quản Lý Người Dùng | ✅ Hoàn tất | Role assignment  |
| Thống Kê Doanh Thu | ✅ Hoàn tất | Overview + APIs  |
| Responsive Design  | ✅ Hoàn tất | Mobile friendly  |
| Authentication     | ✅ Hoàn tất | JWT + role-based |

---

**Phiên bản:** 1.0.0  
**Cập nhật:** Tháng 4 năm 2024  
**Liên Hệ:** DACC Restaurant Team

🚀 **Admin System Đã Sẵn Sàng!** 🚀
