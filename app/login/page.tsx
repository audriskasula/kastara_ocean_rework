"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import "@/styles/admin.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username wajib diisi");
      return;
    }
    if (!password.trim()) {
      setError("Password wajib diisi");
      return;
    }

    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Login gagal");
    }
  };

  if (isLoading) {
    return (
      <div className="admin-login-page">
        <div style={{
          width: 40,
          height: 40,
          border: "3px solid rgba(255,255,255,0.2)",
          borderTopColor: "#e11d48",
          borderRadius: "50%",
          animation: "adminSpin 0.6s linear infinite",
        }} />
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <Image src="/logo.svg" alt="Kastara Ocean" width={52} height={52} />
        </div>
        <h1>Selamat Datang</h1>
        <p className="login-subtitle">Masuk ke Admin Panel Kastara Ocean</p>

        {error && (
          <div className="admin-login-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Username</label>
            <input
              type="text"
              className="admin-form-input"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="admin-form-input"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  padding: 4,
                }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right", marginTop: -15, marginBottom: 20 }}>
            <button 
              type="button" 
              onClick={() => setShowForgotModal(true)}
              style={{ 
                fontSize: "13px", 
                color: "#3b82f6", 
                background: "none", 
                border: "none", 
                cursor: "pointer",
                fontWeight: 500
              }}
            >
              Lupa password?
            </button>
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading && <span className="spinner" />}
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 20 }}>
          © 2026 Kastara Ocean Indonesia
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-content-small">
            <h3>Lupa Password?</h3>
            <p>
              Untuk melakukan pengaturan ulang kata sandi, harap hubungi <strong>Super Admin</strong> atau 
              administrator utama tim Kastara Ocean.
            </p>
            <p style={{ marginTop: 10 }}>
              Sertakan username dan bukti identitas untuk verifikasi keamanan.
            </p>
            <button 
              className="admin-btn admin-btn-primary" 
              style={{ width: "100%", marginTop: 20 }}
              onClick={() => setShowForgotModal(false)}
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content-small {
          background: white;
          padding: 30px;
          border-radius: 16px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        }
        .modal-content-small h3 {
          margin-bottom: 15px;
          color: #1e293b;
          font-size: 20px;
        }
        .modal-content-small p {
          color: #64748b;
          line-height: 1.6;
          font-size: 14px;
        }
      `}</style>

    </div>
  );
}
