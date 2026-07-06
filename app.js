// ======= DATA =========
const defaultLlifts = [
    { key: "bench", name: "Bench Press", max: 100, percentages: [95, 92.5, 90, 87.5, 85, 82.5, 80, 77.5, 75, 72.5, 70, 67.5, 60, 55, 50, 45, 40] },
    { key: "squat", name: "Squat", max: 120, percentages: [95, 92.5, 90, 87.5, 85, 82.5, 80, 77.5, 75, 72.5, 70, 65, 60, 55, 50, 30] },
    { key: "deadlift", name: "Deadlift", max: 150, percentages: [95, 92.5, 90, 87.5, 85, 82.5, 80, 77.5, 75, 70, 67.5, 65, 60, 55, 50, 30] },
    { key: "ohp", name: "Overhead Press", max: 50, percentages: [82.5, 80, 75, 72.5, 70, 60, 55, 50] }
];

// Load saved 1RMs from localStorage or use defaults
const savedMaxes = JSON.parse(localStorage.getItem("liftMaxes")) || {};
const lifts = defaultLlifts.map(lift => ({
    ...lift,
    max: savedMaxes[lift.key] !== undefined? savedMaxes[lift.key] : lift.max
})) ;

// ============ STATE ============
let programs = JSON.parse(localStorage.getItem("programs")) || [];
let currentProgram = null;
let currentDay = null;
let isCompound = true;
let editingExerciseIndex = null;

// ============ DOM REFERENCES ============
const liftsContainer = document.getElementById("lifts-container");
const liftDetail = document.getElementById("lift-detail");

document.getElementById("back-btn").addEventListener("click", () => {
    liftDetail.classList.add("hidden");
    liftsContainer.classList.remove("hidden");
});

//loop through each lift and create card for it
function renderLiftCards() {
    liftsContainer.innerHTML = "";
    lifts.forEach(lift => {
        const card = document.createElement("div");
        card.classList.add("lift-card");
        card.innerHTML = `
          <h2>${lift.name}</h2>
          <p>${lift.max}kg</p>
        `;

        card.addEventListener("click", () => {
            showPercentages(lift);
        });

        liftsContainer.appendChild(card);
    }); 
};

renderLiftCards();

