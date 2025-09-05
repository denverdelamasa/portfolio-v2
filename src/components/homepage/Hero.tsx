import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero h-full w-full bg-pattern">
      <div className="hero-content text-center">
        <div className="max-w-3xl text-center items-center justify-center align-middle text-white">
          <p className="text-lg">
            Hi! I am
          </p>
          <h1 className="text-6xl lg:text-8xl font-bold mb-2 hero-title">
            Denver <br className="visible md:hidden"/> Dela Masa
          </h1>
          <h2 className="text-lg lg:text-2xl font-semibold mb-2">
            Web Developer. Illustrator. Tech Support.
          </h2>
          <p className="text-xs lg:text-md mx-auto mb-4">
            I build responsive websites, make character illustrations, and solve tech problems.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 w-auto mx-auto">
            <Link href="/#projects" className="btn btn-primary btn-md rounded-lg m-auto md:btn-wide">My Works</Link>
            <Link href="/#profile" className="btn btn-outline btn-md rounded-lg visible md:hidden mx-auto">About me</Link>
          </div>
        </div>
      </div>
    </div>
  );
}