import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/app/LayoutShell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kastaraocean.com"), // Base URL for the domain
  title: {
    default: "Kastara Ocean | Kesempatan Berkarier Di Luar Negeri",
    template: "%s | Kastara Ocean",
  },
  description:
    "Kastara Ocean Indonesia hadir untuk membantu Anda berkarier di kapal pesiar dan hotel internasional. LPK / LKP terakreditasi A siap kerja.",
  keywords: [
    "sekolah kapal pesiar",
    "sekolah perhotelan",
    "pelatihan hotel",
    "pelatihan kapal pesiar",
    "LPK perhotelan",
    "LKP kapal pesiar",
    "kursus kerja hotel",
    "sekolah singkat kerja",
    "pendidikan kerja cepat",
    "training hospitality",
    "sekolah siap kerja",
    "kerja hotel",
    "kerja kapal pesiar"
  ],
  authors: [{ name: "Kastara Ocean Indonesia" }],
  openGraph: {
    title: "Kastara Ocean | Kesempatan Berkarier Di Luar Negeri",
    description: "Kastara Ocean Indonesia hadir untuk membantu Anda berkarier di kapal pesiar dan hotel internasional. Lembaga resmi siap kerja.",
    url: "https://kastaraocean.com",
    siteName: "Kastara Ocean",
    images: [
      {
        url: "/og-image.jpg", // Assumed placeholder 
        width: 1200,
        height: 630,
        alt: "Kastara Ocean - Sekolah Kapal Pesiar & Perhotelan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kastara Ocean | Berkarier Di Luar Negeri",
    description: "Kastara Ocean Indonesia hadir untuk membantu Anda berkarier di kapal pesiar dan hotel internasional.",
    images: ["/og-image.jpg"],
  },
};

// Educational Organization Schema Markup
const schemaData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Kastara Ocean Indonesia",
  "url": "https://kastaraocean.com",
  "logo": "https://kastaraocean.com/logo.svg",
  "sameAs": [
    // Social links can go here
  ],
  "description": "Lembaga Pendidikan dan Pelatihan Kerja kapal pesiar dan perhotelan terakreditasi A, membantu lulusan meraih karier internasional.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jakarta Selatan",
    "addressRegion": "DKI Jakarta",
    "postalCode": "12190",
    "streetAddress": "Gedung Kastara Tower Lt. 4, Jl. Sudirman No. 45"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "telephone": "+62-812-3456-7890", // Example phone, will be generic
    "email": "info@kastaraocean.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