function showPercentages(lift) {
    //Hide the cards, show the detail panel
    liftsContainer.classList.add("hidden");
    liftDetail.classList.remove("hidden");

    //Fill in the lift name and 1RM
    document.getElementById("detail-name").textContent = lift.name;
    document.getElementById("detail-max").textContent = "1RM: " + lift.max + "kg";

    //Build the percentage rows
    const pctBody = document.getElementById("pct-body");
    pctBody.innerHTML = "";

    lift.percentages.forEach(pct => {
        const weight = Math.round(lift.max * pct / 100 * 4) / 4; // Round to nearest 0.25kg
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${pct}%</td>
          <td>${weight}kg</td>
        `;
        pctBody.appendChild(row);
    });

    // Show update 1RM form
    document.getElementById("update-max-form").classList.remove("hidden");
    document.getElementById("new-max-input").value = "";
    document.getElementById("update-max-btn").onclick = () => {
        const newMax = parseFloat(document.getElementById("new-max-input").value);
        if (!newMax || newMax <= 0) {
            alert("Please enter a valid weight.");
            return;
        }
        updateLiftMax(lift.key, newMax);
        showPercentages(lift);
    };
}

// Bottom navigation
document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        // Hide all screens
        document.querySelectorAll(".screen").forEach(s => {
            s.classList.add("hidden");
            s.classList.remove("active");
        });

        // Show the clicked screen
        const target = btn.dataset.screen;
        document.getElementById(target).classList.remove("hidden");
        document.getElementById(target).classList.add("active");

        // Update active nav button
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});


renderPrograms();

// Show the new program form
document.getElementById("create-program-btn").addEventListener("click", () => {
    document.getElementById("new-program-form").classList.remove("hidden");
    document.getElementById("create-program-btn").classList.add("hidden");
});

// Cancel button hides the form
document.getElementById("cancel-program-btn").addEventListener("click", () => {
    document.getElementById("new-program-form").classList.add("hidden");
    document.getElementById("create-program-btn").classList.remove("hidden");
    document.getElementById("program-name-input").value = "";
});

// SAVE BUTTON - Creates a new program and adds it to the programs array
document.getElementById("save-program-btn").addEventListener("click", () => {
    const name = document.getElementById("program-name-input").value.trim();

    if (name === "") {
        alert("Please enter a program name.");
        return;
    }

    const newProgram = {
        id: Date.now(),
        name: name,
        days: []
    };

    programs.push(newProgram);
    localStorage.setItem("programs", JSON.stringify(programs));

    document.getElementById("new-program-form").classList.add("hidden");
    document.getElementById("create-program-btn").classList.remove("hidden");
    document.getElementById("program-name-input").value = "";
    renderPrograms();
});

//Display newly added program
function renderPrograms() {
    const container = document.getElementById("programs-screen");
    const noMsg = document.getElementById("no-programs-msg");

    //Remove any previously rendered program cards
    document.querySelectorAll(".program-card").forEach(card => card.remove());

    if (programs.length === 0) {
        noMsg.classList.remove("hidden");
    } else {
        noMsg.classList.add("hidden");

        programs.forEach(program => {
            const card = document.createElement("div");
            card.classList.add("program-card");
            card.innerHTML = `
              <div>
                <h3>${program.name}</h3>
                <p>${program.days.length} workout days</p>
              </div>
              <span>→</span>
            `;

            card.addEventListener("click", () => {
                openProgram(program);
            });

            container.insertBefore(card, document.getElementById("new-program-form"));
        });
    }
}

// Open a program and show its details
function openProgram(program) {
    currentProgram = program;

    document.getElementById("programs-screen").classList.add("hidden");
    document.getElementById("program-detail-screen").classList.remove("hidden");
    document.getElementById("program-detail-name").textContent = program.name;

    renderDays(program);
}

document.getElementById("back-to-programs-btn").addEventListener("click", () => {
    document.getElementById("program-detail-screen").classList.add("hidden");
    document.getElementById("programs-screen").classList.remove("hidden");
});

function openDay(day) {
    currentDay = day;

    document.getElementById("program-detail-screen").classList.add("hidden");
    document.getElementById("day-detail-screen").classList.remove("hidden");
    document.getElementById("day-detail-name").textContent = day.name;

    renderExercises(day);
}

// Render the days of a program
function renderDays(program) {
    const list = document.getElementById("program-days-list");
    list.innerHTML = "";

    if (program.days.length === 0) {
        list.innerHTML = "<p style='color:#888;'>No days yet. Add your first workout day.</p>";
        return;
    }

    program.days.forEach((day, dayIndex) => {
        const card = document.createElement("div");
        card.classList.add("day-card");
        card.innerHTML = `
            <div style="flex:1;">
              <div class="day-name-display">
                <h3>${day.name}</h3>
                <button class="edit-name-btn">✏️</button>
              </div>
              <div class="day-name-edit hidden">
                <input type="text" class="day-name-input" value="${day.name}" />
                <button class="save-name-btn">Save</button>
                <button class="cancel-name-btn">Cancel</button>
              </div>
              <p>${day.exercises.length} exercises</p>
            </div>
            <div class="day-card-btns">
              <button class="edit-day-btn">Edit</button>
              <button class="start-day-btn">Start</button>
              <button class="delete-day-btn">Delete</button>
            </div>
        `;

        card.querySelector(".edit-name-btn").addEventListener("click", () => {
            card.querySelector(".day-name-display").classList.add("hidden");
            card.querySelector(".day-name-edit").classList.remove("hidden");
            card.querySelector(".day-name-input").focus();
        });

        card.querySelector(".cancel-name-btn").addEventListener("click", () => {
            card.querySelector(".day-name-edit").classList.add("hidden");
            card.querySelector(".day-name-display").classList.remove("hidden");
            card.querySelector(".day-name-input").value = day.name;
        });

        card.querySelector(".save-name-btn").addEventListener("click", () => {
            const newName = card.querySelector(".day-name-input").value.trim();
            if (newName === "") {
                alert("Please enter a day name.");
                return;
            }
            day.name = newName;
            localStorage.setItem("programs", JSON.stringify(programs));
            renderDays(currentProgram);
        })

        card.querySelector(".edit-day-btn").addEventListener("click", () => {
            openDay(day);
        });

        card.querySelector(".start-day-btn").addEventListener("click", () => {
            startWorkout(day);
        });

        card.querySelector(".delete-day-btn").addEventListener("click", () => {
            deleteDay(dayIndex);
        });

        list.appendChild(card);
    });
}

// Delete Day Function
function deleteDay(dayIndex) {
    const confirm = window.confirm("Are you sure you want to delete and all its exercises?");
    if (!confirm) return;

    currentProgram.days.splice(dayIndex, 1);
    localStorage.setItem("programs", JSON.stringify(programs));
    renderDays(currentProgram);
}

// Add a new day to the current program

document.getElementById("add-day-btn").addEventListener("click", () => {
    document.getElementById("new-day-form").classList.remove("hidden");
    document.getElementById("add-day-btn").classList.add("hidden");
});

document.getElementById("cancel-day-btn").addEventListener("click", () => {
    document.getElementById("new-day-form").classList.add("hidden");
    document.getElementById("add-day-btn").classList.remove("hidden");
    document.getElementById("day-name-input").value = "";
});

document.getElementById("save-day-btn").addEventListener("click", () => {
    const name = document.getElementById("day-name-input").value.trim();

    if (name === "") {
        alert("Please enter a day name.");
        return; 
    }

    const newDay = {
        id: Date.now(),
        name: name,
        exercises: []
    };

    currentProgram.days.push(newDay);

    //Update localStorage
    localStorage.setItem("programs", JSON.stringify(programs));

    document.getElementById("new-day-form").classList.add("hidden");
    document.getElementById("add-day-btn").classList.remove("hidden");
    document.getElementById("day-name-input").value = "";

    //Re-render the program detail screen
    openProgram(currentProgram);
});



//back button + exercise form controls
document.getElementById("back-to-program-detail-btn").addEventListener("click", () => {
    document.getElementById("day-detail-screen").classList.add("hidden");
    document.getElementById("program-detail-screen").classList.remove("hidden");
    renderDays(currentProgram);
});

document.getElementById("add-exercise-btn").addEventListener("click", () => {
    document.getElementById("add-exercise-form").classList.remove("hidden");
    document.getElementById("add-exercise-btn").classList.add("hidden");
});

document.getElementById("cancel-exercise-btn").addEventListener("click", () => {
    resetExerciseForm();
});

//compound vs accessory toggle
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

//Automatically generated percentage fields (warm up - default based on number of sets)
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

function getCurrentLiftMax() {
    const select = document.getElementById("compound-select").value;
    const lift = lifts.find(l => l.key === select);
    return lift ? lift.max : 0;
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

    // Add live update when user tweaks a warmup percentage
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

document.getElementById("warmup-sets-input").addEventListener("input", updateWarmupFields);
document.getElementById("working-pct-input").addEventListener("input", updateWorkingWeight);
document.getElementById("compound-select").addEventListener("change", () => {
    updateWarmupFields();
    updateWorkingWeight();
});

// save exercise and render functions
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
    isCompound = true;
    document.getElementById("compound-btn").classList.add("active");
    document.getElementById("accessory-btn").classList.remove("active");
    document.getElementById("compound-fields").classList.remove("hidden");
    document.getElementById("accessory-fields").classList.add("hidden");
    document.getElementById("working-pct-field").classList.remove("hidden");
    document.getElementById("accessory-weight-field").classList.add("hidden");
}

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

        // Collect warmup sets
        const warmupSets = [];
        document.querySelectorAll(".warmup-pct-input").forEach(input => {
            const pct = parseFloat(input.value) || 0;
            const weight = Math.round(max * pct / 100 * 4) / 4;
            warmupSets.push({ pct, weight });
        });

        exercise = {
            type: "compound",
            liftKey,
            name: liftName,
            warmupSets,
            workingSets,
            reps,
            workingPct,
            workingWeight: Math.round(max * workingPct / 100 * 4) / 4
        };

    } else {
        const name = document.getElementById("accessory-name-input").value.trim();
        const weight = parseFloat(document.getElementById("accessory-weight-input").value);

        if (!name) {
            alert("Please enter an exercise name.");
            return;
        }

        const warmupSetsCount = parseInt(document.getElementById("warmup-sets-input").value) || 0;
        
        exercise = {
            type: "accessory",
            name,
            warmupSets: warmupSetsCount,
            workingSets,
            reps,
            weight: weight || 0
        };
    }

    if (editingExerciseIndex !== null) {
        currentDay.exercises[editingExerciseIndex] = exercise;
        editingExerciseIndex = null;
    } else {
        currentDay.exercises.push(exercise);
    }

    localStorage.setItem("programs", JSON.stringify(programs));
    resetExerciseForm();
    renderExercises(currentDay);
});

function renderExercises(day) {
    const list = document.getElementById("exercises-list");
    list.innerHTML = "";

    if (day.exercises.length === 0) {
        list.innerHTML = "<p style='color:#888;'>No exercises yet. Add your first one.</p>";
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
            `;
        }

        card.querySelector(".delete-exercise-btn").addEventListener("click", () => {
            deleteExercise(exIndex);
        });

        card.querySelector(".edit-exercise-btn").addEventListener("click", () => {
            editExercise(exIndex);
        });

        list.appendChild(card);
    });
}

