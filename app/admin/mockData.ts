// ═══════════════════════════════════════════════════════════
// MOCK DATA & TYPES — Kastara Ocean Admin Panel
// ═══════════════════════════════════════════════════════════

// ── Type Definitions ──

export interface Testimonial {
  id: string;
  name: string;
  program: string;
  workplace: string;
  rating: number;
  text: string;
  image: string;
  country: string;
  countryName: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  author: string;
  email: string;
  comment: string;
  page: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  status: "published" | "draft";
  author: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  nis: string;
  program: string;
  batch: string;
  phone: string;
  email: string;
  status: "active" | "graduated" | "dropped";
  enrollDate: string;
}

// ── Initial Data ──

export const initialTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ranti Sotejo",
    program: "Program Kapal Pesiar",
    workplace: "Royal Caribbean",
    rating: 5.0,
    text: "Pilihan terbaik dalam hidup saya adalah belajar di Kastara Ocean. Pelatihannya tidak hanya mengedepankan teori, tapi praktek langsung dengan standar kapal pesiar internasional.",
    image: "/heroHome2.png",
    country: "tr",
    countryName: "Turkey",
    createdAt: "2026-01-15",
  },
  {
    id: "t2",
    name: "Ahmad Raka",
    program: "Program Perhotelan",
    workplace: "Hyatt Hotel Internasional",
    rating: 4.9,
    text: "Saya yang awalnya ragu menjadi sangat percaya diri berkat porsi English Zone dan materi table manner yang intens. Dalam 6 bulan saya sudah diterima bekerja di hotel bintang 5.",
    image: "/heroHome1.png",
    country: "us",
    countryName: "USA",
    createdAt: "2026-01-20",
  },
  {
    id: "t3",
    name: "Dina Putri",
    program: "Program Food & Beverage",
    workplace: "MSC Cruises",
    rating: 5.0,
    text: "Materi F&B yang diajarkan sangat mendekati standar cruise line. Fasilitas lengkap membuat saya terbiasa menggunakan alat-alat profesional.",
    image: "/heroHome.png",
    country: "it",
    countryName: "Italy",
    createdAt: "2026-02-05",
  },
  {
    id: "t4",
    name: "Andi Pratama",
    program: "Program Housekeeping",
    workplace: "Artotel Hotel",
    rating: 4.8,
    text: "Sistem pendidikan 3 bulan teori dan 3 bulan praktik industri benar-benar efektif.",
    image: "/ruangKelas.svg",
    country: "id",
    countryName: "Indonesia",
    createdAt: "2026-02-18",
  },
  {
    id: "t5",
    name: "Siti Nurhaliza",
    program: "Program Kapal Pesiar",
    workplace: "Celebrity Cruises",
    rating: 4.9,
    text: "Berkat pelatihan di Kastara Ocean, saya bisa meraih impian bekerja di kapal pesiar mewah. Pengalaman yang luar biasa!",
    image: "/heroHome2.png",
    country: "sg",
    countryName: "Singapore",
    createdAt: "2026-03-01",
  },
];

export const initialComments: Comment[] = [
  {
    id: "c1",
    author: "Budi Santoso",
    email: "budi@email.com",
    comment: "Website yang sangat informatif! Saya jadi tertarik untuk mendaftar program kapal pesiar.",
    page: "Home",
    status: "approved",
    createdAt: "2026-03-20",
  },
  {
    id: "c2",
    author: "Maria Lestari",
    email: "maria@email.com",
    comment: "Apakah ada program untuk lulusan SMP? Anak saya sangat tertarik dengan perhotelan.",
    page: "Program",
    status: "pending",
    createdAt: "2026-03-22",
  },
  {
    id: "c3",
    author: "Fahri Rahman",
    email: "fahri@email.com",
    comment: "Terima kasih infonya! Saya sudah daftar dan menunggu jadwal batch selanjutnya.",
    page: "Contact",
    status: "approved",
    createdAt: "2026-03-23",
  },
  {
    id: "c4",
    author: "Anonymous",
    email: "anon@spam.com",
    comment: "This is a spam comment that should be rejected.",
    page: "News",
    status: "rejected",
    createdAt: "2026-03-24",
  },
  {
    id: "c5",
    author: "Dewi Anggraini",
    email: "dewi@email.com",
    comment: "Fasilitas di Kastara Ocean sangat lengkap. Saya sudah berkunjung langsung dan sangat terkesan.",
    page: "About",
    status: "approved",
    createdAt: "2026-03-25",
  },
  {
    id: "c6",
    author: "Rizky Maulana",
    email: "rizky@email.com",
    comment: "Boleh minta info lebih lanjut tentang biaya program? Terima kasih.",
    page: "Program",
    status: "pending",
    createdAt: "2026-03-26",
  },
];

