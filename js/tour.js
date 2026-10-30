// ======= FEATURE TOUR =======
// Spotlight-style tab-by-tab tour with ⓘ icon re-entry per tab.

// Each step: which nav tab to activate, a target element selector,
// a title and description.
const TOUR_STEPS = [
    {
        tab: "home-screen",
        navLabel: "Home",
        target: "#active-program-card, #no-active-program",  // whichever is visible
        title: "Home",
        desc: "Your dashboard shows your active program, progress photos and a quick lift summary. Everything you need at a glance."
    },
    {
        tab: "programs-screen",
        navLabel: "Programs",
        target: "#create-program-btn",
        title: "Programs",
        desc: "Create structured training blocks — set the weeks, add days, and plan every exercise before you walk in the gym."
    },
    {
        tab: "lifts-screen",
        navLabel: "Lifts",
        target: "#lifts-container",
        title: "My Lifts",
        desc: "Set your 1RM for the big four lifts. The app auto-calculates every percentage so you always know the exact weight to load."
    },
    {
        tab: "body-screen",
        navLabel: "Muscle Map",
        target: ".body-diagram-wrap",
        title: "Muscle Map",
        desc: "Tap any muscle group to see which exercises hit it. Track your training balance and make sure nothing gets left behind."
    }
];

let tourActive = false;
let currentStep = 0;
let overlay = null;
let bubble = null;
let ring = null;

// ─── Public API ────────────────────────────────────────────────────────────

/** Launch the full tour from step 0. */
export function launchTour() {
    currentStep = 0;
    _buildUI();
    _showStep(0);
}

/** Launch tour jumping straight to the step for the given tab screen id. */
export function launchTourForTab(screenId) {
    const idx = TOUR_STEPS.findIndex(s => s.tab === screenId);
    currentStep = idx >= 0 ? idx : 0;
    _buildUI();
    _showStep(currentStep);
}

/** Tear down tour (called internally and from outside if needed). */
export function dismissTour() {
    if (overlay) overlay.remove();
    if (bubble) bubble.remove();
    if (ring) ring.remove();
    overlay = bubble = ring = null;
    tourActive = false;
    document.removeEventListener("keydown", _keyHandler);
}

// ─── Build DOM ─────────────────────────────────────────────────────────────

function _buildUI() {
    dismissTour(); // clean any previous
    tourActive = true;

    // Dark overlay
    overlay = document.createElement("div");
    overlay.id = "tour-overlay";
    document.body.appendChild(overlay);

    // Highlight ring
    ring = document.createElement("div");
    ring.id = "tour-ring";
    document.body.appendChild(ring);

    // Tooltip bubble
    bubble = document.createElement("div");
    bubble.id = "tour-bubble";
    bubble.innerHTML = `
        <div id="tour-step-label"></div>
        <div id="tour-title"></div>
        <div id="tour-desc"></div>
        <div id="tour-btns">
            <button id="tour-back-btn">Back</button>
            <button id="tour-next-btn">Next →</button>
        </div>
        <div id="tour-dots"></div>
        <button id="tour-close-btn" aria-label="Close tour">✕</button>
    `;
    document.body.appendChild(bubble);

    // Button listeners
    document.getElementById("tour-next-btn").addEventListener("click", () => {
        if (currentStep < TOUR_STEPS.length - 1) {
            currentStep++;
            _showStep(currentStep);
        } else {
            dismissTour();
        }
    });

    document.getElementById("tour-back-btn").addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            _showStep(currentStep);
        }
    });

    document.getElementById("tour-close-btn").addEventListener("click", dismissTour);
    overlay.addEventListener("click", dismissTour);

    document.addEventListener("keydown", _keyHandler);
}

function _keyHandler(e) {
    if (!tourActive) return;
    if (e.key === "Escape") dismissTour();
    if (e.key === "ArrowRight" && currentStep < TOUR_STEPS.length - 1) { currentStep++; _showStep(currentStep); }
    if (e.key === "ArrowLeft" && currentStep > 0) { currentStep--; _showStep(currentStep); }
}

// ─── Step logic ────────────────────────────────────────────────────────────

