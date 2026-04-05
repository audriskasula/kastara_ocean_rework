import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Server-side middleware untuk melindungi semua route /admin.
 * Bekerja sebelum browser memuat halaman apapun — tidak bisa di-bypass
 * dengan mematikan JavaScript.
 *
 * Supabase menyimpan session tokens di cookies dengan nama 'sb-[ref]-auth-token'.
 * Kita cek keberadaan cookie tersebut sebagai indikator sesi aktif.
 */
export async function proxy(req: NextRequest) {
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = req.nextUrl.pathname.startsWith('/login')

  // Supabase stores session in cookies prefixed with 'sb-'
  const supabaseSession = req.cookies.getAll().find(
    c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
  )

  // Fallback: cek custom session cookie (untuk kompatibilitas dengan flow saat ini)
  const customSession = req.cookies.get('kastara_admin_authenticated')

  const hasSession = !!supabaseSession || !!customSession

  // === KEAMANAN EXTRA: URL LOGIN RAHASIA ===
  // Menggunakan query parameter `key` untuk membolehkan akses ke halaman login
  const SECRET_LOGIN_KEY = 'kstaradmin'

  if (isLoginPage && !hasSession) {
    const key = req.nextUrl.searchParams.get('key')
    if (key !== SECRET_LOGIN_KEY) {
      // Jika diakses tanpa parameter kunci yang benar, redirect ke home
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // 1. Blokir akses ke /admin jika tidak ada session
  if (isAdminPage && !hasSession) {
    // Alih-alih melempar ke halaman login (yang membocorkan URL admin),
    // kita lemparkan otomatis kembali ke halaman utama (home)
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 2. Redirect ke /admin jika sudah login dan coba akses /login
  if (isLoginPage && hasSession) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Proteksi semua sub-route /admin dan halaman /login
  matcher: ['/admin/:path*', '/login'],
}
