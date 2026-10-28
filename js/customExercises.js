// ======= CUSTOM EXERCISE DATABASE =======
import { getCustomExercises, saveCustomExercises } from './storage.js';

/**
 * Opens the Add-to-database modal.
 * @param {string} prefillName  - exercise name already typed (optional)
 * @param {function} onSaved    - called with the saved exercise object when the user saves
 */
export function openCustomExerciseModal(prefillName = "", onSaved = null) {
    const modal = document.getElementById("custom-exercise-modal");
    if (!modal) return;

    // Pre-fill name if provided
    document.getElementById("custom-ex-name").value = prefillName;
    document.getElementById("custom-ex-muscle").value = "";
    document.getElementById("custom-ex-difficulty").value = "beginner";
    document.getElementById("custom-ex-instructions").value = "";
    document.getElementById("custom-ex-youtube").value = "";

    modal.classList.remove("hidden");

    // Replace buttons to clear old listeners
    const saveBtn   = document.getElementById("custom-ex-save-btn");
    const cancelBtn = document.getElementById("custom-ex-cancel-btn");
    const newSave   = saveBtn.cloneNode(true);
    const newCancel = cancelBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSave, saveBtn);
    cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

    document.getElementById("custom-ex-cancel-btn").addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Close on overlay tap
    const overlay = document.getElementById("custom-exercise-overlay");
    const newOverlay = overlay.cloneNode(false);
    overlay.parentNode.replaceChild(newOverlay, overlay);
    document.getElementById("custom-exercise-overlay").addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    document.getElementById("custom-ex-save-btn").addEventListener("click", () => {
        const name = document.getElementById("custom-ex-name").value.trim();
        if (!name) {
            alert("Exercise name is required.");
            return;
        }

        const exercise = {
            id: Date.now(),
            name,
            muscle:       document.getElementById("custom-ex-muscle").value.trim() || "other",
            difficulty:   document.getElementById("custom-ex-difficulty").value,
            instructions: document.getElementById("custom-ex-instructions").value.trim(),
            youtubeUrl:   document.getElementById("custom-ex-youtube").value.trim(),
            _custom:      true
        };

        const all = getCustomExercises();
        all.push(exercise);
        saveCustomExercises(all);

        modal.classList.add("hidden");

        if (onSaved) onSaved(exercise);
    });
}