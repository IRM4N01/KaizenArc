const CACHE_NAME = "training-arc-v4";
const ASSETS = [
    "/TrainingArc/",
    "/TrainingArc/index.html",
    "/TrainingArc/style.css",
    "/TrainingArc/app.js"
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