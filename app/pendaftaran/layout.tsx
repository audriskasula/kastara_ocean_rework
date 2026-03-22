import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Sekolah Kapal Pesiar & Hotel - Kastara Ocean",
  description: "Formulir pendaftaran Kastara Ocean. LPK perhotelan, pelatihan hotel, dan pendidikan kerja cepat untuk persiapan karier internasional Anda.",
};

export default function PendaftaranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
