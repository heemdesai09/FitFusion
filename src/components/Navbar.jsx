import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleScroll = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "#home", text: "Home" },
    { id: "#trainers", text: "Trainers" },
    { id: "#pricing", text: "Pricing" },
    { id: "#testimonials", text: "Testimonials" },
    { id: "#contact", text: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <span
          onClick={() => handleScroll("#home")}
          className="text-2xl font-bold text-cyan-500 cursor-pointer"
        >
          FitFusion
        </span>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleScroll(link.id)}
              className="relative text-gray-800 dark:text-gray-200 hover:text-cyan-500 transition"
            >
              {link.text}
            </motion.button>
          ))}
        </div>

        {/* Theme Toggle + Mobile Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-cyan-500 text-white rounded-lg text-sm hover:bg-cyan-600 transition"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-800 dark:text-gray-200"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-inner flex flex-col items-center gap-4 py-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="hover:text-cyan-500 transition text-gray-800 dark:text-gray-200"
              >
                {link.text}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
