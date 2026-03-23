import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri & Fasilitas Sekolah Kapal Pesiar Terfavorit",
  description: "Dokumentasi kegiatan dan fasilitas LPK sekolah perhotelan & kapal pesiar Kastara Ocean. Lihat ruang praktik standar internasional kami.",
  keywords: ["sekolah kapal pesiar", "sekolah perhotelan", "galeri LPK perhotelan", "fasilitas sekolah hotel", "pelatihan kapal pesiar"],
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
