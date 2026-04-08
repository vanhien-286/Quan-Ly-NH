import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ isOpen, onClose, onSwitchToLogin }) {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation bổ sung bằng Javascript
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert('Địa chỉ email không hợp lệ!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert(response.data.message);
      onSwitchToLogin();
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi đăng ký!");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#fcf9f8] py-0">
      {/* Nút đóng */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-[110] text-on-surface-variant hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>

      <main className="min-h-screen w-full flex flex-col md:flex-row">
        {/* Phần hình ảnh bên trái */}
        <section className="relative w-full md:w-5/12 lg:w-1/2 h-64 md:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-zinc-900">
            <img
              alt="Restaurant Interior"
              className="w-full h-full object-cover opacity-60"
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 max-w-xs text-white">
            <p className="font-label text-amber-500 text-[10px] uppercase tracking-[0.3em] mb-4 font-semibold">Thành Lập Xuất Sắc</p>
            <h2 className="font-headline text-3xl md:text-4xl font-light leading-tight">Nơi mỗi dĩa ăn kể một câu chuyện.</h2>
          </div>
        </section>

        {/* Phần Form bên phải */}
        <section className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-surface">
          <div className="w-full max-w-md">
            <header className="mb-12 text-left">
              <h1 className="font-headline text-4xl md:text-5xl mb-4 text-zinc-900">Tham Gia Atelier</h1>
              <p className="text-zinc-500 font-body text-sm leading-relaxed">
                Đặt chỗ của bạn trong vòng tròn ẩm thực riêng tư của chúng tôi để có quyền truy cập độc quyền vào thực đơn theo mùa và sự kiện riêng tư.
              </p>
            </header>

            {/* SỬA LỖI 2: Gắn handleSubmit vào onSubmit của form */}
            <form className="space-y-10" onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="group flex flex-col space-y-2 border-b border-zinc-200 focus-within:border-amber-600 transition-colors pb-1">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-amber-600">Tên Đầy Đủ</label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 text-zinc-900 font-headline italic text-lg placeholder:text-zinc-300 outline-none"
                  placeholder="Tên Của Bạn" required type="text"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="group flex flex-col space-y-2 border-b border-zinc-200 focus-within:border-amber-600 transition-colors pb-1">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-amber-600">Địa Chỉ Email</label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 text-zinc-900 font-headline italic text-lg placeholder:text-zinc-300 outline-none"
                  placeholder="vane@atelier.com" required type="email"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Password */}
              <div className="group flex flex-col space-y-2 border-b border-zinc-200 focus-within:border-amber-600 transition-colors pb-1">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-amber-600">Mật Khẩu</label>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 text-zinc-900 font-body text-lg placeholder:text-zinc-300 tracking-widest outline-none"
                  placeholder="••••••••" required type="password"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>



              <button type="submit" className="w-full bg-black py-5 text-white font-label text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl flex justify-center items-center gap-2 group">
                Đăng Ký
                <span className="material-symbols-outlined text-amber-400 group-hover:translate-x-1 transition-transform"></span>
              </button>

              <div className="text-center pt-8">
                <p className="font-body text-xs text-zinc-500">
                  Bạn đã có tài khoản ?
                  <button
                    type="button" // Thêm type="button" để không làm submit form
                    onClick={onSwitchToLogin}
                    className="text-amber-600 font-semibold hover:underline ml-1"
                  >
                    Đăng Nhập
                  </button>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}