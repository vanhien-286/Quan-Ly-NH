import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Dishes from "./components/sections/Dishes";
import Drinks from "./components/sections/Drinks";
import Desserts from "./components/sections/Desserts";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import Login from "./components/sections/Login";
import Register from "./components/sections/Register";
import Reservation from "./components/sections/Reservation";
import MyReservations from "./components/sections/MyReservations";

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
        <Hero />
        <div id="dishes"><Dishes /></div>
        <div id="drinks"><Drinks /></div>
        <div id="desserts"><Desserts /></div>
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
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/my-reservations" element={<MyReservations />} />
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