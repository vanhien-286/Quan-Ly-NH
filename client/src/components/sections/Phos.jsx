import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Phos() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/admin/dishes/public");
      if (response.data.data && response.data.data.length > 0) {
        setDishes(response.data.data);
      } else {
        setError("Không có dữ liệu sản phẩm");
      }
    } catch (err) {
      setError(`Lỗi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Lọc và sắp xếp: Chỉ lấy Phở, Bestseller lên đầu
  const phoDishes = dishes
    .filter(dish => (dish.Category === "Phở" || !dish.Category) && dish.IsVisible !== false)
    .sort((a, b) => (b.Featured ? 1 : 0) - (a.Featured ? 1 : 0));

  if (loading) {
    return (
      <section className="py-24 bg-emerald-50 dark:bg-[#050505] text-center" id="phos">
        <p className="text-emerald-700 animate-pulse font-serif italic text-xl">Đang chuẩn bị phở ngon...</p>
      </section>
    );
  }

  return (
    <section className="py-24 bg-emerald-50 dark:bg-[#050505] overflow-hidden" id="phos">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* HEADER DUY NHẤT */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em] mb-4 block">Thực Đơn Đặc Sắc</span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-emerald-950 dark:text-emerald-50 mb-8">
            Linh Hồn Phở Hà Nội
          </h2>
          <div className="w-24 h-[1px] bg-emerald-300 mx-auto opacity-30"></div>
        </div>

        {/* CÙNG MỘT PHẦN HIỂN THỊ DUY NHẤT - BESTSELLER LÊN ĐẦU */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {phoDishes.map((dish, idx) => {
              const isFeatured = dish.Featured;
              
              return (
                <motion.div
                  key={dish.DishID}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative h-[480px] rounded-[2.5rem] overflow-hidden transition-all duration-700 shadow-2xl bg-white dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-800/30 hover:shadow-emerald-900/40"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <img 
                      src={dish.ImageUrl || "https://images.unsplash.com/photo-1582878826629-29b7ad1c602d?w=800&fit=crop"} 
                      alt={dish.DishName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                  </div>

                  {/* ⭐ NỔI BẬT BADGE - CHỈ CHO NHỮNG MÓN TÍCH BESTSELLER */}
                  {isFeatured && (
                    <div className="absolute top-8 left-8 z-20 flex flex-col items-center">
                      <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_10px_25px_rgba(234,179,8,0.5)] flex items-center gap-2">
                        <span className="text-lg">⭐</span> NỔI BẬT
                      </div>
                      <div className="w-[2px] h-10 bg-gradient-to-b from-yellow-400 to-transparent"></div>
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-10 w-full z-10 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                    <h4 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                      {dish.DishName}
                    </h4>
                    
                    <p className="text-emerald-50/70 text-sm font-light leading-relaxed mb-8 line-clamp-2 italic font-serif">
                      {dish.Description || "Hương vị phở gia truyền đậm đà, kết tinh từ những nguyên liệu tươi ngon nhất."}
                    </p>

                    <div className="flex justify-between items-center pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-2xl font-bold text-yellow-500 font-sans">
                        {dish.Price?.toLocaleString("vi-VN")}đ
                      </span>
                      <button className="px-6 py-3 bg-white text-[#050505] rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-yellow-400 transition-all shadow-xl active:scale-95">
                        Chọn Món
                      </button>
                    </div>
                  </div>

                  {/* Golden Border Glow for Featured */}
                  {isFeatured && (
                    <div className="absolute inset-0 border-[3px] border-yellow-500/20 rounded-[2.5rem] pointer-events-none group-hover:border-yellow-500/40 transition-colors duration-700"></div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer Note */}
        <div className="mt-24 text-center">
          <p className="text-emerald-700/50 dark:text-emerald-100/20 font-serif italic text-3xl max-w-2xl mx-auto">
            "Ẩm thực không chỉ để ăn, mà để cảm nhận linh hồn của một vùng đất."
          </p>
        </div>
      </div>
    </section>
  );
}
