export default function Desserts() {
  return (
    <section className="py-32 bg-surface-container-low overflow-hidden" id="desserts">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4">The Final Act</h2>
        <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        <p className="text-on-surface-variant max-w-2xl mx-auto font-body text-lg">Indulge in artisanal desserts that balance architectural precision with playful sweetness.</p>
      </div>
      <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-0 overflow-x-auto pb-12 snap-x">
        <div className="min-w-[80vw] md:min-w-0 snap-center bg-surface relative group">
          <div className="aspect-square overflow-hidden">
            <img alt="Chocolate Ganache" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop" />
          </div>
          <div className="p-8 border-r border-outline-variant/10">
            <h3 className="text-2xl font-headline mb-2">Midnight Cocoa</h3>
            <p className="text-on-surface-variant font-body mb-4">70% Tanzanian chocolate, sea salt caramel, edible gold.</p>
            <span className="text-secondary font-bold text-lg">$18</span>
          </div>
        </div>
        <div className="min-w-[80vw] md:min-w-0 snap-center bg-surface relative group">
          <div className="aspect-square overflow-hidden">
            <img alt="Berry Tart" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop" />
          </div>
          <div className="p-8 border-r border-outline-variant/10">
            <h3 className="text-2xl font-headline mb-2">Summer Solstice</h3>
            <p className="text-on-surface-variant font-body mb-4">Macerated wild berries, yuzu curd, honeycomb brittle.</p>
            <span className="text-secondary font-bold text-lg">$16</span>
          </div>
        </div>
        <div className="min-w-[80vw] md:min-w-0 snap-center bg-surface relative group">
          <div className="aspect-square overflow-hidden">
            <img alt="Pistachio Souffle" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=2027&auto=format&fit=crop" />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-headline mb-2">Velvet Pistachio</h3>
            <p className="text-on-surface-variant font-body mb-4">Warm soufflé, Sicilian pistachio cream, white peach sorbet.</p>
            <span className="text-secondary font-bold text-lg">$22</span>
          </div>
        </div>
      </div>
    </section>
  );
}