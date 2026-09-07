# 💍 Wevitation Khusus — Paket 1 Undangan + 1 Dashboard Terintegrasi

Folder ini berisi sistem **Undangan Pernikahan Digital Interaktif** dan **Dashboard Manajemen Tamu & Pengaturan Acara** yang dapat dijalankan secara langsung di browser dan saling tersinkronisasi.

---

## 📁 Struktur File di Folder `Khusus/`

```text
d:\APP\Wedding\Khusus\
├── index.html        # Halaman Undangan Pernikahan Digital (Tampilan Tamu)
├── dashboard.html    # Halaman Dashboard Manajemen & Admin (Tampilan Pengelola)
├── data.js           # Shared Data Model, State Manager (localStorage), & Helper
└── README.md         # Dokumentasi & Panduan Lengkap
```

---

## 🌟 1. Undangan Pernikahan Digital (`index.html`)

### Fitur Utama:
1. **Gate / Cover Envelope Screen (`Buka Undangan`)**:
   - Membaca nama tamu personal secara otomatis dari parameter URL (`?to=Nama+Tamu&seat=VIP+01&pax=2`).
   - Tombol buka undangan dengan transisi mulus dan pemutaran audio otomatis.
2. **Hero Header & Real-Time Countdown**:
   - Penghitung waktu mundur 4 kolom (Hari, Jam, Menit, Detik) menuju waktu akad secara akurat.
3. **Kutipan Suci (Quote Section)**:
   - Surah Ar-Rum: 21 dalam kaligrafi Arab dan terjemahan Indonesia pada kartu berlatar kaca (*glassmorphism*).
4. **Profil Mempelai Pria & Wanita**:
   - Foto mempelai dengan cincin animasi emas, nama orang tua, dan tombol profil Instagram.
5. **Rangkaian Acara (Akad & Resepsi)**:
   - Waktu, lokasi, gedung, tombol *Simpan ke Google Calendar*, dan tombol *Petunjuk Arah Google Maps*.
6. **Love Story Timeline**:
   - Linimasa kisah cinta (Pertemuan Pertama, Lamaran, dll) dengan foto dan cerita romantis.
7. **Galeri Foto & Lightbox Zoom**:
   - Grid galeri foto momen pre-wedding dengan pop-up *Lightbox zoom* resolusi tinggi saat diklik.
8. **Amplop Digital Cashless (Wedding Gift)**:
   - Kartu rekening Bank BCA / Mandiri dengan tombol satu-klik **Salin No. Rekening** + notifikasi *toast*.
   - Tombol pop-up scan QRIS untuk pembayaran digital e-wallet.
   - Alamat pengiriman kado fisik dengan tombol salin alamat.
9. **RSVP Kehadiran & Buku Tamu (Ucapan & Doa)**:
   - Formulir konfirmasi kehadiran (*Hadir, Ragu, Tidak Hadir*) dan jumlah pax.
   - Efek ledakan confetti selebrasi saat mengirimkan ucapan.
   - Umpan (*feed*) ucapan doa masuk yang tersinkronisasi langsung ke Dashboard.
10. **Floating Controls**:
    - Tombol piringan hitam (*vinyl disc*) musik dengan status putar/jeda.
    - *Floating navigation dock* melayang untuk lompat cepat ke bagian-bagian undangan.

---

## 📊 2. Dashboard Manajemen Undangan (`dashboard.html`)

### Fitur Utama:
1. **Ringkasan & Statistik (Analytics)**:
   - Menghitung secara langsung: Total Tamu Terdaftar, Pax Terkonfirmasi Hadir, Status Ragu/Pending, dan Jumlah Ucapan Doa.
2. **Manajemen Daftar Tamu (Guest Manager)**:
   - Tambah, Edit, dan Hapus data tamu (Nama, No. WhatsApp, Kategori VIP/Sahabat/Keluarga, Pax, Meja).
   - Filter pencarian cepat berdasarkan nama, meja, kategori, dan status kehadiran.
   - Tombol **Salin Link Khusus** per tamu (misal: `index.html?to=Bapak+Ahmad&seat=VIP+01&pax=2`).
   - Tombol **QR E-Pass Check-in** per tamu untuk pemindaian absensi di lokasi acara.
   - Tombol status **Check-in Hadir** di meja registrasi.
   - **Export CSV**: Unduh seluruh daftar tamu dan status RSVP ke format Excel / CSV.
3. **Buku Tamu & Moderasi Doa**:
   - Melihat seluruh daftar pesan dan doa restu yang dikirim oleh tamu dari halaman `index.html`.
   - Menghapus komentar yang tidak sesuai.
4. **Data Mempelai & Rangkaian Acara**:
   - Form editor untuk mengubah nama kedua mempelai, orang tua, akun Instagram, tanggal pernikahan, lokasi venue, jam akad/resepsi, hingga nomor rekening bank.
   - Sekali klik **Simpan Semua Perubahan**, data di halaman `index.html` otomatis terupdate seketika.
5. **WhatsApp Broadcast & Message Generator**:
   - Pembuat pesan undangan WhatsApp yang rapi dan elegan.
   - Memilih tamu untuk membuat pesan otomatis dengan link personal masing-masing.
   - Tombol **Kirim Langsung ke WhatsApp** yang langsung membuka `wa.me`.

---

## 🚀 Cara Menjalankan & Membuka

### Opsi 1: Buka Langsung di Browser
- Cukup *double-click* file `Khusus/index.html` untuk membuka Undangan.
- Cukup *double-click* file `Khusus/dashboard.html` untuk membuka Dashboard.

### Opsi 2: Menggunakan Link Tamu Personal
Format URL untuk tamu khusus:
```text
index.html?to=Bapak+Joko+Santoso&seat=VIP+01&pax=2
```
Parameter yang didukung:
- `to`: Nama tamu / keluarga penerima undangan.
- `seat` / `table`: Keterangan nomor meja atau kursi.
- `pax`: Jumlah kuota kehadiran tamu.
