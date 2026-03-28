import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-950 py-12 mt-20 px-8 md:px-20 relative overflow-hidden">
      {/* Decorative bg element */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-800 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-300">
          <div>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Kastara Ocean Logo"
                width={120}
                height={100}
                className="rounded-xl mb-4 bg-white/5 p-2 backdrop-blur-sm"
              />
            </Link>
            <h3 className="text-lg font-semibold text-white mb-3">
              Kastara Ocean
            </h3>
            <p className="text-sm leading-relaxed text-blue-200/80">
              Lembaga pelatihan dan penyalur tenaga kerja
              <br />
              ke kapal pesiar dan hotel internasional.
              <br />
              Terakreditasi dan Kinerja &quot;A&quot;.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Contact Info
            </h3>
            <p className="text-sm leading-relaxed text-blue-200/80">
              Yogyakarta, Indonesia
            </p>
            <p className="mt-3 text-sm text-blue-200/80">Phone: 0822-2087-9544</p>
            <p className="text-sm text-blue-200/80">info@kastaraocean.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-blue-200/80 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white hover:underline transition-all duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white hover:underline transition-all duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white hover:underline transition-all duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Newsletter
            </h3>
            <p className="text-sm mb-4 leading-relaxed text-blue-200/80">
              Dapatkan info terbaru tentang
              <br />
              program dan peluang karier
              <br />
              dari Kastara Ocean.
            </p>
            <div className="flex items-center bg-[#11244e] border border-blue-800/50 rounded-full overflow-hidden shadow-inner focus-within:border-blue-500 transition-colors">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-2.5 text-sm text-white bg-transparent outline-none placeholder:text-blue-300/50"
              />
              <button className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 transition-colors duration-200">
                ➤
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3 mt-8">
                Mulai Kariermu
              </h3>
              <p className="text-sm mb-4 leading-relaxed text-blue-200/80">
                Raih mimpimu bekerja di hotel<br />dan kapal pesiar internasional.
              </p>
              <Link href="/pendaftaran" className="inline-block border border-blue-800 hover:border-blue-500 bg-[#11244e] hover:bg-[#1a3675] text-white font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-blue-900/20">
                Pendaftaran Online &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-blue-300/50 text-xs mt-12 pb-2">
          <p>Copyright ©2025 Kastara Ocean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
