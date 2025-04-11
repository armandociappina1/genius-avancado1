self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("genius-cache").then(function(cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/script.js",
        "/manifest.json",
        "/sons/vermelho.mp3",
        "/sons/verde.mp3",
        "/sons/amarelo.mp3",
        "/sons/azul.mp3",
        "/icon-192.png",
        "/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
