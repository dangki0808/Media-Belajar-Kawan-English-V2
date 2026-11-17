/* Kawan English — asisten belajar bahasa Inggris (PWA) */
(function () {
  "use strict";
  const L = window.LEVELS;
  const $app = document.getElementById("app");
  const KEY = "kawanEnglish.v1";
  const SKILLS = {
    reading: { name: "Reading", id: "Membaca", ic: "📖", cls: "t-read", color: "var(--read)" },
    listening: { name: "Listening", id: "Menyimak", ic: "🎧", cls: "t-listen", color: "var(--listen)" },
    speaking: { name: "Speaking", id: "Berbicara", ic: "🎤", cls: "t-speak", color: "var(--speak)" },
    writing: { name: "Writing", id: "Menulis", ic: "✍️", cls: "t-write", color: "var(--write)" }
  };

  /* ---------- Penyimpanan ---------- */
  const defState = () => ({ level: "A1", xp: 0, streak: 0, lastDay: null, done: {}, vocab: {}, rate: 0.9, journal: {}, placed: false, name: "", enrolled: {}, lessons: {}, quiz: {}, finals: {}, certs: {}, notes: {}, goal: 5, days: [], last: null, exam: {}, bookings: [], fav: {}, convos: [], beginner: false, watched: {}, aiKey: "", aiModel: "", jenjang: "Semua" });
  let S;
  try { S = Object.assign(defState(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = defState(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  const localDate = d => { const z = new Date(d.getTime() - d.getTimezoneOffset() * 6e4); return z.toISOString().slice(0, 10); };
  const today = () => localDate(new Date());
  function addXP(n) {
    S.xp += n;
    const t = today();
    if (S.lastDay !== t) {
      const y = localDate(new Date(Date.now() - 864e5));
      S.streak = S.lastDay === y ? S.streak + 1 : 1;
      S.lastDay = t;
    }
    if (!S.days.includes(t)) { S.days.push(t); S.days = S.days.slice(-90); }
    save();
  }
  function mark(key) { if (!S.done[key]) { S.done[key] = 1; save(); } }
  const lvl = () => L.find(x => x.id === S.level) || L[0];

  /* ---------- Util ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
  }
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const CONTR = { "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "it's": "it is", "we're": "we are", "they're": "they are", "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have", "i'll": "i will", "you'll": "you will", "he'll": "he will", "she'll": "she will", "we'll": "we will", "they'll": "they will", "i'd": "i would", "you'd": "you would", "he'd": "he would", "she'd": "she would", "we'd": "we would", "they'd": "they would", "don't": "do not", "doesn't": "does not", "didn't": "did not", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not", "hadn't": "had not", "won't": "will not", "wouldn't": "would not", "can't": "cannot", "cannot": "cannot", "couldn't": "could not", "shouldn't": "should not", "there's": "there is", "that's": "that is", "what's": "what is", "let's": "let us" };
  function words(s) {
    s = String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z0-9'\s-]/g, " ").replace(/-/g, " ");
    const out = [];
    s.split(/\s+/).filter(Boolean).forEach(w => {
      w = w.replace(/^'+|'+$/g, "");
      if (!w) return;
      (CONTR[w] || w).split(" ").forEach(x => out.push(x));
    });
    const NUM = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
    const SPELL = { practise: "practice", colour: "color", behaviour: "behavior", favourite: "favorite", labour: "labor", honour: "honor", neighbour: "neighbor", centre: "center", theatre: "theater", organised: "organized", organise: "organize", overgeneralise: "overgeneralize", prioritise: "prioritize", apologising: "apologizing", realise: "realize", ok: "okay" };
    return out.map(w => /^\d+$/.test(w) && +w <= 20 ? NUM[+w] : (SPELL[w] || w.replace(/-organised$/, "-organized")));
  }
  // LCS kata: kembalikan indeks kata target yang cocok
  function lcsMatch(target, said) {
    const n = target.length, m = said.length;
    const d = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
      d[i][j] = target[i] === said[j] ? 1 + d[i + 1][j + 1] : Math.max(d[i + 1][j], d[i][j + 1]);
    const hit = new Set(); let i = 0, j = 0;
    while (i < n && j < m) {
      if (target[i] === said[j]) { hit.add(i); i++; j++; }
      else if (d[i + 1][j] >= d[i][j + 1]) i++; else j++;
    }
    return hit;
  }
  function similarity(a, b) { // a,b array kata
    if (!a.length && !b.length) return 1;
    const h = lcsMatch(a, b).size;
    return (2 * h) / (a.length + b.length);
  }
  function diffHTML(targetText, said) {
    const raw = targetText.split(/\s+/);
    const tw = raw.map(w => words(w).join(" "));
    const flat = [], owner = [];
    tw.forEach((w, k) => w.split(" ").filter(Boolean).forEach(x => { flat.push(x); owner.push(k); }));
    const hit = lcsMatch(flat, said);
    const okRaw = raw.map((_, k) => { const idx = owner.map((o, q) => o === k ? q : -1).filter(q => q >= 0); return idx.length && idx.every(q => hit.has(q)); });
    const score = flat.length ? Math.round(100 * hit.size / flat.length) : 0;
    return { html: raw.map((w, k) => `<span class="${okRaw[k] ? "hit" : "miss"}">${esc(w)}</span>`).join(" "), score };
  }

  /* ---------- Suara (TTS) ---------- */
  const synth = window.speechSynthesis;
  let voice = null;
  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices();
    voice = vs.find(v => /en[-_]US/i.test(v.lang) && /google/i.test(v.name)) || vs.find(v => /en[-_]US/i.test(v.lang)) || vs.find(v => /en[-_]GB/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
  }
  if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }
  function speak(text, rate, onend) {
    if (!synth) { toast("Perangkat ini belum mendukung suara. Coba pakai Chrome."); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; if (voice) u.voice = voice;
    u.rate = rate || S.rate;
    if (onend) u.onend = onend;
    synth.speak(u);
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  /* ---------- Navigasi ---------- */
  let stack = [];
  function go(view, params, replace) {
    if (synth) synth.cancel();
    const entry = { view, params: params || {} };
    if (replace && stack.length) stack[stack.length - 1] = entry; else { stack.push(entry); try { history.pushState({ d: stack.length }, ""); } catch (e) { } }
    render();
  }
  function back() { if (stack.length > 1) { history.back(); } }
  window.addEventListener("popstate", () => {
    if (synth) synth.cancel();
    if (stack.length > 1) { stack.pop(); render(); }
  });
  const cur = () => stack[stack.length - 1];

  const NAV = [["home", "🏠", "Beranda"], ["courses", "📚", "Kursus"], ["talk", "💬", "Bicara"], ["media", "🎬", "Video"], ["practice", "🏋️", "Latihan"], ["tutors", "🧑‍🏫", "Tutor"], ["profile", "👤", "Profil"]];
  function shell(title, body, opts) {
    opts = opts || {};
    const root = stack.length <= 1 || opts.root;
    const tab = opts.tab || "";
    const ini = S.name ? S.name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase() : "👤";
    $app.innerHTML = `
      <header class="top">
        ${root ? "" : `<button class="back" data-act="back" aria-label="Kembali">←</button>`}
        <h1>${title}</h1>
        <span class="pill">🔥 ${S.streak} · ⭐ ${S.xp}</span>
        <button class="avatar" data-tab="profile" aria-label="Profil">${esc(ini)}</button>
      </header>
      <main>${body}</main>
      ${opts.nofab ? "" : `<button class="fab" data-kawan aria-label="Tanya Kawan">✨<span> Tanya Kawan</span></button>`}
      <nav class="bottom"><div class="brand"><span class="logo">K</span><b>Kawan English</b></div><div class="in">
        ${NAV.map(([v, i, n]) =>
          `<button data-tab="${v}" class="${tab === v ? "on" : ""} ${v === "profile" || v === "tutors" ? "desk-only" : ""}"><span>${i}</span>${n}</button>`).join("")}
      </div></nav>`;
    $app.querySelectorAll("[data-act=back]").forEach(b => b.onclick = back);
    $app.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => { if (synth) synth.cancel(); stack = [{ view: b.dataset.tab, params: {} }]; render(); });
    $app.querySelectorAll("[data-kawan]").forEach(b => b.onclick = openKawan);
    window.scrollTo(0, 0);
  }
  function on(sel, fn) { $app.querySelectorAll(sel).forEach(el => el.addEventListener("click", e => fn(el, e))); }

  /* ---------- Progres skill ---------- */
  function skillItems(lv, sk) {
    if (sk === "reading") return lv.reading.length;
    if (sk === "listening") return lv.listening.length;
    if (sk === "speaking") return lv.speaking.length;
    if (sk === "writing") return lv.writing.translate.length + lv.writing.arrange.length + lv.writing.grammar.length + 1;
    return 0;
  }
  function skillDone(lv, sk) { return Object.keys(S.done).filter(k => k.startsWith(lv.id + ":" + sk + ":")).length; }
  function pct(lv, sk) { const t = skillItems(lv, sk); return t ? Math.min(100, Math.round(100 * skillDone(lv, sk) / t)) : 0; }

  /* ---------- Beranda ---------- */
  function vPractice() {
    const lv = lvl();
    const all = L.flatMap(x => x.speaking.map(s => s));
    const dayIdx = Math.floor(Date.now() / 864e5) % all.length;
    const sod = all[dayIdx];
    const due = dueCards(lv).length;
    shell("Latihan", `
      <div class="card hero">
        <div class="k">Level ${lv.id} · ${lv.name}</div>
        <h2 class="serif">Halo! Siap latihan hari ini?</h2>
        <p>${esc(lv.desc)}</p>
        <div class="stats">
          <div class="stat"><b>🔥 ${S.streak}</b>hari beruntun</div>
          <div class="stat"><b>⭐ ${S.xp}</b>poin XP</div>
          <div class="stat"><b>🃏 ${due}</b>kata perlu diulang</div>
        </div>
      </div>
      <div class="levels">${L.map(x => `<button class="lv ${x.id === S.level ? "on" : ""}" data-lv="${x.id}"><b>${x.id}</b><span>${x.name}</span></button>`).join("")}</div>
      <div class="grid">
        ${Object.entries(SKILLS).map(([k, s]) => `
          <button class="tile ${s.cls}" data-sk="${k}">
            <span class="ic">${s.ic}</span>
            <span><b>${s.name}</b><small>${s.id} · ${pct(lv, k)}%</small><span class="bar"><i style="width:${pct(lv, k)}%"></i></span></span>
          </button>`).join("")}
      </div>
      <button class="list-btn" data-go="vocab"><span class="ic">🃏</span><span><b>Kartu Kosakata</b><small>${lv.vocab.length} kata level ${lv.id} · sistem ulang berkala</small></span><span class="chev">›</span></button>
      ${!S.placed ? `<button class="list-btn" data-go="placement"><span class="ic">🎯</span><span><b>Tes Penempatan</b><small>10 soal singkat untuk menentukan levelmu</small></span><span class="chev">›</span></button>` : ""}
      <div class="sec-title">Kalimat hari ini</div>
      <div class="card">
        <div class="serif" style="font-size:21px">${esc(sod[0])}</div>
        <div class="muted" style="margin-top:4px">${esc(sod[1])}</div>
        <div class="btns"><button class="btn soft" data-sod>🔊 Dengarkan</button></div>
      </div>
      ${S.placed ? `<button class="list-btn" data-go="placement"><span class="ic">🎯</span><span><b>Ulangi Tes Penempatan</b><small>Cek apakah kamu sudah naik level</small></span><span class="chev">›</span></button>` : ""}
    `, { root: true, tab: "practice" });
    on("[data-lv]", el => { S.level = el.dataset.lv; save(); render(); });
    on("[data-sk]", el => go(el.dataset.sk));
    on("[data-go]", el => go(el.dataset.go));
    on("[data-sod]", () => speak(sod[0]));
  }

  /* ---------- Reading ---------- */
  function vReading() {
    const lv = lvl();
    shell("📖 Reading · " + lv.id, `
      <p class="muted">Baca teks, ketuk <b style="color:var(--read)">kata bergaris</b> untuk melihat artinya, atau ketuk kata lain untuk mendengar pengucapannya.</p>
      ${lv.reading.map((r, i) => `
        <button class="list-btn" data-i="${i}"><span class="ic" style="background:#e3f3f1">📄</span>
          <span><b>${esc(r.title)}</b><small>${r.text.split(/\s+/).length} kata · ${r.questions.length} soal</small></span>
          ${S.done[lv.id + ":reading:" + i] ? `<span class="done-dot">✓</span>` : `<span class="chev">›</span>`}
        </button>`).join("")}
    `);
    on("[data-i]", el => go("passage", { i: +el.dataset.i }));
  }
  function tokenizePassage(text, gloss) {
    const keys = Object.keys(gloss).sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const re = keys.length ? new RegExp("\\b(" + keys.join("|") + ")\\b", "gi") : null;
    const parts = []; let last = 0, m;
    if (re) while ((m = re.exec(text))) { parts.push({ t: text.slice(last, m.index) }); parts.push({ g: m[0] }); last = m.index + m[0].length; }
    parts.push({ t: text.slice(last) });
    return parts.map(p => {
      if (p.g) return `<button class="gl" data-g="${esc(p.g)}">${esc(p.g)}</button>`;
      return p.t.split(/(\s+)/).map(w => /\w/.test(w) ? `<span class="w" data-w="${esc(w.replace(/[^\w'-]/g, ""))}">${esc(w)}</span>` : esc(w)).join("");
    }).join("");
  }
  function sheet(html) {
    const bg = document.createElement("div"); bg.className = "sheet-bg";
    bg.innerHTML = `<div class="sheet">${html}</div>`;
    bg.onclick = e => { if (e.target === bg) bg.remove(); };
    document.body.appendChild(bg);
    return bg;
  }
  function vPassage(p) {
    const lv = lvl(); const r = lv.reading[p.i];
    const key = lv.id + ":reading:" + p.i;
    const ans = {};
    shell(esc(r.title), `
      <div class="card"><span class="tag">Level ${lv.id}</span>
        <div class="passage" style="margin-top:10px">${tokenizePassage(r.text, r.glossary)}</div>
        <div class="btns"><button class="btn soft" data-read>🔊 Bacakan</button><button class="btn ghost" data-stop>⏹ Berhenti</button></div>
      </div>
      <div class="sec-title">Pertanyaan pemahaman</div>
      ${r.questions.map((q, qi) => `
        <div class="card q" data-q="${qi}"><p>${qi + 1}. ${esc(q.q)}</p>
          ${q.o.map((o, oi) => `<button class="opt" data-qi="${qi}" data-oi="${oi}">${esc(o)}</button>`).join("")}
          <div class="fbx"></div>
        </div>`).join("")}
      <div id="sum"></div>
    `);
    on("[data-read]", () => speak(r.text));
    on("[data-stop]", () => synth && synth.cancel());
    on(".gl", el => {
      const k = Object.keys(r.glossary).find(x => x.toLowerCase() === el.dataset.g.toLowerCase());
      const b = sheet(`<div class="serif" style="font-size:28px">${esc(el.dataset.g)}</div>
        <div style="font-size:20px;font-weight:700;color:var(--read);margin:6px 0 14px">${esc(r.glossary[k] || "")}</div>
        <div class="btns"><button class="btn soft" data-say>🔊 Dengarkan</button><button class="btn" data-close>Tutup</button></div>`);
      b.querySelector("[data-say]").onclick = () => speak(el.dataset.g, 0.8);
      b.querySelector("[data-close]").onclick = () => b.remove();
    });
    on(".w", el => speak(el.dataset.w, 0.8));
    on(".opt", el => {
      const qi = +el.dataset.qi, oi = +el.dataset.oi, q = r.questions[qi];
      if (ans[qi] !== undefined) return;
      ans[qi] = oi === q.a;
      const box = $app.querySelector(`[data-q="${qi}"]`);
      box.querySelectorAll(".opt").forEach((b, k) => { if (k === q.a) b.classList.add("right"); else if (k === oi) b.classList.add("wrong"); });
      box.querySelector(".fbx").innerHTML = `<div class="fb ${ans[qi] ? "ok" : "no"}">${ans[qi] ? "✅ Benar!" : "❌ Kurang tepat."} ${esc(q.e)}</div>`;
      if (ans[qi]) addXP(10);
      if (Object.keys(ans).length === r.questions.length) {
        const c = Object.values(ans).filter(Boolean).length;
        mark(key);
        $app.querySelector("#sum").innerHTML = `<div class="card center"><div class="score">${c}/${r.questions.length}</div>
          <p>${c === r.questions.length ? "Sempurna! Pemahamanmu sangat baik." : "Bagus! Baca ulang bagian yang salah, lalu coba lagi."}</p>
          <div class="btns"><button class="btn ghost" data-again>Ulangi</button>${p.i + 1 < lv.reading.length ? `<button class="btn" data-next>Teks berikutnya →</button>` : `<button class="btn" data-home>Selesai</button>`}</div></div>`;
        on("[data-again]", () => go("passage", { i: p.i }, true));
        on("[data-next]", () => go("passage", { i: p.i + 1 }, true));
        on("[data-home]", back);
      }
    });
  }

  /* ---------- Listening ---------- */
  function rateBar() {
    return `<div class="rates">${[[0.7, "Pelan"], [0.9, "Normal"], [1.05, "Cepat"]].map(([r, n]) => `<button data-rate="${r}" class="${Math.abs(S.rate - r) < .01 ? "on" : ""}">${n}</button>`).join("")}</div>`;
  }
  function bindRate() { on("[data-rate]", el => { S.rate = +el.dataset.rate; save(); $app.querySelectorAll("[data-rate]").forEach(b => b.classList.toggle("on", b === el)); }); }
  function vListening(p) {
    const lv = lvl(); const i = p.i || 0; const it = lv.listening[i];
    const key = lv.id + ":listening:" + i;
    const isDict = !it.q;
    let plays = 0;
    shell("🎧 Listening · " + lv.id, `
      <div class="row small muted" style="justify-content:space-between"><span>Soal ${i + 1} dari ${lv.listening.length}</span><span>${isDict ? "Dikte" : "Pemahaman"}</span></div>
      <div class="prog" style="margin:8px 0 14px"><i style="width:${100 * (i) / lv.listening.length}%"></i></div>
      <div class="card center">
        <p style="margin-top:0">${isDict ? "Dengarkan, lalu <b>tulis kalimat</b> yang kamu dengar." : "Dengarkan, lalu <b>jawab pertanyaannya</b>."}</p>
        <button class="big-play" data-play aria-label="Putar">▶</button>
        ${rateBar()}
        <div class="small muted" id="plays">Boleh diputar berulang kali.</div>
      </div>
      <div class="card">
        ${isDict ? `<input type="text" id="dict" placeholder="Ketik yang kamu dengar..." autocomplete="off" autocapitalize="sentences">
          <div class="btns"><button class="btn" data-check>Periksa</button></div>`
        : `<p style="font-weight:700;margin-top:0">${esc(it.q)}</p>${it.o.map((o, oi) => `<button class="opt" data-oi="${oi}">${esc(o)}</button>`).join("")}`}
        <div id="res"></div>
      </div>
    `);
    bindRate();
    on("[data-play]", () => { plays++; speak(it.say); $app.querySelector("#plays").textContent = "Diputar " + plays + "×"; });
    function finish(ok, extra) {
      if (ok) addXP(plays <= 2 ? 15 : 10);
      mark(key);
      $app.querySelector("#res").innerHTML = `${extra || ""}
        <div class="fb info"><b>Transkrip:</b> ${esc(it.say)}</div>
        <div class="btns">${i + 1 < lv.listening.length ? `<button class="btn" data-next>Lanjut →</button>` : `<button class="btn" data-fin>Selesai 🎉</button>`}</div>`;
      on("[data-next]", () => go("listening", { i: i + 1 }, true));
      on("[data-fin]", () => { toast("Latihan listening level " + lv.id + " selesai!"); back(); });
    }
    if (isDict) {
      on("[data-check]", el => {
        const v = $app.querySelector("#dict").value.trim();
        if (!v) { toast("Tulis dulu yang kamu dengar."); return; }
        if (!plays) { toast("Putar audionya dulu ya."); return; }
        el.disabled = true;
        const d = diffHTML(it.say, words(v));
        finish(d.score >= 90, `<div class="fb ${d.score >= 90 ? "ok" : "no"}">${d.score >= 90 ? "✅ Hebat!" : "Hampir!"} Ketepatan ${d.score}%. Kata merah = terlewat/salah.</div><div class="words" style="margin-top:8px">${d.html}</div>`);
      });
    } else {
      let answered = false;
      on(".opt", el => {
        if (answered) return;
        if (!plays) { toast("Putar audionya dulu ya."); return; }
        answered = true;
        const oi = +el.dataset.oi;
        $app.querySelectorAll(".opt").forEach((b, k) => { if (k === it.a) b.classList.add("right"); else if (k === oi) b.classList.add("wrong"); });
        finish(oi === it.a, `<div class="fb ${oi === it.a ? "ok" : "no"}">${oi === it.a ? "✅ Benar!" : "❌ Jawaban yang tepat: " + esc(it.o[it.a])}</div>`);
      });
    }
  }

  /* ---------- Speaking ---------- */
  function vSpeaking(p) {
    const lv = lvl(); const i = p.i || 0; const it = lv.speaking[i];
    const key = lv.id + ":speaking:" + i;
    shell("🎤 Speaking · " + lv.id, `
      <div class="row small muted" style="justify-content:space-between"><span>Kalimat ${i + 1} dari ${lv.speaking.length}</span><span>${SR ? "Mikrofon aktif" : "Mode ketik suara"}</span></div>
      <div class="prog" style="margin:8px 0 14px"><i style="width:${100 * i / lv.speaking.length}%"></i></div>
      <div class="card">
        <div class="serif" style="font-size:24px;line-height:1.3">${esc(it[0])}</div>
        <div class="muted" style="margin-top:6px">${esc(it[1])}</div>
        <div class="fb info" style="margin-top:12px">💡 ${esc(it[2])}</div>
        <div class="btns"><button class="btn soft" data-model>🔊 Contoh</button><button class="btn soft" data-slow>🐢 Pelan</button></div>
      </div>
      <div class="card center">
        ${SR ? `<p style="margin-top:0">Ketuk mikrofon, lalu ucapkan kalimat di atas.</p>
          <button class="mic" data-mic aria-label="Rekam">🎙</button>
          <div class="small muted" id="st">Siap merekam</div>`
        : `<p style="margin-top:0">Browser ini belum mendukung pengenalan suara langsung. Ketuk kotak di bawah, lalu tekan <b>ikon mikrofon di keyboard</b> (Gboard) dan ucapkan kalimatnya dalam bahasa Inggris.</p>
          <input type="text" id="typed" placeholder="Hasil ucapanmu muncul di sini..." autocomplete="off">
          <div class="btns"><button class="btn" data-checktyped>Nilai ucapanku</button></div>`}
        <div id="res" style="text-align:left"></div>
      </div>
    `);
    on("[data-model]", () => speak(it[0], 0.9));
    on("[data-slow]", () => speak(it[0], 0.65));
    let best = 0;
    function grade(alts) {
      let top = null;
      alts.forEach(a => { const d = diffHTML(it[0], words(a)); if (!top || d.score > top.score) top = Object.assign(d, { said: a }); });
      const s = top.score;
      if (s > best) { if (s >= 80 && best < 80) addXP(15); best = s; }
      mark(key);
      const msg = s >= 90 ? "🌟 Luar biasa! Pengucapanmu jelas." : s >= 70 ? "👍 Bagus! Perhatikan kata berwarna merah." : "💪 Coba lagi pelan-pelan. Dengarkan contohnya dulu.";
      $app.querySelector("#res").innerHTML = `
        <div class="center"><div class="score" style="color:${s >= 70 ? "var(--ok)" : "var(--speak)"}">${s}%</div><div>${msg}</div></div>
        <div class="words" style="margin-top:12px">${top.html}</div>
        <div class="small muted" style="margin-top:6px">Terdengar: “${esc(top.said)}”</div>
        <div class="btns">${i + 1 < lv.speaking.length ? `<button class="btn" data-next>Kalimat berikutnya →</button>` : `<button class="btn" data-fin>Selesai 🎉</button>`}</div>`;
      on("[data-next]", () => go("speaking", { i: i + 1 }, true));
      on("[data-fin]", () => { toast("Latihan speaking level " + lv.id + " selesai!"); back(); });
    }
    if (SR) {
      let rec = null;
      on("[data-mic]", el => {
        if (rec) { rec.stop(); return; }
        if (synth) synth.cancel();
        rec = new SR(); rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 4;
        const st = $app.querySelector("#st");
        rec.onstart = () => { el.classList.add("rec"); st.textContent = "Mendengarkan... ketuk lagi untuk berhenti"; };
        rec.onresult = e => { const r = e.results[0]; const alts = []; for (let k = 0; k < r.length; k++) alts.push(r[k].transcript); grade(alts); };
        rec.onerror = e => { st.textContent = e.error === "not-allowed" ? "Izin mikrofon ditolak. Aktifkan di pengaturan browser." : e.error === "no-speech" ? "Suara tidak terdengar. Coba lagi lebih dekat." : e.error === "network" ? "Pengenalan suara butuh internet." : "Gagal merekam (" + e.error + ")."; };
        rec.onend = () => { el.classList.remove("rec"); rec = null; if (st.textContent.startsWith("Mendengarkan")) st.textContent = "Siap merekam"; };
        try { rec.start(); } catch (err) { st.textContent = "Tidak bisa memulai mikrofon."; rec = null; }
      });
    } else {
      on("[data-checktyped]", () => { const v = $app.querySelector("#typed").value.trim(); if (!v) { toast("Ucapkan kalimatnya dulu lewat mikrofon keyboard."); return; } grade([v]); });
    }
  }

  /* ---------- Writing ---------- */
  function vWriting() {
    const lv = lvl(); const w = lv.writing;
    const c = (sk, n) => Array.from({ length: n }, (_, k) => S.done[lv.id + ":writing:" + sk + k] ? 1 : 0).reduce((a, b) => a + b, 0);
    shell("✍️ Writing · " + lv.id, `
      <button class="list-btn" data-m="translate"><span class="ic" style="background:#efeafb">🔁</span><span><b>Terjemahkan</b><small>Indonesia → Inggris · ${c("t", w.translate.length)}/${w.translate.length}</small></span><span class="chev">›</span></button>
      <button class="list-btn" data-m="arrange"><span class="ic" style="background:#efeafb">🧩</span><span><b>Susun Kalimat</b><small>Urutkan kata dengan benar · ${c("a", w.arrange.length)}/${w.arrange.length}</small></span><span class="chev">›</span></button>
      <button class="list-btn" data-m="grammar"><span class="ic" style="background:#efeafb">🔧</span><span><b>Tata Bahasa</b><small>Isi bagian kosong · ${c("g", w.grammar.length)}/${w.grammar.length}</small></span><span class="chev">›</span></button>
      <button class="list-btn" data-m="journal"><span class="ic" style="background:#efeafb">📝</span><span><b>Jurnal Menulis</b><small>Tulis bebas + cek otomatis</small></span>${S.done[lv.id + ":writing:j0"] ? `<span class="done-dot">✓</span>` : `<span class="chev">›</span>`}</button>
    `);
    on("[data-m]", el => go("w_" + el.dataset.m, { i: 0 }));
  }
  function wHeader(i, n, label) {
    return `<div class="row small muted" style="justify-content:space-between"><span>${label} ${i + 1} dari ${n}</span></div><div class="prog" style="margin:8px 0 14px"><i style="width:${100 * i / n}%"></i></div>`;
  }
  function nextBtns(i, n, view) {
    return `<div class="btns">${i + 1 < n ? `<button class="btn" data-next>Lanjut →</button>` : `<button class="btn" data-fin>Selesai 🎉</button>`}</div>`;
  }
  function bindNext(i, view) {
    on("[data-next]", () => go(view, { i: i + 1 }, true));
    on("[data-fin]", () => { toast("Bagian ini selesai. Mantap!"); back(); });
  }
  function vTranslate(p) {
    const lv = lvl(); const arr = lv.writing.translate; const i = p.i; const it = arr[i];
    let tries = 0;
    shell("🔁 Terjemahkan", `${wHeader(i, arr.length, "Kalimat")}
      <div class="card"><div class="small muted">Terjemahkan ke bahasa Inggris:</div>
        <div class="serif" style="font-size:22px;margin:6px 0 14px">${esc(it.id)}</div>
        <textarea id="ans" rows="3" placeholder="Tulis terjemahanmu..." autocapitalize="sentences"></textarea>
        <div class="btns"><button class="btn ghost" data-hint>💡 Petunjuk</button><button class="btn" data-check>Periksa</button></div>
        <div id="res"></div></div>`);
    on("[data-hint]", () => { $app.querySelector("#res").innerHTML = `<div class="fb info">💡 ${esc(it.h)}</div>`; });
    on("[data-check]", el => {
      const v = $app.querySelector("#ans").value.trim(); if (!v) { toast("Tulis jawabanmu dulu."); return; }
      tries++;
      const vw = words(v);
      let best = null;
      it.a.forEach(a => { const s = similarity(words(a), vw); if (!best || s > best.s) best = { a, s }; });
      const res = $app.querySelector("#res");
      if (best.s >= 0.999) {
        if (tries === 1) addXP(15); else addXP(5);
        mark(lv.id + ":writing:t" + i);
        el.disabled = true;
        res.innerHTML = `<div class="fb ok">✅ Tepat sekali!${it.a.length > 1 ? `<br><span class="small">Alternatif lain: ${esc(it.a.filter(x => words(x).join(" ") !== vw.join(" ")).slice(0, 2).join(" / "))}</span>` : ""}</div>${nextBtns(i, arr.length)}`;
        bindNext(i, "w_translate");
      } else if (best.s >= 0.75) {
        const d = diffHTML(best.a, vw), mine = diffHTML(v, words(best.a));
        res.innerHTML = `<div class="fb no">Hampir benar! Kata merah adalah bagian yang berbeda.</div>
          <div class="small muted" style="margin-top:10px">Jawabanmu:</div><div class="words">${mine.html}</div>
          <div class="small muted" style="margin-top:6px">Jawaban yang tepat:</div><div class="words">${d.html}</div>
          <div class="btns"><button class="btn ghost" data-retry>Perbaiki</button><button class="btn" data-accept>Saya paham, lanjut</button></div>`;
        on("[data-retry]", () => { res.innerHTML = ""; $app.querySelector("#ans").focus(); });
        on("[data-accept]", () => { mark(lv.id + ":writing:t" + i); i + 1 < arr.length ? go("w_translate", { i: i + 1 }, true) : back(); });
      } else {
        res.innerHTML = `<div class="fb no">Belum tepat. ${tries < 2 ? "Coba lagi, atau lihat petunjuk." : `Contoh jawaban: <b>${esc(it.a[0])}</b>`}</div>${tries >= 2 ? nextBtns(i, arr.length) : ""}`;
        if (tries >= 2) { mark(lv.id + ":writing:t" + i); bindNext(i, "w_translate"); }
      }
    });
  }
  function vArrange(p) {
    const lv = lvl(); const arr = lv.writing.arrange; const i = p.i; const target = arr[i];
    const tw = target.split(" ");
    let pool = shuffle(tw); let guard = 0;
    while (pool.join(" ") === target && guard++ < 10) pool = shuffle(tw);
    const picked = [];
    shell("🧩 Susun Kalimat", `${wHeader(i, arr.length, "Soal")}
      <div class="card"><div class="small muted">Ketuk kata sesuai urutan yang benar:</div>
        <div class="chips" id="ansz" style="margin:10px 0"></div>
        <div class="chips" id="pool" style="border-style:solid;background:transparent"></div>
        <div class="btns"><button class="btn ghost" data-reset>↺ Ulang</button><button class="btn" data-check>Periksa</button></div>
        <div id="res"></div></div>`);
    function draw() {
      $app.querySelector("#ansz").innerHTML = picked.map((k, j) => `<button class="chip" data-un="${j}">${esc(pool[k])}</button>`).join("") || `<span class="muted small">Jawabanmu muncul di sini</span>`;
      $app.querySelector("#pool").innerHTML = pool.map((w, k) => `<button class="chip ${picked.includes(k) ? "used" : ""}" data-pk="${k}">${esc(w)}</button>`).join("");
      $app.querySelectorAll("[data-pk]").forEach(b => b.onclick = () => { const k = +b.dataset.pk; if (!picked.includes(k)) { picked.push(k); draw(); } });
      $app.querySelectorAll("[data-un]").forEach(b => b.onclick = () => { picked.splice(+b.dataset.un, 1); draw(); });
    }
    draw();
    on("[data-reset]", () => { picked.length = 0; draw(); $app.querySelector("#res").innerHTML = ""; });
    on("[data-check]", () => {
      if (picked.length < pool.length) { toast("Gunakan semua kata dulu."); return; }
      const ans = picked.map(k => pool[k]).join(" ");
      const ok = ans.toLowerCase() === target.toLowerCase();
      const res = $app.querySelector("#res");
      if (ok) {
        addXP(10); mark(lv.id + ":writing:a" + i);
        res.innerHTML = `<div class="fb ok">✅ Benar! <b>${esc(target)}.</b> <button class="btn soft" style="padding:6px 10px;margin-left:6px" data-say>🔊</button></div>${nextBtns(i, arr.length)}`;
        on("[data-say]", () => speak(target)); bindNext(i, "w_arrange");
      } else {
        res.innerHTML = `<div class="fb no">Urutannya belum tepat. Coba ulang ya.</div><div class="btns"><button class="btn ghost" data-show>Lihat jawaban</button></div>`;
        on("[data-show]", () => { mark(lv.id + ":writing:a" + i); res.innerHTML = `<div class="fb info">Jawaban: <b>${esc(target)}.</b></div>${nextBtns(i, arr.length)}`; bindNext(i, "w_arrange"); });
      }
    });
  }
  function vGrammar(p) {
    const lv = lvl(); const arr = lv.writing.grammar; const i = p.i; const it = arr[i];
    shell("🔧 Tata Bahasa", `${wHeader(i, arr.length, "Soal")}
      <div class="card"><div class="small muted">Pilih jawaban yang tepat untuk mengisi bagian kosong:</div>
        <div class="serif" style="font-size:22px;margin:8px 0 14px">${esc(it.q).replace("___", "<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>")}</div>
        ${it.o.map((o, oi) => `<button class="opt" data-oi="${oi}">${esc(o)}</button>`).join("")}
        <div id="res"></div></div>`);
    let done = false;
    on(".opt", el => {
      if (done) return; done = true;
      const oi = +el.dataset.oi; const ok = oi === it.a;
      $app.querySelectorAll(".opt").forEach((b, k) => { if (k === it.a) b.classList.add("right"); else if (k === oi) b.classList.add("wrong"); });
      if (ok) addXP(10);
      mark(lv.id + ":writing:g" + i);
      const full = it.q.replace("___", it.o[it.a]);
      $app.querySelector("#res").innerHTML = `<div class="fb ${ok ? "ok" : "no"}">${ok ? "✅ Benar!" : "❌ Kurang tepat."} ${esc(it.e)}<br><b>${esc(full)}</b></div>${nextBtns(i, arr.length)}`;
      bindNext(i, "w_grammar");
    });
  }

  /* ---------- Pemeriksa tulisan (berbasis aturan) ---------- */
  const RULES = [
    [/\bi am agree\b/i, "“I am agree” → <b>I agree</b>. 'agree' sudah kata kerja, tidak perlu 'am'."],
    [/\bi am (?:very )?like\b/i, "“I am like” → <b>I like</b>."],
    [/\b(?:you|we|they) (?:is|was)\b|\bi is\b/i, "Periksa to be: I <b>am</b>, you/we/they <b>are/were</b>."],
    [/\bpeople is\b/i, "“people is” → <b>people are</b> (people = jamak)."],
    [/\b(?:he|she|it) don't\b/i, "He/she/it → <b>doesn't</b>, bukan don't."],
    [/\binformations\b/i, "“informations” → <b>information</b> (tidak bisa dijamakkan)."],
    [/\badvices\b/i, "“advices” → <b>advice</b> (tidak bisa dijamakkan)."],
    [/\bequipments\b/i, "“equipments” → <b>equipment</b>."],
    [/\bdiscuss about\b/i, "“discuss about” → <b>discuss</b> (tanpa 'about')."],
    [/\bmore (?:better|worse|bigger|easier|faster|cheaper|smaller)\b/i, "Jangan gabung 'more' dengan bentuk -er: cukup <b>better / bigger</b>, dst."],
    [/\bthe most best\b/i, "“the most best” → <b>the best</b>."],
    [/\bexplain me\b/i, "“explain me” → <b>explain to me</b>."],
    [/\bdepend of\b/i, "“depend of” → <b>depend on</b>."],
    [/\bmarried with\b/i, "“married with” → <b>married to</b>."],
    [/\b(?:i|we|they|you) very (?:like|love|enjoy)\b/i, "“very like” → <b>really like</b> / like ... very much."],
    [/\bcan to\b/i, "Setelah can/must/will langsung kata kerja dasar: <b>can go</b>, bukan can to go."],
    [/\bsince \d+ (?:years?|months?|days?|weeks?)\b/i, "Untuk durasi pakai <b>for</b>: for 3 years. 'since' untuk titik waktu: since 2020."],
    [/\bin the other hand\b/i, "“in the other hand” → <b>on the other hand</b>."],
    [/\bmake a homework\b|\bdo a mistake\b/i, "Kolokasi: <b>do homework</b>, <b>make a mistake</b>."],
    [/\bboth of us is\b|\beach of (?:us|them) are\b/i, "Periksa kesesuaian: both … <b>are</b>, each … <b>is</b>."]
  ];
  const AN_EXC = /^(?:uni|use|usa|usu|ute|euro|eu|one|once|ufo)/i;
  const LINKERS = ["however", "although", "because", "therefore", "moreover", "in addition", "for example", "for instance", "on the other hand", "furthermore", "as a result", "in conclusion", "nevertheless", "while", "whereas", "firstly", "finally"];
  function checkText(t) {
    const issues = [];
    const sentences = t.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
    if (/\bi\b/.test(t.replace(/\bi\.e\./g, ""))) issues.push("Kata ganti <b>I</b> (saya) selalu huruf besar.");
    if (sentences.some(s => /^[a-z]/.test(s))) issues.push("Awali setiap kalimat dengan <b>huruf besar</b>.");
    if (t.trim() && !/[.!?]["')]?$/.test(t.trim())) issues.push("Akhiri tulisan dengan <b>tanda baca</b> (titik, tanda tanya, atau seru).");
    if (/ {2,}/.test(t)) issues.push("Ada <b>spasi ganda</b>. Cukup satu spasi antar kata.");
    if (/\s[,.]/.test(t)) issues.push("Jangan beri spasi <b>sebelum</b> koma atau titik.");
    RULES.forEach(([re, msg]) => { if (re.test(t)) issues.push(msg); });
    // a / an
    (t.match(/\ba [aeiou]\w*/gi) || []).forEach(m => { const w = m.split(" ")[1]; if (!AN_EXC.test(w)) issues.push(`“${esc(m)}” → <b>an ${esc(w)}</b> (sebelum bunyi vokal).`); });
    (t.match(/\ban [bcdfgjklmnpqrstvwxyz]\w*/gi) || []).forEach(m => { const w = m.split(" ")[1]; if (!/^h(?:our|onest|onor|onour|eir)/i.test(w) && !/^[A-Z]{2,}/.test(w)) issues.push(`“${esc(m)}” → <b>a ${esc(w)}</b> (sebelum bunyi konsonan).`); });
    // he/she/it + verb dasar
    const toks = t.toLowerCase().match(/[a-z']+/g) || [];
    const AUX = new Set(["does", "did", "can", "could", "will", "would", "should", "shall", "may", "might", "must", "let", "make", "help", "to", "not"]);
    const BASE = new Set(["have", "go", "want", "like", "make", "eat", "study", "work", "live", "need", "play", "come", "say", "know", "think", "watch", "read", "write", "love", "teach", "drink", "get", "take", "do"]);
    for (let k = 0; k + 1 < toks.length; k++) {
      if (["he", "she", "it"].includes(toks[k]) && BASE.has(toks[k + 1]) && !(k > 0 && AUX.has(toks[k - 1]))) { issues.push(`“${toks[k]} ${toks[k + 1]}” → kata kerja untuk he/she/it biasanya diberi <b>-s/-es</b> (${toks[k]} ${({ have: "has", do: "does", go: "goes", study: "studies", watch: "watches", teach: "teaches" })[toks[k + 1]] || toks[k + 1] + "s"}), kecuali dalam bentuk lampau/pertanyaan.`); break; }
    }
    const wc = toks.length;
    const avg = sentences.length ? Math.round(wc / sentences.length) : 0;
    const used = LINKERS.filter(x => new RegExp("\\b" + x + "\\b", "i").test(t));
    const uniq = new Set(toks).size;
    return { issues: [...new Set(issues)], wc, sc: sentences.length, avg, used, variety: wc ? Math.round(100 * uniq / wc) : 0 };
  }
  function vJournal() {
    const lv = lvl(); const j = lv.journal;
    const draft = S.journal[lv.id] || "";
    shell("📝 Jurnal Menulis", `
      <div class="card"><span class="tag">Level ${lv.id} · min. ${j.min} kata</span>
        <p style="font-weight:700">${esc(j.prompt)}</p>
        <textarea id="jt" rows="9" placeholder="Tulis dalam bahasa Inggris...">${esc(draft)}</textarea>
        <div class="small muted" id="wc" style="margin-top:6px"></div>
        <div class="btns"><button class="btn" data-check>Cek tulisanku</button><button class="btn soft" data-say>🔊 Dengarkan</button></div>
      </div>
      <div id="res"></div>`);
    const ta = $app.querySelector("#jt");
    const upd = () => { const n = (ta.value.match(/[A-Za-z']+/g) || []).length; $app.querySelector("#wc").textContent = n + " / " + j.min + " kata"; S.journal[lv.id] = ta.value; save(); };
    ta.addEventListener("input", upd); upd();
    on("[data-say]", () => ta.value.trim() && speak(ta.value));
    on("[data-check]", () => {
      const t = ta.value.trim(); if (!t) { toast("Tulis dulu jurnalmu."); return; }
      const r = checkText(t);
      const enough = r.wc >= j.min;
      if (enough && !S.done[lv.id + ":writing:j0"]) { addXP(30); mark(lv.id + ":writing:j0"); }
      const tips = [];
      if (!enough) tips.push(`Tulisanmu ${r.wc} kata. Tambahkan detail, contoh, atau alasan sampai minimal ${j.min} kata.`);
      if (r.avg > 28) tips.push("Rata-rata kalimat cukup panjang (" + r.avg + " kata). Pecah sebagian kalimat agar lebih jelas.");
      if (r.sc >= 3 && r.avg < 7 && lv.id !== "A1") tips.push("Kalimatmu pendek-pendek. Gabungkan dengan <b>and, but, because, although</b>.");
      if (lv.id >= "B1" && r.used.length < 2) tips.push("Gunakan lebih banyak kata penghubung, misalnya <b>however, moreover, for example, as a result</b>.");
      if (r.variety < 45 && r.wc > 40) tips.push("Banyak kata diulang. Coba variasikan dengan sinonim.");
      const prompt = `Tolong periksa tulisan bahasa Inggris saya (level ${lv.id}). Jelaskan kesalahan grammar, pilihan kata, dan struktur dalam bahasa Indonesia, lalu beri versi perbaikannya.\n\nTopik: ${j.prompt}\n\nTulisan saya:\n${t}`;
      $app.querySelector("#res").innerHTML = `
        <div class="card">
          <div class="kv"><span>Jumlah kata</span><b>${r.wc}${enough ? " ✅" : ""}</b></div>
          <div class="kv"><span>Jumlah kalimat</span><b>${r.sc}</b></div>
          <div class="kv"><span>Rata-rata kata/kalimat</span><b>${r.avg}</b></div>
          <div class="kv"><span>Kata penghubung dipakai</span><b>${r.used.length ? esc(r.used.join(", ")) : "—"}</b></div>
        </div>
        <div class="sec-title">Temuan otomatis (${r.issues.length})</div>
        ${r.issues.length ? r.issues.map(x => `<div class="issue">${x}</div>`).join("") : `<div class="fb ok">✅ Tidak ada kesalahan umum yang terdeteksi.</div>`}
        ${tips.length ? `<div class="sec-title">Saran pengembangan</div>${tips.map(x => `<div class="fb info" style="margin-bottom:8px">${x}</div>`).join("")}` : ""}
        <div class="card" style="margin-top:14px"><b>Mau koreksi lebih dalam?</b><p class="small muted" style="margin:4px 0 0">Pemeriksa ini mendeteksi kesalahan umum. Untuk koreksi lengkap, salin tulisan beserta perintahnya lalu tempel ke Claude.</p>
          <div class="btns"><button class="btn soft" data-copy>📋 Salin untuk dicek AI</button></div></div>`;
      on("[data-copy]", () => {
        (navigator.clipboard ? navigator.clipboard.writeText(prompt) : Promise.reject()).then(() => toast("Tersalin! Tempel di aplikasi Claude."), () => {
          const b = sheet(`<b>Salin teks ini:</b><textarea rows="8" style="margin-top:8px">${esc(prompt)}</textarea><div class="btns"><button class="btn" data-close>Tutup</button></div>`);
          b.querySelector("[data-close]").onclick = () => b.remove();
        });
      });
    });
  }

  /* ---------- Kosakata (Leitner) ---------- */
  const INTERVAL = [0, 1, 3, 7, 16, 35];
  function cardState(lvId, k) { return S.vocab[lvId + ":" + k] || { box: 0, due: 0 }; }
  function dueCards(lv) { const now = Date.now(); return lv.vocab.map((_, k) => k).filter(k => cardState(lv.id, k).due <= now); }
  function vVocab() {
    const lv = lvl();
    const due = dueCards(lv);
    const mastered = lv.vocab.filter((_, k) => cardState(lv.id, k).box >= 3).length;
    shell("🃏 Kosakata · " + lv.id, `
      <div class="levels">${L.map(x => `<button class="lv ${x.id === S.level ? "on" : ""}" data-lv="${x.id}"><b>${x.id}</b><span>${x.name}</span></button>`).join("")}</div>
      <div class="card">
        <div class="row" style="justify-content:space-between"><b>Dikuasai</b><span>${mastered}/${lv.vocab.length}</span></div>
        <div class="prog" style="margin-top:8px"><i style="width:${100 * mastered / lv.vocab.length}%;background:var(--vocab)"></i></div>
        <p class="small muted">Kartu yang kamu jawab “Hafal” akan muncul lagi beberapa hari kemudian (1, 3, 7, 16 hari) agar masuk ke ingatan jangka panjang.</p>
        <button class="btn block" data-study ${due.length ? "" : "disabled"}>${due.length ? `Mulai ulang ${due.length} kartu` : "Semua kartu sudah diulang hari ini 🎉"}</button>
      </div>
      <div class="sec-title">Daftar kata</div>
      ${lv.vocab.map((v, k) => `<div class="card" style="padding:12px 14px;margin-bottom:8px"><div class="row"><div style="flex:1"><b>${esc(v[0])}</b> <span class="muted">— ${esc(v[1])}</span><div class="small muted"><i>${esc(v[2])}</i></div></div><button class="btn soft" style="padding:8px 12px" data-say="${k}">🔊</button></div></div>`).join("")}
    `, { tab: "practice" });
    on("[data-lv]", el => { S.level = el.dataset.lv; save(); render(); });
    on("[data-say]", el => speak(lv.vocab[+el.dataset.say][0], 0.85));
    on("[data-study]", () => go("study", { q: shuffle(due) }));
  }
  function vStudy(p) {
    const lv = lvl(); const q = p.q; const pos = p.pos || 0;
    if (pos >= q.length) {
      shell("🃏 Selesai", `<div class="card center"><div style="font-size:54px">🎉</div><h2 class="serif">Sesi selesai!</h2><p>Kamu sudah mengulang ${q.length} kartu.</p><button class="btn block" data-b>Kembali</button></div>`);
      on("[data-b]", back); return;
    }
    const k = q[pos]; const v = lv.vocab[k];
    shell("🃏 Kartu " + (pos + 1) + "/" + q.length, `
      <div class="prog" style="margin-bottom:14px"><i style="width:${100 * pos / q.length}%;background:var(--vocab)"></i></div>
      <div class="card flash" data-flip>
        <div class="word serif">${esc(v[0])}</div>
        <div id="back" style="display:none"><div class="mean">${esc(v[1])}</div><div class="ex">${esc(v[2])}</div></div>
        <div class="small muted" id="hint" style="margin-top:16px">Ketuk kartu untuk melihat arti</div>
      </div>
      <div class="btns"><button class="btn soft" data-say>🔊 Dengarkan</button></div>
      <div class="btns" id="judge" style="display:none"><button class="btn ghost" data-r="0">😕 Belum hafal</button><button class="btn" data-r="1" style="background:var(--ok)">😄 Hafal</button></div>
    `);
    speak(v[0], 0.85);
    on("[data-say]", () => speak(v[0] + ". " + v[2], 0.85));
    on("[data-flip]", () => { $app.querySelector("#back").style.display = "block"; $app.querySelector("#hint").style.display = "none"; $app.querySelector("#judge").style.display = "flex"; });
    on("[data-r]", el => {
      const st = cardState(lv.id, k);
      if (el.dataset.r === "1") { st.box = Math.min(5, st.box + 1); st.due = Date.now() + INTERVAL[st.box] * 864e5 - 36e5; addXP(5); }
      else { st.box = 0; st.due = 0; }
      S.vocab[lv.id + ":" + k] = st; save();
      const nq = el.dataset.r === "1" ? q : q.concat([k]);
      go("study", { q: nq, pos: pos + 1 }, true);
    });
  }

  /* ---------- Tes penempatan ---------- */
  function vPlacement(p) {
    const items = L.flatMap(x => x.writing.grammar.slice(0, 2).map(g => Object.assign({ lv: x.id }, g)));
    const i = p.i || 0; const score = p.score || 0;
    if (i >= items.length) {
      const rec = score <= 3 ? "A1" : score <= 5 ? "A2" : score <= 7 ? "B1" : score <= 8 ? "B2" : "C1";
      const lv = L.find(x => x.id === rec);
      shell("🎯 Hasil Tes", `<div class="card center"><div class="small muted">Skor kamu</div><div class="score">${score}/${items.length}</div>
        <p>Level yang disarankan:</p><h2 class="serif" style="font-size:34px">${rec} · ${lv.name}</h2><p class="muted">${esc(lv.desc)}</p>
        <button class="btn block" data-set>Mulai belajar di level ${rec}</button></div>
        <p class="small muted">Tes ini hanya perkiraan dari tata bahasa. Kamu bebas pindah level kapan saja di Beranda.</p>`);
      on("[data-set]", () => { S.level = rec; S.placed = true; save(); stack = [{ view: "practice", params: {} }]; render(); });
      return;
    }
    const it = items[i];
    shell("🎯 Tes Penempatan", `${wHeader(i, items.length, "Soal")}
      <div class="card"><div class="serif" style="font-size:22px;margin-bottom:14px">${esc(it.q).replace("___", "<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>")}</div>
      ${it.o.map((o, oi) => `<button class="opt" data-oi="${oi}">${esc(o)}</button>`).join("")}
      <button class="btn ghost block" style="margin-top:6px" data-skip>Saya tidak tahu</button></div>`);
    on(".opt", el => go("placement", { i: i + 1, score: score + (+el.dataset.oi === it.a ? 1 : 0) }, true));
    on("[data-skip]", () => go("placement", { i: i + 1, score }, true));
  }

  /* ---------- Progres ---------- */
  function vProgress() {
    const totalWords = L.reduce((a, x) => a + x.vocab.length, 0);
    const mastered = Object.values(S.vocab).filter(v => v.box >= 3).length;
    shell("📈 Progres", `
      <div class="card hero"><div class="k">Ringkasan</div><h2 class="serif">⭐ ${S.xp} XP</h2>
        <div class="stats"><div class="stat"><b>🔥 ${S.streak}</b>hari beruntun</div><div class="stat"><b>🃏 ${mastered}/${totalWords}</b>kata dikuasai</div></div></div>
      ${L.map(lv => `<div class="card"><div class="row" style="justify-content:space-between"><b>${lv.id} · ${lv.name}</b>${lv.id === S.level ? `<span class="tag">Aktif</span>` : ""}</div>
        ${Object.entries(SKILLS).map(([k, s]) => `<div style="margin-top:10px"><div class="row small" style="justify-content:space-between"><span>${s.ic} ${s.name}</span><span>${pct(lv, k)}%</span></div><div class="prog" style="margin-top:4px"><i style="width:${pct(lv, k)}%;background:${s.color}"></i></div></div>`).join("")}
      </div>`).join("")}
      <button class="btn ghost block" data-reset>Hapus semua progres</button>
    `, { tab: "profile" });
    on("[data-reset]", () => {
      const b = sheet(`<b>Hapus semua progres?</b><p class="muted">XP, streak, kosakata, dan jurnal akan hilang dari HP ini.</p><div class="btns"><button class="btn ghost" data-no>Batal</button><button class="btn" style="background:var(--bad)" data-yes>Hapus</button></div>`);
      b.querySelector("[data-no]").onclick = () => b.remove();
      b.querySelector("[data-yes]").onclick = () => { S = defState(); save(); b.remove(); render(); };
    });
  }

  /* ---------- Bantuan ---------- */
  function vHelp() {
    shell("💡 Bantuan", `
      <div class="card"><h3>Cara belajar yang disarankan</h3>
        <ol class="steps">
          <li>Kerjakan <b>Tes Penempatan</b> untuk tahu level awal.</li>
          <li>Setiap hari: ulang <b>Kartu Kosakata</b> (5 menit), lalu pilih 1–2 skill.</li>
          <li>Selesaikan keempat skill di satu level sebelum naik ke level berikutnya.</li>
          <li>Tulis <b>Jurnal</b> seminggu sekali, lalu salin ke Claude untuk koreksi mendalam.</li>
        </ol></div>
      <div class="card"><h3>Pasang di layar utama Android</h3>
        <ol class="steps">
          <li>Buka aplikasi ini di <b>Google Chrome</b>.</li>
          <li>Ketuk menu <b>⋮</b> di kanan atas.</li>
          <li>Pilih <b>“Instal aplikasi”</b> atau <b>“Tambahkan ke layar utama”</b>.</li>
          <li>Ikon Kawan English muncul di HP dan bisa dibuka tanpa internet.</li>
        </ol>
        <p class="small muted">Catatan: latihan Speaking (pengenalan suara) butuh koneksi internet. Fitur lain bisa dipakai offline.</p>
        ${deferredPrompt ? `<button class="btn block" data-install>📲 Pasang sekarang</button>` : ""}</div>
      <div class="card"><h3>Tentang suara</h3>
        <p class="small">Suara bahasa Inggris memakai mesin suara HP. Bila suara terdengar aneh, buka <b>Setelan → Bahasa & input → Output text-to-speech</b> dan pastikan <b>Speech Services by Google</b> dengan bahasa <b>English (US)</b> terpasang.</p></div>
      <p class="small muted center">Kawan English · progres tersimpan di HP ini</p>
    `, { tab: "profile" });
    on("[data-install]", async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; render(); });
  }

  /* ================= KURSUS (gaya Coursera) ================= */
  const C = window.COURSES || [];
  const PASS = 70;
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
  const course = id => C.find(c => c.id === id) || levelObj(id);
  const lk = (cid, m, l) => cid + ":" + m + ":" + l;
  function cStats(c) {
    let lessons = 0, ld = 0, qp = 0;
    c.M.forEach((mod, m) => { mod.L.forEach((_, l) => { lessons++; if (S.lessons[lk(c.id, m, l)]) ld++; }); if ((S.quiz[c.id + ":" + m] || 0) >= PASS) qp++; });
    const fin = (S.finals[c.id] || 0) >= PASS;
    const total = lessons + c.M.length + 1;
    const done = ld + qp + (fin ? 1 : 0);
    return { lessons, ld, qp, fin, pct: Math.round(100 * done / total), allQuiz: qp === c.M.length, mins: c.M.reduce((a, m) => a + m.L.reduce((b, l) => b + l.min, 0), 0) };
  }
  function nextStep(c) {
    for (let m = 0; m < c.M.length; m++) {
      for (let l = 0; l < c.M[m].L.length; l++) if (!S.lessons[lk(c.id, m, l)]) return { v: "lesson", p: { cid: c.id, m, l }, label: `Modul ${m + 1} · ${c.M[m].L[l].t}` };
      if ((S.quiz[c.id + ":" + m] || 0) < PASS) return { v: "quiz", p: { cid: c.id, m }, label: `Kuis Modul ${m + 1}: ${c.M[m].t}` };
    }
    if ((S.finals[c.id] || 0) < PASS) return { v: "quiz", p: { cid: c.id, m: "final" }, label: "Ujian Akhir" };
    return { v: "cert", p: { cid: c.id }, label: "Lihat sertifikat" };
  }
  function weekDays() {
    const d = new Date(); const dow = (d.getDay() + 6) % 7; const start = new Date(d.getFullYear(), d.getMonth(), d.getDate() - dow);
    const s = localDate(start);
    return (S.days || []).filter(x => x >= s).length;
  }
  function ring(val, max, color, size) {
    size = size || 84; const r = size / 2 - 7, cc = 2 * Math.PI * r, f = Math.min(1, max ? val / max : 0);
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="8"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${cc}" stroke-dashoffset="${cc * (1 - f)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
      <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="${size / 4}" font-weight="800">${val}/${max}</text></svg>`;
  }
  function courseCard(c, compact) {
    const st = cStats(c); const en = S.enrolled[c.id];
    return `<button class="ccard" data-course="${c.id}">
      <span class="cband" style="background:${c.color}"><span>${c.ic}</span><em>${esc(c.cat)}</em></span>
      <span class="cbody"><b>${esc(c.t)}</b>${compact ? "" : `<small>${esc(c.sub)}</small>`}
        <span class="cmeta">${c.level} · ${c.M.length} modul · ±${c.hours} jam${S.certs[c.id] ? " · 🏅 Lulus" : ""}</span>
        ${en ? `<span class="prog" style="margin-top:8px"><i style="width:${st.pct}%;background:${c.color}"></i></span><span class="cmeta">${st.pct}% selesai</span>` : ""}
      </span></button>`;
  }

  function vHome() {
    const name = S.name ? S.name.split(" ")[0] : "";
    const my = C.filter(c => S.enrolled[c.id]).sort((a, b) => (S.enrolled[b.id] || 0) - (S.enrolled[a.id] || 0));
    let lastC = S.last && course(S.last.cid);
    if (!lastC || S.certs[lastC.id]) lastC = my.find(c => !S.certs[c.id]) || null;
    const cont = lastC ? nextStep(lastC) : null;
    const rec = C.filter(c => !S.enrolled[c.id]);
    const wd = weekDays();
    const lv = lvl();
    shell("Kawan English", `
      <div class="card hero noorb">
        <div class="row" style="align-items:center;gap:14px;position:relative;z-index:1">
          <div style="flex:1"><div class="k">Target minggu ini</div>
            <h2 class="serif" style="max-width:none;font-size:25px">${name ? "Halo, " + esc(name) + "!" : "Halo! Ayo belajar."}</h2>
            <p style="max-width:none">${wd >= S.goal ? "🎉 Target mingguan tercapai. Luar biasa!" : `Belajar ${S.goal - wd} hari lagi untuk mencapai target ${S.goal} hari.`}</p></div>
          ${ring(wd, S.goal, "#f4b942")}
        </div>
        <div class="stats"><div class="stat"><b>🔥 ${S.streak}</b>hari beruntun</div><div class="stat"><b>⭐ ${S.xp}</b>XP</div><div class="stat"><b>🏅 ${Object.keys(S.certs).length}</b>sertifikat</div></div>
      </div>
      ${homeExtras()}
      ${talkSpot()}
      ${homeVideos()}
      ${cont ? `<div class="sec-title">Lanjutkan belajar</div>
        <button class="list-btn" data-cont><span class="ic" style="background:${lastC.color};color:#fff">${lastC.ic}</span>
          <span style="flex:1;min-width:0"><b>${esc(lastC.t)}</b><small>${esc(cont.label)}</small><span class="prog" style="margin-top:6px"><i style="width:${cStats(lastC).pct}%;background:${lastC.color}"></i></span></span><span class="chev">▶</span></button>` : ""}
      ${my.length ? `<div class="sec-title">Kursus saya</div>${my.map(c => courseCard(c, true)).join("")}` : `
        <div class="card"><b>Mulai kursus pertamamu</b><p class="small muted" style="margin:4px 0 10px">Kursus tersusun per modul: pelajaran singkat, kuis, ujian akhir, lalu sertifikat.</p><button class="btn block" data-go="courses">Jelajahi katalog kursus</button></div>`}
      ${rec.length ? `<div class="sec-title">Rekomendasi untukmu</div><div class="hscroll">${rec.map(c => courseCard(c, true)).join("")}</div>` : ""}
      <div class="sec-title">Latihan harian · Level ${lv.id}</div>
      <div class="mini">
        ${Object.entries(SKILLS).map(([k, s]) => `<button data-sk="${k}" style="background:${s.color}"><span>${s.ic}</span>${s.name}</button>`).join("")}
        <button data-go="vocab" style="background:var(--vocab)"><span>🃏</span>Kosakata${dueCards(lv).length ? ` (${dueCards(lv).length})` : ""}</button>
      </div>
    `, { root: true, tab: "home" });
    on("[data-cont]", () => go(cont.v, cont.p));
    on("[data-course]", el => go("course", { cid: el.dataset.course }));
    on("[data-go]", el => go(el.dataset.go));
    on("[data-sk]", el => go(el.dataset.sk));
    bindHomeExtras();
    on("[data-vid]", el => go("video", { id: el.dataset.vid }));
    on("[data-gomedia]", () => { stack = [{ view: "media", params: {} }]; render(); });
    on("[data-spot]", el => go("brief", { id: el.dataset.spot }));
    on("[data-spothub]", () => { stack = [{ view: "talk", params: {} }]; render(); });
  }

  let catFilter = "Semua", catQuery = "";
  function vCourses() {
    const cats = ["Semua", ...(S.jenjang === "Semua" || S.jenjang === "Umum" ? ["Jalur Level"] : []), ...new Set(C.filter(c => S.jenjang === "Semua" || (c.path || "Umum") === S.jenjang).map(c => c.cat))];
    const JJ = ["Semua", "SD", "SMP", "SMA", "Umum"];
    const pathOf = c => c.path || "Umum";
    const list = () => C.filter(c => (S.jenjang === "Semua" || pathOf(c) === S.jenjang) && (catFilter === "Semua" || c.cat === catFilter) && (!catQuery || (c.t + " " + c.sub + " " + c.skills.join(" ")).toLowerCase().includes(catQuery.toLowerCase())));
    shell("Katalog Kursus", `
      <input type="text" id="q" placeholder="🔍  Cari kursus atau keterampilan..." value="${esc(catQuery)}" autocomplete="off">
      <div class="seg jj" style="margin-top:12px">${JJ.map(j => `<button class="${j === S.jenjang ? "on" : ""}" data-jj="${j}">${j === "Semua" ? "Semua jenjang" : j === "Umum" ? "Umum & Dewasa" : j}<small>${j === "Semua" ? C.length + L.length : C.filter(c => pathOf(c) === j).length + (j === "Umum" ? L.length : 0)} kursus</small></button>`).join("")}</div>
      <div class="levels" style="margin-top:12px">${cats.map(k => `<button class="lv ${k === catFilter ? "on" : ""}" data-cat="${esc(k)}" style="padding:8px 14px"><b style="font-size:14px">${esc(k)}</b></button>`).join("")}</div>
      <div id="list"></div>
      <p class="small muted center">Semua kursus gratis · sertifikat diterbitkan setelah lulus ujian akhir</p>
    `, { root: true, tab: "courses" });
    const draw = () => {
      const l = list();
      const q = catQuery.toLowerCase();
      const lv = (S.jenjang === "Semua" || S.jenjang === "Umum") && (catFilter === "Semua" || catFilter === "Jalur Level") ? L.filter(x => !q || (x.id + " " + COURSE_INFO[x.id].title + " " + x.name + " " + x.desc + " level jalur cefr").toLowerCase().includes(q)) : [];
      const lvHTML = lv.length ? `<div class="card hero noorb" style="margin-top:4px"><div class="k">Jalur level CEFR</div><h2 class="serif" style="max-width:none;font-size:22px">Dari nol sampai mahir, A1–C1</h2><p style="max-width:none">Kursus berurutan dari bank latihan Reading, Listening, Speaking, Writing, dan kosakata. Ujian akhir + sertifikat di tiap level.</p>
        <div class="path">${L.map(x => `<span class="pnode ${S.certs[x.id] ? "ok" : S.enrolled[x.id] ? "on" : ""}">${x.id}</span>`).join('<span class="pline"></span>')}</div></div>${catFilter === "Jalur Level" ? lv.map(levelCard).join("") : `<div class="hscroll">${lv.map(levelCard).join("")}</div>`}` : "";
      const tHTML = catFilter === "Jalur Level" ? "" : (l.length ? `${lv.length ? '<div class="sec-title">Kursus topik</div>' : ""}${l.map(c => courseCard(c)).join("")}` : "");
      $app.querySelector("#list").innerHTML = (lvHTML + tHTML) || `<div class="card center muted">Tidak ada kursus yang cocok.</div>`;
      $app.querySelectorAll("#list [data-course]").forEach(b => b.onclick = () => go("course", { cid: b.dataset.course }));
      $app.querySelectorAll("#list [data-lcourse]").forEach(b => b.onclick = () => go("level", { id: b.dataset.lcourse }));
    };
    draw();
    $app.querySelector("#q").addEventListener("input", e => { catQuery = e.target.value; draw(); });
    on("[data-cat]", el => { catFilter = el.dataset.cat; render(); });
    on("[data-jj]", el => { S.jenjang = el.dataset.jj; catFilter = "Semua"; save(); render(); });
  }

  function vCourse(p) {
    const c = course(p.cid); if (!c) return go("courses", {}, true);
    const st = cStats(c); const en = S.enrolled[c.id]; const nx = nextStep(c);
    shell(esc(c.cat), `
      <div class="banner" style="background:${c.color}"><div class="bic">${c.ic}</div>
        <h2 class="serif">${esc(c.t)}</h2><p>${esc(c.sub)}</p>
        <div class="bmeta"><span>📶 ${c.level}</span><span>⏱ ±${c.hours} jam</span><span>📚 ${c.M.length} modul</span><span>🏅 Sertifikat</span></div></div>
      ${en ? `<div class="card"><div class="row" style="justify-content:space-between"><b>Progres kursus</b><b>${st.pct}%</b></div>
          <div class="prog" style="margin:8px 0 12px"><i style="width:${st.pct}%;background:${c.color}"></i></div>
          <div class="small muted">${st.ld}/${st.lessons} pelajaran · ${st.qp}/${c.M.length} kuis lulus · ujian akhir ${st.fin ? "✅" : "belum"}</div>
          <button class="btn block" style="margin-top:12px;background:${c.color}" data-next>${S.certs[c.id] ? "🏅 Lihat sertifikat" : "▶ Lanjutkan: " + esc(nx.label)}</button></div>`
      : `<button class="btn block" style="background:${c.color};padding:16px;margin-bottom:14px" data-enroll>Daftar Gratis</button>`}
      <div class="card"><h3 style="margin-bottom:8px">Yang akan Anda pelajari</h3>${c.learn.map(x => `<div class="learn">✓ <span>${esc(x)}</span></div>`).join("")}
        <div style="margin-top:12px">${c.skills.map(s => `<span class="tag" style="margin:0 6px 6px 0">${esc(s)}</span>`).join("")}</div></div>
      <div class="sec-title">Silabus</div>
      ${c.M.map((mod, m) => {
        const qs = S.quiz[c.id + ":" + m];
        return `<details class="mod" ${en && nx.p.m === m ? "open" : ""}><summary><span class="mnum" style="background:${c.color}">${m + 1}</span><span style="flex:1"><b>${esc(mod.t)}</b><small>${esc(mod.d)} · ${mod.L.reduce((a, l) => a + l.min, 0)} menit</small></span>${qs >= PASS ? `<span class="done-dot">✓</span>` : ""}</summary>
          ${mod.L.map((les, l) => `<button class="item" data-les="${m}:${l}"><span>${S.lessons[lk(c.id, m, l)] ? "✅" : "📄"}</span><span style="flex:1">${esc(les.t)}</span><small>${les.min} mnt</small></button>`).join("")}
          <button class="item" data-quiz="${m}"><span>${qs >= PASS ? "✅" : "📝"}</span><span style="flex:1">Kuis: ${esc(mod.t)}</span><small>${qs !== undefined ? "Nilai " + qs + "%" : mod.Q.length + " soal"}</small></button>
        </details>`;
      }).join("")}
      <button class="list-btn" data-final ${st.allQuiz ? "" : "style='opacity:.6'"}><span class="ic">${st.allQuiz ? "🎓" : "🔒"}</span><span><b>Ujian Akhir</b><small>${st.allQuiz ? (S.finals[c.id] !== undefined ? "Nilai terbaik " + S.finals[c.id] + "% · " : "") + "10 soal · lulus ≥ " + PASS + "%" : "Terbuka setelah semua kuis modul lulus"}</small></span><span class="chev">›</span></button>
      ${S.certs[c.id] ? `<button class="list-btn" data-cert><span class="ic">🏅</span><span><b>Sertifikat Penyelesaian</b><small>Diterbitkan ${S.certs[c.id].date}</small></span><span class="chev">›</span></button>` : ""}
    `);
    const ensure = () => { if (!S.enrolled[c.id]) { S.enrolled[c.id] = Date.now(); S.last = { cid: c.id }; save(); } };
    on("[data-enroll]", () => { ensure(); toast("Berhasil mendaftar. Selamat belajar!"); const n = nextStep(c); go(n.v, n.p); });
    on("[data-next]", () => { const n = nextStep(c); go(n.v, n.p); });
    on("[data-les]", el => { ensure(); const [m, l] = el.dataset.les.split(":").map(Number); go("lesson", { cid: c.id, m, l }); });
    on("[data-quiz]", el => { ensure(); go("quiz", { cid: c.id, m: +el.dataset.quiz }); });
    on("[data-final]", () => { if (!st.allQuiz) { toast("Selesaikan semua kuis modul (≥" + PASS + "%) dulu."); return; } go("quiz", { cid: c.id, m: "final" }); });
    on("[data-cert]", () => go("cert", { cid: c.id }));
  }

  function listenOnce(onAlts, onStatus) {
    if (!SR) return false;
    const rec = new SR(); rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 4;
    rec.onresult = e => { const r = e.results[0]; const a = []; for (let k = 0; k < r.length; k++) a.push(r[k].transcript); onAlts(a); };
    rec.onerror = e => onStatus(e.error === "not-allowed" ? "Izin mikrofon ditolak." : e.error === "no-speech" ? "Suara tidak terdengar, coba lagi." : e.error === "network" ? "Butuh internet." : "Gagal: " + e.error);
    rec.onend = () => onStatus(null);
    try { rec.start(); onStatus("🎙 Mendengarkan..."); } catch (err) { onStatus("Mikrofon tidak bisa dimulai."); }
    return true;
  }
  const speakable = en => en.split(" = ")[0].replace(/\([^)]*\)/g, "").replace(/→/g, ",").replace(/\s\/\s/g, ", ").replace(/\s+/g, " ").trim();
  function vLesson(p) {
    const c = course(p.cid); const mod = c.M[p.m]; const les = mod.L[p.l]; const key = lk(c.id, p.m, p.l);
    S.last = { cid: c.id, m: p.m, l: p.l }; save();
    const exAll = [];
    const blocks = les.b.map(([t, v], bi) => {
      if (t === "p") return `<p class="lp">${md(v)}</p>`;
      if (t === "rule") return `<div class="rule"><div class="small" style="opacity:.7;font-weight:800;letter-spacing:.06em">POLA</div>${md(v)}</div>`;
      if (t === "tip") return `<div class="tipbox"><b>⚠️ Perhatikan</b><br>${md(v)}</div>`;
      if (t === "ex") return `<div class="exs">${v.map(([en, id]) => { exAll.push(speakable(en)); return `<div class="exr"><button class="spk" data-sp="${exAll.length - 1}">🔊</button><div><b>${esc(en)}</b><div class="small muted">${esc(id)}</div></div></div>`; }).join("")}</div>`;
      if (t === "write") { const wk = key + ":w" + bi; return `<div class="wbox"><div class="small muted">✍️ Latihan menulis · min. ${les.b[bi][2]} kata</div><p style="font-weight:700;margin:6px 0 8px">${esc(v)}</p>
        <textarea rows="7" data-wt="${wk}" placeholder="Tulis jawaban dalam bahasa Inggris...">${esc(S.notes[wk] || "")}</textarea>
        <div class="small muted" data-wc="${wk}"></div>
        <div class="btns"><button class="btn soft" data-wcheck="${wk}" data-min="${les.b[bi][2]}">Cek tulisanku</button><button class="btn soft" data-wcopy="${wk}">📋 Salin untuk AI</button></div><div data-wres="${wk}"></div></div>`; }
      if (t === "video") return videoBlock(v, les.b[bi][2]);
      if (t === "say") return `<div class="exs"><div class="small muted" style="margin-bottom:6px">🎤 Latihan ucap: dengarkan, lalu ketuk mikrofon dan tirukan.</div>${v.map(s => { exAll.push(s); const k = exAll.length - 1; return `<div class="exr"><button class="spk" data-sp="${k}">🔊</button><div style="flex:1"><b>${esc(s)}</b><div class="small" id="sr${k}"></div></div><button class="spk mic2" data-mic="${k}">🎙</button></div>`; }).join("")}</div>`;
      return "";
    }).join("");
    const last = p.l === mod.L.length - 1;
    shell(`Modul ${p.m + 1}`, `
      <div class="small muted">${esc(c.t)} · Pelajaran ${p.l + 1}/${mod.L.length}</div>
      <h2 class="serif" style="font-size:26px;margin:6px 0 4px">${esc(les.t)}</h2>
      <div class="small muted" style="margin-bottom:14px">⏱ ${les.min} menit · ${esc(mod.t)}</div>
      <div class="card">${blocks}</div>
      <div class="card"><b>📒 Catatan saya</b><textarea id="note" rows="3" placeholder="Tulis catatan atau contoh kalimatmu sendiri..." style="margin-top:8px">${esc(S.notes[key] || "")}</textarea></div>
      <button class="btn block" style="background:${c.color};padding:16px" data-done>${S.lessons[key] ? "Lanjut" : "Tandai selesai & lanjut"} → ${last ? "Kuis modul" : "Pelajaran berikutnya"}</button>
      <button class="btn ghost block" style="margin-top:10px" data-syl>Lihat silabus</button>
    `);
    on("[data-vid]", el => go("video", { id: el.dataset.vid }));
    $app.querySelectorAll("[data-wt]").forEach(ta => {
      const k = ta.dataset.wt; const wc = $app.querySelector(`[data-wc="${k}"]`);
      const upd = () => { wc.textContent = (ta.value.match(/[A-Za-z']+/g) || []).length + " kata"; S.notes[k] = ta.value; save(); };
      ta.addEventListener("input", upd); upd();
    });
    on("[data-wcheck]", el => {
      const k = el.dataset.wcheck, min = +el.dataset.min, t = (S.notes[k] || "").trim();
      if (!t) { toast("Tulis jawabanmu dulu."); return; }
      const r = checkText(t);
      if (r.wc >= min && !S.done["w:" + k]) { S.done["w:" + k] = 1; addXP(20); }
      $app.querySelector(`[data-wres="${k}"]`).innerHTML = `<div class="fb ${r.wc >= min ? "ok" : "info"}" style="margin-top:10px">${r.wc} kata ${r.wc >= min ? "✅" : "· target " + min + " kata"} · ${r.sc} kalimat · penghubung: ${r.used.length ? esc(r.used.join(", ")) : "—"}</div>
        ${r.issues.length ? r.issues.map(x => `<div class="issue" style="margin-top:8px">${x}</div>`).join("") : `<div class="fb ok" style="margin-top:8px">Tidak ada kesalahan umum yang terdeteksi.</div>`}`;
    });
    on("[data-wcopy]", el => {
      const k = el.dataset.wcopy; const bi = +k.split(":w")[1]; const t = (S.notes[k] || "").trim();
      if (!t) { toast("Tulis jawabanmu dulu."); return; }
      const prompt = `Tolong periksa jawaban latihan bahasa Inggris saya dari kursus "${c.t}". Jelaskan kesalahan dan perbaikannya dalam bahasa Indonesia, lalu beri versi yang sudah diperbaiki.\n\nSoal: ${les.b[bi][1]}\n\nJawaban saya:\n${t}`;
      (navigator.clipboard ? navigator.clipboard.writeText(prompt) : Promise.reject()).then(() => toast("Tersalin! Tempel di aplikasi Claude."), () => {
        const b = sheet(`<b>Salin teks ini:</b><textarea rows="8" style="margin-top:8px">${esc(prompt)}</textarea><div class="btns"><button class="btn" data-close>Tutup</button></div>`);
        b.querySelector("[data-close]").onclick = () => b.remove();
      });
    });
    $app.querySelector("#note").addEventListener("input", e => { S.notes[key] = e.target.value; save(); });
    on("[data-sp]", el => speak(exAll[+el.dataset.sp], 0.85));
    on("[data-mic]", el => {
      const k = +el.dataset.mic; const out = $app.querySelector("#sr" + k);
      const ok = listenOnce(alts => {
        let top = null; alts.forEach(a => { const d = diffHTML(exAll[k], words(a)); if (!top || d.score > top.score) top = d; });
        out.innerHTML = `<span style="font-weight:800;color:${top.score >= 70 ? "var(--ok)" : "var(--speak)"}">${top.score}%</span> <span class="words" style="font-size:14px">${top.html}</span>`;
        if (top.score >= 80) addXP(5);
      }, msg => { if (msg) out.textContent = msg; el.classList.toggle("rec", msg === "🎙 Mendengarkan..."); });
      if (!ok) toast("Pengenalan suara butuh Google Chrome di Android.");
    });
    on("[data-done]", () => {
      if (!S.lessons[key]) { S.lessons[key] = 1; addXP(10); }
      save();
      if (last) go("quiz", { cid: c.id, m: p.m }, true); else go("lesson", { cid: c.id, m: p.m, l: p.l + 1 }, true);
    });
    on("[data-syl]", back);
  }

  function vQuiz(p) {
    const c = course(p.cid); const fin = p.m === "final";
    let qs = p.qs;
    if (!qs) {
      qs = fin ? shuffle(c.M.flatMap(m => m.Q)).slice(0, 10) : c.M[p.m].Q;
      stack[stack.length - 1].params.qs = qs;
    }
    const prev = fin ? S.finals[c.id] : S.quiz[c.id + ":" + p.m];
    const ans = {};
    shell(fin ? "Ujian Akhir" : "Kuis Modul " + (p.m + 1), `
      <div class="card" style="background:${c.color};color:#fff;border:none">
        <div class="small" style="opacity:.85">${esc(c.t)}</div>
        <h2 class="serif" style="font-size:22px;margin:4px 0">${fin ? "Ujian Akhir Kursus" : esc(c.M[p.m].t)}</h2>
        <div class="small">${qs.length} soal · nilai lulus ${PASS}%${prev !== undefined ? " · nilai terbaik " + prev + "%" : ""}</div></div>
      ${qs.map((q, i) => `<div class="card q" data-q="${i}"><p>${i + 1}. ${esc(q.q)}</p>${q.o.map((o, k) => `<button class="opt" data-i="${i}" data-k="${k}">${esc(o)}</button>`).join("")}<div class="fbx"></div></div>`).join("")}
      <button class="btn block" style="padding:16px" data-submit>Kumpulkan jawaban</button>
      <div id="result"></div>
    `);
    on(".opt", el => {
      if ($app.querySelector("[data-submit]").disabled) return;
      const i = +el.dataset.i; ans[i] = +el.dataset.k;
      $app.querySelectorAll(`.opt[data-i="${i}"]`).forEach(b => b.classList.toggle("sel", b === el));
    });
    on("[data-submit]", el => {
      if (Object.keys(ans).length < qs.length) { toast(`Jawab semua soal dulu (${Object.keys(ans).length}/${qs.length}).`); return; }
      el.disabled = true;
      let right = 0;
      qs.forEach((q, i) => {
        const ok = ans[i] === q.a; if (ok) right++;
        const box = $app.querySelector(`[data-q="${i}"]`);
        box.querySelectorAll(".opt").forEach((b, k) => { b.classList.remove("sel"); if (k === q.a) b.classList.add("right"); else if (k === ans[i]) b.classList.add("wrong"); });
        box.querySelector(".fbx").innerHTML = `<div class="fb ${ok ? "ok" : "no"}">${ok ? "✅" : "❌"} ${esc(q.e)}</div>`;
      });
      const score = Math.round(100 * right / qs.length); const pass = score >= PASS;
      const firstPass = pass && !((prev || 0) >= PASS);
      if (fin) S.finals[c.id] = Math.max(prev || 0, score); else S.quiz[c.id + ":" + p.m] = Math.max(prev || 0, score);
      if (firstPass) addXP(fin ? 100 : 30);
      let newCert = false;
      if (fin && pass && !S.certs[c.id]) {
        const date = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
        S.certs[c.id] = { date, score, id: "KE-" + c.id.slice(0, 3).toUpperCase() + "-" + (Math.abs(hash(c.id + Date.now())) % 46656 ** 2).toString(36).toUpperCase().padStart(6, "0") };
        newCert = true;
      }
      save();
      const nx = nextStep(c);
      $app.querySelector("#result").innerHTML = `<div class="card center" style="margin-top:14px">
        <div style="font-size:46px">${pass ? (fin ? "🎓" : "🎉") : "📘"}</div>
        <div class="score" style="color:${pass ? "var(--ok)" : "var(--bad)"}">${score}%</div>
        <p><b>${pass ? (fin ? "Selamat, Anda lulus kursus ini!" : "Lulus! Modul selesai.") : "Belum lulus."}</b><br><span class="muted small">${right} dari ${qs.length} benar · ${pass ? "" : "Pelajari ulang materinya lalu coba lagi."}</span></p>
        <div class="btns">${pass ? (newCert || fin ? `<button class="btn" style="background:${c.color}" data-cert>🏅 Lihat sertifikat</button>` : `<button class="btn" style="background:${c.color}" data-nx>Lanjut: ${esc(nx.label)}</button>`) : `<button class="btn" data-retry>Coba lagi</button>`}<button class="btn ghost" data-syl>Silabus</button></div></div>`;
      $app.querySelector("#result").scrollIntoView({ behavior: "smooth" });
      on("[data-cert]", () => go("cert", { cid: c.id }, true));
      on("[data-nx]", () => go(nx.v, nx.p, true));
      on("[data-retry]", () => go("quiz", { cid: c.id, m: p.m }, true));
      on("[data-syl]", back);
    });
  }
  function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; }

  function drawCert(c, cert, name) {
    const W = 1600, H = 1130; const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d");
    x.fillStyle = "#fffdf7"; x.fillRect(0, 0, W, H);
    x.strokeStyle = "#14324f"; x.lineWidth = 18; x.strokeRect(40, 40, W - 80, H - 80);
    x.strokeStyle = c.color; x.lineWidth = 4; x.strokeRect(78, 78, W - 156, H - 156);
    x.fillStyle = "#f4b942"; x.beginPath(); x.arc(W - 200, 210, 70, 0, 2 * Math.PI); x.fill();
    x.fillStyle = "#14324f"; x.font = "800 30px 'Plus Jakarta Sans', Arial"; x.textAlign = "left"; x.fillText("KAWAN ENGLISH", 150, 190);
    x.textAlign = "center";
    x.font = "700 30px 'Plus Jakarta Sans', Arial"; x.fillStyle = c.color; x.fillText("SERTIFIKAT PENYELESAIAN", W / 2, 320);
    x.font = "italic 28px Georgia, serif"; x.fillStyle = "#6f8094"; x.fillText("Certificate of Completion", W / 2, 365);
    x.font = "26px 'Plus Jakarta Sans', Arial"; x.fillStyle = "#3d5671"; x.fillText("diberikan kepada", W / 2, 450);
    let fs = 84; x.font = `700 ${fs}px Fraunces, Georgia, serif`; while (x.measureText(name).width > W - 360 && fs > 40) { fs -= 4; x.font = `700 ${fs}px Fraunces, Georgia, serif`; }
    x.fillStyle = "#14324f"; x.fillText(name, W / 2, 560);
    x.strokeStyle = "#e6ddcf"; x.lineWidth = 2; x.beginPath(); x.moveTo(400, 600); x.lineTo(W - 400, 600); x.stroke();
    x.font = "26px 'Plus Jakarta Sans', Arial"; x.fillStyle = "#3d5671"; x.fillText("telah menyelesaikan seluruh modul dan lulus ujian akhir kursus", W / 2, 670);
    let ts = 46; x.font = `700 ${ts}px Fraunces, Georgia, serif`; while (x.measureText(c.t).width > W - 300 && ts > 28) { ts -= 2; x.font = `700 ${ts}px Fraunces, Georgia, serif`; }
    x.fillStyle = c.color; x.fillText(c.t, W / 2, 750);
    x.font = "24px 'Plus Jakarta Sans', Arial"; x.fillStyle = "#3d5671";
    x.fillText(`Level ${c.level}  ·  ${c.M.length} modul  ·  Nilai ujian akhir ${cert.score}%`, W / 2, 805);
    x.font = "600 24px 'Plus Jakarta Sans', Arial"; x.fillStyle = "#14324f";
    x.textAlign = "left"; x.fillText(cert.date, 150, 950); x.font = "20px 'Plus Jakarta Sans', Arial"; x.fillStyle = "#6f8094"; x.fillText("Tanggal terbit", 150, 980);
    x.textAlign = "right"; x.font = "600 24px 'Plus Jakarta Sans', Arial"; x.fillStyle = "#14324f"; x.fillText(cert.id, W - 150, 950);
    x.font = "20px 'Plus Jakarta Sans', Arial"; x.fillStyle = "#6f8094"; x.fillText("ID Sertifikat", W - 150, 980);
    x.textAlign = "center"; x.font = "18px 'Plus Jakarta Sans', Arial"; x.fillText("Sertifikat belajar mandiri, bukan sertifikasi resmi.", W / 2, 1035);
    return cv;
  }
  function vCert(p) {
    const c = course(p.cid); const cert = S.certs[c.id];
    if (!cert) { c.isLevel ? go("level", { id: c.id }, true) : go("course", { cid: c.id }, true); return; }
    if (!S.name) {
      shell("Sertifikat", `<div class="card center"><div style="font-size:54px">🎓</div><h2 class="serif">Selamat!</h2><p>Tulis nama lengkap Anda sebagaimana ingin tercantum di sertifikat.</p>
        <input type="text" id="nm" placeholder="Nama lengkap dan gelar" autocomplete="name"><div class="btns"><button class="btn" data-ok>Buat sertifikat</button></div></div>`);
      on("[data-ok]", () => { const v = $app.querySelector("#nm").value.trim(); if (!v) { toast("Nama belum diisi."); return; } S.name = v; save(); render(); });
      return;
    }
    shell("Sertifikat", `<div class="card" style="padding:10px"><img id="cimg" alt="Sertifikat" style="width:100%;border-radius:10px;display:block"></div>
      <div class="btns"><a class="btn" id="dl" download="Sertifikat-${c.id}.png" style="text-decoration:none">⬇️ Unduh PNG</a><button class="btn ghost" data-name>✏️ Ubah nama</button></div>
      <p class="small muted center" style="margin-top:14px">ID ${cert.id} · diterbitkan ${cert.date}</p>`);
    const paint = () => { const url = drawCert(c, cert, S.name).toDataURL("image/png"); $app.querySelector("#cimg").src = url; $app.querySelector("#dl").href = url; };
    paint(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if ($app.querySelector("#cimg")) paint(); });
    on("[data-name]", () => { S.name = ""; save(); render(); });
  }

  const BADGES = [
    ["🌱", "Langkah Pertama", "Selesaikan 1 pelajaran", () => Object.keys(S.lessons).length >= 1],
    ["📝", "Rajin Kuis", "Lulus 5 kuis modul", () => Object.values(S.quiz).filter(v => v >= PASS).length >= 5],
    ["🎓", "Lulusan", "Raih sertifikat pertama", () => Object.keys(S.certs).length >= 1],
    ["🏆", "Kolektor Sertifikat", "Raih 3 sertifikat", () => Object.keys(S.certs).length >= 3],
    ["🔥", "Api Semangat", "Belajar 7 hari beruntun", () => S.streak >= 7],
    ["🎯", "Target Tercapai", "Penuhi target mingguan", () => weekDays() >= S.goal],
    ["⭐", "Pembelajar 500", "Kumpulkan 500 XP", () => S.xp >= 500],
    ["🃏", "Kamus Berjalan", "Kuasai 30 kosakata", () => Object.values(S.vocab).filter(v => v.box >= 3).length >= 30],
    ["💬", "Berani Bicara", "Selesaikan 1 percakapan", () => (S.convos || []).length >= 1],
    ["🎭", "Aktor Serba Bisa", "Selesaikan 5 skenario berbeda", () => new Set((S.convos || []).filter(c => c.kind === "sc").map(c => c.id)).size >= 5],
    ["🗣️", "Lancar Ngobrol", "Skor ≥ 85% di 3 percakapan", () => (S.convos || []).filter(c => c.score >= 85).length >= 3],
    ["🤝", "Murid Tutor", "Pesan les pertama", () => (S.bookings || []).length >= 1]
  ];
  function vProfile() {
    const certs = C.concat(L.map(lv => levelObj(lv.id))).filter(c => S.certs[c.id]);
    shell("Profil", `
      <div class="card"><b>Nama untuk sertifikat</b><input type="text" id="nm" value="${esc(S.name)}" placeholder="Nama lengkap dan gelar" style="margin-top:8px" autocomplete="name">
        <div style="margin-top:14px"><b>Target belajar mingguan</b></div>
        <div class="rates" style="justify-content:flex-start;margin-top:8px">${[3, 5, 7].map(g => `<button data-goal="${g}" class="${S.goal === g ? "on" : ""}">${g} hari</button>`).join("")}</div></div>
      <div class="sec-title">Sertifikat saya (${certs.length})</div>
      ${certs.length ? certs.map(c => `<button class="list-btn" data-cert="${c.id}"><span class="ic" style="background:${c.color};color:#fff">🏅</span><span><b>${esc(c.t)}</b><small>${S.certs[c.id].date} · nilai ${S.certs[c.id].score}%</small></span><span class="chev">›</span></button>`).join("") : `<div class="card small muted">Belum ada sertifikat. Selesaikan sebuah kursus untuk mendapatkannya.</div>`}
      <div class="sec-title">Lencana</div>
      <div class="badges">${BADGES.map(([i, n, d, f]) => { const got = f(); return `<div class="badge ${got ? "" : "off"}"><span>${i}</span><b>${n}</b><small>${d}</small></div>`; }).join("")}</div>
      <div class="sec-title">Lainnya</div>
      <button class="list-btn" data-go="lessons"><span class="ic">📅</span><span><b>Jadwal les dengan tutor</b><small>${S.bookings.filter(b => b.status === "booked" && b.start + b.dur * 6e4 > Date.now()).length} pelajaran akan datang</small></span><span class="chev">›</span></button>
      <button class="list-btn" data-go="aisettings"><span class="ic">🤖</span><span><b>Tutor AI (Gemini)</b><small>${S.aiKey ? "Terhubung" : "Belum terhubung · opsional & gratis"}</small></span><span class="chev">›</span></button>
      <button class="list-btn" data-go="tutors"><span class="ic">🧑‍🏫</span><span><b>Les privat dengan tutor</b><small>Profil tutor contoh & pemesanan</small></span><span class="chev">›</span></button>
      <button class="list-btn" data-go="library"><span class="ic">📚</span><span><b>Pustaka buku & perangkat ajar</b><small>Dari folder Drive BAHASA INGGRIS</small></span><span class="chev">›</span></button>
      <button class="list-btn" data-go="progress"><span class="ic">📈</span><span><b>Progres latihan per level</b><small>Reading, Listening, Speaking, Writing</small></span><span class="chev">›</span></button>
      <button class="list-btn" data-go="help"><span class="ic">💡</span><span><b>Bantuan & cara pasang</b><small>Tips belajar, instalasi, pengaturan suara</small></span><span class="chev">›</span></button>
    `, { root: true, tab: "profile" });
    $app.querySelector("#nm").addEventListener("change", e => { S.name = e.target.value.trim(); save(); toast("Nama tersimpan."); });
    on("[data-goal]", el => { S.goal = +el.dataset.goal; save(); render(); });
    on("[data-cert]", el => go("cert", { cid: el.dataset.cert }));
    on("[data-go]", el => go(el.dataset.go));
  }


  /* =====================================================================
     JALUR LEVEL A1–C1 (kursus dari bank latihan per level)
     ===================================================================== */
  const COURSE_INFO = {
    A1: { title: "English Starter", hours: 10, learn: ["Memperkenalkan diri, keluarga, dan pekerjaan", "Memakai to be, present simple, dan a/an dengan benar", "Memahami percakapan pendek tentang belanja dan rutinitas"] },
    A2: { title: "Everyday English", hours: 14, learn: ["Bercerita tentang masa lalu dan rencana", "Membandingkan barang, tempat, dan pilihan", "Bertahan dalam percakapan praktis: perjalanan, janji, restoran"] },
    B1: { title: "Confident Communicator", hours: 18, learn: ["Menyampaikan pendapat beserta alasan", "Memahami artikel dan audio tentang topik umum", "Menulis paragraf runtut dengan kata penghubung"] },
    B2: { title: "Professional English", hours: 22, learn: ["Berdiskusi dan berargumen di lingkungan kerja", "Memahami teks dan audio yang lebih kompleks", "Menulis email dan esai yang terstruktur"] },
    C1: { title: "Advanced Fluency", hours: 26, learn: ["Berbicara lancar dengan nuansa dan register yang tepat", "Memahami teks akademik dan opini panjang", "Menulis argumen yang persuasif dan rapi"] }
  };
  const EXAM_UNLOCK = 80, EXAM_PASS = 70;
  const courseTitle = id => `${id} · ${(COURSE_INFO[id] || {}).title || ""}`;
  const fmtDate = t => new Date(t).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const fmtDay = t => new Date(t).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" });
  const fmtTime = t => new Date(t).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const rp = n => "Rp" + Math.round(n).toLocaleString("id-ID");

  const LCOLORS = { A1: "#0f8a7e", A2: "#2a6fdb", B1: "#6b4fc8", B2: "#e2553f", C1: "#14324f" };
  const levelObj = id => { const lv = L.find(x => x.id === id); if (!lv) return null; const ci = COURSE_INFO[id]; return { id, t: courseTitle(id), color: LCOLORS[id], ic: "🎓", level: "CEFR " + id, cat: "Jalur Level", M: { length: 5 }, isLevel: true, hours: ci.hours, sub: lv.desc }; };
  function courseModules(lv) {
    const D = k => !!S.done[lv.id + ":" + k];
    const open = (view, params) => () => { S.level = lv.id; save(); go(view, params); };
    const vDone = lv.vocab.filter((_, k) => cardState(lv.id, k).box >= 1).length;
    const w = lv.writing;
    return [
      { key: "vocab", ic: "🃏", title: "Kosakata inti", desc: "Hafalkan kata kunci level ini dengan kartu ulang berkala.",
        items: [{ label: `Latih ${lv.vocab.length} kartu kosakata`, type: "Kartu", n: vDone, of: lv.vocab.length, open: open("vocab") }] },
      { key: "reading", ic: "📖", title: "Membaca", desc: "Teks pendek dengan glosarium dan soal pemahaman.",
        items: lv.reading.map((r, i) => ({ label: r.title, type: "Bacaan", n: D("reading:" + i) ? 1 : 0, of: 1, open: open("passage", { i }) })) },
      { key: "listening", ic: "🎧", title: "Menyimak", desc: "Dikte dan soal pemahaman audio.",
        items: lv.listening.map((it, i) => ({ label: it.q ? "Pemahaman: " + it.q : "Dikte kalimat " + (i + 1), type: "Audio", n: D("listening:" + i) ? 1 : 0, of: 1, open: open("listening", { i }) })) },
      { key: "speaking", ic: "🎤", title: "Berbicara", desc: "Tirukan kalimat dan dapatkan skor pelafalan.",
        items: lv.speaking.map((it, i) => ({ label: it[0], type: "Latihan suara", n: D("speaking:" + i) ? 1 : 0, of: 1, open: open("speaking", { i }) })) },
      { key: "writing", ic: "✍️", title: "Menulis", desc: "Terjemahan, susun kalimat, tata bahasa, dan jurnal.",
        items: [].concat(
          w.translate.map((it, i) => ({ label: "Terjemahkan: " + it.id, type: "Menulis", n: D("writing:t" + i) ? 1 : 0, of: 1, open: open("w_translate", { i }) })),
          w.arrange.map((_, i) => ({ label: "Susun kalimat " + (i + 1), type: "Menulis", n: D("writing:a" + i) ? 1 : 0, of: 1, open: open("w_arrange", { i }) })),
          w.grammar.map((_, i) => ({ label: "Tata bahasa " + (i + 1), type: "Kuis", n: D("writing:g" + i) ? 1 : 0, of: 1, open: open("w_grammar", { i }) })),
          [{ label: "Jurnal menulis (min. " + lv.journal.min + " kata)", type: "Tugas", n: D("writing:j0") ? 1 : 0, of: 1, open: open("w_journal") }]) }
    ];
  }
  function coursePct(lv) {
    let n = 0, of = 0;
    courseModules(lv).forEach(m => m.items.forEach(it => { n += it.n; of += it.of; }));
    return of ? Math.round(100 * n / of) : 0;
  }
  const modPct = m => { let n = 0, of = 0; m.items.forEach(it => { n += it.n; of += it.of; }); return of ? Math.round(100 * n / of) : 0; };

  function levelCard(lv) {
    const c = COURSE_INFO[lv.id]; const p = coursePct(lv); const enr = S.enrolled[lv.id]; const cert = S.certs[lv.id];
    return `<button class="lcard" data-lcourse="${lv.id}">
      <span class="lban lv-${lv.id}"><span class="lbadge">${lv.id}</span><span class="lico">${cert ? "🏅" : "🎓"}</span></span>
      <span class="lbody">
        <span class="small muted">Kawan English · Level ${lv.id} ${lv.name}</span>
        <b class="ctitle">${esc(c.title)}</b>
        <span class="small muted">${esc(lv.desc)}</span>
        <span class="lmeta"><span>⏱ ±${c.hours} jam</span><span>📚 5 modul + ujian</span><span>🏅 Sertifikat</span></span>
        ${enr ? `<span class="prog" style="margin-top:8px"><i style="width:${p}%"></i></span><span class="small" style="font-weight:700">${cert ? "Lulus ✓" : p + "% selesai"}</span>` : ""}
      </span></button>`;
  }

  function vLevel(p) {
    const lv = L.find(x => x.id === p.id) || L[0]; const c = COURSE_INFO[lv.id];
    const mods = courseModules(lv); const pc = coursePct(lv);
    const enr = S.enrolled[lv.id]; const cert = S.certs[lv.id]; const ex = S.exam[lv.id];
    const unlocked = pc >= EXAM_UNLOCK;
    const nextIt = (() => { for (const m of mods) for (const it of m.items) if (it.n < it.of) return it; return null; })();
    const openMod = p.open == null ? mods.findIndex(m => modPct(m) < 100) : p.open;
    shell(lv.id + " · " + esc(c.title), `
      <div class="card">
        <span class="tag">Level ${lv.id} · ${lv.name}</span>
        <h2 class="serif" style="font-size:26px;margin:10px 0 6px">${esc(c.title)}</h2>
        <p class="muted" style="margin:0">${esc(lv.desc)}</p>
        <div class="lmeta" style="margin-top:10px"><span>⏱ ±${c.hours} jam</span><span>📚 ${mods.length} modul</span><span>📝 Ujian akhir</span><span>🌏 Penjelasan bahasa Indonesia</span></div>
        ${enr ? `<div style="margin-top:14px"><div class="row small" style="justify-content:space-between"><b>Progres kursus</b><b>${pc}%</b></div><div class="prog" style="margin-top:6px"><i style="width:${pc}%"></i></div>
          <div class="small muted" style="margin-top:6px">Terdaftar sejak ${fmtDate(enr)}</div></div>
          <div class="btns">${cert ? `<button class="btn" data-cert style="background:#b8860b">🏅 Lihat sertifikat</button>` : nextIt ? `<button class="btn" data-next>▶ Lanjutkan: ${esc(nextIt.label.length > 26 ? nextIt.label.slice(0, 26) + "…" : nextIt.label)}</button>` : `<button class="btn" data-exam>📝 Ikuti ujian akhir</button>`}</div>`
        : `<div class="btns"><button class="btn block" data-enroll>Daftar gratis</button></div>`}
      </div>
      ${!enr ? `<div class="card"><h3 style="font-size:17px">Yang akan kamu pelajari</h3><ul class="llearn">${c.learn.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
      <div class="sec-title">Silabus</div>
      ${mods.map((m, mi) => { const mp = modPct(m); return `
        <div class="card lmod" style="padding:0">
          <button class="modh" data-mod="${mi}">
            <span class="ic">${mp >= 100 ? "✅" : m.ic}</span>
            <span style="flex:1"><span class="small muted">Modul ${mi + 1}</span><b style="display:block">${m.title}</b><span class="small muted">${m.items.length} materi · ${mp}%</span></span>
            <span class="chev">${openMod === mi ? "▾" : "▸"}</span>
          </button>
          ${openMod === mi ? `<div class="modb"><p class="small muted" style="margin:0 0 8px">${m.desc}</p>${m.items.map((it, ii) => `
            <button class="lesson" data-it="${mi}:${ii}" ${enr ? "" : "disabled"}>
              <span class="lchk ${it.n >= it.of ? "ok" : ""}">${it.n >= it.of ? "✓" : ""}</span>
              <span style="flex:1;min-width:0"><span class="ltitle">${esc(it.label)}</span><span class="small muted">${it.type}${it.of > 1 ? " · " + it.n + "/" + it.of : ""}</span></span>
            </button>`).join("")}</div>` : ""}
        </div>`; }).join("")}
      <div class="card lmod" style="padding:0"><div class="modh">
        <span class="ic">${cert ? "🏅" : unlocked ? "📝" : "🔒"}</span>
        <span style="flex:1"><span class="small muted">Modul ${mods.length + 1}</span><b style="display:block">Ujian akhir & sertifikat</b>
          <span class="small muted">10 soal · lulus ≥ ${EXAM_PASS}%${ex ? " · nilai terbaik " + ex.best + "%" : ""}</span>
          ${!unlocked ? `<span class="small" style="display:block;margin-top:4px">Terbuka setelah progres kursus ≥ ${EXAM_UNLOCK}% (sekarang ${pc}%).</span>` : ""}</span>
        ${enr && unlocked ? `<button class="btn" style="padding:9px 14px" data-exam>${ex ? "Ulangi" : "Mulai"}</button>` : ""}
      </div></div>
    `);
    on("[data-enroll]", () => { S.enrolled[lv.id] = Date.now(); S.level = lv.id; save(); toast("Kamu terdaftar di kursus " + lv.id + "!"); render(); });
    on("[data-mod]", el => { const mi = +el.dataset.mod; cur().params.open = openMod === mi ? -1 : mi; render(); });
    on("[data-it]", el => { const [mi, ii] = el.dataset.it.split(":").map(Number); mods[mi].items[ii].open(); });
    on("[data-next]", () => nextIt && nextIt.open());
    on("[data-exam]", () => go("exam", { id: lv.id }));
    on("[data-cert]", () => go("cert", { cid: lv.id }));
  }

  function buildExam(lv) {
    const g = lv.writing.grammar.map(x => ({ q: x.q.replace("___", "_____"), o: x.o, a: x.a, e: x.e }));
    const pool = L.flatMap(x => x.vocab.map(v => v[1]));
    const vq = shuffle(lv.vocab).slice(0, 10 - g.length).map(v => {
      const wrong = shuffle(pool.filter(m => m !== v[1])).slice(0, 2);
      const o = shuffle([v[1]].concat(wrong));
      return { q: `Apa arti kata “${v[0]}”?`, o, a: o.indexOf(v[1]), e: `“${v[0]}” = ${v[1]}. Contoh: ${v[2]}` };
    });
    return shuffle(g.concat(vq)).map(q => { const idx = shuffle(q.o.map((_, k) => k)); return { q: q.q, o: idx.map(k => q.o[k]), a: idx.indexOf(q.a), e: q.e }; });
  }
  function vExam(p) {
    const lv = L.find(x => x.id === p.id);
    if (!p.qs) { p.qs = buildExam(lv); p.i = 0; p.ok = 0; p.wrong = []; }
    const qs = p.qs, i = p.i;
    if (i >= qs.length) {
      const score = Math.round(100 * p.ok / qs.length); const pass = score >= EXAM_PASS;
      const prev = S.exam[lv.id]; S.exam[lv.id] = { best: Math.max(score, prev ? prev.best : 0), last: score, date: Date.now() };
      let newCert = false;
      if (pass && !S.certs[lv.id]) { S.certs[lv.id] = { date: fmtDate(Date.now()), score, id: "KE-" + lv.id + "-" + Date.now().toString(36).toUpperCase().slice(-6) }; addXP(100); newCert = true; }
      save();
      shell("📝 Hasil Ujian", `
        <div class="card center"><div style="font-size:54px">${pass ? "🎉" : "💪"}</div>
          <div class="score" style="color:${pass ? "var(--ok)" : "var(--speak)"}">${score}%</div>
          <p>${p.ok} dari ${qs.length} soal benar. ${pass ? "Selamat, kamu <b>lulus</b> kursus " + esc(courseTitle(lv.id)) + "!" : "Batas lulus " + EXAM_PASS + "%. Ulangi modul yang terasa sulit lalu coba lagi."}</p>
          <div class="btns">${pass ? `<button class="btn" data-cert style="background:#b8860b">🏅 ${newCert ? "Ambil" : "Lihat"} sertifikat</button>` : `<button class="btn" data-retry>Coba lagi</button>`}<button class="btn ghost" data-back>Kembali ke kursus</button></div></div>
        ${p.wrong.length ? `<div class="sec-title">Pembahasan soal yang salah</div>${p.wrong.map(k => `<div class="issue"><b>${esc(qs[k].q)}</b><br>Jawaban: ${esc(qs[k].o[qs[k].a])}. ${esc(qs[k].e)}</div>`).join("")}` : ""}`);
      on("[data-cert]", () => go("cert", { cid: lv.id }, true));
      on("[data-retry]", () => go("exam", { id: lv.id }, true));
      on("[data-back]", back);
      return;
    }
    const q = qs[i];
    shell("📝 Ujian " + lv.id, `${wHeader(i, qs.length, "Soal")}
      <div class="card"><div class="serif" style="font-size:22px;margin-bottom:14px">${esc(q.q)}</div>
        ${q.o.map((o, oi) => `<button class="opt" data-oi="${oi}">${esc(o)}</button>`).join("")}
        <p class="small muted" style="margin-bottom:0">Pembahasan ditampilkan di akhir ujian.</p></div>`);
    on(".opt", el => {
      const right = +el.dataset.oi === q.a;
      const np = Object.assign({}, p, { i: i + 1, ok: p.ok + (right ? 1 : 0), wrong: right ? p.wrong : p.wrong.concat([i]) });
      go("exam", np, true);
    });
  }

  /* =====================================================================
     TUTOR (cari tutor, profil, jadwal, pemesanan, ulasan)
     ===================================================================== */
  const T = window.TUTORS || [];
  const TF = { tag: "Semua", sort: "rec", indo: false, fav: false, q: "", max: 0 };
  const tutorById = id => T.find(t => t.id === id);
  const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const avatar = (t, size) => `<span class="ava" style="background:${t.color};width:${size}px;height:${size}px;font-size:${Math.round(size * .38)}px">${initials(t.name)}</span>`;
  const activeB = () => S.bookings.filter(b => b.status === "booked");
  function slotsFor(t, dayOffset) {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + dayOffset);
    if (!t.days.includes(d.getDay())) return [];
    const minStart = Date.now() + 2 * 36e5;
    return t.hours.map(h => { const s = new Date(d); s.setHours(h, 0, 0, 0); return s.getTime(); })
      .filter(ts => ts >= minStart)
      .map(ts => ({ ts, taken: activeB().some(b => b.tutorId === t.id && b.start === ts) || (Math.abs(Math.sin(ts / 36e5 + t.price)) < 0.22) }));
  }
  function tutorCard(t) {
    return `<div class="card tcard" data-tutor="${t.id}">
      <div class="row" style="align-items:flex-start">
        ${avatar(t, 64)}
        <div style="flex:1;min-width:0">
          <div class="row" style="gap:6px"><b style="font-size:17px">${esc(t.name)}</b><span title="${esc(t.country)}">${t.flag}</span></div>
          <div class="small muted">${esc(t.country)} · ${t.years} th mengajar${t.indo ? " · <b style=\"color:var(--read)\">Bisa B. Indonesia</b>" : ""}</div>
          <div class="small" style="margin-top:2px"><b>★ ${t.rating.toFixed(1)}</b> <span class="muted">(${t.reviews} ulasan) · ${t.lessons.toLocaleString("id-ID")} pelajaran</span></div>
        </div>
        <button class="fav ${S.fav[t.id] ? "on" : ""}" data-fav="${t.id}" aria-label="Favorit">${S.fav[t.id] ? "♥" : "♡"}</button>
      </div>
      <p style="margin:10px 0 8px;font-weight:600">${esc(t.headline)}</p>
      <div class="tags">${t.tags.map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>
      <div class="row" style="margin-top:12px;justify-content:space-between">
        <div><b style="font-size:18px">${rp(t.price)}</b><span class="small muted"> / 50 menit</span><div class="small muted">Uji coba 25 menit ${rp(t.trial)}</div></div>
        <button class="btn" data-book="${t.id}" style="padding:10px 14px">Lihat jadwal</button>
      </div>
    </div>`;
  }
  function filteredTutors() {
    const q = TF.q.trim().toLowerCase();
    let list = T.filter(t => (TF.tag === "Semua" || t.tags.includes(TF.tag)) && (!TF.indo || t.indo) && (!TF.fav || S.fav[t.id]) && (!TF.max || t.price <= TF.max)
      && (!q || (t.name + " " + t.headline + " " + t.tags.join(" ") + " " + t.country).toLowerCase().includes(q)));
    const sorters = { rec: (a, b) => (b.rating * Math.log(b.reviews + 1)) - (a.rating * Math.log(a.reviews + 1)), cheap: (a, b) => a.price - b.price, pricey: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews };
    return list.sort(sorters[TF.sort]);
  }
  function vTutors() {
    const up = activeB().filter(b => b.start + b.dur * 6e4 > Date.now()).sort((a, b) => a.start - b.start);
    shell("🧑‍🏫 Tutor", `
      <input type="text" id="tq" placeholder="🔍 Cari nama, tujuan, atau topik..." value="${esc(TF.q)}" autocomplete="off">
      <div class="levels" style="margin-top:10px">${["Semua"].concat(window.TUTOR_TAGS || []).map(x => `<button class="fchip ${TF.tag === x ? "on" : ""}" data-tag="${esc(x)}">${esc(x)}</button>`).join("")}</div>
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:12px">
        <select id="tsort"><option value="rec">Rekomendasi</option><option value="rating">Rating tertinggi</option><option value="cheap">Harga terendah</option><option value="pricey">Harga tertinggi</option></select>
        <select id="tmax"><option value="0">Semua harga</option><option value="100000">≤ Rp100.000</option><option value="160000">≤ Rp160.000</option></select>
        <button class="fchip ${TF.indo ? "on" : ""}" data-indo>🇮🇩 Bisa B. Indonesia</button>
        <button class="fchip ${TF.fav ? "on" : ""}" data-favf>♥ Favorit</button>
      </div>
      ${up.length ? `<button class="list-btn" data-go="lessons"><span class="ic">📅</span><span><b>${up.length} pelajaran akan datang</b><small>Berikutnya: ${fmtDay(up[0].start)}, ${fmtTime(up[0].start)} dengan ${esc(tutorById(up[0].tutorId).name)}</small></span><span class="chev">›</span></button>` : `<button class="list-btn" data-go="lessons"><span class="ic">📅</span><span><b>Jadwal les saya</b><small>Belum ada pelajaran terjadwal</small></span><span class="chev">›</span></button>`}
      <div id="tcount" class="small muted" style="margin-bottom:8px"></div>
      <div id="tlist"></div>
      <p class="small muted center">Profil tutor di versi ini adalah contoh. Pemesanan tersimpan di HP ini dan belum memproses pembayaran sungguhan.</p>
    `, { tab: "tutors", root: true });
    const $s = $app.querySelector("#tsort"), $m = $app.querySelector("#tmax");
    $s.value = TF.sort; $m.value = String(TF.max);
    function list() {
      const l = filteredTutors();
      $app.querySelector("#tcount").textContent = l.length + " tutor tersedia";
      $app.querySelector("#tlist").innerHTML = l.map(tutorCard).join("") || `<div class="card center muted">Tidak ada tutor yang cocok. Coba ubah filter.</div>`;
      $app.querySelectorAll("#tlist [data-tutor]").forEach(el => el.onclick = e => { if (e.target.closest("[data-fav]")) return; go("tutor", { id: el.dataset.tutor }); });
      $app.querySelectorAll("#tlist [data-fav]").forEach(el => el.onclick = () => { const id = el.dataset.fav; if (S.fav[id]) delete S.fav[id]; else S.fav[id] = 1; save(); list(); });
    }
    list();
    $app.querySelector("#tq").addEventListener("input", e => { TF.q = e.target.value; list(); });
    $s.onchange = () => { TF.sort = $s.value; list(); };
    $m.onchange = () => { TF.max = +$m.value; list(); };
    on("[data-tag]", el => { TF.tag = el.dataset.tag; $app.querySelectorAll("[data-tag]").forEach(b => b.classList.toggle("on", b === el)); list(); });
    on("[data-indo]", el => { TF.indo = !TF.indo; el.classList.toggle("on", TF.indo); list(); });
    on("[data-favf]", el => { TF.fav = !TF.fav; el.classList.toggle("on", TF.fav); list(); });
    on("[data-go]", el => go(el.dataset.go));
  }

  function vTutor(p) {
    const t = tutorById(p.id); if (!t) { back(); return; }
    const day = p.day || 0;
    const days = Array.from({ length: 14 }, (_, k) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + k); return { k, d, n: slotsFor(t, k).filter(s => !s.taken).length }; });
    const slots = slotsFor(t, day);
    const mine = S.bookings.filter(b => b.tutorId === t.id && b.review);
    const revs = mine.map(b => [(S.name || "Kamu") + " · ulasanmu", b.review.stars, b.review.text]).concat(t.revs);
    shell(esc(t.name), `
      <div class="card">
        <div class="row" style="align-items:flex-start">${avatar(t, 84)}
          <div style="flex:1;min-width:0"><b style="font-size:20px">${esc(t.name)} ${t.flag}</b>
            <div class="small muted">${esc(t.country)}</div>
            <div class="small" style="margin-top:4px"><b>★ ${t.rating.toFixed(1)}</b> <span class="muted">· ${t.reviews} ulasan · ${t.lessons.toLocaleString("id-ID")} pelajaran</span></div></div>
          <button class="fav ${S.fav[t.id] ? "on" : ""}" data-fav aria-label="Favorit">${S.fav[t.id] ? "♥" : "♡"}</button></div>
        <p style="font-weight:700;margin:12px 0 6px">${esc(t.headline)}</p>
        <div class="tags">${t.tags.map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>
        <div class="tstats"><div><b>${rp(t.price)}</b><span>per 50 menit</span></div><div><b>${rp(t.trial)}</b><span>uji coba 25 mnt</span></div><div><b>${t.years} th</b><span>pengalaman</span></div></div>
      </div>
      <div class="card"><h3 style="font-size:17px">Tentang saya</h3><p style="margin:8px 0 0">${esc(t.about)}</p>
        <div class="kv" style="margin-top:10px"><span>Bahasa</span><b style="text-align:right">${t.langs.map(esc).join(", ")}</b></div>
        <div class="kv"><span>Penjelasan B. Indonesia</span><b>${t.indo ? "Ya" : "Terbatas"}</b></div></div>
      <div class="sec-title">Pilih jadwal (waktu di HP-mu)</div>
      <div class="levels">${days.map(x => `<button class="lv dchip ${x.k === day ? "on" : ""}" data-day="${x.k}" ${x.n ? "" : "data-empty"}><b>${x.d.toLocaleDateString("id-ID", { weekday: "short" })}</b><span>${x.d.getDate()} ${x.d.toLocaleDateString("id-ID", { month: "short" })}${x.n ? "" : " · —"}</span></button>`).join("")}</div>
      <div class="card">${slots.length ? `<div class="slots">${slots.map(s => `<button class="slot" data-slot="${s.ts}" ${s.taken ? "disabled" : ""}>${fmtTime(s.ts)}</button>`).join("")}</div><p class="small muted" style="margin:10px 0 0">Slot abu-abu sudah terisi.</p>` : `<p class="muted center" style="margin:0">Tidak ada jadwal di hari ini. Pilih hari lain.</p>`}</div>
      <div class="sec-title">Ulasan siswa</div>
      ${revs.map(r => `<div class="card" style="padding:14px"><div class="row" style="justify-content:space-between"><b class="small">${esc(r[0])}</b><span class="stars">${"★".repeat(r[1])}${"☆".repeat(5 - r[1])}</span></div><p style="margin:6px 0 0">${esc(r[2])}</p></div>`).join("")}
    `);
    on("[data-fav]", () => { if (S.fav[t.id]) delete S.fav[t.id]; else S.fav[t.id] = 1; save(); render(); });
    on("[data-day]", el => { cur().params.day = +el.dataset.day; render(); });
    on("[data-slot]", el => bookSheet(t, +el.dataset.slot));
  }

  function bookSheet(t, ts) {
    const had = S.bookings.some(b => b.tutorId === t.id && b.status !== "cancelled");
    let type = had ? "reg" : "trial";
    const b = sheet(`
      <div class="row">${avatar(t, 48)}<div><b>${esc(t.name)}</b><div class="small muted">${fmtDay(ts)} · ${fmtTime(ts)}</div></div></div>
      <div class="sec-title" style="margin-top:16px">Jenis pelajaran</div>
      <div class="seg"><button data-ty="trial">Uji coba · 25 mnt<br><b>${rp(t.trial)}</b></button><button data-ty="reg">Reguler · 50 mnt<br><b>${rp(t.price)}</b></button></div>
      <div class="sec-title">Apa yang ingin kamu pelajari?</div>
      <textarea id="topic" rows="2" placeholder="contoh: latihan interview kerja, persiapan IELTS speaking..."></textarea>
      <div class="kv" style="margin-top:12px"><span>Total</span><b id="tot"></b></div>
      <p class="small muted" style="margin:6px 0 0">Gratis membatalkan atau mengubah jadwal hingga 12 jam sebelum pelajaran. (Versi ini belum menarik pembayaran.)</p>
      <div class="btns"><button class="btn ghost" data-no>Batal</button><button class="btn" data-ok>Konfirmasi pemesanan</button></div>`);
    function upd() { b.querySelectorAll("[data-ty]").forEach(x => x.classList.toggle("on", x.dataset.ty === type)); b.querySelector("#tot").textContent = rp(type === "trial" ? t.trial : t.price); }
    b.querySelectorAll("[data-ty]").forEach(x => x.onclick = () => { type = x.dataset.ty; upd(); }); upd();
    b.querySelector("[data-no]").onclick = () => b.remove();
    b.querySelector("[data-ok]").onclick = () => {
      if (activeB().some(x => x.tutorId === t.id && x.start === ts)) { toast("Slot ini sudah kamu pesan."); return; }
      const clash = activeB().find(x => ts < x.start + x.dur * 6e4 && x.start < ts + (type === "trial" ? 25 : 50) * 6e4);
      if (clash) { toast("Bentrok dengan pelajaran lain di jam yang sama."); return; }
      S.bookings.push({ id: Date.now().toString(36), tutorId: t.id, start: ts, dur: type === "trial" ? 25 : 50, price: type === "trial" ? t.trial : t.price, type, topic: b.querySelector("#topic").value.trim().slice(0, 200), status: "booked", created: Date.now() });
      save(); b.remove(); toast("Pelajaran dipesan! 🎉"); go("lessons", { justBooked: 1 });
    };
  }

  function vLessons() {
    const now = Date.now();
    const bs = S.bookings.slice().sort((a, b) => a.start - b.start);
    const up = bs.filter(b => b.status === "booked" && b.start + b.dur * 6e4 > now);
    const past = bs.filter(b => b.status === "booked" && b.start + b.dur * 6e4 <= now).reverse();
    const canc = bs.filter(b => b.status === "cancelled").reverse();
    const row = (b, kind) => { const t = tutorById(b.tutorId); if (!t) return ""; const soon = b.start - now <= 10 * 6e4; return `
      <div class="card">
        <div class="row">${avatar(t, 48)}<div style="flex:1;min-width:0"><b>${esc(t.name)}</b><div class="small muted">${b.type === "trial" ? "Uji coba" : "Reguler"} · ${b.dur} menit · ${rp(b.price)}</div></div>
          ${kind === "past" ? `<span class="tag">Selesai</span>` : kind === "canc" ? `<span class="tag" style="background:#fbeaea;color:#8c2727">Dibatalkan</span>` : ""}</div>
        <div class="when">📅 ${fmtDay(b.start)} · ${fmtTime(b.start)}–${fmtTime(b.start + b.dur * 6e4)}</div>
        ${b.topic ? `<div class="small muted">Topik: ${esc(b.topic)}</div>` : ""}
        ${b.review ? `<div class="small" style="margin-top:6px">Ulasanmu: <span class="stars">${"★".repeat(b.review.stars)}</span> ${esc(b.review.text)}</div>` : ""}
        <div class="btns">${kind === "up" ? `<button class="btn ${soon ? "" : "soft"}" data-join="${b.id}">🎥 ${soon ? "Masuk kelas" : "Detail kelas"}</button><button class="btn ghost" data-cancel="${b.id}">Batalkan</button>`
          : kind === "past" ? `${b.review ? "" : `<button class="btn" data-rev="${b.id}">⭐ Beri ulasan</button>`}<button class="btn ghost" data-again="${t.id}">Pesan lagi</button>` : `<button class="btn ghost" data-again="${t.id}">Pesan lagi</button>`}</div>
      </div>`; };
    shell("📅 Jadwal Les", `
      <div class="sec-title" style="margin-top:4px">Akan datang (${up.length})</div>
      ${up.map(b => row(b, "up")).join("") || `<div class="card center"><p class="muted" style="margin-top:0">Belum ada pelajaran terjadwal.</p><button class="btn" data-find>Cari tutor</button></div>`}
      ${past.length ? `<div class="sec-title">Riwayat</div>${past.map(b => row(b, "past")).join("")}` : ""}
      ${canc.length ? `<div class="sec-title">Dibatalkan</div>${canc.map(b => row(b, "canc")).join("")}` : ""}
    `);
    const find = id => S.bookings.find(x => x.id === id);
    on("[data-find]", () => { stack = [{ view: "tutors", params: {} }]; render(); });
    on("[data-again]", el => go("tutor", { id: el.dataset.again }));
    on("[data-join]", el => {
      const b = find(el.dataset.join); const t = tutorById(b.tutorId); const mins = Math.round((b.start - Date.now()) / 6e4);
      const s = sheet(`<b>Kelas dengan ${esc(t.name)}</b>
        <p class="muted">${mins > 0 ? `Dimulai dalam ${mins >= 120 ? Math.round(mins / 60) + " jam" : mins + " menit"}.` : "Kelas sedang berlangsung."} Tautan ruang video akan aktif 10 menit sebelum kelas dimulai.</p>
        <div class="fb info">💡 Siapkan: ${b.topic ? esc(b.topic) + ". " : ""}Kerjakan latihan Speaking di level-mu sebagai pemanasan.</div>
        <p class="small muted">Catatan: ruang kelas video belum tersambung di versi ini.</p>
        <div class="btns"><button class="btn" data-x>Tutup</button></div>`);
      s.querySelector("[data-x]").onclick = () => s.remove();
    });
    on("[data-cancel]", el => {
      const b = find(el.dataset.cancel); const late = b.start - Date.now() < 12 * 36e5;
      const s = sheet(`<b>Batalkan pelajaran ini?</b><p class="muted">${fmtDay(b.start)} · ${fmtTime(b.start)}</p>${late ? `<div class="fb no">Kurang dari 12 jam sebelum kelas: biaya tidak dikembalikan.</div>` : `<div class="fb ok">Pembatalan gratis (lebih dari 12 jam sebelum kelas).</div>`}
        <div class="btns"><button class="btn ghost" data-n>Tidak</button><button class="btn" style="background:var(--bad)" data-y>Ya, batalkan</button></div>`);
      s.querySelector("[data-n]").onclick = () => s.remove();
      s.querySelector("[data-y]").onclick = () => { b.status = "cancelled"; save(); s.remove(); toast("Pelajaran dibatalkan."); render(); };
    });
    on("[data-rev]", el => {
      const b = find(el.dataset.rev); let stars = 5;
      const s = sheet(`<b>Bagaimana pelajaranmu?</b><div class="rstars">${[1, 2, 3, 4, 5].map(k => `<button data-st="${k}">★</button>`).join("")}</div>
        <textarea id="rt" rows="3" placeholder="Ceritakan pengalamanmu (opsional)"></textarea>
        <div class="btns"><button class="btn ghost" data-n>Nanti</button><button class="btn" data-y>Kirim ulasan</button></div>`);
      const paint = () => s.querySelectorAll("[data-st]").forEach(x => x.classList.toggle("on", +x.dataset.st <= stars));
      s.querySelectorAll("[data-st]").forEach(x => x.onclick = () => { stars = +x.dataset.st; paint(); }); paint();
      s.querySelector("[data-n]").onclick = () => s.remove();
      s.querySelector("[data-y]").onclick = () => { b.review = { stars, text: s.querySelector("#rt").value.trim().slice(0, 300) }; addXP(10); save(); s.remove(); toast("Terima kasih atas ulasannya!"); render(); };
    });
  }

  /* ---------- Tambahan Beranda ---------- */
  function homeExtras() {
    const active = L.filter(lv => S.enrolled[lv.id] && !S.certs[lv.id]).sort((a, b) => S.enrolled[b.id] - S.enrolled[a.id]);
    const next = activeB().filter(b => b.start + b.dur * 6e4 > Date.now()).sort((a, b) => a.start - b.start)[0];
    let h = "";
    if (next) { const t = tutorById(next.tutorId); h += `<button class="list-btn" data-hgo="lessons" style="border-color:${t.color}">${avatar(t, 44)}<span><b>Les berikutnya: ${fmtTime(next.start)}</b><small>${fmtDay(next.start)} dengan ${esc(t.name)}</small></span><span class="chev">›</span></button>`; }
    if (active.length) { const lv = active[0]; const p = coursePct(lv); h += `<div class="sec-title">Jalur level saya</div><button class="list-btn" data-hcourse="${lv.id}"><span class="ic" style="background:#fbf0d6">🎓</span><span style="flex:1"><b>${esc(courseTitle(lv.id))}</b><small>${p}% selesai${p >= EXAM_UNLOCK ? " · ujian akhir terbuka" : ""}</small><span class="prog" style="display:block;margin-top:6px"><i style="width:${p}%"></i></span></span><span class="chev">›</span></button>`; }
    h += `<button class="list-btn" data-hgo="tutors"><span class="ic" style="background:#e3f3f1">🧑‍🏫</span><span><b>Les privat dengan tutor</b><small>${T.length} tutor · uji coba 25 menit mulai ${rp(Math.min.apply(null, T.map(t => t.trial)))}</small></span><span class="chev">›</span></button>`;
    return h;
  }
  function bindHomeExtras() {
    on("[data-hgo]", el => { const v = el.dataset.hgo; if (v === "lessons") go(v); else { stack = [{ view: v, params: {} }]; render(); } });
    on("[data-hcourse]", el => go("level", { id: el.dataset.hcourse }));
  }


  /* =====================================================================
     TEMAN BICARA — roleplay suara, ngobrol bebas, mini-kelas
     ===================================================================== */
  const SC = window.SCENARIOS || [];
  const TT = window.TALK_TOPICS || [];
  const scById = id => SC.find(s => s.id === id);
  const ttById = id => TT.find(t => t.id === id);
  const REACT = ["That's interesting!", "I see.", "Oh, really? Nice.", "That makes sense.", "Great answer!", "Thanks for sharing."];
  const STARTERS = ["I think ... because ...", "For example, ...", "To be honest, ...", "In my experience, ...", "I usually ..."];
  let talkCat = "Semua";
  function spokenIssues(t) {
    // pemeriksa tulisan, tanpa aturan huruf besar/tanda baca (hasil suara tidak punya tanda baca)
    return checkText(t).issues.filter(x => !/huruf besar|tanda baca|spasi/i.test(x));
  }
  function hasKey(text, keys) {
    const t = " " + words(text).join(" ") + " ";
    return keys.some(k => { const kk = " " + words(k).join(" ") + " "; return kk.trim() && t.includes(kk); });
  }
  function bestModel(text, opts) {
    const w = words(text); let best = null;
    opts.forEach(o => { const s = similarity(words(o.a), w); if (!best || s > best.s) best = { o, s }; });
    return best;
  }

  function talkSpot() {
    if (!SC.length) return "";
    const s = SC[Math.floor(Date.now() / 864e5) % SC.length];
    return `<div class="sec-title">Latihan bicara hari ini</div>
      <div class="sccard spot"><div class="row" style="gap:12px;align-items:flex-start"><span class="scic" style="background:${s.color}">${s.ic}</span>
        <div style="flex:1;min-width:0"><b>${esc(s.t)}</b><div class="small muted">Roleplay suara · ${esc(s.role)} · ${s.level}</div></div></div>
        <p class="small" style="margin:10px 0 12px">${esc(s.goal)}</p>
        <div class="btns" style="margin-top:0"><button class="btn" data-spot="${s.id}">▶ Mulai</button><button class="btn ghost" data-spothub>Semua skenario</button></div></div>`;
  }
  function vTalkHub() {
    const cats = ["Semua", ...new Set(SC.map(s => s.cat))];
    const done = S.convos.length;
    const mins = Math.round(S.convos.reduce((a, c) => a + (c.secs || 0), 0) / 60);
    const scDone = id => S.convos.some(c => c.kind === "sc" && c.id === id);
    shell("Teman Bicara", `
      <div class="card hero noorb">
        <div class="k">Latihan bicara · kapan saja</div>
        <h2 style="max-width:none">Ngobrol dalam bahasa Inggris tanpa takut salah</h2>
        <p style="max-width:none">Pilih situasi nyata, jawab dengan suara atau ketikan, lalu dapatkan koreksi dan contoh kalimat yang lebih natural.</p>
        <div class="stats"><div class="stat"><b>💬 ${done}</b>percakapan</div><div class="stat"><b>⏱ ${mins}</b>menit bicara</div><div class="stat"><b>🎭 ${new Set(S.convos.filter(c => c.kind === "sc").map(c => c.id)).size}/${SC.length}</b>skenario</div></div>
      </div>
      <div class="card row" style="justify-content:space-between;gap:12px">
        <div><b>Mode pemula</b><div class="small muted">Tampilkan terjemahan dan contoh jawaban sejak awal</div></div>
        <button class="switch ${S.beginner ? "on" : ""}" data-beg aria-label="Mode pemula" role="switch" aria-checked="${S.beginner ? "true" : "false"}"><i></i></button>
      </div>
      ${aiCard()}
      <div class="sec-title">Skenario roleplay</div>
      <div class="levels">${cats.map(c => `<button class="fchip ${c === talkCat ? "on" : ""}" data-tcat="${esc(c)}">${esc(c)}</button>`).join("")}</div>
      <div class="scgrid">${SC.filter(s => talkCat === "Semua" || s.cat === talkCat).map(s => `
        <div class="sccard">
          <div class="row" style="gap:12px;align-items:flex-start"><span class="scic" style="background:${s.color}">${s.ic}</span>
            <div style="flex:1;min-width:0"><b>${esc(s.t)}</b><div class="small muted">${esc(s.role)} · ${s.steps.length} giliran</div></div>
            <span class="status ${scDone(s.id) ? "ok" : ""}">${scDone(s.id) ? "Selesai" : s.level}</span></div>
          <p class="small" style="margin:10px 0 12px">${esc(s.goal)}</p>
          <button class="btn block" data-sc="${s.id}">▶ Mulai skenario</button>
        </div>`).join("")}</div>
      <div class="sec-title">Ngobrol bebas per topik</div>
      <div class="topicgrid">${TT.map(t => `<button class="topic" data-tt="${t.id}"><span>${t.ic}</span><b>${esc(t.t)}</b><small>${t.level} · ${t.q.length} pertanyaan</small></button>`).join("")}</div>
      ${S.convos.length ? `<div class="sec-title">Riwayat percakapan</div>${S.convos.slice(-6).reverse().map(c => { const o = c.kind === "sc" ? scById(c.id) : ttById(c.id); if (!o) return ""; return `<div class="card row" style="padding:12px 14px;gap:12px"><span style="font-size:22px">${o.ic}</span><div style="flex:1;min-width:0"><b class="small">${esc(o.t)}</b><div class="small muted">${fmtDate(c.date)} · ${c.turns} jawaban</div></div><span class="status ${c.score >= 70 ? "ok" : ""}">${c.score}%</span></div>`; }).join("")}` : ""}
      <p class="small muted center">${SR ? "Mikrofon memakai pengenalan suara Chrome (butuh internet)." : "Browser ini belum mendukung mikrofon langsung. Kamu tetap bisa mengetik, atau pakai ikon mikrofon di keyboard HP."}</p>
    `, { root: true, tab: "talk" });
    on("[data-beg]", () => { S.beginner = !S.beginner; save(); render(); });
    bindAiCard();
    on("[data-tcat]", el => { talkCat = el.dataset.tcat; render(); });
    on("[data-sc]", el => go("brief", { id: el.dataset.sc }));
    on("[data-tt]", el => go("chat", { kind: "talk", id: el.dataset.tt }));
  }

  function vBrief(p) {
    const s = scById(p.id); if (!s) { back(); return; }
    shell("Persiapan", `
      <div class="banner" style="background:${s.color}"><div class="bic">${s.ic}</div>
        <h2>${esc(s.t)}</h2><p>${esc(s.goal)}</p>
        <div class="bmeta"><span>📶 ${s.level}</span><span>🎭 Kamu: ${esc(s.you)}</span><span>🤝 Partner: ${esc(s.role)}</span></div></div>
      <div class="sec-title">Mini-kelas · frasa kunci</div>
      <div class="card">
        <p class="small muted" style="margin-top:0">Dengarkan dan tirukan frasa ini dulu. Kamu akan memakainya dalam percakapan.</p>
        <div class="exs">${s.phrases.map((ph, k) => `<div class="exr"><button class="spk" data-sp="${k}" aria-label="Dengarkan">🔊</button><div style="flex:1"><b>${esc(ph[0])}</b><div class="small muted">${esc(ph[1])}</div><div class="small" id="pr${k}"></div></div>${SR ? `<button class="spk mic2" data-pm="${k}" aria-label="Tirukan">🎙</button>` : ""}</div>`).join("")}</div>
      </div>
      <div class="card"><b>Cara kerja</b><ol class="steps small"><li>Partner bicara lebih dulu (ketuk 🔊 untuk mengulang).</li><li>Jawab dengan 🎙 mikrofon atau ketik jawabanmu.</li><li>Setelah tiap jawaban kamu dapat skor kemiripan dengan kalimat natural, koreksi tata bahasa, dan contoh yang lebih baik.</li><li>Bingung? Ketuk <b>Bantu saya</b> untuk melihat contoh jawaban.</li></ol></div>
      ${s.video ? videoBlock(s.video, (videoById(s.video) || { t: "Video terkait" }).t) : ""}
      <button class="btn block" style="padding:16px" data-start>Mulai percakapan</button>
      ${S.aiKey ? `<button class="btn ghost block" style="margin-top:10px" data-startai>🤖 Roleplay bebas dengan Tutor AI</button>` : ""}
    `);
    on("[data-vid]", el => go("video", { id: el.dataset.vid }));
    on("[data-startai]", () => go("ai", { sc: s.id }, true));
    on("[data-sp]", el => speak(s.phrases[+el.dataset.sp][0], 0.85));
    on("[data-pm]", el => {
      const k = +el.dataset.pm; const out = $app.querySelector("#pr" + k); const target = s.phrases[k][0].replace(/\.\.\./g, "");
      listenOnce(alts => {
        let top = null; alts.forEach(a => { const d = diffHTML(target, words(a)); if (!top || d.score > top.score) top = d; });
        out.innerHTML = `<b style="color:${top.score >= 70 ? "var(--ok)" : "var(--speak)"}">${top.score}%</b> <span class="words" style="font-size:14px">${top.html}</span>`;
        if (top.score >= 80) addXP(3);
      }, msg => { if (msg) out.textContent = msg; el.classList.toggle("rec", msg === "🎙 Mendengarkan..."); });
    });
    on("[data-start]", () => go("chat", { kind: "sc", id: s.id }, true));
  }

  function vChat(p) {
    const isSc = p.kind === "sc";
    const o = isSc ? scById(p.id) : ttById(p.id); if (!o) { back(); return; }
    const total = isSc ? o.steps.length : o.q.length;
    if (!p.log) {
      p.log = []; p.step = 0; p.miss = 0; p.start = Date.now(); p.scores = []; p.ended = false;
      const first = isSc ? o.steps[0] : { bot: o.q[0], id: "" };
      p.log.push({ who: "bot", text: first.bot, id: first.id });
      setTimeout(() => speak(first.bot), 350);
    }
    const color = o.color || "var(--accent)";
    shell(esc(o.t), `
      <div class="chathead">
        <span class="scic" style="background:${color}">${o.ic}</span>
        <div style="flex:1;min-width:0"><b>${isSc ? esc(o.role) : "Teman ngobrol"}</b><div class="small muted"><span class="dot"></span> Online · ${isSc ? "kamu berperan sebagai " + esc(o.you) : "topik: " + esc(o.t)}</div></div>
        <span class="status" id="cprog"></span>
      </div>
      <div class="prog" style="margin:0 0 12px"><i id="cbar" style="width:0;background:${color}"></i></div>
      <div id="chat" class="chat" aria-live="polite"></div>
      <div id="csum"></div>
      <div id="composer"></div>
    `, { nofab: true });
    const $chat = $app.querySelector("#chat"), $comp = $app.querySelector("#composer");
    function bubble(m, i) {
      if (m.who === "bot") return `<div class="msg bot"><div class="bub">${esc(m.text)}
          ${m.id ? `<div class="tr" ${S.beginner || m.showId ? "" : "hidden"}>${esc(m.id)}</div>` : ""}
          <div class="mact"><button data-say="${i}" aria-label="Dengarkan">🔊</button><button data-slow="${i}" aria-label="Pelan">🐢</button>${m.id ? `<button data-tr="${i}">Terjemahan</button>` : ""}</div></div></div>`;
      if (m.who === "me") return `<div class="msg me"><div class="bub">${esc(m.text)}</div>${m.fb ? `<div class="fbk">${m.fb}</div>` : ""}</div>`;
      if (m.who === "sys") return `<div class="msg sys">${m.html}</div>`;
      return "";
    }
    function hints() {
      if (isSc) return o.steps[p.step] ? o.steps[p.step].opts.map(x => x.a) : [];
      return STARTERS;
    }
    function draw() {
      $chat.innerHTML = p.log.map(bubble).join("");
      const doneN = Math.min(p.step, total);
      $app.querySelector("#cprog").textContent = (p.ended ? total : doneN) + "/" + total;
      $app.querySelector("#cbar").style.width = (100 * (p.ended ? total : doneN) / total) + "%";
      if (p.ended) { $comp.innerHTML = ""; summary(); }
      else {
        const showH = S.beginner || p.miss > 0 || p.help;
        $comp.innerHTML = `
          ${showH ? `<div class="hints"><div class="small muted" style="width:100%">${isSc ? "Contoh jawaban (ketuk untuk memakai):" : "Pembuka kalimat:"}</div>${hints().map((h, k) => `<button class="hint" data-h="${k}">${esc(h)}</button>`).join("")}</div>` : ""}
          <div class="compose">
            ${SR ? `<button class="micbtn" data-mic aria-label="Bicara">🎙</button>` : ""}
            <input type="text" id="say" placeholder="${SR ? "Ketuk 🎙 atau ketik jawabanmu..." : "Ketik jawabanmu..."}" autocomplete="off" autocapitalize="sentences">
            <button class="sendbtn" data-send aria-label="Kirim">➤</button>
          </div>
          <div class="row small" style="justify-content:space-between;margin-top:8px"><span class="muted" id="mst">${p.miss ? "Coba lagi, atau pakai salah satu contoh." : ""}</span>${showH ? "" : `<button class="linkbtn" data-help>💡 Bantu saya</button>`}</div>`;
        bindComposer();
      }
      $chat.querySelectorAll("[data-say]").forEach(b => b.onclick = () => speak(p.log[+b.dataset.say].text));
      $chat.querySelectorAll("[data-slow]").forEach(b => b.onclick = () => speak(p.log[+b.dataset.slow].text, 0.65));
      $chat.querySelectorAll("[data-tr]").forEach(b => b.onclick = () => { const m = p.log[+b.dataset.tr]; m.showId = !m.showId; draw(); });
      $chat.querySelectorAll("[data-model]").forEach(b => b.onclick = () => speak(b.dataset.model, 0.85));
      const last = $chat.lastElementChild; if (last) last.scrollIntoView({ block: "end", behavior: "smooth" });
    }
    function bindComposer() {
      const inp = $comp.querySelector("#say");
      inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); send(inp.value); } });
      $comp.querySelector("[data-send]").onclick = () => send(inp.value);
      const hb = $comp.querySelector("[data-help]"); if (hb) hb.onclick = () => { p.help = true; draw(); };
      $comp.querySelectorAll("[data-h]").forEach(b => b.onclick = () => { const h = hints()[+b.dataset.h]; if (isSc) send(h, true); else { inp.value = h.replace(/\.\.\..*$/, "").replace(/\.\.\./g, "").trim() + " "; inp.focus(); } });
      const mic = $comp.querySelector("[data-mic]");
      if (mic) mic.onclick = () => {
        if (synth) synth.cancel();
        const st = $comp.querySelector("#mst");
        listenOnce(alts => {
          let pick = alts[0];
          if (isSc && o.steps[p.step]) { let bs = -1; alts.forEach(a => { const b = bestModel(a, o.steps[p.step].opts); if (b.s > bs) { bs = b.s; pick = a; } }); }
          send(pick, false, true);
        }, msg => { if (msg) st.textContent = msg; else if (st.textContent.startsWith("🎙")) st.textContent = ""; mic.classList.toggle("rec", msg === "🎙 Mendengarkan..."); });
      };
    }
    function send(text, fromHint, fromMic) {
      text = String(text || "").trim();
      if (!text) { toast("Ucapkan atau ketik jawabanmu dulu."); return; }
      if (synth) synth.cancel();
      const w = words(text);
      if (isSc) {
        const st = o.steps[p.step];
        let opt = st.opts.find(x => hasKey(text, x.k));
        if (!opt && w.length < 2 && p.miss < 2) {
          p.log.push({ who: "me", text });
          p.miss++;
          const again = p.miss === 1 ? "Sorry, I didn't catch that. Could you say that again?" : "Hmm, let me ask again. " + st.bot;
          p.log.push({ who: "bot", text: again, id: p.miss === 1 ? "Maaf, saya kurang menangkap. Bisa diulangi?" : st.id });
          draw(); speak(again); return;
        }
        const bm = bestModel(text, st.opts);
        if (!opt) opt = bm.o;
        const score = fromHint ? 100 : Math.round(100 * Math.max(bm.s, similarity(words(opt.a), w)));
        const iss = fromHint ? [] : spokenIssues(text);
        p.scores.push(score);
        const fb = fromHint ? `<span class="tagok">Contoh dipakai</span>` :
          `<span class="${score >= 70 ? "tagok" : "tagmid"}">${score >= 85 ? "Sangat natural" : score >= 60 ? "Bagus" : "Bisa lebih natural"} · ${score}%</span>
           ${score < 85 ? `<div>💡 Lebih natural: <b>${esc(opt.a)}</b> <button class="minispk" data-model="${esc(opt.a)}">🔊</button></div>` : ""}
           ${iss.map(x => `<div class="iss">✏️ ${x}</div>`).join("")}`;
        p.log.push({ who: "me", text, fb, model: opt.a, iss: iss.length });
        p.miss = 0; p.help = false; p.step++;
        if (score >= 70 && !fromHint) addXP(5);
        const nx = o.steps[p.step];
        const reply = [opt.r, nx ? nx.bot : ""].filter(Boolean).join(" ");
        if (reply) p.log.push({ who: "bot", text: reply, id: nx ? nx.id : "" });
        if (!nx) p.ended = true;
        draw(); if (reply) speak(reply);
      } else {
        const iss = spokenIssues(text);
        const n = w.length;
        const score = Math.max(30, Math.min(100, Math.round((Math.min(n, 15) / 15) * 70 + (iss.length ? 10 : 30))));
        p.scores.push(score);
        const tips = [];
        if (n < 6) tips.push("Jawabanmu pendek. Tambahkan alasan atau contoh dengan <b>because</b> / <b>for example</b>.");
        else if (n >= 12) tips.push("Jawaban yang lengkap. Pertahankan!");
        const fb = `<span class="${score >= 70 ? "tagok" : "tagmid"}">${n} kata · ${score}%</span>${tips.map(x => `<div>💡 ${x}</div>`).join("")}${iss.map(x => `<div class="iss">✏️ ${x}</div>`).join("")}`;
        p.log.push({ who: "me", text, fb, iss: iss.length });
        if (n >= 6) addXP(5);
        p.step++; p.help = false;
        const nx = o.q[p.step];
        const reply = REACT[(p.step * 7 + n) % REACT.length] + (nx ? " " + nx : " Thank you for the nice chat. Talk to you soon!");
        p.log.push({ who: "bot", text: reply, id: "" });
        if (!nx) p.ended = true;
        draw(); speak(reply);
      }
    }
    function summary() {
      const avg = p.scores.length ? Math.round(p.scores.reduce((a, b) => a + b, 0) / p.scores.length) : 0;
      const secs = Math.round((Date.now() - p.start) / 1000);
      if (!p.saved) {
        p.saved = true;
        S.convos.push({ kind: p.kind, id: o.id, date: Date.now(), score: avg, turns: p.scores.length, secs: Math.min(secs, 1800) });
        S.convos = S.convos.slice(-60); addXP(20); save();
      }
      const fixes = p.log.filter(m => m.who === "me" && (m.model || m.iss));
      const transcript = p.log.filter(m => m.who !== "sys").map(m => (m.who === "bot" ? (isSc ? o.role : "Partner") : "Saya") + ": " + m.text).join("\n");
      const prompt = `Tolong koreksi percakapan bahasa Inggris saya (${isSc ? "roleplay: " + o.t : "topik: " + o.t}). Untuk setiap kalimat saya, jelaskan kesalahan grammar, pilihan kata, dan beri versi yang lebih natural. Jelaskan dalam bahasa Indonesia.\n\n${transcript}`;
      const div = document.createElement("div");
      div.className = "card center sumcard";
      div.innerHTML = `<div style="font-size:44px">${avg >= 70 ? "🎉" : "💪"}</div><b style="font-size:20px">Percakapan selesai!</b>
        <div class="kpis"><div><b>${avg}%</b><span>skor rata-rata</span></div><div><b>${p.scores.length}</b><span>jawaban</span></div><div><b>${Math.max(1, Math.round(secs / 60))}</b><span>menit</span></div></div>
        ${isSc && fixes.filter(m => m.model).length ? `<div style="text-align:left"><div class="sec-title" style="margin-top:6px">Kalimat untuk diingat</div>${fixes.filter(m => m.model).map(m => `<div class="exr"><button class="spk" data-mm="${esc(m.model)}">🔊</button><div><b>${esc(m.model)}</b><div class="small muted">Kamu: ${esc(m.text)}</div></div></div>`).join("")}</div>` : ""}
        <div class="btns"><button class="btn" data-again>↺ Ulangi</button><button class="btn ghost" data-hub>Pilih latihan lain</button></div>
        <button class="btn soft block" style="margin-top:10px" data-copyt>📋 Salin transkrip untuk dikoreksi Claude</button>`;
      const $sum = $app.querySelector("#csum"); $sum.innerHTML = ""; $sum.appendChild(div);
      div.querySelectorAll("[data-mm]").forEach(b => b.onclick = () => speak(b.dataset.mm, 0.85));
      div.querySelector("[data-again]").onclick = () => go("chat", { kind: p.kind, id: o.id }, true);
      div.querySelector("[data-hub]").onclick = () => { stack = [{ view: "talk", params: {} }]; render(); };
      div.querySelector("[data-copyt]").onclick = () => {
        (navigator.clipboard ? navigator.clipboard.writeText(prompt) : Promise.reject()).then(() => toast("Tersalin! Tempel di aplikasi Claude."), () => {
          const b = sheet(`<b>Salin teks ini:</b><textarea rows="10" style="margin-top:8px">${esc(prompt)}</textarea><div class="btns"><button class="btn" data-close>Tutup</button></div>`);
          b.querySelector("[data-close]").onclick = () => b.remove();
        });
      };
    }
    draw();
  }

  /* =====================================================================
     TANYA KAWAN — asisten pencarian materi (tanpa AI, berjalan offline)
     ===================================================================== */
  let KIDX = null;
  function buildIndex() {
    const out = [];
    const strip = s => String(s).replace(/\*\*/g, "");
    (window.COURSES || []).forEach(c => c.M.forEach((m, mi) => m.L.forEach((l, li) => {
      const txt = l.b.map(([t, v]) => t === "ex" ? v.map(x => x.join(" — ")).join(" · ") : t === "say" ? v.join(" · ") : typeof v === "string" ? v : "").join(" ");
      out.push({ kind: "Pelajaran", title: l.t, sub: c.t, text: strip(txt), go: ["lesson", { cid: c.id, m: mi, l: li }] });
    })));
    RULES.forEach(([re, msg]) => out.push({ kind: "Kesalahan umum", title: msg.replace(/<[^>]+>/g, "").split("→")[0].trim(), sub: "Pemeriksa tulisan", text: msg.replace(/<[^>]+>/g, "") }));
    allVideos().forEach(v => out.push({ kind: "Video", title: v.t, sub: v.g.t, text: v.g.desc + " " + v.t, go: ["video", { id: v.id }] }));
    SC.forEach(s => out.push({ kind: "Skenario", title: s.t, sub: s.goal, text: s.phrases.map(x => x.join(" = ")).join(" · "), go: ["brief", { id: s.id }] }));
    L.forEach(lv => lv.vocab.forEach(v => out.push({ kind: "Kosakata " + lv.id, title: v[0] + " = " + v[1], sub: v[2], text: v.join(" ") })));
    L.forEach(lv => lv.writing.grammar.forEach(g => out.push({ kind: "Grammar " + lv.id, title: g.q.replace("___", g.o[g.a]), sub: g.e, text: g.q + " " + g.e })));
    return out;
  }
  const STOP = new Set("apa itu yang dan di ke dari untuk dengan bagaimana cara kapan kenapa mengapa pakai memakai beda perbedaan antara adalah the a an is to of in how what when why use do does i saya aku kata kalimat bahasa inggris english tolong jelaskan".split(" "));
  function askKawan(q) {
    if (!KIDX) KIDX = buildIndex();
    const terms = String(q).toLowerCase().replace(/[^a-z0-9\s'-]/g, " ").split(/\s+/).filter(x => x.length > 1 && !STOP.has(x));
    if (!terms.length) return [];
    return KIDX.map(d => {
      const T1 = d.title.toLowerCase(), B = (d.sub + " " + d.text).toLowerCase();
      let s = 0; terms.forEach(t => { if (T1.includes(t)) s += 3; if (B.includes(t)) s += 1; });
      return { d, s };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 4).map(x => x.d);
  }
  function openKawan() {
    const sugg = ["since atau for", "present perfect", "passive voice", "a atau an", "wawancara kerja", "conditional", "presentasi konferensi", "pelafalan th"];
    const b = sheet(`<div class="row" style="gap:10px;margin-bottom:8px"><span class="scic" style="background:var(--accent)">✨</span><div style="flex:1"><b>Tanya Kawan</b><div class="small muted"><span class="dot"></span> Cari penjelasan di semua materi aplikasi</div></div><button class="linkbtn" data-x>Tutup</button></div>
      <div id="kchat" class="chat" style="max-height:52vh;overflow:auto;padding:4px 0"><div class="msg bot"><div class="bub">Hai! Tanyakan topik grammar, kosakata, atau situasi bicara. Saya carikan pelajaran yang paling cocok. 👇
        <div class="hints" style="margin-top:8px">${sugg.map(s => `<button class="hint" data-ks="${esc(s)}">${esc(s)}</button>`).join("")}</div></div></div></div>
      <div class="compose" style="margin-top:10px"><input type="text" id="kq" placeholder="contoh: kapan pakai since?" autocomplete="off"><button class="sendbtn" data-kgo aria-label="Kirim">➤</button></div>
      <p class="small muted" style="margin:8px 0 0">Asisten ini mencari di materi kursus, skenario, dan kosakata. Ia tidak membuat jawaban sendiri.</p>`);
    const $k = b.querySelector("#kchat"), $q = b.querySelector("#kq");
    function ask(q) {
      q = q.trim(); if (!q) return;
      const res = askKawan(q);
      $k.insertAdjacentHTML("beforeend", `<div class="msg me"><div class="bub">${esc(q)}</div></div>`);
      $k.insertAdjacentHTML("beforeend", `<div class="msg bot"><div class="bub">${res.length ? "Ini yang saya temukan:" + res.map((d, i) => `<div class="kres"><span class="status">${esc(d.kind)}</span><b>${esc(d.title)}</b><div class="small muted">${esc(d.sub)}</div><div class="small">${esc(d.text.slice(0, 180))}${d.text.length > 180 ? "…" : ""}</div>${d.go ? `<button class="linkbtn" data-kopen='${esc(JSON.stringify(d.go))}'>Buka materi →</button>` : ""}</div>`).join("") : "Maaf, saya belum menemukan materi yang cocok. Coba kata kunci lain, misalnya nama tenses atau situasinya."}</div></div>`);
      $k.querySelectorAll("[data-kopen]").forEach(x => x.onclick = () => { const g = JSON.parse(x.dataset.kopen); b.remove(); go(g[0], g[1]); });
      $k.scrollTop = $k.scrollHeight; $q.value = "";
    }
    b.querySelector("[data-x]").onclick = () => b.remove();
    b.querySelector("[data-kgo]").onclick = () => ask($q.value);
    $q.addEventListener("keydown", e => { if (e.key === "Enter") ask($q.value); });
    b.querySelectorAll("[data-ks]").forEach(x => x.onclick = () => ask(x.dataset.ks));
    setTimeout(() => $q.focus(), 60);
  }

  /* =====================================================================
     VIDEO & PUSTAKA — materi dari Google Drive pengguna
     ===================================================================== */
  const MEDIA = window.MEDIA || [];
  const LIB = window.LIBRARY || [];
  const thumb = id => `https://drive.google.com/thumbnail?id=${id}&sz=w480`;
  const dview = id => `https://drive.google.com/file/d/${id}/view`;
  const dfolder = id => `https://drive.google.com/drive/folders/${id}`;
  const allVideos = () => MEDIA.flatMap(g => g.items.map(([id, t]) => ({ id, t, g })));
  const videoById = id => allVideos().find(v => v.id === id);
  function vcard(v, wide) {
    const w = S.watched[v.id];
    return `<button class="vcard ${wide ? "wide" : ""}" data-vid="${v.id}">
      <span class="vthumb" style="background:${v.g ? v.g.color : "var(--accent)"}"><img src="${thumb(v.id)}" alt="" loading="lazy" onerror="this.remove()"><span class="vplay">▶</span>${w ? `<span class="vdone">✓ Ditonton</span>` : ""}</span>
      <span class="vbody"><b>${esc(v.t)}</b><small>${v.g ? esc(v.g.t) : "Video"}</small></span></button>`;
  }
  let mediaCat = "Semua";
  function vMedia() {
    const vids = allVideos();
    const watched = vids.filter(v => S.watched[v.id]).length;
    const cats = ["Semua", ...MEDIA.map(g => g.t)];
    const list = mediaCat === "Semua" ? MEDIA : MEDIA.filter(g => g.t === mediaCat);
    shell("Video Belajar", `
      <div class="card hero noorb">
        <div class="k">Pustaka media</div>
        <h2 style="max-width:none">${vids.length} video dari Drive BAHASA INGGRIS</h2>
        <p style="max-width:none">Percakapan, kosakata, grammar, dan cerita berbahasa Inggris. Tonton, catat, lalu praktikkan di Teman Bicara.</p>
        <div class="stats"><div class="stat"><b>🎬 ${watched}/${vids.length}</b>sudah ditonton</div><div class="stat"><b>📁 ${MEDIA.length}</b>koleksi</div></div>
      </div>
      <div class="levels">${cats.map(c => `<button class="fchip ${c === mediaCat ? "on" : ""}" data-mcat="${esc(c)}">${esc(c)}</button>`).join("")}</div>
      ${list.map(g => `
        <div class="row" style="justify-content:space-between;align-items:flex-end;margin:18px 0 10px">
          <div><div class="sec-title" style="margin:0">${g.ic} ${esc(g.t)}</div><div class="small muted">${esc(g.desc)}</div></div>
          <span class="status">${g.items.filter(([id]) => S.watched[id]).length}/${g.items.length}</span></div>
        <div class="${mediaCat === "Semua" ? "hscroll" : "vgrid"}">${(mediaCat === "Semua" ? g.items.slice(0, 8) : g.items).map(([id, t]) => vcard({ id, t, g })).join("")}
          ${mediaCat === "Semua" && g.items.length > 8 ? `<button class="vmore" data-mcat="${esc(g.t)}">Lihat semua ${g.items.length} →</button>` : ""}</div>`).join("")}
      ${mediaCat === "Semua" ? `<div class="sec-title">Bedtime Stories (folder Drive)</div>
        ${(window.MEDIA_FOLDERS || []).map(([t, id]) => `<a class="list-btn" href="${dfolder(id)}" target="_blank" rel="noopener"><span class="ic">🌙</span><span><b>${esc(t)}</b><small>Buka folder di Google Drive</small></span><span class="chev">↗</span></a>`).join("")}
        <button class="list-btn" data-golib><span class="ic">📚</span><span><b>Pustaka buku & perangkat ajar</b><small>Buku siswa/guru Kemendikbud, CP, TP, ATP, modul ajar</small></span><span class="chev">›</span></button>` : ""}
      <p class="small muted center">Video diputar dari Google Drive (butuh internet). Bila tidak tampil, pastikan folder Drive dibagikan “Siapa saja yang memiliki link”.</p>
    `, { root: true, tab: "media" });
    on("[data-mcat]", el => { mediaCat = el.dataset.mcat; render(); });
    on("[data-vid]", el => go("video", { id: el.dataset.vid }));
    on("[data-golib]", () => go("library"));
  }
  function vVideo(p) {
    const v = videoById(p.id) || { id: p.id, t: p.t || "Video", g: null };
    const g = v.g; const idx = g ? g.items.findIndex(x => x[0] === v.id) : -1;
    const nx = g && idx >= 0 && g.items[idx + 1] ? g.items[idx + 1] : null;
    const sc = SC.find(s => s.video === v.id);
    const nkey = "vid:" + v.id;
    shell(g ? esc(g.t) : "Video", `
      <div class="player"><iframe src="https://drive.google.com/file/d/${v.id}/preview" allow="autoplay; fullscreen" allowfullscreen title="${esc(v.t)}"></iframe></div>
      <h2 style="font-size:22px;margin:14px 0 4px">${esc(v.t)}</h2>
      <div class="row small muted" style="justify-content:space-between;gap:10px;flex-wrap:wrap"><span>${g ? g.ic + " " + esc(g.t) + " · " + (idx + 1) + "/" + g.items.length : ""}</span><a class="linkbtn" href="${dview(v.id)}" target="_blank" rel="noopener">Buka di Google Drive ↗</a></div>
      <div class="btns"><button class="btn ${S.watched[v.id] ? "soft" : ""}" data-watched>${S.watched[v.id] ? "✓ Sudah ditonton" : "Tandai sudah ditonton (+5 XP)"}</button>${nx ? `<button class="btn ghost" data-next>Berikutnya →</button>` : ""}</div>
      ${sc ? `<div class="sccard spot" style="margin-top:14px"><div class="row" style="gap:12px"><span class="scic" style="background:${sc.color}">${sc.ic}</span><div style="flex:1"><b>Praktikkan: ${esc(sc.t)}</b><div class="small muted">Roleplay suara · ${sc.level}</div></div></div><button class="btn block" style="margin-top:12px" data-sc="${sc.id}">▶ Mulai roleplay</button></div>` : ""}
      <div class="card" style="margin-top:14px"><b>📒 Catatan dari video</b><p class="small muted" style="margin:4px 0 8px">Tulis kata baru atau kalimat yang ingin kamu ingat.</p><textarea id="vnote" rows="4" placeholder="Contoh: 'Could you help me?' = Bisakah kamu membantuku?">${esc(S.notes[nkey] || "")}</textarea>
        <div class="btns"><button class="btn soft" data-vsay>🔊 Bacakan catatan</button>${S.aiKey ? `<button class="btn soft" data-vai>💬 Ngobrol soal video ini</button>` : ""}</div></div>
      ${g && g.items.length > 1 ? `<div class="sec-title">Video lain di ${esc(g.t)}</div><div class="hscroll">${g.items.filter(x => x[0] !== v.id).slice(Math.max(0, idx - 1), idx + 7).map(([id, t]) => vcard({ id, t, g })).join("")}</div>` : ""}
    `);
    $app.querySelector("#vnote").addEventListener("input", e => { S.notes[nkey] = e.target.value; save(); });
    on("[data-watched]", () => { if (!S.watched[v.id]) { S.watched[v.id] = Date.now(); addXP(5); save(); toast("Tercatat. +5 XP"); } render(); });
    on("[data-next]", () => go("video", { id: nx[0] }, true));
    on("[data-sc]", el => go("brief", { id: el.dataset.sc }));
    on("[data-vid]", el => go("video", { id: el.dataset.vid }, true));
    on("[data-vsay]", () => { const t = (S.notes[nkey] || "").trim(); if (t) speak(t); else toast("Catatan masih kosong."); });
    on("[data-vai]", () => go("ai", { custom: `We just watched a short English learning video titled "${v.t}". Chat with me about its topic and help me practise the expressions it teaches.`, title: v.t }));
  }
  function vLibrary() {
    shell("Pustaka", `
      <p class="muted" style="margin-top:0">Buku dan perangkat ajar dari folder Drive Anda. Dibuka di Google Drive. Materi kursus jalur sekolah di aplikasi ini mengikuti topik dari dokumen-dokumen berikut.</p>
      ${LIB.map(g => `<div class="sec-title">${esc(g.g)}</div>${g.items.map(([id, t]) => `<a class="list-btn" href="${dview(id)}" target="_blank" rel="noopener"><span class="ic">📄</span><span><b>${esc(t)}</b><small>PDF/Dokumen · Google Drive</small></span><span class="chev">↗</span></a>`).join("")}`).join("")}
    `);
  }
  function videoBlock(id, title) {
    return `<button class="vinline" data-vid="${id}"><span class="vthumb sm"><img src="${thumb(id)}" alt="" loading="lazy" onerror="this.remove()"><span class="vplay">▶</span></span><span style="flex:1;min-width:0;text-align:left"><span class="small muted">🎬 Video dari Drive${S.watched[id] ? " · ✓ ditonton" : ""}</span><b style="display:block">${esc(title)}</b></span></button>`;
  }

  /* =====================================================================
     TUTOR AI — ngobrol bebas dengan Gemini (kunci API milik pengguna)
     ===================================================================== */
  const GEM = "https://generativelanguage.googleapis.com/v1beta";
  async function gemModel() {
    if (S.aiModel) return S.aiModel;
    const r = await fetch(`${GEM}/models?pageSize=200&key=${encodeURIComponent(S.aiKey)}`);
    if (!r.ok) throw await gemErr(r);
    const j = await r.json();
    const ok = (j.models || []).filter(m => (m.supportedGenerationMethods || []).includes("generateContent") && /flash/i.test(m.name) && !/(image|tts|audio|live|embed|vision|thinking-exp)/i.test(m.name));
    const ver = n => { const m = n.match(/gemini-(\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0; };
    ok.sort((a, b) => (/preview|exp/i.test(a.name) - /preview|exp/i.test(b.name)) || (/lite/i.test(a.name) - /lite/i.test(b.name)) || ver(b.name) - ver(a.name));
    if (!ok.length) throw new Error("Tidak ada model Gemini Flash yang tersedia untuk kunci ini.");
    S.aiModel = ok[0].name.replace(/^models\//, ""); save();
    return S.aiModel;
  }
  async function gemErr(r) {
    let msg = ""; try { msg = (await r.json()).error.message; } catch (e) { }
    if (r.status === 400 && /api key/i.test(msg)) return new Error("Kunci API tidak valid. Periksa lagi di pengaturan Tutor AI.");
    if (r.status === 403) return new Error("Kunci API ditolak (403). Pastikan Gemini API aktif untuk kunci ini.");
    if (r.status === 429) return new Error("Kuota gratis sedang habis (429). Coba lagi beberapa menit lagi.");
    if (r.status === 404) { S.aiModel = ""; save(); return new Error("Model tidak ditemukan. Coba kirim lagi; aplikasi akan memilih model baru."); }
    return new Error("Gagal menghubungi Gemini (" + r.status + "). " + msg);
  }
  async function gemChat(system, contents) {
    const model = await gemModel();
    const r = await fetch(`${GEM}/models/${model}:generateContent?key=${encodeURIComponent(S.aiKey)}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, generationConfig: { temperature: 0.8, maxOutputTokens: 600 } })
    });
    if (!r.ok) throw await gemErr(r);
    const j = await r.json();
    const t = (((j.candidates || [])[0] || {}).content || {}).parts;
    const txt = (t || []).map(x => x.text || "").join("").trim();
    if (!txt) throw new Error("Jawaban kosong dari Gemini. Coba kirim ulang.");
    return txt;
  }
  function aiSystem(p) {
    const lv = S.level || "A2";
    const sc = p.sc ? scById(p.sc) : null, tt = p.tt ? ttById(p.tt) : null;
    const ctx = sc ? `Roleplay: you are "${sc.role}" and the learner is "${sc.you}". Situation goal: ${sc.goal}. Stay in character.`
      : tt ? `Topic: ${tt.t}. Have a friendly conversation about this topic.`
      : p.custom ? p.custom : "Have a friendly everyday conversation. Let the learner choose topics.";
    return `You are Kawan, a warm and patient English speaking partner for an Indonesian learner at CEFR level ${lv}. ${ctx}
Rules:
- Reply in natural spoken English suited to level ${lv}. Keep each reply to 1-3 short sentences and usually end with one question to keep the conversation going.
- Do not use markdown, emojis, or lists in the English reply.
- After your English reply, if the learner's LAST message contains grammar, word-choice, or naturalness mistakes, add a new line starting exactly with "KOREKSI:" followed by a brief explanation in Indonesian and the corrected sentence. If there are no mistakes, do not add this line.
${S.beginner ? '- Then add a new line starting exactly with "ARTI:" followed by the Indonesian translation of your English reply.' : ""}
- If the learner writes in Indonesian, gently answer in simple English and show how to say it in English in the KOREKSI line.`;
  }
  function parseAI(t) {
    const out = { en: t, fix: "", id: "" };
    const mk = t.search(/\n?\s*KOREKSI:/i), ma = t.search(/\n?\s*ARTI:/i);
    const cut = [mk, ma].filter(x => x >= 0);
    if (cut.length) out.en = t.slice(0, Math.min.apply(null, cut)).trim();
    const fx = t.match(/KOREKSI:\s*([\s\S]*?)(?=\n\s*ARTI:|$)/i); if (fx) out.fix = fx[1].trim();
    const ar = t.match(/ARTI:\s*([\s\S]*?)(?=\n\s*KOREKSI:|$)/i); if (ar) out.id = ar[1].trim();
    out.en = out.en.replace(/[*_#`]/g, "");
    return out;
  }
  function vAISettings() {
    shell("Tutor AI", `
      <div class="card hero noorb"><div class="k">Opsional · gratis</div><h2 style="max-width:none">Ngobrol bebas dengan AI</h2>
        <p style="max-width:none">Hubungkan kunci API Gemini milik Anda agar Teman Bicara bisa menjawab apa saja, memerankan situasi, dan mengoreksi kalimat Anda secara langsung.</p></div>
      <div class="card"><b>Cara mendapatkan kunci (gratis)</b>
        <ol class="steps small"><li>Buka <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> dan masuk dengan akun Google.</li><li>Ketuk <b>Create API key</b>, lalu salin kuncinya.</li><li>Tempel di kotak di bawah dan ketuk <b>Simpan & uji</b>.</li></ol>
        <input type="password" id="akey" placeholder="Tempel kunci API Gemini (AIza...)" value="${esc(S.aiKey)}" autocomplete="off">
        <div class="btns"><button class="btn" data-save>Simpan & uji</button>${S.aiKey ? `<button class="btn ghost" data-del>Hapus kunci</button>` : ""}</div>
        <div id="ares">${S.aiKey ? `<div class="fb ok" style="margin-top:10px">Kunci tersimpan${S.aiModel ? " · model: " + esc(S.aiModel) : ""}.</div>` : ""}</div></div>
      <div class="card small"><b>Privasi</b><p class="muted" style="margin:6px 0 0">Kunci disimpan hanya di HP ini. Pesan percakapan dikirim langsung dari HP Anda ke Google Gemini untuk dijawab. Jangan menuliskan data pribadi yang sensitif. Kuota gratis Gemini terbatas per menit dan per hari.</p></div>
    `);
    on("[data-save]", async el => {
      const k = $app.querySelector("#akey").value.trim(); const res = $app.querySelector("#ares");
      if (!k) { toast("Tempel kunci API dulu."); return; }
      S.aiKey = k; S.aiModel = ""; save(); el.disabled = true; res.innerHTML = `<div class="fb info" style="margin-top:10px">Menguji koneksi...</div>`;
      try { const m = await gemModel(); res.innerHTML = `<div class="fb ok" style="margin-top:10px">✅ Terhubung. Model: <b>${esc(m)}</b></div>`; }
      catch (e) { res.innerHTML = `<div class="fb no" style="margin-top:10px">${esc(e.message || e)}</div>`; }
      el.disabled = false;
    });
    on("[data-del]", () => { S.aiKey = ""; S.aiModel = ""; save(); render(); toast("Kunci dihapus."); });
  }
  function vAI(p) {
    if (!S.aiKey) { go("aisettings", {}, true); return; }
    const sc = p.sc ? scById(p.sc) : null, tt = p.tt ? ttById(p.tt) : null;
    const title = sc ? sc.t : tt ? tt.t : p.title || "Ngobrol bebas";
    const ic = sc ? sc.ic : tt ? tt.ic : "🤖";
    const color = sc ? sc.color : "var(--accent)";
    if (!p.log) { p.log = []; p.hist = []; p.start = Date.now(); p.busy = false; p.n = 0; }
    shell(esc(title), `
      <div class="chathead"><span class="scic" style="background:${color}">${ic}</span>
        <div style="flex:1;min-width:0"><b>${sc ? esc(sc.role) : "Kawan · Tutor AI"}</b><div class="small muted"><span class="dot"></span> Gemini · level ${esc(S.level)}${S.beginner ? " · mode pemula" : ""}</div></div>
        <button class="btn soft" style="padding:8px 12px" data-end>Selesai</button></div>
      <div id="chat" class="chat" aria-live="polite"></div>
      <div id="csum"></div>
      <div id="composer"></div>
    `, { nofab: true });
    const $chat = $app.querySelector("#chat"), $comp = $app.querySelector("#composer");
    const sys = aiSystem(p);
    function draw() {
      $chat.innerHTML = p.log.map((m, i) => m.who === "bot" ? `<div class="msg bot"><div class="bub">${esc(m.text)}${m.id ? `<div class="tr">${esc(m.id)}</div>` : ""}<div class="mact"><button data-say="${i}">🔊</button><button data-slow="${i}">🐢</button></div></div></div>`
        : m.who === "me" ? `<div class="msg me"><div class="bub">${esc(m.text)}</div>${m.fix ? `<div class="fbk"><span class="tagmid">Koreksi</span><div>✏️ ${esc(m.fix)}</div></div>` : m.ok ? `<div class="fbk"><span class="tagok">Sudah tepat</span></div>` : ""}</div>`
        : `<div class="msg sys"><div class="fb ${m.err ? "no" : "info"}">${esc(m.text)}</div></div>`).join("") + (p.busy ? `<div class="msg bot"><div class="bub typing"><i></i><i></i><i></i></div></div>` : "");
      $chat.querySelectorAll("[data-say]").forEach(b => b.onclick = () => speak(p.log[+b.dataset.say].text));
      $chat.querySelectorAll("[data-slow]").forEach(b => b.onclick = () => speak(p.log[+b.dataset.slow].text, 0.65));
      if (!p.ended) {
        $comp.innerHTML = `<div class="compose">${SR ? `<button class="micbtn" data-mic aria-label="Bicara">🎙</button>` : ""}<input type="text" id="say" placeholder="${SR ? "Ketuk 🎙 atau ketik..." : "Ketik pesanmu..."}" autocomplete="off" autocapitalize="sentences" ${p.busy ? "disabled" : ""}><button class="sendbtn" data-send ${p.busy ? "disabled" : ""}>➤</button></div><div class="small muted" id="mst" style="margin-top:6px"></div>`;
        const inp = $comp.querySelector("#say");
        inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); send(inp.value); } });
        $comp.querySelector("[data-send]").onclick = () => send(inp.value);
        const mic = $comp.querySelector("[data-mic]");
        if (mic) mic.onclick = () => { if (synth) synth.cancel(); const st = $comp.querySelector("#mst"); listenOnce(a => send(a[0]), msg => { st.textContent = msg || ""; mic.classList.toggle("rec", msg === "🎙 Mendengarkan..."); }); };
      } else $comp.innerHTML = "";
      const last = $chat.lastElementChild; if (last) last.scrollIntoView({ block: "end", behavior: "smooth" });
    }
    async function ask(userText, meIdx) {
      p.busy = true; draw();
      try {
        const raw = await gemChat(sys, p.hist);
        const a = parseAI(raw);
        p.hist.push({ role: "model", parts: [{ text: a.en }] });
        if (meIdx !== undefined) { if (a.fix) p.log[meIdx].fix = a.fix; else p.log[meIdx].ok = true; }
        p.log.push({ who: "bot", text: a.en, id: a.id });
        p.busy = false; draw(); speak(a.en);
      } catch (e) {
        p.hist.pop(); p.busy = false;
        p.log.push({ who: "sys", err: true, text: e.message || String(e) });
        if (meIdx !== undefined) { p.log.splice(meIdx, 1); }
        draw();
      }
    }
    function send(text) {
      text = String(text || "").trim(); if (!text || p.busy) return;
      if (synth) synth.cancel();
      p.log.push({ who: "me", text }); p.hist.push({ role: "user", parts: [{ text }] }); p.n++;
      if (words(text).length >= 4) addXP(3);
      ask(text, p.log.length - 1);
    }
    on("[data-end]", async () => {
      if (p.ended) return;
      if (p.n < 2) { toast("Ngobrol minimal 2 kali dulu, ya."); return; }
      p.ended = true; p.busy = true; draw();
      const transcript = p.log.filter(m => m.who !== "sys").map(m => (m.who === "bot" ? "Tutor" : "Saya") + ": " + m.text).join("\n");
      let ev = "";
      try {
        ev = await gemChat("You are an English teacher. Answer in Indonesian, plain text without markdown symbols.", [{ role: "user", parts: [{ text: `Evaluasi percakapan bahasa Inggris saya berikut (level ${S.level}). Beri: 1) perkiraan skor 0-100 dengan format "SKOR: angka", 2) dua kekuatan, 3) tiga perbaikan terpenting beserta contoh kalimat yang benar.\n\n${transcript}` }] }]);
      } catch (e) { ev = "Evaluasi gagal dimuat: " + (e.message || e); }
      p.busy = false;
      const m = ev.match(/SKOR:\s*(\d{1,3})/i); const score = m ? Math.min(100, +m[1]) : 70;
      S.convos.push({ kind: "ai", id: p.sc || p.tt || "free", date: Date.now(), score, turns: p.n, secs: Math.min(1800, Math.round((Date.now() - p.start) / 1000)) });
      S.convos = S.convos.slice(-60); addXP(20); save();
      draw();
      $app.querySelector("#csum").innerHTML = `<div class="card sumcard"><div class="center"><div style="font-size:40px">🎓</div><b style="font-size:20px">Evaluasi tutor AI</b></div>
        <div class="kpis"><div><b>${score}</b><span>skor</span></div><div><b>${p.n}</b><span>pesan</span></div><div><b>${Math.max(1, Math.round((Date.now() - p.start) / 60000))}</b><span>menit</span></div></div>
        <div class="small" style="white-space:pre-wrap">${esc(ev.replace(/[*#]/g, ""))}</div>
        <div class="btns"><button class="btn" data-again>↺ Ngobrol lagi</button><button class="btn ghost" data-hub>Kembali</button></div></div>`;
      on("[data-again]", () => go("ai", { sc: p.sc, tt: p.tt, custom: p.custom, title: p.title }, true));
      on("[data-hub]", () => { stack = [{ view: "talk", params: {} }]; render(); });
    });
    draw();
    if (!p.hist.length) {
      p.hist.push({ role: "user", parts: [{ text: "Please start the conversation with a short greeting and your first question." }] });
      ask();
    }
  }
  function aiCard() {
    return `<div class="aicard"><div class="row" style="gap:12px;align-items:flex-start"><span class="scic" style="background:linear-gradient(135deg,#7c3aed,#2563eb)">🤖</span>
      <div style="flex:1;min-width:0"><b>Tutor AI · ngobrol bebas</b><div class="small muted">${S.aiKey ? "Terhubung ke Gemini · jawab apa saja, koreksi langsung" : "Opsional · hubungkan kunci Gemini gratis"}</div></div>${S.aiKey ? `<span class="status ok">Aktif</span>` : `<span class="status">Baru</span>`}</div>
      <p class="small" style="margin:10px 0 12px">Bicara bebas seperti dengan guru sungguhan: AI menjawab sesuai levelmu, memerankan situasi apa pun, dan memberi koreksi bahasa Indonesia setelah tiap kalimat.</p>
      <div class="btns" style="margin-top:0">${S.aiKey ? `<button class="btn" data-ai>▶ Mulai ngobrol</button><button class="btn ghost" data-aiset>Pengaturan</button>` : `<button class="btn" data-aiset>Hubungkan Tutor AI</button>`}</div></div>`;
  }
  function bindAiCard() {
    on("[data-ai]", () => go("ai", {}));
    on("[data-aiset]", () => go("aisettings"));
  }

  function homeVideos() {
    const vids = allVideos(); if (!vids.length) return "";
    const pick = MEDIA.map(g => { const nw = g.items.find(([id]) => !S.watched[id]) || g.items[0]; return { id: nw[0], t: nw[1], g }; });
    return `<div class="row" style="justify-content:space-between;align-items:flex-end;margin:18px 0 10px"><div class="sec-title" style="margin:0">Video pilihan dari Drive</div><button class="linkbtn" data-gomedia>Semua ${vids.length} video →</button></div><div class="hscroll">${pick.map(v => vcard(v)).join("")}</div>`;
  }

  /* ---------- Render ---------- */
  const VIEWS = { media: vMedia, video: vVideo, library: vLibrary, ai: vAI, aisettings: vAISettings, talk: vTalkHub, brief: vBrief, chat: vChat, home: vHome, practice: vPractice, courses: vCourses, course: vCourse, lesson: vLesson, quiz: vQuiz, cert: vCert, profile: vProfile, level: vLevel, exam: vExam, tutors: vTutors, tutor: vTutor, lessons: vLessons, reading: vReading, passage: vPassage, listening: vListening, speaking: vSpeaking, writing: vWriting, w_translate: vTranslate, w_arrange: vArrange, w_grammar: vGrammar, w_journal: vJournal, vocab: vVocab, study: vStudy, placement: vPlacement, progress: vProgress, help: vHelp };
  function render() { const c = cur(); (VIEWS[c.view] || vHome)(c.params || {}); }

  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredPrompt = e; });

  try { history.replaceState({ d: 1 }, ""); } catch (e) { }
  stack = [{ view: "home", params: {} }];
  render();

  if ("serviceWorker" in navigator && location.protocol === "https:" || location.hostname === "localhost") {
    try { navigator.serviceWorker && navigator.serviceWorker.register("sw.js").catch(() => { }); } catch (e) { }
  }
})();
