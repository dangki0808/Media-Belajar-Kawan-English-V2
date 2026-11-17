// Data tutor Kawan English (contoh/demo). Ganti dengan tutor sungguhan bila sudah ada.
// days: 0=Minggu ... 6=Sabtu · hours: jam mulai (waktu HP pengguna)
window.TUTOR_TAGS = ["Percakapan", "Pemula", "IELTS", "TOEFL", "Bisnis", "Anak", "Pelafalan", "Grammar", "Wawancara Kerja", "Writing"];
window.TUTORS = [
  {
    id: "rina", name: "Rina Hartono", country: "Indonesia", flag: "🇮🇩", color: "#0f8a7e",
    headline: "Teman ngobrol bahasa Inggris yang sabar untuk pemula",
    price: 85000, trial: 35000, rating: 4.9, reviews: 128, lessons: 2140, years: 6, indo: true,
    tags: ["Percakapan", "Pemula", "Grammar"], langs: ["Indonesia (asli)", "Inggris (C2)"],
    about: "Saya lulusan Pendidikan Bahasa Inggris dan sudah 6 tahun mengajar orang dewasa yang baru mulai. Di kelas saya, kamu boleh salah — kita perbaiki pelan-pelan dengan penjelasan bahasa Indonesia, lalu langsung dipraktikkan dalam percakapan.",
    days: [1, 2, 3, 4, 6], hours: [7, 8, 19, 20, 21],
    revs: [["Budi · Surabaya", 5, "Awalnya takut bicara, sekarang sudah berani presentasi singkat di kantor."], ["Sari · Medan", 5, "Penjelasannya jelas sekali, cocok untuk yang benar-benar dari nol."]]
  },
  {
    id: "james", name: "James Whitaker", country: "Inggris", flag: "🇬🇧", color: "#14324f",
    headline: "Persiapan IELTS band 7+ dan bahasa Inggris bisnis",
    price: 210000, trial: 90000, rating: 4.8, reviews: 96, lessons: 3310, years: 9, indo: false,
    tags: ["IELTS", "Bisnis", "Writing"], langs: ["Inggris (asli)", "Indonesia (A2)"],
    about: "Former IELTS examiner with 9 years of teaching. I give you a clear study plan, timed practice for every section, and detailed feedback on your essays and speaking answers.",
    days: [1, 3, 5], hours: [15, 16, 17, 20],
    revs: [["Andre · Jakarta", 5, "Naik dari band 6 ke 7.5 dalam 2 bulan. Feedback writing-nya detail."], ["Lia · Bandung", 4, "Agak cepat bicaranya, tapi materinya sangat terarah."]]
  },
  {
    id: "maria", name: "Maria Santos", country: "Filipina", flag: "🇵🇭", color: "#d98a10",
    headline: "Kelas ceria untuk anak & percakapan sehari-hari",
    price: 95000, trial: 40000, rating: 4.9, reviews: 203, lessons: 4870, years: 7, indo: false,
    tags: ["Anak", "Percakapan", "Pemula"], langs: ["Inggris (C2)", "Tagalog (asli)"],
    about: "I teach kids aged 5–12 with songs, games, and stories, and I also help adults who want to speak confidently in daily situations. Every lesson ends with a small speaking challenge.",
    days: [0, 2, 4, 6], hours: [9, 10, 14, 16, 18],
    revs: [["Mama Kia · Depok", 5, "Anak saya jadi menunggu-nunggu jadwal kelas. Terima kasih Teacher Maria!"], ["Rizky · Malang", 5, "Ramah dan sabar."]]
  },
  {
    id: "dimas", name: "Dimas Pratama", country: "Indonesia", flag: "🇮🇩", color: "#6b4fc8",
    headline: "Strategi TOEFL ITP/iBT dan grammar yang mudah dipahami",
    price: 75000, trial: 30000, rating: 4.7, reviews: 64, lessons: 980, years: 4, indo: true,
    tags: ["TOEFL", "Grammar", "Writing"], langs: ["Indonesia (asli)", "Inggris (C1)"],
    about: "Skor TOEFL iBT saya 112. Saya fokus pada pola soal yang sering muncul, trik mengatur waktu, dan grammar structure yang sering menjebak. Cocok untuk syarat beasiswa dan kelulusan.",
    days: [1, 2, 3, 4, 5], hours: [18, 19, 20, 21],
    revs: [["Nadia · Yogyakarta", 5, "Skor ITP saya naik 63 poin. Tips structure-nya ampuh."], ["Fajar · Makassar", 4, "Bagus, materinya sistematis."]]
  },
  {
    id: "emily", name: "Emily Carter", country: "Amerika Serikat", flag: "🇺🇸", color: "#e2553f",
    headline: "Pelafalan aksen Amerika & percakapan natural",
    price: 240000, trial: 100000, rating: 5.0, reviews: 41, lessons: 1220, years: 5, indo: false,
    tags: ["Pelafalan", "Percakapan", "Wawancara Kerja"], langs: ["Inggris (asli)", "Spanyol (B2)"],
    about: "Certified accent coach. We'll work on the sounds that are hard for Indonesian speakers (th, v, r, final consonants), plus rhythm and intonation so you sound natural and clear.",
    days: [2, 4, 6], hours: [6, 7, 8, 21],
    revs: [["Kevin · Bali", 5, "Bunyi 'th' dan 'v' saya akhirnya benar. Sangat detail."], ["Dewi · Jakarta", 5, "Worth it untuk persiapan interview."]]
  },
  {
    id: "ayu", name: "Ayu Lestari", country: "Indonesia", flag: "🇮🇩", color: "#1f9d55",
    headline: "Bahasa Inggris dasar untuk anak SD & SMP",
    price: 60000, trial: 25000, rating: 4.8, reviews: 151, lessons: 2600, years: 5, indo: true,
    tags: ["Anak", "Pemula", "Grammar"], langs: ["Indonesia (asli)", "Inggris (C1)", "Jawa (asli)"],
    about: "Guru SD bilingual. Saya membantu anak mengejar materi sekolah, menambah kosakata, dan berani menjawab dalam bahasa Inggris. Orang tua mendapat catatan perkembangan setiap minggu.",
    days: [1, 2, 3, 4, 5, 6], hours: [15, 16, 17, 19],
    revs: [["Ibu Rani · Semarang", 5, "Laporan mingguannya membantu sekali."], ["Pak Hendra · Bekasi", 5, "Anak saya nilainya naik."]]
  },
  {
    id: "daniel", name: "Daniel O'Brien", country: "Irlandia", flag: "🇮🇪", color: "#2a6fdb",
    headline: "Email, meeting, dan presentasi bahasa Inggris untuk kerja",
    price: 190000, trial: 80000, rating: 4.6, reviews: 37, lessons: 860, years: 8, indo: false,
    tags: ["Bisnis", "Wawancara Kerja", "Writing"], langs: ["Inggris (asli)", "Irlandia (B1)"],
    about: "Ex-corporate trainer. Bring your real work tasks — emails, slides, meeting agendas — and we'll practise them together. I also run mock job interviews with feedback.",
    days: [1, 2, 4, 5], hours: [12, 13, 16, 19],
    revs: [["Yoga · Tangerang", 5, "Mock interview-nya realistis, saya diterima di perusahaan multinasional."], ["Mira · Batam", 4, "Praktis dan langsung dipakai."]]
  },
  {
    id: "sarah", name: "Sarah Nkosi", country: "Afrika Selatan", flag: "🇿🇦", color: "#a2457a",
    headline: "IELTS Writing & Speaking dengan feedback terstruktur",
    price: 150000, trial: 60000, rating: 4.9, reviews: 88, lessons: 1950, years: 6, indo: false,
    tags: ["IELTS", "Writing", "Percakapan"], langs: ["Inggris (asli)", "Zulu (asli)"],
    about: "CELTA-certified teacher. I mark your essays with the official band descriptors and show you exactly what to change to reach the next band. Speaking lessons follow the real test format.",
    days: [0, 1, 3, 5], hours: [13, 14, 18, 19, 20],
    revs: [["Tasya · Pekanbaru", 5, "Writing Task 2 saya naik ke 7.0."], ["Rendra · Bogor", 5, "Sangat terstruktur dan suportif."]]
  }
];
