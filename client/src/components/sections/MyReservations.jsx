import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyReservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/reservations/my-reservations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Đảm bảo sắp xếp mới nhất lên đầu (Dựa trên ID)
        const sorted = response.data.data.sort((a, b) => b.ReservationID - a.ReservationID);
        setReservations(sorted);
      }
    } catch (err) {
      setError('Lỗi khi tải danh sách đặt bàn: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (reservationId) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đặt bàn này?')) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/reservations/cancel/${reservationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          alert('Hủy đặt bàn thành công!');
          fetchReservations();
        }
      } catch (err) {
        alert('Lỗi khi hủy: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      'Pending': 'bg-yellow-500',
      'Confirmed': 'bg-emerald-600',
      'Cancelled': 'bg-red-500'
    };

    const statusLabel = {
      'Pending': 'Chờ xác nhận',
      'Confirmed': 'Đã xác nhận',
      'Cancelled': 'Đã hủy'
    };

    return (
      <span className={`${statusClass[status] || 'bg-emerald-600'} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
        {statusLabel[status] || status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-emerald-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-emerald-950 dark:text-emerald-50 text-xl">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-emerald-900 pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 text-center mb-2">Các Lần Đặt Bàn Của Tôi</h1>
        <p className="text-emerald-600 dark:text-emerald-300 text-center mb-8">Quản lý các lần đặt bàn của bạn</p>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {reservations.length === 0 ? (
          <div className="bg-white dark:bg-emerald-900 rounded-lg shadow-xl p-8 text-center border border-emerald-200 dark:border-emerald-800">
            <p className="text-emerald-600 dark:text-emerald-300 text-lg">Bạn chưa có lần đặt bàn nào</p>
            <a href="/reservation" className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold mt-4">
              → Đặt bàn ngay
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map(reservation => (
              <div key={reservation.ReservationID} className="bg-white dark:bg-emerald-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition border border-emerald-200 dark:border-emerald-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-300 text-sm">Tên khách</p>
                    <p className="text-emerald-950 dark:text-emerald-50 text-lg font-semibold">{reservation.FullName}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(reservation.Status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-300">Ngày</p>
                    <p className="text-emerald-950 dark:text-emerald-50 font-semibold">{new Date(reservation.ReservationDate).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-300">Giờ</p>
                    <p className="text-emerald-950 dark:text-emerald-50 font-semibold">{reservation.ReservationTime}</p>
                  </div>
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-300">Số khách</p>
                    <p className="text-emerald-950 dark:text-emerald-50 font-semibold">{reservation.NumberOfGuests} người</p>
                  </div>
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-300">Bàn số</p>
                    <p className="text-emerald-950 dark:text-emerald-50 font-semibold">Bàn {reservation.TableNumber || 'N/A'}</p>
                  </div>
                </div>

                {reservation.SpecialRequests && (
                  <div className="mb-4">
                    <p className="text-emerald-600 dark:text-emerald-300 text-sm italic">Lời nhắn của bạn:</p>
                    <p className="text-emerald-800 dark:text-emerald-200">{reservation.SpecialRequests}</p>
                  </div>
                )}

                {/* HIỂN THỊ THỰC ĐƠN ĐÃ CHỌN TRƯỚC */}
                {reservation.OrderDetails && reservation.OrderDetails.length > 0 && (
                  <div className="mb-6 p-4 bg-emerald-50/50 dark:bg-emerald-800/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                       <span className="material-symbols-outlined text-sm">restaurant</span>
                       Thực đơn đã chọn trước
                    </p>
                    <div className="space-y-2">
                      {reservation.OrderDetails.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-emerald-950 dark:text-emerald-50">
                            {item.DishName} <span className="text-emerald-600">x{item.Quantity}</span>
                          </span>
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {(item.Price * item.Quantity).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-emerald-200 dark:border-emerald-700 flex justify-between items-center">
                        <span className="font-bold text-emerald-950 dark:text-emerald-50">Tổng tiền món:</span>
                        <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                          {reservation.TotalAmount?.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 text-xs">
                  <p className="text-emerald-600 dark:text-emerald-300">
                    Email: <span className="text-emerald-800 dark:text-emerald-200">{reservation.Email}</span>
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-300">
                    SĐT: <span className="text-emerald-800 dark:text-emerald-200">{reservation.Phone}</span>
                  </p>
                </div>

                {reservation.Status === 'Pending' && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => navigate('/reservation', { state: { editData: reservation } })}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-6 rounded-lg transition"
                    >
                      Sửa đặt bàn
                    </button>
                    <button
                      onClick={() => cancelReservation(reservation.ReservationID)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Hủy đặt bàn
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyReservations;
