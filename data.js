/**
 * Wevitation Khusus - Data Store & State Manager
 * Standalone & Module compatible (works on file:// protocol & http://)
 */

(function(root, factory) {
  const exportsObj = factory();
  if (typeof module !== 'undefined' && module.exports) {
    Object.assign(module.exports, exportsObj);
    module.exports = exportsObj;
  }
  if (typeof define === 'function' && define.amd) {
    define(function() { return exportsObj; });
  }
  if (typeof window !== 'undefined') {
    window.DEFAULT_DASHBOARDS = exportsObj.DEFAULT_DASHBOARDS;
    window.DEFAULT_WEDDING_DATA = exportsObj.DEFAULT_WEDDING_DATA;
    window.DEFAULT_GUESTS = exportsObj.DEFAULT_GUESTS;
    window.DEFAULT_WISHES = exportsObj.DEFAULT_WISHES;
    window.WeddingStorage = exportsObj.WeddingStorage;
  } else if (typeof root !== 'undefined') {
    root.DEFAULT_DASHBOARDS = exportsObj.DEFAULT_DASHBOARDS;
    root.DEFAULT_WEDDING_DATA = exportsObj.DEFAULT_WEDDING_DATA;
    root.DEFAULT_GUESTS = exportsObj.DEFAULT_GUESTS;
    root.DEFAULT_WISHES = exportsObj.DEFAULT_WISHES;
    root.WeddingStorage = exportsObj.WeddingStorage;
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this), function() {

  const STORAGE_KEYS = {
    WEDDING: 'wevitation_khusus_wedding_data',
    GUESTS: 'wevitation_khusus_guests_data',
    WISHES: 'wevitation_khusus_wishes_data',
    SETTINGS: 'wevitation_khusus_settings',
    DASHBOARDS: 'wevitation_khusus_dashboards',
    ACTIVE_DASHBOARD: 'wevitation_khusus_active_dashboard'
  };

  const DEFAULT_DASHBOARDS = [
    {
      id: 'pria',
      title: 'Undangan Pihak Pria',
      shortTitle: 'Pria',
      badge: 'Mempelai Pria',
      side: 'pria',
      path: '/pria',
      coupleTitle: 'Nuruddin & Silfiana',
      tagline: 'The Wedding of Nuruddin & Silfi',
      hostsTitle: 'Keluarga Bpk. Misraji & Ibu Hasibah',
      isSystem: true
    },
    {
      id: 'wanita',
      title: 'Undangan Pihak Wanita',
      shortTitle: 'Wanita',
      badge: 'Mempelai Wanita',
      side: 'wanita',
      path: '/wanita',
      coupleTitle: 'Silfiana & Nuruddin',
      tagline: 'The Wedding of Silfi & Nuruddin',
      hostsTitle: 'Keluarga Bpk. Paiman & Ibu Aliyah',
      isSystem: true
    }
  ];

  const DEFAULT_WEDDING_DATA = {
    couple: {
      groom: {
        name: 'Nuruddin',
        nickname: 'Nuruddin',
        parents: 'Putra Pertama dari Bpk. Misraji & Ibu Hasibah',
        avatar: '1.jpg',
        instagram: 'nuruddin_bin_aliman',
        instagramUrl: 'https://instagram.com/nuruddin_bin_aliman'
      },
      bride: {
        name: 'Silfiana',
        nickname: 'Silfi',
        parents: 'Putri ke-Dua dari Bpk. Paiman & Ibu Aliyah',
        avatar: '2.jpg',
        instagram: 'chilpy04',
        instagramUrl: 'https://instagram.com/chilpy04'
      },
      combinedTitle: 'Silfi & Nuruddin',
      tagline: 'The Wedding of Silfi & Nuruddin'
    },
    weddingDate: '2026-09-21T08:00:00+07:00',
    dayName: 'Senin',
    formattedDate: 'Senin, 21 September 2026',
    formattedDateShort: '21 • 09 • 2026',
    audioUrl: 'janjisuci.mp3',
    quote: {
      arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
      translation: '"Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."',
      source: 'QS. Ar-Rum: 21'
    },
    schedules: [
      {
        id: 'resepsi',
        title: 'Resepsi Pernikahan (Walimatul \'Urs)',
        badge: 'Walimatul \'Urs',
        day: 'Senin',
        date: '21 September 2026',
        fullDate: 'Senin, 21 September 2026',
        time: '10:00 WIB s/d Selesai',
        venue: 'Kediaman Mempelai Pria',
        address: 'Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur',
        mapsUrl: 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
        calendarUrl: 'https://www.google.com/calendar/event?action=TEMPLATE&text=Walimatul+%27Urs+Silfi+%26+Nuruddin&details=Kediaman+Mempelai+Pria%2C+Tawonsongo+-+Pasrujambe+-+Lumajang&dates=20260921T030000Z/20260921T080000Z'
      }
    ],
    schedulesPria: [
      {
        id: 'resepsi-pria',
        title: 'Resepsi Pernikahan (Walimatul \'Urs)',
        badge: 'Walimatul \'Urs',
        day: 'Senin',
        date: '21 September 2026',
        fullDate: 'Senin, 21 September 2026',
        time: '10:00 WIB s/d Selesai',
        venue: 'Kediaman Mempelai Pria',
        address: 'Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur',
        mapsUrl: 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
        calendarUrl: 'https://www.google.com/calendar/event?action=TEMPLATE&text=Walimatul+%27Urs+Nuruddin+%26+Silfi&details=Kediaman+Mempelai+Pria%2C+Tawonsongo+-+Pasrujambe+-+Lumajang&dates=20260921T030000Z/20260921T080000Z'
      }
    ],
    schedulesWanita: [
      {
        id: 'akad-wanita',
        title: 'Akad Nikah',
        badge: 'Akad Nikah',
        day: 'Ahad',
        date: '20 September 2026',
        fullDate: 'Ahad, 20 September 2026',
        time: '08:00 WIB s/d 10:00 WIB',
        venue: 'Kediaman Mempelai Wanita',
        address: 'Kediaman Mempelai Wanita (Keluarga Bpk. Paiman & Ibu Aliyah)',
        mapsUrl: 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
        calendarUrl: 'https://www.google.com/calendar/event?action=TEMPLATE&text=Akad+Nikah+Silfi+%26+Nuruddin&details=Kediaman+Mempelai+Wanita&dates=20260920T010000Z/20260920T030000Z'
      },
      {
        id: 'resepsi-wanita',
        title: 'Resepsi Pernikahan',
        badge: 'Resepsi',
        day: 'Senin',
        date: '21 September 2026',
        fullDate: 'Senin, 21 September 2026',
        time: '10:00 WIB s/d Selesai',
        venue: 'Kediaman Mempelai Wanita',
        address: 'Kediaman Mempelai Wanita (Keluarga Bpk. Paiman & Ibu Aliyah)',
        mapsUrl: 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
        calendarUrl: 'https://www.google.com/calendar/event?action=TEMPLATE&text=Resepsi+Pernikahan+Silfi+%26+Nuruddin&details=Kediaman+Mempelai+Wanita&dates=20260921T030000Z/20260921T080000Z'
      }
    ],
    hostsPria: 'Keluarga Bpk. Misraji & Ibu Hasibah',
    hostsWanita: 'Keluarga Bpk. Paiman & Ibu Aliyah',
    coverImagePria: 'bb.jpg',
    coverImageWanita: 'bb.jpg',
    loveStories: [
      {
        id: 'story-1',
        year: '2021',
        title: 'Pertemuan Pertama',
        image: '../public/assets/images/story-first-meet.jpg',
        content: 'Pertama kali kami bertemu saat menjadi anggota organisasi kampus di Bandung. Dari obrolan proyek hingga tertawa bersama karena lelucon sederhana, kami menyadari ada koneksi yang hangat di antara kami berdua.'
      },
      {
        id: 'story-2',
        year: '2023',
        title: 'Menjalin Komitmen & LDR',
        image: '../public/assets/images/story-proposal.jpg',
        content: 'Meskipun sempat terpisah jarak pekerjaan kota yang berbeda selama lebih dari 1 tahun, jarak justru memperkuat keyakinan, komunikasi, dan doa kami untuk melangkah ke jenjang yang lebih tinggi.'
      },
      {
        id: 'story-3',
        year: '2025',
        title: 'Lamaran & Menuju Bahtera',
        image: '../public/assets/images/gallery-1.jpg',
        content: 'Di hadapan kedua keluarga besar, kami mengikat janji suci pertunangan untuk menyatukan dua keluarga dalam ikatan pernikahan yang penuh cinta, barakah, dan kebahagiaan.'
      }
    ],
    gallery: [
      { id: 'g1', src: '../public/assets/images/gallery-1.jpg', title: 'Momen Sunset', desc: 'Prewedding session' },
      { id: 'g2', src: '../public/assets/images/gallery-2.jpg', title: 'Tatapan Penuh Makna', desc: 'Prewedding session' },
      { id: 'g3', src: '../public/assets/images/gallery-3.jpg', title: 'Senyum Bahagia', desc: 'Prewedding session' },
      { id: 'g4', src: '../public/assets/images/gallery-4.jpg', title: 'Langkah Bersama', desc: 'Prewedding session' }
    ],
    bankAccounts: [
      {
        id: 'bank-bca',
        bankName: 'Bank Central Asia (BCA)',
        accountNumber: '7829103841',
        accountHolder: 'Silfiana',
        logo: '',
        qrisImage: ''
      },
      {
        id: 'bank-mandiri',
        bankName: 'Bank Mandiri',
        accountNumber: '1320019283741',
        accountHolder: 'Nuruddin',
        logo: '',
        qrisImage: ''
      }
    ],
    giftAddress: {
      recipientName: 'Silfi & Nuruddin',
      phoneNumber: '081234567890',
      fullAddress: 'Kediaman Mempelai Pria, Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur'
    },
    liveStreamUrl: 'https://youtube.com/wevitation',
    closingMessage: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.'
  };

  const DEFAULT_GUESTS = [
    {
      id: 'g-1',
      name: 'Bapak Ahmad Sanusi & Keluarga',
      phone: '6281234567891',
      pax: 2,
      side: 'pria',
      status: 'hadir',
      wishes: 'Selamat untuk kedua mempelai, semoga rukun bahagia selalu sampai kakek nenek.',
      checkedIn: true,
      createdAt: '2026-09-01T10:00:00Z'
    },
    {
      id: 'g-2',
      name: 'Dimas Prasetyo & Partner',
      phone: '6281398765432',
      pax: 2,
      side: 'pria',
      status: 'hadir',
      wishes: 'Selamat menempuh hidup baru bro Nuruddin & Mbak Silfi! Lancar acaranya.',
      checkedIn: false,
      createdAt: '2026-09-02T11:20:00Z'
    },
    {
      id: 'g-3',
      name: 'Clarissa Maharani',
      phone: '6285712349988',
      pax: 1,
      side: 'wanita',
      status: 'ragu',
      wishes: 'Happy wedding Silfi cantik & Mas Nuruddin! Semoga menjadi keluarga yang sakinah mawaddah warahmah.',
      checkedIn: false,
      createdAt: '2026-09-03T15:40:00Z'
    },
    {
      id: 'g-4',
      name: 'dr. Hendra Setiawan, Sp.A',
      phone: '6281122334455',
      pax: 2,
      side: 'pria',
      status: 'hadir',
      wishes: 'Barakallah Silfi dan Nuruddin, semoga senantiasa dalam limpahan berkah.',
      checkedIn: false,
      createdAt: '2026-09-04T09:15:00Z'
    },
    {
      id: 'g-5',
      name: 'Rian Pratama & Tim IT',
      phone: '6289876543210',
      pax: 4,
      side: 'wanita',
      status: 'tidak_hadir',
      wishes: 'Selamat Mas Nuruddin & Mbak Silfi! Mohon maaf belum bisa hadir langsung, doa terbaik dari kami.',
      checkedIn: false,
      createdAt: '2026-09-05T14:10:00Z'
    }
  ];

  const DEFAULT_WISHES = [
    {
      id: 'w-1',
      name: 'Bapak Ahmad Sanusi & Keluarga',
      attendance: 'hadir',
      pax: 2,
      message: 'Selamat untuk kedua mempelai Silfi & Nuruddin, semoga rukun bahagia selalu sampai kakek nenek.',
      timestamp: 'Senin, 01 Sep 2026 10:15 WIB',
      likes: 4
    },
    {
      id: 'w-2',
      name: 'Dimas Prasetyo & Partner',
      attendance: 'hadir',
      pax: 2,
      message: 'Selamat menempuh hidup baru bro Nuruddin & Mbak Silfi! Lancar acaranya ya, nanti kita kumpul seru!',
      timestamp: 'Selasa, 02 Sep 2026 11:32 WIB',
      likes: 2
    },
    {
      id: 'w-3',
      name: 'Clarissa Maharani',
      attendance: 'ragu',
      pax: 1,
      message: 'Happy wedding Silfi cantik & Mas Nuruddin! Semoga menjadi keluarga yang sakinah mawaddah warahmah. Aamiin ya rabbal alamin.',
      timestamp: 'Rabu, 03 Sep 2026 16:05 WIB',
      likes: 5
    },
    {
      id: 'w-4',
      name: 'Rian Pratama',
      attendance: 'tidak_hadir',
      pax: 0,
      message: 'Selamat Mas Nuruddin & Mbak Silfi! Mohon maaf belum bisa hadir langsung karena dinas luar kota, doa terbaik untuk kalian berdua.',
      timestamp: 'Jumat, 05 Sep 2026 14:22 WIB',
      likes: 1
    }
  ];

  const SUPABASE_CONFIG = {
    url: 'https://vtboeyzidmehmswpkhhu.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Ym9leXppZG1laG1zd3BraGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NjM4OTMsImV4cCI6MjEwNDMzOTg5M30.9UpEo5L19j465HVBO1Ay6plKVAr8-mT7Gknf5eOrCVY'
  };

  const WeddingStorage = {
    supabaseConfig: SUPABASE_CONFIG,

    normalizeStatus(st) {
      if (!st) return 'pending';
      const s = String(st).trim().toLowerCase();
      const valid = ['pending', 'hadir', 'ragu', 'tidak_hadir'];
      return valid.includes(s) ? s : 'pending';
    },

    async supabaseRequest(endpoint, method = 'GET', body = null, extraHeaders = {}) {
      try {
        if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.key) return null;
        const headers = {
          'apikey': SUPABASE_CONFIG.key,
          'Authorization': `Bearer ${SUPABASE_CONFIG.key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
          ...extraHeaders
        };
        const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${endpoint}`, {
          method,
          headers,
          body: body ? JSON.stringify(body) : null
        });
        if (!res.ok) {
          const errDetail = await res.text().catch(() => '');
          console.warn('Supabase request non-ok status:', res.status, endpoint, errDetail);
          return null;
        }
        if (res.status === 204) return true;
        return await res.json();
      } catch (err) {
        console.warn('Supabase connection offline or blocked:', err.message);
        return null;
      }
    },

    /**
     * Upload media ke Supabase Storage dengan slot tetap & x-upsert: true
     * Menjamin file selalu menimpa slot yang ada tanpa menumpuk penyimpanan
     */
    async uploadMedia(fileOrBlob, slotKey) {
      try {
        if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.key) {
          return { ok: false, fallback: true, error: 'Konfigurasi Supabase tidak tersedia' };
        }

        const slotMap = {
          'groom_avatar': 'avatars/avatar_pria.webp',
          'bride_avatar': 'avatars/avatar_wanita.webp',
          'cover_pria': 'covers/cover_pria.webp',
          'cover_wanita': 'covers/cover_wanita.webp',
          'audio': 'audio/wedding_audio.mp3'
        };

        const targetPath = slotMap[slotKey] || `misc/${slotKey}`;
        let uploadBlob = fileOrBlob;
        let mimeType = (slotKey === 'audio') ? 'audio/mpeg' : 'image/webp';

        // Jika input berupa data URL base64, konversi ke Blob biner
        if (typeof fileOrBlob === 'string' && fileOrBlob.startsWith('data:')) {
          const parts = fileOrBlob.split(',');
          const mimeMatch = parts[0].match(/:(.*?);/);
          mimeType = mimeMatch ? mimeMatch[1] : mimeType;
          const binaryStr = atob(parts[1]);
          const len = binaryStr.length;
          const u8arr = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            u8arr[i] = binaryStr.charCodeAt(i);
          }
          uploadBlob = new Blob([u8arr], { type: mimeType });
        } else if (fileOrBlob && fileOrBlob.type) {
          mimeType = fileOrBlob.type;
        }

        const endpoint = `${SUPABASE_CONFIG.url}/storage/v1/object/wedding-media/${targetPath}`;
        const headers = {
          'apikey': SUPABASE_CONFIG.key,
          'Authorization': `Bearer ${SUPABASE_CONFIG.key}`,
          'Content-Type': mimeType,
          'x-upsert': 'true'
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers,
          body: uploadBlob
        });

        if (res.ok) {
          // Public URL dengan timestamp cache-buster agar perangkat pengunjung langsung melihat foto/lagu baru
          const publicUrl = `${SUPABASE_CONFIG.url}/storage/v1/object/public/wedding-media/${targetPath}?v=${Date.now()}`;
          return { ok: true, url: publicUrl, method: 'storage' };
        } else {
          const errDetail = await res.text().catch(() => '');
          return { ok: false, fallback: true, error: `Supabase Storage ${res.status}: ${errDetail}` };
        }
      } catch (err) {
        return { ok: false, fallback: true, error: err.message };
      }
    },

    async syncFromCloud() {
      // 1. Sync Guests
      try {
        const cloudGuests = await this.supabaseRequest('guests?select=*&order=created_at.desc');
        if (cloudGuests && Array.isArray(cloudGuests)) {
          const mapped = cloudGuests.map(g => ({
            id: g.id,
            name: g.name,
            phone: g.phone || '',
            pax: g.pax || 1,
            side: (g.side === 'wanita') ? 'wanita' : 'pria',
            status: this.normalizeStatus(g.status),
            checkedIn: !!g.checked_in,
            createdAt: g.created_at
          }));
          this.saveGuests(mapped);
        }
      } catch (e) {}

      // 2. Sync Wishes
      try {
        const cloudWishes = await this.supabaseRequest('wishes?select=*&order=created_at.desc');
        if (cloudWishes && Array.isArray(cloudWishes)) {
          const mappedW = cloudWishes.map(w => ({
            id: w.id,
            name: w.sender_name,
            attendance: this.normalizeStatus(w.attendance),
            pax: w.pax || 1,
            message: w.message || '',
            timestamp: this.formatWishTimestamp(w.created_at || new Date()),
            likes: w.likes_count || 0
          }));
          this.saveWishes(mappedW);
        }
      } catch (e) {}

      // 3. Sync Wedding Info
      try {
        let cloudInfo = await this.supabaseRequest('wedding_info?id=eq.1');
        if (!cloudInfo || cloudInfo.length === 0) {
          cloudInfo = await this.supabaseRequest('wedding_info?select=*&order=id.asc&limit=1');
        }
        if (cloudInfo && Array.isArray(cloudInfo) && cloudInfo.length > 0) {
          const info = cloudInfo[0];
          const currentWedding = this.getWeddingData();

          let sPria = currentWedding.schedulesPria;
          if (info.schedules_pria && Array.isArray(info.schedules_pria) && info.schedules_pria.length > 0) {
            sPria = info.schedules_pria;
          } else if (info.event_venue_pria) {
            sPria = [{
              id: 'resepsi-pria',
              title: info.event_type_pria || 'Resepsi Pernikahan (Walimatul \'Urs)',
              badge: info.event_badge_pria || 'Walimatul \'Urs',
              day: info.event_day_pria || 'Ahad',
              date: info.event_date_pria || '21 September 2026',
              fullDate: (info.event_day_pria && info.event_date_pria) ? `${info.event_day_pria}, ${info.event_date_pria}` : (info.event_date_pria || 'Ahad, 21 September 2026'),
              time: info.event_time_pria || '10:00 WIB s/d Selesai',
              venue: info.event_venue_pria || 'Kediaman Mempelai Pria',
              address: info.event_address_pria || '',
              mapsUrl: info.event_maps_pria || '',
              calendarUrl: (currentWedding.schedulesPria && currentWedding.schedulesPria[0] && currentWedding.schedulesPria[0].calendarUrl) || '#'
            }];
          }

          let sWanita = currentWedding.schedulesWanita;
          if (info.schedules_wanita && Array.isArray(info.schedules_wanita) && info.schedules_wanita.length > 0) {
            sWanita = info.schedules_wanita;
          } else if (info.event_venue_wanita) {
            sWanita = [{
              id: 'resepsi-wanita',
              title: info.event_type_wanita || 'Akad Nikah & Resepsi Pernikahan',
              badge: info.event_badge_wanita || 'Akad & Resepsi',
              day: info.event_day_wanita || 'Ahad',
              date: info.event_date_wanita || '21 September 2026',
              fullDate: (info.event_day_wanita && info.event_date_wanita) ? `${info.event_day_wanita}, ${info.event_date_wanita}` : (info.event_date_wanita || 'Ahad, 21 September 2026'),
              time: info.event_time_wanita || '08:00 WIB s/d Selesai',
              venue: info.event_venue_wanita || 'Kediaman Mempelai Wanita',
              address: info.event_address_wanita || '',
              mapsUrl: info.event_maps_wanita || '',
              calendarUrl: (currentWedding.schedulesWanita && currentWedding.schedulesWanita[0] && currentWedding.schedulesWanita[0].calendarUrl) || '#'
            }];
          }

          const merged = {
            ...currentWedding,
            hostsPria: info.hosts_pria || currentWedding.hostsPria || 'Keluarga Bpk. Misraji & Ibu Hasibah',
            hostsWanita: info.hosts_wanita || currentWedding.hostsWanita || 'Keluarga Bpk. Paiman & Ibu Aliyah',
            coverImagePria: (info.cover_image_pria && info.cover_image_pria !== 'bg.jpeg') ? info.cover_image_pria : (currentWedding.coverImagePria && currentWedding.coverImagePria !== 'bg.jpeg' ? currentWedding.coverImagePria : ''),
            coverImageWanita: (info.cover_image_wanita && info.cover_image_wanita !== 'bg.jpeg') ? info.cover_image_wanita : (currentWedding.coverImageWanita && currentWedding.coverImageWanita !== 'bg.jpeg' ? currentWedding.coverImageWanita : ''),
            audioUrl: info.audio_url || currentWedding.audioUrl || 'janjisuci.mp3',
            schedulesPria: sPria,
            schedulesWanita: sWanita,
            couple: {
              ...currentWedding.couple,
              groom: {
                ...currentWedding.couple.groom,
                name: info.groom_name || currentWedding.couple.groom.name,
                nickname: info.groom_nickname || currentWedding.couple.groom.nickname,
                parents: info.groom_parents || currentWedding.couple.groom.parents,
                avatar: (info.groom_avatar && info.groom_avatar !== '1.jpg') ? info.groom_avatar : (currentWedding.couple.groom.avatar && currentWedding.couple.groom.avatar !== '1.jpg' ? currentWedding.couple.groom.avatar : 'avatar-empty.svg'),
                instagram: info.groom_instagram || currentWedding.couple.groom.instagram
              },
              bride: {
                ...currentWedding.couple.bride,
                name: info.bride_name || currentWedding.couple.bride.name,
                nickname: info.bride_nickname || currentWedding.couple.bride.nickname,
                parents: info.bride_parents || currentWedding.couple.bride.parents,
                avatar: (info.bride_avatar && info.bride_avatar !== '2.jpg') ? info.bride_avatar : (currentWedding.couple.bride.avatar && currentWedding.couple.bride.avatar !== '2.jpg' ? currentWedding.couple.bride.avatar : 'avatar-empty.svg'),
                instagram: info.bride_instagram || currentWedding.couple.bride.instagram
              },
              combinedTitle: info.combined_title || currentWedding.couple.combinedTitle
            },
            weddingDate: info.wedding_date || currentWedding.weddingDate
          };
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEYS.WEDDING, JSON.stringify(merged));
          }
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('wedding_data_updated', { detail: merged }));
          }
        }
      } catch (e) {}
    },

    normalizeSchedulesList(rawList, defaultTitle = 'Resepsi') {
      if (!Array.isArray(rawList) || rawList.length === 0) {
        return [
          {
            id: 'acara-1',
            title: defaultTitle,
            badge: 'Acara',
            day: 'Ahad',
            date: '21 September 2026',
            fullDate: 'Ahad, 21 September 2026',
            time: '10:00 WIB s/d Selesai',
            venue: 'Kediaman',
            address: 'Lumajang, Jawa Timur',
            mapsUrl: 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
            calendarUrl: '#'
          }
        ];
      }

      return rawList.map((s, idx) => {
        const dateStr = s.fullDate || (s.day && s.date ? `${s.day}, ${s.date}` : s.date) || '21 September 2026';
        let calUrl = s.calendarUrl;
        if (!calUrl || calUrl === '#') {
          const detailStr = `${s.venue || ''} - ${s.address || ''}`.trim();
          let dates = '20260921T030000Z/20260921T080000Z';
          if (dateStr && dateStr.includes('20')) {
            dates = '20260920T010000Z/20260920T040000Z';
          }
          calUrl = `https://www.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(s.title || 'Acara Pernikahan')}&details=${encodeURIComponent(detailStr)}&dates=${dates}`;
        }
        return {
          ...s,
          id: s.id || `acara-${idx + 1}`,
          title: s.title || `Acara ${idx + 1}`,
          badge: s.badge || (idx === 0 ? 'Utama' : 'Acara'),
          day: s.day || (dateStr.includes('20') ? 'Ahad' : 'Senin'),
          date: s.date || '21 September 2026',
          fullDate: dateStr,
          time: s.time || '10:00 WIB s/d Selesai',
          venue: s.venue || 'Kediaman',
          address: s.address || '',
          mapsUrl: s.mapsUrl || 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
          calendarUrl: calUrl
        };
      });
    },

    formatScheduleDateSummary(normalizedList) {
      if (!normalizedList || normalizedList.length === 0) {
        return { formattedDate: 'Senin, 21 September 2026', dayName: 'Senin' };
      }
      if (normalizedList.length === 1) {
        const item = normalizedList[0];
        const day = item.day || (item.date && item.date.includes('20') ? 'Ahad' : 'Senin');
        let fDate = item.fullDate || item.date || '21 September 2026';
        if (day && !fDate.toLowerCase().includes(day.toLowerCase())) {
          fDate = `${day}, ${fDate}`;
        }
        return {
          formattedDate: fDate,
          dayName: day
        };
      }
      const uniqueDays = [...new Set(normalizedList.map(s => s.day).filter(Boolean))];
      const uniqueDates = [...new Set(normalizedList.map(s => s.date).filter(Boolean))];
      
      const daySummary = uniqueDays.join(' & ') || normalizedList[0].day || 'Ahad & Senin';
      let dateSummary = normalizedList[0].date;
      if (uniqueDates.length > 1) {
        const dayNums = uniqueDates.map(d => {
          const m = String(d).match(/\b(\d{1,2})\b/);
          return m ? m[1] : null;
        }).filter(Boolean);
        if (dayNums.length === uniqueDates.length) {
          const monthYear = String(uniqueDates[0]).replace(/^\d{1,2}\s*/, '').replace(/^[A-Za-z]+,\s*/, '');
          dateSummary = `${dayNums.join(' & ')} ${monthYear}`.trim();
        } else {
          dateSummary = uniqueDates.join(' & ');
        }
      }
      const finalFormatted = daySummary ? `${daySummary}, ${dateSummary}` : dateSummary;
      return {
        formattedDate: finalFormatted,
        dayName: daySummary
      };
    },

    getWeddingData(side = '') {
      let data = null;
      try {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.WEDDING) : null;
        data = stored ? JSON.parse(stored) : DEFAULT_WEDDING_DATA;
      } catch (e) {
        data = DEFAULT_WEDDING_DATA;
      }

      const activeSide = (side === 'pria' || side === 'wanita') ? side : (side || '');

      const rawGroomAvatar = (data.couple && data.couple.groom && data.couple.groom.avatar) || '';
      const rawBrideAvatar = (data.couple && data.couple.bride && data.couple.bride.avatar) || '';
      const cleanGroomAvatar = (rawGroomAvatar && !rawGroomAvatar.includes('groom-andra')) ? rawGroomAvatar : '1.jpg';
      const cleanBrideAvatar = (rawBrideAvatar && !rawBrideAvatar.includes('bride-clara')) ? rawBrideAvatar : '2.jpg';

      const normalizedCouple = {
        ...data.couple,
        groom: {
          ...((data.couple && data.couple.groom) || {}),
          avatar: cleanGroomAvatar
        },
        bride: {
          ...((data.couple && data.couple.bride) || {}),
          avatar: cleanBrideAvatar
        }
      };

      if (activeSide === 'pria') {
        const rawList = (data.schedulesPria && data.schedulesPria.length > 0) ? data.schedulesPria : data.schedules;
        const normalized = this.normalizeSchedulesList(rawList, 'Resepsi Pernikahan (Walimatul \'Urs)');
        const dateSum = this.formatScheduleDateSummary(normalized);
        const gNick = (data.couple && data.couple.groom && (data.couple.groom.nickname || data.couple.groom.name)) || '';
        const bNick = (data.couple && data.couple.bride && (data.couple.bride.nickname || data.couple.bride.name)) || '';
        const combined = (gNick && bNick) ? `${gNick} & ${bNick}` : ((data.couple && data.couple.combinedTitle) || 'Mempelai Pria & Wanita');
        const tag = (gNick && bNick) ? `The Wedding of ${gNick} & ${bNick}` : 'The Wedding Celebration';
        return {
          ...data,
          couple: normalizedCouple,
          activeSide: 'pria',
          combinedTitle: combined,
          tagline: tag,
          hostsTitle: data.hostsPria || 'Keluarga Besar Pria',
          coverImage: (data.coverImagePria && data.coverImagePria !== 'bg.jpeg') ? data.coverImagePria : 'bb.jpg',
          formattedDate: dateSum.formattedDate || data.formattedDate,
          dayName: dateSum.dayName || data.dayName || 'Senin',
          schedules: normalized
        };
      } else if (activeSide === 'wanita') {
        const rawList = (data.schedulesWanita && data.schedulesWanita.length > 0) ? data.schedulesWanita : data.schedules;
        const normalized = this.normalizeSchedulesList(rawList, 'Akad Nikah & Resepsi');
        const dateSum = this.formatScheduleDateSummary(normalized);
        const gNick = (data.couple && data.couple.groom && (data.couple.groom.nickname || data.couple.groom.name)) || '';
        const bNick = (data.couple && data.couple.bride && (data.couple.bride.nickname || data.couple.bride.name)) || '';
        const combined = (bNick && gNick) ? `${bNick} & ${gNick}` : ((data.couple && data.couple.combinedTitle) || 'Mempelai Wanita & Pria');
        const tag = (bNick && gNick) ? `The Wedding of ${bNick} & ${gNick}` : 'The Wedding Celebration';
        return {
          ...data,
          couple: normalizedCouple,
          activeSide: 'wanita',
          combinedTitle: combined,
          tagline: tag,
          hostsTitle: data.hostsWanita || 'Keluarga Besar Wanita',
          coverImage: (data.coverImageWanita && data.coverImageWanita !== 'bg.jpeg') ? data.coverImageWanita : 'bb.jpg',
          formattedDate: dateSum.formattedDate || data.formattedDate,
          dayName: dateSum.dayName || data.dayName || 'Ahad & Senin',
          schedules: normalized
        };
      } else if (activeSide && activeSide !== 'default') {
        // Custom Dashboard lookup
        const customDash = this.getDashboards().find(d => d.id === activeSide);
        if (customDash) {
          const isGroomBase = (customDash.baseTemplate || 'pria') === 'pria';
          const baseList = isGroomBase ? (data.schedulesPria || data.schedules) : (data.schedulesWanita || data.schedules);
          const normalized = this.normalizeSchedulesList(baseList, customDash.title || 'Acara Pernikahan');
          const dateSum = this.formatScheduleDateSummary(normalized);
          const rawCustomCover = (data.customMedia && data.customMedia[activeSide] && data.customMedia[activeSide].cover) || (isGroomBase ? data.coverImagePria : data.coverImageWanita) || '';
          const customCover = (rawCustomCover && rawCustomCover !== 'bg.jpeg') ? rawCustomCover : '';
          return {
            ...data,
            couple: normalizedCouple,
            activeSide,
            combinedTitle: customDash.coupleTitle || (isGroomBase ? 'Mempelai Pria & Wanita' : 'Mempelai Wanita & Pria'),
            tagline: customDash.tagline || (customDash.coupleTitle ? `The Wedding of ${customDash.coupleTitle}` : 'The Wedding Celebration'),
            hostsTitle: customDash.hostsTitle || (isGroomBase ? (data.hostsPria || 'Keluarga Besar Pria') : (data.hostsWanita || 'Keluarga Besar Wanita')),
            coverImage: customCover,
            formattedDate: dateSum.formattedDate || data.formattedDate,
            dayName: dateSum.dayName || data.dayName || 'Ahad',
            schedules: normalized
          };
        }
      }

      return {
        ...data,
        couple: normalizedCouple,
        activeSide: 'default',
        combinedTitle: (data.couple && data.couple.combinedTitle) || 'Mempelai Pria & Wanita',
        tagline: (data.couple && data.couple.tagline) || 'The Wedding Celebration',
        hostsTitle: 'Keluarga Besar Kedua Mempelai',
        coverImage: (data.coverImagePria && data.coverImagePria !== 'bg.jpeg') ? data.coverImagePria : '',
        schedules: data.schedules
      };
    },

    saveWeddingData(data) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.WEDDING, JSON.stringify(data));
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('wedding_data_updated', { detail: data }));
        }

        // Push to Supabase table wedding_info
        if (data && data.couple) {
          const schedP = (data.schedulesPria && data.schedulesPria[0]) || {};
          const schedW = (data.schedulesWanita && data.schedulesWanita[0]) || {};

          const payload = {
            groom_name: (data.couple.groom && data.couple.groom.name) || '',
            groom_nickname: (data.couple.groom && data.couple.groom.nickname) || '',
            groom_parents: (data.couple.groom && data.couple.groom.parents) || '',
            groom_avatar: (data.couple.groom && data.couple.groom.avatar && data.couple.groom.avatar !== '1.jpg') ? data.couple.groom.avatar : 'avatar-empty.svg',
            groom_instagram: (data.couple.groom && data.couple.groom.instagram) || '',
            bride_name: (data.couple.bride && data.couple.bride.name) || '',
            bride_nickname: (data.couple.bride && data.couple.bride.nickname) || '',
            bride_parents: (data.couple.bride && data.couple.bride.parents) || '',
            bride_avatar: (data.couple.bride && data.couple.bride.avatar && data.couple.bride.avatar !== '2.jpg') ? data.couple.bride.avatar : 'avatar-empty.svg',
            bride_instagram: (data.couple.bride && data.couple.bride.instagram) || '',
            combined_title: data.couple.combinedTitle || '',
            wedding_date: data.weddingDate || '2026-09-21 08:00:00+07',
            hosts_pria: data.hostsPria || '',
            hosts_wanita: data.hostsWanita || '',
            cover_image_pria: (data.coverImagePria && data.coverImagePria !== 'bg.jpeg') ? data.coverImagePria : '',
            cover_image_wanita: (data.coverImageWanita && data.coverImageWanita !== 'bg.jpeg') ? data.coverImageWanita : '',
            audio_url: data.audioUrl || 'janjisuci.mp3',
            // Acara Pria
            event_type_pria: schedP.title || 'Resepsi Pernikahan (Walimatul \'Urs)',
            event_day_pria: schedP.day || 'Ahad',
            event_date_pria: schedP.date || '21 September 2026',
            event_time_pria: schedP.time || '10:00 WIB s/d Selesai',
            event_venue_pria: schedP.venue || 'Kediaman Mempelai Pria',
            event_address_pria: schedP.address || '',
            event_maps_pria: schedP.mapsUrl || '',
            schedules_pria: data.schedulesPria || [],
            // Acara Wanita
            event_type_wanita: schedW.title || 'Akad Nikah & Resepsi Pernikahan',
            event_day_wanita: schedW.day || 'Ahad',
            event_date_wanita: schedW.date || '21 September 2026',
            event_time_wanita: schedW.time || '08:00 WIB s/d Selesai',
            event_venue_wanita: schedW.venue || 'Kediaman Mempelai Wanita',
            event_address_wanita: schedW.address || '',
            event_maps_wanita: schedW.mapsUrl || '',
            schedules_wanita: data.schedulesWanita || []
          };
          this.supabaseRequest('wedding_info?id=eq.1', 'PATCH', payload)
            .then(res => {
              if (!res) {
                // Percobaan 1: Kirim tanpa kolom audio_url jika skema database remote belum menambahkan kolom audio_url
                const payloadNoAudio = { ...payload };
                delete payloadNoAudio.audio_url;
                return this.supabaseRequest('wedding_info?id=eq.1', 'PATCH', payloadNoAudio).then(res2 => {
                  if (!res2) {
                    // Percobaan 2: Fallback minimal kolom dasar
                    const fallbackPayload = {
                      groom_name: payload.groom_name,
                      groom_nickname: payload.groom_nickname,
                      groom_parents: payload.groom_parents,
                      groom_avatar: (payload.groom_avatar && payload.groom_avatar.length > 500) ? 'avatar-empty.svg' : payload.groom_avatar,
                      groom_instagram: payload.groom_instagram,
                      bride_name: payload.bride_name,
                      bride_nickname: payload.bride_nickname,
                      bride_parents: payload.bride_parents,
                      bride_avatar: (payload.bride_avatar && payload.bride_avatar.length > 500) ? 'avatar-empty.svg' : payload.bride_avatar,
                      bride_instagram: payload.bride_instagram,
                      combined_title: payload.combined_title,
                      wedding_date: payload.wedding_date
                    };
                    return this.supabaseRequest('wedding_info?id=eq.1', 'PATCH', fallbackPayload);
                  }
                });
              }
            })
            .catch(() => {});
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    resetWeddingData() {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(STORAGE_KEYS.WEDDING);
        }
      } catch (e) {}
      return DEFAULT_WEDDING_DATA;
    },

    getGuests() {
      try {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.GUESTS) : null;
        return stored ? JSON.parse(stored) : DEFAULT_GUESTS;
      } catch (e) {
        return DEFAULT_GUESTS;
      }
    },

    saveGuests(guests) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(guests));
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('guests_data_updated', { detail: guests }));
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    addGuest(guest) {
      const guests = this.getGuests();
      const newGuest = {
        id: 'g-' + Date.now(),
        name: (guest.name || 'Tamu Undangan').trim(),
        phone: guest.phone || '',
        pax: parseInt(guest.pax, 10) || 1,
        side: (guest.side === 'wanita') ? 'wanita' : 'pria',
        status: this.normalizeStatus(guest.status),
        wishes: guest.wishes || '',
        checkedIn: !!guest.checkedIn,
        createdAt: new Date().toISOString(),
        ...guest
      };
      newGuest.side = (newGuest.side === 'wanita') ? 'wanita' : 'pria';
      newGuest.status = this.normalizeStatus(newGuest.status);

      guests.unshift(newGuest);
      this.saveGuests(guests);

      // Upsert to Supabase with resolution=merge-duplicates (resilient to unmigrated side column)
      const guestPayload = {
        id: newGuest.id,
        name: newGuest.name,
        phone: newGuest.phone || null,
        pax: newGuest.pax,
        side: newGuest.side,
        status: newGuest.status,
        checked_in: newGuest.checkedIn
      };
      this.supabaseRequest('guests?on_conflict=id', 'POST', guestPayload, { 'Prefer': 'resolution=merge-duplicates,return=representation' })
        .then(res => {
          if (!res) {
            const { side, ...legacyPayload } = guestPayload;
            return this.supabaseRequest('guests?on_conflict=id', 'POST', legacyPayload, { 'Prefer': 'resolution=merge-duplicates,return=representation' });
          }
        })
        .catch(() => {});

      return newGuest;
    },

    updateGuest(id, updatedFields) {
      const guests = this.getGuests();
      const idx = guests.findIndex(g => g.id === id);
      if (idx !== -1) {
        guests[idx] = { ...guests[idx], ...updatedFields };
        if (updatedFields.side !== undefined) guests[idx].side = (updatedFields.side === 'wanita') ? 'wanita' : 'pria';
        if (updatedFields.status !== undefined) guests[idx].status = this.normalizeStatus(guests[idx].status);
        this.saveGuests(guests);

        const g = guests[idx];
        // Upsert full row to Supabase so it handles both existing and newly added guests seamlessly
        const updatePayload = {
          id: g.id,
          name: g.name,
          phone: g.phone || null,
          pax: g.pax,
          side: g.side || 'pria',
          status: this.normalizeStatus(g.status),
          checked_in: g.checkedIn,
          checked_in_at: g.checkedIn ? new Date().toISOString() : null
        };
        this.supabaseRequest('guests?on_conflict=id', 'POST', updatePayload, { 'Prefer': 'resolution=merge-duplicates,return=representation' })
          .then(res => {
            if (!res) {
              const { side, ...legacyPayload } = updatePayload;
              return this.supabaseRequest('guests?on_conflict=id', 'POST', legacyPayload, { 'Prefer': 'resolution=merge-duplicates,return=representation' });
            }
          })
          .catch(() => {});

        return guests[idx];
      }
      return null;
    },

    deleteGuest(id) {
      const guests = this.getGuests().filter(g => g.id !== id);
      this.saveGuests(guests);

      // Async delete from Supabase
      this.supabaseRequest(`guests?id=eq.${encodeURIComponent(id)}`, 'DELETE').catch(() => {});
      return true;
    },

    formatWishTimestamp(input) {
      if (!input) return '';
      let str = '';
      if (input instanceof Date || (typeof input === 'string' && /^\d{4}-\d{2}-\d{2}/.test(input))) {
        const d = new Date(input);
        if (!isNaN(d.getTime())) {
          str = d.toLocaleString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) + ' WIB';
        }
      }
      if (!str) str = String(input);
      // Ganti nama bulan lengkap Indonesia menjadi singkatan 3 huruf (September -> Sep, dll.)
      const monthMap = {
        'Januari': 'Jan',
        'Februari': 'Feb',
        'Maret': 'Mar',
        'April': 'Apr',
        'Mei': 'Mei',
        'Juni': 'Jun',
        'Juli': 'Jul',
        'Agustus': 'Agu',
        'September': 'Sep',
        'Oktober': 'Okt',
        'November': 'Nov',
        'Desember': 'Des'
      };
      for (const [fullM, shortM] of Object.entries(monthMap)) {
        if (str.includes(fullM)) {
          str = str.replace(new RegExp(fullM, 'g'), shortM);
        }
      }
      return str;
    },

    getWishes() {
      let list = DEFAULT_WISHES;
      try {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.WISHES) : null;
        list = stored ? JSON.parse(stored) : DEFAULT_WISHES;
      } catch (e) {
        list = DEFAULT_WISHES;
      }
      return list.map(w => ({
        ...w,
        timestamp: this.formatWishTimestamp(w.timestamp)
      }));
    },

    saveWishes(wishes) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(wishes));
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('wishes_data_updated', { detail: wishes }));
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    addWish(wish) {
      const wishes = this.getWishes();
      const newWish = {
        id: 'w-' + Date.now(),
        name: (wish.name || 'Tamu Baik Hati').trim(),
        attendance: this.normalizeStatus(wish.attendance || 'hadir'),
        pax: parseInt(wish.pax, 10) || 1,
        message: (wish.message || '').trim(),
        timestamp: this.formatWishTimestamp(new Date()),
        likes: 0
      };
      wishes.unshift(newWish);
      this.saveWishes(wishes);

      const guests = this.getGuests();
      const matchedGuest = guests.find(g => g.name.toLowerCase() === newWish.name.toLowerCase());
      let matchedGuestId = null;

      if (matchedGuest) {
        this.updateGuest(matchedGuest.id, {
          status: newWish.attendance,
          pax: newWish.pax || matchedGuest.pax,
          wishes: newWish.message
        });
        matchedGuestId = matchedGuest.id;
      }

      // Safe Foreign Key Handling: Insert with matchedGuestId if available, fallback to null if FK fails
      const wishPayload = {
        id: newWish.id,
        guest_id: matchedGuestId,
        sender_name: newWish.name,
        attendance: newWish.attendance,
        pax: newWish.pax,
        message: newWish.message
      };

      this.supabaseRequest('wishes?on_conflict=id', 'POST', wishPayload, {
        'Prefer': 'resolution=merge-duplicates,return=representation'
      }).then(res => {
        if (!res && matchedGuestId) {
          // If insert failed due to FK, retry with guest_id = null
          wishPayload.guest_id = null;
          this.supabaseRequest('wishes?on_conflict=id', 'POST', wishPayload, {
            'Prefer': 'resolution=merge-duplicates,return=representation'
          }).catch(() => {});
        }
      }).catch(() => {});

      return newWish;
    },

    deleteWish(id) {
      const wishes = this.getWishes().filter(w => w.id !== id);
      this.saveWishes(wishes);

      // Async delete from Supabase
      this.supabaseRequest(`wishes?id=eq.${encodeURIComponent(id)}`, 'DELETE').catch(() => {});
      return true;
    },

    getStats() {
      const guests = this.getGuests();
      const wishes = this.getWishes();
      
      const totalGuests = guests.length;
      const hadirGuests = guests.filter(g => g.status === 'hadir');
      const tidakHadirGuests = guests.filter(g => g.status === 'tidak_hadir');
      const raguGuests = guests.filter(g => g.status === 'ragu' || g.status === 'pending');
      
      const totalPaxConfirmed = hadirGuests.reduce((acc, curr) => acc + (parseInt(curr.pax, 10) || 1), 0);
      const totalPria = guests.filter(g => g.side !== 'wanita').length;
      const totalWanita = guests.filter(g => g.side === 'wanita').length;
      const totalCheckedIn = guests.filter(g => g.checkedIn).length;

      return {
        totalGuests: guests.length,
        totalPria,
        totalWanita,
        hadirCount: hadirGuests.length,
        tidakHadirCount: tidakHadirGuests.length,
        raguCount: raguGuests.length,
        totalPaxConfirmed,
        totalCheckedIn,
        totalWishes: wishes.length
      };
    },

    generateInvitationUrl(guestName, side = 'pria') {
      const cleanName = (guestName || '').trim();
      const targetSide = (side && side !== 'default') ? encodeURIComponent(side) : 'pria';
      let origin = '';
      if (typeof window !== 'undefined' && window.location) {
        origin = window.location.origin;
        if (!origin || origin === 'null' || origin.startsWith('file:')) {
          origin = 'https://nuruddin-ten.vercel.app';
        }
      } else {
        origin = 'https://nuruddin-ten.vercel.app';
      }

      if (!cleanName || cleanName === 'Tamu Undangan') {
        return `${origin}/${targetSide}`;
      }
      const encoded = encodeURIComponent(cleanName).replace(/%20/g, '+');
      return `${origin}/${targetSide}/to/${encoded}`;
    },

    sanitizeWhatsAppMessage(message) {
      if (!message) return '';
      return message
        .replace(/\uFFFD/g, '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/[ \t]+\n/g, '\n')
        .trim();
    },

    generateWhatsAppMessage(guest, weddingData, inviteUrl) {
      const couple = (weddingData && weddingData.couple) || {};
      const coupleName = couple.combinedTitle || 'Silfi & Nuruddin';
      const dateFormatted = (weddingData && weddingData.formattedDate) || 'Ahad, 21 September 2026';

      const guestName = (guest && guest.name) ? guest.name.trim() : 'Tamu Undangan';

      const template = `Kepada Yth. Bapak/Ibu/Saudara/i *${guestName}*

Assalamu’alaikum Warahmatullahi Wabarakatuh.

Dengan hormat, kami mengundang Anda untuk hadir di pernikahan:

*The Wedding of ${coupleName}*
${dateFormatted}

*Buka Undangan:*
${inviteUrl}

Kami sangat berharap Anda dapat hadir dan memberikan doa restu.

Terima kasih.

*${coupleName}*`;

      return this.sanitizeWhatsAppMessage(template);
    },

    // --- MULTI-DASHBOARD WORKSPACE REGISTRY ---
    getDashboards() {
      try {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.DASHBOARDS) : null;
        if (!stored) return DEFAULT_DASHBOARDS;
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasPria = parsed.some(d => d.id === 'pria');
          const hasWanita = parsed.some(d => d.id === 'wanita');
          let list = [...parsed];
          if (!hasPria) list.unshift(DEFAULT_DASHBOARDS[0]);
          if (!hasWanita) list.splice(1, 0, DEFAULT_DASHBOARDS[1]);
          return list;
        }
        return DEFAULT_DASHBOARDS;
      } catch (e) {
        return DEFAULT_DASHBOARDS;
      }
    },

    getActiveDashboardId() {
      try {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.ACTIVE_DASHBOARD) : null;
        if (stored) {
          const list = this.getDashboards();
          if (list.some(d => d.id === stored)) return stored;
        }
      } catch (e) {}
      return 'pria';
    },

    setActiveDashboardId(id) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.ACTIVE_DASHBOARD, id);
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('active_dashboard_changed', { detail: { id } }));
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    addDashboard(item) {
      if (!item || !item.id) return false;
      const cleanId = String(item.id).trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
      if (!cleanId) return false;
      const list = this.getDashboards();
      if (list.some(d => d.id === cleanId)) {
        return false;
      }
      const newDashboard = {
        id: cleanId,
        title: item.title || `Undangan ${cleanId}`,
        shortTitle: item.shortTitle || item.title || cleanId,
        badge: item.badge || 'Acara Tambahan',
        side: cleanId,
        path: `/${cleanId}`,
        coupleTitle: item.coupleTitle || 'Mempelai Pria & Wanita',
        tagline: item.tagline || (item.coupleTitle ? `The Wedding of ${item.coupleTitle}` : 'The Wedding Celebration'),
        hostsTitle: item.hostsTitle || 'Keluarga Besar Mempelai',
        isSystem: false,
        createdAt: new Date().toISOString()
      };
      list.push(newDashboard);
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.DASHBOARDS, JSON.stringify(list));
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('dashboards_list_updated', { detail: list }));
        }
        return newDashboard;
      } catch (e) {
        return false;
      }
    },

    deleteDashboard(id) {
      if (id === 'pria' || id === 'wanita') return false;
      let list = this.getDashboards().filter(d => d.id !== id);
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.DASHBOARDS, JSON.stringify(list));
          if (this.getActiveDashboardId() === id) {
            this.setActiveDashboardId('pria');
          }
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('dashboards_list_updated', { detail: list }));
        }
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  // Auto initialize cloud sync on load & when online
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('online', () => {
        WeddingStorage.syncFromCloud();
      });
    }
    setTimeout(() => {
      WeddingStorage.syncFromCloud();
    }, 100);
  }

  return {
    DEFAULT_DASHBOARDS,
    DEFAULT_WEDDING_DATA,
    DEFAULT_GUESTS,
    DEFAULT_WISHES,
    WeddingStorage
  };
});
