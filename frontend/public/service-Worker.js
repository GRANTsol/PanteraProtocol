const CACHE_NAME = "pantera-protocol-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/logo192.png",
  "/logo512.png",
  "/manifest.json",
  "/favicon.ico",
  "/static/js/bundle.js",
  "/static/css/main.css"
];

// 📌 Install Service Worker & Cache Static Assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Caching assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 📌 Serve Cached Content When Offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// 📌 Update Cache When New Assets Are Available
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("⚠️ Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
