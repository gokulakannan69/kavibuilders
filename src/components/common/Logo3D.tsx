import { motion } from "motion/react";

interface Logo3DProps {
  isScrolled?: boolean;
  lightMode?: boolean;
}

function KaviLogoSVG({ isScrolled = false, lightMode = false }: { isScrolled?: boolean; lightMode?: boolean }) {
  const size = isScrolled ? 40 : 48;
  const darkColor = lightMode ? "#ffffff" : isScrolled ? "#1a1a1a" : "#ffffff";
  const orangeColor = "#F97316";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300"
    >
      {/* Orange Arc */}
      <motion.path
        d="M20 75 C20 35, 50 10, 80 35"
        stroke={orangeColor}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        animate={{ strokeOpacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* K Letter */}
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* K vertical stroke */}
        <rect x="25" y="35" width="6" height="40" rx="1" fill={orangeColor} />
        {/* K upper diagonal */}
        <polygon points="31,55 55,35 49,35 31,50" fill={orangeColor} />
        {/* K lower diagonal */}
        <polygon points="31,55 55,75 49,75 31,60" fill={orangeColor} />
      </motion.g>

      {/* Buildings */}
      <motion.g
        animate={{ scaleY: [0.95, 1, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        style={{ transformOrigin: "center bottom" }}
      >
        {/* Building 1 - tall */}
        <rect x="50" y="28" width="10" height="35" rx="1" fill={darkColor} />
        {/* Building 1 windows */}
        <rect x="52" y="31" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />
        <rect x="56" y="31" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />
        <rect x="52" y="36" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />
        <rect x="56" y="36" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />
        <rect x="52" y="41" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />
        <rect x="56" y="41" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />

        {/* Building 2 - medium */}
        <rect x="62" y="38" width="10" height="25" rx="1" fill={darkColor} />
        {/* Building 2 windows */}
        <rect x="64" y="41" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />
        <rect x="68" y="41" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />
        <rect x="64" y="46" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />
        <rect x="68" y="46" width="2.5" height="2.5" rx="0.5" fill={orangeColor} opacity="0.8" />
      </motion.g>

      {/* Roof / House shape */}
      <motion.g
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        {/* Roof triangle */}
        <polygon points="45,63 75,63 85,53 65,40 45,53" fill={darkColor} />
        {/* Roof window */}
        <rect x="63" y="50" width="5" height="5" rx="0.5" fill={orangeColor} opacity="0.9" />
      </motion.g>

      {/* Animated window blink */}
      <motion.rect
        x="52"
        y="31"
        width="2.5"
        height="2.5"
        rx="0.5"
        fill={orangeColor}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="68"
        y="46"
        width="2.5"
        height="2.5"
        rx="0.5"
        fill={orangeColor}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </svg>
  );
}

export function Logo3D({ isScrolled = false, lightMode = false }: Logo3DProps) {
  return (
    <motion.div
      className="flex items-center gap-2 md:gap-3 group cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* SVG Logo with animated glow */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.08, rotate: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Pulsing glow behind logo */}
        <motion.div
          className="absolute inset-0 rounded-full bg-orange-500/15 blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <KaviLogoSVG isScrolled={isScrolled} lightMode={lightMode} />
      </motion.div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <motion.div
          className={`text-xl md:text-2xl font-serif font-black tracking-wider transition-colors duration-300 ${
            lightMode ? "text-white" : isScrolled ? "text-gray-900" : "text-white"
          }`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          KAVI
        </motion.div>
        <motion.div
          className="flex items-center gap-1"
        >
          <motion.div
            className="h-[2px] bg-orange-500"
            animate={{ width: [0, 12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span 
            className="text-orange-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            Builders
          </motion.span>
          <motion.div
            className="h-[2px] bg-orange-500"
            animate={{ width: [0, 12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
