import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionComponents";
import { supabase } from "@/lib/supabase";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function NewsDetail({ params }: { params: { slug: string } }) {
  // Try to fetch by ID (in new mapping we use UUID as slug, but if user inputs regular slug we can change later)
  const { data: article, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", params.slug)
    .single();

  if (error || !article) {
    notFound();
  }

  // Fetch 2 latest non-current news for "Related Posts"
  const { data: relatedNews } = await supabase
    .from("news")
    .select("*")
    .neq("id", params.slug)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(2);

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
                {formatDate(article.created_at)}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── GAMBAR UTAMA ── */}
        <FadeIn delay={0.15}>
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-gray-100 rounded-2xl md:rounded-[32px] overflow-hidden shadow-sm mb-12">
            <Image src={article.image || "/Hotels/ritz.png"} fill alt={article.title} className="object-cover" />
          </div>
        </FadeIn>

        {/* ── ISI KONTEN ── */}
        <FadeIn delay={0.25} direction="up">
          <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-primary hover:prose-a:text-rose-700 prose-img:rounded-2xl whitespace-pre-line">
            {article.content}
          </div>
        </FadeIn>

        <hr className="my-16 border-gray-100" />

        {/* ── RELATED POSTS ── */}
        {relatedNews && relatedNews.length > 0 && (
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-primary pl-4">
              Berita Terkait Lainnya
            </h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map((rel: { id: string; title: string; image: string; created_at: string }) => (
                <StaggerItem key={rel.id}>
                  <Link href={`/news/${rel.id}`} className="group flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                    <div className="relative aspect-video sm:w-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                      <Image src={rel.image || "/overlay.png"} fill alt={rel.title} className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">{rel.title}</h4>
                      <p className="text-xs text-gray-500 font-medium">{formatDate(rel.created_at)}</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        )}

      </article>
    </div>
  );
}
