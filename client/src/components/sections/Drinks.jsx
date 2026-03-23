import React from "react";
// Lưu ý: Đảm bảo file ảnh nằm đúng trong src/assets/images/
// Sửa lại 3 dòng này:
import GoldenEmber from "../../assets/images/Drinks/GoldenEmber.jpg";


export default function Drinks() {
  return (
    <section className="signature-gradient py-32 text-zinc-900 dark:text-zinc-50" id="drinks">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          
          {/* PHẦN HÌNH ẢNH (BÊN TRÁI) */}
          <div className="order-2 md:order-1 relative group">
            {/* Khung ảnh chính */}
            <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-sm p-3 backdrop-blur-sm border border-zinc-200 dark:border-white/10 overflow-hidden shadow-2xl">
              <img 
                alt="Golden Ember Cocktail" 
                className="w-full h-full object-cover grayscale-[10%] brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                src={GoldenEmber} 
              />
            </div>

            {/* Thẻ con số 500+ (Điểm nhấn) */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-amber-600 p-6 shadow-[0_20px_50px_rgba(217,119,6,0.3)] hidden md:flex flex-col justify-center items-center text-center">
              <span className="text-white font-['Noto_Serif'] text-4xl font-bold tracking-tighter">500+</span>
              <span className="text-amber-100 font-sans text-[10px] uppercase tracking-[0.2em] mt-2 font-medium">Vintages in Cellar</span>
            </div>
          </div>

          {/* PHẦN NỘI DUNG (BÊN PHẢI) */}
          <div className="order-1 md:order-2">
            <span className="font-sans text-amber-600 uppercase tracking-[0.3em] text-xs mb-4 block font-bold">
              Signature Experience
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-['Noto_Serif'] leading-tight tracking-tighter">
              The Golden Ember
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-12 font-['Noto_Serif'] italic">
              "A symphony of smoke and honey." Our mixologists have crafted the Golden Ember to mirror the warmth of a setting sun, using aged bourbon infused with rare botanical resins.
            </p>

            <ul className="space-y-10">
              {/* Item 1 */}
              <li className="flex items-start gap-5 group">
                <span className="material-symbols-outlined text-amber-600 text-3xl transition-transform group-hover:rotate-12">
                  local_fire_department
                </span>
                <div>
                  <h4 className="font-bold text-xl mb-1 font-['Noto_Serif']">Smoked Oak Finish</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    Infused with toasted cedar smoke, providing a deep, resonant base for our signature pour.
                  </p>
                </div>
              </li>

              {/* Item 2 */}
              <li className="flex items-start gap-5 group">
                <span className="material-symbols-outlined text-amber-600 text-3xl transition-transform group-hover:rotate-12">
                  honey_ads
                </span>
                <div>
                  <h4 className="font-bold text-xl mb-1 font-['Noto_Serif']">Wildflower Nectar</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    Delicate sweetness sourced from local highland apiaries to balance the bold spirits.
                  </p>
                </div>
              </li>

              {/* Item 3 */}
              <li className="flex items-start gap-5 group">
                <span className="material-symbols-outlined text-amber-600 text-3xl transition-transform group-hover:rotate-12">
                  liquor
                </span>
                <div>
                  <h4 className="font-bold text-xl mb-1 font-['Noto_Serif']">Aged Reserve</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    A curated blend of 12-year reserve spirits, exclusively bottled for Culinary Atelier.
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}