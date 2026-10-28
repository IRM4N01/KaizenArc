// ======= MUSCLE MAP =======

const MUSCLE_DATA = {
    chest: {
        name: "Chest",
        sci: "Pectoralis Major & Minor",
        group: "Push",
        exercises: [
            { name: "Bench Press",             difficulty: "intermediate" },
            { name: "Incline Dumbbell Press",  difficulty: "intermediate" },
            { name: "Cable Fly",               difficulty: "beginner"     },
            { name: "Chest Dip",               difficulty: "intermediate" },
            { name: "Decline Bench Press",     difficulty: "intermediate" },
            { name: "Pec Deck Machine",        difficulty: "beginner"     },
        ]
    },
    shoulders: {
        name: "Shoulders",
        sci: "Deltoideus Anterior",
        group: "Push",
        exercises: [
            { name: "Overhead Press",          difficulty: "intermediate" },
            { name: "Arnold Press",            difficulty: "intermediate" },
            { name: "Lateral Raise",           difficulty: "beginner"     },
            { name: "Front Raise",             difficulty: "beginner"     },
            { name: "Seated Dumbbell Press",   difficulty: "beginner"     },
        ]
    },
    "rear delts": {
        name: "Rear Delts",
        sci: "Deltoideus Posterior",
        group: "Pull",
        exercises: [
            { name: "Face Pull",               difficulty: "beginner"     },
            { name: "Reverse Pec Deck",        difficulty: "beginner"     },
            { name: "Bent-Over Lateral Raise", difficulty: "beginner"     },
            { name: "Cable Rear Delt Fly",     difficulty: "intermediate" },
        ]
    },
    biceps: {
        name: "Biceps",
        sci: "Biceps Brachii",
        group: "Pull",
        exercises: [
            { name: "Barbell Curl",            difficulty: "beginner"     },
            { name: "Hammer Curl",             difficulty: "beginner"     },
            { name: "Incline Dumbbell Curl",   difficulty: "intermediate" },
            { name: "Cable Curl",              difficulty: "beginner"     },
            { name: "Preacher Curl",           difficulty: "beginner"     },
        ]
    },
    triceps: {
        name: "Triceps",
        sci: "Triceps Brachii",
        group: "Push",
        exercises: [
            { name: "Tricep Pushdown",         difficulty: "beginner"     },
            { name: "Skull Crusher",           difficulty: "intermediate" },
            { name: "Overhead Tricep Extension", difficulty: "beginner"   },
            { name: "Close-Grip Bench Press",  difficulty: "intermediate" },
            { name: "Tricep Dip",              difficulty: "intermediate" },
        ]
    },
    forearms: {
        name: "Forearms",
        sci: "Brachioradialis & Flexors",
        group: "Arms",
        exercises: [
            { name: "Wrist Curl",              difficulty: "beginner"     },
            { name: "Reverse Curl",            difficulty: "beginner"     },
            { name: "Farmer's Carry",          difficulty: "beginner"     },
            { name: "Dead Hang",               difficulty: "beginner"     },
        ]
    },
    abs: {
        name: "Abs",
        sci: "Rectus Abdominis",
        group: "Core",
        exercises: [
            { name: "Cable Crunch",            difficulty: "beginner"     },
            { name: "Hanging Leg Raise",       difficulty: "intermediate" },
            { name: "Ab Rollout",              difficulty: "advanced"     },
            { name: "Plank",                   difficulty: "beginner"     },
            { name: "Decline Sit-Up",          difficulty: "beginner"     },
        ]
    },
    obliques: {
        name: "Obliques",
        sci: "Obliquus Externus & Internus",
        group: "Core",
        exercises: [
            { name: "Cable Woodchop",          difficulty: "beginner"     },
            { name: "Side Plank",              difficulty: "beginner"     },
            { name: "Pallof Press",            difficulty: "intermediate" },
            { name: "Russian Twist",           difficulty: "beginner"     },
        ]
    },
    traps: {
        name: "Traps",
        sci: "Trapezius",
        group: "Back",
        exercises: [
            { name: "Barbell Shrug",           difficulty: "beginner"     },
            { name: "Dumbbell Shrug",          difficulty: "beginner"     },
            { name: "Cable Shrug",             difficulty: "beginner"     },
            { name: "Face Pull",               difficulty: "beginner"     },
        ]
    },
    lats: {
        name: "Lats",
        sci: "Latissimus Dorsi",
        group: "Pull",
        exercises: [
            { name: "Pull-Up",                 difficulty: "intermediate" },
            { name: "Lat Pulldown",            difficulty: "beginner"     },
            { name: "Seated Cable Row",        difficulty: "beginner"     },
            { name: "Single-Arm Dumbbell Row", difficulty: "beginner"     },
            { name: "Meadows Row",             difficulty: "advanced"     },
        ]
    },
    "mid back": {
        name: "Mid Back",
        sci: "Rhomboids & Middle Trapezius",
        group: "Pull",
        exercises: [
            { name: "Bent-Over Barbell Row",   difficulty: "intermediate" },
            { name: "T-Bar Row",               difficulty: "intermediate" },
            { name: "Chest-Supported Row",     difficulty: "beginner"     },
            { name: "Cable Row",               difficulty: "beginner"     },
        ]
    },
    "lower back": {
        name: "Lower Back",
        sci: "Erector Spinae",
        group: "Pull",
        exercises: [
            { name: "Romanian Deadlift",       difficulty: "intermediate" },
            { name: "Back Extension",          difficulty: "beginner"     },
            { name: "Good Morning",            difficulty: "intermediate" },
            { name: "Deadlift",                difficulty: "advanced"     },
        ]
    },
    glutes: {
        name: "Glutes",
        sci: "Gluteus Maximus & Medius",
        group: "Legs",
        exercises: [
            { name: "Hip Thrust",              difficulty: "beginner"     },
            { name: "Bulgarian Split Squat",   difficulty: "intermediate" },
            { name: "Cable Kickback",          difficulty: "beginner"     },
            { name: "Romanian Deadlift",       difficulty: "intermediate" },
            { name: "Step-Up",                 difficulty: "beginner"     },
        ]
    },
    quads: {
        name: "Quads",
        sci: "Quadriceps Femoris",
        group: "Legs",
        exercises: [
            { name: "Squat",                   difficulty: "intermediate" },
            { name: "Leg Press",               difficulty: "beginner"     },
            { name: "Leg Extension",           difficulty: "beginner"     },
            { name: "Hack Squat",              difficulty: "intermediate" },
            { name: "Walking Lunge",           difficulty: "beginner"     },
        ]
    },
    hamstrings: {
        name: "Hamstrings",
        sci: "Biceps Femoris & Semitendinosus",
        group: "Legs",
        exercises: [
            { name: "Romanian Deadlift",       difficulty: "intermediate" },
            { name: "Lying Leg Curl",          difficulty: "beginner"     },
            { name: "Seated Leg Curl",         difficulty: "beginner"     },
            { name: "Nordic Curl",             difficulty: "advanced"     },
            { name: "Good Morning",            difficulty: "intermediate" },
        ]
    },
    calves: {
        name: "Calves",
        sci: "Gastrocnemius & Soleus",
        group: "Legs",
        exercises: [
            { name: "Standing Calf Raise",     difficulty: "beginner"     },
            { name: "Seated Calf Raise",       difficulty: "beginner"     },
            { name: "Leg Press Calf Raise",    difficulty: "beginner"     },
            { name: "Single-Leg Calf Raise",   difficulty: "intermediate" },
        ]
    },
    "hip flexors": {
        name: "Hip Flexors",
        sci: "Iliopsoas",
        group: "Core",
        exercises: [
            { name: "Hanging Knee Raise",      difficulty: "beginner"     },
            { name: "Cable Hip Flexion",       difficulty: "beginner"     },
            { name: "Mountain Climber",        difficulty: "beginner"     },
            { name: "Dragon Flag",             difficulty: "advanced"     },
        ]
    },
    neck: {
        name: "Neck",
        sci: "Sternocleidomastoid & Splenius",
        group: "Accessory",
        exercises: [
            { name: "Neck Flexion",            difficulty: "beginner"     },
            { name: "Neck Extension",          difficulty: "beginner"     },
            { name: "Neck Lateral Flexion",    difficulty: "beginner"     },
        ]
    },
};

