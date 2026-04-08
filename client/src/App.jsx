import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Phos from "./components/sections/Phos";
import Sides from "./components/sections/Sides";
import Drinks from "./components/sections/Drinks";
import Articles from "./components/sections/Articles";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import Login from "./components/sections/Login";
import Register from "./components/sections/Register";
import Reservation from "./components/sections/Reservation";
import MyReservations from "./components/sections/MyReservations";
import Admin from "./components/sections/Admin";
import ArticleDetail from "./components/pages/ArticleDetail";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Quản lý trạng thái User (Lấy từ localStorage nếu đã đăng nhập trước đó)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert("Bạn đã đăng xuất!");
  };

  const HomePage = () => (
    <>
      <main>
        <Hero user={user} onLoginClick={() => {
          setShowLogin(true);
          setShowRegister(false);
        }} />
        <div id="phos"><Phos /></div>
        <div id="sides"><Sides /></div>
        <div id="drinks"><Drinks /></div>
        <div id="articles"><Articles /></div>
        <div id="contact"><Contact /></div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => {
          setShowLogin(true);
          setShowRegister(false);
        }}
        onRegisterClick={() => {
          setShowRegister(true);
          setShowLogin(false);
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/admin" element={user?.role === "admin" ? <Admin user={user} /> : <HomePage />} />
      </Routes>

      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          setShowLogin(false);
        }}
      />

      <Register
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </>
  );
}

export default App;