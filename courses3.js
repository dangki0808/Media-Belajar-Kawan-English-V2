// Jalur Sekolah: SD (Fase A–C), SMP (Fase D), SMA (Fase E–F).
// Topik mengikuti CP/ATP dan buku teks di Drive; teks, contoh, dan soal ditulis orisinal.
// Blok baru: ["video", idDrive, judul] — diputar dari Google Drive pengguna.
window.COURSES = (window.COURSES || []).concat([
  {
    id: "sd-ab", path: "SD", t: "English for Kids: Kelas 1–4", sub: "Salam, angka, warna, keluarga, sekolah, dan hewan — dengan video dan suara.",
    level: "Fase A–B", cat: "SD", hours: 5, color: "#f59e0b", ic: "🧸",
    learn: ["Menyapa dan memperkenalkan diri", "Menyebut angka, warna, dan waktu", "Mengenal anggota keluarga dan benda di sekolah", "Menyebut nama hewan dan bentuk jamak"],
    skills: ["Kosakata dasar", "Menyimak", "Berbicara", "Fonik"],
    M: [
      { t: "Hello! Salam & Perkenalan", d: "Good morning, how are you, my name is...", L: [
        { t: "Mengucapkan salam", min: 5, b: [
          ["p", "Salam dipakai saat bertemu orang. Pilih sesuai waktunya: **morning** (pagi), **afternoon** (siang–sore), **evening** (malam)."],
          ["ex", [["Good morning!", "Selamat pagi!"], ["Good afternoon!", "Selamat siang/sore!"], ["How are you?", "Apa kabar?"], ["I'm fine, thank you. And you?", "Saya baik, terima kasih. Kamu?"], ["Goodbye! See you tomorrow.", "Sampai jumpa besok."]]],
          ["video", "1crizbmN0aXBlafXOS4O2n1wTwh4KiBBq", "The Tortoise and the Hare – Good morning"],
          ["say", ["Good morning, teacher!", "I'm fine, thank you."]]
        ] },
        { t: "Memperkenalkan diri", min: 5, b: [
          ["ex", [["Hello, my name is Dinda.", "Halo, nama saya Dinda."], ["I am eight years old.", "Saya berumur delapan tahun."], ["I live in Bogor.", "Saya tinggal di Bogor."], ["Nice to meet you!", "Senang berkenalan denganmu!"]]],
          ["video", "1JdHl-ZKzafl0hiLOJvK_jM5Ib5ZlEqGk", "The Wizard of Oz – Nice to meet you"],
          ["video", "1GpuLp_YQhgAtYGbup8CgmnCBi2Jgh9ME", "Peter Pan – How old are you?"],
          ["tip", "Menanyakan umur: **How old are you?** Jawab: **I am ... years old.**"]
        ] }
      ], Q: [
        { q: "Salam yang tepat pukul 7 pagi:", o: ["Good night", "Good morning", "Good evening"], a: 1, e: "Pagi hari → Good morning." },
        { q: "“How are you?” dijawab dengan...", o: ["I'm fine, thank you.", "My name is Budi.", "I am eight."], a: 0, e: "How are you = apa kabar." },
        { q: "“Nice to meet you” artinya...", o: ["Sampai jumpa", "Senang berkenalan", "Terima kasih"], a: 1, e: "Diucapkan saat pertama kali berkenalan." },
        { q: "Menanyakan umur:", o: ["How are you?", "How old are you?", "What is your name?"], a: 1, e: "How old = berapa umur." }
      ] },
      { t: "Numbers, Colors & Time", d: "Angka, warna, dan jam.", L: [
        { t: "Angka dan warna", min: 6, b: [
          ["ex", [["one, two, three, four, five", "1–5"], ["six, seven, eight, nine, ten", "6–10"], ["eleven, twelve, thirteen, twenty", "11, 12, 13, 20"], ["red, blue, yellow, green", "merah, biru, kuning, hijau"], ["black, white, orange, purple", "hitam, putih, oranye, ungu"]]],
          ["video", "1YogS2WdjQtS5plX69WxtT4U2cXNfVmNy", "How to count 1–100"],
          ["tip", "Bedakan **thirteen** (13, tekanan di belakang: thir-TEEN) dan **thirty** (30, tekanan di depan: THIR-ty)."]
        ] },
        { t: "Menyatakan waktu", min: 5, b: [
          ["rule", "It's seven o'clock.      → pukul 7.00\nIt's half past seven.    → pukul 7.30\nIt's a quarter past seven. → pukul 7.15"],
          ["ex", [["What time is it?", "Jam berapa sekarang?"], ["It's six o'clock.", "Pukul enam."], ["It's half past nine.", "Pukul setengah sepuluh (9.30)."]]],
          ["video", "1v9nsqPLUN8yXghFCYy3VZELbwg0CBHRS", "Menyatakan waktu (Telling Time)"],
          ["tip", "Half past seven = 7.30, bukan 'setengah tujuh'. Dalam bahasa Indonesia 7.30 disebut setengah delapan."]
        ] }
      ], Q: [
        { q: "Angka 15 dalam bahasa Inggris:", o: ["fifty", "fifteen", "five"], a: 1, e: "fifteen = 15; fifty = 50." },
        { q: "Warna daun adalah...", o: ["green", "red", "blue"], a: 0, e: "green = hijau." },
        { q: "“It's half past seven” berarti pukul...", o: ["6.30", "7.30", "7.15"], a: 1, e: "half past seven = 7 lewat 30." },
        { q: "Pertanyaan untuk menanyakan jam:", o: ["What time is it?", "How old is it?", "What color is it?"], a: 0, e: "What time = jam berapa." }
      ] },
      { t: "My Family & Me", d: "Anggota keluarga dan kata ganti.", L: [
        { t: "Anggota keluarga", min: 5, b: [
          ["ex", [["father / mother", "ayah / ibu"], ["brother / sister", "saudara laki-laki / perempuan"], ["grandfather / grandmother", "kakek / nenek"], ["This is my mother. Her name is Rina.", "Ini ibuku. Namanya Rina."], ["This is my brother. His name is Dodi.", "Ini kakak/adik laki-lakiku. Namanya Dodi."]]],
          ["video", "1lDZhgNPGODm2MwgNNmlr7Tfprrs3eFEl", "Introducing family from photographs"]
        ] },
        { t: "Kata ganti: I, you, he, she", min: 6, b: [
          ["rule", "I → my       you → your\nhe → his     she → her\nwe → our     they → their"],
          ["ex", [["She is my sister. Her bag is pink.", "Dia saudara perempuanku. Tasnya pink."], ["He is my friend. His name is Bima.", "Dia temanku. Namanya Bima."]]],
          ["video", "1gBnAZ0kwV0jKILFnZTHlqbfPHvPGaJkd", "Kata ganti orang (Personal Pronouns)"],
          ["video", "17W1V2AtEAh7UFOcTKtT0b4RZ31ciyRD9", "Kata ganti milik (Possessive Pronouns)"],
          ["tip", "Untuk perempuan pakai **she/her**, untuk laki-laki **he/his**."]
        ] }
      ], Q: [
        { q: "“Nenek” dalam bahasa Inggris:", o: ["grandmother", "grandfather", "sister"], a: 0, e: "grandmother = nenek." },
        { q: "This is my sister. ___ name is Ani.", o: ["His", "Her", "Their"], a: 1, e: "Perempuan → her." },
        { q: "This is my father. ___ is a teacher.", o: ["She", "He", "It"], a: 1, e: "Laki-laki → he." },
        { q: "Kata ganti milik untuk 'we':", o: ["our", "us", "their"], a: 0, e: "we → our." }
      ] },
      { t: "At School", d: "Benda di kelas, this/that, in/on/under.", L: [
        { t: "Benda di kelas: this, that, these, those", min: 6, b: [
          ["ex", [["This is a pencil.", "Ini pensil. (dekat)"], ["That is a whiteboard.", "Itu papan tulis. (jauh)"], ["These are my books.", "Ini buku-bukuku. (dekat, banyak)"], ["Those are chairs.", "Itu kursi-kursi. (jauh, banyak)"]]],
          ["video", "1bOpzP4maG_MKVhLUUBoKCm8wsH7GwUPf", "School objects, subjects and building"],
          ["video", "1xkzyOPG8lWugGw4g21lJGZN-FzjtlphL", "Demonstrative pronouns (this, that, these, those)"]
        ] },
        { t: "Di mana? in, on, under", min: 5, b: [
          ["ex", [["The book is on the table.", "Bukunya di atas meja."], ["The pen is in the bag.", "Pulpennya di dalam tas."], ["The cat is under the chair.", "Kucingnya di bawah kursi."], ["Where is my eraser?", "Di mana penghapusku?"]]],
          ["video", "1DcIelYo6O7DcdbQZ3O9gcBlPRvgWbYdZ", "Prepositions (in, on, under)"],
          ["say", ["The book is on the table.", "Where is my pencil?"]]
        ] }
      ], Q: [
        { q: "Benda dekat dan jumlahnya banyak:", o: ["this", "these", "that"], a: 1, e: "these = ini (jamak)." },
        { q: "The ball is ___ the box. (di dalam)", o: ["in", "on", "under"], a: 0, e: "in = di dalam." },
        { q: "The cat is ___ the table. (di bawah)", o: ["on", "under", "in"], a: 1, e: "under = di bawah." },
        { q: "“That is a door” artinya...", o: ["Ini pintu", "Itu pintu", "Pintu-pintu itu"], a: 1, e: "that = itu (jauh, satu)." }
      ] },
      { t: "Animals Around Us", d: "Nama hewan, jamak -s/-es, dan can.", L: [
        { t: "Nama hewan dan bentuk jamak", min: 6, b: [
          ["ex", [["a cat → two cats", "seekor kucing → dua kucing"], ["a box → three boxes", "kotak → kotak-kotak (+es)"], ["a fox → two foxes", "rubah (+es)"], ["a mouse → mice", "tikus (tidak beraturan)"], ["a sheep → sheep", "domba (tetap)"]]],
          ["rule", "Umumnya + s\nAkhiran s, x, ch, sh, o → + es\nKonsonan + y → ies (baby → babies)"],
          ["video", "1SYtbfaG7b6u99BieQu7hhrB-yyglFX6W", "Farm animals and wild animals"],
          ["video", "1rtdvO8R8E_Rt1nkTdL36r3MSVrCq8HxU", "Singular dan plural noun (-s dan -es)"]
        ] },
        { t: "Can dan can't", min: 5, b: [
          ["ex", [["A fish can swim.", "Ikan bisa berenang."], ["A bird can fly.", "Burung bisa terbang."], ["A cat can't fly.", "Kucing tidak bisa terbang."], ["Can you swim? Yes, I can.", "Kamu bisa berenang? Ya, bisa."]]],
          ["video", "1Isrjxl0dkbEAGo07S6U-nCQlE8sSz39h", "Animal Friends – Can you swim?"],
          ["say", ["A bird can fly.", "Can you swim?"]]
        ] }
      ], Q: [
        { q: "Bentuk jamak 'box':", o: ["boxs", "boxes", "boxies"], a: 1, e: "Akhiran x → + es." },
        { q: "Bentuk jamak 'baby':", o: ["babys", "babies", "babyes"], a: 1, e: "Konsonan + y → ies." },
        { q: "A fish can ___.", o: ["fly", "swim", "climb trees"], a: 1, e: "Ikan bisa berenang." },
        { q: "“Can you dance?” jawaban singkatnya:", o: ["Yes, I can.", "Yes, I do.", "Yes, I am."], a: 0, e: "Pertanyaan can → jawab dengan can." }
      ] }
    ]
  },
  {
    id: "sd-c", path: "SD", t: "Bahasa Inggris Kelas 5–6 (Fase C)", sub: "Kegiatan lampau, perasaan, rencana masa depan, dan cita-cita — sesuai alur tujuan pembelajaran Kelas 6.",
    level: "Fase C", cat: "SD", hours: 5, color: "#10b981", ic: "🎒",
    learn: ["Menceritakan kegiatan kemarin dengan simple past", "Memakai was/were untuk tempat dan perasaan", "Bertanya dengan what, who, where, when, why, how", "Menyatakan rencana dengan will dan bercerita tentang cita-cita"],
    skills: ["Simple past", "Future (will)", "Wh-questions", "Menulis cerita"],
    M: [
      { t: "I studied last night", d: "Kata kerja lampau beraturan dan tidak beraturan.", L: [
        { t: "Kata kerja bentuk lampau", min: 6, b: [
          ["p", "Untuk kegiatan yang **sudah terjadi**, kata kerja diubah ke bentuk lampau. Kata kerja beraturan cukup ditambah **-ed**; yang tidak beraturan harus dihafal."],
          ["ex", [["play → played, study → studied, watch → watched", "beraturan (+ed)"], ["go → went, eat → ate, see → saw", "tidak beraturan"], ["I studied last night.", "Saya belajar tadi malam."], ["We went to a museum last week.", "Kami pergi ke museum minggu lalu."]]],
          ["tip", "Kata keterangan waktu lampau: **yesterday, last night, last week, two days ago**."]
        ] },
        { t: "Kalimat negatif: didn't", min: 5, b: [
          ["ex", [["I studied, but my sister didn't.", "Saya belajar, tapi adikku tidak."], ["He didn't go to school yesterday.", "Dia tidak sekolah kemarin."], ["Did you watch TV last night? Yes, I did.", "Kamu nonton TV tadi malam? Ya."]]],
          ["tip", "Setelah **didn't** dan **did**, kata kerja kembali ke bentuk dasar: didn't **go** (bukan didn't went)."],
          ["say", ["I played football yesterday.", "Did you study last night?"]]
        ] }
      ], Q: [
        { q: "Bentuk lampau 'go':", o: ["goed", "went", "gone"], a: 1, e: "go → went." },
        { q: "Yesterday I ___ my grandmother.", o: ["visit", "visited", "visiting"], a: 1, e: "Kemarin → bentuk lampau." },
        { q: "She didn't ___ breakfast this morning.", o: ["ate", "eat", "eats"], a: 1, e: "didn't + bentuk dasar." },
        { q: "Kata yang menandakan waktu lampau:", o: ["tomorrow", "last week", "next year"], a: 1, e: "last week = minggu lalu." }
      ] },
      { t: "I was in Bali last week", d: "Was/were untuk tempat dan perasaan.", L: [
        { t: "Was dan were", min: 5, b: [
          ["rule", "I / he / she / it → was\nyou / we / they → were"],
          ["ex", [["I was in Bali last week.", "Saya di Bali minggu lalu."], ["They were at the zoo yesterday.", "Mereka di kebun binatang kemarin."], ["Were you at home last night? No, I wasn't.", "Kamu di rumah tadi malam? Tidak."]]]
        ] },
        { t: "Bagaimana perasaanmu kemarin?", min: 5, b: [
          ["ex", [["How did Cici feel yesterday?", "Bagaimana perasaan Cici kemarin?"], ["She was happy because she got a gift.", "Dia senang karena mendapat hadiah."], ["I was sad when my cat was sick.", "Saya sedih ketika kucingku sakit."], ["We were tired after the trip.", "Kami lelah setelah perjalanan."]]],
          ["video", "1UxBHlVF11b1DhdAMlvTc0NYevm8Lt-3d", "Share happy moments, express happy feelings"],
          ["say", ["I was happy yesterday.", "We were tired after the trip."]]
        ] }
      ], Q: [
        { q: "They ___ at the beach last Sunday.", o: ["was", "were", "are"], a: 1, e: "they → were." },
        { q: "She ___ sad yesterday.", o: ["was", "were", "is"], a: 0, e: "she → was; yesterday → lampau." },
        { q: "___ you at school yesterday?", o: ["Was", "Were", "Did"], a: 1, e: "you → were." },
        { q: "“I was tired” artinya...", o: ["Saya lelah (dulu)", "Saya akan lelah", "Saya sedang lelah"], a: 0, e: "was → lampau." }
      ] },
      { t: "What did you do yesterday?", d: "Bertanya dengan kata tanya di masa lampau.", L: [
        { t: "Enam kata tanya", min: 6, b: [
          ["rule", "What → apa     Who → siapa     Where → di mana\nWhen → kapan   Why → mengapa   How → bagaimana"],
          ["ex", [["What did you do yesterday? I read a book.", "Apa yang kamu lakukan kemarin?"], ["Where did you go? I went to the library.", "Kamu pergi ke mana?"], ["Who did you meet? I met my teacher.", "Kamu bertemu siapa?"], ["Why did you go there? Because I needed a book.", "Mengapa ke sana?"]]],
          ["video", "1LW6GNgOGnZwhLj87LYTCmzHOFGByO8m1", "Kata ganti tanya (Interrogative Pronouns)"]
        ] },
        { t: "Pengalaman temanku", min: 5, b: [
          ["p", "Baca cerita singkat ini, lalu dengarkan dan tirukan."],
          ["ex", [["Last holiday, Raka visited his uncle in Yogyakarta.", "Liburan lalu, Raka mengunjungi pamannya di Yogyakarta."], ["They went to Borobudur Temple in the morning.", "Mereka pergi ke Candi Borobudur pagi hari."], ["Raka took many photos. He was very happy.", "Raka mengambil banyak foto. Dia sangat senang."]]],
          ["say", ["Where did you go last holiday?", "I went to my grandmother's house."]]
        ] }
      ], Q: [
        { q: "___ did you go yesterday? — To the market.", o: ["Who", "Where", "When"], a: 1, e: "Jawaban tempat → where." },
        { q: "___ did you meet? — My cousin.", o: ["Who", "Why", "How"], a: 0, e: "Jawaban orang → who." },
        { q: "___ did you cry? — Because I fell down.", o: ["When", "Why", "What"], a: 1, e: "Jawaban alasan → why." },
        { q: "What did you ___ last night?", o: ["did", "do", "does"], a: 1, e: "did + bentuk dasar." }
      ] },
      { t: "I will go to Bromo", d: "Rencana dengan will.", L: [
        { t: "Will untuk rencana", min: 5, b: [
          ["rule", "Subjek + will + kata kerja dasar\nWhat will you do tomorrow?"],
          ["ex", [["I will go to Bromo next holiday.", "Saya akan pergi ke Bromo liburan nanti."], ["My father will paint the fence on Sunday.", "Ayahku akan mengecat pagar hari Minggu."], ["I will study at junior high school next year.", "Saya akan sekolah di SMP tahun depan."], ["What will you do tomorrow? I will help my mother.", "Apa yang akan kamu lakukan besok?"]]],
          ["tip", "Kata waktu masa depan: **tomorrow, next week, next year, soon**."]
        ] },
        { t: "Rencana akhir pekanku", min: 8, b: [
          ["p", "Tulis 4–5 kalimat tentang rencanamu akhir pekan ini memakai **will**."],
          ["write", "What will you do this weekend? Write 4–5 sentences using 'will'.", 30]
        ] }
      ], Q: [
        { q: "I ___ visit my aunt tomorrow.", o: ["will", "was", "did"], a: 0, e: "tomorrow → will." },
        { q: "She will ___ a cake on Sunday.", o: ["makes", "made", "make"], a: 2, e: "will + bentuk dasar." },
        { q: "Kata waktu masa depan:", o: ["yesterday", "next week", "last night"], a: 1, e: "next week = minggu depan." },
        { q: "What will you do tomorrow? — I ___ play badminton.", o: ["will", "did", "am"], a: 0, e: "Jawab dengan will." }
      ] },
      { t: "I want to be a pilot", d: "Profesi dan cita-cita.", L: [
        { t: "Nama profesi", min: 5, b: [
          ["ex", [["doctor — A doctor helps sick people.", "dokter"], ["teacher — A teacher teaches students.", "guru"], ["pilot — A pilot flies a plane.", "pilot"], ["farmer — A farmer grows rice.", "petani"], ["chef — A chef cooks food.", "koki"]]],
          ["video", "1H3Id1wArEUdogA77fDWyBVA42FZz5vYV", "Jobs and occupations"],
          ["video", "1H5OCxJeR9vZbZHjYF93OHSIDhfA423kZ", "What do you want to be in the future?"]
        ] },
        { t: "Cita-citaku", min: 8, b: [
          ["ex", [["What do you want to be?", "Kamu ingin menjadi apa?"], ["I want to be a doctor because I want to help people.", "Saya ingin jadi dokter karena ingin menolong orang."]]],
          ["say", ["I want to be a pilot.", "I want to help people."]],
          ["write", "My Dream: Write 4–5 sentences about what you want to be and why.", 30]
        ] }
      ], Q: [
        { q: "A ___ flies a plane.", o: ["chef", "pilot", "farmer"], a: 1, e: "pilot menerbangkan pesawat." },
        { q: "A farmer ___ rice.", o: ["grows", "cooks", "teaches"], a: 0, e: "petani menanam padi." },
        { q: "“What do you want to be?” artinya...", o: ["Kamu ingin jadi apa?", "Kamu sedang apa?", "Kamu mau ke mana?"], a: 0, e: "Menanyakan cita-cita." },
        { q: "I want ___ a teacher.", o: ["be", "to be", "being"], a: 1, e: "want + to + kata kerja." }
      ] }
    ]
  },
  {
    id: "smp", path: "SMP", t: "Bahasa Inggris SMP (Kelas 7–9)", sub: "Perkenalan, teks deskriptif, rutinitas, undangan, perbandingan, teks recount, naratif, dan prosedur.",
    level: "Fase D", cat: "SMP", hours: 7, color: "#3b82f6", ic: "🏫",
    learn: ["Memperkenalkan diri dan orang lain secara formal dan informal", "Mendeskripsikan orang, hewan, dan benda", "Menyampaikan undangan, ucapan selamat, dan kemampuan", "Memahami dan menulis teks recount, naratif, dan prosedur"],
    skills: ["Descriptive text", "Recount", "Narrative", "Procedure"],
    M: [
      { t: "About Me & Others", d: "Perkenalan formal dan informal.", L: [
        { t: "Memperkenalkan diri dan orang lain", min: 5, b: [
          ["ex", [["Hi, I'm Galih. I'm in Grade 7.", "Hai, aku Galih. Aku kelas 7. (informal)"], ["Good morning. Let me introduce myself. My name is Galih Pratama.", "Selamat pagi. Perkenankan saya memperkenalkan diri. (formal)"], ["This is my friend, Sinta. She's from Medan.", "Ini temanku, Sinta. Dia dari Medan."], ["Nice to meet you, Sinta. — Nice to meet you too.", "Senang bertemu denganmu."]]],
          ["video", "1ku6xEGFPgoT_RxM8a0idqmL2qq5GLDA9", "Greeting, introduction"]
        ] },
        { t: "Hobi dan kesukaan", min: 5, b: [
          ["ex", [["My hobby is drawing.", "Hobiku menggambar."], ["I like playing badminton in my free time.", "Aku suka bermain bulu tangkis di waktu luang."], ["What's your hobby? — I love reading comics.", "Apa hobimu?"]]],
          ["video", "1tfQ93xbv3xPe-3SI2jsE11lwZKvMH6fS", "Talking about hobby"],
          ["say", ["Let me introduce myself.", "My hobby is playing football."]]
        ] }
      ], Q: [
        { q: "Ungkapan perkenalan formal:", o: ["Hey, what's up?", "Let me introduce myself.", "Yo!"], a: 1, e: "Let me introduce myself = formal." },
        { q: "Memperkenalkan teman:", o: ["This is my friend, Ali.", "That my friend Ali.", "He friend Ali."], a: 0, e: "This is + nama." },
        { q: "I like ___ comics.", o: ["read", "reading", "reads"], a: 1, e: "like + V-ing." },
        { q: "Balasan untuk “Nice to meet you”:", o: ["Nice to meet you too.", "Goodbye.", "I'm fine."], a: 0, e: "Balas dengan too." }
      ] },
      { t: "Describing People, Animals & Things", d: "Teks deskriptif.", L: [
        { t: "Struktur teks deskriptif", min: 6, b: [
          ["rule", "Identification → memperkenalkan yang dideskripsikan\nDescription   → ciri fisik, sifat, kebiasaan"],
          ["ex", [["My cat's name is Mochi.", "Identifikasi"], ["She has soft white fur and round green eyes.", "Ciri fisik (has)"], ["She is playful and very friendly.", "Sifat (is)"], ["She likes sleeping on my bed.", "Kebiasaan (present tense)"]]],
          ["tip", "Deskripsi memakai **simple present**: She **is**, she **has**, she **likes**."]
        ] },
        { t: "Kata sifat untuk deskripsi", min: 5, b: [
          ["ex", [["tall / short, slim / chubby", "tinggi / pendek, langsing / gemuk"], ["straight / curly hair", "rambut lurus / keriting"], ["kind, friendly, smart, funny", "baik, ramah, pintar, lucu"], ["My sister has long straight hair and she is very kind.", "Kakakku berambut panjang lurus dan sangat baik."]]],
          ["video", "18r_0hFlIUwhgCK0o4qg9I6O0f24gNEkV", "House vocabulary: rooms and furniture"],
          ["write", "Describe your pet, your best friend, or your room in 5 sentences.", 40]
        ] }
      ], Q: [
        { q: "Bagian pertama teks deskriptif:", o: ["Identification", "Orientation", "Resolution"], a: 0, e: "Identification memperkenalkan objek." },
        { q: "My father ___ a moustache.", o: ["is", "has", "have"], a: 1, e: "Ciri fisik → has (he)." },
        { q: "Tense dalam teks deskriptif:", o: ["Simple present", "Simple past", "Future"], a: 0, e: "Fakta/ciri tetap → present." },
        { q: "Kata sifat yang menggambarkan sifat:", o: ["curly", "friendly", "tall"], a: 1, e: "friendly = ramah (sifat)." }
      ] },
      { t: "Daily Routines", d: "Simple present dan kata frekuensi.", L: [
        { t: "Kegiatan sehari-hari", min: 5, b: [
          ["ex", [["I wake up at five o'clock.", "Aku bangun pukul lima."], ["I take a bath and have breakfast.", "Aku mandi dan sarapan."], ["I go to school by bike.", "Aku ke sekolah naik sepeda."], ["After school, I do my homework.", "Sepulang sekolah, aku mengerjakan PR."]]],
          ["video", "1UMhJpBeG-ML0o9Kl4XkYI4742ZaYVhBH", "Daily routines vocabulary"],
          ["video", "1hsmC-jSpHhSaFkkuSqkHZ_d9WNaPRzRj", "John's daily life"]
        ] },
        { t: "Kata frekuensi", min: 5, b: [
          ["rule", "always (100%) > usually > often > sometimes > rarely > never (0%)\nPosisi: sebelum kata kerja — I always wake up early.\nSetelah to be — She is never late."],
          ["ex", [["I always pray before eating.", "Aku selalu berdoa sebelum makan."], ["She sometimes helps her mother cook.", "Dia kadang membantu ibunya memasak."], ["He is never late for school.", "Dia tidak pernah terlambat."]]],
          ["say", ["I usually go to school by bike.", "She is never late."]]
        ] }
      ], Q: [
        { q: "She ___ up at 5 a.m. every day.", o: ["wake", "wakes", "woke"], a: 1, e: "she + V1+s." },
        { q: "Posisi 'always' yang benar:", o: ["I always walk to school.", "I walk always to school.", "Always I walk school."], a: 0, e: "Sebelum kata kerja utama." },
        { q: "He is ___ late. (tidak pernah)", o: ["always", "never", "often"], a: 1, e: "never = tidak pernah." },
        { q: "Kata frekuensi paling tinggi:", o: ["usually", "always", "sometimes"], a: 1, e: "always = 100%." }
      ] },
      { t: "Invitations & Congratulations", d: "Mengundang, menerima, menolak, memberi selamat.", L: [
        { t: "Undangan", min: 5, b: [
          ["ex", [["Would you like to come to my birthday party?", "Maukah kamu datang ke pesta ulang tahunku?"], ["I'd love to. Thank you!", "Aku mau sekali. Terima kasih! (menerima)"], ["I'm sorry, I can't. I have to visit my grandma.", "Maaf, aku tidak bisa. (menolak + alasan)"], ["Come to my birthday party, please!", "Datanglah ke pestaku!"]]],
          ["video", "1SPToAqyGHtCNc2il_aQwAbTub7O4yPbm", "Cinderella – Happy birthday! This is for you"]
        ] },
        { t: "Ucapan selamat dan kemampuan", min: 5, b: [
          ["ex", [["Congratulations on winning the competition!", "Selamat atas kemenangan lomba!"], ["Well done! I'm so happy for you.", "Hebat! Aku ikut senang."], ["Thank you. I couldn't do it without your support.", "Terima kasih atas dukunganmu."], ["She can play the guitar very well.", "Dia bisa bermain gitar dengan baik."]]],
          ["say", ["Would you like to come to my party?", "Congratulations! I'm so happy for you."]]
        ] }
      ], Q: [
        { q: "Mengundang dengan sopan:", o: ["Would you like to come?", "You must come.", "Come now!"], a: 0, e: "Would you like to... sopan." },
        { q: "Menolak undangan dengan sopan:", o: ["No.", "I'm sorry, I can't. I have a lesson.", "I don't want."], a: 1, e: "Minta maaf + alasan." },
        { q: "Congratulations ___ your graduation!", o: ["for", "on", "at"], a: 1, e: "congratulations on." },
        { q: "Menerima undangan:", o: ["I'd love to.", "Never mind.", "You're welcome."], a: 0, e: "I'd love to = aku mau sekali." }
      ] },
      { t: "Comparing Things", d: "Comparative dan superlative.", L: [
        { t: "Membandingkan dua benda", min: 5, b: [
          ["rule", "Pendek: adj + er + than → taller than\nPanjang: more + adj + than → more expensive than\nTidak beraturan: good → better, bad → worse"],
          ["ex", [["An elephant is bigger than a horse.", "Gajah lebih besar dari kuda."], ["This bag is more expensive than that one.", "Tas ini lebih mahal dari yang itu."], ["My handwriting is better than before.", "Tulisanku lebih baik dari sebelumnya."]]],
          ["video", "19KdxPgZHD7rcK4RVqTLVJlBe5pQCQBgK", "Pets – comparison expression"]
        ] },
        { t: "Yang paling: superlative", min: 5, b: [
          ["rule", "the + adj + est → the tallest\nthe most + adj → the most beautiful\ngood → the best, bad → the worst"],
          ["ex", [["The cheetah is the fastest land animal.", "Cheetah hewan darat tercepat."], ["Puncak Jaya is the highest mountain in Indonesia.", "Puncak Jaya gunung tertinggi di Indonesia."], ["She is the most diligent student in my class.", "Dia murid paling rajin di kelasku."]]]
        ] }
      ], Q: [
        { q: "A car is ___ than a bicycle.", o: ["fast", "faster", "fastest"], a: 1, e: "Membandingkan dua → -er + than." },
        { q: "This is the ___ book I have ever read.", o: ["good", "better", "best"], a: 2, e: "the + superlative: best." },
        { q: "Gold is ___ than silver.", o: ["more expensive", "expensiver", "most expensive"], a: 0, e: "Kata sifat panjang → more." },
        { q: "Mount Everest is the ___ mountain in the world.", o: ["higher", "highest", "high"], a: 1, e: "Paling → the highest." }
      ] },
      { t: "Recount & Narrative Text", d: "Pengalaman pribadi dan dongeng.", L: [
        { t: "Teks recount: pengalaman", min: 6, b: [
          ["rule", "Orientation → siapa, di mana, kapan\nEvents      → urutan kejadian\nReorientation → kesan/penutup"],
          ["ex", [["Last Sunday, my family and I went to Kebun Raya Bogor.", "Orientation"], ["First, we walked around the orchid garden. Then, we had lunch by the lake.", "Events"], ["It was a tiring but fun day.", "Reorientation"]]],
          ["tip", "Kata urutan: **first, then, after that, finally**. Tense: **simple past**."]
        ] },
        { t: "Teks naratif: fabel", min: 6, b: [
          ["rule", "Orientation → tokoh dan latar\nComplication → masalah muncul\nResolution  → masalah selesai\n(Coda)       → pesan moral"],
          ["p", "Fabel 'Semut dan Belalang': sepanjang musim panas, belalang bersantai sementara semut menyimpan makanan. Saat musim dingin tiba, belalang kelaparan dan belajar pentingnya bekerja keras. Pesan moral: bersiaplah sejak awal."],
          ["video", "1XRSEqEstxlz2fiKvIVjj0B-Ig55TFXfH", "The Ant and the Grasshopper"],
          ["write", "Write a recount of your last holiday (orientation, events, reorientation).", 50]
        ] }
      ], Q: [
        { q: "Bagian 'masalah muncul' dalam teks naratif:", o: ["Orientation", "Complication", "Coda"], a: 1, e: "Complication = konflik." },
        { q: "Tense utama teks recount:", o: ["Simple present", "Simple past", "Future"], a: 1, e: "Menceritakan masa lalu." },
        { q: "Kata urutan dalam recount:", o: ["first, then, finally", "because, so", "but, however"], a: 0, e: "Menunjukkan urutan kejadian." },
        { q: "Pesan moral dalam fabel biasanya ada di...", o: ["Coda", "Orientation", "Identification"], a: 0, e: "Coda berisi pesan moral." }
      ] },
      { t: "Procedure Text", d: "Cara membuat atau melakukan sesuatu.", L: [
        { t: "Struktur teks prosedur", min: 5, b: [
          ["rule", "Goal        → judul/tujuan\nMaterials   → bahan dan alat\nSteps       → langkah-langkah (kalimat perintah)"],
          ["ex", [["How to Make Iced Tea", "Goal"], ["You need: a tea bag, hot water, sugar, ice cubes, a glass.", "Materials"], ["First, put the tea bag in a glass of hot water.", "Step 1"], ["Then, add two spoons of sugar and stir well.", "Step 2"], ["Finally, add ice cubes and serve.", "Step 3"]]],
          ["video", "1CdlR_ldyFFYyyAXAxMberKZrbBE1PIZ0", "Cooking for parents"]
        ] },
        { t: "Kalimat perintah (imperative)", min: 5, b: [
          ["ex", [["Boil the water.", "Rebus airnya."], ["Don't add too much salt.", "Jangan menambah terlalu banyak garam."], ["Cut the onions into small pieces.", "Potong bawang kecil-kecil."]]],
          ["tip", "Kalimat perintah dimulai dengan **kata kerja dasar** tanpa subjek."],
          ["write", "Write a short procedure: How to make instant noodles (goal, materials, steps).", 40]
        ] }
      ], Q: [
        { q: "Bagian berisi bahan dan alat:", o: ["Goal", "Materials", "Steps"], a: 1, e: "Materials = bahan dan alat." },
        { q: "Kalimat perintah yang benar:", o: ["You boils the water.", "Boil the water.", "Boiling water."], a: 1, e: "Diawali kata kerja dasar." },
        { q: "Larangan dalam prosedur:", o: ["Don't touch the hot pan.", "Not touch pan.", "No touching you."], a: 0, e: "Don't + kata kerja dasar." },
        { q: "Kata urutan terakhir:", o: ["First", "Then", "Finally"], a: 2, e: "Finally = terakhir." }
      ] }
    ]
  },
  {
    id: "sma", path: "SMA", t: "Bahasa Inggris SMA (Kelas X–XII)", sub: "Ekspresi komunikatif, teks deskriptif, pengumuman, biografi, legenda, dan eksposisi analitis.",
    level: "Fase E–F", cat: "SMA", hours: 8, color: "#8b5cf6", ic: "🎓",
    learn: ["Memberi pujian, ucapan selamat, saran, dan pendapat", "Menulis teks deskriptif tempat wisata dan pengumuman", "Memahami teks recount biografi dan naratif legenda", "Menyusun teks eksposisi analitis dengan argumen yang runtut"],
    skills: ["Ekspresi komunikatif", "Biografi", "Legenda", "Eksposisi"],
    M: [
      { t: "Compliments & Congratulations", d: "Memuji dan memberi selamat.", L: [
        { t: "Memberi pujian dan meresponsnya", min: 5, b: [
          ["ex", [["You did a great job on your presentation!", "Presentasimu bagus sekali!"], ["Your speech was really inspiring.", "Pidatomu sangat menginspirasi."], ["Thank you. That's very kind of you.", "Terima kasih, kamu baik sekali. (respons)"], ["Congratulations on being accepted to the university!", "Selamat sudah diterima di universitas!"]]],
          ["video", "1UxBHlVF11b1DhdAMlvTc0NYevm8Lt-3d", "Share happy moments, express happy feelings"],
          ["say", ["You did a great job!", "Thank you. That's very kind of you."]]
        ] },
        { t: "Menyatakan niat dan rencana", min: 5, b: [
          ["ex", [["I'm going to join the English debate club this year.", "Aku berencana ikut klub debat bahasa Inggris tahun ini."], ["I intend to apply for a scholarship.", "Aku berniat mendaftar beasiswa."], ["I'm planning to take a gap year.", "Aku berencana mengambil jeda setahun."]]],
          ["tip", "**be going to** untuk rencana yang sudah diputuskan; **will** untuk keputusan spontan."]
        ] }
      ], Q: [
        { q: "Respons yang tepat untuk pujian:", o: ["Thank you. That's very kind of you.", "Yes, I know.", "No, it's bad."], a: 0, e: "Menerima pujian dengan sopan." },
        { q: "Congratulations ___ your achievement.", o: ["on", "for", "to"], a: 0, e: "congratulations on." },
        { q: "Menyatakan rencana yang sudah diputuskan:", o: ["I'm going to study medicine.", "I study medicine yesterday.", "I studying medicine."], a: 0, e: "be going to + V1." },
        { q: "“That's very kind of you” artinya...", o: ["Kamu baik sekali", "Itu jenis kamu", "Kamu keras kepala"], a: 0, e: "Ungkapan terima kasih." }
      ] },
      { t: "Descriptive Text: Tourist Destinations", d: "Mendeskripsikan tempat wisata.", L: [
        { t: "Membaca: Lake Toba", min: 7, b: [
          ["p", "Bacalah teks deskriptif orisinal berikut. Ketuk 🔊 untuk mendengarkan."],
          ["ex", [["Lake Toba is located in North Sumatra, Indonesia.", "Identification: letak"], ["It is the largest volcanic lake in the world, formed by a massive eruption tens of thousands of years ago.", "Deskripsi: asal-usul"], ["In the middle of the lake lies Samosir Island, home to the Batak people.", "Deskripsi: bagian-bagian"], ["Visitors can enjoy the cool air, traditional houses, and the beautiful view from the hills.", "Deskripsi: daya tarik"]]],
          ["tip", "Teks deskriptif tempat sering memakai **is located in, is famous for, visitors can...**"]
        ] },
        { t: "Menulis deskripsi tempat", min: 10, b: [
          ["ex", [["is famous for its white sandy beaches", "terkenal dengan pantai pasir putihnya"], ["offers a breathtaking view of...", "menawarkan pemandangan menakjubkan..."], ["is a must-visit destination", "adalah destinasi yang wajib dikunjungi"]]],
          ["write", "Describe a tourist destination in your city or region (identification + description).", 80]
        ] }
      ], Q: [
        { q: "Frasa untuk menyatakan letak:", o: ["is located in", "is going to", "was born in"], a: 0, e: "is located in = terletak di." },
        { q: "Bagian teks deskriptif yang memperkenalkan objek:", o: ["Identification", "Complication", "Reiteration"], a: 0, e: "Identification." },
        { q: "“A must-visit destination” artinya...", o: ["Tempat yang wajib dikunjungi", "Tempat terlarang", "Tempat yang jauh"], a: 0, e: "must-visit = wajib dikunjungi." },
        { q: "Samosir Island is ___ the middle of Lake Toba.", o: ["on", "in", "at"], a: 1, e: "in the middle of." }
      ] },
      { t: "Announcements & Invitations", d: "Pengumuman dan undangan formal.", L: [
        { t: "Struktur pengumuman", min: 5, b: [
          ["rule", "Title/Event → nama kegiatan\nDate, time, place → kapan dan di mana\nDetails → syarat, kontak, catatan"],
          ["ex", [["ANNOUNCEMENT: School Science Fair", "Judul"], ["All students are invited to join the Science Fair on Friday, 5 December, at 8 a.m. in the school hall.", "Waktu dan tempat"], ["Please register with your homeroom teacher by Wednesday.", "Detail"], ["For further information, contact the OSIS office.", "Kontak"]]]
        ] },
        { t: "Menulis pengumuman", min: 8, b: [
          ["write", "Write a short announcement for a school English competition (event, date, time, place, how to register).", 50]
        ] }
      ], Q: [
        { q: "Informasi wajib dalam pengumuman:", o: ["Waktu dan tempat", "Pesan moral", "Thesis"], a: 0, e: "Pengumuman harus memuat kapan dan di mana." },
        { q: "“Please register by Wednesday” artinya...", o: ["Daftar paling lambat Rabu", "Daftar setiap Rabu", "Datang hari Rabu"], a: 0, e: "by = paling lambat." },
        { q: "All students are ___ to join.", o: ["invited", "invite", "inviting"], a: 0, e: "Pasif: are invited." },
        { q: "“For further information” artinya...", o: ["Untuk informasi lebih lanjut", "Untuk informasi pertama", "Untuk informasi rahasia"], a: 0, e: "further = lebih lanjut." }
      ] },
      { t: "Recount: Biography", d: "Riwayat hidup tokoh.", L: [
        { t: "Membaca: B.J. Habibie", min: 7, b: [
          ["ex", [["Bacharuddin Jusuf Habibie was born in Parepare, South Sulawesi, on 25 June 1936.", "Orientation"], ["He studied aeronautical engineering in Germany and later worked in the aircraft industry there.", "Event 1"], ["He returned to Indonesia and led the development of the national aircraft industry.", "Event 2"], ["In 1998, he became the third President of Indonesia.", "Event 3"], ["He passed away in 2019 and is remembered as a pioneer of Indonesian technology.", "Reorientation"]]],
          ["tip", "Biografi memakai **simple past** dan **urutan waktu** (in 1936, later, after that)."]
        ] },
        { t: "Ungkapan dalam biografi", min: 5, b: [
          ["ex", [["was born in / on", "lahir di / pada"], ["graduated from", "lulus dari"], ["devoted his life to", "mengabdikan hidupnya untuk"], ["is remembered as", "dikenang sebagai"]]],
          ["write", "Write a short biography (5–6 sentences) of a figure you admire.", 70]
        ] }
      ], Q: [
        { q: "Habibie was born ___ 1936.", o: ["in", "on", "at"], a: 0, e: "Tahun → in." },
        { q: "Tense utama biografi:", o: ["Simple past", "Simple present", "Future"], a: 0, e: "Kejadian masa lalu." },
        { q: "“He is remembered as a pioneer” artinya...", o: ["Dia dikenang sebagai pelopor", "Dia ingat pelopor", "Dia akan menjadi pelopor"], a: 0, e: "is remembered as = dikenang sebagai." },
        { q: "Bagian penutup biografi disebut...", o: ["Reorientation", "Complication", "Thesis"], a: 0, e: "Reorientation berisi penilaian/penutup." }
      ] },
      { t: "Narrative: Legends", d: "Cerita rakyat dan pesan moralnya.", L: [
        { t: "Membaca: Malin Kundang (diceritakan ulang)", min: 7, b: [
          ["ex", [["Long ago, in a fishing village in West Sumatra, lived a poor widow and her son, Malin Kundang.", "Orientation"], ["Malin left the village to work on a ship and became a rich merchant.", "Event"], ["Years later, his ship docked at the village, but he refused to admit that the old woman was his mother.", "Complication"], ["Heartbroken, she prayed, and a storm turned Malin and his ship into stone.", "Resolution"], ["The story teaches us never to forget and disrespect our parents.", "Coda"]]],
          ["video", "1ve1tX7j1iIfRFCj7_0DcMOr7MzsdtPyT", "Disease and hospital (conversation listening)"]
        ] },
        { t: "Ciri kebahasaan naratif", min: 5, b: [
          ["rule", "Simple past: lived, left, became, refused\nPenghubung waktu: long ago, one day, years later, finally\nKata kerja tindakan dan dialog"],
          ["video", "1Xh5sCGChqhFEVtx0JsCzjehuykyAxTd3", "The Pied Piper of Hamelin"]
        ] }
      ], Q: [
        { q: "Bagian legenda saat Malin menolak ibunya:", o: ["Orientation", "Complication", "Coda"], a: 1, e: "Konflik utama = complication." },
        { q: "Pesan moral Malin Kundang:", o: ["Jangan durhaka kepada orang tua", "Rajin menabung", "Belajar berenang"], a: 0, e: "Coda: hormati orang tua." },
        { q: "Penanda waktu khas awal legenda:", o: ["Long ago", "Tomorrow", "Nowadays"], a: 0, e: "Long ago / once upon a time." },
        { q: "Malin ___ a rich merchant.", o: ["become", "became", "becomes"], a: 1, e: "Simple past: became." }
      ] },
      { t: "Offers, Suggestions & Opinions", d: "Menawarkan, menyarankan, berpendapat.", L: [
        { t: "Tawaran dan saran", min: 5, b: [
          ["ex", [["Shall I help you carry those books?", "Boleh saya bantu membawakan buku itu?"], ["Would you like some tea?", "Mau teh?"], ["Why don't you join the study group?", "Kenapa tidak ikut kelompok belajar?"], ["You'd better see a doctor.", "Sebaiknya kamu ke dokter."], ["I suggest you start revising earlier.", "Saya sarankan kamu mulai mengulang lebih awal."]]],
          ["video", "1YC5RZn-paa29DAezzjHezbqzrtj7n9Yb", "Give advice"]
        ] },
        { t: "Menyampaikan pendapat", min: 5, b: [
          ["ex", [["In my opinion, school uniforms are useful.", "Menurut saya, seragam sekolah bermanfaat."], ["I believe that reading should be a daily habit.", "Saya yakin membaca harus jadi kebiasaan."], ["I partly agree, but...", "Saya setuju sebagian, tetapi..."], ["What do you think about online classes?", "Apa pendapatmu tentang kelas daring?"]]],
          ["say", ["Why don't you join the study group?", "In my opinion, reading is important."]]
        ] }
      ], Q: [
        { q: "Menawarkan bantuan:", o: ["Shall I help you?", "You help me.", "Help you I."], a: 0, e: "Shall I...? untuk menawarkan." },
        { q: "Memberi saran:", o: ["Why don't you rest?", "Why you don't rest?", "Rest you why?"], a: 0, e: "Why don't you + V1." },
        { q: "You'd better ___ to bed early.", o: ["go", "going", "to go"], a: 0, e: "had better + V1." },
        { q: "Menyatakan pendapat:", o: ["In my opinion, ...", "In my pocket, ...", "On my opinion, ..."], a: 0, e: "In my opinion." }
      ] },
      { t: "Analytical Exposition", d: "Teks argumentatif: thesis, arguments, reiteration.", L: [
        { t: "Struktur eksposisi analitis", min: 6, b: [
          ["rule", "Thesis       → pendapat penulis\nArguments    → alasan + bukti (firstly, secondly, moreover)\nReiteration  → penegasan kembali pendapat"],
          ["ex", [["Students should be allowed to use smartphones at school.", "Thesis"], ["Firstly, smartphones give quick access to learning resources.", "Argument 1"], ["Secondly, they help students manage schedules and assignments.", "Argument 2"], ["Therefore, with clear rules, smartphones can support learning.", "Reiteration"]]]
        ] },
        { t: "Menulis eksposisi", min: 12, b: [
          ["write", "Write an analytical exposition: 'Should students learn English from elementary school?' (thesis, two arguments, reiteration).", 100]
        ] }
      ], Q: [
        { q: "Bagian pendapat utama penulis:", o: ["Thesis", "Orientation", "Materials"], a: 0, e: "Thesis = pendapat." },
        { q: "Penghubung untuk argumen tambahan:", o: ["Moreover", "Once upon a time", "Finally, add ice"], a: 0, e: "Moreover = selain itu." },
        { q: "Bagian penegasan kembali:", o: ["Reiteration", "Complication", "Identification"], a: 0, e: "Reiteration." },
        { q: "Tense umum eksposisi:", o: ["Simple present", "Simple past", "Past perfect"], a: 0, e: "Menyatakan pendapat dan fakta umum." }
      ] }
    ]
  }
]);
