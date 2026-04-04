# 🍽️ Hướng Dẫn Tính Năng Đặt Bàn - DACC Restaurant

## 📋 Tổng Quan

Tính năng đặt bàn cho phép khách hàng:

- Xem danh sách bàn có sẵn
- Đặt bàn theo thời gian và số lượng khách
- Nhận cảnh báo qua email
- Quản lý các lần đặt bàn của mình

---

## 🏗️ Cấu Trúc Dự Án

### Frontend (React)

```
client/src/
├── components/
│   ├── sections/
│   │   ├── Reservation.jsx          ✅ Form đặt bàn
│   │   └── MyReservations.jsx       ✅ Lịch sử đặt bàn
│   └── layout/
│       └── Navbar.jsx               ✅ Cập nhật với nút đặt bàn
├── config/
│   └── requests.jsx                 ✅ Axios config
└── App.jsx                          ✅ Routes setup

```

### Backend (Node.js + Express)

```
backend/
├── services/
│   └── reservationService.js        ✅ Logic đặt bàn
├── controllers/
│   └── reservationController.js     ✅ API handlers
├── routes/
│   └── reservationRoutes.js         ✅ API endpoints
├── middlewares/
│   └── authMiddleware.js            ✅ JWT verification
├── config/
│   └── db.js                        ✅ Database connection
└── server.js                        ✅ Thêm /api/reservations route
```

### Database (SQL Server)

```
Tables:
- Reservations      ✅ Lưu lịch đặt bàn
- Tables           ✅ Quản lý bàn nhà hàng
```

---

## 🎯 Các Endpoint API

### Public Endpoints

```
GET  /api/reservations/available-tables
     Query: numberOfGuests, reservationDate, reservationTime
     Response: { success, data: [tables] }

POST /api/reservations/create
     Body: {
       fullName, email, phone,
       reservationDate, reservationTime,
       numberOfGuests, specialRequests, tableId
     }
     Response: { success, message, reservationId }
```

### Protected Endpoints (Cần Token)

```
GET  /api/reservations/my-reservations
     Response: { success, data: [reservations] }

DELETE /api/reservations/cancel/:reservationId
       Response: { success, message }
```

### Admin Endpoints

```
GET  /api/reservations/all
     Response: { success, data: [all reservations] }

PUT  /api/reservations/update-status/:reservationId
     Body: { status: 'Pending|Confirmed|Cancelled' }
     Response: { success, message }
```

---

## 📊 Database Schema

### Bảng: Reservations

```sql
ReservationID (INT, PK)
UserID        (INT, FK -> Users)
FullName      (NVARCHAR)
Email         (VARCHAR)
Phone         (VARCHAR)
ReservationDate (DATE)
ReservationTime (TIME)
NumberOfGuests  (INT)
TableID       (INT, FK -> Tables)
SpecialRequests (NVARCHAR)
Status        ('Pending', 'Confirmed', 'Cancelled')
CreatedAt     (DATETIME)
UpdatedAt     (DATETIME)
```

### Bảng: Tables

```sql
TableID   (INT, PK)
TableNumber (INT, UNIQUE)
Capacity    (INT)
Status      ('Available', 'Reserved', 'Occupied')
CreatedAt   (DATETIME)
```

---

## 🚀 Quy Trình Hoạt Động

### 1. Khách Hàng Đặt Bàn

```
1. Nhập thông tin: Tên, email, SĐT
2. Chọn ngày, giờ, số khách
3. Hệ thống tìm bàn trống
4. Chọn bàn (tùy chọn)
5. Nhập ghi chú (tùy chọn)
6. Xác nhận → Đặt bàn Pending
```

### 2. Hệ Thống Xử Lý

```
- Tạo record Reservation với Status = 'Pending'
- Cập nhật Tables.Status = 'Reserved'
- Trả về Message "Chờ xác nhận"
+ Admin xác nhận → Status = 'Confirmed'
```

### 3. Quản Lý Đặt Bàn

```
- User xem danh sách đặt bàn của mình
- Có thể hủy nếu Status = 'Pending'
- Khi hủy: Status = 'Cancelled', Tables.Status = 'Available'
```

---

## ⚙️ Cách Chạy

### 1. Cập nhật Database

```sql
-- Chạy file database.sql trong SQL Server Management Studio
-- Hoặc từ terminal:
sqlcmd -S LAPTOP-0BP3Q4T5 -U sa -P 123456 -i database.sql
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd client
npm install
```

### 3. Chạy Server

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

### 4. Truy Cập

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

---

## 🧪 Test API (Dùng Thunder Client/Postman)

### Test: Tìm bàn trống

```
GET http://localhost:5000/api/reservations/available-tables?numberOfGuests=4&reservationDate=2024-04-10&reservationTime=19:00
```

### Test: Đặt bàn

```
POST http://localhost:5000/api/reservations/create
Body:
{
  "fullName": "Nguyễn Văn A",
  "email": "test@gmail.com",
  "phone": "0987654321",
  "reservationDate": "2024-04-10",
  "reservationTime": "19:00",
  "numberOfGuests": 4,
  "specialRequests": "Cần bàn yên tĩnh"
}
```

### Test: Lấy đặt bàn của user

```
GET http://localhost:5000/api/reservations/my-reservations
Headers: Authorization: Bearer <token>
```

---

## 🔐 Authentication

- Token được lưu trong `localStorage` sau khi login
- Tự động gửi token trong header: `Authorization: Bearer <token>`
- Hết hạn sau 1 giờ

---

## 📝 Ghi Chú Quan Trọng

1. **Server phải chạy trước khi test**: Backend lắng nghe port 5000
2. **CORS đã setup** cho localhost:5173
3. **Database phải có dữ liệu bàn**: Insert bàn vào bảng Tables trước
4. **Token key**: "SECRET_KEY" (nên đổi thành biến môi trường)

---

## 🛠️ Troubleshooting

| Vấn Đề               | Giải pháp                             |
| -------------------- | ------------------------------------- |
| Cannot connect to DB | Kiểm tra server name, user, password  |
| CORS error           | Kiểm tra frontend URL trong server.js |
| Token hết hạn        | Đăng xuất, đăng nhập lại              |
| Bàn không hiển thị   | Insert dữ liệu vào bảng Tables        |

---

## 🎨 UI Features

- ✅ Responsive design (Mobile friendly)
- ✅ Dark mode support
- ✅ Form validation
- ✅ Real-time status updates
- ✅ Error handling
- ✅ Toast notifications

---

## 📈 Tính Năng Có Thể Phát Triển Thêm

- [ ] Thanh toán online (COD, Momo, Stripe)
- [ ] SMS reminder trước 24 giờ
- [ ] QR code confirmation
- [ ] Admin dashboard stat
- [ ] Export report PDF
- [ ] Calendar view
- [ ] Rating & review
- [ ] Multi-language support

---

**Created**: 4 tháng 4, 2026  
**Version**: 1.0  
**Status**: ✅ Hoàn thành cơ bản
