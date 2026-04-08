import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDrinks();
  }, []);

  const fetchDrinks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/admin/dishes/public");

      if (response.data.data && response.data.data.length > 0) {
        const drinkDishes = response.data.data
          .filter(dish =>
            dish.IsVisible !== false &&
            dish.Category &&
            dish.Category.toLowerCase() === "nước uống"
          )
          .sort((a, b) => (b.Featured ? 1 : 0) - (a.Featured ? 1 : 0));
        setDrinks(drinkDishes);
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
      <section className="py-32 bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900" id="drinks">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-amber-700">Đang tải...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 overflow-hidden" id="drinks">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* HEADER */}
        <div className="text-center mb-20">
          <span className="font-sans text-amber-700 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            Thức Uống
          </span>
          <h2 className="text-5xl md:text-7xl font-bold font-serif mb-6 text-amber-950 dark:text-amber-50 leading-tight">
            Đồ Uống Đặc Biệt
          </h2>
          <div className="w-24 h-[1px] bg-amber-500 mx-auto mb-8 opacity-50"></div>
          <p className="text-amber-700 dark:text-amber-300 max-w-3xl mx-auto font-serif italic text-2xl leading-relaxed">
            Các thức uống được chọn lọc kỹ lưỡng để kết hợp hoàn hảo với từng tô phở.
          </p>
        </div>

        {/* DRINKS GRID */}
        {drinks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drinks.map((drink) => (
              <div
                key={drink.DishID}
                className="group bg-white dark:bg-amber-900/50 rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-amber-200 dark:border-amber-800"
              >
                {/* Image */}
                <div className="h-56 bg-gradient-to-br from-amber-600 to-amber-800 overflow-hidden relative">
                  {drink.ImageUrl ? (
                    <img
                      src={drink.ImageUrl}
                      alt={drink.DishName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-7xl opacity-80">
                        local_cafe
                      </span>
                    </div>
                  )}
                  {drink.Featured && (
                    <div className="absolute top-4 left-4 z-10 flex flex-col items-center">
                      <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.1em] shadow-[0_5px_15px_rgba(234,179,8,0.4)] flex items-center gap-1.5">
                        ⭐ NỔI BẬT
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-50 mb-2">
                    {drink.DishName}
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed mb-4 line-clamp-2">
                    {drink.Description || "Thức uống chất lượng cao"}
                  </p>
                  <div className="flex items-center justify-between border-t border-amber-200 dark:border-amber-800 pt-4">
                    <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                      {drink.Price?.toLocaleString("vi-VN")} ₫
                    </span>
                    <button className="px-4 py-2 bg-amber-700 dark:bg-amber-600 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-amber-800 dark:hover:bg-amber-700 transition-colors">
                      Đặt Ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-amber-300 text-6xl mb-4 block">
              local_cafe
            </span>
            <p className="text-amber-700 text-lg">
              {error || "Chưa có đồ uống trong danh mục. Hãy thêm từ trang quản lý!"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
