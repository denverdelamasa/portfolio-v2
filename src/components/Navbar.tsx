"use client"
import { useState } from "react";

import Link from "next/link";
import avatar from "../assets/avatar.png";
import avatarAnimated from "../assets/avatar-animated.gif";
import Image from "next/image";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="lg:px-12 navbar shadow-sm backdrop-blur-xs">
      <div className="navbar-start">
      <button
        className="btn btn-ghost text-xl p-0 hover:scale-105 transition-all ease-in-out duration-100 relative w-12 h-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered ? avatarAnimated : avatar}
          alt={isHovered ? "Animated avatar" : "Static avatar"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-x-8">
            <Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#projects">
              <i className="bi bi-journal-code"></i>
              Projects
            </Link>
            <Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#experiences">
              <i className="bi bi-person-workspace"></i>
              Experiences
            </Link>
            <Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#advancements">
              <i className="bi bi-ui-radios"></i>
              Advancements
            </Link>
            <Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#github-contributions">
              <i className="bi bi-body-text"></i>
              Activity
            </Link>
            <Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#contact">
              <i className="bi bi-telephone-outbound"></i>
              Contact
            </Link>
        </ul>
      </div>
      <div className="navbar-end">        
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content rounded-box z-1 mt-3 w-48 p-2 shadow bg-base-100 border-2 border-accent gap-2 items-end">
            <li><Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#projects">
              <i className="bi bi-journal-code"></i>
              Projects
            </Link></li>
            <li><Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#experiences">
              <i className="bi bi-person-workspace"></i>
              Experiences
            </Link></li>
            <li><Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#advancements">
              <i className="bi bi-ui-radios"></i>
              Advancements
            </Link></li>
            <div className="divider my-[1px]"></div>
            <li><Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#github-contributions">
              <i className="bi bi-body-text"></i>
              Activity
            </Link></li>
            <li><Link className="my-auto hover:scale-95 transition-all ease-in-out 
                  duration-100 flex flex-row gap-x-2 w-auto h-auto items-center justify-center align-middle" 
                  href="/#contact">
              <i className="bi bi-telephone-outbound"></i>
              Contact
            </Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}