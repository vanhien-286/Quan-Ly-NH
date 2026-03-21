import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Nếu không mở thì không vẽ gì cả
  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      
      // Lưu thông tin vào máy
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Báo cho App.jsx biết để hiện nút Logout và tên User
      onLoginSuccess(response.data.user);
      
      alert("Welcome back, " + response.data.user.fullName);
    } catch (error) {
      alert(error.response?.data?.message || "Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    /* LỚP PHỦ (OVERLAY): Đảm bảo luôn nằm trên cùng nhờ z-[110] */
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      {/* NỘI DUNG MODAL */}
      <div className="relative w-full max-w-md bg-white p-8 md:p-12 shadow-2xl rounded-sm">
        
        {/* Nút đóng (X) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <header className="mb-10 text-left">
          <h2 className="font-headline text-4xl mb-2 text-zinc-900">Access Atelier</h2>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-label">Authentic Culinary Experience</p>
        </header>

        {/* FORM ĐĂNG NHẬP */}
        <form className="space-y-8" onSubmit={handleLogin}>
          
          <div className="space-y-1 group">
            <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-amber-600 transition-colors">
              Email Address
            </label>
            <input 
              className="w-full border-b border-zinc-200 py-2 outline-none focus:border-amber-600 transition-colors font-body" 
              placeholder="chef@atelier.com" 
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="space-y-1 group">
            <div className="flex justify-between items-end">
              <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 group-focus-within:text-amber-600 transition-colors">
                Password
              </label>
              <button type="button" className="font-label text-[10px] uppercase tracking-widest hover:text-amber-600 transition-colors">
                Forgot?
              </button>
            </div>
            <input 
              className="w-full border-b border-zinc-200 py-2 outline-none focus:border-amber-600 transition-colors font-body" 
              placeholder="••••••••" 
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <button 
              className="w-full bg-zinc-900 py-4 text-white font-label text-xs uppercase tracking-[0.2em] font-bold hover:bg-black transition-all shadow-lg active:scale-95" 
              type="submit"
            >
              Enter the Circle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}