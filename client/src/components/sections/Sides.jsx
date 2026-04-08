import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Sides() {
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
        const sides = response.data.data.filter(dish =>
          dish.IsVisible !== false &&
          dish.Category &&
          dish.Category.toLowerCase() === "sides"
        );
        setDishes(sides);
      } else {
        setError("Không có dữ liệu sản phẩm");
      }
    } catch (err) {
      setError(`Lỗi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <section className="py-32 bg-[#f8faf9] dark:bg-[#022c22] overflow-hidden" id="sides">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {dishes.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* ILLUSTRATION AREA (LEFT) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group lg:pr-12"
            >
              {/* Main Image with modern frame */}
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] dark:shadow-emerald-950/40">
                <img
                  alt={dishes[0]?.DishName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  src={dishes[0]?.ImageUrl || "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&fit=crop"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
              </div>

              {/* Modern Card Overlay */}
              <div className="absolute -bottom-10 -right-6 lg:right-0 bg-white dark:bg-emerald-900 p-10 rounded-[2.5rem] shadow-2xl border border-emerald-50 dark:border-emerald-800 z-10 animate-float">
                <div className="flex flex-col items-center">
                  <span className="text-5xl font-serif font-black text-emerald-800 dark:text-emerald-300 mb-1">{dishes.length}+</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600/60 dark:text-emerald-400/60 whitespace-nowrap">Lựa chọn món kèm</span>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-10 -left-10 w-40 h-40 border-[20px] border-emerald-50 dark:border-emerald-800/20 rounded-full -z-10"></div>
            </motion.div>

            {/* CONTENT AREA (RIGHT) */}
            <div className="mt-16 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em] mb-4 block">
                  Thưởng Thức Trọn Vẹn
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 font-serif italic text-emerald-950 dark:text-emerald-50 leading-tight">
                  Tăng Thêm <span className="text-emerald-700 dark:text-emerald-400">Hương Vị</span> Cho Bát Phở
                </h2>
                <p className="text-emerald-800/70 dark:text-emerald-200/60 text-lg mb-12 font-light leading-relaxed max-w-lg">
                  Món kèm không chỉ là thức ăn thêm, đó là sự cân bằng tuyệt vời để tạo nên một trải nghiệm ẩm thực đúng điệu Hà Nội.
                </p>
              </motion.div>

              <div className="space-y-8">
                {dishes.slice(0, 3).map((dish, idx) => (
                  <motion.div
                    key={dish.DishID}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                      <img src={dish.ImageUrl || "https://images.unsplash.com/photo-1582878826629-29b7ad1c602d?w=200&fit=crop"} alt={dish.DishName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 border-b border-emerald-100 dark:border-emerald-800/40 pb-4">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-xl font-bold text-emerald-950 dark:text-emerald-50 font-serif mb-0 transition-colors group-hover:text-emerald-700">{dish.DishName}</h4>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">{dish.Price?.toLocaleString("vi-VN")} đ</span>
                      </div>
                      <p className="text-emerald-600/70 dark:text-emerald-400/50 text-sm italic font-light line-clamp-1">{dish.Description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>


            </div>

          </div>
        )}

      </div>
    </section>
  );
}