export const initialNews: NewsItem[] = [
  {
    id: "n1",
    title: "Kastara Ocean Raih Akreditasi A dari BAN-PNF",
    excerpt: "Pencapaian luar biasa bagi lembaga pendidikan dan pelatihan kerja Kastara Ocean Indonesia.",
    content: "Kastara Ocean Indonesia resmi meraih akreditasi A dari Badan Akreditasi Nasional Pendidikan Non Formal (BAN-PNF). Pencapaian ini merupakan buah dari kerja keras seluruh tim dalam meningkatkan kualitas pendidikan dan pelatihan kerja di bidang perhotelan dan kapal pesiar. Akreditasi A menunjukkan bahwa Kastara Ocean telah memenuhi standar tertinggi dalam penyelenggaraan pendidikan non formal.",
    category: "Prestasi",
    image: "/heroHome.png",
    status: "published",
    author: "Admin Kastara",
    createdAt: "2026-03-10",
  },
  {
    id: "n2",
    title: "Batch 28 Resmi Dibuka: Pendaftaran Mulai 1 April 2026",
    excerpt: "Pendaftaran batch terbaru telah dibuka untuk program Kapal Pesiar dan Perhotelan.",
    content: "Kastara Ocean Indonesia membuka pendaftaran Batch 28 untuk program Kapal Pesiar dan Perhotelan. Batch ini akan dimulai pada 1 April 2026 dengan kuota terbatas. Program pelatihan berlangsung selama 6 bulan dengan format 3 bulan teori dan 3 bulan praktik industri di hotel bintang 4/5. Segera daftarkan diri Anda untuk memulai karier internasional!",
    category: "Pendaftaran",
    image: "/heroHome1.png",
    status: "published",
    author: "Admin Kastara",
    createdAt: "2026-03-15",
  },
  {
    id: "n3",
    title: "Alumni Kastara Ocean Sukses di Royal Caribbean",
    excerpt: "Alumni terbaik kami berbagi pengalaman bekerja di kapal pesiar kelas dunia.",
    content: "Salah satu alumni Kastara Ocean, Ranti Sotejo, telah berhasil meniti karier di Royal Caribbean, salah satu perusahaan kapal pesiar terbesar di dunia. Ranti berbagi pengalamannya berlayar keliling Eropa dan bagaimana pelatihan di Kastara Ocean membantunya siap menghadapi tantangan di industri hospitality internasional.",
    category: "Alumni",
    image: "/heroHome2.png",
    status: "published",
    author: "Admin Kastara",
    createdAt: "2026-03-20",
  },
  {
    id: "n4",
    title: "Kerjasama Baru dengan Novotel Hotels & Resorts",
    excerpt: "Partnership strategis untuk program magang siswa Kastara Ocean.",
    content: "Kastara Ocean menjalin kerjasama baru dengan Novotel Hotels & Resorts untuk program magang siswa. Kerjasama ini membuka peluang lebih luas bagi siswa untuk mendapatkan pengalaman kerja langsung di jaringan hotel internasional.",
    category: "Kerjasama",
    image: "/novotel.svg",
    status: "draft",
    author: "Admin Kastara",
    createdAt: "2026-03-25",
  },
];

