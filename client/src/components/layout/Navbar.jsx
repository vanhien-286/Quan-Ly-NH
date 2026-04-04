import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onLoginClick, onRegisterClick, user, onLogout }) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dishes', label: 'Dishes' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'contact', label: 'Contact' }
  ];
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-4 px-6 py-6 md:px-12">

        
        <div className="flex items-center gap-12">
          <span 
            className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 font-['Noto_Serif'] cursor-pointer"
            onClick={() => navigate('/')}
          >
            Culinary Atelier
          </span>
          <div className="hidden md:flex gap-8 text-base font-medium text-zinc-600 tracking-tight dark:text-zinc-400 font-['Noto_Serif']">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                spy={true}           // Tự động theo dõi vị trí cuộn
                smooth={true}        // Cuộn mượt mà
                offset={-90}         // Khoảng cách trừ hao để không bị Navbar che mất tiêu đề
                duration={500}       // Tốc độ cuộn (500ms)
                activeClass="text-amber-500 border-b-2 border-amber-500 font-bold"
                className="transition-colors hover:text-amber-500 cursor-pointer pb-1"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {/* kiểm tra*/}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/reservation')}
            className="rounded-sm bg-amber-600 px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-amber-700 active:scale-95"
            type="button"
          >
            Đặt Bàn
          </button>
          {user ? (
            <>
              <button
                onClick={() => navigate('/my-reservations')}
                className="rounded-sm bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-blue-700 active:scale-95"
                type="button"
              >
                Lịch Sử
              </button>
              <span className="text-zinc-800 dark:text-zinc-200 font-medium font-['Noto_Serif']">
                Hello, <span className="text-amber-600">{user.fullName || 'Chef'}</span>
              </span>
              <button
                onClick={onLogout}
                className="rounded-sm bg-red-600 px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:bg-red-700 active:scale-95"
                type="button"
              >
                Logout
              </button>
            </>
          ) : (
            // nếu chưa đăng nhập.
            <>
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
            </>
          )}
        </div>

      </div>
    </nav>
  );
}