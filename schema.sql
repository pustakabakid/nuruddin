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
    groom_avatar VARCHAR(255) DEFAULT '1.jpg',
    groom_instagram VARCHAR(100) DEFAULT 'nuruddin_bin_aliman',
    bride_name VARCHAR(150) NOT NULL DEFAULT 'Silfiana',
    bride_nickname VARCHAR(50) NOT NULL DEFAULT 'Silfi',
    bride_parents VARCHAR(255) DEFAULT 'Putri ke-Dua dari Bpk. Paiman & Ibu Aliyah',
    bride_avatar VARCHAR(255) DEFAULT '2.jpg',
    bride_instagram VARCHAR(100) DEFAULT 'chilpy04',
    combined_title VARCHAR(150) NOT NULL DEFAULT 'Silfi & Nuruddin',
    wedding_date TIMESTAMPTZ NOT NULL DEFAULT '2026-09-21 08:00:00+07',
    event_venue VARCHAR(200) DEFAULT 'Kediaman Mempelai Pria',
    event_address TEXT,
    event_maps_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------
-- 2. TABEL: DAFTAR TAMU PENERIMA UNDANGAN (GUESTS)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS guests (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) DEFAULT NULL,
    pax INT DEFAULT 1,
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'hadir', 'ragu', 'tidak_hadir')),
    checked_in BOOLEAN DEFAULT FALSE,
    checked_in_at TIMESTAMPTZ DEFAULT NULL,
    qr_code_token VARCHAR(100) DEFAULT NULL,
    custom_notes TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Migrasi (jika tabel guests sudah pernah dibuat di database):
-- ALTER TABLE guests DROP COLUMN IF EXISTS category;
-- ALTER TABLE guests DROP COLUMN IF EXISTS table_seat;

CREATE INDEX IF NOT EXISTS idx_guests_phone ON guests (phone);
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
    groom_name, groom_nickname, groom_parents, groom_avatar, groom_instagram,
    bride_name, bride_nickname, bride_parents, bride_avatar, bride_instagram,
    combined_title, wedding_date, event_venue, event_address, event_maps_url
) VALUES (
    'Nuruddin', 'Nuruddin', 'Putra Pertama dari Bpk. Misraji & Ibu Hasibah', '1.jpg', 'nuruddin_bin_aliman',
    'Silfiana', 'Silfi', 'Putri ke-Dua dari Bpk. Paiman & Ibu Aliyah', '2.jpg', 'chilpy04',
    'Silfi & Nuruddin', '2026-09-21 08:00:00+07', 'Kediaman Mempelai Pria',
    'Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur',
    'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8'
) ON CONFLICT DO NOTHING;

-- 2. Seed Data Tamu Contoh
INSERT INTO guests (id, name, phone, pax, status, checked_in, created_at) VALUES
('g-1', 'Bapak Ahmad Sanusi & Keluarga', '6281234567890', 2, 'hadir', FALSE, '2026-09-01 10:00:00+07'),
('g-2', 'Dimas Prasetyo & Partner', '6281398765432', 2, 'hadir', FALSE, '2026-09-02 11:20:00+07'),
('g-3', 'Clarissa Maharani', '6285712349988', 1, 'ragu', FALSE, '2026-09-03 15:40:00+07'),
('g-4', 'dr. Hendra Setiawan, Sp.A', '6281122334455', 2, 'hadir', FALSE, '2026-09-04 09:15:00+07'),
('g-5', 'Rian Pratama & Tim', '6289876543210', 4, 'tidak_hadir', FALSE, '2026-09-05 14:10:00+07')
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
CREATE POLICY "Public read wedding_info" ON wedding_info FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public access guests" ON guests;
CREATE POLICY "Public access guests" ON guests FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access wishes" ON wishes;
CREATE POLICY "Public access wishes" ON wishes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read admin_users" ON admin_users;
CREATE POLICY "Public read admin_users" ON admin_users FOR SELECT USING (true);

