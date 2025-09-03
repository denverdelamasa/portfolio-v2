import Link from "next/link";
import avatar from "../assets/avatar.png";
import Image from "next/image";

export default function Navbar() {

  return (
    <div className="lg:px-12 navbar shadow-sm bg-base-300">
      <div className="navbar-start">
        <button className="btn btn-ghost text-xl p-0">
          <Image       
          src={avatar}
          alt="Picture of the author"
          className="w-full h-full"
        />
        </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-x-8">
            <Link className="my-auto hover:scale-95 transition-all ease-in-out duration-100" href="/#projects">Projects</Link>
            <Link className="my-auto hover:scale-95 transition-all ease-in-out duration-100" href="/#experiences">Experiences</Link>
            <Link className="my-auto hover:scale-95 transition-all ease-in-out duration-100" href="/#advancements">Advancements</Link>
            <Link className="my-auto hover:scale-95 transition-all ease-in-out duration-100" href="/#contact">Contact</Link>
        </ul>
      </div>
      <div className="navbar-end">        
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link className="" href="/#projects">Projects</Link></li>
            <li><Link className="" href="/#experiences">Experiences</Link></li>
            <li><Link className="" href="/#advancements">Advancements</Link></li>
            <li><Link className="" href="/#contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}