const CACHE = "kawan-english-v6";
const SHELL = ["./", "./index.html", "./app.js", "./data.js", "./courses.js", "./courses2.js", "./tutors.js", "./scenarios.js", "./scenarios2.js", "./courses3.js", "./media.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || req.url.includes("generativelanguage.googleapis.com")) return;
  e.respondWith(caches.match(req, { ignoreSearch: new URL(req.url).origin === self.location.origin }).then(hit => {
    const net = fetch(req).then(res => {
      if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
