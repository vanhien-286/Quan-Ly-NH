import React from 'react';

export default function Contact() {
  return (
    <section className="py-32 bg-stone-50 dark:bg-zinc-950" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ */}
          <div className="space-y-16">
            <div>
              <span className="font-sans text-amber-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
                Connect with us
              </span>
              <h2 className="text-5xl md:text-6xl font-bold font-['Noto_Serif'] mb-8 text-zinc-900 dark:text-zinc-50 tracking-tighter">
                Get in Touch
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-['Noto_Serif'] italic text-lg max-w-md">
                Whether you're planning an intimate dinner or a grand celebration, our team is here to craft your perfect evening.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {/* Location */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-amber-600">location_on</span>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-900 dark:text-zinc-50">The Atelier</h4>
                </div>
                <address className="not-italic text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-sans">
                  459 Ton Duc Thang Street<br />
                  Lien Chieu District, Da Nang
                </address>
              </div>

              {/* Hours */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-amber-600">schedule</span>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Service Hours</h4>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-sans">
                  Tues – Sat: 17:30 — 23:00<br />
                  Sunday: 12:00 — 16:00
                </p>
              </div>

              {/* Contact */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-amber-600">mail</span>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-900 dark:text-zinc-50">Reservations</h4>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-sans">
                  +84 (0) 236 3842 308<br />
                  maitre@culinaryatelier.com
                </p>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: FORM LIÊN HỆ */}
          <div className="relative">
            {/* Trang trí phía sau form */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-100/50 dark:bg-amber-900/10 rounded-full blur-3xl"></div>
            
            <div className="relative bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100 dark:border-zinc-800">
              <h3 className="text-2xl font-['Noto_Serif'] mb-10 text-zinc-900 dark:text-zinc-50">Inquiry & Reservations</h3>
              
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                {/* Input Name */}
                <div className="group relative">
                  <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-amber-600 transition-colors">
                    Full Name
                  </label>
                  <input 
                    className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 outline-none focus:border-amber-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 text-zinc-900 dark:text-zinc-50" 
                    placeholder="E.g. Hien Pham" 
                    type="text" 
                  />
                </div>

                {/* Input Email */}
                <div className="group relative">
                  <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-amber-600 transition-colors">
                    Email Address
                  </label>
                  <input 
                    className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 outline-none focus:border-amber-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 text-zinc-900 dark:text-zinc-50" 
                    placeholder="hien@atelier.com" 
                    type="email" 
                  />
                </div>

                {/* Input Message */}
                <div className="group relative">
                  <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-zinc-400 group-focus-within:text-amber-600 transition-colors">
                    Message
                  </label>
                  <textarea 
                    className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-3 outline-none focus:border-amber-600 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 text-zinc-900 dark:text-zinc-50 min-h-[100px] resize-none" 
                    placeholder="Tell us about your occasion..." 
                  />
                </div>

                <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-5 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 shadow-xl active:scale-[0.98]">
                  Request a Table
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}