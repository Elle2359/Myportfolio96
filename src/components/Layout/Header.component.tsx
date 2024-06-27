"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { MotionDiv, MotionLi, MotionUl } from "@/lib/framer/client";

import MobileMenu from "./MobileMenu.component";

/**
 * Renders the header component with navigation links and a hamburger menu for mobile devices.
 *
 * @return {JSX.Element} The header component.
 */
const Header = () => {
  const pathname = usePathname();

  const links = [
    { title: "Home", name: "Hjem", hash: "#hjem", href: "/" },
    {
      title: "Prosjekter",
      name: "Prosjekter",
      hash: "#prosjekter",
      href: "/prosjekter",
    },
    { title: "CV", name: "CV", hash: "#cv", href: "/cv" },
    {
      title: "Github",
      name: "Github",
      hash: "#github",
      href: "https://github.com/w3bdesign",
    },
    { title: "Kontakt", name: "Kontakt", hash: "#kontakt", href: "/kontakt" },
  ];

  return (
    <header className="z-[999] relative">
      <MotionDiv
        className="bg-slate-800 bg-opacity-80 fixed top-0 left-1/2 h-[4.5rem] w-full shadow rounded-none shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-900 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{
          y: 0,
          x: "-50%",
          opacity: 1,
          transition: {
            y: { duration: 0.6, ease: "easeOut" },
            opacity: { duration: 0.6, ease: "easeOut" },
          },
        }}
      />
      <nav className="flex fixed top-[0.65rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0 w-full max-w-[370px] justify-end md:justify-between items-center">
        <MotionUl
          className="hidden md:flex md:w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-slate-200 sm:w-[initial] sm:flex-nowrap sm:gap-5"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {links.map((link) => (
            <MotionLi
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              variants={{
                hidden: { y: -20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.3 }}
            >
              <MotionDiv className="relative" whileHover="hover">
                <Link
                  prefetch={true}
                  className={`flex w-full items-center justify-center px-2 py-2 hover:text-white transition font-semibold text-lg ${
                    pathname === link.href ? "text-green-400" : ""
                  }`}
                  href={link.href}
                >
                  <div className="glitch relative" data-text={link.name}>
                    {link.name}
                    <motion.span
                      className={`absolute bottom-0 left-0 h-0.5 bg-current ${
                        pathname === link.href ? "bg-green-400" : "bg-white"
                      }`}
                      initial={{
                        width: pathname === link.href ? "100%" : "0%",
                      }}
                      variants={{
                        hover: { width: "100%" },
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </Link>
              </MotionDiv>
            </MotionLi>
          ))}
        </MotionUl>
        <div id="hamburger-div" data-cy="hamburger-div" className="md:hidden">
          <MobileMenu links={links} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
