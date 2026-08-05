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
    initSwipeBack();
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

// ======= SWIPE TO GO BACK =======
function initSwipeBack() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = touchEndX - touchStartX;
        const diffY = Math.abs(touchEndY - touchStartY);

        // Only trigger if swipe is mostly horizontal and long enough
        if (diffX > 80 && diffY < 60) {
            triggerBackButton();
        }
    }, { passive: true });
}

function triggerBackButton() {
    // Find which screen is currently active and click its back button
    const backButtons = [
        "back-btn",
        "back-to-programs-btn",
        "back-to-program-from-week-btn",
        "back-to-week-btn",
        "back-to-program-from-workout-btn"
    ];

    for (const id of backButtons) {
        const btn = document.getElementById(id);
        if (btn && isVisible(btn)) {
            btn.click();
            return;
        }
    }
}

function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}