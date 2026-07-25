import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";
import { getSiteSettings, SiteSettings } from "../../lib/settings";

export function Hero() {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener("settings-updated", handleSettingsChange);
    return () => window.removeEventListener("settings-updated", handleSettingsChange);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <img
            src={settings.heroBackgroundImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"}
            alt="Luxury Construction in Tamil Nadu"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Professional gradient overlay - dark at the bottom and sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90"></div>
      </div>

      <div className="relative z-10 text-left px-4 max-w-7xl mx-auto mt-20 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
          className="max-w-4xl"
        >
          
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight md:leading-[1.1] mb-6 drop-shadow-2xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Building</span> <span className="text-orange-500">Dreams.</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Creating</span> <span className="text-orange-500">Landmarks.</span>
          </motion.h1>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-lg"
          >
            Premium Construction & Interior Solutions in Tamil Nadu.
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-col sm:flex-row items-center justify-start gap-6 mt-10"
          >
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_30px_rgba(249,115,22,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center border border-orange-400/50"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold border border-white/20 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-white hover:text-orange-500 hover:shadow-[0_15px_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Request a Quote
              <FileText className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats at bottom */}
      <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-4 md:py-6 z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 1.5
              }
            }
          }}
          className="max-w-7xl mx-auto px-2 sm:px-4 grid grid-cols-3 gap-2 sm:gap-4 justify-around"
        >
          {[
            { label: "Projects Completed", value: "33+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Years Experience", value: "4+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="text-center"
            >
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-white">{stat.value}</h3>
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
