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
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
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
                className={`ms-3 text-brand flex items-center ${!isLanding ? "md:hidden" : ""
                  }`}
              >
                <h6 className="m-0 font-semibold">Kastara Ocean</h6>
              </Link>

              {!isLanding && (
                <div className="ms-3 text-lg">
                  {navLink.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className={getLinkClass(link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE */}
            {!isLanding && (
              <button
                className="me-4 md:hidden"
                onClick={() => setIsOpen(true)}
              >
                <Hamburger />
              </button>
            )}

            {isLanding && (
              <div className="md:flex items-center gap-3">
                <button>Daftar Sekarang</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}