export const initialStudents: Student[] = [
  {
    id: "s1",
    name: "Aldo Pratama",
    nis: "KO-2026-001",
    program: "Kapal Pesiar",
    batch: "Batch 27",
    phone: "081234567890",
    email: "aldo@email.com",
    status: "active",
    enrollDate: "2026-01-05",
  },
  {
    id: "s2",
    name: "Bella Kusuma",
    nis: "KO-2026-002",
    program: "Perhotelan",
    batch: "Batch 27",
    phone: "081234567891",
    email: "bella@email.com",
    status: "active",
    enrollDate: "2026-01-05",
  },
  {
    id: "s3",
    name: "Candra Wijaya",
    nis: "KO-2025-045",
    program: "Food & Beverage",
    batch: "Batch 26",
    phone: "081234567892",
    email: "candra@email.com",
    status: "graduated",
    enrollDate: "2025-07-10",
  },
  {
    id: "s4",
    name: "Diana Pertiwi",
    nis: "KO-2026-003",
    program: "Housekeeping",
    batch: "Batch 27",
    phone: "081234567893",
    email: "diana@email.com",
    status: "active",
    enrollDate: "2026-01-05",
  },
  {
    id: "s5",
    name: "Eka Saputra",
    nis: "KO-2025-046",
    program: "Kapal Pesiar",
    batch: "Batch 26",
    phone: "081234567894",
    email: "eka@email.com",
    status: "graduated",
    enrollDate: "2025-07-10",
  },
  {
    id: "s6",
    name: "Fitri Handayani",
    nis: "KO-2026-004",
    program: "Perhotelan",
    batch: "Batch 27",
    phone: "081234567895",
    email: "fitri@email.com",
    status: "active",
    enrollDate: "2026-01-05",
  },
  {
    id: "s7",
    name: "Galang Ramadhan",
    nis: "KO-2025-047",
    program: "Food & Beverage",
    batch: "Batch 25",
    phone: "081234567896",
    email: "galang@email.com",
    status: "dropped",
    enrollDate: "2025-01-15",
  },
  {
    id: "s8",
    name: "Hesti Wulandari",
    nis: "KO-2026-005",
    program: "Kapal Pesiar",
    batch: "Batch 27",
    phone: "081234567897",
    email: "hesti@email.com",
    status: "active",
    enrollDate: "2026-01-05",
  },
  {
    id: "s9",
    name: "Irfan Hakim",
    nis: "KO-2025-048",
    program: "Perhotelan",
    batch: "Batch 26",
    phone: "081234567898",
    email: "irfan@email.com",
    status: "graduated",
    enrollDate: "2025-07-10",
  },
  {
    id: "s10",
    name: "Jasmine Putri",
    nis: "KO-2026-006",
    program: "Housekeeping",
    batch: "Batch 27",
    phone: "081234567899",
    email: "jasmine@email.com",
    status: "active",
    enrollDate: "2026-01-05",
  },
  {
    id: "s11",
    name: "Kevin Anggara",
    nis: "KO-2026-007",
    program: "Kapal Pesiar",
    batch: "Batch 27",
    phone: "081234567800",
    email: "kevin@email.com",
    status: "active",
    enrollDate: "2026-01-05",
  },
  {
    id: "s12",
    name: "Lina Mariana",
    nis: "KO-2025-049",
    program: "Food & Beverage",
    batch: "Batch 26",
    phone: "081234567801",
    email: "lina@email.com",
    status: "graduated",
    enrollDate: "2025-07-10",
  },
];

// ── LocalStorage Helpers ──

const STORAGE_KEYS = {
  testimonials: "kastara_admin_testimonials",
  comments: "kastara_admin_comments",
  news: "kastara_admin_news",
  students: "kastara_admin_students",
};

export function getData<T>(key: keyof typeof STORAGE_KEYS, initial: T[]): T[] {
  if (typeof window === "undefined") return initial;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS[key]);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(initial));
    return initial;
  } catch {
    return initial;
  }
}

export function setData<T>(key: keyof typeof STORAGE_KEYS, data: T[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
