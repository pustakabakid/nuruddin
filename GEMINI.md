# ATURAN & PRINSIP UTAMA PENGEMBANGAN

> **PRINSIP MUTLAK:**
> **JANGAN SEKALI-KALI MENYELESAIKAN MASALAH DENGAN MENIMBULKAN MASALAH LAIN.**

---

### Protokol Kerja Wajib:

1. **Analisis Dampak Menyeluruh (No Side Effects / No Regressions)**:
   - Sebelum mengubah atau memperbaiki satu baris kode, analisis seluruh file dan fungsi yang terhubung.
   - Perubahan satu komponen dilarang merusak komponen, routing, audio, event listener, atau tampilan yang sudah berjalan.

2. **Validasi Bebas Error (Zero Console Error)**:
   - Setiap fitur yang diperbaiki harus terbebas dari peringatan/error console (`404`, `NotSupportedError`, library icon missing, dll.).
   - Pastikan tipe MIME, konfigurasi routing, dan dependensi pustaka dicek sesuai standar spesifikasi resmi.

3. **Integritas Fungsionalitas**:
   - Fitur lama yang sudah bekerja (seperti audio autoplay, navigasi, form RSVP, dan cloud sync) harus tetap berjalan normal setelah perbaikan diterapkan.
