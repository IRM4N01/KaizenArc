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
            <div style="flex:1; min-width:0;">
                <div class="week-name-row" style="display:flex; align-items:center; gap:8px;">
                    <h3 class="week-name-display" style="margin:0;">${week.name}${week.completed ? ' <span style="font-size:12px; color:var(--accent-gold);">✓ Complete</span>' : ''}</h3>
                    <button class="week-name-edit-btn" aria-label="Rename week" style="background:none; border:none; padding:0; cursor:pointer; color:var(--text-secondary); opacity:0.6; line-height:1; flex-shrink:0;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <input
                        class="week-name-input"
                        type="text"
                        value="${week.name}"
                        style="display:none; font-size:1rem; font-weight:600; font-family:inherit; border:none; border-bottom:2px solid var(--accent-blue, #4a9eff); background:transparent; color:var(--text-primary); outline:none; width:100%; padding:2px 0;"
                    />
                </div>
                <p style="margin:4px 0 0;">${totalWorkoutDays} workouts · ${totalRestDays} rest · ${completedDays} completed</p>
            </div>
            <span>→</span>
        `;

        // ── Inline rename logic ──────────────────────────────────────────
        const nameDisplay = card.querySelector(".week-name-display");
        const editBtn     = card.querySelector(".week-name-edit-btn");
        const nameInput   = card.querySelector(".week-name-input");
        const arrow       = card.querySelector("span");

        function startEdit(e) {
            e.stopPropagation(); // don't open the week
            nameDisplay.style.display = "none";
            editBtn.style.display     = "none";
            arrow.style.visibility    = "hidden";
            nameInput.style.display   = "block";
            nameInput.focus();
            nameInput.select();
        }

        function commitEdit() {
            const newName = nameInput.value.trim();
            if (newName && newName !== week.name) {
                // Update the week object in the programs array and persist
                const progs = getPrograms();
                const prog  = progs.find(p => p.id === freshProgram.id);
                if (prog) {
                    const w = prog.weeks.find(wk => wk.id === week.id);
                    if (w) {
                        w.name = newName;
                        week.name = newName; // keep local ref in sync
                    }
                    savePrograms(progs);
                }
                // Update the display without full re-render
                nameDisplay.innerHTML = `${newName}${week.completed ? ' <span style="font-size:12px; color:var(--accent-gold);">✓ Complete</span>' : ''}`;
            }
            nameDisplay.style.display = "";
            editBtn.style.display     = "";
            arrow.style.visibility    = "";
            nameInput.style.display   = "none";
        }

        editBtn.addEventListener("click", startEdit);

        nameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter")  { e.preventDefault(); nameInput.blur(); }
            if (e.key === "Escape") { nameInput.value = week.name; nameInput.blur(); }
        });

        nameInput.addEventListener("blur", commitEdit);

        // ── Open week on card tap (but not when renaming) ────────────────
        card.addEventListener("click", (e) => {
            if (nameInput.style.display !== "none") return; // editing in progress
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