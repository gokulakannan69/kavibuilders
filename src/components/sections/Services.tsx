import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Building2, KeySquare, Hammer, Paintbrush, FileSignature, Calculator, Users, X } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading";

export function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      title: "House Construction",
      description: "Custom-designed homes built with modern aesthetics.",
      details: "Our residential construction services encompass every stage of building your dream home. We work closely with you from initial architectural design to final interior finishes, ensuring the home reflects your lifestyle, maximizes space utility, and incorporates modern aesthetics and sustainable materials.",
      icon: <Home className="w-10 h-10 text-white" />
    },
    {
      title: "Commercial",
      description: "Offices, retail, and industrial facilities.",
      details: "We specialize in constructing robust, functional, and striking commercial spaces. Whether it's a multi-story office building, retail showroom, or industrial warehouse, our team strictly adheres to zoning regulations, safety codes, and time-sensitive project schedules.",
      icon: <Building2 className="w-10 h-10 text-white" />
    },
    {
      title: "Turnkey Projects",
      description: "End-to-end solutions from concept to handover.",
      details: "Our turnkey solutions offer a hassle-free experience where we manage the entire project lifecycle. This includes site acquisition assistance, conceptual design, engineering, procurement, construction, and final finishing, delivering a completely ready-to-use property.",
      icon: <KeySquare className="w-10 h-10 text-white" />
    },
    {
      title: "Renovation",
      description: "Transforming existing spaces with modern upgrades.",
      details: "Breathe new life into your existing property with our comprehensive renovation services. We handle structural modifications, modernized electrical and plumbing systems, and contemporary interior revamps while minimizing disruption to your daily routine.",
      icon: <Hammer className="w-10 h-10 text-white" />
    },
    {
      title: "Interior Design",
      description: "Luxurious interiors tailored to your style.",
      details: "Our interior design experts craft spaces that balance luxury, comfort, and functionality. We provide bespoke furniture design, thoughtful lighting plans, premium material selection, and 3D visualizations to bring your vision to life before execution.",
      icon: <Paintbrush className="w-10 h-10 text-white" />
    },
    {
      title: "Consultancy",
      description: "Expert structural analysis and design.",
      details: "Leveraging our engineering expertise, we provide critical consultancy services including soil testing analysis, structural load calculations, material quality assurance, and compliance checks to guarantee the safety and longevity of your building.",
      icon: <FileSignature className="w-10 h-10 text-white" />
    },
    {
      title: "Estimation",
      description: "Accurate cost planning and scheduling.",
      details: "Avoid budget overruns with our meticulous estimation services. We provide detailed Bill of Quantities (BOQ), material cost breakdowns, labor estimates, and realistic project timelines so you can plan your finances with complete transparency.",
      icon: <Calculator className="w-10 h-10 text-white" />
    },
    {
      title: "Labour Contracts",
      description: "Skilled workforce for timely execution.",
      details: "We supply a highly skilled and disciplined workforce for various construction trades including masonry, carpentry, plumbing, and electrical works. Our labor contracts ensure your project is staffed with experienced professionals dedicated to quality craftsmanship.",
      icon: <Users className="w-10 h-10 text-white" />
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gray-700/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-serif font-bold mb-4"
          >
            Our Services
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-orange-500 mx-auto mt-6 mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Comprehensive construction solutions delivered with engineering precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedService(idx)}
              className="relative bg-gray-800/60 backdrop-blur-md border border-gray-700/50 p-8 rounded-2xl hover:bg-orange-500 hover:border-orange-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.2)] transition-all duration-300 group cursor-pointer overflow-hidden z-10 flex flex-col h-full"
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-white">{service.title}</h3>
              <p className="text-gray-400 group-hover:text-white/90 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              <button className="text-orange-400 font-semibold group-hover:text-white flex items-center gap-2 text-sm mt-auto">
                Learn More <span className="text-lg">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-gray-900 border border-orange-500/30 p-8 rounded-2xl shadow-2xl max-w-lg w-full z-10"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 hover:text-orange-500 text-gray-400 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-6 inline-flex p-4 bg-gray-800 rounded-xl text-orange-500 border border-gray-700">
                {services[selectedService].icon}
              </div>
              <h3 className="text-3xl font-bold font-serif mb-2 text-white">
                {services[selectedService].title}
              </h3>
              <p className="text-orange-500 font-medium mb-6">
                {services[selectedService].description}
              </p>
              <div className="h-px w-full bg-gray-800 mb-6"></div>
              <p className="text-gray-300 leading-relaxed">
                {services[selectedService].details}
              </p>
              
              <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
