// ======= APP ENTRY POINT =======
import { initSplash } from './splash.js';
import { initLifts, lifts } from './lifts.js';
import { initPrograms } from './programs.js';
import { initHome, renderDashboard } from './home.js';
import { openProgram } from './programs.js';
import { openWeek } from './weeks.js';
import { initHistory, renderHistory } from './history.js';


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

            if (target === "history-screen") {
                renderHistory();
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
    initHistory();
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
    let touchCurrentX = 0;
    let isSwiping = false;
    let swipeRejected = false;

    let activeScreen = null;      // the screen being dragged
    let prevScreen = null;        // the screen revealed underneath
    let prevScreenWasHidden = false; // did we unhide prevScreen ourselves?
    let targetBtn = null; 

    const EDGE_ZONE = 30;         // px from left edge to start gesture
    const THRESHOLD = 0.4;        // % of screen width to commit
    const MIN_VELOCITY = 0.3;     // px/ms to commit regardless of distance
    const TRANSITION = "transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    // Map: which back button is visible → { prev screen id, button id }
    const BACK_MAP = [
        { btnId: "back-btn",                        prevId: "lifts-screen"         },
        { btnId: "back-to-programs-btn",            prevId: "programs-screen"      },
        { btnId: "back-to-program-from-week-btn",   prevId: "program-detail-screen"},
        { btnId: "back-to-week-btn",                prevId: "week-detail-screen"   },
        { btnId: "back-to-program-from-workout-btn",prevId: "exercise-detail-screen"},
    ];

    function getSwipeTarget() {
        for (const { btnId, prevId } of BACK_MAP) {
            const btn = document.getElementById(btnId);
            if (btn && isVisible(btn)) {
                // For back-btn (lift detail), activeScreen is the whole lifts-screen
                // because lift-detail is a sub-panel, not a .screen div.
                // For everything else, find the .screen that is currently active.
                let current = null;
                if (btnId === "back-btn") {
                    current = document.getElementById("lifts-screen");
                } else {
                    // The active screen is the one containing this button
                    current = btn.closest(".screen") ||
                              [...document.querySelectorAll(".screen")]
                                .find(s => !s.classList.contains("hidden") && s.contains(btn));
                }
                const prev = document.getElementById(prevId);
                if (current && prev) return { btn, current, prev };
            }
        }
        return null;
    }

    function cleanUp() {
        if (activeScreen) {
            activeScreen.style.transition = "";
            activeScreen.style.transform  = "";
            activeScreen.style.boxShadow  = "";
            activeScreen.style.zIndex     = "";
        }
        if (prevScreen) {
            prevScreen.style.transform = "";
            prevScreen.style.zIndex    = "";
            if (prevScreenWasHidden) {
                prevScreen.classList.add("hidden");
            }
        }
        activeScreen       = null;
        prevScreen         = null;
        prevScreenWasHidden = false;
        isSwiping          = false;
        swipeRejected      = false;
        targetBtn          = null; 
    }

    document.addEventListener("touchstart", (e) => {
        touchStartX   = e.touches[0].clientX;
        touchStartY   = e.touches[0].clientY;
        touchCurrentX = touchStartX;
        isSwiping      = false;
        swipeRejected  = false;
        activeScreen   = null;
        prevScreen     = null;
    }, { passive: true });

    document.addEventListener("touchmove", (e) => {
        if (swipeRejected) return;

        touchCurrentX = e.touches[0].clientX;
        const dx = touchCurrentX - touchStartX;
        const dy = Math.abs(e.touches[0].clientY - touchStartY);

        // Only activate from left edge, moving right, more horizontal than vertical
        if (!isSwiping) {
            if (touchStartX > EDGE_ZONE || dx < 0) { swipeRejected = true; return; }
            if (dy > Math.abs(dx) + 5)             { swipeRejected = true; return; }
            if (dx < 8) return; // wait for a tiny bit of intent before committing

            // Determine what to swipe
            const target = getSwipeTarget();
            if (!target) { swipeRejected = true; return; }

            activeScreen = target.current;
            prevScreen   = target.prev;
            targetBtn    = target.btn;

            // Reveal the previous screen underneath
            prevScreenWasHidden = prevScreen.classList.contains("hidden");
            if (prevScreenWasHidden) {
                prevScreen.classList.remove("hidden");
            }

            // Layer: active on top, prev below
            activeScreen.style.zIndex = "10";
            prevScreen.style.zIndex   = "5";

            // Subtle scale on prev screen (like iOS)
            prevScreen.style.transform = "scale(0.95)";

            isSwiping = true;
        }

        if (!isSwiping) return;

        // Follow finger — clamp to rightward only
        const clampedDx = Math.max(0, dx);
        activeScreen.style.transition = "none";
        activeScreen.style.transform  = `translateX(${clampedDx}px)`;
        activeScreen.style.boxShadow  = `-4px 0 20px rgba(0,0,0,0.3)`;

        // Prev screen scales from 0.95 → 1 as swipe progresses
        const progress = Math.min(clampedDx / window.innerWidth, 1);
        const scale = 0.95 + 0.05 * progress;
        prevScreen.style.transform = `scale(${scale})`;
    }, { passive: true });

    document.addEventListener("touchend", (e) => {
        if (!isSwiping) { cleanUp(); return; }

        const dx       = touchCurrentX - touchStartX;
        const dt       = e.timeStamp - (e.changedTouches[0]?.identifier ?? 0);
        const velocity = dx / Math.max(dt, 1); // rough px/ms

        const screenW    = window.innerWidth;
        const overThreshold  = dx > screenW * THRESHOLD;
        const fastEnough     = velocity > MIN_VELOCITY && dx > 50;

        if (overThreshold || fastEnough) {
            // Commit — slide out and navigate
            activeScreen.style.transition = TRANSITION;
            activeScreen.style.transform  = `translateX(${screenW}px)`;
            prevScreen.style.transition   = TRANSITION;
            prevScreen.style.transform    = "scale(1)";

            activeScreen.addEventListener("transitionend", () => {
                const snap = activeScreen;
                snap.style.transition = "";
                snap.style.transform  = "";
                snap.style.boxShadow  = "";
                snap.style.zIndex     = "";
                prevScreen.style.transition = "";
                prevScreen.style.transform  = "";
                prevScreen.style.zIndex     = "";
                prevScreenWasHidden = false;
                const btn = targetBtn;     // ← use saved reference
                activeScreen = null;
                prevScreen   = null;
                targetBtn    = null;
                isSwiping    = false;
                btn.click();               // ← direct click, no isVisible chec
            }, { once: true });
        } else {
            // Cancel — snap back
            activeScreen.style.transition = TRANSITION;
            activeScreen.style.transform  = "translateX(0)";
            activeScreen.style.boxShadow  = "";
            prevScreen.style.transition   = TRANSITION;
            prevScreen.style.transform    = "scale(0.95)";

            activeScreen.addEventListener("transitionend", () => {
                cleanUp();
            }, { once: true });
        }
    }, { passive: true });
}

// Keep isVisible as-is — used by both swipe and triggerBackButton
function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}