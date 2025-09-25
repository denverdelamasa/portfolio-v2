'use client';

import { useMemo } from "react";
import { getGalleryImages, type MediaItem } from '@/lib/gallery-images';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// This should be moved to a layout or page for better SEO
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Gallery | Your Name',
//   description: 'Your gallery description',
// };

interface GalleryImagesProps {
  images: MediaItem[];
}

export default function GalleryImages({ images }: GalleryImagesProps) {
  const mediaItems = useMemo(() => shuffle(images), [images]);

  return (
    <section className="hero flex flex-col">
      <div className="hero-content flex flex-col text-left">
        <section className="columns-2 md:columns-3 gap-4 my-12 px-6">
          {mediaItems.length === 0 ? (
            <div className="text-center opacity-70 col-span-full">
              No images found.
            </div>
          ) : (
            mediaItems.map((item, i) => (
              <div 
                key={`${item.alt}-${i}`} 
                className="mb-4 break-inside-avoid overflow-hidden shadow-md"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-cover border-2 border-accent bg-gray-100"
                  loading="lazy"
                />
              </div>
            ))
          )}
        </section>

        <div className="w-full h-auto m-auto text-center">
          <p className="m-auto w-full">More content coming soon!</p>
        </div>
      </div>
    </section>
  );
}