function deleteExercise(exIndex) {
    const confirm = window.confirm("Are you sure you want to delete this exercise?");
    if (!confirm) return;

    currentDay.exercises.splice(exIndex, 1);
    localStorage.setItem("programs", JSON.stringify(programs));
    renderExercises(currentDay);
}

function editExercise(exIndex) {
    const ex = currentDay.exercises[exIndex];
    editingExercisesIndex = exIndex;

     // Show the form
    document.getElementById("add-exercise-form").classList.remove("hidden");
    document.getElementById("add-exercise-btn").classList.add("hidden");

     if (ex.type === "compound") {
        // Set compound mode
        isCompound = true;
        document.getElementById("compound-btn").classList.add("active");
        document.getElementById("accessory-btn").classList.remove("active");
        document.getElementById("compound-fields").classList.remove("hidden");
        document.getElementById("accessory-fields").classList.add("hidden");
        document.getElementById("working-pct-field").classList.remove("hidden");
        document.getElementById("accessory-weight-field").classList.add("hidden");

        // Pre-fill compound fields
        document.getElementById("compound-select").value = ex.liftKey;
        document.getElementById("warmup-sets-input").value = ex.warmupSets.length;
        document.getElementById("working-sets-input").value = ex.workingSets;
        document.getElementById("reps-input").value = ex.reps;
        document.getElementById("working-pct-input").value = ex.workingPct;
        document.getElementById("working-weight-display").textContent = ex.workingWeight + "kg";
        
        //Rebuild warmup fields with existing values
        updateWarmupFields();

        //Override the default percentages with the saved ones
        const warmupInputs = document.querySelector(".warmup-pct-input");
        ex.warmupSets.forEach((s, i) => {
            if (warmupInputs[i]) {
                warmupInputs[i].value = s.pct;
                warmupInputs[i].nextElementSibling.textContent = s.weight + "kg";
            }
        });

     } else {
        // set accessory mode
        isCompound = false;
        document.getElementById("accessory-btn").classList.add("active");
        document.getElementById("compound-btn").classList.remove("active");
        document.getElementById("compound-fields").classList.add("hidden");
        document.getElementById("accessory-fields").classList.remove("hidden");
        document.getElementById("working-pct-field").classList.add("hidden");
        document.getElementById("accessory-weight-field").classList.remove("hidden");

        //Pre-fill accessory fields
        document.getElementById("accessory-name-input").value = ex.name;
        document.getElementById("warmup-sets-input").value = ex.warmupSets || 0;
        document.getElementById("working-sets-input").value = ex.workingSets;
        document.getElementById("reps-input").value = ex.reps;
        document.getElementById("accessory-weight-input").value = ex.weight;
     }
}

