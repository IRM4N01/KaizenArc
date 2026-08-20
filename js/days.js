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
                <div class="day-name-display">
                    <h3>${day.date || "No date"} ${day.notes ? "— " + day.notes : ""}</h3>
                    <button class="edit-day-details-btn">✏️</button>
                </div>
                <div class="day-details-edit hidden">
                    <input type="date" class="day-date-edit-input" value="${day.date || ""}" />
                    <input type="text" class="day-notes-edit-input" placeholder="e.g. Push Day" value="${day.notes || ""}" />
                    <button class="save-day-details-btn">Save</button>
                    <button class="cancel-day-details-btn">Cancel</button>
                </div>
                <p>${isRest ? "" : day.exercises.length + " exercises"}</p>
                ${completedBadge}${restBadge}
            </div>
            <div class="day-card-btns">
                <button class="move-up-btn" ${dayIndex === 0 ? "disabled" : ""}>↑</button>
                <button class="move-down-btn" ${dayIndex === week.days.length - 1 ? "disabled" : ""}>↓</button>
                ${!isRest ? `<button class="start-day-btn">${day.completed ? "Redo" : "Start"}</button>` : `<button class="complete-rest-btn">${day.completed ? "✓ Done" : "Mark done"}</button>`}
                <button class="delete-day-btn">Delete</button>
            </div>
        `;

        if (!isRest) {
            card.addEventListener("click", (e) => {
                if (e.target.classList.contains("start-day-btn") ||
                    e.target.classList.contains("delete-day-btn") ||
                    e.target.classList.contains("move-up-btn") ||
                    e.target.classList.contains("move-down-btn") ||
                    e.target.classList.contains("edit-day-details-btn") ||
                    e.target.classList.contains("save-day-details-btn") ||
                    e.target.classList.contains("cancel-day-details-btn") ||
                    e.target.classList.contains("day-date-edit-input") ||
                    e.target.classList.contains("day-notes-edit-input")) return;
                openDay(day, program, programs);
            });

            card.querySelector(".start-day-btn").addEventListener("click", () => {
                import('./workout.js').then(({ startWorkout }) => {
                    startWorkout(day, week, program, programs);
                });
            });
        } else {
            card.querySelector(".complete-rest-btn").addEventListener("click", () => {
                day.completed = !day.completed;
                day.completedDate = day.completed ? new Date().toLocaleDateString("en-AU") : null;
                savePrograms(programs);
                renderDays(week, program, programs);
            });
        }

        card.querySelector(".move-up-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            if (dayIndex === 0) return;
            const temp = week.days[dayIndex];
            week.days[dayIndex] = week.days[dayIndex - 1];
            week.days[dayIndex - 1] = temp;
            savePrograms(programs);
            renderDays(week, program, programs);
        });

        card.querySelector(".move-down-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            if (dayIndex === week.days.length - 1) return;
            const temp = week.days[dayIndex];
            week.days[dayIndex] = week.days[dayIndex + 1];
            week.days[dayIndex + 1] = temp;
            savePrograms(programs);
            renderDays(week, program, programs);
        });

        card.querySelector(".delete-day-btn").addEventListener("click", () => {
            const confirm = window.confirm("Delete this day?");
            if (!confirm) return;
            week.days.splice(dayIndex, 1);
            savePrograms(programs);
            renderDays(week, program, programs);
        });

        card.querySelector(".edit-day-details-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            card.querySelector(".day-name-display").classList.add("hidden");
            card.querySelector(".day-details-edit").classList.remove("hidden");
        });

        card.querySelector(".cancel-day-details-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            card.querySelector(".day-details-edit").classList.add("hidden");
            card.querySelector(".day-name-display").classList.remove("hidden");
        });

        card.querySelector(".save-day-details-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            const newDate = card.querySelector(".day-date-edit-input").value;
            const newNotes = card.querySelector(".day-notes-edit-input").value.trim();
            if (!newDate) { alert("Please enter a date."); return; }
            day.date = newDate;
            day.notes = newNotes;
            savePrograms(programs);
            renderDays(week, program, programs);
        });

        list.appendChild(card);
    });

    // Check if all days are completed and show finish week button
    const finishBtn = document.getElementById("finish-week-btn");
    const allCompleted = week.days.length > 0 && week.days.every(d => d.completed);

    if (allCompleted) {
        finishBtn.classList.remove("hidden");
        if (week.completed) {
            finishBtn.textContent = "✓ Week Complete!";
            finishBtn.classList.add("week-completed");
            finishBtn.disabled = true;
        } else {
            finishBtn.textContent = "✓ Finish Week";
            finishBtn.classList.remove("week-completed");
            finishBtn.disabled = false;
            }
    } else {
            finishBtn.classList.add("hidden");
    }

    // Remove old listener
    const newFinishBtn = finishBtn.cloneNode(true);
    finishBtn.parentNode.replaceChild(newFinishBtn, finishBtn);

    document.getElementById("finish-week-btn").addEventListener("click", () => {
        week.completed = true;
        week.completedDate = new Date().toLocaleDateString("en-AU");
        savePrograms(programs);
        renderDays(week, program, programs);
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