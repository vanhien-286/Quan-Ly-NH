export default function Footer() {
  return (
    <footer className="border-t border-emerald-800 bg-emerald-950 font-['Manrope'] text-sm text-emerald-400 tracking-wide">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row md:px-12">
        {/* Branding and copyright */}
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <span className="block mb-2 text-emerald-400 text-lg font-serif">Nhà Phở Hà Nội</span>
          <p>© 2024 Nhà Phở Hà Nội. Tất cả các quyền được bảo lưu.</p>
        </div>

        {/* Policy links */}
        <div className="flex gap-8 mb-8 md:mb-0">
          <a className="transition-colors hover:text-emerald-300 hover:underline underline-offset-4" href="#">Chính Sách Bảo Mật</a>
          <a className="transition-colors hover:text-emerald-300 hover:underline underline-offset-4" href="#">Điều Khoản Dịch Vụ</a>
          <a className="transition-colors hover:text-emerald-300 hover:underline underline-offset-4" href="#">Khả Năng Truy Cập</a>
        </div>

        {/* Social icons */}
        <div className="flex gap-6">
          <a className="text-emerald-600 transition-colors hover:text-emerald-400" href="#" aria-label="Instagram">
            <span className="material-symbols-outlined">camera</span>
          </a>
          <a className="text-emerald-600 transition-colors hover:text-emerald-400" href="#" aria-label="Social Leaderboard">
            <span className="material-symbols-outlined">social_leaderboard</span>
          </a>
          <a className="text-emerald-600 transition-colors hover:text-emerald-400" href="#" aria-label="Restaurant">
            <span className="material-symbols-outlined">restaurant</span>
          </a>
        </div>
      </div>
    </footer>
  );
}