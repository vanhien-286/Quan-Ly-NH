import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fallback data when database is empty
  const defaultArticles = [
    {
      ArticleID: 1,
      Title: "Linh Hồn Tô Phở Bò",
      Summary: "Phở bò là tinh hoa ẩm thực Hà Nội, với nước dùng được sắc từ xương bò, hành, gừng lâu ngày.",
      ImageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1c602d?w=400&h=300&fit=crop",
    },
    {
      ArticleID: 2,
      Title: "Linh Hồn Tô Phở Gà",
      Summary: "Phở gà mềm mại, thanh nhẹ, là lựa chọn hoàn hảo cho những ai yêu vị ngọt ngào nhẹ nhàng.",
      ImageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
    },
    {
      ArticleID: 3,
      Title: "Linh Hồn Tô Phở Đặc Biệt",
      Summary: "Phở đặc biệt kết hợp cả thịt bò tái và nạm, tạo nên độ phong phú về hương vị cực độc đáo.",
      ImageUrl: "https://images.unsplash.com/photo-1591814468924-caf68b4ac5e0?w=400&h=300&fit=crop",
    }
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/articles/public");
      
      if (response.data.data && response.data.data.length > 0) {
        const dbArticles = response.data.data.filter(article => article.IsVisible !== false);
        
        if (dbArticles.length > 0) {
          setArticles(dbArticles.slice(0, 3)); 
        } else {
          setArticles(defaultArticles);
        }
      } else {
        setArticles(defaultArticles);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách bài viết:", err.message);
      setArticles(defaultArticles); // Dùng fallback nếu lỗi
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 bg-emerald-50 dark:bg-emerald-950 overflow-hidden" id="articles">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20">
        <span className="font-sans text-emerald-700 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
          Khám Phá Phở
        </span>
        <h2 className="text-4xl md:text-5xl font-bold font-['Noto_Serif'] mb-4 text-emerald-950 dark:text-emerald-100">
          Linh Hồn Của Từng Tô Phở
        </h2>
        <div className="w-16 h-[2px] bg-emerald-500 mx-auto mb-8"></div>
        <p className="text-emerald-700 dark:text-emerald-300 max-w-2xl mx-auto font-['Noto_Serif'] italic text-lg">
          Mỗi tô phở là một câu chuyện, một khoảnh khắc, một nối liền giữa quá khứ và hiện tại.
        </p>
      </div>

      {/* ARTICLES GRID */}
      {loading ? (
        <div className="text-center py-10">
           <p className="text-emerald-700">Đang tải...</p>
        </div>
      ) : (
        <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-0 overflow-x-auto pb-12 snap-x scrollbar-hide">
          {articles.map((article, index) => (
            <div 
              key={article.ArticleID} 
              className={`min-w-[85vw] md:min-w-0 snap-center bg-white dark:bg-emerald-900 relative group border-emerald-200 dark:border-emerald-800 ${index !== 2 ? 'md:border-r' : ''}`}
            >
              {/* Image Container */}
              <div className="aspect-square overflow-hidden relative">
                <img 
                  alt={article.Title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                  src={article.ImageUrl || "https://images.unsplash.com/photo-1582878826629-29b7ad1c602d?w=400&h=300&fit=crop"} 
                />
                {/* Overlay khi hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Container */}
              <div className="p-10 transition-colors duration-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-800/50">
                <h3 className="text-2xl font-['Noto_Serif'] mb-3 text-emerald-950 dark:text-emerald-50 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {article.Title}
                </h3>
                <p className="text-emerald-700 dark:text-emerald-300 font-sans text-sm leading-relaxed mb-6 line-clamp-3 h-16">
                  {article.Summary}
                </p>
                <div className="text-right mt-4">
                  <button 
                    onClick={() => navigate(`/article/${article.ArticleID}`)}
                    className="text-[10px] uppercase tracking-widest font-bold border-b border-emerald-300 dark:border-emerald-700 pb-1 hover:border-emerald-700 transition-colors text-emerald-700 dark:text-emerald-400"
                  >
                    Đọc Tiếp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
