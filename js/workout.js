// ======= WORKOUT TRACKER =======
import { savePrograms } from './storage.js';
import { renderDays } from './days.js';
import { refreshPrograms } from './programs.js';
import { searchLocalExercises } from './exerciseData.js';

let currentDay = null;
let currentWeek = null;
let currentProgram = null;
let currentPrograms = null;
let restTimerInterval = null;
let restTimerSeconds = 0;
let soundEnabled = true;
let vibrationEnabled = true;
let audioCtx = null;
let restTimerTotal = 0;

export function startWorkout(day, week, program, programs) {
    currentDay = day;
    currentWeek = week;
    currentProgram = program;
    currentPrograms = programs;

    document.getElementById("week-detail-screen").classList.add("hidden");
    document.getElementById("workout-screen").classList.remove("hidden");
    document.getElementById("workout-day-name").textContent = day.date + (day.notes ? " — " + day.notes : "");

    initRestTimer();
    initExerciseInfoModal();

    // Remove old listeners by replacing buttons
    const backBtn = document.getElementById("back-to-program-from-workout-btn");
    const newBackBtn = backBtn.cloneNode(true);
    backBtn.parentNode.replaceChild(newBackBtn, backBtn);

    const finishBtn = document.getElementById("finish-workout-btn");
    const newFinishBtn = finishBtn.cloneNode(true);
    finishBtn.parentNode.replaceChild(newFinishBtn, finishBtn);

    document.getElementById("back-to-program-from-workout-btn").addEventListener("click", () => {
        document.getElementById("workout-screen").classList.add("hidden");
        document.getElementById("week-detail-screen").classList.remove("hidden");
    });

    document.getElementById("finish-workout-btn").addEventListener("click", () => {
        currentDay.completed = true;
        currentDay.completedDate = new Date().toLocaleDateString("en-AU");
        savePrograms(currentPrograms);
        refreshPrograms();
        showWorkoutSummary();
    });

    renderWorkout(day);
}

