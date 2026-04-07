import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.log("Raw dishes:", response.data.data);
      
      if (response.data.data && response.data.data.length > 0) {
        // Filter by category "Sides" (case-insensitive)
        const sidesDishes = response.data.data.filter(dish => 
          dish.IsVisible !== false && 
          dish.Category && 
          dish.Category.toLowerCase() === "sides"
        );
        console.log("Filtered Sides dishes:", sidesDishes);
        setDishes(sidesDishes);
        
        // If no dishes found, show all visible dishes for debugging
        if (sidesDishes.length === 0) {
          console.warn("Không tìm thấy sản phẩm Category=Sides, tất cả categories:", 
            response.data.data.map(d => d.Category));
        }
      } else {
        setError("Không có dữ liệu sản phẩm");
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách đồ uống:", err.message);
      setError(`Lỗi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-32 bg-gradient-to-b from-emerald-100 to-emerald-50 dark:from-emerald-900 dark:to-emerald-950" id="sides">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-emerald-700">Đang tải...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="signature-gradient bg-gradient-to-b from-emerald-100 to-emerald-50 dark:from-emerald-900 dark:to-emerald-950 py-32 text-emerald-950 dark:text-emerald-50" id="sides">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {dishes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            
            {/* PHẦN HÌNH ẢNH (BÊN TRÁI) */}
            <div className="order-2 md:order-1 relative group">
              {/* Khung ảnh chính */}
              <div className="aspect-[4/5] bg-emerald-100 dark:bg-emerald-800 rounded-sm p-3 overflow-hidden shadow-2xl border border-emerald-300 dark:border-emerald-700">
                <img 
                  alt={dishes[0]?.DishName || "Đồ Uống"} 
                  className="w-full h-full object-cover grayscale-[10%] brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  src={dishes[0]?.ImageUrl || "https://images.unsplash.com/photo-1585518419759-49bceff2a8ad?w=500&h=600&fit=crop"}
                />
              </div>

              {/* Thẻ con số */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-700 p-6 shadow-[0_20px_50px_rgba(16,185,129,0.3)] hidden md:flex flex-col justify-center items-center text-center">
                <span className="text-white font-['Noto_Serif'] text-4xl font-bold">{dishes.length}+</span>
                <span className="text-emerald-100 font-sans text-[10px] uppercase tracking-[0.2em] mt-2">Loại Đồ Uống</span>
              </div>
            </div>

            {/* PHẦN NỘI DUNG (BÊN PHẢI) */}
            <div className="order-1 md:order-2">
              <span className="font-sans text-emerald-700 uppercase tracking-[0.3em] text-xs mb-4 block font-bold">
                Thêm Phục Vụ Kèm
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 font-['Noto_Serif'] leading-tight">
                {dishes[0]?.DishName || "Đồ Uống Đặc Biệt"}
              </h2>
              <p className="text-emerald-700 dark:text-emerald-300 text-lg leading-relaxed mb-12 font-['Noto_Serif'] italic">
                {dishes[0]?.Description || "Các thức uống được chọn lọc kỹ lưỡng để kết hợp với từng tô phở, mang lại hương vị tuyệt vời nhất."}
              </p>

              <ul className="space-y-6">
                {dishes.slice(1, 4).map((dish) => (
                  <li key={dish.DishID} className="flex items-start gap-5 group">
                    {dish.ImageUrl ? (
                      <img 
                        src={dish.ImageUrl} 
                        alt={dish.DishName}
                        className="flex-shrink-0 w-16 h-16 rounded-sm object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-emerald-700 text-3xl flex-shrink-0">
                        local_cafe
                      </span>
                    )}
                    <div>
                      <h4 className="font-bold text-xl mb-1 font-['Noto_Serif']">{dish.DishName}</h4>
                      <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                        {dish.Description}
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-300 font-bold mt-2">
                        {dish.Price?.toLocaleString("vi-VN")} ₫
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}

        {dishes.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-emerald-700 text-lg">Chưa có sản phẩm trong danh mục này. Hãy thêm từ admin panel!</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        )}
      </div>
    </section>
  );
}
