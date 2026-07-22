// ======= DAYS =======
import { savePrograms } from './storage.js';

let currentWeek = null;
let currentProgram = null;
let currentPrograms = null;
let isDayWorkout = true;

export function initDays(week, program, programs) {
    currentWeek = week;
    currentProgram = program;
    currentPrograms = programs;

    // Remove old listeners by replacing buttons
    const addDayBtn = document.getElementById("add-day-btn");
    const newAddDayBtn = addDayBtn.cloneNode(true);
    addDayBtn.parentNode.replaceChild(newAddDayBtn, addDayBtn);

    const cancelDayBtn = document.getElementById("cancel-day-btn");
    const newCancelDayBtn = cancelDayBtn.cloneNode(true);
    cancelDayBtn.parentNode.replaceChild(newCancelDayBtn, cancelDayBtn);

    const saveDayBtn = document.getElementById("save-day-btn");
    const newSaveDayBtn = saveDayBtn.cloneNode(true);
    saveDayBtn.parentNode.replaceChild(newSaveDayBtn, saveDayBtn);

    const workoutTypeBtn = document.getElementById("workout-type-btn");
    const newWorkoutTypeBtn = workoutTypeBtn.cloneNode(true);
    workoutTypeBtn.parentNode.replaceChild(newWorkoutTypeBtn, workoutTypeBtn);

    const restTypeBtn = document.getElementById("rest-type-btn");
    const newRestTypeBtn = restTypeBtn.cloneNode(true);
    restTypeBtn.parentNode.replaceChild(newRestTypeBtn, restTypeBtn);

    document.getElementById("add-day-btn").addEventListener("click", () => {
        document.getElementById("new-day-form").classList.remove("hidden");
        document.getElementById("add-day-btn").classList.add("hidden");
    });

    document.getElementById("cancel-day-btn").addEventListener("click", () => {
        document.getElementById("new-day-form").classList.add("hidden");
        document.getElementById("add-day-btn").classList.remove("hidden");
        document.getElementById("day-date-input").value = "";
        document.getElementById("day-notes-input").value = "";
    });

    document.getElementById("workout-type-btn").addEventListener("click", () => {
        isDayWorkout = true;
        document.getElementById("workout-type-btn").classList.add("active");
        document.getElementById("rest-type-btn").classList.remove("active");
    });

    document.getElementById("rest-type-btn").addEventListener("click", () => {
        isDayWorkout = false;
        document.getElementById("rest-type-btn").classList.add("active");
        document.getElementById("workout-type-btn").classList.remove("active");
    });

    document.getElementById("save-day-btn").addEventListener("click", () => {
        const date = document.getElementById("day-date-input").value;
        const notes = document.getElementById("day-notes-input").value.trim();

        if (!date) { alert("Please enter a date."); return; }

        const newDay = {
            id: Date.now(),
            type: isDayWorkout ? "workout" : "rest",
            date,
            notes,
            exercises: [],
            completed: false,
            completedDate: null
        };

        currentWeek.days.push(newDay);
        savePrograms(currentPrograms);

        document.getElementById("new-day-form").classList.add("hidden");
        document.getElementById("add-day-btn").classList.remove("hidden");
        document.getElementById("day-date-input").value = "";
        document.getElementById("day-notes-input").value = "";
        isDayWorkout = true;
        document.getElementById("workout-type-btn").classList.add("active");
        document.getElementById("rest-type-btn").classList.remove("active");

        renderDays(currentWeek, currentProgram, currentPrograms);
    });
}

export function renderDays(week, program, programs) {
    const list = document.getElementById("days-list");
    list.innerHTML = "";

    if (week.days.length === 0) {
        list.innerHTML = "<p style='color:var(--text-secondary);'>No days yet. Add your first day.</p>";
        return;
    }

    week.days.forEach((day, dayIndex) => {
        const card = document.createElement("div");
        card.classList.add("day-card");

        const isRest = day.type === "rest";
        const completedBadge = day.completed ? `<span class="badge-done">✓ Done ${day.completedDate || ""}</span>` : "";
        const restBadge = isRest ? `<span class="badge-rest">Rest</span>` : "";

        card.innerHTML = `
            <div style="flex:1;">
                <h3>${day.date || "No date"} ${day.notes ? "— " + day.notes : ""}</h3>
                <p>${isRest ? "" : day.exercises.length + " exercises"}</p>
                ${completedBadge}${restBadge}
            </div>
            <div class="day-card-btns">
                ${!isRest ? `<button class="start-day-btn">${day.completed ? "Redo" : "Start"}</button>` : ""}
                <button class="delete-day-btn">Delete</button>
            </div>
        `;

        if (!isRest) {
            card.addEventListener("click", (e) => {
                if (e.target.classList.contains("start-day-btn") || e.target.classList.contains("delete-day-btn")) return;
                openDay(day, program, programs);
            });

            card.querySelector(".start-day-btn").addEventListener("click", () => {
                import('./workout.js').then(({ startWorkout }) => {
                    startWorkout(day, week, program, programs);
                });
            });
        }

        card.querySelector(".delete-day-btn").addEventListener("click", () => {
            const confirm = window.confirm("Delete this day?");
            if (!confirm) return;
            week.days.splice(dayIndex, 1);
            savePrograms(programs);
            renderDays(week, program, programs);
        });

        list.appendChild(card);
    });
}

export function openDay(day, program, programs) {
    document.getElementById("week-detail-screen").classList.add("hidden");
    document.getElementById("exercise-detail-screen").classList.remove("hidden");
    document.getElementById("exercise-detail-name").textContent = day.date + (day.notes ? " - " + day.notes : "");

    const existingCover = document.getElementById("day-cover-image");
    if (existingCover) existingCover.remove();

    if (program.coverImage) {
        const coverEl = document.createElement("div");
        coverEl.id = "day-cover-image";
        coverEl.innerHTML = `<img src="${program.coverImage}" alt="${program.name}" class="program-cover" style="margin-bottom:16px; object-position: center ${program.coverPosition || '50%'}" />`;
        const dayName = document.getElementById("exercise-detail-name");
        dayName.insertAdjacentElement("afterend", coverEl);
    }

    document.getElementById("back-to-week-btn").addEventListener("click", () => {
        document.getElementById("exercise-detail-screen").classList.add("hidden");
        document.getElementById("week-detail-screen").classList.remove("hidden");
        renderDays(currentWeek, program, programs);
    });

    import('./exercises.js').then(({ initExercises, renderExercises }) => {
        initExercises(day, programs);
        renderExercises(day);
    });
}