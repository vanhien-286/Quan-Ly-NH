export default function Contact() {
  return (
    <section className="py-32 bg-surface" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h2 className="text-4xl font-bold font-headline mb-12">Contact Us</h2>
          <div className="space-y-12">
            <div className="flex gap-6">
              <span className="material-symbols-outlined text-secondary text-3xl">location_on</span>
              <div>
                <h4 className="font-bold text-lg mb-2">The Atelier</h4>
                <address className="not-italic text-on-surface-variant leading-relaxed">
                  84 Gastronomy Lane<br />
                  Haute District, NY 10012
                </address>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="material-symbols-outlined text-secondary text-3xl">schedule</span>
              <div>
                <h4 className="font-bold text-lg mb-2">Service Hours</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Tues – Sat: 17:30 — 23:00<br />
                  Sunday: 12:00 — 16:00 (Brunch)
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <span className="material-symbols-outlined text-secondary text-3xl">contact_page</span>
              <div>
                <h4 className="font-bold text-lg mb-2">Get in Touch</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  +1 (212) 555-0984<br />
                  maitre@culinaryatelier.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-10 shadow-sm border border-outline-variant/10">
          <h3 className="text-2xl font-headline mb-8">Inquiry & Reservations</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Full Name</label>
              <input className="w-full bg-surface-container-highest/30 border-b border-outline-variant/20 focus:border-secondary outline-none py-3 px-0 transition-colors placeholder:text-zinc-400" placeholder="Jean Dupont" type="text" />
            </div>
            <div className="space-y-1">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Email Address</label>
              <input className="w-full bg-surface-container-highest/30 border-b border-outline-variant/20 focus:border-secondary outline-none py-3 px-0 transition-colors placeholder:text-zinc-400" placeholder="jean@example.com" type="email" />
            </div>
            <div className="space-y-1">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Message</label>
              <textarea className="w-full bg-surface-container-highest/30 border-b border-outline-variant/20 focus:border-secondary outline-none py-3 px-0 transition-colors placeholder:text-zinc-400" placeholder="Tell us about your occasion..." rows="4"></textarea>
            </div>
            <button className="w-full bg-primary text-on-primary py-4 rounded-sm font-semibold tracking-wide hover:bg-zinc-800 transition-colors">Send Inquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
}