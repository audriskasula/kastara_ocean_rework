import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Sekolah Kapal Pesiar & Perhotelan Terbaik",
  description: "Daftar sekarang di Kastara Ocean. Lembaga Pelatihan Kerja (LPK) Perhotelan dan LKP Kapal Pesiar berakreditasi A. Sekolah singkat kerja dengan masa depan cerah.",
};

export default function Home() {
  return <HomeClient />;
}
