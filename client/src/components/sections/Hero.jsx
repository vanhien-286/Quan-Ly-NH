export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden" id="home">
      <div className="absolute inset-0 z-0">
        <img alt="Artisanal food presentation" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass-panel p-12 md:p-16 border-l-4 border-secondary shadow-2xl">
          <span className="font-label text-secondary uppercase tracking-[0.2em] text-sm mb-4 block">Est. 1994</span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">Where Gastronomy Meets High Art</h1>
          <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed mb-10">
            Experience a curated dialogue between seasonal ingredients and avant-garde technique. Every plate is a deliberate masterpiece.
          </p>
          <div className="flex gap-6">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-sm font-semibold tracking-wide hover:opacity-90 transition-opacity">Reserve a Table</button>
            <button className="border-b-2 border-secondary text-on-surface font-semibold px-2 py-4 hover:bg-secondary/10 transition-colors">View Menu</button>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-end items-end text-white pb-12">
          <div className="text-right">
            <p className="text-sm font-label tracking-[0.3em] uppercase opacity-80 mb-2">Featured Tonight</p>
            <p className="text-3xl font-headline italic">Atlantic Monkfish with Saffron Emulsion</p>
          </div>
        </div>
      </div>
    </section>
  );
}