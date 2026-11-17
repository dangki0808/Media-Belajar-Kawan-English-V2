// Teman Bicara — latihan percakapan suara (roleplay & ngobrol bebas)
// Skenario: tiap langkah berisi ucapan partner (bot), terjemahan (id), dan pilihan jawaban (opts).
//   opts[].k = kata kunci untuk mengenali maksud jawaban, opts[].a = contoh jawaban natural,
//   opts[].r = tanggapan partner bila jawaban cocok (opsional).
window.SCENARIOS = [
  {
    id: "restaurant", t: "Memesan di Restoran", ic: "🍝", cat: "Sehari-hari", level: "A2", color: "#e2553f",
    role: "Pelayan restoran", you: "Tamu", goal: "Pesan tempat duduk, makanan, minuman, lalu minta tagihan.",
    phrases: [["A table for two, please.", "Meja untuk dua orang."], ["Could I see the menu?", "Boleh saya lihat menunya?"], ["I'd like the grilled chicken.", "Saya mau ayam panggang."], ["Could we have the bill, please?", "Boleh minta tagihannya?"]],
    steps: [
      { bot: "Good evening! Welcome to Sunset Grill. How many people are in your group?", id: "Selamat malam! Selamat datang. Berapa orang dalam rombongan Anda?",
        opts: [{ k: ["two", "2", "couple"], a: "A table for two, please.", r: "Perfect, a table for two." }, { k: ["one", "just me", "alone"], a: "Just one, please.", r: "Of course, a table for one." }, { k: ["three", "four", "five", "family"], a: "There are four of us.", r: "Great, I have a big table for you." }] },
      { bot: "Here is your table and the menu. Can I get you something to drink first?", id: "Ini meja dan menunya. Mau pesan minum dulu?",
        opts: [{ k: ["water"], a: "Just water, please.", r: "Still or sparkling? I'll bring still water." }, { k: ["juice", "orange", "mango"], a: "I'd like an orange juice, please.", r: "One orange juice, coming right up." }, { k: ["tea", "coffee"], a: "A hot tea, please.", r: "Sure, one hot tea." }] },
      { bot: "Are you ready to order your main course?", id: "Sudah siap memesan hidangan utama?",
        opts: [{ k: ["chicken"], a: "Yes, I'd like the grilled chicken, please.", r: "Good choice. The grilled chicken comes with rice or fries." }, { k: ["fish", "salmon"], a: "I'll have the salmon, please.", r: "The salmon is excellent today. It comes with rice or fries." }, { k: ["vegetarian", "salad", "vegetable"], a: "Do you have any vegetarian dishes?", r: "Yes, our vegetable pasta is very popular. It comes with salad." }, { k: ["recommend", "suggest", "popular"], a: "What do you recommend?", r: "I recommend the grilled chicken. It comes with rice or fries." }] },
      { bot: "Would you like rice or fries with that?", id: "Mau pakai nasi atau kentang goreng?",
        opts: [{ k: ["rice"], a: "Rice, please.", r: "Rice it is." }, { k: ["fries", "potato", "chips"], a: "Fries, please.", r: "Fries it is." }] },
      { bot: "How was everything? Can I get you anything else?", id: "Bagaimana makanannya? Ada lagi yang bisa saya bantu?",
        opts: [{ k: ["bill", "check", "pay"], a: "It was delicious, thank you. Could we have the bill, please?", r: "Of course. I'll bring the bill right away." }, { k: ["dessert", "ice cream", "cake"], a: "Could I see the dessert menu?", r: "Sure. After dessert, I'll bring the bill." }, { k: ["no", "nothing", "fine", "good", "delicious"], a: "No, thank you. It was delicious.", r: "Wonderful. Here is your bill." }] },
      { bot: "Your total is twenty-five dollars. Will you pay by cash or card?", id: "Totalnya dua puluh lima dolar. Bayar tunai atau kartu?",
        opts: [{ k: ["card", "credit", "debit"], a: "By card, please.", r: "Thank you! Have a lovely evening." }, { k: ["cash"], a: "I'll pay in cash. Keep the change.", r: "That's very kind. Have a lovely evening!" }] }
    ]
  },
  {
    id: "hotel", t: "Check-in Hotel", ic: "🏨", cat: "Perjalanan", level: "A2", color: "#2a6fdb",
    role: "Resepsionis hotel", you: "Tamu", goal: "Check-in, tanyakan sarapan dan Wi-Fi, minta bantuan.",
    phrases: [["I have a reservation under the name ...", "Saya sudah reservasi atas nama ..."], ["What time is breakfast?", "Sarapan jam berapa?"], ["What's the Wi-Fi password?", "Apa kata sandi Wi-Fi-nya?"], ["What time is check-out?", "Check-out jam berapa?"]],
    steps: [
      { bot: "Good afternoon, welcome to Harbor Hotel. Do you have a reservation?", id: "Selamat siang. Apakah Anda sudah reservasi?",
        opts: [{ k: ["yes", "reservation", "booked", "name"], a: "Yes, I have a reservation under the name Andi Pratama.", r: "Let me check. Yes, a double room for three nights." }, { k: ["no", "available", "any rooms"], a: "No, I don't. Do you have any rooms available tonight?", r: "You're lucky, we have one double room left for three nights." }] },
      { bot: "May I see your passport or ID card, please?", id: "Boleh saya lihat paspor atau KTP Anda?",
        opts: [{ k: ["here", "sure", "passport", "id"], a: "Sure, here you are.", r: "Thank you. Everything is in order." }] },
      { bot: "Your room is on the fifth floor. Do you have any questions?", id: "Kamar Anda di lantai lima. Ada pertanyaan?",
        opts: [{ k: ["breakfast"], a: "Yes, what time is breakfast?", r: "Breakfast is from six thirty to ten in the restaurant on the first floor." }, { k: ["wifi", "wi-fi", "internet", "password"], a: "What's the Wi-Fi password?", r: "The password is on your key card holder: harbor2026." }, { k: ["check out", "checkout", "check-out"], a: "What time is check-out?", r: "Check-out is at twelve noon." }] },
      { bot: "Is there anything else I can help you with?", id: "Ada lagi yang bisa saya bantu?",
        opts: [{ k: ["luggage", "bags", "suitcase"], a: "Could someone help me with my luggage?", r: "Of course, our porter will bring your bags up." }, { k: ["taxi", "airport"], a: "Could you book a taxi to the airport for Friday morning?", r: "No problem. I'll book a taxi for seven a.m. on Friday." }, { k: ["no", "that's all", "thank"], a: "No, that's all. Thank you very much.", r: "You're welcome." }] },
      { bot: "Here is your key card. Enjoy your stay!", id: "Ini kartu kunci Anda. Selamat menikmati masa menginap!",
        opts: [{ k: ["thank", "thanks"], a: "Thank you. Have a nice day!", r: "You too!" }] }
    ]
  },
  {
    id: "airport", t: "Check-in di Bandara", ic: "✈️", cat: "Perjalanan", level: "A2", color: "#0f8a7e",
    role: "Petugas check-in maskapai", you: "Penumpang", goal: "Check-in, pilih kursi, urus bagasi, tanyakan gate.",
    phrases: [["I'd like a window seat, please.", "Saya mau kursi dekat jendela."], ["I have one bag to check in.", "Saya punya satu tas untuk bagasi."], ["Which gate is it?", "Gerbang berapa?"], ["Is the flight on time?", "Apakah penerbangannya tepat waktu?"]],
    steps: [
      { bot: "Good morning. Where are you flying to today?", id: "Selamat pagi. Hari ini terbang ke mana?",
        opts: [{ k: ["singapore"], a: "I'm flying to Singapore.", r: "Singapore, flight KA 205." }, { k: ["tokyo", "japan"], a: "I'm flying to Tokyo.", r: "Tokyo, flight KA 881." }, { k: ["to", "flying", "going"], a: "I'm flying to Kuala Lumpur.", r: "Great, I found your booking." }] },
      { bot: "Would you prefer a window seat or an aisle seat?", id: "Mau kursi dekat jendela atau lorong?",
        opts: [{ k: ["window"], a: "A window seat, please.", r: "Seat 23A, by the window." }, { k: ["aisle"], a: "An aisle seat, please.", r: "Seat 23C, on the aisle." }] },
      { bot: "How many bags are you checking in?", id: "Berapa tas yang akan masuk bagasi?",
        opts: [{ k: ["one", "1"], a: "Just one bag.", r: "Please put it on the scale. Eighteen kilos, that's fine." }, { k: ["two", "2"], a: "Two bags, please.", r: "Your ticket includes one bag. The second bag is thirty dollars." }, { k: ["none", "no", "carry", "hand"], a: "None. I only have carry-on luggage.", r: "Perfect, no checked bags." }] },
      { bot: "Did you pack your bag yourself, and are you carrying any liquids or batteries?", id: "Apakah Anda mengemas tas sendiri, dan ada cairan atau baterai?",
        opts: [{ k: ["yes", "myself", "no liquids", "no"], a: "Yes, I packed it myself, and there are no liquids or batteries.", r: "Thank you." }, { k: ["power bank", "battery", "laptop"], a: "I have a power bank in my carry-on bag.", r: "That's fine. Power banks must stay in your carry-on." }] },
      { bot: "Here is your boarding pass. Do you have any questions?", id: "Ini boarding pass Anda. Ada pertanyaan?",
        opts: [{ k: ["gate"], a: "Which gate is it?", r: "Gate D7. Boarding starts at nine fifteen." }, { k: ["time", "on time", "delay"], a: "Is the flight on time?", r: "Yes, it's on time. Boarding starts at nine fifteen at gate D7." }, { k: ["no", "thank"], a: "No, thank you.", r: "Have a pleasant flight!" }] }
    ]
  },
  {
    id: "directions", t: "Bertanya Arah", ic: "🗺️", cat: "Sehari-hari", level: "A1", color: "#d98a10",
    role: "Warga lokal", you: "Wisatawan", goal: "Tanyakan jalan ke stasiun dan pastikan petunjuknya.",
    phrases: [["Excuse me, where is the train station?", "Permisi, stasiun kereta di mana?"], ["Is it far from here?", "Apakah jauh dari sini?"], ["Turn left / turn right.", "Belok kiri / belok kanan."], ["Go straight.", "Jalan lurus."]],
    steps: [
      { bot: "Hi there! You look lost. Can I help you?", id: "Halo! Sepertinya Anda tersesat. Bisa saya bantu?",
        opts: [{ k: ["station", "train"], a: "Yes, please. Where is the train station?", r: "The train station? Sure." }, { k: ["museum"], a: "Excuse me, how do I get to the museum?", r: "The museum is next to the train station." }, { k: ["yes", "please", "where"], a: "Yes, please. I'm looking for the train station.", r: "No problem." }] },
      { bot: "Go straight for two blocks, then turn left at the bank.", id: "Jalan lurus dua blok, lalu belok kiri di bank.",
        opts: [{ k: ["far", "walk", "minutes"], a: "Is it far from here?", r: "Not really, it's about ten minutes on foot." }, { k: ["left", "bank", "repeat", "again"], a: "Sorry, could you repeat that? Turn left at the bank?", r: "Yes, two blocks straight, then left at the bank." }] },
      { bot: "After the bank, the station is on your right, opposite a big park.", id: "Setelah bank, stasiunnya di sebelah kanan, di seberang taman besar.",
        opts: [{ k: ["right", "park", "opposite"], a: "So it's on the right, opposite the park. Got it.", r: "Exactly!" }, { k: ["bus", "taxi"], a: "Is there a bus I can take?", r: "Bus number twelve stops there, but walking is faster." }] },
      { bot: "Do you need anything else?", id: "Ada lagi yang dibutuhkan?",
        opts: [{ k: ["no", "thank", "thanks"], a: "No, that's all. Thank you so much!", r: "You're welcome. Have a great day!" }] }
    ]
  },
  {
    id: "shopping", t: "Belanja Pakaian", ic: "🛍️", cat: "Sehari-hari", level: "A1", color: "#a2457a",
    role: "Pramuniaga toko", you: "Pembeli", goal: "Cari ukuran, coba baju, tanyakan harga dan bayar.",
    phrases: [["Do you have this in medium?", "Ada ukuran M?"], ["Can I try it on?", "Boleh saya coba?"], ["How much is it?", "Berapa harganya?"], ["I'll take it.", "Saya ambil ini."]],
    steps: [
      { bot: "Hello! Are you looking for anything special today?", id: "Halo! Sedang mencari sesuatu?",
        opts: [{ k: ["shirt", "t-shirt"], a: "Yes, I'm looking for a shirt.", r: "Our shirts are over here." }, { k: ["jacket"], a: "I'm looking for a jacket.", r: "Our jackets are over here." }, { k: ["just looking", "looking around", "browsing"], a: "I'm just looking, thanks.", r: "Sure. By the way, shirts are thirty percent off today." }] },
      { bot: "What size do you need?", id: "Butuh ukuran berapa?",
        opts: [{ k: ["small", "s"], a: "Small, please.", r: "Here's a small." }, { k: ["medium", "m"], a: "Do you have this in medium?", r: "Yes, here's a medium." }, { k: ["large", "l", "big"], a: "Large, please.", r: "Here's a large." }] },
      { bot: "Would you like to try it on? The fitting room is over there.", id: "Mau dicoba? Kamar pas ada di sana.",
        opts: [{ k: ["yes", "try", "please"], a: "Yes, can I try it on?", r: "Of course. How does it fit?" }, { k: ["no", "fine"], a: "No, I think it's fine.", r: "Okay." }] },
      { bot: "It looks great on you! Do you want it in another color?", id: "Bagus sekali dipakai! Mau warna lain?",
        opts: [{ k: ["blue", "black", "white", "red", "color", "colour"], a: "Do you have it in blue?", r: "Yes, we have blue too." }, { k: ["no", "this one", "like"], a: "No, I like this one.", r: "Great choice." }] },
      { bot: "Anything else?", id: "Ada lagi?",
        opts: [{ k: ["how much", "price", "cost"], a: "How much is it?", r: "It's twenty dollars after the discount." }, { k: ["take", "buy"], a: "I'll take it. How much is it?", r: "It's twenty dollars after the discount." }] },
      { bot: "Would you like a bag?", id: "Mau pakai kantong?",
        opts: [{ k: ["no", "own bag"], a: "No, thanks. I have my own bag.", r: "Thank you for shopping with us!" }, { k: ["yes", "please"], a: "Yes, please.", r: "Here you are. Thank you for shopping with us!" }] }
    ]
  },
  {
    id: "doctor", t: "Konsultasi ke Dokter", ic: "🩺", cat: "Kesehatan", level: "B1", color: "#1f9d55",
    role: "Dokter", you: "Pasien", goal: "Jelaskan gejala, lama sakit, alergi, dan pahami saran dokter.",
    phrases: [["I've had a headache for three days.", "Saya sakit kepala sudah tiga hari."], ["I have a sore throat.", "Tenggorokan saya sakit."], ["I'm allergic to penicillin.", "Saya alergi penisilin."], ["How often should I take it?", "Seberapa sering saya minum obatnya?"]],
    steps: [
      { bot: "Hello, please have a seat. What seems to be the problem?", id: "Halo, silakan duduk. Apa keluhannya?",
        opts: [{ k: ["headache", "head"], a: "I've had a bad headache.", r: "I see, a headache." }, { k: ["fever", "hot"], a: "I've had a fever.", r: "I see, a fever." }, { k: ["throat", "cough", "cold", "flu"], a: "I have a sore throat and a cough.", r: "I see, a sore throat and a cough." }, { k: ["stomach"], a: "I have a stomachache.", r: "I see, a stomachache." }] },
      { bot: "How long have you had these symptoms?", id: "Sudah berapa lama gejalanya?",
        opts: [{ k: ["day", "days", "since", "week"], a: "I've had them for three days.", r: "Three days. Okay." }] },
      { bot: "Do you have any other symptoms, like a fever or a runny nose?", id: "Ada gejala lain, misalnya demam atau pilek?",
        opts: [{ k: ["yes", "fever", "nose", "tired"], a: "Yes, I also have a slight fever and I feel tired.", r: "Let me check your temperature. It's thirty-eight degrees." }, { k: ["no", "only"], a: "No, just that.", r: "Let me check your temperature. It's normal." }] },
      { bot: "Are you allergic to any medicine?", id: "Apakah Anda alergi obat tertentu?",
        opts: [{ k: ["no", "not"], a: "No, I'm not allergic to any medicine.", r: "Good." }, { k: ["yes", "allergic", "penicillin"], a: "Yes, I'm allergic to penicillin.", r: "Thank you for telling me. I'll prescribe something else." }] },
      { bot: "It looks like a viral infection. Take this medicine and get plenty of rest. Do you have any questions?", id: "Sepertinya infeksi virus. Minum obat ini dan banyak istirahat. Ada pertanyaan?",
        opts: [{ k: ["how often", "times", "take"], a: "How often should I take the medicine?", r: "Three times a day, after meals, for five days." }, { k: ["work", "office", "school"], a: "Can I go to work tomorrow?", r: "I'd recommend staying home for two days." }, { k: ["no", "thank"], a: "No, thank you, doctor.", r: "Get well soon." }] },
      { bot: "If you don't feel better in five days, please come back. Take care!", id: "Jika lima hari belum membaik, silakan kembali. Jaga diri!",
        opts: [{ k: ["thank", "will", "okay"], a: "I will. Thank you very much, doctor.", r: "You're welcome. Get well soon!" }] }
    ]
  },
  {
    id: "interview", t: "Wawancara Kerja", ic: "💼", cat: "Karier", level: "B1", color: "#14324f",
    role: "Pewawancara HR", you: "Kandidat", goal: "Perkenalkan diri, jelaskan kekuatan, pengalaman, dan alasan melamar.",
    phrases: [["I have five years of experience in ...", "Saya punya pengalaman lima tahun di ..."], ["One of my strengths is ...", "Salah satu kekuatan saya adalah ..."], ["I'm interested in this position because ...", "Saya tertarik dengan posisi ini karena ..."], ["Could you tell me more about the team?", "Bisa ceritakan lebih banyak tentang timnya?"]],
    steps: [
      { bot: "Thank you for coming in today. Could you tell me a little about yourself?", id: "Terima kasih sudah datang. Bisa ceritakan sedikit tentang diri Anda?",
        opts: [{ k: ["name", "graduated", "work", "experience", "years"], a: "Sure. My name is Rina. I graduated in management and I have five years of experience in marketing.", r: "That's a strong background." }] },
      { bot: "What would you say is your greatest strength?", id: "Apa kekuatan terbesar Anda?",
        opts: [{ k: ["strength", "organized", "team", "communication", "problem", "fast", "hard"], a: "One of my strengths is communication. I can explain complex ideas clearly to different people.", r: "Communication is very important in this role." }] },
      { bot: "Can you describe a challenge you faced at work and how you handled it?", id: "Ceritakan tantangan di tempat kerja dan cara Anda mengatasinya.",
        opts: [{ k: ["deadline", "problem", "challenge", "project", "solved", "handled", "team"], a: "Last year we had a very tight deadline. I divided the tasks, held short daily meetings, and we finished on time.", r: "Good example. You stayed organized under pressure." }] },
      { bot: "Why are you interested in this position?", id: "Mengapa Anda tertarik dengan posisi ini?",
        opts: [{ k: ["because", "interested", "company", "grow", "learn", "opportunity"], a: "I'm interested in this position because your company is growing fast and I want to use my skills to help it grow.", r: "We appreciate that." }] },
      { bot: "Do you have any questions for us?", id: "Ada pertanyaan untuk kami?",
        opts: [{ k: ["team", "training", "next step", "culture", "day", "start"], a: "Yes. Could you tell me more about the team and the next steps in the process?", r: "Of course. It's a team of six, and we'll contact you within a week." }, { k: ["no"], a: "Not at the moment. Thank you for your time.", r: "Thank you. We'll contact you within a week." }] }
    ]
  },
  {
    id: "smalltalk", t: "Basa-basi dengan Kolega Baru", ic: "☕", cat: "Karier", level: "B1", color: "#6b4fc8",
    role: "Kolega dari kantor cabang luar negeri", you: "Karyawan", goal: "Mengobrol santai: asal, pekerjaan, akhir pekan, rekomendasi kuliner.",
    phrases: [["Nice to meet you too.", "Senang bertemu juga."], ["How long have you been here?", "Sudah berapa lama di sini?"], ["What do you do in your free time?", "Apa yang Anda lakukan di waktu luang?"], ["You should try ...", "Kamu harus mencoba ..."]],
    steps: [
      { bot: "Hi, I'm Tom from the Sydney office. I don't think we've met.", id: "Hai, saya Tom dari kantor Sydney. Sepertinya kita belum kenal.",
        opts: [{ k: ["nice", "meet", "name", "i'm"], a: "Hi Tom, nice to meet you. I'm Dewi from the finance team.", r: "Nice to meet you, Dewi." }] },
      { bot: "How long have you worked here?", id: "Sudah berapa lama bekerja di sini?",
        opts: [{ k: ["year", "years", "month", "since"], a: "I've worked here for about three years. How about you?", r: "I joined two months ago, so I'm still new." }] },
      { bot: "This is my first time in Jakarta. Any food I should try?", id: "Ini pertama kali saya ke Jakarta. Ada makanan yang harus saya coba?",
        opts: [{ k: ["try", "should", "satay", "sate", "rendang", "nasi", "soto", "gado"], a: "You should definitely try satay. There's a great place near the office.", r: "Satay? Sounds delicious. I'll try it tonight." }] },
      { bot: "So, what do you like to do on weekends?", id: "Biasanya apa yang kamu lakukan di akhir pekan?",
        opts: [{ k: ["like", "usually", "enjoy", "play", "watch", "go", "family"], a: "I usually spend time with my family, and sometimes I go cycling.", r: "That sounds nice. I love cycling too." }] },
      { bot: "Well, I should get back to my desk. It was nice talking to you!", id: "Saya harus kembali ke meja. Senang ngobrol denganmu!",
        opts: [{ k: ["nice", "you too", "see", "later"], a: "You too, Tom. See you around!", r: "See you!" }] }
    ]
  },
  {
    id: "complaint", t: "Komplain ke Layanan Pelanggan", ic: "📞", cat: "Sehari-hari", level: "B1", color: "#c0392b",
    role: "Petugas call center toko online", you: "Pelanggan", goal: "Laporkan pesanan yang rusak, berikan data, minta penggantian.",
    phrases: [["I'm calling about my order.", "Saya menelepon soal pesanan saya."], ["The item arrived damaged.", "Barangnya datang dalam keadaan rusak."], ["My order number is ...", "Nomor pesanan saya ..."], ["I'd like a replacement, please.", "Saya ingin penggantian."]],
    steps: [
      { bot: "Thank you for calling ShopNow customer service. How can I help you?", id: "Terima kasih telah menghubungi layanan pelanggan. Ada yang bisa dibantu?",
        opts: [{ k: ["order", "damaged", "broken", "problem", "wrong"], a: "Hi, I'm calling about my order. The item arrived damaged.", r: "I'm sorry to hear that." }] },
      { bot: "Could I have your order number, please?", id: "Boleh minta nomor pesanannya?",
        opts: [{ k: ["number", "order", "it's", "is"], a: "Yes, my order number is 4 5 8 2 1.", r: "Thank you. I can see a blender delivered yesterday." }] },
      { bot: "Can you describe the problem with the item?", id: "Bisa jelaskan masalah barangnya?",
        opts: [{ k: ["crack", "broken", "doesn't work", "not working", "damaged", "box"], a: "The glass jar is cracked and the machine doesn't turn on.", r: "That's definitely not acceptable." }] },
      { bot: "Would you prefer a replacement or a full refund?", id: "Anda lebih memilih penggantian atau pengembalian dana penuh?",
        opts: [{ k: ["replacement", "replace", "new one"], a: "I'd like a replacement, please.", r: "No problem. We'll send a new one within three days." }, { k: ["refund", "money"], a: "I'd prefer a full refund, please.", r: "Certainly. The refund will reach your account in five working days." }] },
      { bot: "Is there anything else I can do for you?", id: "Ada lagi yang bisa saya bantu?",
        opts: [{ k: ["return", "pick up", "send back"], a: "Do I need to send the broken one back?", r: "Our courier will pick it up for free." }, { k: ["no", "thank"], a: "No, that's all. Thank you for your help.", r: "Thank you for your patience. Have a good day!" }] }
    ]
  },
  {
    id: "conference", t: "Tanya-Jawab di Konferensi", ic: "🎤", cat: "Akademik", level: "B2", color: "#1d6fb8",
    role: "Moderator & penanya di konferensi internasional", you: "Pemakalah (dosen/peneliti)", goal: "Jawab pertanyaan tentang penelitian: metode, temuan, keterbatasan.",
    phrases: [["Thank you for your question.", "Terima kasih atas pertanyaannya."], ["Our main finding is that ...", "Temuan utama kami adalah ..."], ["One limitation of this study is ...", "Salah satu keterbatasan penelitian ini ..."], ["That's a great point. In future research, we plan to ...", "Poin yang bagus. Penelitian berikutnya, kami berencana ..."]],
    steps: [
      { bot: "Thank you for your presentation. Could you briefly summarize your main finding?", id: "Terima kasih atas presentasinya. Bisa ringkas temuan utama Anda?",
        opts: [{ k: ["finding", "found", "show", "result", "significant"], a: "Thank you. Our main finding is that blended learning significantly improved students' speaking scores.", r: "Interesting." }] },
      { bot: "How did you collect your data?", id: "Bagaimana Anda mengumpulkan data?",
        opts: [{ k: ["survey", "interview", "questionnaire", "test", "observation", "participants", "collected"], a: "We collected data through a pre-test and post-test, and we interviewed twenty students.", r: "A mixed-methods design, then." }] },
      { bot: "What are the limitations of your study?", id: "Apa keterbatasan penelitian Anda?",
        opts: [{ k: ["limitation", "sample", "small", "only", "one university", "short"], a: "One limitation is the small sample size from only one university, so the results may not be generalizable.", r: "Thank you for being transparent." }] },
      { bot: "Do you think the results would be different in rural schools?", id: "Apakah hasilnya akan berbeda di sekolah pedesaan?",
        opts: [{ k: ["possibly", "might", "may", "think", "internet", "access", "future"], a: "That's a great point. They might be different because of limited internet access. We plan to study that in future research.", r: "I look forward to reading it." }] },
      { bot: "We're out of time. Thank you very much for a fascinating talk.", id: "Waktu habis. Terima kasih atas presentasi yang menarik.",
        opts: [{ k: ["thank"], a: "Thank you for having me, and thank you all for your questions.", r: "Let's give a round of applause!" }] }
    ]
  },
  {
    id: "meeting", t: "Menyampaikan Pendapat di Rapat", ic: "📊", cat: "Karier", level: "B2", color: "#7f8c22",
    role: "Manajer proyek", you: "Anggota tim", goal: "Beri pendapat, setuju/tidak setuju dengan sopan, usulkan solusi.",
    phrases: [["In my opinion, ...", "Menurut saya, ..."], ["I see your point, but ...", "Saya paham maksud Anda, tapi ..."], ["What if we ...?", "Bagaimana kalau kita ...?"], ["Could you clarify what you mean by ...?", "Bisa jelaskan maksud Anda dengan ...?"]],
    steps: [
      { bot: "Let's start. Sales dropped ten percent last quarter. What do you think the main reason is?", id: "Ayo mulai. Penjualan turun sepuluh persen kuartal lalu. Menurutmu apa penyebab utamanya?",
        opts: [{ k: ["opinion", "think", "because", "reason", "price", "competitor", "marketing"], a: "In my opinion, the main reason is that our competitors lowered their prices.", r: "That's possible." }] },
      { bot: "I think we should simply cut our prices too. Do you agree?", id: "Saya pikir kita turunkan harga saja. Setuju?",
        opts: [{ k: ["but", "disagree", "not sure", "however", "point"], a: "I see your point, but cutting prices could hurt our profit. Maybe we can add more value instead.", r: "Add more value? Go on." }, { k: ["agree", "yes"], a: "I agree, but only for a limited time, as a promotion.", r: "A limited promotion could work." }] },
      { bot: "What exactly do you suggest?", id: "Apa tepatnya usulmu?",
        opts: [{ k: ["what if", "suggest", "could", "free", "bundle", "delivery", "loyalty"], a: "What if we offer free delivery and a loyalty program for regular customers?", r: "I like that idea." }] },
      { bot: "How would we measure if it works?", id: "Bagaimana kita mengukur keberhasilannya?",
        opts: [{ k: ["measure", "track", "compare", "sales", "data", "month"], a: "We could track repeat orders and compare monthly sales for the next three months.", r: "Clear and measurable. Good." }] },
      { bot: "Great. Can you prepare a short proposal by Friday?", id: "Bagus. Bisa siapkan proposal singkat paling lambat Jumat?",
        opts: [{ k: ["yes", "sure", "will", "no problem"], a: "Sure, I'll send it by Friday afternoon.", r: "Perfect. Thanks, everyone." }] }
    ]
  }
];

