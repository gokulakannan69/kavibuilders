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

  // Use the admin background image, or a high-quality default architecture placeholder
  const bgImage = settings.heroBackgroundImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop";

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Professional Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Sleek Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-left px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-20">
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
          className="max-w-3xl"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-1 w-12 bg-orange-500"></div>
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Premium Construction</span>
          </motion.div>

          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] mb-6"
          >
            {settings.heroTitle1 || "Building"} <br/>
            <span className="text-gray-300">{settings.heroTitle2 || "Dreams."}</span>
          </motion.h1>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed"
          >
            {settings.heroSubtitle || "Premium Construction & Interior Solutions in Tamil Nadu. We deliver excellence from foundation to finish."}
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="flex flex-col sm:flex-row items-center justify-start gap-4 mt-8"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              Our Services
              <FileText className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-md border-t border-gray-800 py-6 z-10 hidden sm:block">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 1.0
              }
            }
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between md:justify-start md:gap-24 gap-8"
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
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
