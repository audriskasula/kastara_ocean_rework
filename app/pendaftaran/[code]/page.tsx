"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { Loader2, AlertCircle } from "lucide-react";
import Pendaftaran from "../page";

export default function AffiliateRegistrationPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [affiliateData, setAffiliateData] = useState<{ google_form_url: string } | null>(null);

  useEffect(() => {
    async function getAffiliate() {
      try {
        const res = await fetch(`/api/affiliates/${code}`);
        const result = await res.json();
        
        if (res.ok && result.data) {
          setAffiliateData(result.data);
        } else {
          setError(result.error || "Kode affiliate tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal memuat data affiliate");
      } finally {
        setLoading(false);
      }
    }
    getAffiliate();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md">
          <div className="mb-10 animate-bounce">
            <Image src="/logo.svg" alt="Kastara Ocean" width={60} height={60} className="mx-auto" />
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin mx-auto"></div>
            <h1 className="text-2xl font-black text-slate-900">Menyiapkan Formulir...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-[32px] shadow-xl border border-rose-100 max-w-sm">
          <AlertCircle size={48} className="text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Pendaftaran Tidak Tersedia</h2>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <a href="/pendaftaran" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-xl">
            Gunakan Formulir Biasa
          </a>
        </div>
      </div>
    );
  }

  // Render the actual registration page but with the custom form URL
  return <Pendaftaran customGoogleFormUrl={affiliateData?.google_form_url} />;
}
