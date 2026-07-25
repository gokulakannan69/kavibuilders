import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, ArrowRight } from "lucide-react";
import { Logo3D } from "../common/Logo3D";
import { getSiteSettings, SiteSettings } from "../../lib/settings";

export function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener("settings-updated", handleSettingsChange);
    return () => window.removeEventListener("settings-updated", handleSettingsChange);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div>
            <a href="#home" className="block focus:outline-none mb-6">
              <Logo3D lightMode={true} />
            </a>
            <p className="text-sm leading-relaxed mb-6">
              Building your dreams with quality, trust, and excellence across Tamil Nadu.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Gallery', 'Cost Calculator', 'Contact Us', 'Admin Panel'].map((link) => {
                const id = link === 'Admin Panel' ? 'admin' : link.toLowerCase().replace(' ', '-');
                return (
                <li key={link}>
                  <a href={`#${id}`} className="hover:text-orange-500 transition-colors flex items-center text-sm">
                    <ArrowRight className="w-3 h-3 mr-2 text-orange-500" />
                    {link}
                  </a>
                </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Our Services</h4>
            <ul className="space-y-3">
              {['House Construction', 'Commercial Projects', 'Turnkey Solutions', 'Renovation', 'Interior Design', 'Structural Consulting'].map((service) => (
                <li key={service}>
                  <a href="#services" className="hover:text-orange-500 transition-colors flex items-center text-sm">
                    <ArrowRight className="w-3 h-3 mr-2 text-orange-500" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  {settings.contactAddress.split('\n').map((line, i) => (
                    <span key={i}>{line}<br/></span>
                  ))}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="text-sm hover:text-orange-500 transition-colors">{settings.contactPhone}</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="text-sm hover:text-orange-500 transition-colors break-all">{settings.contactEmail}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {currentYear} Kavi Builders. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
