import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./components/Cart"
import { BsCart2, BsPerson, BsList } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`flex flex-row gap-4 justify-between p-6 transition-all duration-300  ${
          scrolled
            ? "fixed top-0 left-0 w-full bg-white/70  z-20"
            : "relative bg-white"
        }`}
      >
        <div className="w-full text-2xl"><BsList /></div>
        <div className="w-full text-center">
          <Link to="/">Home</Link>
        </div>
        <div className="flex flex-row-reverse gap-4 w-full">
          <button onClick={() => setIsCartOpen(true)} className="text-2xl"><BsCart2 /></button>
          <Link to="/" className="text-2xl"><BsPerson /></Link>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </div>
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </div>
  );
}