//Start Button Functionality
function startWorkout(day) {
    currentDay = day;

    document.getElementById("program-detail-screen").classList.add("hidden");
    document.getElementById("workout-screen").classList.remove("hidden");
    document.getElementById("workout-day-name").textContent = day.name;

    renderWorkout(day);
}

function renderWorkout(day) {
    const list = document.getElementById("workout-exercises-list");
    list.innerHTML = "";

    if (day.exercises.length === 0) {
        list.innerHTML = "<p style='color:#888;'>No exercises planned for this day.</p>";
        updateWorkoutProgress(day);
        return;
    }

    day.exercises.forEach((ex, exIndex) => {
        const card = document.createElement("div");
        card.classList.add("workout-exercise-card");

        let setsHTML = "";

        if (ex.type === "compound") {
            // Warm up sets
            ex.warmupSets.forEach((s, i) => {
                const done = s.done || false;
                setsHTML += `
                    <div class="set-row ${done ? "completed" : ""}" data-ex="${exIndex}" data-type="warmup" data-set="${i}">
                        <span>Warm up ${i + 1} — ${s.pct}% → ${s.weight}kg</span>
                        <button class="tick-btn ${done ? "done" : ""}" onclick="toggleSet(this, ${exIndex}, 'warmup', ${i})">
                            ${done ? "✓" : ""}
                        </button>
                    </div>
                `;
            });

            // Working sets
            for (let i = 0; i < ex.workingSets; i++) {
                const done = ex.workingSetsDone ? ex.workingSetsDone[i] : false;
                setsHTML += `
                    <div class="set-row ${done ? "completed" : ""}" data-ex="${exIndex}" data-type="working" data-set="${i}">
                        <span>Working ${i + 1} — ${ex.workingPct}% → ${ex.workingWeight}kg × ${ex.reps} reps</span>
                        <button class="tick-btn ${done ? "done" : ""}" onclick="toggleSet(this, ${exIndex}, 'working', ${i})">
                            ${done ? "✓" : ""}
                        </button>
                    </div>
                `;
            }

        } else {
            // Warm up sets for accessory
            for (let i = 0; i < (ex.warmupSets || 0); i++) {
                const done = ex.warmupDone ? ex.warmupDone[i] : false;
                setsHTML += `
                    <div class="set-row ${done ? "completed" : ""}">
                        <span>Warm up ${i + 1}</span>
                        <button class="tick-btn ${done ? "done" : ""}" onclick="toggleSet(this, ${exIndex}, 'accessory-warmup', ${i})">
                            ${done ? "✓" : ""}
                        </button>
                    </div>
                `;
            }

            // Working sets for accessory
            for (let i = 0; i < ex.workingSets; i++) {
                const done = ex.workingSetsDone ? ex.workingSetsDone[i] : false;
                setsHTML += `
                    <div class="set-row ${done ? "completed" : ""}">
                        <span>Set ${i + 1} — ${ex.reps} reps @ ${ex.weight}kg</span>
                        <button class="tick-btn ${done ? "done" : ""}" onclick="toggleSet(this, ${exIndex}, 'accessory-working', ${i})">
                            ${done ? "✓" : ""}
                        </button>
                    </div>
                `;
            }
        }

        card.innerHTML = `<h3>${ex.name}</h3>${setsHTML}`;
        list.appendChild(card);
    });

    updateWorkoutProgress(day);
}

