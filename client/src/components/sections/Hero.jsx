import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Nếu chưa có hãy: npm install framer-motion
import { Link } from 'react-scroll';

export default function Hero({ user, onLoginClick }) {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    if (!user) {
      // Chưa đăng nhập - hiển thị login modal
      onLoginClick();
    } else {
      // Đã đăng nhập - chuyển tới trang đặt bàn
      navigate('/reservation');
    }
  };

  const handleViewMenuClick = () => {
    if (!user) {
      // Chưa đăng nhập - hiển thị login modal
      onLoginClick();
    }
    // Đã đăng nhập hoặc sau khi login - scroll xuống menu
  };
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-12 overflow-hidden bg-emerald-950" id="home">

      {/* BACKGROUND AREA */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Phở Hà Nội"
          className="w-full h-full object-cover scale-105 animate-subtle-zoom"
          src="https://i.ytimg.com/vi/99tOr7JSr0k/maxresdefault.jpg"
        />
        {/* Lớp phủ Gradient đa tầng giúp chữ dễ đọc và sang hơn */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/20"></div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-emerald-500"></span>
            <span className="font-sans text-emerald-500 uppercase tracking-[0.4em] text-[10px] font-bold">
              Thành Lập 1995 | Hà Nội
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-white font-['Noto_Serif'] tracking-tighter">
            Tròn vị, Đủ chất cùng<span className="italic font-light text-emerald-200">NHÀ PHỞ HÀ NỘI</span> <br />

          </h1>

          <p className="font-sans text-lg text-emerald-100 max-w-md leading-relaxed mb-12 border-l border-emerald-700 pl-6">
            Phở Hà Nội - hương vị đền của đất nước, lầu Đông hấp dẫn, vị thươm âm lưu rội tín. Mỗi tô cāng là câu truyện mạnh mẽ về truyền thống Đông Phương.
          </p>

          <div className="flex flex-wrap gap-8 items-center">
            <button
              onClick={handleReserveClick}
              className="group relative overflow-hidden bg-emerald-700 px-10 py-4 text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:bg-emerald-800 shadow-2xl active:scale-95"
            >
              <span className="relative z-10">Đặt Bàn Ngay</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>

            <Link
              to="phos"
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              onClick={() => {
                if (!user) {
                  onLoginClick();
                }
              }}
              className="group flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Xem Thực Đơn Phở
            </Link>
          </div>
        </motion.div>

        {/* PHẦN QUẢNG CÁO MÓN ĂN (GÓC PHẢI) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:flex flex-col justify-end items-end text-white self-end pb-20"
        >
          <div className="bg-white/5 backdrop-blur-md p-8 border border-white/10 text-right group hover:bg-white/10 transition-colors">
            <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-emerald-400 mb-3 font-bold">Đặc Biệt Hôm Nay</p>
            <p className="text-3xl font-['Noto_Serif'] italic mb-1 tracking-tight">Phở Bò Đặc Biệt</p>
            <p className="text-xs text-emerald-200 font-sans tracking-widest uppercase">Phở gà, phở bò, giá xào </p>
            <div className="mt-6 h-[1px] w-0 group-hover:w-full bg-emerald-500 transition-all duration-700 ml-auto"></div>
          </div>
        </motion.div>

      </div>

      {/* HIỆU ỨNG CUỘN (SCROLL DECOR) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-t from-emerald-500 to-transparent animate-bounce"></div>
      </div>
    </section>
  );
}