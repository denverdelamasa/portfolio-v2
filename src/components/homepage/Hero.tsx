import Link from "next/link";
import AnimatedName from "../AnimatedName";
export default function Hero() {
  return (
    <div className="hero h-full w-full">
      <div className="hero-content text-center">
        <div className="max-w-[290px] md:max-w-sm xl:max-w-4xl text-center items-center justify-center align-middle z-0">
          <p className="text-2xl">
            Hi! I&apos;m
          </p>
          <AnimatedName />
          <h2 className="text-xl lg:text-4xl font-bold mb-4">
            <span className="hover:text-red-500 font-bold hover:font-thin transition-all duration-200 ease-in">
              Web Developer
            </span>.
            <span className="hover:text-red-500 font-bold hover:font-thin transition-all duration-200 ease-in">
              Illustrator
            </span>.
            <span className="hover:text-red-500 font-bold hover:font-thin transition-all duration-200 ease-in">
              Tech Support
            </span>.
          </h2>
          <p className="text-xs lg:text-md mx-auto mb-4 max-w-xl">
            I build responsive websites, draw character illustrations, and solve tech problems. I aspire to become better at what I do, so I always do my best to learn as best as I could. 
          </p>
          <div className="flex flex-wrap gap-2 w-full mx-auto">
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
