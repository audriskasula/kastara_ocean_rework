import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimoni Alumni Sekolah Kapal Pesiar & Perhotelan",
  description: "Cerita sukses alumni LPK sekolah perhotelan dan kapal pesiar Kastara Ocean. Bukti nyata kualitas kursus kerja hotel berstandar internasional kami.",
  keywords: ["testimoni sekolah kapal pesiar", "ulasan sekolah perhotelan", "alumni LPK perhotelan", "cerita sukses kapal pesiar"],
};

export default function TestimonialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
