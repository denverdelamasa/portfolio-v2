import { readdirSync } from 'fs';
import path from 'path';

export type MediaItem = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export function getGalleryImages(): MediaItem[] {
  // For static site generation, we can read the directory
  // Note: This only works at build time or in API routes
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');
    const files = readdirSync(galleryPath);
    
    const imageFiles = files.filter(file => 
      /\.(png|jpe?g|gif|webp)$/i.test(file)
    );

    return imageFiles.map(filename => {
      const alt = filename
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim() || 'Gallery item';

      return {
        src: `/gallery/${filename}`,
        alt,
      };
    });
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return [];
  }
}