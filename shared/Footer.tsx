import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-950 py-12 mt-20 px-8 md:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-300">
          <div>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Kastara Ocean Logo"
                width={120}
                height={100}
                className="rounded-xl mb-4"
              />
            </Link>
            <h3 className="text-lg font-semibold text-white mb-3">
              Kastara Ocean
            </h3>
            <p className="text-sm leading-relaxed">
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
            <p className="text-sm leading-relaxed">
              Yogyakarta, Indonesia
            </p>
            <p className="mt-3 text-sm">Phone: 0822-2087-9544</p>
            <p className="text-sm">info@kastaraocean.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors duration-200"
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
            <p className="text-sm mb-4 leading-relaxed">
              Dapatkan info terbaru tentang
              <br />
              program dan peluang karier
              <br />
              dari Kastara Ocean.
            </p>
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 transition-colors duration-200">
                ➤
              </button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 mt-8">
                Mulai Kariermu
              </h3>
              <p className="text-sm mb-4 leading-relaxed">
                Raih mimpimu bekerja di hotel<br/>dan kapal pesiar internasional.
              </p>
              <Link href="/pendaftaran" className="inline-block bg-primary hover:bg-rose-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors duration-200">
                Pendaftaran Online &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm mt-12 border-t border-gray-700/50 pt-6">
          <p>Copyright ©2025 Kastara Ocean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
