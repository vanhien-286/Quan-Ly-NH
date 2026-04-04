import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyReservations = () => {
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
        setReservations(response.data.data);
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
      'Confirmed': 'bg-green-500',
      'Cancelled': 'bg-red-500'
    };

    const statusLabel = {
      'Pending': 'Chờ xác nhận',
      'Confirmed': 'Đã xác nhận',
      'Cancelled': 'Đã hủy'
    };

    return (
      <span className={`${statusClass[status] || 'bg-gray-500'} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
        {statusLabel[status] || status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white text-xl">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">Các Lần Đặt Bàn Của Tôi</h1>
        <p className="text-gray-400 text-center mb-8">Quản lý các lần đặt bàn của bạn</p>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {reservations.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 text-center">
            <p className="text-gray-400 text-lg">Bạn chưa có lần đặt bàn nào</p>
            <a href="/reservation" className="text-orange-500 hover:text-orange-600 font-semibold mt-4">
              → Đặt bàn ngay
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map(reservation => (
              <div key={reservation.ReservationID} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Tên khách</p>
                    <p className="text-white text-lg font-semibold">{reservation.FullName}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(reservation.Status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-400">Ngày</p>
                    <p className="text-white font-semibold">{new Date(reservation.ReservationDate).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Giờ</p>
                    <p className="text-white font-semibold">{reservation.ReservationTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Số khách</p>
                    <p className="text-white font-semibold">{reservation.NumberOfGuests} người</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Bàn số</p>
                    <p className="text-white font-semibold">Bàn {reservation.TableNumber || 'N/A'}</p>
                  </div>
                </div>

                {reservation.SpecialRequests && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm">Ghi chú</p>
                    <p className="text-gray-300">{reservation.SpecialRequests}</p>
                  </div>
                )}

                <div className="flex gap-2 text-xs">
                  <p className="text-gray-400">
                    Email: <span className="text-gray-300">{reservation.Email}</span>
                  </p>
                  <p className="text-gray-400">
                    SĐT: <span className="text-gray-300">{reservation.Phone}</span>
                  </p>
                </div>

                {reservation.Status === 'Pending' && (
                  <button
                    onClick={() => cancelReservation(reservation.ReservationID)}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                  >
                    Hủy đặt bàn
                  </button>
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
