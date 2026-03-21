export default function Dishes() {
  return (
    <section className="py-32 bg-surface" id="dishes">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Signature Dishes</h2>
            <p className="text-on-surface-variant font-body text-lg">Our culinary team translates nature's seasonal bounty into a sensory journey across three distinct movements.</p>
          </div>
          <div className="hidden md:block h-[1px] flex-grow mx-12 bg-outline-variant/30 mb-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 bg-surface-container-low p-8 group overflow-hidden relative">
            <div className="mb-8 overflow-hidden h-96">
              <img alt="Smoked Wagyu Beef" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-headline mb-2">Heritage Wagyu</h3>
                <p className="text-on-surface-variant font-body">45-day dry-aged beef, charred leeks, truffle marrow jus.</p>
              </div>
              <span className="text-secondary font-headline text-xl">$68</span>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="bg-surface-container-low p-6 flex gap-6 items-center">
              <img alt="Seared Salmon" className="w-32 h-32 object-cover rounded-sm" src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974&auto=format&fit=crop" />
              <div>
                <h3 className="text-xl font-headline mb-1">Nordic Salmon</h3>
                <p className="text-sm text-on-surface-variant mb-2">Beetroot cure, dill oil, horseradish cream.</p>
                <span className="text-secondary font-bold">$42</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 flex gap-6 items-center">
              <img alt="Heirloom Tomato Salad" className="w-32 h-32 object-cover rounded-sm" src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1969&auto=format&fit=crop" />
              <div>
                <h3 className="text-xl font-headline mb-1">Garden Mosaic</h3>
                <p className="text-sm text-on-surface-variant mb-2">Heritage tomatoes, buffalo mozzarella, basil air.</p>
                <span className="text-secondary font-bold">$28</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 flex gap-6 items-center">
              <img alt="Truffle Risotto" className="w-32 h-32 object-cover rounded-sm" src="https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?q=80&w=2070&auto=format&fit=crop" />
              <div>
                <h3 className="text-xl font-headline mb-1">Black Gold</h3>
                <p className="text-sm text-on-surface-variant mb-2">Arborio rice, aged parmesan, winter black truffle.</p>
                <span className="text-secondary font-bold">$54</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}