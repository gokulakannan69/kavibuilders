import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";
import { motion } from "motion/react";
import { getSiteSettings, SiteSettings } from "../../lib/settings";

export function Contact() {
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(getSiteSettings());
    };
    window.addEventListener("settings-updated", handleSettingsChange);
    return () => window.removeEventListener("settings-updated", handleSettingsChange);
  }, []);

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Get In Touch" subtitle="Let's discuss your next dream project." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-300 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Request a Quote</h3>
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name")?.toString() || "";
                const phone = formData.get("phone")?.toString() || "";
                const email = formData.get("email")?.toString() || "";
                const location = formData.get("location")?.toString() || "";
                const requirement = formData.get("requirement")?.toString() || "";
                const message = formData.get("message")?.toString() || "";

                const text = `*New Quote Request*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Location:* ${location}%0A*Requirement:* ${requirement}%0A*Message:* ${message}`;
                
                const targetPhone = settings.contactPhone.replace(/\s+/g, "").replace("+", "");
                window.open(`https://wa.me/${targetPhone}?text=${text}`, "_blank");
              }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input name="name" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input name="phone" required type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="+91 948234324" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="name@gmail.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Location</label>
                    <input name="location" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="City, Area" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Requirement</label>
                  <select name="requirement" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all">
                    <option>House Construction</option>
                    <option>Commercial Construction</option>
                    <option>Turnkey Project</option>
                    <option>Renovation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className="w-full bg-gray-700 text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors shadow-lg">
                  Submit Request
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Details & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Office Address</h4>
                    <p className="text-gray-600 leading-relaxed mt-1">
                      {settings.contactAddress.split('\n').map((line, i) => (
                        <span key={i}>{line}<br/></span>
                      ))}
                    </p>
                    <a href="https://maps.app.goo.gl/2vkbVakBiQMQocrL9" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 font-medium text-sm mt-2 inline-flex items-center gap-1 transition-colors">
                      Get Directions <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Phone Number</h4>
                    <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="text-gray-600 hover:text-orange-500 transition-colors mt-1 block">{settings.contactPhone}</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Email Address</h4>
                    <a href={`mailto:${settings.contactEmail}`} className="text-gray-600 hover:text-orange-500 transition-colors mt-1 block">{settings.contactEmail}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Working Hours</h4>
                    <p className="text-gray-600 mt-1">Mon - Sat: 9:00 AM - 6:30 PM<br/>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="flex-1 rounded-2xl overflow-hidden shadow-md min-h-[300px] relative bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62446.04604518776!2d78.46193796856517!3d12.06450519114777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac65b1f55a6a31%3A0x4e958eaffacd2797!2sKavi%20Builders!5e0!3m2!1sen!2sin!4v1714470438186!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
