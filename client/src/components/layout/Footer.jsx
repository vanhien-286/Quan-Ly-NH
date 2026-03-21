export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 font-['Manrope'] text-sm text-zinc-400 tracking-wide">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row md:px-12">
        {/* Branding and copyright */}
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <span className="block mb-2 text-amber-500 text-lg font-serif">Culinary Atelier</span>
          <p>© 2024 Culinary Atelier. All rights reserved.</p>
        </div>

        {/* Policy links */}
        <div className="flex gap-8 mb-8 md:mb-0">
          <a className="transition-colors hover:text-amber-400 hover:underline underline-offset-4" href="#">Privacy Policy</a>
          <a className="transition-colors hover:text-amber-400 hover:underline underline-offset-4" href="#">Terms of Service</a>
          <a className="transition-colors hover:text-amber-400 hover:underline underline-offset-4" href="#">Accessibility</a>
        </div>

        {/* Social icons */}
        <div className="flex gap-6">
          <a className="text-zinc-500 transition-colors hover:text-amber-400" href="#" aria-label="Instagram">
            <span className="material-symbols-outlined">camera</span>
          </a>
          <a className="text-zinc-500 transition-colors hover:text-amber-400" href="#" aria-label="Social Leaderboard">
            <span className="material-symbols-outlined">social_leaderboard</span>
          </a>
          <a className="text-zinc-500 transition-colors hover:text-amber-400" href="#" aria-label="Restaurant">
            <span className="material-symbols-outlined">restaurant</span>
          </a>
        </div>
      </div>
    </footer>
  );
}