function renderWorkout(day) {
    const list = document.getElementById("workout-exercises-list");
    list.innerHTML = "";

    if (day.exercises.length === 0) {
        list.innerHTML = "<p style='color:var(--text-secondary);'>No exercises planned for this day.</p>";
        updateWorkoutProgress(day);
        return;
    }

    day.exercises.forEach((ex, exIndex) => {
        const card = document.createElement("div");
        card.classList.add("workout-exercise-card");

        let setsHTML = "";

        if (ex.type === "compound") {
            ex.warmupSets.forEach((s, i) => {
                const done = s.done || false;
                setsHTML += `
                    <div class="set-row ${done ? "completed" : ""}">
                        <span>Warm up ${i + 1} — ${s.pct}% → ${s.weight}kg</span>
                        <button class="tick-btn ${done ? "done" : ""}" onclick="toggleSet(this, ${exIndex}, 'warmup', ${i})">
                            ${done ? "✓" : ""}
                        </button>
                    </div>
                `;
            });

            for (let i = 0; i < ex.workingSets; i++) {
                const done = ex.workingSetsDone ? ex.workingSetsDone[i] : false;
                setsHTML += `
                    <div class="set-row ${done ? "completed" : ""}">
                        <span>Working ${i + 1} — ${ex.workingPct}% → ${ex.workingWeight}kg × ${ex.reps} reps</span>
                        <button class="tick-btn ${done ? "done" : ""}" onclick="toggleSet(this, ${exIndex}, 'working', ${i})">
                            ${done ? "✓" : ""}
                        </button>
                    </div>
                `;
            }

        } else {
            for (let i = 0; i < (ex.warmupSets || 0); i++) {
                const done = ex.warmupDone ? ex.warmupDone[i] : false;
                setsHTML += `
                    <div class="set-row ${done ? "completed" : ""}">
                        <span>Warm up ${i + 1}</span>
                        <button class="tick-btn ${done ? "done" : ""}" onclick="toggleSet(this, ${exIndex}, 'accessory-warmup', ${i})">
                            ${done ? "✓" : ""}
                        </button>
                    </div>
                `;
            }

            for (let i = 0; i < (ex.workingSets ?? ex.sets ?? 0); i++) {
                const done = ex.workingSetsDone ? ex.workingSetsDone[i] : false;
                setsHTML += `
                    <div class="set-row ${done ? "completed" : ""}">
                        <span>Set ${i + 1} — ${ex.reps} reps${ex.weight ? " @ " + ex.weight + "kg" : ""}</span>
                        <button class="tick-btn ${done ? "done" : ""}" onclick="toggleSet(this, ${exIndex}, 'accessory-working', ${i})">
                            ${done ? "✓" : ""}
                        </button>
                    </div>
                `;
            }
        }

        const restTimerHTML = `
            <div class="rest-timer-presets">
                <button class="rest-preset-btn" data-seconds="30">30s</button>
                <button class="rest-preset-btn" data-seconds="60">60s</button>
                <button class="rest-preset-btn" data-seconds="90">90s</button>
                <button class="rest-preset-btn" data-seconds="120">2min</button>
            </div>
        `;

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3 style="margin:0;">${ex.name}</h3>
              <button class="exercise-info-btn" title="Exercise info">?</button>
            </div>
            ${ex.notes ? `<p class="exercise-notes">📝 ${ex.notes}</p>` : ""}
            ${setsHTML}${restTimerHTML}
        `;

        list.appendChild(card);

        card.querySelector(".exercise-info-btn").addEventListener("click", () => {
            openExerciseInfo(ex.name);
        });

         // Start rest button listener
        card.querySelectorAll(".rest-preset-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const seconds = parseInt(btn.dataset.seconds);
                const exerciseName = ex.name;

                // Highlight active preset
                card.querySelectorAll(".rest-preset-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                startRestTimer(seconds, exerciseName);
            });
        });
    });

    updateWorkoutProgress(day);
}

window.toggleSet = function(btn, exIndex, type, setIndex) {
    const ex = currentDay.exercises[exIndex];

    if (type === "warmup") {
        ex.warmupSets[setIndex].done = !ex.warmupSets[setIndex].done;
    } else if (type === "working") {
        if (!ex.workingSetsDone) ex.workingSetsDone = Array(ex.workingSets ?? ex.sets ?? 0).fill(false);
        ex.workingSetsDone[setIndex] = !ex.workingSetsDone[setIndex];
    } else if (type === "accessory-warmup") {
        if (!ex.warmupDone) ex.warmupDone = Array(ex.warmupSets).fill(false);
        ex.warmupDone[setIndex] = !ex.warmupDone[setIndex];
    } else if (type === "accessory-working") {
        if (!ex.workingSetsDone) ex.workingSetsDone = Array(ex.workingSets).fill(false);
        ex.workingSetsDone[setIndex] = !ex.workingSetsDone[setIndex];
    }

    savePrograms(currentPrograms);
    renderWorkout(currentDay);
}

function updateWorkoutProgress(day) {
    let total = 0;
    let done = 0;

    day.exercises.forEach(ex => {
        if (ex.type === "compound") {
            total += ex.warmupSets.length + ex.workingSets;
            done += ex.warmupSets.filter(s => s.done).length;
            done += ex.workingSetsDone ? ex.workingSetsDone.filter(Boolean).length : 0;
        } else {
            total += (ex.warmupSets || 0) + (ex.workingSets ?? ex.sets ?? 0);
            done += ex.warmupDone ? ex.warmupDone.filter(Boolean).length : 0;
            done += ex.workingSetsDone ? ex.workingSetsDone.filter(Boolean).length : 0;
        }
    });

    document.getElementById("workout-progress").textContent = `${done} of ${total} sets completed`;
}

function initRestTimer() {
    // Unlock audio context on first user interaction
    document.addEventListener("touchstart", () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }
    }, { once: false });

    document.getElementById("sound-toggle").addEventListener("change", (e) => {
        soundEnabled = e.target.checked;
    });

    document.getElementById("vibration-toggle").addEventListener("change", (e) => {
        vibrationEnabled = e.target.checked;
    });

    document.getElementById("rest-timer-stop").addEventListener("click", () => {
        stopRestTimer();
    });

    if (!navigator.vibrate) {
      const vibrationRow = document.getElementById("vibration-toggle").closest(".workout-setting-row");
      if (vibrationRow) vibrationRow.style.display = "none";
    }
}

function startRestTimer(seconds, exerciseName) {
    if (restTimerInterval) clearInterval(restTimerInterval);

    restTimerSeconds = seconds;
    restTimerTotal = seconds;

    const container = document.getElementById("rest-timer-container");
    container.classList.remove("hidden");

    document.getElementById("rest-timer-exercise").textContent = exerciseName || "";
    document.getElementById("rest-timer-progress-bar").style.transition = "none";
    document.getElementById("rest-timer-progress-bar").style.width = "100%";

    setTimeout(() => {
        document.getElementById("rest-timer-progress-bar").style.transition = "width 1s linear";
    }, 50);

    updateRestTimerDisplay();
    updateProgressBar();

    restTimerInterval = setInterval(() => {
        restTimerSeconds--;
        updateRestTimerDisplay();
        updateProgressBar();

        if (restTimerSeconds <= 0) {
            stopRestTimer();
            onRestComplete();
        }
    }, 1000);
}

function updateProgressBar() {
    const pct = restTimerTotal > 0 ? (restTimerSeconds / restTimerTotal) * 100 : 0;
    document.getElementById("rest-timer-progress-bar").style.width = pct + "%";
}

function stopRestTimer() {
    if (restTimerInterval) {
        clearInterval(restTimerInterval);
        restTimerInterval = null;
    }
    document.getElementById("rest-timer-container").classList.add("hidden");
}

function updateRestTimerDisplay() {
    const mins = Math.floor(restTimerSeconds / 60);
    const secs = restTimerSeconds % 60;
    document.getElementById("rest-timer-display").textContent =
        `${mins}:${secs.toString().padStart(2, "0")}`;
}

function onRestComplete() {
    if (soundEnabled) {
        playBeep();
    }
    if (vibrationEnabled && navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
    showRestAlert();
}

function showRestAlert() {
    const alert = document.getElementById("rest-timer-alert");
    alert.classList.remove("hidden");

    const closeBtn = document.getElementById("rest-timer-alert-close");
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

    document.getElementById("rest-timer-alert-close").addEventListener("click", () => {
        alert.classList.add("hidden");
    });

    // Auto dismiss after 10 seconds
    setTimeout(() => {
        alert.classList.add("hidden");
    }, 10000);
}

function playBeep() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    // Create a silent buffer and play it first to unlock audio alongside media
    const silentBuffer = audioCtx.createBuffer(1, 1, 22050);
    const silentSource = audioCtx.createBufferSource();
    silentSource.buffer = silentBuffer;
    silentSource.connect(audioCtx.destination);
    silentSource.start();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

    oscillator.start(audioCtx.currentTime + 0.1);
    oscillator.stop(audioCtx.currentTime + 0.9);
}

function initExerciseInfoModal() {
    document.getElementById("exercise-info-close").addEventListener("click", closeExerciseInfo);
    document.getElementById("exercise-info-overlay").addEventListener("click", closeExerciseInfo);
}

function openExerciseInfo(exerciseName) {
    const results = searchLocalExercises(exerciseName);
    const exercise = results[0];

    if (!exercise) return;

    document.getElementById("exercise-info-name").textContent = exercise.name;
    document.getElementById("exercise-info-muscle").textContent = exercise.muscle;
    document.getElementById("exercise-info-difficulty").textContent = exercise.difficulty;
    document.getElementById("exercise-info-instructions").textContent = exercise.instructions;
    document.getElementById("exercise-info-youtube").href = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " exercise tutorial")}`;

    document.getElementById("exercise-info-modal").classList.remove("hidden");
}

function closeExerciseInfo() {
    document.getElementById("exercise-info-modal").classList.add("hidden");
}

function showWorkoutSummary() {
    // Count sets completed
    let totalSets = 0;
    let doneSets = 0;
    currentDay.exercises.forEach(ex => {
        if (ex.type === "compound") {
            totalSets += ex.warmupSets.length + ex.workingSets;
            doneSets += ex.warmupSets.filter(s => s.done).length;
            doneSets += ex.workingSetsDone ? ex.workingSetsDone.filter(Boolean).length : 0;
        } else {
            totalSets += (ex.warmupSets || 0) + (ex.workingSets ?? ex.sets ?? 0);
            doneSets += ex.warmupDone ? ex.warmupDone.filter(Boolean).length : 0;
            doneSets += ex.workingSetsDone ? ex.workingSetsDone.filter(Boolean).length : 0;
        }
    });

    // Count rest days taken this week
    const restDaysThisWeek = currentWeek.days.filter(d => d.type === "rest" && d.completed).length;

    // Build summary modal
    const overlay = document.createElement("div");
    overlay.id = "workout-summary-overlay";
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:200;";

    const modal = document.createElement("div");
    modal.id = "workout-summary-modal";
    modal.style.cssText = `
        position:fixed;
        left:50%; top:50%;
        transform:translate(-50%,-50%);
        background:var(--bg-secondary);
        border:1px solid var(--border-color);
        border-radius:20px;
        padding:32px 24px;
        z-index:201;
        width:min(340px, 90vw);
        text-align:center;
    `;

    modal.innerHTML = `
        <div style="font-size:48px; margin-bottom:12px;">🏋️</div>
        <h2 style="margin:0 0 4px; font-size:22px;">Session Complete!</h2>
        <p style="color:var(--text-secondary); font-size:13px; margin:0 0 24px;">
            ${currentDay.date}${currentDay.notes ? " — " + currentDay.notes : ""}
        </p>

        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:28px;">
            <div class="summary-stat-row">
                <span class="summary-stat-icon">🏅</span>
                <span class="summary-stat-label">Exercises</span>
                <span class="summary-stat-value">${currentDay.exercises.length}</span>
            </div>
            <div class="summary-stat-row">
                <span class="summary-stat-icon">✅</span>
                <span class="summary-stat-label">Sets completed</span>
                <span class="summary-stat-value">${doneSets} / ${totalSets}</span>
            </div>
            <div class="summary-stat-row">
                <span class="summary-stat-icon">😴</span>
                <span class="summary-stat-label">Rest days this week</span>
                <span class="summary-stat-value">${restDaysThisWeek}</span>
            </div>
        </div>

        <button id="workout-summary-done-btn" style="
            width:100%;
            padding:14px;
            background:var(--accent-gold);
            color:#000;
            border:none;
            border-radius:12px;
            font-size:15px;
            font-weight:700;
            cursor:pointer;
        ">Done 💪</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    document.getElementById("workout-summary-done-btn").addEventListener("click", () => {
        overlay.remove();
        modal.remove();
        document.getElementById("workout-screen").classList.add("hidden");
        document.getElementById("week-detail-screen").classList.remove("hidden");
        renderDays(currentWeek, currentProgram, currentPrograms);
    });
}