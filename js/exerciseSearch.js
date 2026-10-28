// ======= EXERCISE SEARCH =======
import { searchLocalExercises } from './exerciseData.js';
import { getCustomExercises } from './storage.js';

export function searchExercises(query) {
    const builtIn = searchLocalExercises(query);
    const custom  = getCustomExercises();
    const q = query.toLowerCase().trim();
    const matchedCustom = custom.filter(ex =>
        ex.name.toLowerCase().includes(q) ||
        (ex.muscle || "").toLowerCase().includes(q)
    );
    // Tag custom ones so the dropdown can badge them
    matchedCustom.forEach(ex => ex._custom = true);
    return [...builtIn, ...matchedCustom];
}

export function renderExerciseDropdown(results, container, onSelect, onAddNew) {
    const existing = document.getElementById("exercise-dropdown");
    if (existing) existing.remove();

    const dropdown = document.createElement("div");
    dropdown.id = "exercise-dropdown";
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 200;
        margin-top: 4px;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid var(--border-color);
        background: var(--bg-card);
    `;

    results.slice(0, 6).forEach(ex => {
        const item = document.createElement("div");
        item.classList.add("exercise-dropdown-item");
        item.innerHTML = `
            <span class="ex-drop-name">${ex.name}${ex._custom ? ' <span class="ex-custom-badge">★</span>' : ''}</span>
            <span class="ex-drop-meta">${ex.muscle} · ${ex.difficulty}</span>
        `;
        item.addEventListener("click", () => {
            onSelect(ex);
            dropdown.remove();
        });
        dropdown.appendChild(item);
    });

    // Always show "+ Add to database" at the bottom
    const addItem = document.createElement("div");
    addItem.classList.add("exercise-dropdown-item", "exercise-dropdown-add");
    addItem.innerHTML = `<span>+ Add to database</span>`;
    addItem.addEventListener("click", () => {
        dropdown.remove();
        if (onAddNew) onAddNew();
    });
    dropdown.appendChild(addItem);

    container.appendChild(dropdown);
}

export function renderExerciseInfo(exercise, container) {
    const existing = document.getElementById("exercise-info-panel");
    if (existing) existing.remove();

    if (!exercise) return;

    // Use stored YouTube link if it exists (custom exercises), otherwise search URL
    const youtubeUrl = exercise.youtubeUrl
        ? exercise.youtubeUrl
        : `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " exercise tutorial")}`;

    const panel = document.createElement("div");
    panel.id = "exercise-info-panel";
    panel.innerHTML = `
        <div class="ex-info-header">
            <span class="ex-info-muscle">${exercise.muscle || ""}</span>
            <span class="ex-info-difficulty">${exercise.difficulty || ""}</span>
        </div>
        ${exercise.instructions ? `<p class="ex-info-instructions">${exercise.instructions}</p>` : ""}
        <a href="${youtubeUrl}" target="_blank" class="ex-info-watch">▶ Watch on YouTube</a>
    `;

    container.appendChild(panel);
}