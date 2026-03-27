import CloseIcon from "@/icons/CloseIcon";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface NavLink {
  href: string;
  label: string;
}

interface ISidebar {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navLink: NavLink[];
  pathname: string;
}

export default function Sidebar({
  isOpen,
  setIsOpen,
  navLink,
  pathname,
}: ISidebar) {
  // Handle ESC key to close sidebar
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <div
        className={`sidebar overflow-y-auto fixed w-80 h-full left-0 z-[999] bg-white/95 backdrop-blur-xl shadow-[20px_0_30px_rgba(0,0,0,0.05)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100/60 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center">
            <Link href="/" className="brand flex shrink-0" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo.svg"
                alt="Kastara Ocean"
                width={50}
                height={45}
                className="w-auto h-auto max-h-[40px] drop-shadow-sm"
              />
            </Link>
            <Link
              href="/"
              className="flex items-center ms-3"
              onClick={() => setIsOpen(false)}
            >
              <p className="m-0 font-bold text-gray-800 tracking-tight text-[15px]">Kastara Ocean</p>
            </Link>
          </div>
          <button
            className="p-2.5 rounded-full hover:bg-gray-100 focus:bg-gray-100 active:scale-90 transition-all text-gray-500 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">
            Menu Navigasi
          </p>
          <div className="flex flex-col gap-1.5">
            {navLink.map((link, index) => {
              const isActive =
                pathname === link.href ||
                (pathname.startsWith(link.href + "/") && link.href !== "/");
                
              return (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-4 rounded-2xl text-[15px] font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-gray-600 hover:bg-rose-50 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
