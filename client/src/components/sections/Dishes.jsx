import React from "react";
import { motion } from "framer-motion";
import BlackGoldWagyu from "../../assets/images/dishes/Black Gold Wagyu.avif";
import CapreseSalad from "../../assets/images/dishes/Caprese Salad.jpg";
import NordicSalmon from "../../assets/images/dishes/Nordic Salmon.jpg";
import WagyuShortRibs from "../../assets/images/dishes/Wagyu Short Ribs.jpg";

export default function Dishes() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-32 bg-[#fcfcfc] dark:bg-zinc-950 overflow-hidden" id="dishes">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        
        {/* HEADER SECTION - Tinh giản và nghệ thuật hơn */}
        <div className="flex flex-col mb-20">
          <motion.span variants={itemVariants} className="font-sans text-amber-600 uppercase tracking-[0.4em] text-[10px] font-bold mb-4">
            Curated Gastronomy
          </motion.span>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-light font-['Noto_Serif'] text-zinc-900 dark:text-zinc-50 tracking-tighter">
              Signature <span className="italic">Entrées</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-md text-zinc-500 dark:text-zinc-400 font-['Noto_Serif'] leading-relaxed border-l border-amber-200 dark:border-zinc-800 pl-6">
              A symphony of seasonal textures and avant-garde techniques, composed daily by our culinary ensemble.
            </motion.p>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Món chính nổi bật (Hero Card) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 group cursor-pointer">
            <div className="relative overflow-hidden aspect-[14/10] bg-zinc-100 dark:bg-zinc-900">
              <img 
                alt="Imperial Wagyu Ribs" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                src={WagyuShortRibs} 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-8 left-8">
                 <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-4 py-1 text-[10px] uppercase tracking-widest font-bold text-zinc-900 dark:text-zinc-100">
                   Chef's Recommendation
                 </span>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-baseline">
              <div>
                <h3 className="text-3xl font-['Noto_Serif'] text-zinc-900 dark:text-zinc-50 mb-2">Imperial Wagyu Ribs</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-sans tracking-wide">45-day dry-aged beef, charred leeks, truffle marrow jus.</p>
              </div>
              <p className="text-2xl font-light text-amber-600 font-['Noto_Serif']">$68</p>
            </div>
          </motion.div>

          {/* Side List - Chuyển sang phong cách tối giản (Minimalist) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            {[
              { img: NordicSalmon, title: "Nordic Salmon", desc: "Beetroot cure, dill oil, horseradish cream", price: "$42" },
              { img: CapreseSalad, title: "Garden Mosaic", desc: "Heritage tomatoes, buffalo mozzarella, basil air", price: "$28" },
              { img: BlackGoldWagyu, title: "Black Gold Wagyu", desc: "Aged parmesan, winter black truffle, gold leaf", price: "$54" }
            ].map((dish, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group flex items-center gap-8 pb-8 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
              >
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800">
                  <img 
                    alt={dish.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    src={dish.img} 
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-lg font-['Noto_Serif'] text-zinc-900 dark:text-zinc-50 group-hover:text-amber-600 transition-colors">{dish.title}</h4>
                    <span className="h-[1px] flex-grow mx-4 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-amber-100 transition-colors"></span>
                    <span className="text-zinc-900 dark:text-zinc-50 font-medium font-['Noto_Serif']">{dish.price}</span>
                  </div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider leading-relaxed">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
            
            <motion.div variants={itemVariants} className="pt-4">
               <button className="w-full py-4 border border-zinc-900 dark:border-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-300">
                 Explore Full Menu
               </button>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}