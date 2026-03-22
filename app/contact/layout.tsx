import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak & Lokasi - Kastara Ocean",
  description: "Hubungi agen Kastara Ocean untuk konsultasi program pelatihan kapal pesiar dan perhotelan. Layanan customer service 24/7 pendaftaran sekolah siap kerja.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
