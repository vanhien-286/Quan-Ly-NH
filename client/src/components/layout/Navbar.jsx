// SỬA: Phải nhận cả 2 hàm onLoginClick và onRegisterClick
export default function Navbar({ onLoginClick, onRegisterClick }) {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-4 px-6 py-6 md:px-12">

        {/* Brand logo + section links */}
        <div className="flex items-center gap-12">
          <span className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 font-['Noto_Serif']">
            Culinary Atelier
          </span>
          <div className="hidden md:flex gap-8 text-base font-medium text-zinc-600 tracking-tight dark:text-zinc-400 font-['Noto_Serif']">
            <a className="border-b-2 border-amber-500 pb-1 text-amber-500 font-bold" href="#home">Home</a>
            <a className="transition-colors hover:text-amber-500" href="#dishes">Dishes</a>
            <a className="transition-colors hover:text-amber-500" href="#drinks">Drinks</a>
            <a className="transition-colors hover:text-amber-500" href="#desserts">Desserts</a>
            <a className="transition-colors hover:text-amber-500" href="#contact">Contact</a>
          </div>
        </div>

        {/* Auth actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onLoginClick}
            className="rounded-sm px-6 py-2 text-sm font-medium text-zinc-600 transition-all duration-200 hover:text-zinc-900 active:scale-95 dark:text-zinc-400"
            type="button"
          >
            Login
          </button>
          <button
            onClick={onRegisterClick}
            className="rounded-sm bg-black px-6 py-2 text-sm font-medium text-white transition-transform duration-200 active:scale-95"
            type="button"
          >
            Register
          </button>
        </div>

      </div>
    </nav>
  );
}