-- ==========================================================
-- DATABASE SCHEMA: WEDDING SILFI & NURUDDIN (POSTGRESQL COMPATIBLE)
-- Undangan Pernikahan Digital & Sistem Manajemen Buku Tamu
-- Compatible with: PostgreSQL, Supabase, Neon, Railway, pgAdmin
-- ==========================================================

-- ----------------------------------------------------------
-- 1. TABEL: INFORMASI PERNIKAHAN & MEMPELAI
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS wedding_info (
    id SERIAL PRIMARY KEY,
    groom_name VARCHAR(150) NOT NULL DEFAULT 'Nuruddin',
    groom_nickname VARCHAR(50) NOT NULL DEFAULT 'Nuruddin',
    groom_parents VARCHAR(255) DEFAULT 'Putra Pertama dari Bpk. Misraji & Ibu Hasibah',
    groom_avatar TEXT DEFAULT 'avatar-empty.svg',
    groom_instagram VARCHAR(100) DEFAULT 'nuruddin_bin_aliman',
    bride_name VARCHAR(150) NOT NULL DEFAULT 'Silfiana',
    bride_nickname VARCHAR(50) NOT NULL DEFAULT 'Silfi',
    bride_parents VARCHAR(255) DEFAULT 'Putri ke-Dua dari Bpk. Paiman & Ibu Aliyah',
    bride_avatar TEXT DEFAULT 'avatar-empty.svg',
    bride_instagram VARCHAR(100) DEFAULT 'chilpy04',
    combined_title VARCHAR(150) NOT NULL DEFAULT 'Silfi & Nuruddin',
    wedding_date TIMESTAMPTZ NOT NULL DEFAULT '2026-09-21 08:00:00+07',
    hosts_pria VARCHAR(255) DEFAULT 'Keluarga Bpk. Misraji & Ibu Hasibah',
    hosts_wanita VARCHAR(255) DEFAULT 'Keluarga Bpk. Paiman & Ibu Aliyah',
    cover_image_pria TEXT DEFAULT '',
    cover_image_wanita TEXT DEFAULT '',
    audio_url TEXT DEFAULT 'janjisuci.mp3',
    event_venue VARCHAR(200) DEFAULT 'Kediaman Mempelai Pria',
    event_address TEXT,
    event_maps_url TEXT,
    -- Acara Pihak Pria
    event_type_pria VARCHAR(150) DEFAULT 'Resepsi Pernikahan (Walimatul ''Urs)',
    event_day_pria VARCHAR(50) DEFAULT 'Ahad',
    event_date_pria VARCHAR(100) DEFAULT '21 September 2026',
    event_time_pria VARCHAR(100) DEFAULT '10:00 WIB s/d Selesai',
    event_venue_pria VARCHAR(200) DEFAULT 'Kediaman Mempelai Pria',
    event_address_pria TEXT DEFAULT 'Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur',
    event_maps_pria TEXT DEFAULT 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
    schedules_pria JSONB,
    -- Acara Pihak Wanita
    event_type_wanita VARCHAR(150) DEFAULT 'Akad Nikah & Resepsi Pernikahan',
    event_day_wanita VARCHAR(50) DEFAULT 'Ahad',
    event_date_wanita VARCHAR(100) DEFAULT '21 September 2026',
    event_time_wanita VARCHAR(100) DEFAULT '08:00 WIB s/d Selesai',
    event_venue_wanita VARCHAR(200) DEFAULT 'Kediaman Mempelai Wanita',
    event_address_wanita TEXT DEFAULT 'Kediaman Mempelai Wanita (Keluarga Bpk. Paiman & Ibu Aliyah)',
    event_maps_wanita TEXT DEFAULT 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
    schedules_wanita JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Pastikan kolom baru selalu ditambahkan jika tabel wedding_info sudah ada sebelumnya:
ALTER TABLE wedding_info ALTER COLUMN groom_avatar TYPE TEXT;
ALTER TABLE wedding_info ALTER COLUMN bride_avatar TYPE TEXT;
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS hosts_pria VARCHAR(255) DEFAULT 'Keluarga Bpk. Misraji & Ibu Hasibah';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS hosts_wanita VARCHAR(255) DEFAULT 'Keluarga Bpk. Paiman & Ibu Aliyah';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS cover_image_pria TEXT DEFAULT '';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS cover_image_wanita TEXT DEFAULT '';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS audio_url TEXT DEFAULT 'janjisuci.mp3';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_type_pria VARCHAR(150) DEFAULT 'Resepsi Pernikahan (Walimatul ''Urs)';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_day_pria VARCHAR(50) DEFAULT 'Ahad';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_date_pria VARCHAR(100) DEFAULT '21 September 2026';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_time_pria VARCHAR(100) DEFAULT '10:00 WIB s/d Selesai';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_venue_pria VARCHAR(200) DEFAULT 'Kediaman Mempelai Pria';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_address_pria TEXT DEFAULT 'Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_maps_pria TEXT DEFAULT 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS schedules_pria JSONB;
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_type_wanita VARCHAR(150) DEFAULT 'Akad Nikah & Resepsi Pernikahan';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_day_wanita VARCHAR(50) DEFAULT 'Ahad';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_date_wanita VARCHAR(100) DEFAULT '21 September 2026';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_time_wanita VARCHAR(100) DEFAULT '08:00 WIB s/d Selesai';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_venue_wanita VARCHAR(200) DEFAULT 'Kediaman Mempelai Wanita';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_address_wanita TEXT DEFAULT 'Kediaman Mempelai Wanita (Keluarga Bpk. Paiman & Ibu Aliyah)';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS event_maps_wanita TEXT DEFAULT 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8';
ALTER TABLE wedding_info ADD COLUMN IF NOT EXISTS schedules_wanita JSONB;

-- ----------------------------------------------------------
-- 2. TABEL: DAFTAR TAMU PENERIMA UNDANGAN (GUESTS)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS guests (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) DEFAULT NULL,
    pax INT DEFAULT 1,
    side VARCHAR(20) DEFAULT 'pria' CHECK (side IN ('pria', 'wanita')),
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'hadir', 'ragu', 'tidak_hadir')),
    checked_in BOOLEAN DEFAULT FALSE,
    checked_in_at TIMESTAMPTZ DEFAULT NULL,
    qr_code_token VARCHAR(100) DEFAULT NULL,
    custom_notes TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Pastikan kolom side selalu ada jika tabel guests sudah dibuat sebelumnya:
