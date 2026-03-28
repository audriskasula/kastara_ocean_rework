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
  created_at: string;
}

export interface Comment {
  id: string;
  author: string;
  email: string;
  comment: string;
  page: string;
  status: "approved" | "pending" | "rejected";
  created_at: string;
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
  created_at: string;
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
  enroll_date: string;
  created_at: string;
}

// ── Initial Data ──

export const initialTestimonials: Array<{ id?: string; createdAt: string; [key: string]: unknown }> = [];
export const initialComments: Array<{ id?: string; createdAt: string; [key: string]: unknown }> = [];
export const initialNews: Array<{ id?: string; createdAt: string; [key: string]: unknown }> = [];
export const initialStudents: Array<{ name: string; nis: string; program: string; batch: string; phone: string; email: string; status: string; enrollDate: string }> = [];

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
