import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero h-full w-full">
      <div className="hero-content text-center">
        <div className="max-w-8xl text-center items-center justify-center align-middle z-0">
          <p className="text-2xl">
            Hi! I&apos;m
          </p>
          <h1 className="text-8xl lg:text-9xl font-bold hero-title">
            Denver <br className="visible md:hidden"/> Dela Masa
          </h1>
          <h2 className="text-xl lg:text-4xl font-bold mb-4">
            Web Developer. Illustrator. Tech Support.
          </h2>
          <p className="text-xs lg:text-lg mx-auto mb-4 max-w-xl">
            I build responsive websites, make character illustrations, and solve tech problems.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 w-auto mx-auto">
            <Link href="/#projects" className="btn btn-primary btn-md rounded-lg m-auto md:btn-wide">
              <i className="bi bi-box-arrow-in-down"></i>
              My Works
            </Link>
            <Link href="/#profile" className="btn btn-outline btn-md rounded-lg visible md:hidden mx-auto">
              <i className="bi bi-person-bounding-box"></i>
              About me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}