// Holds a reference to the currently open day (set by days.js / exercises.js)
let _activeDay = null;
let _activePrograms = null;
let _savePrograms = null;

/**
 * Called by days.js when a day is opened, so the Body tab knows where to add exercises.
 */
export function setBodyTabActiveDay(day, programs, saveFn) {
    _activeDay = day;
    _activePrograms = programs;
    _savePrograms = saveFn;
}

export function initBodyTab() {
    const frontView = document.getElementById("body-front-view");
    const backView  = document.getElementById("body-back-view");
    const btnFront  = document.getElementById("body-btn-front");
    const btnBack   = document.getElementById("body-btn-back");

    if (!frontView) return;

    // View toggle
    btnFront.addEventListener("click", () => switchView("front"));
    btnBack.addEventListener("click",  () => switchView("back"));

    // Wire up all muscle zones in both views
    document.querySelectorAll(".mzone").forEach(zone => {
        zone.addEventListener("click", e => {
            e.stopPropagation();
            const muscle = zone.dataset.muscle;
            const wasActive = zone.classList.contains("active");

            // Clear all active zones
            document.querySelectorAll(".mzone.active").forEach(z => z.classList.remove("active"));

            if (!wasActive) {
                // Activate all zones sharing this muscle key (bilateral muscles)
                document.querySelectorAll(`.mzone[data-muscle="${muscle}"]`).forEach(z => z.classList.add("active"));
                showMusclePanel(muscle);
            } else {
                showEmptyPanel();
            }
        });
    });

    // Click outside diagram clears selection
    document.getElementById("body-screen").addEventListener("click", e => {
        if (!e.target.closest(".body-diagram-wrap") && !e.target.closest(".body-info-panel")) {
            document.querySelectorAll(".mzone.active").forEach(z => z.classList.remove("active"));
            showEmptyPanel();
        }
    });

    document.getElementById("body-info-btn").addEventListener("click", () => {
        document.querySelectorAll(".mzone.active").forEach(z => z.classList.remove("active"));
        showEmptyPanel();
    });

    showEmptyPanel();

}

