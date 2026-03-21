export default function Navbar({ onLoginClick, onRegisterClick, user, onLogout }) {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-6 py-6 md:px-12">
        
        <div className="flex items-center gap-12">
          <span className="text-2xl font-bold text-zinc-900 font-['Noto_Serif']">Culinary Atelier</span>
          {/* Link menu giữ nguyên... */}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            // NẾU ĐÃ ĐĂNG NHẬP
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-amber-600">
                Hi, <span className="italic font-bold">{user.fullName}</span>
              </span>
              <button
                onClick={onLogout}
                className="rounded-sm border border-zinc-300 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            // NẾU CHƯA ĐĂNG NHẬP
            <>
              <button onClick={onLoginClick} className="px-6 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900">
                Login
              </button>
              <button onClick={onRegisterClick} className="rounded-sm bg-black px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}