// Ngobrol bebas: partner menanyakan beberapa pertanyaan tentang satu topik.
window.TALK_TOPICS = [
  { id: "me", t: "Tentang Diri Sendiri", ic: "🙋", level: "A1", q: ["Hi! What's your name, and where are you from?", "What do you do? Are you a student or do you work?", "What do you like to do in your free time?", "What is your favorite food?", "Why are you learning English?"] },
  { id: "family", t: "Keluarga", ic: "👨‍👩‍👧", level: "A1", q: ["Tell me about your family. How many people are there?", "Who are you closest to in your family?", "What do you usually do together?", "Do you have any family traditions?", "What did your parents teach you that you still remember?"] },
  { id: "food", t: "Makanan & Kuliner", ic: "🍜", level: "A2", q: ["What did you eat for breakfast today?", "What is a traditional dish from your region?", "Can you describe how to make it?", "Do you prefer cooking at home or eating out? Why?", "What food would you recommend to a tourist in Indonesia?"] },
  { id: "hometown", t: "Kota Asal", ic: "🏙️", level: "A2", q: ["Where is your hometown?", "What is it famous for?", "What can visitors do there?", "How has it changed in the last ten years?", "Would you like to live there in the future? Why or why not?"] },
  { id: "travel", t: "Liburan & Perjalanan", ic: "🏝️", level: "A2", q: ["Where did you go on your last holiday?", "What did you do there?", "Do you prefer the beach or the mountains?", "Where would you like to travel next, and why?", "What is the most important thing to pack for a trip?"] },
  { id: "work", t: "Pekerjaan & Studi", ic: "🧑‍💻", level: "B1", q: ["What do you do for work or study?", "What does a typical day look like for you?", "What do you enjoy most about it?", "What is the most challenging part?", "Where do you see yourself in five years?"] },
  { id: "tech", t: "Teknologi", ic: "📱", level: "B1", q: ["How many hours a day do you spend on your phone?", "Which app do you use the most, and why?", "Do you think social media is good or bad for young people?", "How has artificial intelligence changed the way you work or study?", "What technology do you think we will use in ten years?"] },
  { id: "health", t: "Kesehatan & Olahraga", ic: "🏃", level: "B1", q: ["What do you do to stay healthy?", "How often do you exercise?", "Is it easy to eat healthy food where you live?", "How do you deal with stress?", "What advice would you give someone who wants a healthier lifestyle?"] },
  { id: "movies", t: "Film & Musik", ic: "🎬", level: "A2", q: ["What kind of movies do you like?", "Tell me about a movie you watched recently.", "Who is your favorite singer or band?", "Do you prefer watching movies at home or in the cinema?", "Can you recommend an Indonesian movie or song to me?"] },
  { id: "environment", t: "Lingkungan", ic: "🌱", level: "B2", q: ["What is the biggest environmental problem in your city?", "What do you personally do to protect the environment?", "Should plastic bags be banned completely? Why?", "Who is more responsible for climate change: governments, companies, or individuals?", "What change would you like to see in the next ten years?"] },
  { id: "education", t: "Pendidikan", ic: "🎓", level: "B2", q: ["What was your favorite subject at school, and why?", "What makes a good teacher?", "Is online learning as effective as learning in a classroom?", "Should university education be free for everyone?", "What skill do you think schools should teach but don't?"] },
  { id: "research", t: "Penelitian & Dunia Akademik", ic: "🔬", level: "C1", q: ["What is your research area?", "Why did you choose this topic?", "What method do you usually use, and why?", "What is the biggest challenge in publishing internationally?", "How could your research benefit society?"] }
];