function switchView(v) {
    const frontView = document.getElementById("body-front-view");
    const backView  = document.getElementById("body-back-view");
    const btnFront  = document.getElementById("body-btn-front");
    const btnBack   = document.getElementById("body-btn-back");

    frontView.classList.toggle("hidden", v !== "front");
    backView.classList.toggle("hidden",  v !== "back");
    btnFront.classList.toggle("active",  v === "front");
    btnBack.classList.toggle("active",   v === "back");

    // Clear selection when switching views
    document.querySelectorAll(".mzone.active").forEach(z => z.classList.remove("active"));
    showEmptyPanel();
}

function showEmptyPanel() {
    const panel = document.getElementById("body-info-panel");
    panel.innerHTML = `
        <div class="body-panel-empty">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.5"/>
                <path d="M20 18v10M20 14v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <p><strong style="color:var(--text-primary)">Tap a muscle to explore</strong></p>
            <p>Select any highlighted zone on the body diagram to see its name, muscle group, and suggested exercises.</p>
            <p>Hit <strong style="color:var(--accent-gold)">+ Add</strong> on any exercise to drop it straight into your currently open day.</p>
        </div>
    `;
}

function showMusclePanel(muscleKey) {
    const data = MUSCLE_DATA[muscleKey];
    if (!data) return;

    const panel = document.getElementById("body-info-panel");

    const exRows = data.exercises.map(ex => `
        <div class="body-ex-item">
            <div class="body-ex-left">
                <div class="body-ex-name">${ex.name}</div>
                <div class="body-ex-diff">
                    <span class="body-diff-dot ${ex.difficulty}"></span>${ex.difficulty}
                </div>
            </div>
            <button class="body-ex-add-btn" data-name="${ex.name}" data-muscle="${muscleKey}" data-diff="${ex.difficulty}">+ Add</button>
        </div>
    `).join("");

    panel.innerHTML = `
        <div class="body-panel-header">
            <div>
                <div class="body-muscle-name">${data.name}</div>
                <div class="body-sci-name">${data.sci}</div>
            </div>
            <div class="body-group-badge">${data.group}</div>
        </div>
        <div class="body-ex-label">Suggested exercises</div>
        <div class="body-ex-list">${exRows}</div>
    `;

    // Wire up Add buttons
    panel.querySelectorAll(".body-ex-add-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.dataset.name;
            addExerciseToActiveDay(name, btn.dataset.muscle, btn.dataset.diff);
        });
    });
}

function addExerciseToActiveDay(name, muscle, difficulty) {
    if (!_activeDay) {
        showToast("Open a day first to add exercises");
        return;
    }

    const exercise = {
        type: "accessory",
        name,
        muscle,
        difficulty,
        warmupSets: 0,
        workingSets: 3,
        reps: 10,
        weight: 0,
        notes: null
    };

    _activeDay.exercises.push(exercise);
    _savePrograms(_activePrograms);

    showToast(`"${name}" added to ${_activeDay.notes || "day"}`);
}

function showToast(message) {
    const existing = document.getElementById("body-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "body-toast";
    toast.className = "body-toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add("visible"));
    });

    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}