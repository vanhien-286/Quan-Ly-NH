import React from "react";
// Import ảnh từ thư mục Desserts
import ChocolateDonut from "../../assets/images/Desserts/ChocolateDonut.jpg";
import Sundae from "../../assets/images/Desserts/Sundae.jpg";
import Pannacotta from "../../assets/images/Desserts/Pannacotta.jpg";

export default function Desserts() {
  const dessertList = [
    {
      id: 1,
      name: "Midnight Glaze",
      description: "Artisanal dark chocolate donut, gold leaf, sea salt caramel core.",
      price: "$14",
      image: ChocolateDonut,
      alt: "Chocolate Donut"
    },
    {
      id: 2,
      name: "Atelier Sundae",
      description: "Tahitian vanilla bean, candied pecans, house-made velvet fudge.",
      price: "$16",
      image: Sundae,
      alt: "Sundae"
    },
    {
      id: 3,
      name: "Silk Panna Cotta",
      description: "Infused with Madagascan vanilla, wild berry coulis, honeycomb.",
      price: "$15",
      image: Pannacotta,
      alt: "Pannacotta"
    }
  ];

  return (
    <section className="py-32 bg-stone-50 dark:bg-zinc-950 overflow-hidden" id="desserts">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20">
        <span className="font-sans text-amber-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
          Sweet Finale
        </span>
        <h2 className="text-4xl md:text-5xl font-bold font-['Noto_Serif'] mb-4 text-zinc-900 dark:text-zinc-50">
          The Final Act
        </h2>
        <div className="w-16 h-[2px] bg-amber-500 mx-auto mb-8"></div>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-['Noto_Serif'] italic text-lg">
          Indulge in artisanal desserts that balance architectural precision with playful sweetness.
        </p>
      </div>

      {/* DESSERTS GRID */}
      <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-0 overflow-x-auto pb-12 snap-x scrollbar-hide">
        {dessertList.map((dessert, index) => (
          <div 
            key={dessert.id} 
            className={`min-w-[85vw] md:min-w-0 snap-center bg-white dark:bg-zinc-900 relative group border-zinc-100 dark:border-zinc-800 ${index !== 2 ? 'md:border-r' : ''}`}
          >
            {/* Image Container */}
            <div className="aspect-square overflow-hidden relative">
              <img 
                alt={dessert.alt} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                src={dessert.image} 
              />
              {/* Overlay khi hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content Container */}
            <div className="p-10 transition-colors duration-500 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800/50">
              <h3 className="text-2xl font-['Noto_Serif'] mb-3 text-zinc-900 dark:text-zinc-50 group-hover:text-amber-600 transition-colors">
                {dessert.name}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-sans text-sm leading-relaxed mb-6 h-12">
                {dessert.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-amber-600 font-bold text-xl font-['Noto_Serif']">
                  {dessert.price}
                </span>
                <button className="text-[10px] uppercase tracking-widest font-bold border-b border-zinc-300 dark:border-zinc-700 pb-1 hover:border-amber-600 transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}