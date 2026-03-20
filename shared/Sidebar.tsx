import CloseIcon from "@/icons/CloseIcon";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <>
      <div
        className={`sidebar overflow-hidden fixed w-80 h-full left-0 z-40 top-0 bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center">
            <Link href="/" className="brand" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo.svg"
                alt="Kastara Ocean"
                width={50}
                height={45}
              />
            </Link>
            <Link
              href="/"
              className="flex items-center ms-2"
              onClick={() => setIsOpen(false)}
            >
              <p className="m-0 font-semibold text-sm">Kastara Ocean</p>
            </Link>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
            Menu
          </p>
        </div>

        <div>
          {navLink.map((link, index) => (
            <div
              key={index}
              className={`mx-3 rounded-xl transition-colors duration-200 ${
                pathname === link.href ||
                (pathname.startsWith(link.href + "/") && link.href !== "/")
                  ? "active"
                  : "hover:bg-gray-50"
              }`}
            >
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block p-4 text-lg"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
