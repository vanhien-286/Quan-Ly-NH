import React from "react";

export default function Articles() {
  const articleList = [
    {
      id: 1,
      title: "Linh Hồn Tô Phở Bò",
      description: "Phở bò là tinh hoa ẩm thực Hà Nội, với nước dùng được sắc từ xương bò, hành, gừng lâu ngày.",
      content: "Linh hồn tô phở bò nằm ở cách sắc nước dùng. Khi nước sôi, các đặc chất từ xương bò từ từ hòa tan tạo thành nước dùng ngọt ngào, bao trùm từng sợi bánh.",
      image: "https://images.unsplash.com/photo-1582878826629-29b7ad1c602d?w=400&h=300&fit=crop",
      alt: "Phở Bò"
    },
    {
      id: 2,
      title: "Linh Hồn Tô Phở Gà",
      description: "Phở gà mềm mại, thanh nhẹ, là lựa chọn hoàn hảo cho những ai yêu vị ngọt ngào nhẹ nhàng.",
      content: "Nước dùng phở gà được sắc từ gà công nghiệp, thêm thảo mộc như sâm, nhung hươu tạo nên vị thanh mát độc đáo. Mỗi tô phở gà là một chữa lành.",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
      alt: "Phở Gà"
    },
    {
      id: 3,
      title: "Linh Hồn Tô Phở Đặc Biệt",
      description: "Phở đặc biệt kết hợp cả thịt bò tái và nạm, tạo nên độ phong phú về hương vị cực độc đáo.",
      content: "Tô phở đặc biệt là sự giao quyện giữa bánh mềm mại, thịt bò xơ mỏng lung linh, và nước dùng sâu sắc. Đó là tâm điểm của ẩm thực phố phường Hà Nội.",
      image: "https://images.unsplash.com/photo-1591814468924-caf68b4ac5e0?w=400&h=300&fit=crop",
      alt: "Phở Đặc Biệt"
    }
  ];

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
      <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-0 overflow-x-auto pb-12 snap-x scrollbar-hide">
        {articleList.map((article, index) => (
          <div 
            key={article.id} 
            className={`min-w-[85vw] md:min-w-0 snap-center bg-white dark:bg-emerald-900 relative group border-emerald-200 dark:border-emerald-800 ${index !== 2 ? 'md:border-r' : ''}`}
          >
            {/* Image Container */}
            <div className="aspect-square overflow-hidden relative">
              <img 
                alt={article.alt} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                src={article.image} 
              />
              {/* Overlay khi hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content Container */}
            <div className="p-10 transition-colors duration-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-800/50">
              <h3 className="text-2xl font-['Noto_Serif'] mb-3 text-emerald-950 dark:text-emerald-50 group-hover:text-emerald-700 transition-colors">
                {article.title}
              </h3>
              <p className="text-emerald-700 dark:text-emerald-300 font-sans text-sm leading-relaxed mb-6 h-12">
                {article.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-emerald-700 font-bold text-lg font-['Noto_Serif']">
                  Bài Viết
                </span>
                <button className="text-[10px] uppercase tracking-widest font-bold border-b border-emerald-300 dark:border-emerald-700 pb-1 hover:border-emerald-700 transition-colors text-emerald-700 dark:text-emerald-400">
                  Đọc Tiếp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
