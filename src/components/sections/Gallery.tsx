import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeading } from "../common/SectionHeading";
import { X, ZoomIn } from "lucide-react";

export interface GalleryImage {
  id: number;
  src: string;
  category: string;
}

export function getGalleryImages(): GalleryImage[] {
  return [];
}

export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    let subscription: any;

    import("../../lib/supabase").then(({ supabase }) => {
      const fetchImages = async () => {
        const { data, error } = await supabase.from('gallery').select('*').order('id', { ascending: false });
        if (error) {
          console.error("Error fetching gallery images:", error);
        } else if (data) {
          const imgs = data.map(doc => ({ id: doc.id as any, src: doc.url, category: doc.category }));
          setGalleryImages(imgs);
        }
      };
      
      fetchImages();
      
      subscription = supabase.channel(`public_gallery_changes_${Date.now()}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, () => {
          fetchImages();
        })
        .subscribe();
    }).catch(err => {
      console.error("Supabase not ready yet:", err);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const categories = [ "Completed Projects"];
  
  const filteredImages = filter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Gallery" subtitle="A visual journey through our finest works." />

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === cat 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={img.id}
                className="relative group cursor-pointer aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                onClick={() => setSelectedImage(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={`Gallery image - ${img.category}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white w-10 h-10" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImage} 
              alt="Gallery Preview" 
              className="max-w-full max-h-[90vh] object-contain rounded-md"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
