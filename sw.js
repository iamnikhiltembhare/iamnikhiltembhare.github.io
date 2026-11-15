// Offline cache. Bump VERSION whenever you change site files.
const VERSION = "v5";
const CACHE = `portfolio-${VERSION}`;
const ASSETS = [
  "./", "index.html", "css/style.css", "js/data.js", "js/main.js", "js/effects.js", "js/vendor/anime.umd.min.js",
  "manifest.webmanifest", "assets/avatar.jpg", "assets/icons/icon.svg", "assets/icons/icon-192.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first, fall back to cache when offline.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("index.html")))
  );
});
