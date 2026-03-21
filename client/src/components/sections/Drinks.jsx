export default function Drinks() {
  return (
    <section className="signature-gradient py-32 text-on-primary" id="drinks">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="aspect-[4/5] bg-surface-container-high/10 rounded-sm p-4 backdrop-blur-sm border border-white/5">
              <img alt="Wine Cellar" className="w-full h-full object-cover grayscale-[20%] brightness-90" src="https://images.unsplash.com/photo-1582842195329-8800201460c3?q=80&w=1974&auto=format&fit=crop" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary-container p-6 shadow-2xl hidden md:flex flex-col justify-center items-center text-center">
              <span className="text-on-secondary-container font-headline text-4xl font-bold">500+</span>
              <span className="text-on-secondary-container font-label text-xs uppercase tracking-widest mt-2">Vintages in Cellar</span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="font-label text-secondary uppercase tracking-[0.2em] text-sm mb-4 block">The Sommelier's Selection</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-headline leading-tight">Liquid Poetry</h2>
            <p className="text-on-primary-container text-lg leading-relaxed mb-12">
              From rare Old World vintages to avant-garde mixology, our beverage program is designed to elevate and echo the complex flavors of the kitchen.
            </p>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">wine_bar</span>
                <div>
                  <h4 className="font-bold text-xl mb-1">Estate Vintages</h4>
                  <p className="text-on-primary-container text-sm">Curated selection from family-run vineyards in Bordeaux and Tuscany.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">local_bar</span>
                <div>
                  <h4 className="font-bold text-xl mb-1">Botanical Infusions</h4>
                  <p className="text-on-primary-container text-sm">House-distilled cordials and seasonal shrubs for modern cocktails.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">coffee</span>
                <div>
                  <h4 className="font-bold text-xl mb-1">Artisan Roasts</h4>
                  <p className="text-on-primary-container text-sm">Single-origin beans roasted specifically for our espresso service.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}