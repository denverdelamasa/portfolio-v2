import GalleryImages from "./GalleryImages";
import { getGalleryImages } from '@/lib/gallery-images';

export default function Gallery() {
  const images = getGalleryImages();

  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-center p-24">
      <GalleryImages images={images} />
    </main>
  );
}