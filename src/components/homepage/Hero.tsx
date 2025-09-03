import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero bg-base-200 h-full w-full">
      <div className="hero-content text-center">
        <div className="max-w-2xl text-start">
          <p className="text-lg">
            Hi! I am
          </p>
          <h1 className="text-6xl lg:text-7xl font-bold mb-2">
            Denver Dela Masa
          </h1>
          <h2 className="text-lg lg:text-2xl font-semibold mb-2">
            Web Developer. Illustrator. Tech Support.
          </h2>
          <p className="text-xs lg:text-lg max-w-prose mb-4">
            I build responsive websites, make character illustrations, and solve tech problems.
          </p>
          <div className="actions flex flex-row md:flex-row gap-4">
            <Link href="/#projects" className="btn btn-primary btn-lg rounded-lg">My Works</Link>
            <Link href="/#profile" className="btn btn-outline btn-lg rounded-lg visible md:hidden">About me</Link>
          </div>
        </div>
      </div>
    </div>
  );
}