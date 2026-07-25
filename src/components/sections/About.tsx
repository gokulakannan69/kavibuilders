import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";
import { getSiteSettings, SiteSettings } from "../../lib/settings";

export function About() {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener("settings-updated", handleSettingsChange);
    return () => window.removeEventListener("settings-updated", handleSettingsChange);
  }, []);

  const highlights = [
    "Residential & Commercial Experts",
    "Commitment to Quality & Safety",
    "Transparent Process",
    "On-time Project Delivery",
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading title={settings.aboutTitle} centered={false} />
            
            <div className="space-y-6 text-gray-600 text-lg">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-6">
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-4 border-orange-500/20 shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center relative">
                  <img 
                    src="/ceo.jpeg" 
                    alt={settings.aboutCeoName} 
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Fallback initials if ceo.jpg is not yet uploaded to public/ */}
                  <span className="text-3xl font-serif text-gray-400 font-bold z-0">{settings.aboutCeoName.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 font-serif">{settings.aboutCeoName}</h3>
                  <p className="text-orange-500 font-medium text-lg mb-2">{settings.aboutCeoRole}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {settings.aboutCeoDesc}
                  </p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-gray-400 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gray-400/20 transition-colors"></div>
                  <h3 className="text-gray-600 font-bold text-xl mb-2 font-serif group-hover:text-gray-800 relative z-10">Our Mission</h3>
                  <p className="text-sm text-gray-700 relative z-10">To provide premium construction services that exceed client expectations.</p>
                </div>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-gray-400 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gray-400/20 transition-colors"></div>
                  <h3 className="text-gray-600 font-bold text-xl mb-2 font-serif group-hover:text-gray-800 relative z-10">Our Vision</h3>
                  <p className="text-sm text-gray-700 relative z-10">To be the most respected construction company in Tamil Nadu.</p>
                </div>
              </div>

              <div className="pt-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="font-medium text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
