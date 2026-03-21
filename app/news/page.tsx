import Link from "next/link";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionComponents";

const dummyNews = [
  {
    slug: "persiapan-wawancara-kapal-pesiar",
    title: "5 Persiapan Penting Menghadapi Wawancara Kapal Pesiar",
    excerpt: "Tips jitu agar lolos interview kerja di perusahaan kapal pesiar internasional.",
    category: "Tips Karier",
    date: "12 Mar 2026",
    image: "/Hotels/ritz.png",
  },
  {
    slug: "peluang-kerja-perhotelan-eropa",
    title: "Peluang Kerja Perhotelan di Eropa Timur Meningkat Tajam",
    excerpt: "Permintaan akan tenaga kerja hospitality dari Indonesia terus melonjak di pasar Eropa.",
    category: "Berita Industri",
    date: "08 Mar 2026",
    image: "/Cruise/cruise1.png",
  },
  {
    slug: "kastara-jalin-kemitraan-baru",
    title: "Kastara Ocean Jalin Kemitraan Baru dengan Jaringan Hotel Mewah di Dubai",
    excerpt: "Peluang baru bagi kandidat Indonesia untuk bekerja di jantung Timur Tengah.",
    category: "Update Perusahaan",
    date: "01 Mar 2026",
    image: "/overlay.png",
  },
  {
    slug: "kisah-sukses-alumni",
    title: "Kisah Sukses: Dari Waiter Bali ke Food & Beverage Manager di Miami",
    excerpt: "Inspirasi alumni Kastara Ocean yang meraih posisi impian dalam 5 tahun.",
    category: "Kisah Sukses",
    date: "25 Feb 2026",
    image: "/heroHome.png",
  },
];

export default function NewsList() {
  const featured = dummyNews[0];
  const restNews = dummyNews.slice(1);

  return (
    <div className="overflow-x-hidden pb-28">
      {/* ── HEADER ── */}
      <section className="bg-slate-50 border-b border-gray-100 mb-16">
        <div className="max-w-7xl mx-auto px-6 pb-16 pt-22 md:pb-24 md:pt-40 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-primary font-bold mb-4">
              Pusat Informasi
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              Berita & <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Artikel</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Simak berita terbaru seputar industri hospitality, kisah sukses, dan tips karier internasional dari pakarnya.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── FEATURED NEWS ── */}
        <FadeIn direction="up">
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
              Berita Utama
            </h2>
            <Link href={`/news/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl md:rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[400px] w-full bg-gray-100 overflow-hidden">
                  <Image fill src={featured.image} alt={featured.title} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 lg:p-12 lg:pr-16">
                  <div className="flex items-center gap-3 mb-4 text-sm font-semibold">
                    <span className="text-primary bg-rose-50 px-3 py-1 rounded-full">{featured.category}</span>
                    <span className="text-gray-400">{featured.date}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="font-semibold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                    Baca Selengkapnya
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </FadeIn>

        {/* ── LIST NEWS ── */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-gray-300 rounded-full inline-block"></span>
          Artikel Terbaru
        </h2>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restNews.map((news) => (
            <StaggerItem key={news.slug}>
              <Link href={`/news/${news.slug}`} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 h-full flex flex-col hover:-translate-y-1 duration-300">
                  <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                    <Image fill src={news.image} alt={news.title} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 text-xs font-semibold">
                      <span className="text-primary">{news.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">{news.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
                      {news.excerpt}
                    </p>
                    <div className="font-semibold text-primary text-sm mt-auto">
                      Lihat Detail &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </div>
  );
}
