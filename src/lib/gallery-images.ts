import { readdirSync, statSync } from 'fs';
import path from 'path';

export type MediaItem = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

// Cache for production builds
let cachedImages: MediaItem[] | null = null;

export function getGalleryImages(): MediaItem[] {
  // Return cached results in production to avoid repeated filesystem operations
  if (cachedImages && process.env.NODE_ENV === 'production') {
    return cachedImages;
  }

  try {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');
    
    // Use more efficient image detection with Set for O(1) lookups
    const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif']);
    
    const files = readdirSync(galleryPath);
    
    // Single pass through files with early returns
    const imageFiles: MediaItem[] = [];
    
    for (const filename of files) {
      const ext = path.extname(filename).toLowerCase();
      
      // Skip non-image files quickly
      if (!imageExtensions.has(ext)) continue;
      
      // Skip directories or invalid files
      const filePath = path.join(galleryPath, filename);
      try {
        const stats = statSync(filePath);
        if (!stats.isFile()) continue;
      } catch {
        // Skip files we can't stat
        continue;
      }
      
      // More efficient alt text generation
      const baseName = path.basename(filename, ext);
      const alt = baseName
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim() || 'Gallery image';
      
      imageFiles.push({
        src: `/gallery/${filename}`,
        alt,
      });
    }

    // Cache the results
    cachedImages = imageFiles;
    return imageFiles;
    
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    // Return empty array instead of throwing to prevent build failures
    return [];
  }
}

// Alternative: Precompute during build if images are static
export async function getGalleryImagesAsync(): Promise<MediaItem[]> {
  // If you can use dynamic imports or want to add image dimensions
  return getGalleryImages();
}