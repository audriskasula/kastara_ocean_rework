"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../styles/navbar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Hamburger from "@/icons/Hamburger";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  const navRef = useRef<HTMLDivElement | null>(null);

  const isLanding = pathname === "/landing";

  const navLink = [
    { href: "/", label: "Home" },
    {
      href: "/about",
      label: "About Us",
      subLinks: [
        { href: "/about/visi-misi", label: "Visi & Misi" },
        { href: "/about/legalitas", label: "Izin & Legalitas" },
        { href: "/about/instruktur", label: "Instruktur" },
      ],
    },
    { href: "/contact", label: "Contact" },
    { href: "/news", label: "News" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonial", label: "Testimonial" },
  ];

  // Lock body ketika sidebar buka
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  // Ambil tinggi navbar (untuk spacer biar ga loncat)
  useLayoutEffect(() => {
    if (!navRef.current) return;

    const updateHeight = () => {
      setNavHeight(navRef.current!.offsetHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(navRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkClass = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
      ? "nav-link active"
      : "nav-link";
  };

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLink={navLink}
        pathname={pathname}
      />

      {/* Spacer agar layout tidak loncat */}
      {isFixed && <div style={{ height: navHeight }} />}

      <div
        ref={navRef}
        className={`navbar-wrap ${isFixed ? "is-fixed scrolled" : ""}`}
      >
        <div className="navbar">
          <div className="flex justify-between w-full">
            {/* LEFT */}
            <div className="flex items-center">
              <Link href="/" className="brand">
                <Image
                  src="/logo.svg"
                  alt="Kastara Ocean"
                  width={85}
                  height={80}
                />
              </Link>

              <Link
                href="/"
                className={`ms-3 text-brand flex items-center ${!isLanding ? "lg:hidden" : ""
                  }`}
              >
                <h6 className="m-0 font-semibold">Kastara Ocean</h6>
              </Link>

              {!isLanding && (
                <div className="ms-3 text-lg hidden lg:flex items-center">
                  {navLink.map((link, index) => {
                    if (link.subLinks) {
                      return (
                        <div key={index} className="group relative">
                          <span
                            className={`${getLinkClass(link.href)} !inline-flex items-center gap-1 cursor-pointer`}
                          >
                            {link.label}
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </span>
                          {/* Dropdown Box */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:scale-100 scale-95 flex flex-col overflow-hidden z-[999] py-2">
                            {link.subLinks.map((sub, i) => (
                              <Link 
                                key={i} 
                                href={sub.href}
                                className="px-5 py-2.5 text-[15px] font-medium text-gray-700 hover:bg-rose-50/80 hover:text-primary transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={index}
                        href={link.href}
                        className={getLinkClass(link.href)}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* RIGHT DESKTOP */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/pendaftaran" className="bg-primary hover:bg-rose-700 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm">
                Daftar Sekarang
              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden text-gray-800 p-2"
              onClick={() => setIsOpen(true)}
            >
              <Hamburger />
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE FLOATING CTA */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 px-5 pointer-events-none">
        <div className="flex justify-center">
          <Link href="/pendaftaran" className="bg-primary text-white font-bold w-full max-w-sm py-3.5 rounded-full shadow-[0_8px_30px_rgba(225,29,72,0.3)] text-center text-sm tracking-wide pointer-events-auto active:scale-95 transition-transform border border-white/20">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </>
  );
}