import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reservation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    reservationDate: '',
    reservationTime: '',
    numberOfGuests: 1,
    specialRequests: '',
    tableId: null
  });

  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/reservations/create', {
        ...formData,
        numberOfGuests: parseInt(formData.numberOfGuests),
        tableId: formData.tableId ? parseInt(formData.tableId) : null
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          reservationDate: '',
          reservationTime: '',
          numberOfGuests: 1,
          specialRequests: '',
          tableId: null
        });
        setAvailableTables([]);

        // Chuyển hướng sau 2 giây
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Lỗi khi đặt bàn!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 relative">
          {/* Nút đóng */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
            title="Đóng (Thoát)"
          >
            ✕
          </button>

          <h1 className="text-4xl font-bold text-white text-center mb-2">Đặt Bàn Online</h1>
          <p className="text-gray-400 text-center mb-8">Chọn thời gian yêu thích của bạn</p>

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
                <label className="block text-white text-sm font-semibold mb-2">Họ tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nhập họ tên"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Hàng 2: Số điện thoại & Số khách */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Số khách</label>
                <input
                  type="number"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Hàng 3: Ngày & Giờ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Ngày đặt bàn</label>
                <input
                  type="date"
                  name="reservationDate"
                  value={formData.reservationDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Giờ đặt bàn</label>
                <input
                  type="time"
                  name="reservationTime"
                  value={formData.reservationTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Nút tìm bàn trống */}
            <button
              type="button"
              onClick={fetchAvailableTables}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Đang tìm kiếm...' : 'Tìm bàn trống'}
            </button>

            {/* Hiển thị danh sách bàn có sẵn */}
            {availableTables.length > 0 && (
              <div>
                <label className="block text-white text-sm font-semibold mb-2">Chọn bàn (Tùy chọn)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableTables.map(table => (
                    <button
                      key={table.TableID}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tableId: table.TableID }))}
                      className={`p-3 rounded-lg font-semibold transition ${
                        formData.tableId === table.TableID
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
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

            {/* Ghi chú đặc biệt */}
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Ghi chú (Tùy chọn)</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Ví dụ: Cần bàn yên tĩnh, sinh nhật..."
                rows="4"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Nút submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-4 rounded-lg transition duration-300 text-lg disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : 'Xác nhận đặt bàn'}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-6 text-sm">
            Chúng tôi sẽ xác nhận đơn đặt bàn của bạn trong vòng 2 giờ qua email
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
