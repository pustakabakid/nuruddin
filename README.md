# 💍 Undangan Pernikahan Digital & Dashboard Admin: Silfi & Nuruddin

Sistem **Undangan Pernikahan Digital Interaktif**, **Animasi Parallax**, **Musik Latar**, dan **Dashboard Manajemen Tamu & Push WhatsApp** yang terintegrasi dengan database cloud **Supabase** dan siap deploy di **Vercel**.

---

## 🌐 Live Production URL
* **Undangan Publik**: [https://nuruddin-ten.vercel.app/](https://nuruddin-ten.vercel.app/)
* **Contoh Undangan VIP**: [https://nuruddin-ten.vercel.app/?to=Bpk.+Haji+Slamet&seat=Meja+VIP+01&pax=2](https://nuruddin-ten.vercel.app/?to=Bpk.+Haji+Slamet&seat=Meja+VIP+01&pax=2)
* **Dashboard Admin**: [https://nuruddin-ten.vercel.app/dashboard.html](https://nuruddin-ten.vercel.app/dashboard.html)

---

## 📁 Struktur File Project

```text
├── index.html        # Halaman Undangan Pernikahan Digital (Tampilan Tamu + Parallax)
├── dashboard.html    # Halaman Dashboard Manajemen Tamu & WhatsApp (Tampilan Admin)
├── data.js           # State Store, Integrasi Supabase REST API, & Helper Generator
├── schema.sql        # Skema Database PostgreSQL / Supabase
├── bg.jpeg           # Foto Utama / Background Cover & Hero
├── 1.jpg             # Foto Mempelai Pria (Nuruddin)
├── 2.jpg             # Foto Mempelai Wanita (Silfiana)
├── janjisuci.mp3     # Audio Soundtrack Instrumen Musik Latar
├── corner-top-left.png     # Ornamen Sudut Kiri Atas
├── corner-bottom-right.png # Ornamen Sudut Kanan Bawah
└── README.md         # Dokumentasi & Panduan Lengkap
```

---

## 👰🤵 Informasi Mempelai & Acara

* **Mempelai Wanita**: Silfiana (Silfi) — Putri ke-Dua dari Bpk. Paiman & Ibu Aliyah (`@chilpy04`)
* **Mempelai Pria**: Nuruddin — Putra Pertama dari Bpk. Misraji & Ibu Hasibah (`@nuruddin_bin_aliman`)
* **Hari & Tanggal**: Ahad, 21 September 2026
* **Waktu Acara**: Pukul 10:00 WIB s/d Selesai
* **Tempat / Lokasi**: Kediaman Mempelai Pria, Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur
* **Google Maps**: [https://maps.app.goo.gl/eXsw8jBtcK1uvuib8](https://maps.app.goo.gl/eXsw8jBtcK1uvuib8)

---

## 🌟 Fitur Halaman Undangan (`index.html`)

1. **Cover / Gate Envelope Screen (`Buka Undangan`)**:
   - Membaca nama tamu personal secara dinamis dari URL (`?to=Nama+Tamu&seat=VIP+01&pax=2`).
   - Tombol buka undangan dengan transisi buka gerbang yang halus dan auto-play instrumen `janjisuci.mp3`.
2. **Hero Header & Real-Time Countdown**:
   - Multi-layer Parallax effect saat scroll.
   - Penghitung waktu mundur 4 kolom (Hari, Jam, Menit, Detik) menuju waktu acara.
3. **Kutipan Suci**:
   - QS. Ar-Rum: 21 dalam kaligrafi Arab dan terjemahan Indonesia.
4. **Profil Kedua Mempelai**:
   - Foto mempelai dengan cincin animasi berputar dinamis, info orang tua, dan tautan Instagram.
5. **Rangkaian Acara (Walimatul 'Urs / Resepsi)**:
   - Waktu, venue, tombol *Simpan ke Google Calendar*, dan tombol *Petunjuk Arah Google Maps*.
6. **RSVP & Buku Tamu (Ucapan & Doa)**:
   - Form RSVP real-time terhubung langsung ke cloud database Supabase.
   - Efek ledakan confetti selebrasi saat mengirimkan ucapan.
7. **Floating Controls**:
   - Pemutar musik piringan hitam (*vinyl disc*) di pojok kanan atas.
   - *Floating navigation dock* di bagian bawah layar.

---

## 📊 Fitur Dashboard Admin (`dashboard.html`)

1. **Form Tambah Tamu Lengkap (1 Baris)**:
   - Nama Penerima, No. WhatsApp, Kategori (`Umum`, `VIP`, `Keluarga`, `Sahabat`, `Rekan Kerja`), Meja (`VIP 01`, dll.), dan Pax (`1-5+`).
2. **Manajemen Tamu (Compact SaaS Table)**:
   - Tombol kirim pesan WhatsApp langsung ke nomor tamu.
   - Tombol salin link undangan personal.
   - Modal QR Code E-Pass Check-in per tamu.
   - Tombol toggle status check-in kehadiran di meja resepsionis.
   - Ekspor data tamu ke file Excel / CSV.
3. **Kontrol Buku Tamu**:
   - Melihat dan memoderasi seluruh ucapan masuk dari para tamu.
4. **Cloud Database Supabase Sync**:
   - Sinkronisasi instan dua arah untuk tabel `guests` dan `wishes`.