function _showStep(idx) {
    const step = TOUR_STEPS[idx];

    // 1. Switch tab
    _activateTab(step.tab);

    // 2. Wait a tick for the tab to render, then position ring
    requestAnimationFrame(() => {
        setTimeout(() => {
            _positionRing(step.target);
            _updateBubble(idx);
        }, 80);
    });
}

function _activateTab(screenId) {
    // Hide all screens
    document.querySelectorAll(".screen").forEach(s => {
        s.classList.add("hidden");
        s.classList.remove("active");
    });
    // Show target
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.remove("hidden");
        screen.classList.add("active");
    }
    // Update nav active state
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.screen === screenId) btn.classList.add("active");
    });
}

function _positionRing(selector) {
    // Try each selector in the comma list — use first visible one
    const selectors = selector.split(",").map(s => s.trim());
    let el = null;
    for (const s of selectors) {
        const candidate = document.querySelector(s);
        if (candidate && !candidate.classList.contains("hidden") && candidate.offsetParent !== null) {
            el = candidate;
            break;
        }
    }

    if (!el) {
        // Fallback: centre of screen
        ring.style.cssText = `
            position: fixed;
            top: 50%; left: 50%;
            width: 80px; height: 80px;
            transform: translate(-50%, -50%);
            border-radius: 12px;
        `;
        return;
    }

    const rect = el.getBoundingClientRect();
    const pad = 8;

    ring.style.cssText = `
        position: fixed;
        top: ${rect.top - pad}px;
        left: ${rect.left - pad}px;
        width: ${rect.width + pad * 2}px;
        height: ${rect.height + pad * 2}px;
        border-radius: 14px;
        z-index: 10001;
    `;

    // Punch the overlay using a clip-path cutout
    // We use a combination: the overlay is full-screen but we cut a transparent
    // hole at the ring's position using a polygon clip approach via SVG mask.
    _updateOverlayCutout(rect, pad);
}

function _updateOverlayCutout(rect, pad) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const t = rect.top - pad;
    const l = rect.left - pad;
    const b = rect.bottom + pad;
    const r = rect.right + pad;

    // Use SVG clipPath technique: fill viewport but exclude the ring region
    // via a CSS mask on the overlay using a radial/polygon gradient
    overlay.style.background = `
        linear-gradient(rgba(0,0,0,0.82), rgba(0,0,0,0.82))
    `;

    // Using CSS mask with an SVG data URI for a precise rectangular cutout
    const svgMask = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${vw}" height="${vh}">
            <defs>
                <mask id="m">
                    <rect width="${vw}" height="${vh}" fill="white"/>
                    <rect x="${l}" y="${t}" width="${r - l}" height="${b - t}" rx="14" fill="black"/>
                </mask>
            </defs>
            <rect width="${vw}" height="${vh}" fill="white" mask="url(#m)"/>
        </svg>
    `.trim();

    const encoded = "data:image/svg+xml," + encodeURIComponent(svgMask);
    overlay.style.webkitMaskImage = `url("${encoded}")`;
    overlay.style.maskImage = `url("${encoded}")`;
    overlay.style.webkitMaskSize = "100% 100%";
    overlay.style.maskSize = "100% 100%";
}

function _updateBubble(idx) {
    const step = TOUR_STEPS[idx];
    const total = TOUR_STEPS.length;

    document.getElementById("tour-step-label").textContent = `${idx + 1} of ${total}`;
    document.getElementById("tour-title").textContent = step.title;
    document.getElementById("tour-desc").textContent = step.desc;

    const nextBtn = document.getElementById("tour-next-btn");
    const backBtn = document.getElementById("tour-back-btn");

    nextBtn.textContent = idx === total - 1 ? "Done ✓" : "Next →";
    backBtn.style.display = idx === 0 ? "none" : "block";

    // Dots
    const dotsEl = document.getElementById("tour-dots");
    dotsEl.innerHTML = "";
    for (let i = 0; i < total; i++) {
        const dot = document.createElement("span");
        dot.className = "tour-dot" + (i === idx ? " active" : "");
        dotsEl.appendChild(dot);
    }
}

// ─── ⓘ icon wiring (call once after DOM is ready) ──────────────────────────

export function initTourIcons() {
    document.querySelectorAll("[data-tour-tab]").forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            launchTourForTab(icon.dataset.tourTab);
        });
    });
}