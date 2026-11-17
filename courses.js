// Katalog kursus Kawan English — gaya Coursera: Kursus → Modul → Pelajaran + Kuis → Ujian Akhir → Sertifikat
// Blok pelajaran: ["p", teks] paragraf (**tebal**), ["rule", rumus], ["ex", [[en, id], ...]] contoh berasuara,
// ["tip", teks] kesalahan umum, ["say", [kalimat, ...]] latihan ucap dengan mikrofon
window.COURSES = [
  {
    id: "grammar", t: "Fondasi Grammar Bahasa Inggris", sub: "Kuasai tenses dan struktur kalimat paling penting, dijelaskan dalam bahasa Indonesia.",
    level: "A1–B1", cat: "Grammar", hours: 6, color: "#0f8a7e", ic: "🧱",
    learn: ["Memakai present, past, perfect, dan future tense dengan tepat", "Membuat kalimat negatif dan pertanyaan tanpa ragu", "Menulis kalimat pasif dan kalimat pengandaian (conditional)", "Menghindari kesalahan grammar khas penutur Indonesia"],
    skills: ["Tenses", "Kalimat pasif", "Conditional", "Struktur kalimat"],
    M: [
      {
        t: "Present Tenses", d: "Kebiasaan, fakta, dan kegiatan yang sedang berlangsung.",
        L: [
          { t: "Simple Present: kebiasaan & fakta", min: 6, b: [
            ["p", "Simple present dipakai untuk **kebiasaan**, **rutinitas**, dan **fakta umum**. Ciri khasnya: kata kerja mendapat **-s/-es** bila subjeknya he, she, atau it."],
            ["rule", "I / You / We / They + V1\nHe / She / It + V1 + s/es"],
            ["ex", [["I work at a university.", "Saya bekerja di universitas."], ["She teaches English on Mondays.", "Dia mengajar bahasa Inggris setiap Senin."], ["Water boils at 100 degrees Celsius.", "Air mendidih pada suhu 100 derajat Celsius."]]],
            ["p", "Kalimat negatif dan pertanyaan memakai **do/does**. Setelah does, kata kerja kembali ke bentuk dasar (tanpa -s)."],
            ["ex", [["She doesn't drink coffee.", "Dia tidak minum kopi."], ["Does he live in Bogor?", "Apakah dia tinggal di Bogor?"]]],
            ["tip", "“She don't like coffee” → **She doesn't like coffee**. “He go to campus” → **He goes to campus**."]
          ] },
          { t: "Present Continuous: sedang terjadi", min: 5, b: [
            ["p", "Present continuous dipakai untuk kegiatan yang **sedang berlangsung** saat ini, situasi sementara, atau **rencana yang sudah diatur** dalam waktu dekat."],
            ["rule", "am / is / are + V-ing"],
            ["ex", [["I am writing a report now.", "Saya sedang menulis laporan sekarang."], ["They are having a meeting.", "Mereka sedang rapat."], ["We are flying to Makassar tomorrow.", "Kami terbang ke Makassar besok."]]],
            ["tip", "Kata kerja keadaan (know, like, want, need, believe, understand) biasanya **tidak** memakai -ing. “I am knowing the answer” → **I know the answer**."]
          ] }
        ],
        Q: [
          { q: "My father ___ in a bank.", o: ["works", "work", "working"], a: 0, e: "Subjek tunggal (my father = he) → works." },
          { q: "Listen! The baby ___.", o: ["cries", "is crying", "cry"], a: 1, e: "'Listen!' menandakan sedang terjadi → present continuous." },
          { q: "___ she speak Japanese?", o: ["Do", "Does", "Is"], a: 1, e: "Pertanyaan untuk she → Does + V1." },
          { q: "I ___ the answer now.", o: ["know", "am knowing", "knowing"], a: 0, e: "'know' adalah kata kerja keadaan, tidak memakai -ing." },
          { q: "They ___ dinner at the moment.", o: ["have", "are having", "has"], a: 1, e: "'at the moment' → sedang berlangsung. 'have' berarti makan di sini, jadi boleh -ing." }
        ]
      },
      {
        t: "Past Tenses", d: "Menceritakan kejadian di masa lalu.",
        L: [
          { t: "Simple Past", min: 6, b: [
            ["p", "Simple past dipakai untuk kejadian yang **sudah selesai** pada waktu tertentu di masa lalu, misalnya yesterday, last week, in 2019."],
            ["rule", "Subjek + V2 (regular: -ed; irregular: go → went, see → saw, write → wrote)\nNegatif/tanya: did + V1"],
            ["ex", [["I visited my grandmother yesterday.", "Saya mengunjungi nenek kemarin."], ["We went to Bandung last month.", "Kami pergi ke Bandung bulan lalu."], ["Did you send the email?", "Apakah kamu sudah mengirim emailnya?"]]],
            ["tip", "Setelah did, kata kerja kembali ke bentuk dasar. “I didn't went” → **I didn't go**."]
          ] },
          { t: "Past Continuous", min: 5, b: [
            ["p", "Past continuous menggambarkan kegiatan yang **sedang berlangsung** di masa lalu, sering terpotong oleh kejadian lain. Biasanya muncul bersama **when** atau **while**."],
            ["rule", "was / were + V-ing"],
            ["ex", [["I was reading when the lights went out.", "Saya sedang membaca ketika lampu padam."], ["While we were waiting, it started to rain.", "Saat kami sedang menunggu, hujan mulai turun."]]],
            ["tip", "Kejadian panjang → past continuous; kejadian singkat yang memotong → simple past."]
          ] }
        ],
        Q: [
          { q: "She ___ to Bandung last month.", o: ["went", "goes", "has gone"], a: 0, e: "'last month' = waktu lampau tertentu → simple past." },
          { q: "Did you ___ the email?", o: ["send", "sent", "sending"], a: 0, e: "Setelah did → V1." },
          { q: "I ___ TV when he called.", o: ["watched", "was watching", "am watching"], a: 1, e: "Kegiatan yang sedang berlangsung lalu terpotong → past continuous." },
          { q: "We ___ at home yesterday.", o: ["were", "was", "are"], a: 0, e: "We → were." },
          { q: "While they ___, the phone rang.", o: ["were sleeping", "slept", "sleep"], a: 0, e: "While + kegiatan yang sedang berlangsung → past continuous." }
        ]
      },
      {
        t: "Present Perfect", d: "Pengalaman, hasil, dan durasi sampai sekarang.",
        L: [
          { t: "Pengalaman dan hasil", min: 6, b: [
            ["p", "Present perfect menghubungkan masa lalu dengan **sekarang**: pengalaman hidup, hasil yang masih terasa, atau kejadian yang baru saja terjadi. Kata yang sering menyertai: **ever, never, already, yet, just**."],
            ["rule", "have / has + V3"],
            ["ex", [["I have visited Malaysia twice.", "Saya sudah dua kali ke Malaysia."], ["She has just finished her thesis.", "Dia baru saja menyelesaikan tesisnya."], ["Have you ever been to Japan?", "Pernahkah kamu ke Jepang?"]]],
            ["tip", "Jangan pakai present perfect dengan waktu lampau spesifik. “I have finished it yesterday” → **I finished it yesterday**."]
          ] },
          { t: "Since vs for, dan perfect continuous", min: 5, b: [
            ["p", "**Since** + titik waktu (since 2015, since Monday). **For** + lama waktu (for ten years, for two hours). Untuk menekankan kegiatan yang terus berlangsung, gunakan present perfect continuous."],
            ["rule", "have / has + been + V-ing"],
            ["ex", [["I have worked here since 2015.", "Saya bekerja di sini sejak 2015."], ["We have been waiting for two hours.", "Kami sudah menunggu selama dua jam."]]],
            ["tip", "“I live here since 2010” → **I have lived here since 2010**."]
          ] }
        ],
        Q: [
          { q: "I ___ this film three times.", o: ["have seen", "saw", "see"], a: 0, e: "Pengalaman tanpa waktu spesifik → present perfect." },
          { q: "She has lived here ___ 2010.", o: ["for", "since", "from"], a: 1, e: "2010 = titik waktu → since." },
          { q: "Have you finished ___?", o: ["already", "yet", "just"], a: 1, e: "Di akhir pertanyaan/negatif → yet." },
          { q: "They ___ the project last week.", o: ["have completed", "completed", "complete"], a: 1, e: "'last week' = waktu spesifik → simple past." },
          { q: "I have been studying English ___ five years.", o: ["since", "for", "during"], a: 1, e: "five years = lama waktu → for." }
        ]
      },
      {
        t: "Masa Depan", d: "will, be going to, dan present untuk rencana.",
        L: [
          { t: "will vs be going to", min: 5, b: [
            ["p", "**will** untuk keputusan spontan, janji, tawaran, dan prediksi umum. **be going to** untuk rencana yang sudah diputuskan dan prediksi berdasarkan bukti yang terlihat."],
            ["rule", "will + V1\nam / is / are + going to + V1"],
            ["ex", [["I'll help you with the bags.", "Saya bantu bawa tasnya."], ["We're going to launch the app next month.", "Kami akan meluncurkan aplikasinya bulan depan."], ["Look at those clouds. It's going to rain.", "Lihat awan itu. Sebentar lagi hujan."]]]
          ] },
          { t: "Present untuk masa depan", min: 4, b: [
            ["p", "Jadwal resmi memakai **simple present**, janji temu pribadi memakai **present continuous**. Setelah **when, if, before, after, as soon as**, gunakan present, bukan will."],
            ["ex", [["The train leaves at seven.", "Keretanya berangkat pukul tujuh."], ["I'm meeting the dean tomorrow.", "Saya bertemu dekan besok."], ["I'll call you when I arrive.", "Saya akan meneleponmu ketika sampai."]]],
            ["tip", "“When I will arrive, I will call you” → **When I arrive, I will call you**."]
          ] }
        ],
        Q: [
          { q: "The phone is ringing. I ___ answer it.", o: ["'ll", "am going to", "going to"], a: 0, e: "Keputusan spontan → will." },
          { q: "We have bought the tickets. We ___ travel to Bali.", o: ["will", "are going to", "going"], a: 1, e: "Rencana yang sudah diputuskan → be going to." },
          { q: "The seminar ___ at 9 a.m. tomorrow (sesuai jadwal).", o: ["starts", "will starting", "is start"], a: 0, e: "Jadwal resmi → simple present." },
          { q: "I'll call you when I ___.", o: ["will arrive", "arrive", "arrived"], a: 1, e: "Setelah when → present." },
          { q: "Look at the sky! It ___ rain.", o: ["will", "is going to", "goes to"], a: 1, e: "Ada bukti yang terlihat → be going to." }
        ]
      },
      {
        t: "Pasif & Conditional", d: "Struktur penting untuk tulisan formal dan pengandaian.",
        L: [
          { t: "Kalimat pasif", min: 6, b: [
            ["p", "Kalimat pasif menonjolkan **tindakan atau hasil**, bukan pelakunya. Sangat umum di laporan dan tulisan ilmiah, terutama di bagian metode."],
            ["rule", "be (sesuai tense) + V3"],
            ["ex", [["The data were collected in 2025.", "Data dikumpulkan pada tahun 2025."], ["The survey was conducted online.", "Survei dilakukan secara daring."], ["New regulations will be introduced next year.", "Peraturan baru akan diberlakukan tahun depan."]]],
            ["tip", "Jangan lupa to be: “The report written by the team” → **The report was written by the team**."]
          ] },
          { t: "Conditional tipe 0–3", min: 7, b: [
            ["p", "Conditional menyatakan syarat dan akibat. Pilih tipenya berdasarkan seberapa nyata situasinya."],
            ["rule", "Tipe 0 (fakta): If + present, present\nTipe 1 (mungkin): If + present, will + V1\nTipe 2 (khayalan sekarang): If + past, would + V1\nTipe 3 (khayalan masa lalu): If + had V3, would have + V3"],
            ["ex", [["If you heat ice, it melts.", "Jika es dipanaskan, es mencair."], ["If it rains, we will stay at home.", "Kalau hujan, kami di rumah saja."], ["If I were you, I would accept the offer.", "Kalau saya jadi kamu, saya akan menerima tawarannya."], ["If she had studied, she would have passed.", "Seandainya dia belajar, dia pasti lulus."]]],
            ["tip", "Dalam tipe 2, gunakan **were** untuk semua subjek: If I were, If he were."]
          ] }
        ],
        Q: [
          { q: "The questionnaire ___ to 200 students.", o: ["was distributed", "distributed", "is distributing"], a: 0, e: "Kuesioner tidak membagikan dirinya → pasif." },
          { q: "If you heat ice, it ___.", o: ["melts", "will melted", "melted"], a: 0, e: "Fakta ilmiah → conditional tipe 0." },
          { q: "If I ___ rich, I would travel the world.", o: ["am", "were", "will be"], a: 1, e: "Tipe 2 → were." },
          { q: "If she had studied, she ___ the exam.", o: ["would pass", "would have passed", "will pass"], a: 1, e: "Tipe 3 → would have + V3." },
          { q: "The results ___ next week.", o: ["will announce", "will be announced", "announced"], a: 1, e: "Hasil diumumkan (oleh orang lain) → pasif future." }
        ]
      }
    ]
  },
  {
    id: "academic", t: "Bahasa Inggris Akademik untuk Dosen & Peneliti", sub: "Menulis abstrak, presentasi di konferensi, dan berkorespondensi dengan editor jurnal.",
    level: "B1–C1", cat: "Akademik", hours: 7, color: "#6b4fc8", ic: "🎓",
    learn: ["Menyusun abstrak dengan struktur dan frasa yang lazim di jurnal internasional", "Menyampaikan klaim secara hati-hati (hedging) dan formal", "Membuka, memandu, dan menutup presentasi konferensi serta sesi tanya jawab", "Menulis cover letter dan response to reviewers"],
    skills: ["Academic writing", "Hedging", "Presentasi ilmiah", "Korespondensi jurnal"],
    M: [
      {
        t: "Menulis Abstrak yang Kuat", d: "Struktur 5 langkah dan frasa kunci.",
        L: [
          { t: "Struktur abstrak", min: 7, b: [
            ["p", "Abstrak yang baik biasanya memuat lima langkah: **latar belakang**, **celah penelitian/tujuan**, **metode**, **hasil**, dan **implikasi**."],
            ["rule", "Latar belakang & implikasi → present tense\nMetode & hasil → past tense\nTujuan → 'This study aims to...' / 'This paper examines...'"],
            ["ex", [["This study aims to examine students' readiness for blended learning.", "Penelitian ini bertujuan menguji kesiapan mahasiswa terhadap blended learning."], ["Data were collected from 120 respondents through an online survey.", "Data dikumpulkan dari 120 responden melalui survei daring."], ["The results indicate that digital literacy significantly affects learning outcomes.", "Hasil menunjukkan bahwa literasi digital berpengaruh signifikan terhadap capaian belajar."], ["These findings suggest that universities should strengthen digital training.", "Temuan ini mengisyaratkan bahwa universitas perlu memperkuat pelatihan digital."]]]
          ] },
          { t: "Frasa kunci dan kesalahan umum", min: 5, b: [
            ["p", "Untuk menunjukkan **celah penelitian**, gunakan frasa seperti di bawah ini. Frasa ini memberi alasan mengapa penelitian Anda penting."],
            ["ex", [["However, little is known about...", "Namun, masih sedikit yang diketahui tentang..."], ["Few studies have investigated...", "Hanya sedikit penelitian yang menyelidiki..."], ["To address this gap, this study...", "Untuk mengisi celah ini, penelitian ini..."]]],
            ["tip", "“In this paper, we will discuss about...” → **This paper discusses...** (discuss tanpa 'about'; hindari 'will' untuk isi makalah sendiri)."]
          ] }
        ],
        Q: [
          { q: "Tense yang lazim untuk bagian metode dalam abstrak adalah...", o: ["Simple past", "Present continuous", "Future"], a: 0, e: "Metode menceritakan apa yang telah dilakukan → past tense." },
          { q: "The results ___ that the intervention was effective.", o: ["indicate", "are indicate", "indicating"], a: 0, e: "Subjek jamak + kata kerja: The results indicate." },
          { q: "Kalimat 'However, little is known about...' berfungsi sebagai...", o: ["Hasil penelitian", "Celah penelitian", "Metode"], a: 1, e: "Frasa ini menunjukkan bagian yang belum diteliti." },
          { q: "Pilih kalimat yang paling tepat:", o: ["This paper will discuss about AI policy.", "This paper discusses AI policy.", "This paper discussing AI policy."], a: 1, e: "discuss tanpa 'about'; present tense untuk isi makalah." },
          { q: "Bagian implikasi biasanya memakai...", o: ["These findings suggest that...", "Data were collected...", "This study aimed to..."], a: 0, e: "Implikasi disampaikan dengan present tense dan kata hedging seperti suggest." }
        ]
      },
      {
        t: "Hedging & Gaya Formal", d: "Menyampaikan klaim dengan hati-hati dan profesional.",
        L: [
          { t: "Hedging: klaim yang terukur", min: 6, b: [
            ["p", "Penulis akademik jarang mengklaim sesuatu secara mutlak. **Hedging** membuat klaim lebih akurat dan sulit dibantah reviewer. Kata yang sering dipakai: **may, might, suggest, appear to, tend to, likely, it is possible that**."],
            ["ex", [["These results suggest that the policy is effective.", "Hasil ini mengisyaratkan bahwa kebijakan tersebut efektif."], ["Students appear to prefer hybrid classes.", "Mahasiswa tampaknya lebih menyukai kelas hybrid."], ["This may be due to limited internet access.", "Hal ini mungkin disebabkan oleh akses internet yang terbatas."]]],
            ["tip", "“This proves that...” terlalu kuat untuk satu penelitian → **This suggests that...** atau **This provides evidence that...**"]
          ] },
          { t: "Kosakata formal", min: 5, b: [
            ["p", "Tulisan akademik menghindari kontraksi dan kata-kata santai. Bandingkan pasangan berikut."],
            ["ex", [["We do not know...  (bukan: We don't know)", "Kami tidak tahu..."], ["A large number of respondents agreed.  (bukan: a lot of)", "Sebagian besar responden setuju."], ["The researchers obtained the data.  (bukan: got)", "Para peneliti memperoleh data."], ["There was a substantial increase.  (bukan: big)", "Terjadi peningkatan yang substansial."], ["It can be argued that...  (bukan: I think)", "Dapat dikatakan bahwa..."]]],
            ["tip", "Hindari kata seperti **very, really, thing, stuff, nowadays** dalam artikel jurnal."]
          ] }
        ],
        Q: [
          { q: "Mana yang merupakan hedging yang tepat?", o: ["This proves the theory.", "This suggests that the theory is valid.", "This is definitely true."], a: 1, e: "'suggests' menyampaikan klaim secara hati-hati." },
          { q: "Pengganti formal untuk 'a lot of' adalah...", o: ["a large number of", "lots of", "plenty"], a: 0, e: "'a large number of' (benda terhitung) atau 'a considerable amount of'." },
          { q: "Pengganti formal untuk 'got the data' adalah...", o: ["took the data", "obtained the data", "grabbed the data"], a: 1, e: "'obtain' lebih formal daripada 'get'." },
          { q: "The low response rate ___ be explained by the timing of the survey.", o: ["must", "may", "will"], a: 1, e: "'may' menyampaikan kemungkinan, bukan kepastian." },
          { q: "Kalimat yang paling akademik:", o: ["I think the method is not good.", "It can be argued that the method has limitations.", "The method is really bad."], a: 1, e: "Impersonal, hedging, dan pilihan kata formal." }
        ]
      },
      {
        t: "Kohesi & Paragraf", d: "Paragraf yang runtut dan mudah diikuti.",
        L: [
          { t: "Anatomi paragraf akademik", min: 5, b: [
            ["p", "Satu paragraf = satu gagasan utama. Susunannya: **topic sentence** (gagasan utama), **supporting sentences** (bukti, data, contoh), dan **concluding/transition sentence**."],
            ["ex", [["Digital literacy is a key factor in online learning success.", "Literasi digital adalah faktor kunci keberhasilan pembelajaran daring. (topic sentence)"], ["For example, students with stronger digital skills completed more online tasks.", "Misalnya, mahasiswa dengan keterampilan digital lebih baik menyelesaikan lebih banyak tugas daring. (pendukung)"], ["Therefore, digital training should be part of student orientation.", "Oleh karena itu, pelatihan digital perlu menjadi bagian orientasi mahasiswa. (penutup)"]]]
          ] },
          { t: "Kata penghubung akademik", min: 6, b: [
            ["rule", "Penambahan: moreover, furthermore, in addition\nKontras: however, nevertheless, whereas, in contrast\nSebab-akibat: therefore, consequently, as a result\nContoh: for example, for instance, such as"],
            ["ex", [["The sample was small. However, the results were consistent.", "Sampelnya kecil. Namun, hasilnya konsisten."], ["Group A improved, whereas Group B did not.", "Kelompok A meningkat, sedangkan kelompok B tidak."], ["Funding was limited. Consequently, the study was shortened.", "Dana terbatas. Akibatnya, penelitian dipersingkat."]]],
            ["tip", "Jangan menggabungkan dua penghubung kontras: “However, but...” → pilih salah satu. 'However' biasanya membuka kalimat baru dan diikuti koma."]
          ] }
        ],
        Q: [
          { q: "Kalimat yang memuat gagasan utama paragraf disebut...", o: ["Topic sentence", "Supporting sentence", "Citation"], a: 0, e: "Topic sentence menyatakan gagasan utama." },
          { q: "The cost was high. ___, the project was postponed.", o: ["Consequently", "Whereas", "For instance"], a: 0, e: "Hubungan sebab-akibat → consequently." },
          { q: "Urban students had better access, ___ rural students struggled.", o: ["therefore", "whereas", "moreover"], a: 1, e: "Membandingkan dua hal yang berlawanan → whereas." },
          { q: "Mana yang benar?", o: ["However, but the data were limited.", "However, the data were limited.", "But however the data were limited."], a: 1, e: "Gunakan satu penghubung kontras saja." },
          { q: "Untuk menambahkan argumen sejenis, gunakan...", o: ["Furthermore", "Nevertheless", "In contrast"], a: 0, e: "Furthermore = selain itu." }
        ]
      },
      {
        t: "Presentasi di Konferensi", d: "Membuka, memandu alur, dan sesi tanya jawab.",
        L: [
          { t: "Membuka dan memandu alur (signposting)", min: 6, b: [
            ["p", "**Signposting** adalah frasa penunjuk arah yang membantu audiens mengikuti presentasi Anda. Latih frasa berikut sampai lancar."],
            ["say", ["Good morning, everyone. Thank you for having me.", "Today I'd like to present our study on digital learning.", "My presentation is divided into three parts.", "Let's move on to the methodology.", "This brings me to my final point.", "To sum up, our findings show three key trends."]],
            ["tip", "Jangan membaca slide kata per kata. Ucapkan satu frasa signposting setiap kali berpindah bagian."]
          ] },
          { t: "Menghadapi sesi tanya jawab", min: 5, b: [
            ["p", "Sesi tanya jawab sering membuat gugup. Siapkan frasa untuk **membeli waktu**, **memastikan maksud pertanyaan**, dan **menjawab dengan jujur** bila di luar cakupan."],
            ["say", ["That's a very good question.", "Could you repeat the question, please?", "If I understand correctly, you're asking about the sample size.", "I'm afraid that's beyond the scope of this study.", "That's an interesting point. We plan to explore it in future research."]],
            ["tip", "Tidak apa-apa mengakui keterbatasan. Jawaban jujur yang singkat lebih dihargai daripada jawaban panjang yang mengambang."]
          ] }
        ],
        Q: [
          { q: "Frasa untuk berpindah ke bagian berikutnya:", o: ["Let's move on to the results.", "I finish now.", "Next is coming."], a: 0, e: "'Let's move on to...' adalah signposting standar." },
          { q: "Jika pertanyaan tidak terdengar jelas, katakan...", o: ["What?", "Could you repeat the question, please?", "Again!"], a: 1, e: "Sopan dan jelas." },
          { q: "Frasa untuk menutup presentasi:", o: ["To sum up, ...", "Firstly, ...", "For instance, ..."], a: 0, e: "'To sum up' = sebagai kesimpulan." },
          { q: "Jika pertanyaan di luar cakupan penelitian:", o: ["I don't know.", "I'm afraid that's beyond the scope of this study.", "That question is wrong."], a: 1, e: "Jujur dan profesional." },
          { q: "'My presentation is divided into three parts' berfungsi untuk...", o: ["Menutup presentasi", "Memberi gambaran struktur", "Menjawab pertanyaan"], a: 1, e: "Memberi peta presentasi di awal." }
        ]
      },
      {
        t: "Korespondensi dengan Editor & Reviewer", d: "Cover letter dan response to reviewers.",
        L: [
          { t: "Cover letter untuk editor", min: 6, b: [
            ["p", "Cover letter singkat, sopan, dan informatif: judul naskah, jenis artikel, alasan cocok dengan jurnal, dan pernyataan orisinalitas."],
            ["ex", [["Dear Editor,", "Yth. Editor,"], ["Please find attached our manuscript entitled “...” for consideration as a research article.", "Bersama ini kami lampirkan naskah berjudul “...” untuk dipertimbangkan sebagai artikel penelitian."], ["We believe this work fits the scope of your journal because...", "Kami yakin karya ini sesuai dengan cakupan jurnal Anda karena..."], ["We confirm that this manuscript has not been published or submitted elsewhere.", "Kami menyatakan bahwa naskah ini belum pernah diterbitkan atau dikirim ke tempat lain."], ["We look forward to hearing from you.", "Kami menantikan kabar dari Anda."], ["Yours sincerely,", "Hormat kami,"]]]
          ] },
          { t: "Response to reviewers", min: 6, b: [
            ["p", "Tanggapi setiap komentar: **ucapkan terima kasih**, **jelaskan perubahan**, dan **sebutkan lokasinya** di naskah. Bila tidak setuju, sampaikan alasan dengan sopan dan berbasis bukti."],
            ["ex", [["We thank the reviewer for this insightful comment.", "Kami berterima kasih kepada reviewer atas komentar yang tajam ini."], ["We have revised the manuscript accordingly (page 5, lines 10–15).", "Kami telah merevisi naskah sesuai saran (halaman 5, baris 10–15)."], ["We respectfully disagree, because previous studies have shown that...", "Dengan hormat kami berbeda pendapat, karena penelitian sebelumnya menunjukkan bahwa..."], ["As suggested, we have added a limitations section.", "Sesuai saran, kami telah menambahkan bagian keterbatasan."]]],
            ["tip", "Hindari nada defensif seperti “The reviewer misunderstood our paper”. Lebih baik: **We have clarified this point in the revised manuscript.**"]
          ] }
        ],
        Q: [
          { q: "Salam pembuka yang tepat untuk editor jurnal:", o: ["Hi Editor!", "Dear Editor,", "To whom it may concern my friend,"], a: 1, e: "Formal dan lazim." },
          { q: "Penutup formal yang tepat:", o: ["Yours sincerely,", "Cheers,", "See you,"], a: 0, e: "'Yours sincerely' untuk surat formal." },
          { q: "Respons terbaik untuk saran reviewer yang Anda terima:", o: ["OK, done.", "We have revised the manuscript accordingly (page 4, lines 3–8).", "We changed it."], a: 1, e: "Jelas dan menyebut lokasi perubahan." },
          { q: "Jika tidak setuju dengan reviewer:", o: ["The reviewer is wrong.", "We respectfully disagree, because...", "We ignore this comment."], a: 1, e: "Sopan dan disertai alasan." },
          { q: "Pernyataan orisinalitas dalam cover letter:", o: ["This manuscript has not been published or submitted elsewhere.", "This paper is very original and the best.", "We copied nothing."], a: 0, e: "Rumusan standar yang diminta banyak jurnal." }
        ]
      }
    ]
  },
  {
    id: "business", t: "English for Professional Communication", sub: "Email, rapat, telepon, dan negosiasi untuk dunia kerja.",
    level: "A2–B2", cat: "Profesional", hours: 5, color: "#d98a10", ic: "💼",
    learn: ["Menulis email profesional yang sopan dan efektif", "Memimpin dan berpartisipasi aktif dalam rapat berbahasa Inggris", "Bertelepon dan berbasa-basi (small talk) dengan percaya diri", "Mengajukan tawaran dan mencapai kesepakatan"],
    skills: ["Email", "Rapat", "Small talk", "Negosiasi"],
    M: [
      {
        t: "Email Profesional", d: "Struktur dan frasa sopan.",
        L: [
          { t: "Struktur email", min: 5, b: [
            ["p", "Email profesional terdiri dari: **subject** yang jelas, **salam**, **kalimat pembuka**, **isi** (satu tujuan per email), **penutup** dengan tindakan yang diharapkan, dan **salam penutup**."],
            ["ex", [["Subject: Meeting request – Quality audit schedule", "Perihal: Permohonan rapat – Jadwal audit mutu"], ["Dear Ms. Sari,", "Yth. Ibu Sari,"], ["I am writing to request a short meeting next week.", "Saya menulis untuk meminta rapat singkat minggu depan."], ["Please let me know which time suits you best.", "Mohon kabari waktu yang paling sesuai untuk Anda."], ["Best regards,", "Salam hormat,"]]],
            ["tip", "Hindari subject kosong atau hanya “Hello”. Subject yang jelas membuat email cepat dibalas."]
          ] },
          { t: "Frasa meminta, menindaklanjuti, dan meminta maaf", min: 5, b: [
            ["ex", [["Could you please send me the report by Friday?", "Bisakah Anda mengirimkan laporannya paling lambat Jumat?"], ["I would appreciate it if you could confirm the date.", "Saya akan sangat berterima kasih jika Anda dapat mengonfirmasi tanggalnya."], ["I'm writing to follow up on my previous email.", "Saya menulis untuk menindaklanjuti email saya sebelumnya."], ["I apologise for the delay in replying.", "Mohon maaf atas keterlambatan balasan saya."], ["Please find the document attached.", "Terlampir dokumennya."]]],
            ["tip", "“Please kindly...” terdengar berlebihan bagi penutur asli. Cukup **Could you please...** atau **Please...**"]
          ] }
        ],
        Q: [
          { q: "Kalimat pembuka yang tepat:", o: ["I am writing to ask about the training schedule.", "I write you because I want ask.", "Hello, I want."], a: 0, e: "'I am writing to...' adalah pembuka standar." },
          { q: "Permintaan yang paling sopan:", o: ["Send me the file.", "Could you please send me the file?", "You must send the file."], a: 1, e: "Could you please... sopan dan profesional." },
          { q: "Menindaklanjuti email yang belum dibalas:", o: ["Why no reply?", "I'm writing to follow up on my previous email.", "Answer me please."], a: 1, e: "Netral dan sopan." },
          { q: "Salam penutup yang umum:", o: ["Best regards,", "Bye bye,", "Love,"], a: 0, e: "Best regards cocok untuk hampir semua email kerja." },
          { q: "Subject email yang baik:", o: ["Hello", "(kosong)", "Request: Revised budget for Q1"], a: 2, e: "Spesifik dan langsung menunjukkan isi." }
        ]
      },
      {
        t: "Rapat (Meetings)", d: "Memimpin rapat dan menyampaikan pendapat.",
        L: [
          { t: "Memimpin rapat", min: 5, b: [
            ["say", ["Let's get started.", "The purpose of today's meeting is to review the audit results.", "Let's move on to the next item on the agenda.", "Could we hear from the finance team?", "To sum up, we have agreed on three action points."]],
            ["tip", "Rangkum keputusan dan penanggung jawab di akhir rapat: **Who will do what by when.**"]
          ] },
          { t: "Berpendapat dan tidak setuju dengan sopan", min: 5, b: [
            ["p", "Dalam budaya kerja internasional, ketidaksetujuan disampaikan dengan **lunak** tetapi **jelas**."],
            ["say", ["In my opinion, we should extend the deadline.", "I see your point, but I'm not sure it will work.", "Could I add something here?", "I'm afraid I have to disagree with that.", "What if we tried a different approach?"]]
          ] }
        ],
        Q: [
          { q: "Membuka rapat:", o: ["Let's get started.", "Start now everybody.", "We begin go."], a: 0, e: "Ungkapan alami untuk memulai." },
          { q: "Tidak setuju dengan sopan:", o: ["You're wrong.", "I see your point, but...", "No way."], a: 1, e: "Mengakui pendapat lain sebelum menyanggah." },
          { q: "Ingin menyela untuk menambahkan:", o: ["Stop, listen to me.", "Could I add something here?", "Wait wait."], a: 1, e: "Sopan dan efektif." },
          { q: "Berpindah agenda:", o: ["Let's move on to the next item.", "Finish this, go next.", "Other topic now."], a: 0, e: "Frasa standar pemimpin rapat." },
          { q: "'To sum up' digunakan untuk...", o: ["Membuka rapat", "Merangkum", "Menyela"], a: 1, e: "To sum up = sebagai rangkuman." }
        ]
      },
      {
        t: "Telepon & Small Talk", d: "Percakapan singkat yang membangun hubungan.",
        L: [
          { t: "Bertelepon", min: 4, b: [
            ["say", ["Hello, this is Andi from the Quality Assurance Office.", "Could I speak to Dr. Lee, please?", "I'm calling about the workshop next week.", "Could you ask her to call me back?", "Sorry, the line is bad. Could you speak up a little?"]],
            ["tip", "Di telepon, sebut diri dengan **This is ...**, bukan “I am ...”."]
          ] },
          { t: "Small talk", min: 4, b: [
            ["p", "Topik aman: perjalanan, cuaca, acara, makanan lokal. Hindari: gaji, agama, politik, usia."],
            ["say", ["How was your flight?", "Is this your first time in Indonesia?", "Have you tried any local food yet?", "How's the conference going so far?", "It was great talking to you."]]
          ] }
        ],
        Q: [
          { q: "Memperkenalkan diri di telepon:", o: ["I am Andi.", "This is Andi from the QA Office.", "Me Andi."], a: 1, e: "Di telepon gunakan 'This is ...'." },
          { q: "Meminta ditelepon balik:", o: ["Could you ask her to call me back?", "She must call me.", "Tell her phone me."], a: 0, e: "Sopan dan alami." },
          { q: "Topik small talk yang aman:", o: ["Gaji", "Perjalanan", "Politik"], a: 1, e: "Perjalanan adalah topik netral." },
          { q: "Menanyakan perjalanan tamu:", o: ["How was your flight?", "Your flight how?", "Flight good?"], a: 0, e: "Struktur pertanyaan yang benar." },
          { q: "Menutup percakapan dengan ramah:", o: ["It was great talking to you.", "Finish.", "OK go."], a: 0, e: "Penutup yang hangat." }
        ]
      },
      {
        t: "Negosiasi & Persuasi", d: "Mengajukan tawaran dan menutup kesepakatan.",
        L: [
          { t: "Mengajukan tawaran bersyarat", min: 5, b: [
            ["p", "Negosiasi sering memakai **conditional**: tawarkan sesuatu dengan syarat."],
            ["ex", [["If you could reduce the price by 10%, we would sign today.", "Jika Anda bisa menurunkan harga 10%, kami akan tanda tangan hari ini."], ["Would you consider a longer contract?", "Apakah Anda mau mempertimbangkan kontrak yang lebih panjang?"], ["How about splitting the cost?", "Bagaimana kalau biayanya dibagi?"], ["That might be difficult for us, but we could offer...", "Itu mungkin sulit bagi kami, tetapi kami bisa menawarkan..."]]]
          ] },
          { t: "Menutup kesepakatan", min: 4, b: [
            ["ex", [["So, we've agreed that the training will start in March.", "Jadi, kita sepakat pelatihannya dimulai bulan Maret."], ["Let me confirm the details in writing.", "Saya akan mengonfirmasi detailnya secara tertulis."], ["I think we have a deal.", "Saya rasa kita sepakat."]]],
            ["tip", "Selalu kirim email ringkasan setelah negosiasi lisan untuk menghindari salah paham."]
          ] }
        ],
        Q: [
          { q: "Tawaran bersyarat yang tepat:", o: ["If you could deliver earlier, we would pay in advance.", "If you deliver early, we pay before maybe.", "You deliver early we pay."], a: 0, e: "Conditional tipe 2 untuk tawaran yang sopan." },
          { q: "Mengusulkan alternatif:", o: ["How about splitting the cost?", "Split cost now.", "You pay all."], a: 0, e: "'How about + V-ing' untuk mengusulkan." },
          { q: "Menolak dengan halus:", o: ["No.", "That might be difficult for us, but...", "Impossible, forget it."], a: 1, e: "Menolak sambil membuka alternatif." },
          { q: "Menegaskan kesepakatan:", o: ["So, we've agreed that...", "OK whatever.", "Deal or no deal."], a: 0, e: "Merangkum kesepakatan." },
          { q: "Setelah negosiasi lisan sebaiknya...", o: ["Tidak perlu apa-apa", "Mengonfirmasi detail secara tertulis", "Menunggu pihak lain"], a: 1, e: "Konfirmasi tertulis mencegah salah paham." }
        ]
      }
    ]
  },
  {
    id: "pronunciation", t: "Pelafalan untuk Penutur Indonesia", sub: "Bunyi yang sering keliru, vokal, serta tekanan kata dan intonasi — dengan latihan mikrofon.",
    level: "A1–B2", cat: "Speaking", hours: 4, color: "#e2553f", ic: "🗣️",
    learn: ["Mengucapkan bunyi th, v, dan konsonan akhir dengan jelas", "Membedakan vokal panjang dan pendek (ship vs sheep)", "Menempatkan tekanan kata dan intonasi kalimat dengan benar", "Mendapat umpan balik pengucapan langsung lewat mikrofon"],
    skills: ["Pelafalan", "Intonasi", "Tekanan kata", "Kejelasan berbicara"],
    M: [
      {
        t: "Bunyi yang Sering Keliru", d: "th, v/f, dan konsonan akhir.",
        L: [
          { t: "Bunyi TH", min: 5, b: [
            ["p", "Bahasa Indonesia tidak punya bunyi **th**. Letakkan **ujung lidah di antara gigi atas dan bawah**, lalu hembuskan udara. 'think' tanpa suara; 'this' dengan getaran suara."],
            ["say", ["I think this is the third one.", "Thank you for these three things.", "They gathered together on Thursday."]],
            ["tip", "Jangan ganti th menjadi t atau d: 'tink' → **think**, 'dis' → **this**."]
          ] },
          { t: "V vs F dan konsonan akhir", min: 5, b: [
            ["p", "**V** bergetar (gigi atas menyentuh bibir bawah dengan suara), **F** tanpa suara. Konsonan di akhir kata juga harus terdengar: 'worked' berakhir bunyi **t**, 'played' bunyi **d**, 'wanted' bunyi **id**."],
            ["say", ["I have a very valuable vote.", "We worked hard and played well.", "She wanted to visit five villages."]],
            ["tip", "Jangan menelan konsonan akhir: 'las' → **last**, 'ask' bukan 'as'."]
          ] }
        ],
        Q: [
          { q: "Posisi lidah untuk bunyi 'th':", o: ["Di belakang gigi bawah", "Di antara gigi atas dan bawah", "Menyentuh langit-langit"], a: 1, e: "Ujung lidah sedikit keluar di antara gigi." },
          { q: "Akhiran -ed pada 'worked' berbunyi...", o: ["/t/", "/d/", "/id/"], a: 0, e: "Setelah bunyi tak bersuara (k) → /t/." },
          { q: "Akhiran -ed pada 'wanted' berbunyi...", o: ["/t/", "/d/", "/id/"], a: 2, e: "Setelah t atau d → /id/." },
          { q: "Perbedaan V dan F:", o: ["V bergetar, F tidak", "F bergetar, V tidak", "Tidak ada perbedaan"], a: 0, e: "V adalah versi bersuara dari F." },
          { q: "'this' diucapkan dengan...", o: ["th bersuara", "th tidak bersuara", "bunyi d"], a: 0, e: "this, that, they → th bersuara." }
        ]
      },
      {
        t: "Vokal Panjang & Pendek", d: "ship vs sheep, dan bunyi schwa.",
        L: [
          { t: "Pasangan vokal minimal", min: 5, b: [
            ["p", "Panjang-pendek vokal dapat **mengubah arti**. Dengarkan dan bandingkan."],
            ["ex", [["ship / sheep", "kapal / domba"], ["live / leave", "tinggal / pergi"], ["full / fool", "penuh / orang bodoh"], ["sit / seat", "duduk / kursi"]]],
            ["say", ["I live here, but I will leave soon.", "Please sit on this seat.", "The ship carried many sheep."]]
          ] },
          { t: "Schwa: bunyi paling umum", min: 4, b: [
            ["p", "**Schwa /ə/** adalah bunyi 'e' lemah seperti pada kata 'beras'. Muncul di suku kata yang tidak ditekan: **a**bout, ban**a**n**a**, **the**, **to**."],
            ["say", ["I want to go to the station.", "A banana and a cup of tea.", "Can you tell me about it?"]],
            ["tip", "Penutur Indonesia cenderung mengucapkan semua huruf dengan jelas. Melemahkan suku kata yang tidak ditekan justru membuat Anda terdengar lebih alami."]
          ] }
        ],
        Q: [
          { q: "Kata dengan vokal panjang:", o: ["ship", "sheep", "sit"], a: 1, e: "'ee' pada sheep panjang." },
          { q: "'live' (tinggal) vs 'leave' (pergi): bedanya pada...", o: ["Konsonan akhir", "Panjang vokal", "Tekanan kata"], a: 1, e: "live pendek, leave panjang." },
          { q: "Schwa muncul pada suku kata yang...", o: ["Ditekan", "Tidak ditekan", "Pertama saja"], a: 1, e: "Schwa adalah vokal lemah." },
          { q: "Huruf yang berbunyi schwa pada 'about':", o: ["a di awal", "ou", "t"], a: 0, e: "a-BOUT: suku pertama lemah." },
          { q: "Pasangan yang berbeda arti karena panjang vokal:", o: ["full / fool", "cat / cats", "go / goes"], a: 0, e: "full (penuh) vs fool (orang bodoh)." }
        ]
      },
      {
        t: "Tekanan Kata & Intonasi", d: "Ritme bahasa Inggris yang alami.",
        L: [
          { t: "Tekanan kata (word stress)", min: 5, b: [
            ["p", "Dalam bahasa Inggris, satu suku kata diucapkan **lebih keras dan panjang**. Posisi tekanan bisa berpindah dalam satu keluarga kata."],
            ["ex", [["PHOtograph – phoTOgraphy – photoGRAPHic", "foto – fotografi – fotografis"], ["a REcord (noun) – to reCORD (verb)", "rekaman – merekam"], ["deVElop – deVElopment", "mengembangkan – pengembangan"], ["uniVERsity", "universitas"]]],
            ["say", ["The university will develop a new programme.", "Please record the meeting and keep the record.", "She studies photography."]]
          ] },
          { t: "Intonasi kalimat", min: 4, b: [
            ["p", "Pertanyaan **yes/no** biasanya **naik** di akhir. Pertanyaan **wh-** (what, where, why) dan kalimat berita biasanya **turun**."],
            ["say", ["Are you ready?", "Where are you from?", "Could you help me, please?", "I'm from Indonesia."]],
            ["tip", "Intonasi datar terdengar tidak tertarik. Beri penekanan pada kata informasi penting dalam kalimat."]
          ] }
        ],
        Q: [
          { q: "Tekanan pada 'photography' ada di...", o: ["PHO", "TO", "GRA"], a: 1, e: "pho-TO-gra-phy." },
          { q: "'reCORD' (tekanan di belakang) adalah...", o: ["Kata benda", "Kata kerja", "Kata sifat"], a: 1, e: "Kata kerja dua suku sering ditekan di belakang." },
          { q: "Intonasi pertanyaan 'Are you ready?' biasanya...", o: ["Naik", "Turun", "Datar"], a: 0, e: "Yes/no question → naik." },
          { q: "Intonasi 'Where are you from?' biasanya...", o: ["Naik", "Turun", "Datar"], a: 1, e: "Wh-question → turun." },
          { q: "Tekanan pada 'university':", o: ["U", "VER", "SI"], a: 1, e: "u-ni-VER-si-ty." }
        ]
      }
    ]
  }
];
