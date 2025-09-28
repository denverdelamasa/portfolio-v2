'use client';

import { useMemo, useState, useEffect } from "react";
import { type MediaItem } from '@/lib/gallery-images';
import Image from "next/image";

// More efficient shuffle using Fisher-Yates algorithm
function shuffle<T>(array: T[]): T[] {
  const arr = array.slice();
  let currentIndex = arr.length;
  let randomIndex: number;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }

  return arr;
}

interface GalleryImagesProps {
  images: MediaItem[];
}

export default function GalleryImages({ images }: GalleryImagesProps) {
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const mediaItems = useMemo(() => {
    if (!images.length) return [];
    // Only shuffle on client to avoid hydration mismatch
    return isClient ? shuffle(images) : images;
  }, [images, isClient]);

  const openModal = (item: MediaItem) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section className="flex">
        <div className="text-left w-full">
          <section className="columns-2 md:columns-3 gap-2 my-12 px-1 md:px-4">
            {mediaItems.length === 0 ? (
              <div className="text-center opacity-70 col-span-full">
                No images found.
              </div>
            ) : (
              mediaItems.map((item, index) => (
                <div 
                  key={`${item.src}-${index}`}
                  className="flex flex-col mb-8 break-inside-avoid overflow-hidden shadow-md rounded-xl md:rounded-2xl bg-base-100 border-accent border-1"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover rounded-t-xl md:rounded-t-2xl"
                    loading="lazy"
                    decoding="async"
                    width={item.width || 400}
                    height={item.height || 300}
                  />
                  <button 
                    className="btn w-auto bg-base-100 hover:bg-base-200 transition-colors"
                    onClick={() => openModal(item)}
                  >
                    <i className="bi bi-fullscreen"></i>
                  </button>
                </div>
              ))
            )}
          </section>

          <div className="w-full h-auto m-auto text-center">
            <p className="fade-up-scroll m-auto w-full">More content coming soon!</p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="modal modal-open">
          {/* Custom backdrop with glass effect */}
          <div 
            className="fixed inset-0 bg-base-100/30 backdrop-blur-md backdrop-brightness-125"
            onClick={closeModal}
          ></div>
          
          {/* Modal content */}
          <div className="modal-box max-w-4xl w-11/12 max-h-full overflow-auto rounded-xl md:rounded-2xl bg-base-100/90 border-accent border-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{selectedImage.alt}</h3>
              <button 
                className="btn btn-sm btn-circle btn-ghost"
                onClick={closeModal}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div className="flex justify-center rounded-xl">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[70vh] object-contain"
                width={selectedImage.width || 1200}
                height={selectedImage.height || 800}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}