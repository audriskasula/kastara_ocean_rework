/**
 * lib/crypto.ts
 * 
 * Utility password hashing menggunakan Web Crypto API (built-in browser & Node.js).
 * Menggunakan SHA-256 dengan salt unik per-user untuk mencegah rainbow table attack.
 * 
 * Format hash: `sha256:{salt}:{hash}`
 */

/**
 * Generate random salt 16 byte → hex string 32 karakter
 */
export function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash password dengan SHA-256 + salt.
 * @param password Password plain text
 * @param salt  Salt string (optional — jika tidak diberikan, akan di-generate baru)
 * @returns Format: `sha256:{salt}:{hash}`
 */
export async function hashPassword(password: string, salt?: string): Promise<string> {
  const s = salt ?? generateSalt();
  const encoder = new TextEncoder();
  const data = encoder.encode(s + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `sha256:${s}:${hashHex}`;
}

/**
 * Verifikasi password plain text terhadap hash yang tersimpan.
 * Mendukung dua format:
 * - Hash baru: `sha256:{salt}:{hash}` (secure)
 * - Legacy (plain text): string yang tidak diawali `sha256:` (insecure, untuk transisi)
 */
export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  // Format baru dengan salt
  if (stored.startsWith('sha256:')) {
    const parts = stored.split(':');
    if (parts.length !== 3) return false;
    const salt = parts[1];
    const expected = await hashPassword(plain, salt);
    return expected === stored;
  }
  
  // Legacy: plain text comparison (hanya untuk periode transisi)
  // Setelah semua password di-migrate, hapus baris ini.
  console.warn('⚠️ Legacy plain-text password comparison. Run migration script!');
  return plain === stored;
}
