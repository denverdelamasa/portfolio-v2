import GalleryImages from "./GalleryImages";
import { getGalleryImages } from '@/lib/gallery-images';

export default function Gallery() {
  const images = getGalleryImages();

  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-center lg:p-12">
      <h1 className="text-8xl font-bold">My Gallery</h1>
      <p className="text-xl mt-4 text-gray-600 max-w-prose text-center">
        Here's a collection of photos that capture my work, hobbies, and passions. No particular order, just moments that represent what I enjoy.
      </p>
      <GalleryImages images={images} />
    </main>
  );
}