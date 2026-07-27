// ======= APP ENTRY POINT =======
import { initSplash } from './splash.js';
import { initLifts, lifts } from './lifts.js';
import { initPrograms } from './programs.js';
import { initHome, renderDashboard } from './home.js';
import { openProgram } from './programs.js';
import { openWeek } from './weeks.js';

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

            // Refresh dashboard when switching to home
            if (target === "home-screen") {
                renderDashboard(lifts, openProgram, openWeek);
            }

            // Reset lifts screen when leaving it
            if (target !== "lifts-screen") {
                const liftDetail = document.getElementById("lift-detail");
                const liftsContainer = document.getElementById("lifts-container");
                if (liftDetail) liftDetail.classList.add("hidden");
                if (liftsContainer) liftsContainer.classList.remove("hidden");
            }
            
        });
    });
};

// Start the app
function startApp() {
    initNav();
    initLifts();
    initPrograms();
    initHome(lifts, openProgram, openWeek);
    // Render dashboard after everything is ready
    renderDashboard(lifts, openProgram, openWeek);
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