import React from 'react';

export default function Contact() {
  return (
    <section className="py-32 bg-emerald-50 dark:bg-emerald-950" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

          {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ */}
          <div className="space-y-16">
            <div>
              <span className="font-sans text-emerald-700 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
                Kết Nối Với Chúng Tôi
              </span>
              <h2 className="text-5xl md:text-6xl font-bold font-['Noto_Serif'] mb-8 text-emerald-950 dark:text-emerald-50 tracking-tighter">
                Liên Hệ Với Chúng Tôi
              </h2>
              <p className="text-emerald-700 dark:text-emerald-300 font-['Noto_Serif'] italic text-3xl max-w-md">
                Cho dù bạn đang lên kế hoạch cho một bữa tối chung phở gia đình hay một lễ kỷ niệm đặc biệt, đội ngũ của chúng tôi ở đây để tạo ra trải nghiệm hoàn hảo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {/* Location */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-emerald-700">location_on</span>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-950 dark:text-emerald-50">Nhà Phở</h4>
                </div>
                <address className="not-italic text-emerald-700 dark:text-emerald-400 text-sm leading-relaxed font-sans">
                  459 Đường Tôn Đức Thắng<br />
                  Quận Liên Chiểu, Đà Nẵng
                </address>
              </div>

              {/* Hours */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-emerald-700">schedule</span>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-950 dark:text-emerald-50">Giờ Phục Vụ</h4>
                </div>
                <p className="text-emerald-700 dark:text-emerald-400 text-sm leading-relaxed font-sans">
                  Thứ Ba – Thứ Bảy: 10:00 — 22:00<br />
                  Chủ Nhật: 10:00 — 21:00
                </p>
              </div>

              {/* Contact */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-emerald-700">mail</span>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-950 dark:text-emerald-50">Đặt Bàn</h4>
                </div>
                <p className="text-emerald-700 dark:text-emerald-400 text-sm leading-relaxed font-sans">
                  +84 (0) 236 3842 308<br />
                  datban@nphohanihanoi.com
                </p>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: FORM LIÊN HỆ */}
          <div className="relative">
            {/* Trang trí phía sau form */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100/50 dark:bg-emerald-900/10 rounded-full blur-3xl"></div>

            <div className="relative bg-white dark:bg-emerald-900 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-emerald-100 dark:border-emerald-800">
              <h3 className="text-2xl font-['Noto_Serif'] mb-10 text-emerald-950 dark:text-emerald-50">Yêu Cầu & Đặt Bàn</h3>

              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                {/* Input Name */}
                <div className="group relative">
                  <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-emerald-500 group-focus-within:text-emerald-700 transition-colors">
                    Tên Đầy Đủ
                  </label>
                  <input
                    className="w-full bg-transparent border-b border-emerald-200 dark:border-emerald-800 py-3 outline-none focus:border-emerald-700 transition-colors placeholder:text-emerald-300 dark:placeholder:text-emerald-700 text-emerald-950 dark:text-emerald-50"
                    placeholder="Nhân Thứ Phở"
                    type="text"
                  />
                </div>

                {/* Input Email */}
                <div className="group relative">
                  <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-emerald-500 group-focus-within:text-emerald-700 transition-colors">
                    Địa Chỉ Email
                  </label>
                  <input
                    className="w-full bg-transparent border-b border-emerald-200 dark:border-emerald-800 py-3 outline-none focus:border-emerald-700 transition-colors placeholder:text-emerald-300 dark:placeholder:text-emerald-700 text-emerald-950 dark:text-emerald-50"
                    placeholder="pho@nampho.com"
                    type="email"
                  />
                </div>

                {/* Input Message */}
                <div className="group relative">
                  <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-emerald-500 group-focus-within:text-emerald-700 transition-colors">
                    Tin Nhắn
                  </label>
                  <textarea
                    className="w-full bg-transparent border-b border-emerald-200 dark:border-emerald-800 py-3 outline-none focus:border-emerald-700 transition-colors placeholder:text-emerald-300 dark:placeholder:text-emerald-700 text-emerald-950 dark:text-emerald-50 min-h-[100px] resize-none"
                    placeholder="Cho chúng tôi biết yêu cầu của bạn..."
                  />
                </div>

                <button className="w-full bg-emerald-700 dark:bg-emerald-600 text-white dark:text-white py-5 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-800 dark:hover:bg-emerald-700 transition-all duration-300 shadow-xl active:scale-[0.98]">
                  Yêu Cầu Đặt Bàn
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}