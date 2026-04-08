import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onLoginClick, onRegisterClick, user, onLogout }) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'phos', label: 'Nhà Phở' },
    { id: 'sides', label: 'Món Kèm' },
    { id: 'drinks', label: 'Thức Uống' },
    { id: 'articles', label: 'Bài Viết' },
    { id: 'contact', label: 'Liên Hệ' }
  ];
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-emerald-200 bg-emerald-50/95 backdrop-blur-md dark:bg-emerald-950/90 dark:border-emerald-900 shadow-md">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-4 px-6 py-5 md:px-12">

        <div className="flex items-center gap-12">
          <span
            className="text-3xl font-black tracking-tighter text-emerald-900 dark:text-emerald-50 font-serif cursor-pointer"
            onClick={() => navigate('/')}
          >
            NHÀ PHỞ
          </span>
          <div className="hidden md:flex gap-10 text-xl font-bold text-emerald-700 tracking-tight dark:text-emerald-300 font-serif">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                spy={true}           // Tự động theo dõi vị trí cuộn
                smooth={true}        // Cuộn mượt mà
                offset={-90}         // Khoảng cách trừ hao để không bị Navbar che mất tiêu đề
                duration={500}       // Tốc độ cuộn (500ms)
                activeClass="text-emerald-700 border-b-2 border-emerald-700 font-bold"
                className="transition-colors hover:text-emerald-700 cursor-pointer pb-1"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {/* kiểm tra*/}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={() => navigate('/reservation')}
                className="rounded-sm bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-emerald-800 active:scale-95"
                type="button"
              >
                Đặt Bàn
              </button>
              <button
                onClick={() => navigate('/my-reservations')}
                className="rounded-sm bg-teal-700 px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-teal-800 active:scale-95"
                type="button"
              >
                Lịch Sử
              </button>
              {user.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="rounded-sm bg-emerald-900 px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-emerald-950 active:scale-95"
                  type="button"
                >
                  🔧 Admin
                </button>
              )}
              <span className="text-emerald-800 dark:text-emerald-200 font-medium font-['Noto_Serif']">
                Xin chào, <span className="text-emerald-700">{user.fullName || 'Bạn'}</span>
              </span>
              <button
                onClick={onLogout}
                className="rounded-sm bg-red-600 px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-red-700 active:scale-95"
                type="button"
              >
                Đăng Xuất
              </button>
            </>
          ) : (
            // nếu chưa đăng nhập.
            <>
              <button
                onClick={onLoginClick}
                className="rounded-sm px-6 py-2 text-sm font-medium text-emerald-700 transition-all duration-200 hover:text-emerald-900 active:scale-95 dark:text-emerald-300 dark:hover:text-emerald-100"
                type="button"
              >
                Đăng Nhập
              </button>
              <button
                onClick={onRegisterClick}
                className="rounded-sm bg-emerald-700 dark:bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-emerald-800 dark:hover:bg-emerald-700 active:scale-95"
                type="button"
              >
                Đăng Ký
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}