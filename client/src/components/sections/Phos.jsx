import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.log("Fetching dishes from: http://localhost:5000/api/admin/dishes/public");
      const response = await axios.get("http://localhost:5000/api/admin/dishes/public");
      console.log("Response:", response.data);
      if (response.data.data && response.data.data.length > 0) {
        setDishes(response.data.data);
        console.log("Dishes loaded:", response.data.data);
      } else {
        console.warn("No data returned");
        setError("Không có dữ liệu sản phẩm");
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách phở:", err.message);
      setError(`Lỗi: ${err.message}. Kiểm tra backend có chạy không?`);
    } finally {
      setLoading(false);
    }
  };

  // Lấy sản phẩm visible từ category "Phở" (giới hạn 4 sản phẩm)
  const visibleDishes = dishes
    .filter(dish => (dish.IsVisible !== undefined ? dish.IsVisible : true) && (dish.Category === "Phở" || !dish.Category))
    .slice(0, 4);
  
  // Lấy sản phẩm featured (bestseller) từ những sản phẩm visible
  const featuredDish = visibleDishes.find(dish => dish.Featured) || visibleDishes[0] || null;
  // Lấy 3 sản phẩm tiếp theo (không phải featured) để hiển thị bên phải
  const rightDishes = visibleDishes.filter(dish => dish.DishID !== featuredDish?.DishID).slice(0, 3);

  if (loading) {
    return (
      <section className="py-32 bg-emerald-50 dark:bg-emerald-950" id="phos">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-emerald-700 dark:text-emerald-300">Đang tải...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-32 bg-emerald-50 dark:bg-emerald-950" id="phos">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="text-red-600 dark:text-red-400 text-lg font-bold mb-4">{error}</p>
          <button 
            onClick={fetchDishes}
            className="px-6 py-2 bg-emerald-700 text-white rounded-sm hover:bg-emerald-800"
          >
            Thử lại
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-emerald-50 dark:bg-emerald-950 overflow-hidden" id="phos">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* HEADER */}
        <div className="text-center mb-20">
          <span className="font-sans text-emerald-700 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
            Những Loại Phở
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-['Noto_Serif'] mb-4 text-emerald-950 dark:text-emerald-50">
            Các Loại Phở Đặc Trưng
          </h2>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mb-8"></div>
          <p className="text-emerald-700 dark:text-emerald-300 max-w-2xl mx-auto font-['Noto_Serif'] italic text-lg">
            Mỗi tô phở là một tác phẩm nghệ thuật được tạo ra với tình yêu và sự tôn trọng đối với truyền thống Hà Nội.
          </p>
        </div>

        {/* FEATURED & LIST LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* BÊN TRÁI: SẢN PHẨM NỎI BẬT (BESTSELLER) */}
          {featuredDish && (
            <div className="lg:col-span-2 h-full">
              <div className="group h-full bg-white dark:bg-emerald-900 rounded-sm shadow-2xl overflow-hidden border border-emerald-200 dark:border-emerald-800 hover:shadow-3xl transition-all duration-300 flex flex-col">
                
                {/* FEATURED IMAGE AREA */}
                <div className="h-96 bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center group-hover:from-emerald-600 group-hover:to-emerald-800 transition-all duration-300 relative overflow-hidden">
                  {featuredDish.ImageUrl ? (
                    <img 
                      src={featuredDish.ImageUrl} 
                      alt={featuredDish.DishName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-white text-8xl opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      restaurant
                    </span>
                  )}
                  {/* BADGE */}
                  <div className="absolute top-4 right-4 bg-rose-500 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    ⭐ NỔI BẬT
                  </div>
                </div>

                {/* FEATURED CONTENT */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl font-['Noto_Serif'] font-bold text-emerald-950 dark:text-emerald-50 mb-4 leading-tight">
                      {featuredDish.DishName}
                    </h3>
                    <p className="text-emerald-700 dark:text-emerald-300 text-base leading-relaxed mb-8 font-['Noto_Serif']">
                      {featuredDish.Description || "Một sản phẩm đặc biệt được chọn lọc kỹ lưỡng."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-emerald-200 dark:border-emerald-800 pt-6">
                    <span className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                      {featuredDish.Price?.toLocaleString("vi-VN")} ₫
                    </span>
                    <button className="px-6 py-3 bg-emerald-700 dark:bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-sm hover:bg-emerald-800 dark:hover:bg-emerald-700 transition-colors">
                      Đặt Ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BÊN PHẢI: DANH SÁCH CÁC SẢN PHẨM (CHIỀU DỌC) */}
          <div className="lg:col-span-3 flex flex-col gap-4 h-full">
            {rightDishes.length > 0 ? (
              rightDishes.map((dish, index) => (
                <div
                  key={dish.DishID}
                  className="group flex-1 bg-white dark:bg-emerald-900 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-emerald-200 dark:border-emerald-800 flex items-center gap-6 p-7"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-28 h-28 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-sm flex items-center justify-center group-hover:from-emerald-600 group-hover:to-emerald-800 transition-all overflow-hidden">
                    {dish.ImageUrl ? (
                      <img 
                        src={dish.ImageUrl} 
                        alt={dish.DishName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-white text-6xl">
                        {index === 0 ? "set_meal" : index === 1 ? "lunch_dining" : "ramen_dining"}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h4 className="text-xl font-['Noto_Serif'] font-bold text-emerald-950 dark:text-emerald-50 mb-2">
                      {dish.DishName}
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed mb-3 font-['Noto_Serif'] line-clamp-2">
                      {dish.Description || "Sản phẩm chất lượng cao"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                        {dish.Price?.toLocaleString("vi-VN")} ₫
                      </span>
                      <button className="px-4 py-2 bg-emerald-700 dark:bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-emerald-800 dark:hover:bg-emerald-700 transition-colors">
                        Chọn
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-emerald-700 dark:text-emerald-300 text-lg">
                  Không có sản phẩm
                </p>
              </div>
            )}
          </div>

        </div>

        {/* SPECIAL NOTE */}
        <div className="mt-20 text-center">
          <p className="text-emerald-700 dark:text-emerald-300 font-['Noto_Serif'] italic text-lg max-w-2xl mx-auto">
            "Phở là không chỉ là một món ăn, nó là một phần của linh hồn Hà Nội."
          </p>
        </div>
      </div>
    </section>
  );
}
