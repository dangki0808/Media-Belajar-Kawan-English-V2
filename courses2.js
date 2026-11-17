// Kursus tambahan Kawan English. Blok baru: ["write", petunjuk, minKata] latihan menulis dengan pemeriksa otomatis
window.COURSES = (window.COURSES || []).concat([
  {
    id: "ielts", t: "Persiapan IELTS Academic", sub: "Format tes, strategi tiap bagian, dan latihan menulis esai Task 2.",
    level: "B1–C1", cat: "Tes Internasional", hours: 8, color: "#1d6fb8", ic: "🌏",
    learn: ["Memahami format dan penilaian keempat bagian IELTS", "Menerapkan strategi skimming, scanning, dan True/False/Not Given", "Menyusun esai Writing Task 2 dengan struktur yang jelas", "Berbicara lancar di Speaking Part 2 selama 1–2 menit"],
    skills: ["IELTS", "Strategi tes", "Essay writing", "Fluency"],
    M: [
      {
        t: "Mengenal Format IELTS", d: "Empat bagian tes dan cara penilaiannya.",
        L: [
          { t: "Empat bagian tes", min: 6, b: [
            ["p", "IELTS Academic menguji empat keterampilan. Listening, Reading, dan Writing dikerjakan dalam satu sesi tanpa jeda; Speaking bisa di hari yang sama atau berbeda."],
            ["rule", "Listening : 4 bagian, 40 soal, ±30 menit\nReading   : 3 teks, 40 soal, 60 menit\nWriting   : Task 1 (≥150 kata) + Task 2 (≥250 kata), 60 menit\nSpeaking  : 3 bagian, 11–14 menit, tatap muka dengan penguji"],
            ["p", "Nilai diberikan dalam **band 0–9** untuk tiap bagian, lalu dirata-rata menjadi **overall band**. Banyak universitas luar negeri meminta overall **6.5** dengan nilai minimal tertentu per bagian."],
            ["tip", "Writing Task 2 bobotnya **dua kali** Task 1. Sisihkan sekitar 40 menit untuk Task 2 dan 20 menit untuk Task 1."]
          ] },
          { t: "Kriteria penilaian Writing & Speaking", min: 5, b: [
            ["p", "Writing dinilai dengan empat kriteria yang sama bobotnya:"],
            ["rule", "Task Response / Achievement — menjawab semua bagian pertanyaan\nCoherence & Cohesion — alur dan kata penghubung\nLexical Resource — variasi dan ketepatan kosakata\nGrammatical Range & Accuracy — variasi dan ketepatan grammar"],
            ["p", "Speaking dinilai dari **Fluency & Coherence**, **Lexical Resource**, **Grammatical Range & Accuracy**, dan **Pronunciation**."],
            ["tip", "Esai yang tidak menjawab seluruh pertanyaan akan tertahan nilainya, sebagus apa pun grammarnya."]
          ] }
        ],
        Q: [
          { q: "Berapa jumlah soal Reading IELTS?", o: ["30", "40", "50"], a: 1, e: "Reading dan Listening masing-masing 40 soal." },
          { q: "Panjang minimal Writing Task 2:", o: ["150 kata", "250 kata", "350 kata"], a: 1, e: "Task 1 minimal 150 kata, Task 2 minimal 250 kata." },
          { q: "Skala nilai IELTS adalah...", o: ["0–100", "Band 0–9", "A–F"], a: 1, e: "Band 0–9, termasuk nilai setengah seperti 6.5." },
          { q: "Kriteria 'Coherence & Cohesion' menilai...", o: ["Ejaan", "Alur dan kata penghubung", "Panjang esai"], a: 1, e: "Bagaimana gagasan tersusun dan terhubung." },
          { q: "Bagian Writing yang bobotnya lebih besar:", o: ["Task 1", "Task 2", "Sama besar"], a: 1, e: "Task 2 berbobot dua kali Task 1." }
        ]
      },
      {
        t: "Strategi Reading", d: "Skimming, scanning, dan True/False/Not Given.",
        L: [
          { t: "Skimming dan scanning", min: 6, b: [
            ["p", "**Skimming**: membaca cepat untuk menangkap gagasan utama (judul, kalimat pertama tiap paragraf). **Scanning**: mencari informasi spesifik seperti angka, nama, tanggal tanpa membaca semuanya."],
            ["rule", "1. Baca soal dulu, garis bawahi kata kunci\n2. Skim teks ±2 menit untuk memetakan isi paragraf\n3. Scan untuk menemukan kata kunci atau sinonimnya\n4. Baca teliti kalimat di sekitarnya, lalu jawab"],
            ["tip", "Soal jarang memakai kata yang sama persis dengan teks. Cari **sinonim** dan **parafrase**: 'increase' di soal bisa muncul sebagai 'rise' atau 'grow' di teks."]
          ] },
          { t: "True / False / Not Given", min: 6, b: [
            ["p", "Tipe soal yang paling sering menjebak. Bandingkan pernyataan dengan informasi di teks."],
            ["rule", "TRUE      : teks menyatakan hal yang sama\nFALSE     : teks menyatakan hal yang berlawanan\nNOT GIVEN : teks tidak memberikan informasi tersebut"],
            ["ex", [["Teks: The survey involved 500 teachers from rural schools.", "Pernyataan: The survey included urban teachers. → FALSE"], ["Teks: The project started in 2019.", "Pernyataan: The project was funded by the government. → NOT GIVEN"]]],
            ["tip", "Jangan memakai pengetahuan umum. Jawab hanya berdasarkan teks, walaupun Anda tahu fakta sebenarnya."]
          ] }
        ],
        Q: [
          { q: "Membaca cepat untuk menangkap gagasan utama disebut...", o: ["Scanning", "Skimming", "Summarising"], a: 1, e: "Skimming = gagasan utama; scanning = informasi spesifik." },
          { q: "Mencari tanggal atau angka tertentu dalam teks disebut...", o: ["Skimming", "Scanning", "Paraphrasing"], a: 1, e: "Scanning untuk informasi spesifik." },
          { q: "Teks: 'Sales rose by 20% in 2024.' Pernyataan: 'Sales fell in 2024.'", o: ["TRUE", "FALSE", "NOT GIVEN"], a: 1, e: "Teks menyatakan kebalikannya." },
          { q: "Teks: 'The library opened in 1990.' Pernyataan: 'The library is the largest in the city.'", o: ["TRUE", "FALSE", "NOT GIVEN"], a: 2, e: "Teks tidak menyebut ukuran perpustakaan." },
          { q: "Mengapa kata di soal sering berbeda dengan kata di teks?", o: ["Kesalahan cetak", "Soal memakai sinonim/parafrase", "Agar soal lebih pendek"], a: 1, e: "IELTS menguji pemahaman, bukan pencocokan kata." }
        ]
      },
      {
        t: "Strategi Listening", d: "Memprediksi jawaban dan menghindari jebakan.",
        L: [
          { t: "Prediksi sebelum audio diputar", min: 5, b: [
            ["p", "Gunakan waktu jeda untuk membaca soal dan **memprediksi jenis jawaban**: angka, nama, tanggal, kata benda, atau kata sifat. Perhatikan juga batas kata, misalnya 'NO MORE THAN TWO WORDS'."],
            ["ex", [["The meeting will be held on ______.", "Prediksi: hari atau tanggal"], ["Total cost: £ ______", "Prediksi: angka"], ["The speaker recommends bringing a ______.", "Prediksi: kata benda (benda)"]]],
            ["tip", "Ejaan yang salah dianggap jawaban salah. Biasakan menulis nama bulan, hari, dan angka dengan tepat."]
          ] },
          { t: "Jebakan: koreksi dan distraktor", min: 5, b: [
            ["p", "Pembicara sering menyebut satu informasi lalu **mengoreksinya**. Jawaban yang benar adalah informasi terakhir."],
            ["ex", [["The tour starts at nine... oh sorry, it's actually half past nine.", "Jawaban: 9.30"], ["We considered the hall, but in the end we chose the library.", "Jawaban: library"], ["My number is 0812... no wait, 0813 456 789.", "Jawaban: 0813 456 789"]]],
            ["tip", "Waspadai kata **actually, sorry, in the end, no wait, changed** — tanda informasi akan dikoreksi."]
          ] }
        ],
        Q: [
          { q: "Soal: 'Fee: $____'. Jawaban yang diprediksi berupa...", o: ["Nama orang", "Angka", "Kata kerja"], a: 1, e: "Ada simbol mata uang → angka." },
          { q: "'It's on Tuesday... sorry, Thursday.' Jawabannya:", o: ["Tuesday", "Thursday", "Keduanya"], a: 1, e: "Informasi yang dikoreksi adalah yang terakhir." },
          { q: "'NO MORE THAN TWO WORDS' berarti...", o: ["Tepat dua kata", "Maksimal dua kata", "Minimal dua kata"], a: 1, e: "Satu atau dua kata; tiga kata dianggap salah." },
          { q: "Kata yang menandai koreksi informasi:", o: ["actually", "and", "because"], a: 0, e: "'actually' sering mendahului koreksi." },
          { q: "Jawaban dengan ejaan salah di Listening...", o: ["Tetap benar", "Dianggap salah", "Dapat setengah nilai"], a: 1, e: "Ejaan harus tepat." }
        ]
      },
      {
        t: "Writing Task 2", d: "Struktur esai opini dan diskusi.",
        L: [
          { t: "Struktur esai empat paragraf", min: 7, b: [
            ["rule", "Introduction : parafrase topik + posisi/thesis (2–3 kalimat)\nBody 1       : gagasan utama 1 + penjelasan + contoh\nBody 2       : gagasan utama 2 + penjelasan + contoh\nConclusion   : tegaskan kembali posisi (tanpa gagasan baru)"],
            ["ex", [["It is often argued that university education should be free for all students.", "Parafrase topik"], ["While this policy has some drawbacks, I believe its benefits outweigh them.", "Thesis yang jelas"], ["One major advantage is that it widens access to higher education.", "Topic sentence body 1"], ["In conclusion, free tuition would create a fairer and more skilled society.", "Penutup"]]],
            ["tip", "Jangan menyalin kalimat soal ke pendahuluan. Parafrasekan dengan sinonim dan struktur berbeda."]
          ] },
          { t: "Latihan menulis esai", min: 15, b: [
            ["p", "Tulis esai pendek untuk soal berikut. Fokus pada struktur: pendahuluan dengan thesis, dua paragraf isi, dan kesimpulan."],
            ["write", "Some people believe that online learning is as effective as classroom learning. To what extent do you agree or disagree?", 250],
            ["tip", "Setelah dicek otomatis, salin esai Anda ke Claude dan minta perkiraan band beserta perbaikannya per kriteria."]
          ] }
        ],
        Q: [
          { q: "Bagian pendahuluan esai Task 2 sebaiknya berisi...", o: ["Contoh dan data", "Parafrase topik dan thesis", "Ringkasan kesimpulan"], a: 1, e: "Pendahuluan memperkenalkan topik dan posisi Anda." },
          { q: "Kesimpulan esai sebaiknya...", o: ["Menambah gagasan baru", "Menegaskan kembali posisi", "Mengulang soal persis"], a: 1, e: "Tidak ada gagasan baru di kesimpulan." },
          { q: "Kalimat thesis yang jelas:", o: ["This essay will talk about online learning.", "I believe online learning is effective only when combined with face-to-face classes.", "Online learning is a topic."], a: 1, e: "Menyatakan posisi yang spesifik." },
          { q: "Menyalin kalimat soal ke esai akan...", o: ["Menaikkan nilai", "Tidak dihitung sebagai kata Anda", "Wajib dilakukan"], a: 1, e: "Kata yang disalin dari soal tidak dihitung; parafrasekan." },
          { q: "Setiap paragraf isi idealnya memuat...", o: ["Satu gagasan utama dengan penjelasan dan contoh", "Tiga gagasan sekaligus", "Hanya contoh"], a: 0, e: "Satu paragraf, satu gagasan yang dikembangkan." }
        ]
      },
      {
        t: "Speaking Part 2", d: "Cue card dan kelancaran berbicara.",
        L: [
          { t: "Menjawab cue card", min: 6, b: [
            ["p", "Di Part 2 Anda menerima kartu topik, punya **1 menit** untuk menyiapkan catatan, lalu berbicara **1–2 menit**. Gunakan semua poin di kartu sebagai kerangka."],
            ["rule", "Describe a teacher who influenced you. You should say:\n• who this person was\n• what subject they taught\n• what they did that was special\nand explain why they influenced you."],
            ["say", ["I'd like to talk about my high school biology teacher.", "What made her special was the way she connected lessons to real life.", "Looking back, I think she was the reason I chose to study science.", "That's why she had such a strong influence on me."]],
            ["tip", "Jika kehabisan ide, tambahkan perasaan, perbandingan, atau contoh kejadian. Jangan berhenti sebelum penguji meminta."]
          ] },
          { t: "Frasa kelancaran", min: 4, b: [
            ["p", "Frasa berikut memberi Anda waktu berpikir tanpa terdengar macet."],
            ["say", ["That's an interesting question. Let me think.", "To be honest, I've never really thought about it before.", "What I mean is that it depends on the situation.", "Another thing worth mentioning is the cost."]],
            ["tip", "Hindari jeda panjang dan 'eee'. Lebih baik memakai frasa pengisi yang alami."]
          ] }
        ],
        Q: [
          { q: "Waktu persiapan di Speaking Part 2:", o: ["30 detik", "1 menit", "3 menit"], a: 1, e: "1 menit untuk membuat catatan." },
          { q: "Lama berbicara di Part 2:", o: ["30 detik", "1–2 menit", "5 menit"], a: 1, e: "Penguji menghentikan Anda setelah sekitar 2 menit." },
          { q: "Jika kehabisan ide, sebaiknya...", o: ["Berhenti dan diam", "Menambah contoh atau perasaan", "Mengulang kalimat yang sama"], a: 1, e: "Kembangkan dengan contoh, perbandingan, perasaan." },
          { q: "Frasa untuk memberi waktu berpikir:", o: ["Let me think.", "I don't know.", "Next question."], a: 0, e: "Alami dan menjaga kelancaran." },
          { q: "Kriteria Speaking yang TIDAK ada di Writing:", o: ["Lexical Resource", "Pronunciation", "Grammatical Range"], a: 1, e: "Pronunciation hanya dinilai di Speaking." }
        ]
      }
    ]
  },
  {
    id: "qa-audit", t: "English for Quality Assurance & Internal Audit", sub: "Istilah penjaminan mutu, rapat audit, wawancara auditee, dan menulis temuan dalam bahasa Inggris.",
    level: "B1–B2", cat: "Profesional", hours: 6, color: "#14324f", ic: "📋",
    learn: ["Menguasai istilah penjaminan mutu dan audit internal", "Memimpin opening dan closing meeting audit", "Mengajukan pertanyaan audit yang meminta bukti objektif", "Menulis pernyataan temuan dan rekomendasi yang jelas"],
    skills: ["Audit internal", "Penjaminan mutu", "Report writing", "Wawancara"],
    M: [
      {
        t: "Istilah Kunci Penjaminan Mutu", d: "Kosakata standar, kepatuhan, dan perbaikan.",
        L: [
          { t: "Istilah dasar", min: 6, b: [
            ["ex", [["quality assurance (QA)", "penjaminan mutu"], ["internal audit", "audit internal"], ["standard / requirement", "standar / persyaratan"], ["auditee", "pihak yang diaudit"], ["objective evidence", "bukti objektif"], ["compliance / conformity", "kesesuaian / kepatuhan"], ["document review", "telaah dokumen"], ["audit criteria", "kriteria audit"]]],
            ["tip", "'Audit' bisa menjadi kata kerja: **We audited the faculty** atau **The faculty was audited**."]
          ] },
          { t: "Temuan dan tindak lanjut", min: 6, b: [
            ["ex", [["finding", "temuan"], ["nonconformity (major / minor)", "ketidaksesuaian (mayor / minor)"], ["observation", "observasi"], ["opportunity for improvement (OFI)", "peluang peningkatan"], ["root cause analysis", "analisis akar masalah"], ["corrective action", "tindakan perbaikan"], ["preventive action", "tindakan pencegahan"], ["follow-up audit", "audit tindak lanjut"]]],
            ["p", "Dalam konteks SPMI, **PTPP (Permintaan Tindakan Perbaikan dan Pencegahan)** dapat dipadankan dengan **corrective and preventive action request (CAPA request)**."],
            ["tip", "Bentuk jamak 'nonconformity' adalah **nonconformities**. Jangan menulis 'nonconformitys'."]
          ] }
        ],
        Q: [
          { q: "'Bukti objektif' dalam bahasa Inggris:", o: ["objective evidence", "objective prove", "real evident"], a: 0, e: "evidence (kata benda tak terhitung)." },
          { q: "'Tindakan perbaikan' adalah...", o: ["corrective action", "correction act", "repair action"], a: 0, e: "Istilah baku: corrective action." },
          { q: "Pihak yang diaudit disebut...", o: ["auditor", "auditee", "audience"], a: 1, e: "auditee = yang diaudit; auditor = yang mengaudit." },
          { q: "'Peluang peningkatan' disingkat...", o: ["OFI", "NCR", "KPI"], a: 0, e: "Opportunity for Improvement." },
          { q: "Bentuk jamak 'nonconformity':", o: ["nonconformitys", "nonconformities", "nonconformity"], a: 1, e: "y → ies." }
        ]
      },
      {
        t: "Opening & Closing Meeting", d: "Membuka dan menutup audit dengan profesional.",
        L: [
          { t: "Opening meeting", min: 5, b: [
            ["p", "Opening meeting menyampaikan **tujuan, ruang lingkup, kriteria, jadwal**, dan memastikan auditee siap."],
            ["say", ["Good morning, and thank you for welcoming the audit team.", "The objective of this audit is to evaluate compliance with the internal quality standards.", "The scope covers teaching, research, and community service.", "We will review documents, interview staff, and observe facilities.", "We will present our findings at the closing meeting this afternoon."]]
          ] },
          { t: "Closing meeting", min: 5, b: [
            ["p", "Closing meeting menyampaikan **ringkasan temuan**, memberi kesempatan klarifikasi, dan menyepakati **tenggat tindak lanjut**."],
            ["say", ["Thank you for your cooperation throughout the audit.", "Overall, the faculty has implemented most of the standards well.", "We identified two minor nonconformities and three opportunities for improvement.", "Do you have any questions or clarifications regarding these findings?", "Please submit the corrective action plan within two weeks."]],
            ["tip", "Awali dengan hal positif sebelum menyampaikan temuan. Ini menjaga suasana tetap kooperatif."]
          ] }
        ],
        Q: [
          { q: "Yang disampaikan di opening meeting:", o: ["Tujuan dan ruang lingkup audit", "Daftar temuan", "Tenggat tindakan perbaikan"], a: 0, e: "Temuan disampaikan di closing meeting." },
          { q: "'The scope covers teaching and research' berarti...", o: ["Ruang lingkup mencakup pengajaran dan penelitian", "Tujuan audit adalah pengajaran", "Auditor mengajar"], a: 0, e: "scope = ruang lingkup." },
          { q: "Membuka closing meeting dengan baik:", o: ["You have many problems.", "Thank you for your cooperation throughout the audit.", "Let's start with the mistakes."], a: 1, e: "Apresiasi terlebih dahulu." },
          { q: "Meminta rencana tindakan perbaikan:", o: ["Please submit the corrective action plan within two weeks.", "Fix it.", "You must correct everything now."], a: 0, e: "Jelas, sopan, dengan tenggat." },
          { q: "Memberi kesempatan klarifikasi:", o: ["No questions please.", "Do you have any questions or clarifications?", "We are finished."], a: 1, e: "Auditee berhak mengklarifikasi temuan." }
        ]
      },
      {
        t: "Wawancara Audit", d: "Pertanyaan terbuka dan meminta bukti.",
        L: [
          { t: "Pertanyaan terbuka", min: 5, b: [
            ["p", "Pertanyaan terbuka (how, what, who, when) menggali proses. Hindari pertanyaan yang hanya dijawab 'yes/no'."],
            ["say", ["Could you walk me through the process for reviewing the curriculum?", "How do you monitor student learning outcomes?", "Who is responsible for updating the course syllabus?", "What happens when a lecturer does not submit grades on time?"]],
            ["tip", "“Do you have a procedure?” → kurang efektif. **“How is this procedure implemented in practice?”** → menggali bukti."]
          ] },
          { t: "Meminta bukti", min: 5, b: [
            ["say", ["Could you show me the evidence for that?", "May I see the minutes of the last curriculum meeting?", "Do you have records from the previous semester?", "Could you provide a sample of the completed forms?", "Thank you. I'll note that down."]],
            ["tip", "Temuan harus didukung bukti. Selalu catat dokumen, tanggal, dan nama yang Anda periksa."]
          ] }
        ],
        Q: [
          { q: "Pertanyaan terbuka yang baik:", o: ["Do you have a procedure?", "How is the procedure implemented?", "Is it OK?"], a: 1, e: "Menggali proses, bukan sekadar ya/tidak." },
          { q: "Meminta notulen rapat:", o: ["May I see the minutes of the last meeting?", "Give me the minute.", "Where notes?"], a: 0, e: "minutes = notulen (selalu jamak)." },
          { q: "'Could you walk me through...' berarti...", o: ["Mengajak berjalan", "Meminta penjelasan langkah demi langkah", "Meminta dokumen"], a: 1, e: "Ungkapan meminta penjelasan proses." },
          { q: "Temuan audit harus didasarkan pada...", o: ["Opini auditor", "Bukti objektif", "Kabar dari pihak lain"], a: 1, e: "Objective evidence." },
          { q: "'Do you have records from the previous semester?' meminta...", o: ["Rekaman suara", "Catatan/rekaman data semester lalu", "Rencana semester depan"], a: 1, e: "records = catatan/arsip." }
        ]
      },
      {
        t: "Menulis Temuan Audit", d: "Struktur pernyataan ketidaksesuaian.",
        L: [
          { t: "Struktur pernyataan temuan", min: 7, b: [
            ["p", "Pernyataan temuan yang kuat memuat tiga unsur: **persyaratan** (apa yang seharusnya), **bukti** (apa yang ditemukan), dan **pernyataan ketidaksesuaian**."],
            ["rule", "Requirement : Standard X requires that ...\nEvidence    : However, during the audit it was found that ...\nStatement   : Therefore, the faculty has not fully implemented ..."],
            ["ex", [["The Academic Standard requires that all course syllabi be reviewed annually.", "Persyaratan"], ["However, 6 of the 20 syllabi sampled had not been reviewed since 2023.", "Bukti (spesifik, terukur)"], ["Therefore, the study programme has not fully complied with the syllabus review requirement.", "Pernyataan ketidaksesuaian"]]],
            ["tip", "Tulis bukti secara **netral dan spesifik**. Hindari kata menghakimi seperti 'careless' atau 'lazy'."]
          ] },
          { t: "Latihan menulis temuan", min: 10, b: [
            ["p", "Situasi: Standar mewajibkan setiap dosen mengunggah nilai paling lambat dua minggu setelah ujian. Dari 30 mata kuliah yang diperiksa, nilai 8 mata kuliah diunggah lebih dari sebulan setelah ujian. Tulis pernyataan temuan lengkap (persyaratan, bukti, pernyataan)."],
            ["write", "Write an audit finding statement (requirement, evidence, nonconformity) for the late grade submission case above.", 40]
          ] }
        ],
        Q: [
          { q: "Tiga unsur pernyataan temuan:", o: ["Persyaratan, bukti, pernyataan ketidaksesuaian", "Nama, jabatan, tanda tangan", "Judul, isi, penutup"], a: 0, e: "Requirement, evidence, statement." },
          { q: "Bukti yang ditulis dengan baik:", o: ["Many syllabi were bad.", "6 of the 20 syllabi sampled had not been reviewed since 2023.", "The staff were lazy."], a: 1, e: "Spesifik, terukur, netral." },
          { q: "'The standard requires that all syllabi ___ reviewed annually.'", o: ["be", "are being", "is"], a: 0, e: "Setelah 'requires that' dipakai subjunctive: be + V3." },
          { q: "Kata yang sebaiknya DIHINDARI dalam temuan:", o: ["sampled", "careless", "found"], a: 1, e: "Kata menghakimi tidak profesional." },
          { q: "Kalimat pernyataan ketidaksesuaian:", o: ["Therefore, the unit has not fully implemented the standard.", "Please fix this quickly.", "We think it is OK."], a: 0, e: "Menyimpulkan ketidaksesuaian terhadap standar." }
        ]
      },
      {
        t: "Laporan & Rekomendasi", d: "Ringkasan eksekutif dan rekomendasi perbaikan.",
        L: [
          { t: "Ringkasan eksekutif", min: 6, b: [
            ["p", "Ringkasan eksekutif ditulis untuk pimpinan: singkat, faktual, dan dimulai dari gambaran umum."],
            ["ex", [["The internal audit was conducted on 14–15 October 2026 at five faculties.", "Audit internal dilaksanakan pada 14–15 Oktober 2026 di lima fakultas."], ["Overall, the implementation of the quality standards was satisfactory.", "Secara umum, pelaksanaan standar mutu memuaskan."], ["A total of 12 findings were identified, comprising 3 minor nonconformities and 9 opportunities for improvement.", "Total 12 temuan, terdiri atas 3 ketidaksesuaian minor dan 9 peluang peningkatan."], ["The most common issue related to the documentation of learning evaluation.", "Masalah paling umum berkaitan dengan dokumentasi evaluasi pembelajaran."]]]
          ] },
          { t: "Menulis rekomendasi", min: 6, b: [
            ["p", "Rekomendasi memakai bahasa yang **konstruktif** dan **dapat ditindaklanjuti**: siapa, apa, kapan."],
            ["ex", [["It is recommended that the faculty establish a schedule for annual syllabus review.", "Disarankan agar fakultas menetapkan jadwal telaah RPS tahunan."], ["The study programme should consider using a digital system to monitor grade submission.", "Program studi sebaiknya mempertimbangkan sistem digital untuk memantau pengunggahan nilai."], ["The quality assurance unit is advised to conduct a follow-up audit within three months.", "Unit penjaminan mutu disarankan melakukan audit tindak lanjut dalam tiga bulan."]]],
            ["write", "Write two recommendations for the faculty based on the late grade submission finding.", 40]
          ] }
        ],
        Q: [
          { q: "Ringkasan eksekutif ditujukan terutama untuk...", o: ["Mahasiswa", "Pimpinan", "Auditor lain"], a: 1, e: "Pimpinan butuh gambaran singkat untuk mengambil keputusan." },
          { q: "'It is recommended that the faculty ___ a schedule.'", o: ["establish", "establishes", "will establish"], a: 0, e: "Subjunctive: recommended that + subjek + V1." },
          { q: "'comprising' dalam kalimat ringkasan berarti...", o: ["terdiri atas", "dibandingkan", "selain"], a: 0, e: "comprising = terdiri atas." },
          { q: "Rekomendasi yang baik bersifat...", o: ["Umum dan samar", "Konstruktif dan dapat ditindaklanjuti", "Menyalahkan"], a: 1, e: "Jelas siapa, apa, kapan." },
          { q: "'A follow-up audit' adalah...", o: ["Audit tindak lanjut", "Audit pertama", "Audit eksternal"], a: 0, e: "Memeriksa pelaksanaan tindakan perbaikan." }
        ]
      }
    ]
  },
  {
    id: "adv-grammar", t: "Grammar Lanjutan (Upper-Intermediate & Advanced)", sub: "Relative clause, reported speech, modal deduksi, dan inversi untuk tulisan dan presentasi yang matang.",
    level: "B2–C1", cat: "Grammar", hours: 5, color: "#0b6b62", ic: "🧠",
    learn: ["Menggabungkan kalimat dengan relative clause yang tepat", "Melaporkan ucapan dan pertanyaan orang lain dengan benar", "Menyatakan dugaan dengan modal must, might, can't", "Memakai inversi dan cleft sentence untuk penekanan"],
    skills: ["Relative clause", "Reported speech", "Modal", "Inversi"],
    M: [
      {
        t: "Relative Clause", d: "who, which, that, whose, where.",
        L: [
          { t: "Defining relative clause", min: 6, b: [
            ["p", "Relative clause memberi keterangan pada kata benda. Pada **defining clause**, informasinya penting untuk mengenali kata bendanya, dan **tidak memakai koma**."],
            ["rule", "who / that → orang\nwhich / that → benda\nwhose → kepemilikan\nwhere → tempat\nwhen → waktu"],
            ["ex", [["The lecturer who teaches statistics is on leave.", "Dosen yang mengajar statistik sedang cuti."], ["This is the report that we submitted last week.", "Ini laporan yang kami kirim minggu lalu."], ["She is the student whose paper won the award.", "Dia mahasiswa yang makalahnya memenangkan penghargaan."]]]
          ] },
          { t: "Non-defining relative clause", min: 5, b: [
            ["p", "**Non-defining clause** menambah informasi tambahan, ditulis **di antara koma**, dan **tidak boleh memakai that**."],
            ["ex", [["Bogor, which is known as the Rain City, has a large botanical garden.", "Bogor, yang dikenal sebagai Kota Hujan, punya kebun raya besar."], ["Dr. Rahman, who supervised my thesis, has retired.", "Dr. Rahman, yang membimbing tesis saya, sudah pensiun."]]],
            ["tip", "“Bogor, that is known as...” → **Bogor, which is known as...**"]
          ] }
        ],
        Q: [
          { q: "The researcher ___ data was lost had to repeat the survey.", o: ["who", "whose", "which"], a: 1, e: "Kepemilikan → whose." },
          { q: "Jakarta, ___ is the capital, is very crowded.", o: ["that", "which", "where"], a: 1, e: "Non-defining → which, bukan that." },
          { q: "This is the room ___ the seminar will be held.", o: ["which", "where", "who"], a: 1, e: "Tempat → where." },
          { q: "Non-defining relative clause ditulis...", o: ["Tanpa koma", "Di antara koma", "Dengan tanda kurung saja"], a: 1, e: "Diapit koma." },
          { q: "The students ___ passed the exam received certificates.", o: ["which", "who", "whose"], a: 1, e: "Orang → who (atau that)." }
        ]
      },
      {
        t: "Reported Speech", d: "Melaporkan pernyataan dan pertanyaan.",
        L: [
          { t: "Melaporkan pernyataan", min: 6, b: [
            ["p", "Saat melaporkan ucapan dengan kata kerja lampau (said, told), tense biasanya **mundur satu langkah** (backshift)."],
            ["rule", "present → past\npresent perfect / past → past perfect\nwill → would\ncan → could\ntoday → that day, tomorrow → the next day"],
            ["ex", [["“I am busy.” → She said (that) she was busy.", "Dia bilang dia sedang sibuk."], ["“We will finish it tomorrow.” → They said they would finish it the next day.", "Mereka bilang akan menyelesaikannya keesokan harinya."]]],
            ["tip", "**say** tidak diikuti orang; **tell** wajib diikuti orang: She told **me** that... / She said that..."]
          ] },
          { t: "Melaporkan pertanyaan dan perintah", min: 5, b: [
            ["p", "Pertanyaan yang dilaporkan memakai **susunan kalimat berita** (subjek sebelum kata kerja) tanpa tanda tanya."],
            ["ex", [["“Where do you work?” → He asked me where I worked.", "Dia bertanya di mana saya bekerja."], ["“Have you finished?” → She asked if I had finished.", "Dia bertanya apakah saya sudah selesai."], ["“Please send the file.” → He asked me to send the file.", "Dia meminta saya mengirim berkasnya."]]],
            ["tip", "“He asked me where did I work” → **He asked me where I worked**."]
          ] }
        ],
        Q: [
          { q: "“I like coffee.” → She said that she ___ coffee.", o: ["likes", "liked", "will like"], a: 1, e: "Backshift: present → past." },
          { q: "“I will call you.” → He said he ___ call me.", o: ["will", "would", "can"], a: 1, e: "will → would." },
          { q: "Pilih yang benar:", o: ["She said me the news.", "She told me the news.", "She told the news me."], a: 1, e: "tell + orang." },
          { q: "“Where is the office?” → He asked where ___.", o: ["is the office", "the office was", "was the office"], a: 1, e: "Susunan kalimat berita + backshift." },
          { q: "“Close the door, please.” → She asked me ___ the door.", o: ["close", "to close", "closing"], a: 1, e: "ask + orang + to V1." }
        ]
      },
      {
        t: "Modal untuk Dugaan", d: "must, might, can't (+ have V3).",
        L: [
          { t: "Dugaan tentang masa kini", min: 5, b: [
            ["rule", "must    → hampir pasti benar (±95%)\nmay / might / could → mungkin (±50%)\ncan't   → hampir pasti tidak benar"],
            ["ex", [["The lights are off. They must be out.", "Lampunya mati. Mereka pasti sedang keluar."], ["She might be in a meeting.", "Dia mungkin sedang rapat."], ["He can't be the new dean. He's only 25.", "Tidak mungkin dia dekan baru. Umurnya baru 25."]]],
            ["tip", "Lawan dari 'must be' untuk dugaan adalah **can't be**, bukan 'mustn't be'."]
          ] },
          { t: "Dugaan tentang masa lalu", min: 5, b: [
            ["rule", "must have + V3 / might have + V3 / can't have + V3"],
            ["ex", [["The road is wet. It must have rained.", "Jalannya basah. Pasti tadi hujan."], ["I can't find my keys. I might have left them in the office.", "Kunci saya hilang. Mungkin tertinggal di kantor."], ["She can't have written this. It's not her style.", "Tidak mungkin dia yang menulis ini."]]]
          ] }
        ],
        Q: [
          { q: "He has three cars and a big house. He ___ be rich.", o: ["must", "can't", "might not"], a: 0, e: "Bukti kuat → must." },
          { q: "She's in Paris now, so she ___ be at the office.", o: ["must", "can't", "may"], a: 1, e: "Hampir pasti tidak mungkin → can't." },
          { q: "The ground is wet. It ___ rained last night.", o: ["must have", "must", "can't have"], a: 0, e: "Dugaan masa lalu → must have + V3." },
          { q: "I'm not sure where he is. He ___ be in the library.", o: ["must", "might", "can't"], a: 1, e: "Kemungkinan → might." },
          { q: "Lawan 'must be' untuk dugaan adalah...", o: ["mustn't be", "can't be", "shouldn't be"], a: 1, e: "can't be." }
        ]
      },
      {
        t: "Inversi & Cleft Sentence", d: "Struktur penekanan untuk gaya formal.",
        L: [
          { t: "Inversi setelah ungkapan negatif", min: 6, b: [
            ["p", "Dalam gaya formal, ungkapan negatif di awal kalimat diikuti **susunan seperti pertanyaan** (auxiliary + subjek)."],
            ["ex", [["Never have I seen such a well-organised conference.", "Belum pernah saya melihat konferensi serapi ini."], ["Not only did the team finish early, but they also reduced costs.", "Tim tidak hanya selesai lebih cepat, tetapi juga menekan biaya."], ["Under no circumstances should passwords be shared.", "Dalam keadaan apa pun kata sandi tidak boleh dibagikan."], ["Only after the review did we notice the error.", "Baru setelah telaah kami menyadari kesalahannya."]]]
          ] },
          { t: "Cleft sentence", min: 5, b: [
            ["p", "Cleft sentence menonjolkan satu bagian kalimat. Sangat berguna dalam presentasi dan diskusi."],
            ["rule", "It is/was + bagian yang ditekankan + that/who ...\nWhat + klausa + is/was + bagian yang ditekankan"],
            ["ex", [["It was the funding that delayed the project.", "Justru pendanaanlah yang menunda proyek."], ["What we need is a clear timeline.", "Yang kita perlukan adalah jadwal yang jelas."]]],
            ["say", ["What I'd like to highlight is the response rate.", "It was the students who suggested this idea."]]
          ] }
        ],
        Q: [
          { q: "Never ___ such a difficult exam.", o: ["I have taken", "have I taken", "I took"], a: 1, e: "Never di awal → inversi." },
          { q: "Not only ___ late, but he also forgot the slides.", o: ["he arrived", "did he arrive", "arrived he"], a: 1, e: "Not only → did + subjek + V1." },
          { q: "___ we need is more time.", o: ["That", "What", "Which"], a: 1, e: "Cleft: What + klausa + is." },
          { q: "It was the director ___ approved the budget.", o: ["who", "what", "where"], a: 0, e: "Cleft untuk orang → who/that." },
          { q: "Under no circumstances ___ open this file.", o: ["you should", "should you", "you"], a: 1, e: "Ungkapan negatif → inversi." }
        ]
      }
    ]
  },
  {
    id: "acad-vocab", t: "Kosakata Akademik Inti", sub: "Kata-kata yang paling sering muncul di jurnal, laporan, dan tes akademik, lengkap dengan kolokasinya.",
    level: "B1–C1", cat: "Akademik", hours: 4, color: "#8a5a12", ic: "📗",
    learn: ["Memahami kata akademik berfrekuensi tinggi dan artinya", "Memakai kolokasi yang lazim (conduct research, play a role)", "Membedakan kata yang sering tertukar oleh penutur Indonesia", "Menulis kalimat akademik yang lebih presisi"],
    skills: ["Academic vocabulary", "Collocation", "Word choice", "Precision"],
    M: [
      {
        t: "Kata Kerja Penelitian", d: "analyse, investigate, indicate, dan kawan-kawan.",
        L: [
          { t: "Kata kerja inti", min: 6, b: [
            ["ex", [["analyse — The data were analysed using SPSS.", "menganalisis"], ["investigate — This study investigates the role of mentoring.", "menyelidiki"], ["indicate — The results indicate a positive trend.", "menunjukkan"], ["identify — We identified three main themes.", "mengidentifikasi"], ["assess — The tool assesses students' readiness.", "menilai"], ["establish — The study established a link between X and Y.", "menetapkan/membuktikan"], ["derive — The model was derived from previous studies.", "diturunkan dari"], ["interpret — The findings should be interpreted with caution.", "menafsirkan"]]],
            ["tip", "Ejaan British **analyse**, American **analyze**. Pilih satu dan gunakan secara konsisten dalam satu naskah."]
          ] },
          { t: "Kolokasi penelitian", min: 5, b: [
            ["p", "Kolokasi adalah pasangan kata yang lazim. Kesalahan kolokasi membuat tulisan terdengar tidak alami walau grammarnya benar."],
            ["ex", [["conduct research / a study / a survey", "(bukan: do a research)"], ["collect / gather data", "mengumpulkan data"], ["draw a conclusion", "menarik kesimpulan"], ["play a role in", "berperan dalam"], ["raise awareness", "meningkatkan kesadaran"], ["pose a challenge", "menimbulkan tantangan"]]],
            ["tip", "'Research' adalah kata benda tak terhitung: **a study** atau **research**, bukan 'a research' atau 'researches'."]
          ] }
        ],
        Q: [
          { q: "Kolokasi yang benar:", o: ["make a research", "conduct research", "do researches"], a: 1, e: "conduct research." },
          { q: "'menarik kesimpulan' =", o: ["pull a conclusion", "draw a conclusion", "take a conclusion"], a: 1, e: "draw a conclusion." },
          { q: "The results ___ that training improves performance.", o: ["indicate", "indicates", "indicating"], a: 0, e: "The results (jamak) indicate." },
          { q: "Teachers play an important ___ in student motivation.", o: ["part of", "role", "function on"], a: 1, e: "play a role in." },
          { q: "Kalimat yang benar tentang research:", o: ["We conducted a research.", "We conducted a study.", "We conducted researches."], a: 1, e: "research tidak terhitung; pakai a study." }
        ]
      },
      {
        t: "Kata Benda & Kata Sifat Akademik", d: "Menyatakan konsep dengan presisi.",
        L: [
          { t: "Kata benda kunci", min: 5, b: [
            ["ex", [["approach", "pendekatan"], ["framework", "kerangka kerja"], ["significance", "signifikansi/arti penting"], ["implication", "implikasi"], ["limitation", "keterbatasan"], ["variable", "variabel"], ["trend", "tren/kecenderungan"], ["criterion (jamak: criteria)", "kriteria"], ["phenomenon (jamak: phenomena)", "fenomena"], ["datum (jamak: data)", "data"]]],
            ["tip", "Dalam tulisan formal, 'data' sering diperlakukan jamak: **The data were...** (gaya lebih tradisional) atau **The data was...** (lebih umum di bidang tertentu). Ikuti gaya jurnal tujuan."]
          ] },
          { t: "Kata sifat presisi", min: 5, b: [
            ["p", "Ganti kata sifat umum dengan kata yang lebih presisi."],
            ["ex", [["big → substantial, considerable, major", "besar"], ["good → effective, robust, appropriate", "baik"], ["important → crucial, essential, significant", "penting"], ["clear → evident, apparent, explicit", "jelas"], ["many → numerous, a wide range of", "banyak"]]],
            ["tip", "Hati-hati dengan **significant**: dalam statistik berarti signifikan secara statistik. Jangan memakainya untuk 'penting' jika tidak ada uji statistik."]
          ] }
        ],
        Q: [
          { q: "Bentuk jamak 'criterion':", o: ["criterions", "criteria", "criterias"], a: 1, e: "criterion → criteria." },
          { q: "Pengganti presisi untuk 'big increase':", o: ["substantial increase", "very big increase", "large-large increase"], a: 0, e: "substantial = besar/berarti." },
          { q: "'Keterbatasan' penelitian =", o: ["limitation", "limit", "boundary"], a: 0, e: "limitations of the study." },
          { q: "Kata 'significant' dalam statistik berarti...", o: ["Penting", "Signifikan secara statistik", "Besar"], a: 1, e: "Hati-hati memakai di luar konteks statistik." },
          { q: "Bentuk jamak 'phenomenon':", o: ["phenomenons", "phenomena", "phenomenas"], a: 1, e: "phenomenon → phenomena." }
        ]
      },
      {
        t: "Kata yang Sering Tertukar", d: "Kesalahan pilihan kata khas penutur Indonesia.",
        L: [
          { t: "Pasangan yang membingungkan", min: 6, b: [
            ["ex", [["affect (kata kerja) / effect (kata benda)", "Stress affects sleep. / Stress has an effect on sleep."], ["economic / economical", "ekonomi (bidang) / hemat"], ["historic / historical", "bersejarah (penting) / berkaitan dengan sejarah"], ["rise (tanpa objek) / raise (dengan objek)", "Prices rose. / We raised the price."], ["lay / lie", "lay the book down / lie on the bed"], ["principle / principal", "prinsip / kepala sekolah atau utama"]]],
            ["tip", "Trik: **A**ffect = **A**ction (kata kerja), **E**ffect = **E**nd result (kata benda)."]
          ] },
          { t: "False friends Indonesia–Inggris", min: 5, b: [
            ["p", "Kata yang mirip bahasa Indonesia tetapi berbeda arti atau pemakaian."],
            ["ex", [["actual = sebenarnya (bukan 'aktual/terkini' → current, up-to-date)", "The actual cost was higher."], ["sympathetic = penuh simpati (bukan 'simpatik/menyenangkan' → likeable)", "He is very likeable."], ["blanket = selimut (bukan 'blangko' → blank form)", "Please fill in the blank form."], ["provision = ketentuan/penyediaan (bukan 'provisi/komisi bank')", "The provisions of the regulation."], ["opportunity (bukan 'oportunis')", "a great opportunity"]]],
            ["tip", "“Please give me the actual information” jika maksudnya 'informasi terkini' → **the latest information**."]
          ] }
        ],
        Q: [
          { q: "Climate change ___ agriculture.", o: ["affects", "effects", "effect"], a: 0, e: "Kata kerja → affects." },
          { q: "The new policy had a positive ___ on enrolment.", o: ["affect", "effect", "affection"], a: 1, e: "Kata benda → effect." },
          { q: "'Informasi terkini' sebaiknya ditulis...", o: ["actual information", "the latest information", "actually information"], a: 1, e: "'actual' berarti sebenarnya." },
          { q: "The university ___ tuition fees last year.", o: ["rose", "raised", "risen"], a: 1, e: "Ada objek (fees) → raised." },
          { q: "Mobil yang hemat bahan bakar adalah...", o: ["an economic car", "an economical car", "an economics car"], a: 1, e: "economical = hemat." }
        ]
      }
    ]
  }
]);
