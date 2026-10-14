// ======= PROGRAM TEMPLATES =======
import { getTemplates, saveTemplates, getPrograms, savePrograms } from './storage.js';
import { STARTER_PROGRAMS } from './starterPrograms.js';

export function saveAsTemplate(program) {
    const templates = getTemplates();

    // Check if template with same name already exists
    const existing = templates.findIndex(t => t.name === program.name);

    const template = {
        id: Date.now(),
        name: program.name,
        weeks: JSON.parse(JSON.stringify(program.weeks)), // deep copy
        savedDate: new Date().toLocaleDateString("en-AU")
    };

    if (existing !== -1) {
        const confirm = window.confirm(`A template called "${program.name}" already exists. Overwrite it?`);
        if (!confirm) return;
        templates[existing] = template;
    } else {
        templates.push(template);
    }

    saveTemplates(templates);
    alert(`"${program.name}" saved as a template!`);
}

export function initTemplates(programs, onProgramCreated) {
    renderTemplatesList(programs, onProgramCreated);
}

export function renderTemplatesList(programs, onProgramCreated) {
    const templates = getTemplates();
    const container = document.getElementById("templates-list");
    const noMsg = document.getElementById("no-templates-msg");

    if (!container) return;

    container.innerHTML = "";

    const hasContent = STARTER_PROGRAMS.length > 0 || templates.length > 0;

    if (!hasContent) {
        noMsg.classList.remove("hidden");
        return;
    }

    noMsg.classList.add("hidden");

    // ── STARTER PROGRAMS ────────────────────────────────────────
    if (STARTER_PROGRAMS.length > 0) {
        const starterHeading = document.createElement("p");
        starterHeading.style.cssText = "font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-secondary); margin:0 0 10px 4px;";
        starterHeading.textContent = "Starter Programs";
        container.appendChild(starterHeading);

        STARTER_PROGRAMS.forEach(starter => {
            const card = document.createElement("div");
            card.classList.add("program-card");
            card.style.cursor = "pointer";
            card.innerHTML = `
                <div class="program-card-content" style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; width:100%;">
                    <div>
                        <h3>${starter.name}</h3>
                        <p>${starter.totalWeeks} weeks · ${starter.daysPerWeek} days/week · ${starter.description}</p>
                    </div>
                    <div style="display:flex; gap:8px; align-items:center;">
                        <button class="use-starter-btn" style="padding:6px 14px; background:var(--accent-gold); color:var(--text-on-gold); border:none; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer;">Use</button>
                    </div>
                </div>
            `;

            card.addEventListener("click", (e) => {
                if (!e.target.classList.contains("use-starter-btn")) {
                    openStarterPreview(starter, programs, onProgramCreated);
                }
            });

            card.querySelector(".use-starter-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                useStarterProgram(starter, programs, onProgramCreated);
            });

            container.appendChild(card);
        });

        // Divider before user templates (only if user has templates too)
        if (templates.length > 0) {
            const divider = document.createElement("div");
            divider.style.cssText = "height:1px; background:var(--border-color); margin:16px 0 14px;";
            container.appendChild(divider);

            const savedHeading = document.createElement("p");
            savedHeading.style.cssText = "font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-secondary); margin:0 0 10px 4px;";
            savedHeading.textContent = "My Templates";
            container.appendChild(savedHeading);
        }
    }

    // ── USER-SAVED TEMPLATES ─────────────────────────────────────
    templates.forEach((template, index) => {
        const card = document.createElement("div");
        card.classList.add("program-card");
        card.innerHTML = `
            <div class="program-card-content" style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; width:100%;">
                <div>
                    <h3>${template.name}</h3>
                    <p>${template.weeks.length} weeks · Saved ${template.savedDate}</p>
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                    <button class="use-template-btn" style="padding:6px 14px; background:var(--accent-gold); color:var(--text-on-gold); border:none; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer;">Use</button>
                    <button class="delete-template-btn" style="padding:6px 12px; background:none; border:1px solid rgba(192,57,43,0.4); border-radius:8px; font-size:13px; color:var(--accent-red); cursor:pointer;">✕</button>
                </div>
            </div>
        `;

        card.querySelector(".use-template-btn").addEventListener("click", () => {
            useTemplate(template, programs, onProgramCreated);
        });

        card.querySelector(".delete-template-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            const confirm = window.confirm(`Delete template "${template.name}"?`);
            if (!confirm) return;
            const templates = getTemplates();
            templates.splice(index, 1);
            saveTemplates(templates);
            renderTemplatesList(programs, onProgramCreated);
        });

        container.appendChild(card);
    });
}

