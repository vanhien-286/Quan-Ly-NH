# 🗄️ Hướng dẫn thiết lập Cơ sở dữ liệu (Database)

Dành cho người mới clone project hoặc muốn thiết lập lại từ đầu.

## 📌 Các bước thực hiện (Method 1: SQL Script)

### Bước 1: Tạo Database & Cấu trúc bảng
1. Mở **SQL Server Management Studio (SSMS)**.
2. Nhấn vào nút **"New Query"**.
3. Mở file `init.sql` trong thư mục này, copy toàn bộ nội dung và dán vào cửa sổ Query.
4. Nhấn **Execute (F5)**. 
   - Lệnh này sẽ tạo Database `DACCJS` và tất cả các bảng cần thiết (`Users`, `Dishes`, `Tables`, `Reservations`, ...).

### Bước 2: Chèn dữ liệu mẫu (Seeding)
1. Vẫn tại cửa sổ Query (đảm bảo đang chọn database `DACCJS`).
2. Mở file `seed.sql`, copy nội dung và dán vào.
3. Nhấn **Execute (F5)**.
   - Lệnh này sẽ tạo tài khoản Admin mặc định, các bàn ăn mẫu và danh sách món ăn ban đầu.

---

## 🔑 Thông tin tài khoản mặc định
Sau khi chạy xong `seed.sql`, bạn có thể đăng nhập trang Admin bằng:
- **Email:** `admin@gmail.com`
- **Mật khẩu:** `123456`

## 📂 Lưu ý về thư mục Archive
Thư mục `archive/` chứa các file migration cũ từng chạy trong quá trình phát triển. Bạn **không cần** quan tâm đến chúng nếu thiết lập mới từ đầu.
