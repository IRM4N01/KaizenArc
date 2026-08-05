// ======= EXERCISES =======
import { savePrograms } from './storage.js';
import { getCurrentLiftMax, populateCompoundSelect } from './lifts.js';
import { searchExercises, renderExerciseDropdown, renderExerciseInfo } from './exerciseSearch.js';

let currentDay = null;
let currentPrograms = null;
let isCompound = true;
let editingExerciseIndex = null;

export function initExercises(day, programs) {
    currentDay = day;
    currentPrograms = programs;

    // Remove old listeners by replacing buttons
    const buttons = ["add-exercise-btn", "cancel-exercise-btn", "save-exercise-btn", "compound-btn", "accessory-btn", "warmup-sets-input", "working-pct-input", "compound-select"];
    buttons.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
        }
    });

    document.getElementById("add-exercise-btn").addEventListener("click", () => {
        populateCompoundSelect();
        document.getElementById("add-exercise-form").classList.remove("hidden");
        document.getElementById("add-exercise-btn").classList.add("hidden");
        initExerciseSearch();
    });

    document.getElementById("cancel-exercise-btn").addEventListener("click", () => {
        resetExerciseForm();
    });

    document.getElementById("compound-btn").addEventListener("click", () => {
        isCompound = true;
        document.getElementById("compound-btn").classList.add("active");
        document.getElementById("accessory-btn").classList.remove("active");
        document.getElementById("compound-fields").classList.remove("hidden");
        document.getElementById("accessory-fields").classList.add("hidden");
        document.getElementById("working-pct-field").classList.remove("hidden");
        document.getElementById("accessory-weight-field").classList.add("hidden");
        updateWarmupFields();
    });

    document.getElementById("accessory-btn").addEventListener("click", () => {
        isCompound = false;
        document.getElementById("accessory-btn").classList.add("active");
        document.getElementById("compound-btn").classList.remove("active");
        document.getElementById("compound-fields").classList.add("hidden");
        document.getElementById("accessory-fields").classList.remove("hidden");
        document.getElementById("working-pct-field").classList.add("hidden");
        document.getElementById("accessory-weight-field").classList.remove("hidden");
        document.getElementById("warmup-pct-fields").innerHTML = "";
    });

    document.getElementById("warmup-sets-input").addEventListener("input", updateWarmupFields);
    document.getElementById("working-pct-input").addEventListener("input", updateWorkingWeight);
    document.getElementById("compound-select").addEventListener("change", () => {
        updateWarmupFields();
        updateWorkingWeight();
    });

    document.getElementById("save-exercise-btn").addEventListener("click", () => {
        const workingSets = parseInt(document.getElementById("working-sets-input").value);
        const reps = parseInt(document.getElementById("reps-input").value);

        if (!workingSets || !reps) {
            alert("Please fill in sets and reps.");
            return;
        }

        let exercise = {};

        if (isCompound) {
            const liftKey = document.getElementById("compound-select").value;
            const liftName = document.getElementById("compound-select").options[document.getElementById("compound-select").selectedIndex].text.split(" (")[0];
            const max = getCurrentLiftMax();
            const workingPct = parseFloat(document.getElementById("working-pct-input").value);

            if (!workingPct) {
                alert("Please enter a working percentage.");
                return;
            }

            const warmupSets = [];
            document.querySelectorAll(".warmup-pct-input").forEach(input => {
                const pct = parseFloat(input.value) || 0;
                const weight = Math.round(max * pct / 100 * 4) / 4;
                warmupSets.push({ pct, weight });
            });

            const notes = document.getElementById("exercise-notes-input").value.trim();

            exercise = {
                type: "compound",
                liftKey,
                name: liftName,
                warmupSets,
                workingSets,
                reps,
                workingPct,
                workingWeight: Math.round(max * workingPct / 100 * 4) / 4,
                notes: notes || null
            };

        } else {
            const name = document.getElementById("accessory-name-input").value.trim();
            const weight = parseFloat(document.getElementById("accessory-weight-input").value);

            if (!name) {
                alert("Please enter an exercise name.");
                return;
            }

            const warmupSetsCount = parseInt(document.getElementById("warmup-sets-input").value) || 0;

            const notes = document.getElementById("exercise-notes-input").value.trim();

            exercise = {
                type: "accessory",
                name,
                warmupSets: warmupSetsCount,
                workingSets,
                reps,
                weight: weight || 0,
                notes: notes || null
            };
        }

        if (editingExerciseIndex !== null) {
            currentDay.exercises[editingExerciseIndex] = exercise;
            editingExerciseIndex = null;
        } else {
            currentDay.exercises.push(exercise);
        }

        savePrograms(currentPrograms);
        resetExerciseForm();
        renderExercises(currentDay);
    });
}

