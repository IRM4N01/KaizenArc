// ======= APP ENTRY POINT =======
import { initSplash } from './splash.js';
import { initLifts } from './lifts.js';
import { initPrograms } from './programs.js';

// Bottom navigation
function initNav() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".screen").forEach(s => {
                s.classList.add("hidden");
                s.classList.remove("active");
            });

            const target = btn.dataset.screen;
            document.getElementById(target).classList.remove("hidden");
            document.getElementById(target).classList.add("active");

            document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}

// Start the app
function startApp() {
    initNav();
    initLifts();
    initPrograms();
}

initSplash(startApp);

// ======= SERVICE WORKER =======
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/KaizenArc/service-worker.js")
            .then(reg => console.log("Service worker registered"))
            .catch(err => console.log("Service worker error:", err));
    });
}