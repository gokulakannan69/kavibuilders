import { useState } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "../common/SectionHeading";
import { Calculator as CalcIcon } from "lucide-react";

export function Calculator() {
  const [builtUpArea, setBuiltUpArea] = useState<number>(1000);
  const [quality, setQuality] = useState<number>(2000);

  const estimatedCost = builtUpArea * quality;

  return (
    <section id="calculator" className="py-20 md:py-32 bg-gray-300 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Construction Cost Calculator" 
          subtitle="Get an instant estimate for your dream project based on current market rates."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mt-12 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 w-full md:w-3/5 space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Built-up Area (Sq.Ft)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <span className="w-24 text-center font-bold text-gray-900 bg-gray-300 px-3 py-2 rounded-md border border-gray-200">
                    {builtUpArea}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Material Quality / Finish
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Standard", price: 1800 },
                    { label: "Premium", price: 2000 },
                    { label: "Luxury", price: 2500 }
                  ].map((tier) => (
                    <button
                      key={tier.label}
                      onClick={() => setQuality(tier.price)}
                      className={`py-3 px-4 rounded-lg border-2 text-sm font-semibold transition-all ${
                        quality === tier.price
                          ? "border-gray-600 bg-orange-500-50 text-gray-400"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {tier.label}
                      <span className="block text-xs font-normal text-gray-500 mt-1">₹{tier.price}/sq.ft</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-8 md:p-12 w-full md:w-2/5 flex flex-col justify-center text-white">
              <div className="flex items-center gap-3 mb-6 opacity-80">
                <CalcIcon className="w-6 h-6 text-gray-300" />
                <h4 className="font-semibold tracking-wider uppercase text-sm">Estimated Cost</h4>
              </div>
              <p className="text-4xl md:text-5xl font-bold font-serif mb-2">
                ₹{(estimatedCost / 100000).toFixed(2)}<span className="text-xl md:text-2xl text-gray-400 font-sans"> L</span>
              </p>
              <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                *This is an approximate estimation. Final costs may vary based on exact specifications, structural designs, and location.
              </p>
              <a
                href="#contact"
                className="mt-8 bg-gray-700 text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Get Detailed Quote
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
