const CACHE_NAME = "kaizen-arc-v12";
const ASSETS = [
    "/KaizenArc/",
    "/KaizenArc/index.html",
    "/KaizenArc/css/main.css",
    "/KaizenArc/css/nav.css",
    "/KaizenArc/css/lifts.css",
    "/KaizenArc/css/programs.css",
    "/KaizenArc/css/days.css",
    "/KaizenArc/css/exercises.css",
    "/KaizenArc/css/workout.css",
    "/KaizenArc/css/splash.css",
    "/KaizenArc/js/app.js",
    "/KaizenArc/js/storage.js",
    "/KaizenArc/js/splash.js",
    "/KaizenArc/js/lifts.js",
    "/KaizenArc/js/programs.js",
    "/KaizenArc/js/weeks.js",
    "/KaizenArc/js/days.js",
    "/KaizenArc/js/exercises.js",
    "/KaizenArc/js/workout.js",
    "/KaizenArc/icons/icon-192.png",
    "/KaizenArc/icons/icon-512.png",
    "/KaizenArc/Kaizen-Arc-Logo.png",
    "/KaizenArc/js/exerciseSearch.js",
    "/KaizenArc/js/exerciseData.js",
    "/KaizenArc/js/home.js"
];

// Install — cache all assets
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activate — clean up old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Fetch — serve from cache, fall back to network
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request);
        })
    );
});