import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-2xl text-start">
          <p className="text-lg">
            Hi! I'm
          </p>
          <h1 className="text-7xl font-extrabold mb-2">
            Denver Dela Masa
          </h1>
          <h2 className="text-2xl font-semibold mb-2">
            Web Developer. Illustrator. Tech Support.
          </h2>
          <p className="text-lg max-w-md">
            I build responsive websites, make character illustrations, and solve tech problems.
          </p>
          <Link href="/#profile" className="btn btn-primary">My works</Link>
        </div>
      </div>
    </div>

  );
}