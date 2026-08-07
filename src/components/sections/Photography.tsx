"use client";

import { motion, Transition } from "framer-motion";
import { Maximize, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useState } from "react";
import { useReducedMotion } from "@/hooks";

const photographyImages = [
  { id: 1, src: "/photography/architecture.jpg", alt: "Architecture photography", title: "Architecture", category: "Urban" },
  { id: 2, src: "/photography/macro.jpg", alt: "Macro photography", title: "Macro", category: "Detail" },
  { id: 3, src: "/photography/nature%20landscape.jpg", alt: "Landscape photography", title: "Landscape", category: "Nature" },
  { id: 4, src: "/photography/street.jpg", alt: "Street photography", title: "Street", category: "Urban" },
  { id: 5, src: "/photography/sunset%20mountains.jpg", alt: "Sunset mountains photography", title: "Sunset Mountains", category: "Nature" },
  { id: 6, src: "/photography/sunset.jpg", alt: "Sunset photography", title: "Sunset", category: "Nature" },
];

export function Photography() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null && selectedImage < photographyImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const transition: Transition = reducedMotion ? { duration: 0.01 } : { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const };

  return (
    <section id="photography" className="relative py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
          className="text-center mb-16"
        >
          <Badge variant="primary" dot className="mb-4">
            Photography Gallery
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Capturing Moments
            <br />
            <span className="text-gradient">Through My Lens</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Photography is my creative outlet. Each image tells a story, captures a moment,
            and reflects my perspective on the world. From architecture to macro details,
            street scenes to sunset landscapes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photographyImages.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0.01 } : { ...transition, delay: index * 0.08 }}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer"
            >
              <Card variant="elevated" className="h-full overflow-hidden relative group-hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-between">
                    <Badge variant="primary" size="sm">{photo.category}</Badge>
                    <div className="w-10 h-10 rounded-xl bg-primary/90 flex items-center justify-center">
                      <Maximize className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm text-muted">{photo.category}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {lightboxOpen && selectedImage !== null && (
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={transition}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Previous image"
              disabled={selectedImage === 0}
            >
              <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
            </button>

            <Image
              src={photographyImages[selectedImage].src}
              alt={photographyImages[selectedImage].alt}
              width={1200}
              height={800}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl"
              priority
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Next image"
              disabled={selectedImage === photographyImages.length - 1}
            >
              <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
            </button>

            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-red-500/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" aria-hidden="true" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <h3 className="text-xl font-semibold text-white mb-1">
                {photographyImages[selectedImage].title}
              </h3>
              <Badge variant="outline" size="sm" className="border-white/30 text-white">
                {photographyImages[selectedImage].category}
              </Badge>
              <p className="text-sm text-white/60 mt-2">
                {selectedImage + 1} of {photographyImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}