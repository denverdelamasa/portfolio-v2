import Link from "next/link";
import AnimatedName from "../AnimatedName";
export default function Hero() {
  return (
    <div className="hero h-full w-full">
      <div className="hero-content text-center">
        <div className="max-w-[290px] md:max-w-8xl md:min-w-4xl text-center items-center justify-center align-middle z-0">
          <p className="text-2xl">
            Hi! I&apos;m
          </p>
          <AnimatedName />
          <h2 className="text-xl lg:text-4xl font-bold mb-4">
            <span className="hover:text-red-500 transition-colors duration-200 ease-in">
              Web Developer
            </span>.
            <span className="hover:text-red-500 transition-colors duration-200 ease-in">
              Illustrator
            </span>.
            <span className="hover:text-red-500 transition-colors duration-200 ease-in">
              Tech Support
            </span>.
          </h2>
          <p className="text-xs lg:text-lg mx-auto mb-4 max-w-xl">
            I build responsive websites, make character illustrations, and solve tech problems.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 w-auto md:w-xl mx-auto">
            <Link href="/#projects" className="btn btn-primary btn-md m-auto ">
              <i className="bi bi-box-arrow-in-down"></i>
              My Works
            </Link>
            <Link href="/#profile" className="btn btn-outline btn-md visible md:hidden mx-auto">
              <i className="bi bi-person-bounding-box"></i>
              About me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
