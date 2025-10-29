import GalleryImages from "./GalleryImages";
import { getGalleryImages } from '@/lib/gallery-images';

export default function Gallery() {
  const images = getGalleryImages();

  return (
    <main className="h-fit flex flex-col items-center justify-center p-2 lg:p-12">
      <h1 className="text-6xl md:text-8xl font-bold">
        My <span className="hover:text-red-500 font-thin hover:font-extrabold transition-all duration-200 ease-in">Gallery</span>.
      </h1>
      <p className="text-sm md:text-xl mt-4 text-gray-600 max-w-md md:max-w-prose text-center">
        Here&apos;s a collection of photos that capture my work, hobbies, and passions. No particular order, just moments that represent what I enjoy.
      </p>

      <GalleryImages images={images} />
    </main>
  );
}