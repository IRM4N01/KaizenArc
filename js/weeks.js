// ======= WEEKS =======
import { savePrograms } from './storage.js';
import { openProgram, renderPrograms } from './programs.js';
import { getPrograms } from './storage.js';

export function renderWeeks(program, programs) {
    const list = document.getElementById("weeks-list");
    list.innerHTML = "";

    // Always get fresh program data
    const freshPrograms = getPrograms();
    const freshProgram = freshPrograms.find(p => p.id === program.id) || program;

    freshProgram.weeks.forEach((week) => {
        const completedDays = week.days.filter(d => d.completed && d.type === "workout").length;
        const totalWorkoutDays = week.days.filter(d => d.type === "workout").length;
        const totalRestDays = week.days.filter(d => d.type === "rest").length;

        const card = document.createElement("div");
        card.classList.add("program-card");
        card.innerHTML = `
            <div>
                <h3>${week.name} ${week.completed ? '<span style="font-size:12px; color:var(--accent-gold);">✓ Complete</span>' : ''}</h3>
                <p>${totalWorkoutDays} workouts · ${totalRestDays} rest · ${completedDays} completed</p>
            </div>
            <span>→</span>
        `;

        card.addEventListener("click", () => {
            openWeek(week, freshProgram, freshPrograms);
        });

        list.appendChild(card);
    });
}

export function openWeek(week, program, programs) {
    document.getElementById("program-detail-screen").classList.add("hidden");
    document.getElementById("week-detail-screen").classList.remove("hidden");
    document.getElementById("week-detail-name").textContent = week.name;

    const existingCover = document.getElementById("week-cover-image");
    if (existingCover) existingCover.remove();

    if (program.coverImage) {
        const coverEl = document.createElement("div");
        coverEl.id = "week-cover-image";
        coverEl.innerHTML = `<img src="${program.coverImage}" alt="${program.name}" class="program-cover" style="margin-bottom:16px; object-position: center ${program.coverPosition || '50%'}" />`;
        const weekName = document.getElementById("week-detail-name");
        weekName.insertAdjacentElement("afterend", coverEl);
    }

    document.getElementById("back-to-program-from-week-btn").addEventListener("click", () => {
        document.getElementById("week-detail-screen").classList.add("hidden");
        document.getElementById("program-detail-screen").classList.remove("hidden");
    });

    import('./days.js').then(({ initDays, renderDays }) => {
        initDays(week, program, programs);
        renderDays(week, program, programs);
    });
}