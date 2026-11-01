# Kelas Multiver

Platform kelas gratis: 30 pertanyaan pilihan ganda, nilai kelulusan minimal 70/100, sertifikat PDF, dan pengiriman sertifikat melalui email.

## Development
```bash
npm install
npm run dev
``

## Vercel
Import repository `kuro-myths/kelas-multiver` ke Vercel. Framework: Vite, build: `npm run build`, output: `dist`.

Tambahkan environment variables:
- `RESEND_API_KEY`: API key Resend.
- `CERTIFICATE_FROM`: alamat pengirim yang sudah diverifikasi di Resend, contoh `Kelas Multiver <sertifikat@domain-anda.com>`.

Tanpa konfigurasi email, pengguna tetap dapat mengunduh sertifikat PDF. Pengiriman email tidak akan diklaim berhasil.

## Catatan sertifikat
Sertifikat merupakan bukti penyelesaian kelas non-akreditasi yang diterbitkan Kelas Multiver, bukan sertifikat kompetensi resmi pemerintah atau lembaga akreditasi.
