/**
 * Wevitation Khusus - Data Store & State Manager
 * Standalone & Module compatible (works on file:// protocol & http://)
 */

(function(root, factory) {
  const exportsObj = factory();
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = exportsObj;
  }
  if (typeof define === 'function' && define.amd) {
    define(function() { return exportsObj; });
  }
  if (typeof window !== 'undefined') {
    window.DEFAULT_WEDDING_DATA = exportsObj.DEFAULT_WEDDING_DATA;
    window.DEFAULT_GUESTS = exportsObj.DEFAULT_GUESTS;
    window.DEFAULT_WISHES = exportsObj.DEFAULT_WISHES;
    window.WeddingStorage = exportsObj.WeddingStorage;
  } else if (typeof root !== 'undefined') {
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
    SETTINGS: 'wevitation_khusus_settings'
  };

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
    dayName: 'Ahad',
    formattedDate: 'Ahad, 21 September 2026',
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
        date: 'Ahad, 21 September 2026',
        time: '10:00 WIB s/d Selesai',
        venue: 'Kediaman Mempelai Pria',
        address: 'Tawonsongo, Kec. Pasrujambe, Kab. Lumajang, Jawa Timur',
        mapsUrl: 'https://maps.app.goo.gl/eXsw8jBtcK1uvuib8',
        calendarUrl: 'https://www.google.com/calendar/event?action=TEMPLATE&text=Walimatul+%27Urs+Silfi+%26+Nuruddin&details=Kediaman+Mempelai+Pria%2C+Tawonsongo+-+Pasrujambe+-+Lumajang&dates=20260921T030000Z/20260921T080000Z'
      }
    ],
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
      category: 'VIP',
      pax: 2,
      table: 'Meja VIP 01',
      status: 'hadir',
      wishes: 'Selamat untuk kedua mempelai, semoga rukun bahagia selalu sampai kakek nenek.',
      checkedIn: true,
      createdAt: '2026-09-01T10:00:00Z'
    },
    {
      id: 'g-2',
      name: 'Dimas Prasetyo & Partner',
      phone: '6281398765432',
      category: 'Sahabat',
      pax: 2,
      table: 'Meja 04',
      status: 'hadir',
      wishes: 'Selamat menempuh hidup baru bro Nuruddin & Mbak Silfi! Lancar acaranya.',
      checkedIn: false,
      createdAt: '2026-09-02T11:20:00Z'
    },
    {
      id: 'g-3',
      name: 'Clarissa Maharani',
      phone: '6285712349988',
      category: 'Rekan Kerja',
      pax: 1,
      table: 'Meja 08',
      status: 'ragu',
      wishes: 'Happy wedding Silfi cantik & Mas Nuruddin! Semoga menjadi keluarga yang sakinah mawaddah warahmah.',
      checkedIn: false,
      createdAt: '2026-09-03T15:40:00Z'
    },
    {
      id: 'g-4',
      name: 'dr. Hendra Setiawan, Sp.A',
      phone: '6281122334455',
      category: 'VIP',
      pax: 2,
      table: 'Meja VIP 02',
      status: 'hadir',
      wishes: 'Barakallah Silfi dan Nuruddin, semoga senantiasa dalam limpahan berkah.',
      checkedIn: false,
      createdAt: '2026-09-04T09:15:00Z'
    },
    {
      id: 'g-5',
      name: 'Rian Pratama & Tim IT',
      phone: '6289876543210',
      category: 'Rekan Kerja',
      pax: 4,
      table: 'Meja 12',
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
      timestamp: 'Senin, 01 September 2026 10:15 WIB',
      likes: 4
    },
    {
      id: 'w-2',
      name: 'Dimas Prasetyo & Partner',
      attendance: 'hadir',
      pax: 2,
      message: 'Selamat menempuh hidup baru bro Nuruddin & Mbak Silfi! Lancar acaranya ya, nanti kita kumpul seru!',
      timestamp: 'Selasa, 02 September 2026 11:32 WIB',
      likes: 2
    },
    {
      id: 'w-3',
      name: 'Clarissa Maharani',
      attendance: 'ragu',
      pax: 1,
      message: 'Happy wedding Silfi cantik & Mas Nuruddin! Semoga menjadi keluarga yang sakinah mawaddah warahmah. Aamiin ya rabbal alamin.',
      timestamp: 'Rabu, 03 September 2026 16:05 WIB',
      likes: 5
    },
    {
      id: 'w-4',
      name: 'Rian Pratama',
      attendance: 'tidak_hadir',
      pax: 0,
      message: 'Selamat Mas Nuruddin & Mbak Silfi! Mohon maaf belum bisa hadir langsung karena dinas luar kota, doa terbaik untuk kalian berdua.',
      timestamp: 'Jumat, 05 September 2026 14:22 WIB',
      likes: 1
    }
  ];

  const SUPABASE_CONFIG = {
    url: 'https://vtboeyzidmehmswpkhhu.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Ym9leXppZG1laG1zd3BraGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NjM4OTMsImV4cCI6MjEwNDMzOTg5M30.9UpEo5L19j465HVBO1Ay6plKVAr8-mT7Gknf5eOrCVY'
  };

  const WeddingStorage = {
    supabaseConfig: SUPABASE_CONFIG,

    normalizeCategory(cat) {
      if (!cat) return 'Umum';
      const c = String(cat).trim();
      const valid = ['VIP', 'Keluarga', 'Sahabat', 'Rekan Kerja', 'Umum'];
      const matched = valid.find(v => v.toLowerCase() === c.toLowerCase());
      return matched || 'Umum';
    },

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
          console.warn('Supabase request non-ok status:', res.status, endpoint);
          return null;
        }
        if (res.status === 204) return true;
        return await res.json();
      } catch (err) {
        console.warn('Supabase connection offline or blocked:', err.message);
        return null;
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
            category: this.normalizeCategory(g.category),
            pax: g.pax || 1,
            table: g.table_seat || 'Meja Umum',
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
            timestamp: w.created_at ? new Date(w.created_at).toLocaleString('id-ID', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) + ' WIB' : '',
            likes: w.likes_count || 0
          }));
          this.saveWishes(mappedW);
        }
      } catch (e) {}

      // 3. Sync Wedding Info
      try {
        const cloudInfo = await this.supabaseRequest('wedding_info?select=*&limit=1');
        if (cloudInfo && Array.isArray(cloudInfo) && cloudInfo.length > 0) {
          const info = cloudInfo[0];
          const currentWedding = this.getWeddingData();
          const merged = {
            ...currentWedding,
            couple: {
              ...currentWedding.couple,
              groom: {
                ...currentWedding.couple.groom,
                name: info.groom_name || currentWedding.couple.groom.name,
                nickname: info.groom_nickname || currentWedding.couple.groom.nickname,
                parents: info.groom_parents || currentWedding.couple.groom.parents,
                avatar: info.groom_avatar || currentWedding.couple.groom.avatar,
                instagram: info.groom_instagram || currentWedding.couple.groom.instagram
              },
              bride: {
                ...currentWedding.couple.bride,
                name: info.bride_name || currentWedding.couple.bride.name,
                nickname: info.bride_nickname || currentWedding.couple.bride.nickname,
                parents: info.bride_parents || currentWedding.couple.bride.parents,
                avatar: info.bride_avatar || currentWedding.couple.bride.avatar,
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

    getWeddingData() {
      try {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.WEDDING) : null;
        return stored ? JSON.parse(stored) : DEFAULT_WEDDING_DATA;
      } catch (e) {
        return DEFAULT_WEDDING_DATA;
      }
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
          const payload = {
            groom_name: (data.couple.groom && data.couple.groom.name) || 'Nuruddin',
            groom_nickname: (data.couple.groom && data.couple.groom.nickname) || 'Nuruddin',
            groom_parents: (data.couple.groom && data.couple.groom.parents) || '',
            groom_avatar: (data.couple.groom && data.couple.groom.avatar) || '1.jpg',
            groom_instagram: (data.couple.groom && data.couple.groom.instagram) || '',
            bride_name: (data.couple.bride && data.couple.bride.name) || 'Silfiana',
            bride_nickname: (data.couple.bride && data.couple.bride.nickname) || 'Silfi',
            bride_parents: (data.couple.bride && data.couple.bride.parents) || '',
            bride_avatar: (data.couple.bride && data.couple.bride.avatar) || '2.jpg',
            bride_instagram: (data.couple.bride && data.couple.bride.instagram) || '',
            combined_title: data.couple.combinedTitle || 'Silfi & Nuruddin',
            wedding_date: data.weddingDate || '2026-09-21 08:00:00+07'
          };
          this.supabaseRequest('wedding_info?id=eq.1', 'PATCH', payload).catch(() => {});
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
        category: this.normalizeCategory(guest.category),
        pax: parseInt(guest.pax, 10) || 1,
        table: guest.table || 'Meja Umum',
        status: this.normalizeStatus(guest.status),
        wishes: guest.wishes || '',
        checkedIn: !!guest.checkedIn,
        createdAt: new Date().toISOString(),
        ...guest
      };
      newGuest.category = this.normalizeCategory(newGuest.category);
      newGuest.status = this.normalizeStatus(newGuest.status);

      guests.unshift(newGuest);
      this.saveGuests(guests);

      // Upsert to Supabase with resolution=merge-duplicates
      this.supabaseRequest('guests?on_conflict=id', 'POST', {
        id: newGuest.id,
        name: newGuest.name,
        phone: newGuest.phone || null,
        category: newGuest.category,
        pax: newGuest.pax,
        table_seat: newGuest.table,
        status: newGuest.status,
        checked_in: newGuest.checkedIn
      }, { 'Prefer': 'resolution=merge-duplicates,return=representation' }).catch(() => {});

      return newGuest;
    },

    updateGuest(id, updatedFields) {
      const guests = this.getGuests();
      const idx = guests.findIndex(g => g.id === id);
      if (idx !== -1) {
        guests[idx] = { ...guests[idx], ...updatedFields };
        if (updatedFields.category !== undefined) guests[idx].category = this.normalizeCategory(guests[idx].category);
        if (updatedFields.status !== undefined) guests[idx].status = this.normalizeStatus(guests[idx].status);
        this.saveGuests(guests);

        const g = guests[idx];
        // Upsert full row to Supabase so it handles both existing and newly added guests seamlessly
        this.supabaseRequest('guests?on_conflict=id', 'POST', {
          id: g.id,
          name: g.name,
          phone: g.phone || null,
          category: this.normalizeCategory(g.category),
          pax: g.pax,
          table_seat: g.table,
          status: this.normalizeStatus(g.status),
          checked_in: g.checkedIn,
          checked_in_at: g.checkedIn ? new Date().toISOString() : null
        }, { 'Prefer': 'resolution=merge-duplicates,return=representation' }).catch(() => {});

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

    getWishes() {
      try {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.WISHES) : null;
        return stored ? JSON.parse(stored) : DEFAULT_WISHES;
      } catch (e) {
        return DEFAULT_WISHES;
      }
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
        timestamp: new Date().toLocaleString('id-ID', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) + ' WIB',
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
      const totalCheckedIn = guests.filter(g => g.checkedIn).length;

      return {
        totalGuests,
        hadirCount: hadirGuests.length,
        tidakHadirCount: tidakHadirGuests.length,
        raguCount: raguGuests.length,
        totalPaxConfirmed,
        totalCheckedIn,
        totalWishes: wishes.length
      };
    },

    generateInvitationUrl(guestName, pax = 1, seat = '', customParam = '') {
      let baseUrl = 'index.html';
      if (typeof window !== 'undefined' && window.location) {
        baseUrl = window.location.href.split('?')[0].replace(/dashboard\.html$/i, 'index.html');
      }
      const params = new URLSearchParams();
      if (guestName) params.set('to', guestName);
      if (pax > 1) params.set('pax', pax);
      if (seat && seat !== '-') params.set('seat', seat);
      if (customParam) params.set('k', customParam);
      return `${baseUrl}?${params.toString()}`;
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
      const rawTable = (guest && guest.table && guest.table !== '-') ? guest.table.trim() : '';
      const paxNum = (guest && guest.pax) ? Number(guest.pax) : 0;

      let seatPart = '';
      if (rawTable) {
        seatPart = rawTable.toLowerCase().startsWith('meja') ? rawTable : `Meja ${rawTable}`;
      }
      const paxPart = paxNum > 0 ? `${paxNum} Pax` : '';
      const seatInfo = [seatPart, paxPart].filter(Boolean).join(' • ');
      const seatLine = seatInfo ? `_(${seatInfo})_\n` : '';

      const template = `Kepada Yth. Bapak/Ibu/Saudara/i *${guestName}*
${seatLine}
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
    }
  };

  // Auto initialize cloud sync on load & when online
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      WeddingStorage.syncFromCloud();
    });
    setTimeout(() => {
      WeddingStorage.syncFromCloud();
    }, 100);
  }

  return {
    DEFAULT_WEDDING_DATA,
    DEFAULT_GUESTS,
    DEFAULT_WISHES,
    WeddingStorage
  };
});
