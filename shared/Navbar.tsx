"use client";
import React, { useEffect, useRef, useState } from "react";
import "../styles/navbar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Hamburger from "@/icons/Hamburger";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const hasLogged = useRef(false);
  const currentLocale = pathname.split("/")[1];

  useEffect(() => {
    if (!hasLogged.current) {
      hasLogged.current = true;
    }
  }, [currentLocale]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const navLinkEn = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    // { href: "/product", label: "Product" },
    { href: "/landing", label: "International Health Insurance" },
    { href: "/become-agent", label: "Become an Agent" },
  ];

  const navLinkId = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/contact", label: "Kontak" },
    // { href: "/product", label: "Produk" },
    { href: "/landing", label: "Asuransi Kesehatan Internasional" },
    { href: "/become-agent", label: "Menjadi Agent" },
  ];

  const navLink = currentLocale == "en" ? navLinkEn : navLinkId;

  // const navLink = [
  //   { href: "/", label: t("home") },
  //   { href: "/about", label: t("aboutUs") },
  //   { href: "/contact", label: t("contact") },
  //   { href: "/product", label: t("product") },
  // ];

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLink={navLink}
        pathname={pathname}
      />
      {/* {pathname !== `/${currentLocale}/landing` && (
        <div className="fixed bottom-5 right-5 md:hidden z-10">
          <ButtonCall />
        </div>
      )} */}
      <div className="sticky top-0 z-10">
        <div className="navbar">
          <div className="flex justify-between w-full">
            <div className="flex">
              <Link href="/" locale={currentLocale} className="brand">
                <Image
                  src="/logo.png"
                  alt="IndoexpatsInsurance"
                  width={85}
                  height={80}
                />
              </Link>
              {pathname !== `/${currentLocale}/landing` && (
                <Link
                  href="/"
                  locale={currentLocale}
                  className="flex items-center ms-3 text-brand md:hidden"
                >
                  <div>
                    <h6 className="m-0 font-semibold">IndoexpatsInsurance</h6>
                    {/* <p
                      style={{
                        fontSize: "10px",
                        color: "var(--primary)",
                      }}
                    >
                      by msiglifeindonesia
                    </p> */}
                  </div>
                </Link>
              )}
              {pathname === `/${currentLocale}/landing` ? (
                <Link
                  href="/"
                  locale={currentLocale}
                  className="flex items-center ms-3 text-brand"
                >
                  <div>
                    <h6 className="m-0 font-semibold">IndoexpatsInsurance</h6>
                    {/* <p
                      style={{
                        fontSize: "10px",
                        color: "var(--primary)",
                      }}
                    >
                      by msiglifeindonesia

                    </p> */}
                  </div>
                </Link>
              ) : (
                <div className="menu-wrap">
                  <div className="ms-3 flex items-center menu">
                    <div>
                      {navLink.map((link, index) => (
                        <Link
                          href={`/${currentLocale}${link.href}`}
                          locale={currentLocale}
                          key={index}
                          className={
                            pathname ===
                              `/${currentLocale}${link.href.replace(
                                /\/$/,
                                ""
                              )}` ||
                              (pathname.startsWith(
                                `/${currentLocale}${link.href}`
                              ) &&
                                link.href !== "/")
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          {link.label}
                        </Link>
                      ))}
                      {/* <button type="button" className="hidden md:inline-block " onClick={() => setModalForm(true)}>Register</button> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {pathname !== `/${currentLocale}/landing` && (
              <div
                className={`flex items-center me-4 md:hidden`}
                onClick={() => setIsOpen(true)}
              >
                <Hamburger />
              </div>
            )}
            <div
              className={`md:block ${pathname !== `/${currentLocale}/landing` && "hidden"
                }`}
            >
              <div className="flex gap-3 items-center whitespace-nowrap h-full">
                {/* {pathname !== `/${currentLocale}/landing` && (
                  <ButtonTranslate
                    currentLocale={currentLocale}
                    handleLocaleChange={handleLocaleChange}
                  />
                )} */}

                {/* <ButtonCall /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
