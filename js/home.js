// ======= HOME / DASHBOARD =======
import { getPrograms, getPersonalRecords } from './storage.js';

export function initHome(lifts, openProgramCallback, openWeekCallback) {
    renderDashboard(lifts, openProgramCallback, openWeekCallback);
    initProgressPhotos();
}

export function renderDashboard(lifts, openProgramCallback, openWeekCallback) {
    // Greeting
    const userName = localStorage.getItem("userName") || "there";
    document.getElementById("dashboard-greeting").textContent = `Welcome back, ${userName}`;

    // Lift summary
    renderLiftSummary(lifts);

    // Active program
    renderActiveProgram(openProgramCallback, openWeekCallback);
}

function renderLiftSummary(lifts) {
    const container = document.getElementById("lift-summary");
    container.innerHTML = "";

    lifts.forEach(lift => {
        const card = document.createElement("div");
        card.classList.add("lift-summary-card");
        card.innerHTML = `
            <h4>${lift.name}</h4>
            <p>${lift.max}kg</p>
        `;
        card.addEventListener("click", () => {
            // Switch to lifts tab
            document.querySelectorAll(".screen").forEach(s => {
                s.classList.add("hidden");
                s.classList.remove("active");
            });
            document.getElementById("lifts-screen").classList.remove("hidden");
            document.getElementById("lifts-screen").classList.add("active");
            document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
            document.querySelector(".nav-btn[data-screen='lifts-screen']").classList.add("active");
        });
        container.appendChild(card);
    });
}

function renderActiveProgram(openProgramCallback, openWeekCallback) {
    const programs = getPrograms();
    const activeCard = document.getElementById("active-program-card");
    const noActiveMsg = document.getElementById("no-active-program");

    if (programs.length === 0) {
        activeCard.classList.add("hidden");
        noActiveMsg.classList.remove("hidden");
        return;
    }

    // Find most recently active program
    let activeProgram = null;
    let latestDate = null;

    programs.forEach(program => {
        program.weeks.forEach(week => {
            week.days.forEach(day => {
                if (day.completedDate) {
                    const date = new Date(day.completedDate.split(".").reverse().join("-"));
                    if (!latestDate || date > latestDate) {
                        latestDate = date;
                        activeProgram = program;
                    }
                }
            });
        });
    });

    // Fall back to most recently created program
    if (!activeProgram) activeProgram = programs[programs.length - 1];

    // Calculate progress
    let totalWorkouts = 0;
    let completedWorkouts = 0;
    let currentWeekIndex = 0;

    activeProgram.weeks.forEach((week, i) => {
        week.days.forEach(day => {
            if (day.type === "workout") {
                totalWorkouts++;
                if (day.completed) {
                    completedWorkouts++;
                    currentWeekIndex = i;
                }
            }
        });
    });

    const progressPct = totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0;
    const currentWeek = activeProgram.weeks[currentWeekIndex];

    // Render
    activeCard.classList.remove("hidden");
    noActiveMsg.classList.add("hidden");

    const cover = document.getElementById("active-program-cover");
    if (activeProgram.coverImage) {
        cover.src = activeProgram.coverImage;
        cover.style.objectPosition = `center ${activeProgram.coverPosition || "50%"}`;
        cover.classList.remove("hidden");
    } else {
        cover.classList.add("hidden");
    }

    document.getElementById("active-program-name").textContent = activeProgram.name;
    document.getElementById("active-program-week").textContent = `Week ${currentWeekIndex + 1} of ${activeProgram.weeks.length}`;
    document.getElementById("program-progress-bar").style.width = `${progressPct}%`;
    document.getElementById("active-program-stats").textContent = `${completedWorkouts} of ${totalWorkouts} workouts completed`;

    // Remove old listener and add new one
    const continueBtn = document.getElementById("continue-program-btn");
    const newBtn = continueBtn.cloneNode(true);
    continueBtn.parentNode.replaceChild(newBtn, continueBtn);

    document.getElementById("continue-program-btn").addEventListener("click", () => {
        // Switch to programs screen first
        document.querySelectorAll(".screen").forEach(s => {
            s.classList.add("hidden");
            s.classList.remove("active");
        });
        document.getElementById("programs-screen").classList.remove("hidden");
        document.getElementById("programs-screen").classList.add("active");

        // Update nav
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
        document.querySelector(".nav-btn[data-screen='programs-screen']").classList.add("active");

        // Open the program and week
        openProgramCallback(activeProgram);
        if (currentWeek) openWeekCallback(currentWeek, activeProgram, getPrograms());
    });
}

function initProgressPhotos() {
    const beforeInput = document.getElementById("before-photo-input");
    const latestInput = document.getElementById("latest-photo-input");

    // Load saved photos
    const beforePhoto = localStorage.getItem("progressPhotoBefore");
    const latestPhoto = localStorage.getItem("progressPhotoLatest");

    if (beforePhoto) renderPhoto("before-photo-display", beforePhoto, "before");
    if (latestPhoto) renderPhoto("latest-photo-display", latestPhoto, "latest");

    // Before photo upload
    beforeInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            localStorage.setItem("progressPhotoBefore", event.target.result);
            renderPhoto("before-photo-display", event.target.result, "before");
        };
        reader.readAsDataURL(file);
    });

    // Latest photo upload
    latestInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            localStorage.setItem("progressPhotoLatest", event.target.result);
            renderPhoto("latest-photo-display", event.target.result, "latest");
        };
        reader.readAsDataURL(file);
    });
}

function renderPhoto(containerId, src, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <img src="${src}" class="progress-photo-img" alt="${type} photo" />
        <label for="${type}-photo-input" style="display:block; text-align:center; padding:6px; font-size:12px; color:var(--text-secondary); cursor:pointer;">Change photo</label>
        <input type="file" id="${type}-photo-input" accept="image/*" style="display:none;" />
    `;

    container.querySelector(`#${type}-photo-input`).addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const key = type === "before" ? "progressPhotoBefore" : "progressPhotoLatest";
            localStorage.setItem(key, event.target.result);
            renderPhoto(containerId, event.target.result, type);
        };
        reader.readAsDataURL(file);
    });
}