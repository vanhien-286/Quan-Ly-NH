import React, { useState } from 'react'; // SỬA LỖI 1: Thêm useState vào đây
import axios from 'axios';

export default function Register({ isOpen, onClose, onSwitchToLogin }) {
  // 1. Tạo State để lưu trữ dữ liệu nhập vào
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  // 2. Hàm xử lý khi nhấn "Request Membership"
  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <p className="font-label text-amber-500 text-[10px] uppercase tracking-[0.3em] mb-4 font-semibold">Established Excellence</p>
            <h2 className="font-headline text-3xl md:text-4xl font-light leading-tight">Where every plate tells a story.</h2>
          </div>
        </section>

        {/* Phần Form bên phải */}
        <section className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-surface">
          <div className="w-full max-w-md">
            <header className="mb-12 text-left">
              <h1 className="font-headline text-4xl md:text-5xl mb-4 text-on-surface">Join the Atelier</h1>
              <p className="text-zinc-500 font-body text-sm leading-relaxed">
                Secure your place in our private culinary circle for exclusive access to seasonal menus and private events.
              </p>
            </header>

            {/* SỬA LỖI 2: Gắn handleSubmit vào onSubmit của form */}
            <form className="space-y-10" onSubmit={handleSubmit}>
              
              {/* Full Name */}
              <div className="group flex flex-col space-y-2 border-b border-zinc-200 focus-within:border-amber-600 transition-colors pb-1">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-amber-600">Full Name</label>
                <input 
                  className="bg-transparent border-none p-0 focus:ring-0 text-on-surface font-headline italic text-lg placeholder:text-zinc-300 outline-none" 
                  placeholder="Julianne Vane" required type="text"
                  // SỬA LỖI 3: Gắn setFormData để cập nhật dữ liệu
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              {/* Email */}
              <div className="group flex flex-col space-y-2 border-b border-zinc-200 focus-within:border-amber-600 transition-colors pb-1">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-amber-600">Email Address</label>
                <input 
                  className="bg-transparent border-none p-0 focus:ring-0 text-on-surface font-headline italic text-lg placeholder:text-zinc-300 outline-none" 
                  placeholder="vane@atelier.com" required type="email"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Password */}
              <div className="group flex flex-col space-y-2 border-b border-zinc-200 focus-within:border-amber-600 transition-colors pb-1">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-amber-600">Password</label>
                <input 
                  className="bg-transparent border-none p-0 focus:ring-0 text-on-surface font-body text-lg placeholder:text-zinc-300 tracking-widest outline-none" 
                  placeholder="••••••••" required type="password"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div className="flex items-start space-x-4 pt-4">
                <input className="h-4 w-4 rounded-sm border-zinc-300 text-amber-600 focus:ring-amber-500" type="checkbox" id="circle" />
                <label className="text-xs text-zinc-500 leading-tight" htmlFor="circle">
                  Apply for the <span className="text-black font-semibold italic">Atelier Inner Circle</span> for priority reservations.
                </label>
              </div>

              <button type="submit" className="w-full bg-black py-5 text-white font-label text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl flex justify-center items-center gap-2 group">
                Request Membership
                <span className="material-symbols-outlined text-amber-400 group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
              </button>

              <div className="text-center pt-8">
                <p className="font-body text-xs text-zinc-500">
                  Already part of our story? 
                  <button 
                    type="button" // Thêm type="button" để không làm submit form
                    onClick={onSwitchToLogin}
                    className="text-amber-600 font-semibold hover:underline ml-1"
                  >
                    Sign In
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