export function renderExercises(day) {
    const list = document.getElementById("exercises-list");
    list.innerHTML = "";

    if (day.exercises.length === 0) {
        list.innerHTML = "<p style='color:var(--text-secondary);'>No exercises yet. Add your first one.</p>";
        return;
    }

    day.exercises.forEach((ex, exIndex) => {
        const card = document.createElement("div");
        card.classList.add("exercise-card");

        if (ex.type === "compound") {
            const warmupLines = ex.warmupSets.map((s, i) =>
                `<p>Warm up set ${i + 1}: ${s.pct}% → ${s.weight}kg</p>`
            ).join("");
            card.innerHTML = `
                <div class="exercise-card-header">
                    <h3>${ex.name}</h3>
                    <div class="exercise-card-btns">
                        <button class="edit-exercise-btn">Edit</button>
                        <button class="delete-exercise-btn">Delete</button>
                    </div>
                </div>
                ${warmupLines}
                <p>Working: ${ex.workingSets} sets × ${ex.reps} reps @ ${ex.workingPct}% → ${ex.workingWeight}kg</p>
                ${ex.notes ? `<p class="exercise-notes">📝 ${ex.notes}</p>` : ""}
            `;
        } else {
            card.innerHTML = `
                <div class="exercise-card-header">
                    <h3>${ex.name}</h3>
                    <div class="exercise-card-btns">
                        <button class="edit-exercise-btn">Edit</button>
                        <button class="delete-exercise-btn">Delete</button>
                    </div>
                </div>
                <p>Warm up sets: ${ex.warmupSets || 0}</p>
                <p>Working: ${ex.workingSets} sets × ${ex.reps} reps @ ${ex.weight}kg</p>
                ${ex.notes ? `<p class="exercise-notes">📝 ${ex.notes}</p>` : ""}
            `;
        }

        card.querySelector(".delete-exercise-btn").addEventListener("click", () => {
            const confirm = window.confirm("Are you sure you want to delete this exercise?");
            if (!confirm) return;
            currentDay.exercises.splice(exIndex, 1);
            savePrograms(currentPrograms);
            renderExercises(currentDay);
        });

        card.querySelector(".edit-exercise-btn").addEventListener("click", () => {
            editExercise(exIndex);
        });

        list.appendChild(card);
    });
}

function editExercise(exIndex) {
    populateCompoundSelect();
    const ex = currentDay.exercises[exIndex];
    editingExerciseIndex = exIndex;

    document.getElementById("add-exercise-form").classList.remove("hidden");
    document.getElementById("add-exercise-btn").classList.add("hidden");

    if (ex.type === "compound") {
        isCompound = true;
        document.getElementById("compound-btn").classList.add("active");
        document.getElementById("accessory-btn").classList.remove("active");
        document.getElementById("compound-fields").classList.remove("hidden");
        document.getElementById("accessory-fields").classList.add("hidden");
        document.getElementById("working-pct-field").classList.remove("hidden");
        document.getElementById("accessory-weight-field").classList.add("hidden");

        document.getElementById("compound-select").value = ex.liftKey;
        document.getElementById("warmup-sets-input").value = ex.warmupSets.length;
        document.getElementById("working-sets-input").value = ex.workingSets;
        document.getElementById("reps-input").value = ex.reps;
        document.getElementById("working-pct-input").value = ex.workingPct;
        document.getElementById("working-weight-display").textContent = ex.workingWeight + "kg";

        document.getElementById("exercise-notes-input").value = ex.notes || "";

        updateWarmupFields();

        const warmupInputs = document.querySelectorAll(".warmup-pct-input");
        ex.warmupSets.forEach((s, i) => {
            if (warmupInputs[i]) {
                warmupInputs[i].value = s.pct;
                warmupInputs[i].nextElementSibling.textContent = s.weight + "kg";
            }
        });

    } else {
        isCompound = false;
        document.getElementById("accessory-btn").classList.add("active");
        document.getElementById("compound-btn").classList.remove("active");
        document.getElementById("compound-fields").classList.add("hidden");
        document.getElementById("accessory-fields").classList.remove("hidden");
        document.getElementById("working-pct-field").classList.add("hidden");
        document.getElementById("accessory-weight-field").classList.remove("hidden");

        document.getElementById("accessory-name-input").value = ex.name;
        document.getElementById("warmup-sets-input").value = ex.warmupSets || 0;
        document.getElementById("working-sets-input").value = ex.workingSets;
        document.getElementById("reps-input").value = ex.reps;
        document.getElementById("accessory-weight-input").value = ex.weight;

        document.getElementById("exercise-notes-input").value = ex.notes || "";
    }
}

