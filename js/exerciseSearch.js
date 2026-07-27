// ======= EXERCISE SEARCH =======
import { searchLocalExercises } from './exerciseData.js';

export function searchExercises(query) {
    return searchLocalExercises(query);
}

export function renderExerciseDropdown(results, container, onSelect) {
    const existing = document.getElementById("exercise-dropdown");
    if (existing) existing.remove();

    if (results.length === 0) return;

    const dropdown = document.createElement("div");
    dropdown.id = "exercise-dropdown";

    results.slice(0, 6).forEach(ex => {
        const item = document.createElement("div");
        item.classList.add("exercise-dropdown-item");
        item.innerHTML = `
            <span class="ex-drop-name">${ex.name}</span>
            <span class="ex-drop-meta">${ex.muscle} · ${ex.difficulty}</span>
        `;
        item.addEventListener("click", () => {
            onSelect(ex);
            dropdown.remove();
        });
        dropdown.appendChild(item);
    });

    container.appendChild(dropdown);
}

export function renderExerciseInfo(exercise, container) {
    const existing = document.getElementById("exercise-info-panel");
    if (existing) existing.remove();

    if (!exercise) return;

    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " exercise tutorial")}`;

    const panel = document.createElement("div");
    panel.id = "exercise-info-panel";
    panel.innerHTML = `
        <div class="ex-info-header">
            <span class="ex-info-muscle">${exercise.muscle}</span>
            <span class="ex-info-difficulty">${exercise.difficulty}</span>
        </div>
        <p class="ex-info-instructions">${exercise.instructions}</p>
        <a href="${youtubeUrl}" target="_blank" class="ex-info-watch">▶ Watch on YouTube</a>
    `;

    container.appendChild(panel);
}