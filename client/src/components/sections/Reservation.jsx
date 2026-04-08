import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData || null;

  const [formData, setFormData] = useState({
    fullName: editData?.FullName || '',
    email: editData?.Email || '',
    phone: editData?.Phone || '',
    reservationDate: editData?.ReservationDate ? new Date(editData.ReservationDate).toISOString().split('T')[0] : '',
    reservationTime: editData?.ReservationTime || '',
    numberOfGuests: editData?.NumberOfGuests || 1,
    specialRequests: editData?.SpecialRequests || '',
    tableId: editData?.TableID || null
  });

  const [availableTables, setAvailableTables] = useState([]);
  const [dishes, setDishes] = useState([]); // Danh sách món ăn từ server
  const [selectedItems, setSelectedItems] = useState(
    editData?.OrderDetails ? editData.OrderDetails.map(item => ({
      dishId: item.DishID,
      dishName: item.DishName,
      price: item.Price,
      quantity: item.Quantity
    })) : []
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái mở menu popup
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dishes/public');
      if (response.data.success) {
        setDishes(response.data.data);
      }
    } catch (err) {
      console.error('Lỗi lấy menu:', err);
    }
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Tìm bàn có sẵn
  const fetchAvailableTables = async () => {
    if (!formData.reservationDate || !formData.reservationTime || !formData.numberOfGuests) {
      setErrorMessage('Vui lòng chọn ngày, giờ và số khách!');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/reservations/available-tables', {
        params: {
          numberOfGuests: formData.numberOfGuests,
          reservationDate: formData.reservationDate,
          reservationTime: formData.reservationTime
        }
      });

      if (response.data.success) {
        setAvailableTables(response.data.data);
        setErrorMessage('');
        if (response.data.data.length === 0) {
          setErrorMessage('Không có bàn trống cho thời gian này!');
        }
      }
    } catch (err) {
      setErrorMessage('Lỗi khi lấy danh sách bàn!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Quản lý giỏ hàng món ăn
  const updateItemQuantity = (dish, delta) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item.dishId === dish.DishID);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) return prev.filter(item => item.dishId !== dish.DishID);
        return prev.map(item => item.dishId === dish.DishID ? { ...item, quantity: newQty } : item);
      }
      if (delta > 0) {
        return [...prev, { dishId: dish.DishID, dishName: dish.DishName, price: dish.Price, quantity: 1 }];
      }
      return prev;
    });
  };

  const calculateTotal = () => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage('Số điện thoại không hợp lệ! (Phải có 10 chữ số và bắt đầu bằng 03, 05, 07, 08, hoặc 09)');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Email không hợp lệ!');
      return;
    }

    try {
      setLoading(true);
      if (editData) {
        // GỌI API CẬP NHẬT
        await axios.put(`http://localhost:5000/api/reservations/update/${editData.ReservationID}`, {
          ...formData,
          numberOfGuests: parseInt(formData.numberOfGuests),
          tableId: formData.tableId ? parseInt(formData.tableId) : null,
          orderItems: selectedItems
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSuccessMessage('Cập nhật đặt bàn thành công!');
      } else {
        // GỌI API TẠO MỚI
        await axios.post('http://localhost:5000/api/reservations/create', {
          ...formData,
          numberOfGuests: parseInt(formData.numberOfGuests),
          tableId: formData.tableId ? parseInt(formData.tableId) : null,
          orderItems: selectedItems
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSuccessMessage('Đặt bàn thành công! Chúng tôi sẽ liên hệ sớm.');
      }

      setTimeout(() => {
        navigate('/my-reservations'); // Chuyển sang lịch sử để xem đơn
      }, 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Lỗi khi đặt bàn!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-emerald-900 pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-emerald-900 rounded-lg shadow-xl p-8 relative border border-emerald-200 dark:border-emerald-800">
          {/* Nút đóng */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
            title="Đóng (Thoát)"
          >
            ✕
          </button>

          <header className="text-center mb-16">
            <h2 className="text-5xl font-serif italic text-emerald-950 dark:text-emerald-50 mb-4">
              {editData ? 'Chỉnh Sửa Đặt Bàn' : 'Đặt Bàn Trực Tuyến'}
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400 font-label tracking-widest uppercase text-xs">
              {editData ? 'Cập nhật lại thông tin buổi tiệc của bạn' : 'Trải nghiệm tinh hoa ẩm thực trong không gian sang trọng'}
            </p>
          </header>

          {successMessage && (
            <div className="bg-green-500 text-white p-4 rounded-lg mb-6">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hàng 1: Họ tên & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-950 dark:text-emerald-50 text-sm font-semibold mb-2">Họ tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nhập họ tên"
                  className="w-full px-4 py-3 bg-emerald-50 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 border border-emerald-200 dark:border-emerald-700"
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-950 dark:text-emerald-50 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                  className="w-full px-4 py-3 bg-emerald-50 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 border border-emerald-200 dark:border-emerald-700"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Vui lòng nhập địa chỉ email hợp lệ (VD: ten@domain.com)"
                />
              </div>
            </div>

            {/* Hàng 2: Số điện thoại & Số khách */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-950 dark:text-emerald-50 text-sm font-semibold mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-3 bg-emerald-50 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 border border-emerald-200 dark:border-emerald-700"
                  required
                  pattern="^(0[3|5|7|8|9])+([0-9]{8})$"
                  title="Vui lòng nhập số điện thoại hợp lệ của Việt Nam (10 số, bắt đầu bằng 03, 05, 07, 08, 09)"
                  maxLength="10"
                />
              </div>
              <div>
                <label className="block text-emerald-950 dark:text-emerald-50 text-sm font-semibold mb-2">Số khách</label>
                <input
                  type="number"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 bg-emerald-50 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 border border-emerald-200 dark:border-emerald-700"
                  required
                />
              </div>
            </div>

            {/* Hàng 3: Ngày & Giờ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-950 dark:text-emerald-50 text-sm font-semibold mb-2">Ngày đặt bàn</label>
                <input
                  type="date"
                  name="reservationDate"
                  value={formData.reservationDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-emerald-50 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 border border-emerald-200 dark:border-emerald-700"
                  required
                />
              </div>
              <div>
                <label className="block text-emerald-950 dark:text-emerald-50 text-sm font-semibold mb-2">Giờ đặt bàn</label>
                <input
                  type="time"
                  name="reservationTime"
                  value={formData.reservationTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-emerald-50 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 border border-emerald-200 dark:border-emerald-700"
                  required
                />
              </div>
            </div>

            {/* Nút tìm bàn trống */}
            <button
              type="button"
              onClick={fetchAvailableTables}
              disabled={loading}
              className="w-full bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Đang tìm kiếm...' : 'Tìm bàn trống'}
            </button>

            {/* Hiển thị danh sách bàn có sẵn */}
            {availableTables.length > 0 && (
              <div>
                <label className="block text-emerald-950 dark:text-emerald-50 text-sm font-semibold mb-2">Chọn bàn (Tùy chọn)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableTables.map(table => (
                    <button
                      key={table.TableID}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tableId: table.TableID }))}
                      className={`p-3 rounded-lg font-semibold transition ${formData.tableId === table.TableID
                        ? 'bg-emerald-700 dark:bg-emerald-600 text-white'
                        : 'bg-emerald-100 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-50 hover:bg-emerald-200 dark:hover:bg-emerald-700'
                        }`}
                    >
                      Bàn {table.TableNumber}
                      <br />
                      <span className="text-sm">({table.Capacity} chỗ)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PHẦN CHỌN MÓN ĂN (Giao diện tinh gọn) */}
            <div className="border-t border-emerald-100 dark:border-emerald-800 pt-8 mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-50 flex items-center gap-2">
                  <span className="material-symbols-outlined"></span>
                  Thực đơn đi kèm
                </h3>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  className="bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-200 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm"></span>
                  {selectedItems.length > 0 ? 'Điều chỉnh món' : 'Chọn món ngay'}
                </button>
              </div>

              {/* CHI TIẾT HIỂN THỊ DƯỚI ĐỂ KIỂM TRA */}
              {selectedItems.length > 0 ? (
                <div className="bg-emerald-50/50 dark:bg-emerald-800/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-700">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-4">Chi tiết thực đơn đã chọn:</p>
                  <div className="space-y-3">
                    {selectedItems.map(item => (
                      <div key={item.dishId} className="flex justify-between items-center text-sm">
                        <div className="flex flex-col">
                          <span className="font-semibold text-emerald-950 dark:text-emerald-50">{item.dishName}</span>
                          <span className="text-xs text-emerald-600">Số lượng: {item.quantity}</span>
                        </div>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    ))}
                    <div className="pt-4 mt-2 border-t border-emerald-200 dark:border-emerald-700 flex justify-between items-center">
                      <span className="font-bold text-emerald-950 dark:text-emerald-50">Tổng tiền món dự tính:</span>
                      <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                        {calculateTotal().toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-emerald-600/60 dark:text-emerald-400/40 italic">
                  Bạn chưa chọn món ăn nào. Hãy bấm nút bên trên để chọn món sớm!
                </p>
              )}
            </div>

            {/* Ghi chú đặc biệt */}
            <div className="mt-8">
              <label className="block text-emerald-950 dark:text-emerald-50 text-sm font-semibold mb-2">Ghi chú thêm (Ăn kiêng, dị ứng, ...)</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Ví dụ: Phở không hành, ít cay..."
                rows="3"
                className="w-full px-4 py-3 bg-emerald-50 dark:bg-emerald-800 text-emerald-950 dark:text-emerald-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 border border-emerald-200 dark:border-emerald-700"
              />
            </div>

            {/* Nút submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-950 dark:bg-emerald-700 text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : (editData ? 'Xác nhận cập nhật' : 'Xác nhận đặt bàn')}
            </button>
          </form>

          <p className="text-emerald-600 dark:text-emerald-300 text-center mt-6 text-sm">
            Chúng tôi sẽ xác nhận đơn đặt bàn của bạn trong vòng 2 giờ qua email
          </p>
        </div>
      </div>

      {/* MODAL CHỌN MÓN ĂN */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-emerald-900 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-emerald-200 dark:border-emerald-700 flex flex-col">

            {/* Modal Header */}
            <div className="p-6 border-b border-emerald-100 dark:border-emerald-800 flex justify-between items-center bg-emerald-50 dark:bg-emerald-950">
              <div>
                <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50 font-serif">Thực Đơn Nhà Phở</h2>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">Chọn những món ăn bạn yêu thích trước khi đến cửa hàng</p>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Body (Menu Items) */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white dark:bg-emerald-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {['Phở', 'Sides', 'Nước Uống'].map(cat => (
                  <div key={cat} className="space-y-4">
                    <h4 className="text-lg font-serif italic font-bold text-emerald-800 dark:text-emerald-400 border-b border-emerald-100 dark:border-emerald-800 pb-2">
                      {cat === 'Sides' ? 'Món Kèm' : cat}
                    </h4>
                    <div className="space-y-3">
                      {dishes.filter(d => d.Category === cat || (cat === 'Phở' && !d.Category)).map(dish => {
                        const selected = selectedItems.find(si => si.dishId === dish.DishID);
                        return (
                          <div key={dish.DishID} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-800/40 transition-all border border-transparent hover:border-emerald-100 dark:hover:border-emerald-800">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-emerald-100">
                              <img src={dish.ImageUrl || "https://images.unsplash.com/photo-1582878826629-29b7ad1c602d?w=200&fit=crop"} alt={dish.DishName} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-emerald-950 dark:text-emerald-50 text-sm">{dish.DishName}</p>
                              <p className="text-xs text-emerald-600 font-bold">{dish.Price?.toLocaleString('vi-VN')} đ</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateItemQuantity(dish, -1)}
                                className="w-8 h-8 rounded-lg border border-emerald-200 dark:border-emerald-700 flex items-center justify-center text-emerald-700 dark:text-emerald-300 hover:bg-emerald-700 hover:text-white"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-bold text-emerald-950 dark:text-emerald-50 text-sm">
                                {selected?.quantity || 0}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateItemQuantity(dish, 1)}
                                className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950 border-t border-emerald-100 dark:border-emerald-800 flex justify-between items-center">
              <div className="text-emerald-950 dark:text-emerald-50">
                <p className="text-xs uppercase tracking-widest text-emerald-600 font-bold">Tổng tiền tạm tính</p>
                <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{calculateTotal().toLocaleString('vi-VN')} đ</p>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-emerald-700 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-xl active:scale-95"
              >
                Xác nhận lựa chọn
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Reservation;
