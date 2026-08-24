// ======= PROGRAM TEMPLATES =======
import { getTemplates, saveTemplates, getPrograms, savePrograms } from './storage.js';

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

    if (templates.length === 0) {
        noMsg.classList.remove("hidden");
        return;
    }

    noMsg.classList.add("hidden");

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