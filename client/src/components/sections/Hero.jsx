import React from 'react';
import { motion } from 'framer-motion'; // Nếu chưa có hãy: npm install framer-motion

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-zinc-950" id="home">
      
      {/* BACKGROUND AREA */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Artisanal food presentation" 
          className="w-full h-full object-cover scale-105 animate-subtle-zoom" 
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop" 
        />
        {/* Lớp phủ Gradient đa tầng giúp chữ dễ đọc và sang hơn */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/20"></div>
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
            <span className="h-[1px] w-12 bg-amber-500"></span>
            <span className="font-sans text-amber-500 uppercase tracking-[0.4em] text-[10px] font-bold">
              Est. 1994 | Da Nang
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-white font-['Noto_Serif'] tracking-tighter">
            Where <span className="italic font-light text-zinc-300">Gastronomy</span> <br /> 
            Meets High Art
          </h1>

          <p className="font-sans text-lg text-zinc-400 max-w-md leading-relaxed mb-12 border-l border-zinc-700 pl-6">
            Experience a curated dialogue between seasonal ingredients and avant-garde technique. Every plate is a deliberate masterpiece.
          </p>

          <div className="flex flex-wrap gap-8 items-center">
            <button className="group relative overflow-hidden bg-amber-600 px-10 py-4 text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:bg-amber-700 shadow-2xl active:scale-95">
              <span className="relative z-10">Reserve a Table</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            
            <button className="group flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:text-amber-500 transition-colors">
              View Menu
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
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
            <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-amber-500 mb-3 font-bold">Featured Tonight</p>
            <p className="text-3xl font-['Noto_Serif'] italic mb-1 tracking-tight">Atlantic Monkfish</p>
            <p className="text-xs text-zinc-400 font-sans tracking-widest uppercase">with Saffron Emulsion</p>
            <div className="mt-6 h-[1px] w-0 group-hover:w-full bg-amber-500 transition-all duration-700 ml-auto"></div>
          </div>
        </motion.div>

      </div>

      {/* HIỆU ỨNG CUỘN (SCROLL DECOR) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-t from-amber-500 to-transparent animate-bounce"></div>
      </div>
    </section>
  );
}