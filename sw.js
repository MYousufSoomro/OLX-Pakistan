var cacheName = "OLX-Pakistan V1.0.4";
var filesToCache = [
  "/",
  "/index.html",
  "/bootstrap/css/bootstrap.css",
  "/bootstrap/css/bootstrap.min.css",
  "/bootstrap/js/bootstrap.js",
  "/bootstrap/js/bootstrap.min.js",
  "/css/style.css",
  "/images/images.jpg",
  "/images/logo.png",
  "/images/logo-black.png",
  "/images/bg.jpg",
  "/js/app.js",
  "/js/firebase-init.js",
  "/js/jquery-3.3.1.min.js",
  "/pages/index.html",
  "/pages/login.html",
  "/pages/myWishList.html",
  "/pages/viewByCat.html",
  "/pages/js/addPost.js",
  "/pages/js/app.js",
  "/pages/js/index.js",
  "/pages/js/viewbyCat.js",
//   "/pages/postAd.html"
];

self.addEventListener("activate", function(e) {
  console.log("[ServiceWorker] Activate");
});

self.addEventListener("install", async function(e) {
  console.log("[ServiceWorker] Install");
  await e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    (async function() {
      const response = await caches.match(event.request);
      return response || fetch(event.request);
    })()
  );
});
