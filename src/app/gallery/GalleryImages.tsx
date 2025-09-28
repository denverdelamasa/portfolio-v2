'use client';

import { useMemo } from "react";
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
  const mediaItems = useMemo(() => {
    if (!images.length) return [];
    return shuffle(images);
  }, [images]);

  return (
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
                key={`${item.src}-${index}`} // Fixed: Use src + index since id doesn't exist
                className="flex flex-col mb-2 break-inside-avoid overflow-hidden shadow-md rounded-xl md:rounded-2xl bg-base-100 border-accent border-1"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover rounded-xl md:rounded-2xl"
                  loading="lazy"
                  decoding="async"
                  width={item.width || 400}
                  height={item.height || 300}
                />
                <div className="btn w-auto bg-base-100">
                  <i className="bi bi-fullscreen"></i>
                </div>
              </div>
            ))
          )}
        </section>

        <div className="w-full h-auto m-auto text-center">
          <p className="fade-up-scroll m-auto w-full">More content coming soon!</p>
        </div>
      </div>
    </section>
  );
}