function useStarterProgram(starter, programs, onProgramCreated) {
    const name = window.prompt("Program name:", starter.name);
    if (!name) return;

    const startDate = window.prompt("Start date (YYYY-MM-DD):", new Date().toISOString().split("T")[0]);
    if (!startDate) return;

    const startWeight = window.prompt("Starting bodyweight (kg):", "");

    // Deep copy weeks and reset any completion data
    const weeks = JSON.parse(JSON.stringify(starter.weeks)).map(week => ({
        ...week,
        id: Date.now() + Math.random(),
        completed: false,
        completedDate: null,
        days: week.days.map(day => ({
            ...day,
            id: Date.now() + Math.random(),
            completed: false,
            completedDate: null,
            workingSetsDone: null,
            warmupDone: null,
            exercises: day.exercises.map(ex => ({
                ...ex,
                workingSetsDone: null,
                warmupDone: null,
            }))
        }))
    }));

    const newProgram = {
        id: Date.now(),
        name,
        startDate,
        startWeight: startWeight ? parseFloat(startWeight) : null,
        endWeight: null,
        coverImage: null,
        coverPosition: null,
        weeks
    };

    programs.push(newProgram);
    savePrograms(programs);
    onProgramCreated();
    alert(`"${name}" created!`);
}

function useTemplate(template, programs, onProgramCreated) {
    const name = window.prompt("Program name:", template.name + " (copy)");
    if (!name) return;

    const startDate = window.prompt("Start date (DD/MM/YY or YYYY-MM-DD):", new Date().toISOString().split("T")[0]);
    if (!startDate) return;

    const startWeight = window.prompt("Starting bodyweight (kg):", "");

    // Deep copy weeks and reset completion data
    const weeks = JSON.parse(JSON.stringify(template.weeks)).map(week => ({
        ...week,
        id: Date.now() + Math.random(),
        completed: false,
        completedDate: null,
        days: week.days.map(day => ({
            ...day,
            id: Date.now() + Math.random(),
            completed: false,
            completedDate: null,
            workingSetsDone: null,
            warmupDone: null,
            exercises: day.exercises.map(ex => ({
                ...ex,
                workingSetsDone: null,
                warmupDone: null,
                ...(ex.warmupSets && Array.isArray(ex.warmupSets) ? {
                    warmupSets: ex.warmupSets.map(s => ({ ...s, done: false }))
                } : {})
            }))
        }))
    }));

    const newProgram = {
        id: Date.now(),
        name,
        startDate,
        startWeight: startWeight ? parseFloat(startWeight) : null,
        endWeight: null,
        coverImage: null,
        coverPosition: null,
        weeks
    };

    programs.push(newProgram);
    savePrograms(programs);
    onProgramCreated();
    alert(`"${name}" created from template!`);
}

function openStarterPreview(starter, programs, onProgramCreated) {
    // Remove any existing preview modal
    const existing = document.getElementById("starter-preview-modal");
    if (existing) existing.remove();

    // Build week/day content from week 1 (all weeks are identical)
    const week1 = starter.weeks[0];
    const daysHTML = week1.days.map(day => {
        const exercisesHTML = day.exercises.map(ex =>
            `<li style="padding:4px 0; border-bottom:1px solid var(--border-color); color:var(--text-primary);">
                <span style="font-weight:500;">${ex.name}</span>
                <span style="color:var(--text-secondary); font-size:12px; margin-left:8px;">${ex.sets} sets × ${ex.reps} reps${ex.rest ? " · " + ex.rest + " rest" : ""}</span>
            </li>`
        ).join("");

        return `
            <div style="margin-bottom:20px;">
                <p style="font-size:12px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; color:var(--accent-gold); margin:0 0 8px;">${day.date}</p>
                <ul style="list-style:none; margin:0; padding:0;">
                    ${exercisesHTML}
                </ul>
            </div>
        `;
    }).join("");

    const modal = document.createElement("div");
    modal.id = "starter-preview-modal";
    modal.style.cssText = `
        position:fixed; inset:0; z-index:1000;
        background:rgba(0,0,0,0.7);
        display:flex; align-items:flex-end; justify-content:center;
    `;

    modal.innerHTML = `
        <div style="
            background:var(--bg-secondary);
            width:100%; max-width:600px;
            max-height:85vh;
            border-radius:20px 20px 0 0;
            display:flex; flex-direction:column;
            overflow:hidden;
        ">
            <div style="padding:20px 20px 12px; display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid var(--border-color); flex-shrink:0;">
                <div>
                    <h2 style="margin:0 0 4px; font-size:18px;">${starter.name}</h2>
                    <p style="margin:0; color:var(--text-secondary); font-size:13px;">${starter.totalWeeks} weeks · ${starter.daysPerWeek} days/week · ${starter.description}</p>
                </div>
                <button id="starter-preview-close" style="background:none; border:none; color:var(--text-secondary); font-size:22px; cursor:pointer; line-height:1; padding:0 0 0 12px;">✕</button>
            </div>
            <div style="padding:20px; overflow-y:auto; flex:1;">
                <p style="font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--text-secondary); margin:0 0 16px;">Program Structure (all 4 weeks identical)</p>
                ${daysHTML}
            </div>
            <div style="padding:16px 20px; border-top:1px solid var(--border-color); flex-shrink:0;">
                <button id="starter-preview-use" style="width:100%; padding:14px; background:var(--accent-gold); color:var(--text-on-gold); border:none; border-radius:12px; font-size:15px; font-weight:600; cursor:pointer;">Use This Program</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("starter-preview-close").addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });
    document.getElementById("starter-preview-use").addEventListener("click", () => {
        modal.remove();
        useStarterProgram(starter, programs, onProgramCreated);
    });
}