function getDefaultWarmupPcts(numSets) {
    const defaults = {
        1: [50],
        2: [50, 65],
        3: [40, 55, 70],
        4: [40, 50, 60, 70],
        5: [35, 45, 55, 65, 75],
        6: [30, 40, 50, 60, 70, 75]
    };
    return defaults[numSets] || [];
}

function updateWarmupFields() {
    if (!isCompound) return;

    const numSets = parseInt(document.getElementById("warmup-sets-input").value) || 0;
    const container = document.getElementById("warmup-pct-fields");
    const max = getCurrentLiftMax();
    const defaults = getDefaultWarmupPcts(numSets);

    container.innerHTML = "";

    for (let i = 0; i < numSets; i++) {
        const pct = defaults[i] || 50;
        const weight = Math.round(max * pct / 100 * 4) / 4;

        const row = document.createElement("div");
        row.classList.add("warmup-pct-row");
        row.innerHTML = `
            <label>Set ${i + 1}</label>
            <input type="number" class="warmup-pct-input" value="${pct}" min="1" max="100" />
            <span class="warmup-weight-display">${weight}kg</span>
        `;
        container.appendChild(row);
    }

    container.querySelectorAll(".warmup-pct-input").forEach(input => {
        input.addEventListener("input", () => {
            const pct = parseFloat(input.value) || 0;
            const weight = Math.round(max * pct / 100 * 4) / 4;
            input.nextElementSibling.textContent = weight + "kg";
        });
    });
}

function updateWorkingWeight() {
    if (!isCompound) return;
    const pct = parseFloat(document.getElementById("working-pct-input").value) || 0;
    const max = getCurrentLiftMax();
    const weight = Math.round(max * pct / 100 * 4) / 4;
    document.getElementById("working-weight-display").textContent = pct > 0 ? weight + "kg" : "";
}

function resetExerciseForm() {
    editingExerciseIndex = null;
    document.getElementById("add-exercise-form").classList.add("hidden");
    document.getElementById("add-exercise-btn").classList.remove("hidden");
    document.getElementById("warmup-sets-input").value = "";
    document.getElementById("working-sets-input").value = "";
    document.getElementById("reps-input").value = "";
    document.getElementById("working-pct-input").value = "";
    document.getElementById("working-weight-display").textContent = "";
    document.getElementById("warmup-pct-fields").innerHTML = "";
    document.getElementById("accessory-name-input").value = "";
    document.getElementById("accessory-weight-input").value = "";
    document.getElementById("exercise-notes-input").value = "";
    isCompound = true;
    document.getElementById("compound-btn").classList.add("active");
    document.getElementById("accessory-btn").classList.remove("active");
    document.getElementById("compound-fields").classList.remove("hidden");
    document.getElementById("accessory-fields").classList.add("hidden");
    document.getElementById("working-pct-field").classList.remove("hidden");
    document.getElementById("accessory-weight-field").classList.add("hidden");
}

function initExerciseSearch() {
    const nameInput = document.getElementById("accessory-name-input");
    const formContainer = document.getElementById("add-exercise-form");

    nameInput.addEventListener("input", () => {
        const query = nameInput.value.trim();

        const existing = document.getElementById("exercise-dropdown");
        if (existing) existing.remove();

        if (query.length < 2) return;

        const results = searchExercises(query);
        renderExerciseDropdown(results, formContainer, (selectedEx) => {
            nameInput.value = selectedEx.name;
            renderExerciseInfo(selectedEx, formContainer);
        });
    });
}