import { motion } from "motion/react";

export function WhatsAppButton() {
  const phoneNumber = "+919095332296";
  const message = encodeURIComponent("Hello Kavi Builders, I would like to discuss my construction project.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-white text-gray-900 text-sm py-2 px-4 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium flex items-center">
        Chat with us
        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 border-8 border-transparent border-l-white"></div>
      </div>
      
      {/* Ping Animation */}
      <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-30 animate-ping -z-10"></span>
    </motion.a>
  );
}
