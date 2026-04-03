"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import Image from "next/image";
import { ExternalLink, MousePointer2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export interface Affiliate {
  id: string;
  user_id: string;
  code: string;
  phone: string;
  google_form_url: string;
  click_count: number;
  created_at: string;
  admin_users: {
    name: string;
    username: string;
    avatar: string;
  };
}

export default function ManageAffiliatesPage() {
  const { user, isSuperAdmin } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Affiliate | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/affiliates/all");
      const result = await res.json();
      if (result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching all affiliates:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!user) return;
    if (!isSuperAdmin) {
      router.replace("/admin");
    } else {
      setMounted(true);
      fetchData();
    }
  }, [user, isSuperAdmin, router, fetchData]);

  const handleDelete = async () => {
    if (!deleteModal) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`/api/affiliates?id=${deleteModal.id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Gagal menghapus affiliate");

      showToast("Link affiliate berhasil dihapus");
      setDeleteModal(null);
      fetchData();
    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  const columns: Column<Affiliate>[] = [
    {
      key: "admin",
      label: "Administrator",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", background: "#f1f5f9" }}>
            <Image src={item.admin_users?.avatar || "/femaleAvatar.svg"} alt="Avatar" width={32} height={32} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{item.admin_users?.name}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>@{item.admin_users?.username}</div>
          </div>
        </div>
      )
    },
    {
      key: "link",
      label: "Affiliate Link",
      render: (item) => (
        <span className="font-mono text-[11px] text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">
          /pendaftaran/{item.code}
        </span>
      )
    },
    {
      key: "target",
      label: "Target Form",
      render: (item) => (
        <a 
          href={item.google_form_url} 
          target="_blank" 
          className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors text-xs overflow-hidden max-w-[200px]"
        >
          <ExternalLink size={12} />
          <span className="truncate">{item.google_form_url}</span>
        </a>
      )
    },
    {
      key: "click_count",
      label: "Total Lead",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, color: "#1e293b" }}>
          <MousePointer2 size={12} className="text-slate-400" />
          {item.click_count || 0}
        </div>
      )
    },
    {
      key: "actions",
      label: "Aksi",
      render: (item) => (
        <button 
          onClick={() => setDeleteModal(item)}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          title="Hapus Link"
        >
          <Trash2 size={16} />
        </button>
      )
    }
  ];

  if (!mounted || !user || !isSuperAdmin) return null;

  return (
    <>
      <AdminHeader 
        title="Monitoring Affiliate" 
        subtitle="Lihat semua admin yang menggunakan sistem affiliate pendaftaran." 
      />

      <div className="admin-content">
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          searchKeys={["code", "admin_users.name", "admin_users.username"]}
        />
      </div>

      <DeleteConfirmModal 
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        itemName={`Link affiliate milik ${deleteModal?.admin_users?.name}`}
      />

      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}

      <style jsx>{`
        .truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </>
  );
}
