// Bank materi Kawan English — 5 level, 4 skill + kosakata + jurnal
window.LEVELS = [
  {
    id: "A1", name: "Dasar", desc: "Kalimat sederhana sehari-hari: perkenalan, keluarga, belanja.",
    vocab: [
      ["family", "keluarga", "I live with my family."],
      ["breakfast", "sarapan", "We eat breakfast at six."],
      ["always", "selalu", "She always drinks tea."],
      ["cheap", "murah", "The bananas are cheap."],
      ["expensive", "mahal", "This phone is expensive."],
      ["tired", "lelah", "I am tired today."],
      ["hungry", "lapar", "Are you hungry?"],
      ["market", "pasar", "My mother goes to the market."],
      ["friend", "teman", "Andi is my best friend."],
      ["early", "pagi-pagi / awal", "I wake up early."],
      ["busy", "sibuk", "My father is very busy."],
      ["weekend", "akhir pekan", "We play football on the weekend."]
    ],
    reading: [
      {
        title: "My Family",
        text: "My name is Rina. I live in Bogor with my family. My father is a teacher. My mother is a nurse. I have one brother. His name is Dimas. He is ten years old. Every morning we eat breakfast together. On the weekend, we go to the market.",
        glossary: { teacher: "guru", nurse: "perawat", brother: "saudara laki-laki", together: "bersama-sama", weekend: "akhir pekan" },
        questions: [
          { q: "Where does Rina live?", o: ["In Jakarta", "In Bogor", "In Bandung"], a: 1, e: "Kalimat kedua: \"I live in Bogor with my family.\"" },
          { q: "What is Rina's mother's job?", o: ["A teacher", "A doctor", "A nurse"], a: 2, e: "\"My mother is a nurse\" — ibunya perawat." },
          { q: "When do they go to the market?", o: ["Every morning", "On the weekend", "On Monday"], a: 1, e: "\"On the weekend, we go to the market.\"" }
        ]
      },
      {
        title: "At the Market",
        text: "Budi goes to the market on Sunday. He buys rice, eggs, and bananas. The bananas are cheap, but the eggs are expensive today. Budi is hungry, so he eats fried rice at a small stall. Then he goes home by motorbike.",
        glossary: { buys: "membeli", stall: "warung / kios", "fried rice": "nasi goreng", so: "jadi / sehingga", motorbike: "sepeda motor" },
        questions: [
          { q: "What day does Budi go to the market?", o: ["Saturday", "Sunday", "Friday"], a: 1, e: "\"Budi goes to the market on Sunday.\"" },
          { q: "What is expensive today?", o: ["The eggs", "The rice", "The bananas"], a: 0, e: "\"...but the eggs are expensive today.\" Kata 'but' menandai kontras." },
          { q: "How does Budi go home?", o: ["By bus", "On foot", "By motorbike"], a: 2, e: "\"Then he goes home by motorbike.\"" }
        ]
      }
    ],
    listening: [
      { say: "I have two brothers." },
      { say: "She drinks tea every morning." },
      { say: "We are very tired today." },
      { say: "Tom wakes up at six o'clock and goes to school by bus.", q: "How does Tom go to school?", o: ["By car", "By bus", "By bike"], a: 1 },
      { say: "The shop opens at nine and closes at five.", q: "When does the shop close?", o: ["At nine", "At five", "At six"], a: 1 },
      { say: "My sister likes cats, but she doesn't like dogs.", q: "What does the sister NOT like?", o: ["Cats", "Birds", "Dogs"], a: 2 }
    ],
    speaking: [
      ["Good morning. How are you?", "Selamat pagi. Apa kabar?", "Ucapkan 'morning' seperti MOR-ning, huruf r lembut."],
      ["My name is Andi and I live in Bogor.", "Nama saya Andi dan saya tinggal di Bogor.", "'live' dibaca pendek: liv, bukan laif."],
      ["I would like a cup of coffee, please.", "Saya mau secangkir kopi.", "'would' dibaca wud — huruf l tidak dibaca."],
      ["Where is the bathroom?", "Di mana kamar mandinya?", "'th' di 'the': ujung lidah di belakang gigi depan."],
      ["I am from Indonesia.", "Saya dari Indonesia.", "Tekanan pada 'In-do-NE-sia'."],
      ["Thank you very much.", "Terima kasih banyak.", "'th' di 'thank' tanpa suara, seperti meniup pelan."]
    ],
    writing: {
      translate: [
        { id: "Saya suka membaca buku.", a: ["I like reading books", "I like to read books", "I love reading books", "I enjoy reading books"], h: "like + verb-ing" },
        { id: "Dia seorang guru.", a: ["She is a teacher", "He is a teacher"], h: "Pakai 'is' dan 'a'" },
        { id: "Kami pergi ke sekolah setiap hari.", a: ["We go to school every day"], h: "every day = setiap hari" },
        { id: "Ini rumah saya.", a: ["This is my house", "This is my home"], h: "This is ..." }
      ],
      arrange: ["She eats rice every day", "Where do you live", "I am not hungry"],
      grammar: [
        { q: "She ___ a student.", o: ["am", "is", "are"], a: 1, e: "She/He/It memakai 'is'." },
        { q: "They ___ football every Sunday.", o: ["play", "plays", "playing"], a: 0, e: "Subjek jamak (they) tidak memakai -s pada kata kerja." },
        { q: "I have ___ apple.", o: ["a", "an", "the"], a: 1, e: "'an' sebelum bunyi vokal: an apple, an egg." },
        { q: "He ___ like coffee.", o: ["don't", "doesn't", "isn't"], a: 1, e: "Negatif untuk he/she/it: doesn't + verb dasar." }
      ]
    },
    journal: { prompt: "Ceritakan tentang keluargamu: siapa saja, pekerjaan mereka, dan kegiatan bersama.", min: 30 }
  },
  {
    id: "A2", name: "Dasar Lanjut", desc: "Masa lalu, rencana, perbandingan, dan percakapan praktis.",
    vocab: [
      ["yesterday", "kemarin", "I called her yesterday."],
      ["borrow", "meminjam", "Can I borrow your pen?"],
      ["crowded", "ramai / penuh sesak", "The train was crowded."],
      ["arrive", "tiba", "We arrived at noon."],
      ["remember", "ingat", "I don't remember his name."],
      ["healthy", "sehat", "Fruit is healthy."],
      ["decide", "memutuskan", "She decided to stay home."],
      ["journey", "perjalanan", "The journey took three hours."],
      ["invite", "mengundang", "They invited me to dinner."],
      ["quiet", "tenang / sepi", "The library is quiet."],
      ["however", "namun", "It was cold. However, we went out."],
      ["already", "sudah", "I have already eaten."]
    ],
    reading: [
      {
        title: "A Trip to Bandung",
        text: "Last month, Sari and her friends went to Bandung by train. The journey took about three hours. They arrived at noon and visited a tea plantation. The air was cool and fresh. In the evening, they ate at a crowded restaurant, but the food was delicious. They came back to Bogor the next day.",
        glossary: { journey: "perjalanan", noon: "tengah hari", plantation: "perkebunan", fresh: "segar", delicious: "lezat", "came back": "kembali" },
        questions: [
          { q: "How did Sari and her friends travel to Bandung?", o: ["By car", "By train", "By plane"], a: 1, e: "\"...went to Bandung by train.\"" },
          { q: "How long was the journey?", o: ["About three hours", "About one hour", "A whole day"], a: 0, e: "\"The journey took about three hours.\"" },
          { q: "What was the restaurant like?", o: ["Quiet", "Expensive", "Crowded"], a: 2, e: "\"...they ate at a crowded restaurant\" — restorannya ramai." }
        ]
      },
      {
        title: "Healthy Habits",
        text: "Doctors say that sleeping seven to eight hours every night is important. Drinking enough water also keeps your body healthy. Many people skip breakfast because they are busy, but breakfast gives you energy for the morning. Walking for thirty minutes a day is a simple way to stay fit.",
        glossary: { enough: "cukup", skip: "melewatkan", energy: "tenaga", simple: "sederhana", "stay fit": "tetap bugar" },
        questions: [
          { q: "How many hours of sleep do doctors recommend?", o: ["Five to six", "Seven to eight", "Nine to ten"], a: 1, e: "\"...sleeping seven to eight hours every night is important.\"" },
          { q: "Why do many people skip breakfast?", o: ["They are busy", "They are not hungry", "They are on a diet"], a: 0, e: "\"...skip breakfast because they are busy\"." },
          { q: "What is a simple way to stay fit?", o: ["Drinking coffee", "Sleeping more", "Walking thirty minutes a day"], a: 2, e: "Kalimat terakhir menyebut berjalan 30 menit sehari." }
        ]
      }
    ],
    listening: [
      { say: "I visited my grandmother yesterday." },
      { say: "The train was very crowded this morning." },
      { say: "Did you remember to bring your umbrella?" },
      { say: "I wanted to buy the blue shirt, but it was too small, so I bought the black one.", q: "Which shirt did the speaker buy?", o: ["The blue one", "The black one", "The white one"], a: 1 },
      { say: "The meeting was at ten, but Ani arrived at ten thirty because of the traffic.", q: "Why was Ani late?", o: ["She was sick", "She forgot", "Because of the traffic"], a: 2 },
      { say: "We are going to the beach next Saturday. Do you want to come with us?", q: "What is the speaker doing?", o: ["Inviting someone", "Complaining", "Apologising"], a: 0 }
    ],
    speaking: [
      ["What did you do last weekend?", "Apa yang kamu lakukan akhir pekan lalu?", "'did you' sering disambung: di-ju."],
      ["I usually go to work by car.", "Saya biasanya pergi kerja naik mobil.", "'usually' dibaca YU-zhu-a-li."],
      ["Could you help me, please?", "Bisakah kamu membantu saya?", "Intonasi naik di akhir pertanyaan sopan."],
      ["I'm sorry, I don't understand.", "Maaf, saya tidak mengerti.", "Tekanan pada un-der-STAND."],
      ["How much does this cost?", "Berapa harganya?", "'cost' dengan o pendek: kost."],
      ["I'm going to visit my parents next week.", "Saya akan mengunjungi orang tua minggu depan.", "'going to' dalam obrolan sering terdengar 'gonna'."]
    ],
    writing: {
      translate: [
        { id: "Saya pergi ke pasar kemarin.", a: ["I went to the market yesterday", "Yesterday I went to the market"], h: "go → went (past)" },
        { id: "Apakah kamu sudah makan?", a: ["Have you eaten", "Have you eaten yet", "Did you eat", "Have you already eaten"], h: "Have you + V3 ...?" },
        { id: "Dia sedang membaca buku sekarang.", a: ["She is reading a book now", "He is reading a book now", "She is reading a book right now", "He is reading a book right now"], h: "is + verb-ing" },
        { id: "Kami akan berkunjung ke Bali tahun depan.", a: ["We will visit Bali next year", "We are going to visit Bali next year", "We will go to Bali next year", "We are going to Bali next year"], h: "will / be going to" }
      ],
      arrange: ["I went to the cinema last night", "What are you doing now", "She has already finished her homework"],
      grammar: [
        { q: "I ___ to Jakarta last week.", o: ["go", "went", "have gone"], a: 1, e: "'last week' = waktu lampau tertentu → simple past (went)." },
        { q: "Look! It ___.", o: ["rains", "rained", "is raining"], a: 2, e: "'Look!' menandai kejadian sekarang → present continuous." },
        { q: "This bag is ___ than that one.", o: ["cheaper", "more cheap", "cheapest"], a: 0, e: "Kata sifat pendek: tambah -er + than." },
        { q: "There aren't ___ eggs in the fridge.", o: ["some", "any", "much"], a: 1, e: "Kalimat negatif dengan benda jamak memakai 'any'." }
      ]
    },
    journal: { prompt: "Apa yang kamu lakukan akhir pekan lalu? Gunakan bentuk lampau (went, ate, visited...).", min: 50 }
  },
  {
    id: "B1", name: "Menengah", desc: "Opini, pengalaman, perfect tense, kalimat pasif dan kondisional.",
    vocab: [
      ["although", "meskipun", "Although it rained, we went out."],
      ["improve", "meningkatkan", "I want to improve my English."],
      ["opportunity", "kesempatan", "This job is a great opportunity."],
      ["afford", "mampu (membeli/membayar)", "I can't afford a new car."],
      ["complain", "mengeluh", "Customers complained about the service."],
      ["environment", "lingkungan", "We must protect the environment."],
      ["reduce", "mengurangi", "We need to reduce plastic waste."],
      ["behaviour", "perilaku", "His behaviour has changed."],
      ["recently", "baru-baru ini", "I have recently moved."],
      ["achieve", "mencapai", "She achieved her goal."],
      ["suggest", "menyarankan", "I suggest taking a taxi."],
      ["consider", "mempertimbangkan", "Please consider my offer."]
    ],
    reading: [
      {
        title: "Working from Home",
        text: "Since 2020, many companies have allowed their employees to work from home. Some workers say they are more productive because they do not waste time in traffic. However, others feel lonely and find it difficult to separate work from family life. Experts suggest creating a fixed schedule and a dedicated workspace. As a result, many companies now use a hybrid system, where employees work in the office two or three days a week.",
        glossary: { allowed: "mengizinkan", employees: "karyawan", waste: "membuang (waktu)", lonely: "kesepian", separate: "memisahkan", dedicated: "khusus", "as a result": "akibatnya" },
        questions: [
          { q: "Why do some workers feel more productive at home?", o: ["They earn more money", "They don't waste time in traffic", "They work fewer hours"], a: 1, e: "\"...because they do not waste time in traffic.\"" },
          { q: "What problem do other workers have?", o: ["Feeling lonely", "Slow internet", "Too many meetings"], a: 0, e: "\"...others feel lonely and find it difficult to separate work from family life.\"" },
          { q: "What is a hybrid system?", o: ["Working only at home", "Working in two companies", "Working some days in the office"], a: 2, e: "\"...work in the office two or three days a week.\"" }
        ]
      },
      {
        title: "Plastic Waste",
        text: "Indonesia produces millions of tons of plastic waste every year, and a large amount ends up in rivers and the sea. Several cities have banned single-use plastic bags in supermarkets. Although some shoppers complained at first, most people have now got used to bringing their own bags. Environmental groups believe that small changes in daily behaviour can reduce pollution significantly.",
        glossary: { "ends up": "berakhir (di)", banned: "melarang", "single-use": "sekali pakai", "at first": "awalnya", "got used to": "terbiasa", significantly: "secara signifikan" },
        questions: [
          { q: "Where does a large amount of plastic waste end up?", o: ["In factories", "In rivers and the sea", "In supermarkets"], a: 1, e: "\"...a large amount ends up in rivers and the sea.\"" },
          { q: "What have several cities banned?", o: ["Single-use plastic bags", "Plastic bottles", "Supermarkets"], a: 0, e: "\"...banned single-use plastic bags in supermarkets.\"" },
          { q: "How do most shoppers feel about the ban now?", o: ["They are still angry", "They have got used to it", "They don't know about it"], a: 1, e: "\"...most people have now got used to bringing their own bags.\"" }
        ]
      }
    ],
    listening: [
      { say: "Although it was raining, we decided to go out." },
      { say: "I have been learning English for two years." },
      { say: "If I had more time, I would read more books." },
      { say: "I was going to take the bus, but my friend offered me a lift, so I got home earlier than expected.", q: "How did the speaker get home?", o: ["By bus", "In a friend's car", "On foot"], a: 1 },
      { say: "The library will be closed on Monday for maintenance, but it will reopen on Tuesday morning.", q: "When will the library open again?", o: ["Monday afternoon", "Tuesday morning", "Next week"], a: 1 },
      { say: "I'd recommend the chicken soup. The steak is good, but it's a bit expensive for what you get.", q: "What does the speaker think about the steak?", o: ["It's bad", "It's too small", "It's overpriced"], a: 2 }
    ],
    speaking: [
      ["I've been working here for three years.", "Saya sudah bekerja di sini selama tiga tahun.", "'I've' dibaca aiv — jangan hilangkan bunyi v."],
      ["In my opinion, public transport should be cheaper.", "Menurut saya, transportasi umum seharusnya lebih murah.", "Tekanan pada o-PIN-ion."],
      ["Would you mind opening the window?", "Maukah kamu membuka jendela?", "Setelah 'mind' pakai verb-ing."],
      ["I'm looking forward to meeting you.", "Saya menantikan pertemuan dengan Anda.", "'looking forward to' + verb-ing."],
      ["Could you tell me how to get to the station?", "Bisa beri tahu cara ke stasiun?", "'station' dibaca STAY-shun."],
      ["If it rains tomorrow, we will stay at home.", "Kalau besok hujan, kami di rumah saja.", "Jeda singkat setelah koma."]
    ],
    writing: {
      translate: [
        { id: "Saya sudah tinggal di Bogor selama sepuluh tahun.", a: ["I have lived in Bogor for ten years", "I have been living in Bogor for ten years"], h: "have + V3 + for" },
        { id: "Jika kamu belajar dengan giat, kamu akan lulus ujian.", a: ["If you study hard, you will pass the exam", "If you study hard, you will pass the test"], h: "If + present, will + verb" },
        { id: "Meskipun lelah, dia tetap bekerja.", a: ["Although she was tired, she kept working", "Although he was tired, he kept working", "Although she was tired, she continued working", "Although he was tired, he continued working", "Even though she was tired, she kept working", "Even though he was tired, he kept working", "Although tired, she kept working", "Although tired, he kept working"], h: "Although ..., ... kept working" },
        { id: "Rumah itu dibangun pada tahun 1990.", a: ["The house was built in 1990", "That house was built in 1990"], h: "Pasif: was + V3" }
      ],
      arrange: ["I have never been to Japan", "The book was written by a famous author", "She asked me where I lived"],
      grammar: [
        { q: "I ___ here since 2015.", o: ["live", "have lived", "am living"], a: 1, e: "'since + titik waktu' → present perfect." },
        { q: "If it ___ tomorrow, we'll cancel the trip.", o: ["rains", "will rain", "rained"], a: 0, e: "Conditional tipe 1: If + present simple, will + verb." },
        { q: "The letter ___ yesterday.", o: ["sent", "is sent", "was sent"], a: 2, e: "Surat tidak mengirim dirinya sendiri → pasif lampau: was sent." },
        { q: "She is interested ___ learning Japanese.", o: ["in", "on", "at"], a: 0, e: "Pasangan tetap: interested in." }
      ]
    },
    journal: { prompt: "Apa kelebihan dan kekurangan bekerja dari rumah menurutmu? Beri alasan dan contoh.", min: 80 }
  },
  {
    id: "B2", name: "Menengah Atas", desc: "Argumen, nuansa makna, past perfect, conditional 2–3, struktur formal.",
    vocab: [
      ["nevertheless", "namun demikian", "It was risky. Nevertheless, they agreed."],
      ["significant", "signifikan / berarti", "There was a significant increase."],
      ["assume", "berasumsi / mengira", "Don't assume he knows."],
      ["reluctant", "enggan", "She was reluctant to answer."],
      ["sustainable", "berkelanjutan", "We need sustainable energy."],
      ["evidence", "bukti", "There is no evidence of fraud."],
      ["widespread", "meluas", "The problem is widespread."],
      ["outcome", "hasil akhir", "The outcome was positive."],
      ["undermine", "melemahkan", "Rumours can undermine trust."],
      ["prioritise", "memprioritaskan", "Prioritise the urgent tasks."],
      ["thrive", "berkembang pesat", "Small businesses can thrive online."],
      ["drawback", "kekurangan / kelemahan", "The main drawback is the cost."]
    ],
    reading: [
      {
        title: "Social Media and Attention",
        text: "Researchers have long debated whether social media is shortening our attention spans. Some studies suggest that constant notifications train the brain to seek quick rewards, making it harder to concentrate on long tasks. Nevertheless, other experts argue that the evidence is far from conclusive and that people simply adapt their attention to the type of content they consume. What most agree on is that habits matter: turning off non-essential notifications and setting aside time for deep work can make a significant difference.",
        glossary: { debated: "memperdebatkan", "attention spans": "rentang perhatian", rewards: "imbalan", "far from conclusive": "jauh dari meyakinkan", adapt: "menyesuaikan", "setting aside": "menyisihkan" },
        questions: [
          { q: "According to some studies, what effect do constant notifications have?", o: ["They improve memory", "They make it harder to concentrate", "They reduce stress"], a: 1, e: "\"...making it harder to concentrate on long tasks.\"" },
          { q: "What do other experts argue?", o: ["The evidence is not conclusive", "Social media should be banned", "Notifications are harmless"], a: 0, e: "\"...the evidence is far from conclusive\" — buktinya belum meyakinkan." },
          { q: "Which practice does the text recommend?", o: ["Deleting all apps", "Using social media only at night", "Turning off non-essential notifications"], a: 2, e: "Kalimat terakhir: matikan notifikasi yang tidak penting dan sisihkan waktu fokus." }
        ]
      },
      {
        title: "The Rise of Electric Motorbikes",
        text: "Electric motorbikes are becoming increasingly common in Indonesian cities. Supporters point out that they produce no exhaust emissions and are cheaper to run than petrol models. However, potential buyers are often reluctant because of the limited number of charging stations and concerns about battery replacement costs. The government has introduced subsidies to encourage the switch, but analysts say that without wider infrastructure, adoption will remain slower than hoped.",
        glossary: { increasingly: "semakin", "exhaust emissions": "emisi gas buang", petrol: "bensin", reluctant: "enggan", subsidies: "subsidi", adoption: "penerapan / adopsi" },
        questions: [
          { q: "What is one advantage of electric motorbikes mentioned?", o: ["They are faster", "They are cheaper to run", "They are lighter"], a: 1, e: "\"...cheaper to run than petrol models.\"" },
          { q: "Why are some buyers reluctant?", o: ["Charging stations and battery costs", "The bikes look old-fashioned", "They are illegal in cities"], a: 0, e: "Alasannya: stasiun pengisian terbatas dan biaya ganti baterai." },
          { q: "What do analysts say is needed?", o: ["Higher prices", "Fewer subsidies", "Wider infrastructure"], a: 2, e: "\"...without wider infrastructure, adoption will remain slower than hoped.\"" }
        ]
      }
    ],
    listening: [
      { say: "The results were more significant than we had expected." },
      { say: "She is reluctant to change her daily routine." },
      { say: "By the time we arrived, the film had already started." },
      { say: "To be honest, the hotel looked much better in the photos. The room was fine, but the noise from the street kept us awake.", q: "What was the main problem with the hotel?", o: ["The room was dirty", "The street noise", "The price"], a: 1 },
      { say: "We've decided to postpone the launch until next quarter, mainly because the testing phase took longer than planned.", q: "Why was the launch postponed?", o: ["Testing took longer", "The budget was cut", "The manager left"], a: 0 },
      { say: "I'm not saying the plan is bad; I just think we should consider the costs more carefully before we commit.", q: "What is the speaker's attitude?", o: ["Enthusiastic", "Angry", "Cautious"], a: 2 }
    ],
    speaking: [
      ["I'd rather stay at home than go out tonight.", "Saya lebih memilih di rumah daripada keluar malam ini.", "'I'd rather' dibaca aid RA-ther."],
      ["It's worth considering the long-term consequences.", "Perlu dipertimbangkan akibat jangka panjangnya.", "Tekanan pada CON-se-quen-ces."],
      ["Not only is it cheaper, but it's also more convenient.", "Bukan hanya lebih murah, tapi juga lebih praktis.", "Inversi setelah 'Not only'."],
      ["I was wondering if you could give me some advice.", "Saya ingin tahu apakah Anda bisa memberi saya saran.", "Cara meminta yang sangat sopan."],
      ["There's no point in worrying about things you can't control.", "Tidak ada gunanya khawatir tentang hal di luar kendali.", "'can't' dalam British: kahnt; American: kænt."],
      ["The more you practise, the more confident you become.", "Semakin sering berlatih, semakin percaya diri.", "Pola 'the more ..., the more ...'."]
    ],
    writing: {
      translate: [
        { id: "Seandainya saya punya lebih banyak waktu, saya akan belajar bahasa Jepang.", a: ["If I had more time, I would learn Japanese", "If I had more time, I would study Japanese"], h: "If + past, would + verb" },
        { id: "Proyek itu harus diselesaikan sebelum akhir bulan.", a: ["The project must be finished before the end of the month", "The project must be completed before the end of the month", "The project has to be finished before the end of the month", "The project has to be completed before the end of the month", "The project needs to be completed before the end of the month", "The project needs to be finished before the end of the month"], h: "must be + V3" },
        { id: "Dia menyangkal telah mengambil uang itu.", a: ["He denied taking the money", "She denied taking the money", "He denied having taken the money", "She denied having taken the money"], h: "deny + verb-ing" },
        { id: "Semakin awal kita mulai, semakin cepat kita selesai.", a: ["The earlier we start, the sooner we finish", "The earlier we start, the faster we finish", "The earlier we start, the sooner we will finish", "The earlier we start, the earlier we finish"], h: "The ...-er, the ...-er" }
      ],
      arrange: ["If I had known I would have come", "She suggested that we leave early", "Not only did he win but he also broke the record"],
      grammar: [
        { q: "By next year, I ___ my degree.", o: ["will finish", "will have finished", "finish"], a: 1, e: "'By + waktu depan' → future perfect: will have + V3." },
        { q: "I wish I ___ more time.", o: ["had", "have", "will have"], a: 0, e: "'wish' untuk keinginan saat ini memakai bentuk lampau." },
        { q: "He denied ___ the window.", o: ["to break", "break", "breaking"], a: 2, e: "deny + verb-ing." },
        { q: "___ the bad weather, the event went ahead.", o: ["Although", "Despite", "However"], a: 1, e: "'Despite' + kata benda; 'Although' + kalimat lengkap." }
      ]
    },
    journal: { prompt: "Haruskah penggunaan media sosial dibatasi untuk remaja? Sampaikan pendapat dengan argumen dan kontra-argumen.", min: 120 }
  },
  {
    id: "C1", name: "Mahir", desc: "Bahasa akademik & profesional: inversi, nuansa formal, argumentasi.",
    vocab: [
      ["albeit", "meskipun (formal)", "The plan worked, albeit slowly."],
      ["notwithstanding", "terlepas dari", "Notwithstanding the delay, we finished."],
      ["ubiquitous", "ada di mana-mana", "Smartphones are ubiquitous."],
      ["mitigate", "meredam / mengurangi dampak", "Trees mitigate heat."],
      ["scrutiny", "pengawasan ketat", "The policy is under scrutiny."],
      ["inherent", "melekat / bawaan", "Every method has inherent risks."],
      ["discrepancy", "ketidaksesuaian", "There is a discrepancy in the data."],
      ["pivotal", "sangat menentukan", "It was a pivotal moment."],
      ["exacerbate", "memperburuk", "The drought exacerbated poverty."],
      ["nuanced", "bernuansa / tidak hitam-putih", "She gave a nuanced answer."],
      ["feasible", "layak dilaksanakan", "Is the project feasible?"],
      ["substantiate", "membuktikan dengan data", "Can you substantiate this claim?"]
    ],
    reading: [
      {
        title: "Academic Integrity in the Age of AI",
        text: "The ubiquitous availability of generative AI tools has placed academic integrity under unprecedented scrutiny. Universities face a pivotal choice: to restrict these tools or to integrate them into assessment design. Outright bans are difficult to enforce and may exacerbate inequalities between students who follow the rules and those who do not. A more nuanced approach, adopted by a growing number of institutions, requires students to disclose how AI was used and to substantiate their arguments through oral examinations or process portfolios. Such measures, albeit more labour-intensive, shift the focus from policing outputs to evaluating genuine understanding.",
        glossary: { unprecedented: "belum pernah terjadi", "outright bans": "larangan total", enforce: "menegakkan", disclose: "mengungkapkan", "labour-intensive": "padat karya / butuh banyak tenaga", policing: "mengawasi ketat", genuine: "sejati / asli" },
        questions: [
          { q: "Why are outright bans considered problematic?", o: ["They are too expensive", "They are hard to enforce and may worsen inequality", "Students prefer them"], a: 1, e: "Larangan total sulit ditegakkan dan bisa memperlebar ketimpangan." },
          { q: "What does the more nuanced approach require of students?", o: ["Disclosing AI use and substantiating arguments", "Never using computers", "Writing longer essays"], a: 0, e: "\"...requires students to disclose how AI was used and to substantiate their arguments...\"" },
          { q: "What is the main drawback of these measures?", o: ["They are ineffective", "They are illegal", "They require more work"], a: 2, e: "'albeit more labour-intensive' — meski butuh lebih banyak tenaga." }
        ]
      },
      {
        title: "Urban Heat Islands",
        text: "Cities are typically several degrees warmer than the surrounding countryside, a phenomenon known as the urban heat island effect. Dense concrete surfaces absorb heat during the day and release it slowly at night, while the scarcity of vegetation limits natural cooling. Notwithstanding its seemingly modest scale, the effect has serious consequences: it increases energy demand for air conditioning and heightens health risks during heatwaves. Mitigation strategies such as green roofs, reflective paving and expanded tree cover are technically feasible, yet their implementation is often hindered by cost and fragmented urban governance.",
        glossary: { surrounding: "sekitar", absorb: "menyerap", scarcity: "kelangkaan", vegetation: "tumbuhan", "seemingly modest": "tampak kecil", heightens: "meningkatkan", hindered: "terhambat", fragmented: "terpecah-pecah", governance: "tata kelola" },
        questions: [
          { q: "What causes the urban heat island effect?", o: ["Heat-absorbing concrete and little vegetation", "Air pollution only", "Rising sea levels"], a: 0, e: "Beton menyerap panas dan kurangnya tumbuhan membatasi pendinginan alami." },
          { q: "Which consequence is mentioned?", o: ["Lower electricity bills", "Higher energy demand and health risks", "More rainfall"], a: 1, e: "\"...increases energy demand... and heightens health risks during heatwaves.\"" },
          { q: "What often hinders mitigation strategies?", o: ["Lack of technology", "Public opposition", "Cost and fragmented governance"], a: 2, e: "\"...hindered by cost and fragmented urban governance.\"" }
        ]
      }
    ],
    listening: [
      { say: "The discrepancy between the two reports has yet to be explained." },
      { say: "Had we known about the risks, we would have acted differently." },
      { say: "Such measures, albeit costly, are essential in the long run." },
      { say: "While I appreciate the effort that went into this proposal, I'm not entirely convinced the budget is realistic, particularly given last year's overspending.", q: "What is the speaker's main concern?", o: ["The timeline", "Whether the budget is realistic", "The team's effort"], a: 1 },
      { say: "The findings are encouraging, but the sample was relatively small, so we should be careful not to overgeneralise.", q: "Why does the speaker urge caution?", o: ["The sample was small", "The data was lost", "The results were negative"], a: 0 },
      { say: "Far from solving the problem, the new policy seems to have made congestion even worse in the city centre.", q: "What effect did the new policy have?", o: ["It solved congestion", "It had no effect", "It made congestion worse"], a: 2 }
    ],
    speaking: [
      ["It could be argued that the benefits outweigh the drawbacks.", "Dapat dikatakan bahwa manfaatnya lebih besar daripada kekurangannya.", "Frasa akademik untuk mengajukan argumen dengan hati-hati."],
      ["Were it not for your support, I wouldn't have succeeded.", "Kalau bukan karena dukungan Anda, saya tidak akan berhasil.", "Inversi formal pengganti 'If it were not for'."],
      ["This issue warrants further investigation.", "Masalah ini perlu diselidiki lebih lanjut.", "'warrants' = layak/membutuhkan."],
      ["Rarely have I seen such a well-organised event.", "Jarang saya melihat acara serapi ini.", "Inversi setelah 'Rarely'."],
      ["I'd like to draw your attention to the final point.", "Saya ingin mengarahkan perhatian Anda ke poin terakhir.", "Cocok untuk presentasi."],
      ["On balance, I'm inclined to agree with the proposal.", "Secara keseluruhan, saya cenderung setuju dengan usulan ini.", "Ungkapan setuju yang terukur."]
    ],
    writing: {
      translate: [
        { id: "Terlepas dari kritik yang ada, kebijakan tersebut tetap dilaksanakan.", a: ["Despite the criticism, the policy was still implemented", "Notwithstanding the criticism, the policy was still implemented", "Despite the existing criticism, the policy was still implemented", "Despite criticism, the policy was still implemented", "Despite the criticism, the policy was implemented anyway"], h: "Despite / Notwithstanding + noun" },
        { id: "Seandainya mereka mendengarkan saran kami, masalah ini tidak akan terjadi.", a: ["If they had listened to our advice, this problem would not have happened", "Had they listened to our advice, this problem would not have happened", "If they had listened to our advice, this problem would not have occurred", "Had they listened to our advice, this problem would not have occurred"], h: "Conditional 3 / inversi 'Had they...'" },
        { id: "Temuan ini perlu dikaji lebih lanjut.", a: ["These findings need further investigation", "These findings warrant further investigation", "These findings need to be examined further", "This finding needs further study", "These findings need further study", "This finding needs to be studied further", "These findings need to be studied further"], h: "need / warrant further ..." },
        { id: "Jarang sekali saya melihat kinerja sebaik ini.", a: ["Rarely have I seen such a good performance", "Rarely have I seen such good performance", "I have rarely seen such a good performance", "Seldom have I seen such a good performance"], h: "Rarely have I ..." }
      ],
      arrange: ["Rarely have I seen such dedication", "Were it not for her help we would have failed", "Under no circumstances should you share your password"],
      grammar: [
        { q: "No sooner had I arrived ___ the meeting started.", o: ["when", "than", "then"], a: 1, e: "Pasangan tetap: No sooner ... than." },
        { q: "It's high time we ___ a decision.", o: ["make", "will make", "made"], a: 2, e: "'It's high time' + bentuk lampau, walau maknanya sekarang." },
        { q: "The CEO, ___ decision surprised everyone, resigned.", o: ["whose", "who", "which"], a: 0, e: "'whose' untuk kepemilikan: keputusan milik CEO." },
        { q: "Not until the results were published ___ the error.", o: ["they noticed", "did they notice", "they did notice"], a: 1, e: "Setelah 'Not until ...' di awal kalimat, terjadi inversi: did they notice." }
      ]
    },
    journal: { prompt: "Bagaimana sebaiknya universitas merespons penggunaan AI generatif oleh mahasiswa? Tulis esai singkat yang berimbang.", min: 150 }
  }
];
