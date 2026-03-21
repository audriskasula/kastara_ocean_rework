import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionComponents";

export default function NewsDetail({ params }: { params: { slug: string } }) {
  // In a real app, we'd fetch based on params.slug.
  // Using dummy data directly here.
  const article = {
    title: "5 Persiapan Penting Menghadapi Wawancara Kapal Pesiar",
    category: "Tips Karier",
    date: "12 Mar 2026",
    author: "Tim Redaksi Kastara",
    readTime: "4 Min Read",
    image: "/Hotels/ritz.png",
    content: (
      <>
        <p>Industri kapal pesiar (cruise ship) menawarkan prospek karier yang sangat menjanjikan dengan standar penghasilan internasional. Namun, untuk bisa lolos menjadi awak kapal pesiar, Anda harus melewati tahapan seleksi yang cukup ketat, salah satunya adalah tahap wawancara.</p>
        <p>Wawancara kerja untuk kapal pesiar tidak hanya sekadar menguji kemampuan bahasa Inggris, tetapi juga mentalitas, pengalaman kerja, dan kesiapan operasional di laut. Berikut ini adalah 5 persiapan penting yang wajib Anda perhatikan sebelum menghadapi wawancara:</p>
        
        <h3>1. Pahami Visi dan Standar Perusahaan Pelayaran</h3>
        <p>Setiap perusahaan kapal pesiar memiliki standar layanan pelanggan (hospitality) yang unik. Misalnya, Royal Caribbean fokus pada hiburan keluarga yang dinamis, sementara Holland America Line mungkin lebih mengedepankan keanggunan klasik. Pelajari profil perusahaan yang Anda lamar agar jawaban Anda relevan dengan budaya kerja mereka.</p>

        <h3>2. Tingkatkan Kemampuan Bahasa Inggris Praktis</h3>
        <p>Bahasa Inggris adalah bahasa utama di semua kapal pesiar internasional. Pastikan Anda berlatih skenario percakapan spesifik sesuai posisi yang dilamar. Misalnya, jika Anda melamar sebagai bartender, pelajari glosarium tentang mixology; jika sebagai room attendant, pelajari kosakata seputar tata graha.</p>

        <h3>3. Siapkan Mental untuk "Working Under Pressure"</h3>
        <p>Bekerja di kapal pesiar berarti siap bekerja 7 hari seminggu dengan durasi 10-12 jam per hari selama kontrak kerja berlangsung. Saat wawancara, tunjukkan bahwa Anda memiliki stamina fisik dan mental yang kuat. Sampaikan pengalaman nyata saat Anda berhasil menangani situasi di bawah tekanan tinggi.</p>
        
        <div className="bg-rose-50 p-6 rounded-2xl border-l-4 border-primary my-8">
          <p className="font-semibold text-gray-900 m-0 text-lg">"Tunjukkan sikap profesional, ramah (hospitality mind), dan semangat pantang menyerah. Itulah yang dicari para recruiter kapal pesiar."</p>
        </div>

        <h3>4. Pengalaman Relevan adalah Kunci</h3>
        <p>Recruiter akan bertanya secara mendetail mengenai pengalaman kerja Anda sebelumnya. Jangan sekadar bercerita; gunakan metode STAR (Situation, Task, Action, Result) untuk menjelaskan bagaimana Anda menyelesaikan masalah atau memberikan layanan prima kepada tamu VIP.</p>

        <h3>5. Penampilan Profesional dan Grooming</h3>
        <p>Penampilan fisik (grooming) sangat krusial di industri hospitality. Saat menghadiri wawancara (baik tatap muka maupun online), kenakan pakaian formal, tata rambut dengan sangat rapi, dan pastikan pencahayaan ruangan terang (jika wawancara via zoom/skype).</p>
        
        <p>Dengan persiapan yang matang dan percaya diri, peluang Anda untuk mewujudkan mimpi keliling dunia sambil bekerja akan semakin terbuka lebar. Jika Anda butuh bantuan lebih lanjut terkait persiapan dokumen dan simulasi interview, Kastara Ocean memiliki program pelatihan intensif siap kerja yang bisa Anda ikuti!</p>
      </>
    )
  };

  return (
    <div className="overflow-x-hidden pt-20 pb-28 bg-white">
      {/* ── BREADCRUMB ── */}
      <div className="bg-slate-50 border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-6 text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/news" className="hover:text-primary transition-colors">News</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{article.category}</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 mt-12 md:mt-16">
        
        {/* ── HEADER ARTIKEL ── */}
        <FadeIn>
          <div className="mb-10 text-center">
            <div className="inline-block bg-rose-50 text-primary font-bold text-sm px-4 py-1.5 rounded-full mb-6">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden shrink-0">
                  <Image src="/femaleAvatar.svg" width={40} height={40} alt={article.author} className="w-full h-full object-cover" />
                </div>
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {article.readTime}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── GAMBAR UTAMA ── */}
        <FadeIn delay={0.15}>
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-gray-100 rounded-2xl md:rounded-[32px] overflow-hidden shadow-sm mb-12">
            <Image src={article.image} fill alt={article.title} className="object-cover" />
          </div>
        </FadeIn>

        {/* ── ISI KONTEN ── */}
        <FadeIn delay={0.25} direction="up">
          <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-primary hover:prose-a:text-rose-700 prose-img:rounded-2xl">
            {article.content}
          </div>
        </FadeIn>

        <hr className="my-16 border-gray-100" />

        {/* ── RELATED POSTS ── */}
        <FadeIn direction="up">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">
            Berita Terkait Lainnya
          </h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerItem>
              <Link href="/news" className="group flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative aspect-video sm:w-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <Image src="/Cruise/cruise1.png" fill alt="Related" className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">Peluang Kerja Perhotelan di Eropa Timur Meningkat Tajam</h4>
                  <p className="text-xs text-gray-500 font-medium">08 Mar 2026</p>
                </div>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/news" className="group flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative aspect-video sm:w-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <Image src="/overlay.png" fill alt="Related" className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">Kastara Ocean Jalin Kemitraan Baru dengan Jaringan Hotel Mewah</h4>
                  <p className="text-xs text-gray-500 font-medium">01 Mar 2026</p>
                </div>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </FadeIn>

      </article>
    </div>
  );
}
