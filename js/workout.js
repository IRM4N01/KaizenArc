// ======= WORKOUT TRACKER =======
import { savePrograms } from './storage.js';
import { renderDays } from './days.js';
import { refreshPrograms } from './programs.js';

let currentDay = null;
let currentWeek = null;
let currentProgram = null;
let currentPrograms = null;

export function startWorkout(day, week, program, programs) {
    currentDay = day;
    currentWeek = week;
    currentProgram = program;
    currentPrograms = programs;

    document.getElementById("week-detail-screen").classList.add("hidden");
    document.getElementById("workout-screen").classList.remove("hidden");
    document.getElementById("workout-day-name").textContent = day.date + (day.notes ? " — " + day.notes : "");

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
        const total = document.getElementById("workout-progress").textContent;

        currentDay.completed = true;
        currentDay.completedDate = new Date().toLocaleDateString("en-AU");

        savePrograms(currentPrograms);

        // Refresh programs from localStorage
        const freshPrograms = refreshPrograms();

        alert(`Workout done! ${total}`);
        document.getElementById("workout-screen").classList.add("hidden");
        document.getElementById("week-detail-screen").classList.remove("hidden");

        renderDays(currentWeek, currentProgram, currentPrograms);
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

            for (let i = 0; i < ex.workingSets; i++) {
                const done = ex.workingSetsDone ? ex.workingSetsDone[i] : false;
                setsHTML += `
                    <div class="set-row ${done ? "completed" : ""}">
                        <span>Set ${i + 1} — ${ex.reps} reps @ ${ex.weight}kg</span>
                        <button class="tick-btn ${done ? "done" : ""}" onclick="toggleSet(this, ${exIndex}, 'accessory-working', ${i})">
                            ${done ? "✓" : ""}
                        </button>
                    </div>
                `;
            }
        }

        card.innerHTML = `<h3>${ex.name}</h3>${setsHTML}`;
        list.appendChild(card);
    });

    updateWorkoutProgress(day);
}

window.toggleSet = function(btn, exIndex, type, setIndex) {
    const ex = currentDay.exercises[exIndex];

    if (type === "warmup") {
        ex.warmupSets[setIndex].done = !ex.warmupSets[setIndex].done;
    } else if (type === "working") {
        if (!ex.workingSetsDone) ex.workingSetsDone = Array(ex.workingSets).fill(false);
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
            total += (ex.warmupSets || 0) + ex.workingSets;
            done += ex.warmupDone ? ex.warmupDone.filter(Boolean).length : 0;
            done += ex.workingSetsDone ? ex.workingSetsDone.filter(Boolean).length : 0;
        }
    });

    document.getElementById("workout-progress").textContent = `${done} of ${total} sets completed`;
}