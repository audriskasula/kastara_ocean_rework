/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from "@/icons/CloseIcon";
import Image from "next/image";
import Link from "next/link";

interface ISidebar {
  isOpen: any;
  setIsOpen: any;
  navLink: any;
  pathname: any;
  setModalForm?: any;
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
        className={`sidebar overflow-hidden fixed w-80 h-full left-0 z-40 top-0 bg-white backdrop-sepia-50 hiddens transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between p-3 mb-3 border">
          <div className="flex">
            <Link href="" className="brand" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo.png"
                alt="IndoexpatsInsurance"
                width={50}
                height={45}
              />
            </Link>
            <Link
              href="/"
              className="flex items-center ms-2 text-brand md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <div>
                <p className="m-0 font-semibold text-sm">IndoexpatsInsurance</p>
                {/* <p style={{ fontSize: "8px", color: "var(--primary)" }}>
                  by msiglifeindonesia
                </p> */}
              </div>
            </Link>
          </div>
          <button
            className="p-4 text-right text-white"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex justify-between items-center p-5">
          <p className="text-xl text-gray-400">Menu</p>

        </div>
        <div>
          {navLink.map((link: any, index: number) => (
            <div
              key={index}
              className={`p-4 m-3 text-xl ${pathname === `/${link.href.replace(/\/$/, "")}` ||
                  (pathname.startsWith(`/${link.href}`) &&
                    link.href !== "/")
                  ? "active"
                  : ""
                }`}
            >
              <Link
                href={`/${link.href}`}
                onClick={() => setIsOpen(false)}
                className=""
              >
                <p>
                  {link.label}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