function toggleSet(btn, exIndex, type, setIndex) {
    const ex = currentDay.exercises[exIndex];

    if (type === "warmup") {
        ex.warmupSets[setIndex].done = !ex.warmupSets[setIndex].done;
    } else if (type === "working") {
        if (!ex.workingSetsDone) ex.workingSetsDone = Array(ex.workingSets).fill(false);
        ex.workingSetsDone[setIndex] = !ex.workingSetsDone[setIndex];
    } else if (type === "accessory-warmup") {
        if (!ex.warmupDone) ex.warmupDone = Array(ex.warmupSets).fill(false);
        ex.warmupDone[setIndex] = !ex.warmupDone[setIndex];
    } else if (type === "accessory-working") {
        if (!ex.workingSetsDone) ex.workingSetsDone = Array(ex.workingSets).fill(false);
        ex.workingSetsDone[setIndex] = !ex.workingSetsDone[setIndex];
    }

    localStorage.setItem("programs", JSON.stringify(programs));
    renderWorkout(currentDay);
}

function updateWorkoutProgress(day) {
    let total = 0;
    let done = 0;

    day.exercises.forEach(ex => {
        if (ex.type === "compound") {
            total += ex.warmupSets.length + ex.workingSets;
            done += ex.warmupSets.filter(s => s.done).length;
            done += ex.workingSetsDone ? ex.workingSetsDone.filter(Boolean).length : 0;
        } else {
            total += (ex.warmupSets || 0) + ex.workingSets;
            done += ex.warmupDone ? ex.warmupDone.filter(Boolean).length : 0;
            done += ex.workingSetsDone ? ex.workingSetsDone.filter(Boolean).length : 0;
        }
    });

    document.getElementById("workout-progress").textContent = `${done} of ${total} sets completed`;
}

// Back and Finish buttons
document.getElementById("back-to-program-from-workout-btn").addEventListener("click", () => {
    document.getElementById("workout-screen").classList.add("hidden");
    document.getElementById("program-detail-screen").classList.remove("hidden");
});

document.getElementById("finish-workout-btn").addEventListener("click", () => {
    const day = currentDay;
    const total = document.getElementById("workout-progress").textContent;
    alert(`Workout done! ${total}`);
    document.getElementById("workout-screen").classList.add("hidden");
    document.getElementById("program-detail-screen").classList.remove("hidden");
});

function updateLiftMax(liftKey, newMax) {
    //Update the lift in the lifts array
    const lift = lifts.find(l => l.key === liftKey);
    if(!lift) return;

    lift.max = newMax;

    //Save to localStorage
    const savedMaxes = JSON.parse(localStorage.getItem("liftMaxes")) || {};
    savedMaxes[liftKey] = newMax;
    localStorage.setItem("liftMaxes", JSON.stringify(savedMaxes));

    //Update the lift cards on screen
    renderLiftCards();
}