// Skenario tambahan untuk pelajar sekolah — terinspirasi tema video Conversation di Drive.
// Format sama dengan scenarios.js; field `video` menautkan video Drive terkait.
window.SCENARIOS = (window.SCENARIOS || []).concat([
  {
    id: "newfriend", t: "Berkenalan di Sekolah", ic: "🧒", cat: "Sekolah", level: "A1", color: "#f59e0b", video: "1ku6xEGFPgoT_RxM8a0idqmL2qq5GLDA9",
    role: "Teman sekelas baru", you: "Murid", goal: "Sapa teman baru, sebutkan nama, umur, kelas, dan hobi.",
    phrases: [["Hi! My name is Dinda.", "Hai! Namaku Dinda."], ["I'm ten years old.", "Umurku sepuluh tahun."], ["I'm in Grade 5.", "Aku kelas 5."], ["My hobby is drawing.", "Hobiku menggambar."]],
    steps: [
      { bot: "Hi! I'm new here. My name is Tom. What's your name?", id: "Hai! Aku baru di sini. Namaku Tom. Siapa namamu?",
        opts: [{ k: ["name", "i'm", "i am"], a: "Hi Tom! My name is Dinda.", r: "Nice to meet you!" }] },
      { bot: "How old are you?", id: "Berapa umurmu?",
        opts: [{ k: ["years", "old", "nine", "ten", "eleven", "twelve"], a: "I'm ten years old.", r: "Me too! We're the same age." }] },
      { bot: "Which grade are you in?", id: "Kamu kelas berapa?",
        opts: [{ k: ["grade", "class", "five", "four", "six"], a: "I'm in Grade 5.", r: "Great, we're classmates!" }] },
      { bot: "What's your hobby?", id: "Apa hobimu?",
        opts: [{ k: ["draw", "drawing"], a: "My hobby is drawing.", r: "Cool! Can you draw me a cat?" }, { k: ["football", "soccer", "play"], a: "I like playing football.", r: "Let's play together after school!" }, { k: ["read", "book"], a: "I love reading books.", r: "The library here is great." }] },
      { bot: "It was nice to meet you. See you in class!", id: "Senang berkenalan. Sampai jumpa di kelas!",
        opts: [{ k: ["nice", "see you", "bye", "too"], a: "Nice to meet you too. See you!", r: "" }] }
    ]
  },
  {
    id: "birthday", t: "Undangan Ulang Tahun", ic: "🎂", cat: "Sekolah", level: "A2", color: "#ec4899", video: "1SPToAqyGHtCNc2il_aQwAbTub7O4yPbm",
    role: "Teman", you: "Yang diundang", goal: "Terima undangan, tanyakan waktu dan tempat, lalu ucapkan selamat.",
    phrases: [["I'd love to come!", "Aku mau sekali datang!"], ["What time does it start?", "Mulai jam berapa?"], ["Where is the party?", "Pestanya di mana?"], ["Happy birthday! This is for you.", "Selamat ulang tahun! Ini untukmu."]],
    steps: [
      { bot: "Hey! I'm having a birthday party on Saturday. Would you like to come?", id: "Hai! Aku mengadakan pesta ulang tahun hari Sabtu. Mau datang?",
        opts: [{ k: ["love", "yes", "sure", "of course"], a: "Yes, I'd love to come!", r: "Yay! I'm so happy." }, { k: ["sorry", "can't", "cannot"], a: "I'm sorry, I can't. I have to visit my grandma.", r: "Oh, that's okay. Maybe next time." }] },
      { bot: "Do you have any questions about the party?", id: "Ada yang mau kamu tanyakan tentang pestanya?",
        opts: [{ k: ["time", "when", "start"], a: "What time does it start?", r: "It starts at four in the afternoon." }, { k: ["where", "place"], a: "Where is the party?", r: "It's at my house, on Melati Street." }] },
      { bot: "Can you bring your favourite game?", id: "Bisa bawa permainan favoritmu?",
        opts: [{ k: ["sure", "yes", "okay", "ok", "bring"], a: "Sure, I'll bring my board game.", r: "Awesome!" }] },
      { bot: "(Saturday) Hi! Thanks for coming!", id: "(Hari Sabtu) Hai! Terima kasih sudah datang!",
        opts: [{ k: ["happy birthday", "birthday", "for you", "gift", "present"], a: "Happy birthday! This is for you.", r: "Wow, thank you so much! Come in!" }] }
    ]
  },
  {
    id: "permission", t: "Meminta Izin", ic: "🙋", cat: "Sekolah", level: "A2", color: "#14b8a6", video: "1IUIy796QUFs_on6bwJRpbCc73F71iC9A",
    role: "Guru", you: "Murid", goal: "Minta izin dengan sopan: ke toilet, meminjam buku, dan pulang lebih awal.",
    phrases: [["May I go to the restroom, please?", "Bolehkah saya ke toilet?"], ["Can I borrow this book?", "Boleh saya pinjam buku ini?"], ["May I leave early today?", "Bolehkah saya pulang lebih awal hari ini?"], ["Thank you, ma'am.", "Terima kasih, Bu."]],
    steps: [
      { bot: "Okay class, open your books to page twenty. Yes? Do you need something?", id: "Baik anak-anak, buka halaman dua puluh. Ya? Ada perlu sesuatu?",
        opts: [{ k: ["restroom", "toilet", "bathroom"], a: "May I go to the restroom, please?", r: "Yes, you may. Please come back quickly." }] },
      { bot: "Welcome back. Do you have your English book today?", id: "Selamat kembali. Kamu bawa buku bahasa Inggris hari ini?",
        opts: [{ k: ["borrow", "forgot", "left"], a: "I'm sorry, I forgot it. Can I borrow one from the shelf?", r: "Sure, you can borrow this one. Please return it after class." }, { k: ["yes", "have"], a: "Yes, I have it here.", r: "Good." }] },
      { bot: "Is there anything else?", id: "Ada lagi?",
        opts: [{ k: ["leave", "early", "go home", "doctor", "sick"], a: "May I leave early today? I have a doctor's appointment.", r: "Do you have a letter from your parents?" }] },
      { bot: "Please show me the letter from your parents.", id: "Tolong tunjukkan surat dari orang tuamu.",
        opts: [{ k: ["here", "letter", "this"], a: "Here it is. Thank you, ma'am.", r: "Alright, you may leave at eleven. Get well soon." }] }
    ]
  },
  {
    id: "lostitem", t: "Kehilangan Barang", ic: "🔎", cat: "Sehari-hari", level: "A2", color: "#64748b", video: "135gFWt0bLdw1VciamYmGSUYpYvH4iyoy",
    role: "Petugas bagian barang hilang", you: "Pengunjung", goal: "Laporkan barang hilang: apa, ciri-cirinya, dan di mana terakhir terlihat.",
    phrases: [["I lost my backpack.", "Ransel saya hilang."], ["It's a blue backpack with a white logo.", "Ransel biru dengan logo putih."], ["I think I left it near the entrance.", "Sepertinya saya meninggalkannya dekat pintu masuk."], ["Here is my phone number.", "Ini nomor telepon saya."]],
    steps: [
      { bot: "Good afternoon. How can I help you?", id: "Selamat siang. Ada yang bisa saya bantu?",
        opts: [{ k: ["lost", "missing", "can't find"], a: "I lost my backpack.", r: "I'm sorry to hear that." }] },
      { bot: "Can you describe it, please?", id: "Bisa Anda jelaskan ciri-cirinya?",
        opts: [{ k: ["blue", "black", "red", "color", "colour", "small", "big", "logo"], a: "It's a blue backpack with a white logo.", r: "Okay, a blue backpack with a white logo." }] },
      { bot: "Where did you last see it?", id: "Di mana terakhir Anda melihatnya?",
        opts: [{ k: ["near", "at", "in", "entrance", "cafe", "toilet", "bench"], a: "I think I left it near the entrance.", r: "Let me check our list." }] },
      { bot: "What's inside the backpack?", id: "Apa isi ranselnya?",
        opts: [{ k: ["book", "laptop", "wallet", "phone", "bottle", "inside"], a: "There are two books and a water bottle inside.", r: "We haven't found it yet, but we'll keep looking." }] },
      { bot: "Can I have your phone number so we can contact you?", id: "Boleh minta nomor telepon Anda agar kami bisa menghubungi?",
        opts: [{ k: ["number", "zero", "0", "eight", "here"], a: "Sure. Here is my phone number: 0812 3456 7890.", r: "Thank you. We'll call you if we find it." }] }
    ]
  },
  {
    id: "advice", t: "Memberi Saran ke Teman", ic: "🤝", cat: "Sekolah", level: "B1", color: "#8b5cf6", video: "1YC5RZn-paa29DAezzjHezbqzrtj7n9Yb",
    role: "Teman yang sedang bingung", you: "Pemberi saran", goal: "Dengarkan masalah teman, beri saran dengan should / why don't you / you'd better.",
    phrases: [["You should make a study plan.", "Kamu sebaiknya membuat rencana belajar."], ["Why don't you ask the teacher?", "Kenapa tidak bertanya ke guru?"], ["You'd better get some sleep.", "Sebaiknya kamu tidur dulu."], ["Don't worry, you'll be fine.", "Jangan khawatir, kamu pasti bisa."]],
    steps: [
      { bot: "I'm so stressed. The final exam is next week and I haven't started studying.", id: "Aku stres sekali. Ujian akhir minggu depan dan aku belum mulai belajar.",
        opts: [{ k: ["should", "plan", "schedule", "start"], a: "You should make a study plan and start today.", r: "That's a good idea. But math is really hard for me." }, { k: ["don't worry", "fine", "calm"], a: "Don't worry, you still have time. Let's make a plan.", r: "Thanks. But math is really hard for me." }] },
      { bot: "I don't understand the lessons about fractions at all.", id: "Aku sama sekali tidak paham pelajaran pecahan.",
        opts: [{ k: ["why don't you", "ask", "teacher", "help", "tutor"], a: "Why don't you ask the teacher for extra help?", r: "Maybe I will. Can we study together too?" }] },
      { bot: "Can we study together after school?", id: "Bisa belajar bersama sepulang sekolah?",
        opts: [{ k: ["sure", "yes", "of course", "okay"], a: "Sure! Let's study at the library after school.", r: "Great. I also stayed up late last night and I'm so tired." }] },
      { bot: "I'm so tired. I only slept four hours.", id: "Aku capek sekali. Aku cuma tidur empat jam.",
        opts: [{ k: ["better", "sleep", "rest"], a: "You'd better get some sleep tonight.", r: "You're right. Thanks for your advice!" }] }
    ]
  }
]);
