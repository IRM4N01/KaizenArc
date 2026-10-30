// ======= HOME / DASHBOARD =======
import { getPrograms, getPersonalRecords } from './storage.js';

export function initHome(lifts, openProgramCallback, openWeekCallback) {
    renderDashboard(lifts, openProgramCallback, openWeekCallback);
    initProgressPhotos();

    document.getElementById("replay-onboarding-btn").addEventListener("click", () => {
    import('./onboarding.js').then(({ showOnboarding }) => {
            showOnboarding(() => {});
        });
    });
}

export function renderDashboard(lifts, openProgramCallback, openWeekCallback) {
    // Greeting
    const userName = localStorage.getItem("userName") || "there";
    document.getElementById("dashboard-greeting").textContent = `Welcome back, ${userName}`;

    renderLiftSummary(lifts);
    renderActiveProgram(openProgramCallback, openWeekCallback);
    renderInsights();
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

    // Separate completed and incomplete programs
    const incompletePrograms = programs.filter(p => !p.completed);
    const poolToSearch = incompletePrograms.length > 0 ? incompletePrograms : programs;

    // Find most recently active program within that pool
    let activeProgram = null;
    let latestDate = null;

    poolToSearch.forEach(program => {
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

    // Fall back to most recently created incomplete program (or last program if all complete)
    if (!activeProgram) activeProgram = poolToSearch[poolToSearch.length - 1];

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

function computeInsights() {
    const programs = getPrograms();
    const insights = [];

    const allCompletedDays = [];
    programs.forEach(program => {
        program.weeks.forEach(week => {
            week.days.forEach(day => {
                if (day.type === "workout" && day.completed && day.completedDate) {
                    const parts = day.completedDate.split(".");
                    const date = parts.length === 3
                        ? new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
                        : new Date(day.completedDate);
                    if (!isNaN(date)) allCompletedDays.push({ date, day, program });
                }
            });
        });
    });

    allCompletedDays.sort((a, b) => b.date - a.date);

    if (allCompletedDays.length === 0) {
        return [{ icon: "💪", text: "Complete your first workout to start tracking progress." }];
    }

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const sessionsThisWeek = allCompletedDays.filter(d => d.date >= startOfWeek).length;
    const label = sessionsThisWeek === 1 ? "session" : "sessions";
    insights.push(sessionsThisWeek > 0
        ? { icon: "📅", text: `${sessionsThisWeek} ${label} completed this week` }
        : { icon: "📅", text: "No sessions logged yet this week" }
    );

    const streak = computeStreak(allCompletedDays);
    if (streak >= 2) insights.push({ icon: "🔥", text: `${streak}-day training streak — keep it up` });
    else if (streak === 1) insights.push({ icon: "🔥", text: "Session logged today — you're on a streak" });

    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const volumeThis = calcVolume(allCompletedDays.filter(d => d.date >= startOfWeek));
    const volumeLast = calcVolume(allCompletedDays.filter(d => d.date >= startOfLastWeek && d.date < startOfWeek));

    if (volumeThis > 0 && volumeLast > 0) {
        const diff = Math.round(((volumeThis - volumeLast) / volumeLast) * 100);
        if (diff > 0) insights.push({ icon: "📈", text: `Volume up ${diff}% vs last week` });
        else if (diff < 0) insights.push({ icon: "📉", text: `Volume down ${Math.abs(diff)}% vs last week` });
        else insights.push({ icon: "➡️", text: "Volume on par with last week" });
    }

    const last = allCompletedDays[0];
    const daysAgo = Math.floor((now - last.date) / (1000 * 60 * 60 * 24));
    const exCount = last.day.exercises?.length || 0;
    if (daysAgo === 0) insights.push({ icon: "✅", text: `Last session: today${exCount > 0 ? ` · ${exCount} exercises` : ""}` });
    else if (daysAgo === 1) insights.push({ icon: "✅", text: `Last session: yesterday${exCount > 0 ? ` · ${exCount} exercises` : ""}` });
    else if (daysAgo <= 7) insights.push({ icon: "✅", text: `Last session: ${daysAgo} days ago` });
    else insights.push({ icon: "⚠️", text: `No session in ${daysAgo} days — time to get back at it` });

    return insights.slice(0, 3);
}

function computeStreak(sortedDays) {
    if (sortedDays.length === 0) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const uniqueDates = [...new Set(sortedDays.map(d => {
        const copy = new Date(d.date);
        copy.setHours(0, 0, 0, 0);
        return copy.getTime();
    }))].sort((a, b) => b - a);

    let streak = 0;
    let expected = today.getTime();
    for (const ts of uniqueDates) {
        if (ts === expected) { streak++; expected -= 86400000; }
        else if (ts === expected + 86400000 && streak === 0) { streak++; expected = ts - 86400000; }
        else break;
    }
    return streak;
}

function calcVolume(days) {
    let total = 0;
    days.forEach(({ day }) => {
        if (!day.exercises) return;
        day.exercises.forEach(ex => {
            total += ((ex.workingSets || 0) + (ex.warmupSets || 0)) * (ex.reps || 0) * (ex.weight || 0);
        });
    });
    return total;
}

function renderInsights() {
    const existing = document.getElementById("insights-section");
    if (existing) existing.remove();

    const insights = computeInsights();
    if (!insights.length) return;

    const section = document.createElement("div");
    section.id = "insights-section";
    section.className = "dashboard-section";
    section.innerHTML = `
        <p class="dashboard-label">Training Insights</p>
        <div id="insights-cards">
            ${insights.map(i => `
                <div class="insight-card">
                    <span class="insight-icon">${i.icon}</span>
                    <span class="insight-text">${i.text}</span>
                </div>
            `).join("")}
        </div>
    `;

    const progressPhotos = document.querySelector("#progress-photos")?.closest(".dashboard-section");
    const dashboard = document.getElementById("dashboard");
    if (progressPhotos) dashboard.insertBefore(section, progressPhotos);
    else dashboard.appendChild(section);
}

