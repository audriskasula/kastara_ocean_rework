"use client";

import React, { useState, useMemo } from "react";
import Skeleton from "@/components/Skeleton";

// ── Types ──
export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  searchKeys?: string[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAdd?: () => void;
  addLabel?: string;
  loading?: boolean;
  pageSize?: number;
}

// ── Component ──
export default function DataTable<T extends { id: string }>({
  columns,
  data,
  searchKeys = [],
  onEdit,
  onDelete,
  onAdd,
  addLabel = "Tambah Data",
  loading = false,
  pageSize = 8,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // Filter
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((item) =>
      searchKeys.some((key) => {
        const val = (item as Record<string, unknown>)[key];
        return typeof val === "string" && val.toLowerCase().includes(q);
      })
    );
  }, [data, search, searchKeys]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      const aStr = String(aVal ?? "").toLowerCase();
      const bStr = String(bVal ?? "").toLowerCase();
      if (aStr < bStr) return sortDir === "asc" ? -1 : 1;
      if (aStr > bStr) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Reset page when search changes
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="admin-table-container">
        {/* Skeleton Toolbar */}
        <div className="admin-table-toolbar">
          <div className="admin-search-box">
            <Skeleton width="180px" height="20px" />
          </div>
          {onAdd && (
            <Skeleton width="130px" height="38px" borderRadius="10px" />
          )}
        </div>

        {/* Skeleton Table */}
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 48 }}>#</th>
                {columns.map((col) => (
                  <th key={col.key}>
                    <Skeleton width="80px" height="18px" />
                  </th>
                ))}
                {(onEdit || onDelete) && <th style={{ width: 100 }}>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i}>
                  <td style={{ color: "#94a3b8", fontSize: 13 }}>{i + 1}</td>
                  {columns.map((col) => (
                    <td key={col.key}>
                      <Skeleton width="90%" height="18px" />
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td>
                      <div className="admin-table-actions">
                        <Skeleton width="32px" height="32px" borderRadius="8px" />
                        <Skeleton width="32px" height="32px" borderRadius="8px" />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Skeleton Pagination */}
        <div className="admin-pagination">
          <Skeleton width="220px" height="16px" />
          <div className="admin-pagination-controls">
            <Skeleton width="150px" height="34px" borderRadius="8px" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      {/* Toolbar */}
      <div className="admin-table-toolbar">
        <div className="admin-search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Cari data..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {onAdd && (
          <button className="admin-btn admin-btn-primary" onClick={onAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {addLabel}
          </button>
        )}
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="admin-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <h3>Data Tidak Ditemukan</h3>
          <p>{search ? "Coba ubah kata kunci pencarian" : "Belum ada data tersedia"}</p>
        </div>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>#</th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={sortKey === col.key ? "sorted" : ""}
                      onClick={() => col.sortable !== false && handleSort(col.key)}
                      style={{ cursor: col.sortable !== false ? "pointer" : "default" }}
                    >
                      {col.label}
                      {col.sortable !== false && (
                        <span className="sort-indicator">
                          {sortKey === col.key ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                        </span>
                      )}
                    </th>
                  ))}
                  {(onEdit || onDelete) && <th style={{ width: 100 }}>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {paginated.map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{ color: "#94a3b8", fontSize: 13 }}>
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render
                          ? col.render(item)
                          : String((item as Record<string, unknown>)[col.key] ?? "")}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td>
                        <div className="admin-table-actions">
                          {onEdit && (
                            <button
                              className="admin-btn-icon edit"
                              onClick={() => onEdit(item)}
                              title="Edit"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="admin-btn-icon delete"
                              onClick={() => onDelete(item)}
                              title="Hapus"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="admin-pagination">
            <div className="admin-pagination-info">
              Menampilkan {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sorted.length)} dari {sorted.length} data
            </div>
            <div className="admin-pagination-controls">
              <button
                className="admin-pagination-btn"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ←
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`admin-pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="admin-pagination-btn"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
