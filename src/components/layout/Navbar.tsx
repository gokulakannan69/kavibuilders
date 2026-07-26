import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { Logo3D } from "../common/Logo3D";
import { getSiteSettings, SiteSettings } from "../../lib/settings";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener("settings-updated", handleSettingsChange);
    return () => window.removeEventListener("settings-updated", handleSettingsChange);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Calculator", href: "#calculator" },
    { name: "Contact", href: "#contact" },
  ];

  return (
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        isScrolled || isMobileMenuOpen ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-3 md:py-4 border-b border-gray-100" : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 z-50">
            <a href="#home" className="block focus:outline-none">
              <Logo3D isScrolled={isScrolled || isMobileMenuOpen} />
            </a>
          </div>

          {/* Desktop Nav */}
          <motion.nav 
            className="hidden lg:flex items-center space-x-10"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              hidden: {}
            }}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                }}
                className={`relative text-base font-semibold transition-colors duration-300 hover:text-orange-500 group ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {link.name}
                {/* Animated underline on hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
              className="group flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:-translate-y-1 transition-all duration-300 text-sm font-bold tracking-wide"
            >
              <Phone className="w-4 h-4 group-hover:animate-bounce" />
              <span>{settings.contactPhone.replace('+91', '').trim()}</span>
            </motion.a>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.div 
            className="lg:hidden z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled || isMobileMenuOpen ? "text-gray-900" : "text-white"} focus:outline-none transform hover:scale-110 transition-transform`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden bg-white shadow-2xl absolute top-full left-0 w-full overflow-hidden border-t border-gray-100"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, type: "spring", stiffness: 300 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg font-bold text-gray-800 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                className="mt-6 px-4"
              >
                <a
                  href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-4 rounded-xl w-full font-bold shadow-lg shadow-orange-500/30"
                >
                  <Phone className="w-5 h-5 animate-pulse" />
                  <span>Call Us Now</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