ALTER TABLE guests ADD COLUMN IF NOT EXISTS side VARCHAR(20) DEFAULT 'pria';

CREATE INDEX IF NOT EXISTS idx_guests_phone ON guests (phone);
CREATE INDEX IF NOT EXISTS idx_guests_side ON guests (side);
CREATE INDEX IF NOT EXISTS idx_guests_status ON guests (status);
CREATE INDEX IF NOT EXISTS idx_guests_checked_in ON guests (checked_in);

-- ----------------------------------------------------------
-- 3. TABEL: PESAN UCAPAN & DOA (WISHES / BUKU TAMU)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishes (
    id VARCHAR(64) PRIMARY KEY,
    guest_id VARCHAR(64) REFERENCES guests(id) ON DELETE SET NULL ON UPDATE CASCADE,
    sender_name VARCHAR(150) NOT NULL,
    attendance VARCHAR(30) NOT NULL DEFAULT 'hadir' CHECK (attendance IN ('hadir', 'ragu', 'tidak_hadir')),
    pax INT DEFAULT 1,
    message TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT FALSE,
    likes_count INT DEFAULT 0,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_wishes_attendance ON wishes (attendance);
CREATE INDEX IF NOT EXISTS idx_wishes_guest_id ON wishes (guest_id);

-- ----------------------------------------------------------
-- 4. TABEL: PENGATURAN & ADMIN ACCESS (SETTINGS)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    pin_code VARCHAR(10) DEFAULT '210926',
    role VARCHAR(30) DEFAULT 'superadmin' CHECK (role IN ('superadmin', 'panitia_checkin', 'viewer')),
    last_login TIMESTAMPTZ DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- DATA AWAL / SAMPLE SEED DATA UNTUK TEST
-- ==========================================================

-- 1. Seed Informasi Acara
INSERT INTO wedding_info (
    id,
    groom_name, groom_nickname, groom_parents, groom_avatar, groom_instagram,
    bride_name, bride_nickname, bride_parents, bride_avatar, bride_instagram,
    combined_title, wedding_date,
    hosts_pria, hosts_wanita, cover_image_pria, cover_image_wanita,
    event_venue, event_address, event_maps_url,
    event_type_pria, event_day_pria, event_date_pria, event_time_pria, event_venue_pria, event_address_pria, event_maps_pria,
    event_type_wanita, event_day_wanita, event_date_wanita, event_time_wanita, event_venue_wanita, event_address_wanita, event_maps_wanita
) VALUES (
    1,
    'Nuruddin', 'Nuruddin', 'Putra Pertama dari Bpk. Misraji & Ibu Hasibah', '1.jpg', 'nuruddin_bin_aliman',
    'Silfiana', 'Silfi', 'Putri ke-Dua dari Bpk. Paiman & Ibu Aliyah', '2.jpg', 'chilpy04',
    'Silfi & Nuruddin', '2026-09-21 08:00:00+07',
    'Keluarga Bpk. Misraji & Ibu Hasibah', 'Keluarga Bpk. Paiman & Ibu Aliyah', 'bg.jpeg', 'bg.jpeg',
    'Kediaman Mempelai Pria', 'Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur', 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
    'Resepsi Pernikahan (Walimatul ''Urs)', 'Ahad', '21 September 2026', '10:00 WIB s/d Selesai', 'Kediaman Mempelai Pria', 'Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur', 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
    'Akad Nikah & Resepsi Pernikahan', 'Ahad', '21 September 2026', '08:00 WIB s/d Selesai', 'Kediaman Mempelai Wanita', 'Kediaman Mempelai Wanita (Keluarga Bpk. Paiman & Ibu Aliyah)', 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8'
) ON CONFLICT (id) DO UPDATE SET
    hosts_pria = EXCLUDED.hosts_pria,
    hosts_wanita = EXCLUDED.hosts_wanita,
    cover_image_pria = EXCLUDED.cover_image_pria,
    cover_image_wanita = EXCLUDED.cover_image_wanita,
    event_type_pria = EXCLUDED.event_type_pria,
    event_day_pria = EXCLUDED.event_day_pria,
    event_date_pria = EXCLUDED.event_date_pria,
    event_time_pria = EXCLUDED.event_time_pria,
    event_venue_pria = EXCLUDED.event_venue_pria,
    event_address_pria = EXCLUDED.event_address_pria,
    event_maps_pria = EXCLUDED.event_maps_pria,
    event_type_wanita = EXCLUDED.event_type_wanita,
    event_day_wanita = EXCLUDED.event_day_wanita,
    event_date_wanita = EXCLUDED.event_date_wanita,
    event_time_wanita = EXCLUDED.event_time_wanita,
    event_venue_wanita = EXCLUDED.event_venue_wanita,
    event_address_wanita = EXCLUDED.event_address_wanita,
    event_maps_wanita = EXCLUDED.event_maps_wanita;

-- 2. Seed Data Tamu Contoh
INSERT INTO guests (id, name, phone, pax, side, status, checked_in, created_at) VALUES
('g-1', 'Bapak Ahmad Sanusi & Keluarga', '6281234567890', 2, 'pria', 'hadir', FALSE, '2026-09-01 10:00:00+07'),
('g-2', 'Dimas Prasetyo & Partner', '6281398765432', 2, 'pria', 'hadir', FALSE, '2026-09-02 11:20:00+07'),
('g-3', 'Clarissa Maharani', '6285712349988', 1, 'wanita', 'ragu', FALSE, '2026-09-03 15:40:00+07'),
('g-4', 'dr. Hendra Setiawan, Sp.A', '6281122334455', 2, 'pria', 'hadir', FALSE, '2026-09-04 09:15:00+07'),
('g-5', 'Rian Pratama & Tim', '6289876543210', 4, 'wanita', 'tidak_hadir', FALSE, '2026-09-05 14:10:00+07')
ON CONFLICT (id) DO NOTHING;

-- 3. Seed Pesan Masuk / Ucapan Contoh
INSERT INTO wishes (id, guest_id, sender_name, attendance, pax, message, likes_count, created_at) VALUES
('w-1', 'g-1', 'Bapak Ahmad Sanusi & Keluarga', 'hadir', 2, 'Selamat untuk kedua mempelai Silfi & Nuruddin, semoga menjadi keluarga sakinah mawaddah warahmah.', 4, '2026-09-01 10:15:00+07'),
('w-2', 'g-2', 'Dimas Prasetyo & Partner', 'hadir', 2, 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair bro Nuruddin & Mbak Silfi! Lancar sampai hari H.', 2, '2026-09-02 11:32:00+07'),
('w-3', 'g-3', 'Clarissa Maharani', 'ragu', 1, 'Happy wedding Silfi cantik & Mas Nuruddin! Semoga langgeng dan selalu penuh kebahagiaan.', 5, '2026-09-03 16:05:00+07'),
('w-4', 'g-5', 'Rian Pratama', 'tidak_hadir', 0, 'Selamat untuk Silfi & Nuruddin! Mohon maaf belum bisa hadir langsung karena dinas luar kota, doa terbaik untuk kalian berdua.', 1, '2026-09-05 14:22:00+07')
ON CONFLICT (id) DO NOTHING;

-- 4. Seed Akun Admin
INSERT INTO admin_users (username, password_hash, pin_code, role) VALUES
('admin', '$2y$10$e8q4m3F3r9E5K6P8s7V1eOK8YkH/0g1X2J3T4L5N6M7P8Q9R0S1T2', '210926', 'superadmin')
ON CONFLICT (username) DO NOTHING;

-- ----------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) UNTUK SUPABASE ANON ACCESS
-- ----------------------------------------------------------
ALTER TABLE wedding_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read wedding_info" ON wedding_info;
DROP POLICY IF EXISTS "Public access wedding_info" ON wedding_info;
CREATE POLICY "Public access wedding_info" ON wedding_info FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access guests" ON guests;
CREATE POLICY "Public access guests" ON guests FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access wishes" ON wishes;
CREATE POLICY "Public access wishes" ON wishes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read admin_users" ON admin_users;
CREATE POLICY "Public read admin_users" ON admin_users FOR SELECT USING (true);

-- ----------------------------------------------------------
-- 6. SUPABASE STORAGE: BUCKET MEDIA UNDANGAN & POLICIES
-- ----------------------------------------------------------
-- Siapkan bucket 'wedding-media' agar upload foto & audio tersimpan
-- dan dapat di-upsert (ditimpa otomatis) langsung dari Dashboard Studio.
INSERT INTO storage.buckets (id, name, public)
VALUES ('wedding-media', 'wedding-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy penyimpanan media:
-- Catatan: Bucket 'wedding-media' sudah berstatus PUBLIC (dapat dibaca langsung tanpa SELECT policy).
-- Kebijakan ini khusus memberi izin INSERT & UPDATE agar anon dapat mengunggah dan menimpa file
-- tanpa memicu peringatan security 'Clients can list all files in this bucket'.
DROP POLICY IF EXISTS "Public media access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;

CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'wedding-media');

CREATE POLICY "Allow public updates" ON storage.objects
FOR UPDATE TO anon, authenticated
USING (bucket_id = 'wedding-media')
WITH CHECK (bucket_id = 'wedding-media');
