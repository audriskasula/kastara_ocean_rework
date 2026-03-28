import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { 
  initialTestimonials, 
  initialComments, 
  initialNews, 
  initialStudents 
} from "../app/admin/mockData";

// Load environment variables from .env
config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing SUPABASE env vars in .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log("Seeding Testimonials...");
  const { error: err1 } = await supabase
    .from("testimonials")
    .upsert(initialTestimonials.map(v => {
      const { id, createdAt, ...rest } = v;
      return { ...rest, created_at: new Date(createdAt).toISOString() };
    }));
  if (err1) console.error("Error formatting/inserting testimonials:", err1.message);

  console.log("Seeding Comments...");
  const { error: err2 } = await supabase
    .from("comments")
    .upsert(initialComments.map(v => {
      const { id, createdAt, ...rest } = v;
      return { ...rest, created_at: new Date(createdAt).toISOString() };
    }));
  if (err2) console.error("Error formatting/inserting comments:", err2.message);

  console.log("Seeding News...");
  const { error: err3 } = await supabase
    .from("news")
    .upsert(initialNews.map(v => {
      const { id, createdAt, ...rest } = v;
      return { ...rest, created_at: new Date(createdAt).toISOString() };
    }));
  if (err3) console.error("Error formatting/inserting news:", err3.message);

  console.log("Seeding Students...");
  const { error: err4 } = await supabase
    .from("students")
    .upsert(initialStudents.map((v: any) => ({
      name: v.name,
      nis: v.nis,
      program: v.program,
      batch: v.batch,
      phone: v.phone,
      email: v.email,
      status: v.status,
      enroll_date: v.enrollDate
    })));
  if (err4) console.error("Error formatting/inserting students:", err4.message);

  console.log("Seeding Database Completed!");
}

seedData();
