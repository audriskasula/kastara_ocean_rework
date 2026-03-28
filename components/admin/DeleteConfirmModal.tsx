"use client";

import Modal from "./Modal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  loading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  loading,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Konfirmasi Hapus"
      footer={
        <>
          <button className="admin-btn admin-btn-secondary" onClick={onClose} disabled={loading}>
            Batal
          </button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </>
      }
    >
      <div className="admin-delete-confirm">
        <div className="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>
        <h3>Hapus Data?</h3>
        <p>
          Apakah Anda yakin ingin menghapus <span className="item-name">&quot;{itemName}&quot;</span>? Tindakan ini tidak dapat dibatalkan.
        </p>
      </div>
    </Modal>
  );
}
