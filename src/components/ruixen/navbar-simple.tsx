"use client";
import React, { useState } from "react";
import { Schibsted_Grotesk } from "next/font/google";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";

import { logo } from "@/lib/imageData";
import SocialMediaLinks from "../SocialMediaLinks";
const sted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Services",
      link: "/services",
    },
    {
      title: "Music",
      link: "/commercial",
    },
    {
      title: "Gallery",
      link: "/gallery",
    },
    {
      title: "Blog",
      link: "/blog",
    },
    {
      title: "Contact Us",
      link: "/contact",
    },
  ];

  return (
    <>
      {/* Navigation */}
      <div className="w-full fixed top-0 left-0 z-50">
        {/* Glass background */}
        <div className="absolute w-full h-full backdrop-blur-md bg-white/10 z-0 "></div>

        {/* Black nav content */}
        <div className="relative z-50 max-w-7xl px-6 mx-auto py-4 flex flex-row justify-between items-center">
          <div className="h-[10vh] -my-5">
            <Link className={`${sted.className}`} href={"/"}>
              <Image
                src={logo}
                alt="cmmg-logo"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
          <div className="flex flex-row items-center space-x-5">
            <button
              onClick={() => setMenuOpen(true)}
              className={`${sted.className} text-white font-medium`}
            >
              <GiHamburgerMenu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#0e0e0e] z-[999] flex flex-col p-10 space-y-10 text-[#f2ece5] transition-all duration-300">
          <div className="flex justify-between items-start">
            <h1
              className={`${sted.className} flex flex-row text-5xl tracking-tighter font-extrabold`}
            >
              CMMG <span className="text-orange-600">.</span>
            </h1>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full flex justify-end cursor-pointer text-xl font-bold"
            >
              Close
            </button>
          </div>
          <div className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.link}
                onClick={() => setMenuOpen(false)}
                className={`${sted.className} text-4xl font-semibold py-1 hover:text-orange-700 transition duration-200`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* SOCIAL MEDIA LINKS */}
          <SocialMediaLinks />

          {/* Menu Library Button */}
          <Link
            href={"https://www.library.cmmg.co.za/library"}
            className={`${sted.className} text-center w-full rounded-md bg-gradient-to-r from-orange-500 to-orange-700  font-semibold  py-3 cursor-pointer hover:bg-gradient-to-l  hover:text-neutral-100`}
          >
            Production Music Library
          </Link>
        </div>
      )}
    </>
  );
};

export default Nav;
