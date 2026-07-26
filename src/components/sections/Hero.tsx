import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, PhoneCall } from "lucide-react";
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

  const bgImage = settings.heroBackgroundImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-900">
      {/* Cinematic Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Deep vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pt-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="flex flex-col items-center"
        >

          <motion.h1 
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-2xl"
          >
            {settings.heroTitle1 || "Building"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{settings.heroTitle2 || "Dreams."}</span>
          </motion.h1>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md"
          >
            {settings.heroSubtitle || "Premium Construction & Interior Design"}
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full shadow-[0_8px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              Our Services
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats overlay centered */}
      <div className="absolute bottom-10 left-0 right-0 z-10 hidden md:block">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 1.2, duration: 0.8 }
            }
          }}
          className="max-w-4xl mx-auto bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex justify-around shadow-2xl"
        >
          {[
            { label: "Projects Completed", value: "33+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Years Experience", value: "4+" },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-orange-400 text-xs uppercase tracking-widest font-semibold">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
