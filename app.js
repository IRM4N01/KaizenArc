// ====== SPLASH SCREEN ======
function initSplash() {
    const userName = localStorage.getItem("userName");

    if (!userName) {
        // First time - show name entry
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("name-entry-screen").classList.remove("hidden");

        document.getElementById("save-name-btn").addEventListener("click", () => {
            const name = document.getElementById("user-name-input").value.trim();
            if (!name) { alert("Please enter your name!"); return; }
            localStorage.setItem("userName", name);
            document.getElementById("name-entry-screen").classList.add("hidden");
            showSplash(name);
        });

        // Allow pressing enter to submit
        document.getElementById("user-name-input").addEventListener("keydown", (e) => {
            if (e.key === "Enter") document.getElementById("save-name-btn").click();
        });

    } else {
        showSplash(userName);
    }
}

function showSplash(name) {
    const splash = document.getElementById("splash-screen");
    splash.style.display = "flex";
    document.getElementById("splash-welcome").textContent = `Welcome back, ${name}`;

    setTimeout(() => {
        splash.classList.add("fade-out");
        setTimeout(() => {
            splash.style.display = "none";
        }, 600);
    }, 2000);
}

initSplash();


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
let currentWeek = null;
let currentDay = null;
let isCompound = true;
let editingExerciseIndex = null;
let isDayWorkout = true;
let programImagePosition = "center";

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
    const startDate = document.getElementById("program-start-date").value;
    const numWeeks = parseInt(document.getElementById("program-weeks-input").value);
    const startWeight = parseFloat(document.getElementById("program-start-weight").value);

    if (!name) { alert("Please enter a program name."); return; }
    if (!startDate) { alert("Please enter a start date."); return; }
    if (!numWeeks || numWeeks < 1) { alert("Please enter the number of weeks."); return; }

    // Auto generate weeks
    const weeks = [];
    for (let i = 1; i <= numWeeks; i++) {
        weeks.push({
            id: Date.now() + i,
            name: `Week ${i}`,
            days: []
        });
    }

    //Helper function to save the program
    const saveProgram = (coverImage) => {
        const newProgram = {
            id: Date.now(),
            name,
            startDate,
            startWeight: startWeight || null,
            endWeight: null,
            coverImage: coverImage || null,
            coverPosition: programImagePosition,
            weeks
        };

        document.getElementById("image-position-selector").classList.add("hidden");

        programs.push(newProgram);
        localStorage.setItem("programs", JSON.stringify(programs));

        document.getElementById("new-program-form").classList.add("hidden");
        document.getElementById("create-program-btn").classList.remove("hidden");
        document.getElementById("program-name-input").value = "";
        document.getElementById("program-start-date").value = "";
        document.getElementById("program-weeks-input").value = "";
        document.getElementById("program-start-weight").value = "";
        document.getElementById("program-image-preview").classList.add("hidden");

        renderPrograms();
    };

    //Check if an image was selected
    const imageInput = document.getElementById("program-image-input");
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            saveProgram(event.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveProgram(null);
    }
});

//Display newly added program
function renderPrograms() {
    const container = document.getElementById("programs-screen");
    const noMsg = document.getElementById("no-programs-msg");

    document.querySelectorAll(".program-card").forEach(card => card.remove());

    if (programs.length === 0) {
        noMsg.classList.remove("hidden");
    } else {
        noMsg.classList.add("hidden");

        programs.forEach((program, programIndex) => {
            const card = document.createElement("div");
            card.classList.add("program-card");
            card.innerHTML = `
                ${program.coverImage ? `<img class="program-cover" src="${program.coverImage}" alt="${program.name}" style="object-position: center ${program.coverPosition || '50%'}" />` : ""}
                <div class="program-card-content" style="display:flex; justify-content:space-between; align-items:center; padding: 16px 20px;">
                    <div>
                        <h3>${program.name}</h3>
                        <p>${program.weeks.length} weeks · Started ${program.startDate}</p>
                    </div>
                    <div style="display:flex; gap:8px; align-items:center;">
                        <span>→</span>
                        <button class="delete-program-btn" style="padding:6px 12px; background:none; border:1px solid rgba(192,57,43,0.4); border-radius:8px; font-size:13px; cursor:pointer; color:var(--accent-red);">Delete</button>
                    </div>
                </div>
            `;

            card.querySelector(".delete-program-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                const confirm = window.confirm("Are you sure you want to delete this program?");
                if (!confirm) return;
                programs.splice(programIndex, 1);
                localStorage.setItem("programs", JSON.stringify(programs));
                renderPrograms();
            });

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
    document.getElementById("program-detail-name").textContent = "";
    
    const nameEl = document.getElementById("program-detail-name");
    nameEl.innerHTML = `
        <span id="program-name-display">${program.name} <button id="edit-program-name-btn">✏️</button></span>
        <span id="program-name-edit" class="hidden">
            <input type="text" id="program-name-edit-input" value="${program.name}" style="width:200px; padding:6px 10px; font-size:15px; border:1px solid #ddd; border-radius:8px;" />
            <button id="save-program-name-btn">Save</button>
            <button id="cancel-program-name-btn">Cancel</button>
        </span>
    `;

    // Show program info
    const info = document.getElementById("program-detail-info");
    info.innerHTML = `
       ${program.coverImage ? `
        <div style="position:relative; margin-bottom:12px;">
            <img class="program-cover" src="${program.coverImage}" alt="${program.name}" style="object-position: center ${program.coverPosition || '50%'}" />
            <div style="display:flex; gap:8px; margin-top:8px;">
                <label for="change-cover-input" style="flex:1; padding:8px; background:none; border:1px solid var(--border-color); border-radius:8px; font-size:13px; color:var(--text-secondary); cursor:pointer; text-align:center; margin:0;">Change image</label>
                <input type="file" id="change-cover-input" accept="image/*" style="display:none;" />
                <button id="remove-cover-btn" style="flex:1; padding:8px; background:none; border:1px solid rgba(192,57,43,0.4); border-radius:8px; font-size:13px; color:var(--accent-red); cursor:pointer;">Remove image</button>
            </div>
        </div>
    ` : `
        <div style="margin-bottom:12px;">
            <label for="change-cover-input" style="display:block; padding:10px; background:none; border:1px solid var(--border-color); border-radius:8px; font-size:13px; color:var(--text-secondary); cursor:pointer; text-align:center; margin:0;">+ Add cover image</label>
            <input type="file" id="change-cover-input" accept="image/*" style="display:none;" />
        </div>
    `}
        <p style="color:var(--text-secondary); font-size:13px;">Started: ${program.startDate} · ${program.weeks.length} weeks · Start weight: ${program.startWeight || "—"}kg</p>
    `;

    // Change or add cover image
        document.getElementById("change-cover-input").addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                // Show drag preview instead of saving immediately
                const dragPreview = document.createElement("div");
                dragPreview.id = "change-cover-preview";
                dragPreview.style.cssText = "margin-top:12px; border-radius:10px; overflow:hidden; border:1px solid var(--border-color);";
                dragPreview.innerHTML = `
                <div id="change-drag-container" style="width:100%; height:180px; overflow:hidden; position:relative; cursor:grab; border-radius:10px;">
                    <img id="change-preview-img" src="${event.target.result}" draggable="false" style="width:100%; position:absolute; left:0; top:0; user-select:none; pointer-events:none;" />
                </div>
                <p style="font-size:13px; color:var(--text-secondary); margin-top:8px;">Drag to reposition</p>
                <button id="confirm-change-btn" style="width:100%; padding:12px; background:var(--accent-red); color:var(--text-primary); border:none; border-radius:10px; font-size:15px; font-weight:500; margin-top:8px; cursor:pointer;">Save new image</button>
                <button id="cancel-change-btn" style="width:100%; padding:12px; background:none; color:var(--text-secondary); border:1px solid var(--border-color); border-radius:10px; font-size:15px; margin-top:8px; cursor:pointer;">Cancel</button>
                `;

                // Insert preview after info section
                const info = document.getElementById("program-detail-info");
                const existing = document.getElementById("change-cover-preview");
                if (existing) existing.remove();
                info.insertAdjacentElement("afterend", dragPreview);

                // Setup drag for change preview
                let changeDragStartY = 0;
                let changeDragStartOffset = 0;
                let changeCurrentOffset = 0;
                let changeImgHeight = 0;
                const changeContainerHeight = 180;

                const changeImg = document.getElementById("change-preview-img");
                const changeContainer = document.getElementById("change-drag-container");

                changeImg.onload = () => {
                    const containerWidth = changeContainer.offsetWidth;
                    const aspectRatio = changeImg.naturalHeight / changeImg.naturalWidth;
                    changeImgHeight = containerWidth * aspectRatio;
                    changeImg.style.height = changeImgHeight + "px";
                    changeCurrentOffset = -(changeImgHeight - changeContainerHeight) / 2;
                    changeImg.style.top = changeCurrentOffset + "px";
                };

                const updateChangeOffset = (newOffset) => {
                    const maxOffset = 0;
                    const minOffset = -(changeImgHeight - changeContainerHeight);
                    changeCurrentOffset = Math.max(minOffset, Math.min(maxOffset, newOffset));
                    changeImg.style.top = changeCurrentOffset + "px";
                };

                // Mouse drag
                changeContainer.addEventListener("mousedown", (e) => {
                    changeDragStartY = e.clientY;
                    changeDragStartOffset = changeCurrentOffset;
                    changeContainer.style.cursor = "grabbing";

                    const onMouseMove = (e) => updateChangeOffset(changeDragStartOffset + (e.clientY - changeDragStartY));
                    const onMouseUp = () => {
                        changeContainer.style.cursor = "grab";
                        document.removeEventListener("mousemove", onMouseMove);
                        document.removeEventListener("mouseup", onMouseUp);
                    };
                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", onMouseUp);
                });

                // Touch drag
                changeContainer.addEventListener("touchstart", (e) => {
                    changeDragStartY = e.touches[0].clientY;
                    changeDragStartOffset = changeCurrentOffset;

                    const onTouchMove = (e) => {
                        e.preventDefault();
                        updateChangeOffset(changeDragStartOffset + (e.touches[0].clientY - changeDragStartY));
                    };
                    const onTouchEnd = () => {
                        changeContainer.removeEventListener("touchmove", onTouchMove);
                        changeContainer.removeEventListener("touchend", onTouchEnd);
                    };
                    changeContainer.addEventListener("touchmove", onTouchMove, { passive: false });
                    changeContainer.addEventListener("touchend", onTouchEnd);
                });

                // Save new image
                document.getElementById("confirm-change-btn").addEventListener("click", () => {
                    const range = changeImgHeight - changeContainerHeight;
                    const position = range > 0 ? ((-changeCurrentOffset / range) * 100).toFixed(1) + "%" : "50%";
                    program.coverImage = event.target.result;
                    program.coverPosition = position;
                    localStorage.setItem("programs", JSON.stringify(programs));
                    document.getElementById("change-cover-preview").remove();
                    renderPrograms();
                    openProgram(program);
                });

                // Cancel
                document.getElementById("cancel-change-btn").addEventListener("click", () => {
                    document.getElementById("change-cover-preview").remove();
                });
            };
            reader.readAsDataURL(file);
        });

        // Remove cover image
        if (document.getElementById("remove-cover-btn")) {
            document.getElementById("remove-cover-btn").addEventListener("click", () => {
                const confirm = window.confirm("Remove the cover image?");
                if (!confirm) return;
                program.coverImage = null;
                program.coverPosition = null;
                localStorage.setItem("programs", JSON.stringify(programs));
                renderPrograms();
                openProgram(program);
            });
        }

    // Edit name button
    document.getElementById("edit-program-name-btn").addEventListener("click", () => {
        document.getElementById("program-name-display").classList.add("hidden");
        document.getElementById("program-name-edit").classList.remove("hidden");
        document.getElementById("program-name-edit-input").focus();
    });

    // Cancel button
    document.getElementById("cancel-program-name-btn").addEventListener("click", () => {
        document.getElementById("program-name-edit").classList.add("hidden");
        document.getElementById("program-name-display").classList.remove("hidden");
    });

    // Save button
    document.getElementById("save-program-name-btn").addEventListener("click", () => {
        const newName = document.getElementById("program-name-edit-input").value.trim();
        if (newName === "") {
            alert("Please enter a program name.");
            return;
        }
        program.name = newName;
        localStorage.setItem("programs", JSON.stringify(programs));
        openProgram(program);
    });

    renderWeeks(program);
}

function renderWeeks(program) {
    const list = document.getElementById("weeks-list");
    list.innerHTML = "";

    program.weeks.forEach((week, weekIndex) => {
        const completedDays = week.days.filter(d => d.completed && d.type === "workout").length;
        const totalWorkoutDays = week.days.filter(d => d.type === "workout").length;
        const totalRestDays = week.days.filter(d => d.type === "rest").length;
        const card = document.createElement("div");
        card.classList.add("program-card");
        card.innerHTML = `
            <div>
                <h3>${week.name}</h3>
                <p>${totalWorkoutDays} workouts · ${totalRestDays} rest · ${completedDays} completed</p>
            </div>
            <span>→</span>
        `;

        card.addEventListener("click", () => {
            openWeek(week);
        });

        list.appendChild(card);
    });
}

function openWeek(week) {
    currentWeek = week;

    document.getElementById("program-detail-screen").classList.add("hidden");
    document.getElementById("week-detail-screen").classList.remove("hidden");
    document.getElementById("week-detail-name").textContent = week.name;

    const existingCover = document.getElementById("week-cover-image");
    if (existingCover) existingCover.remove();

    if (currentProgram.coverImage) {
        const coverEl = document.createElement("div");
        coverEl.id = "week-cover-image";
        coverEl.innerHTML = `<img src="${currentProgram.coverImage}" alt="${currentProgram.name}" class="program-cover" style="margin-bottom:16px; object-position: center ${currentProgram.coverPosition || '50%'}" />`;
        
        const weekName = document.getElementById("week-detail-name");
        weekName.insertAdjacentElement("afterend", coverEl);
    }

    renderDays(week);
}

function renderDays(week) {
    const list = document.getElementById("days-list");
    list.innerHTML = "";

    if (week.days.length === 0) {
        list.innerHTML = "<p style='color:#888;'>No days yet. Add your first day.</p>";
        return;
    }

    week.days.forEach((day, dayIndex) => {
        const card = document.createElement("div");
        card.classList.add("day-card");

        const isRest = day.type === "rest";
        const completedBadge = day.completed ? `<span class="badge-done">✓ Done ${day.completedDate || ""}</span>` : "";
        const restBadge = isRest ? `<span class="badge-rest">Rest</span>` : "";

        card.innerHTML = `
            <div style="flex:1;">
              <h3>${day.date || "No date"} ${day.notes ? "— " + day.notes : ""}</h3>
              <p>${isRest ? "" : day.exercises.length + " exercises"}</p>
                 ${completedBadge}${restBadge}
            </div>
            <div class="day-card-btns">
              ${!isRest ? `<button class="start-day-btn">${day.completed ? "Redo" : "Start"}</button>` : ""}
              <button class="delete-day-btn">Delete</button>
            </div>
        `;

        if (!isRest) {
            card.addEventListener("click", (e) => {
                if (e.target.classList.contains("start-day-btn") || e.target.classList.contains("delete-day-btn")) return;
                openDay(day);
            });

            card.querySelector(".start-day-btn").addEventListener("click", () => {
                startWorkout(day);
            });
        }

        card.querySelector(".delete-day-btn").addEventListener("click", () => {
            const confirm = window.confirm("Delete this day?");
            if (!confirm) return;
            currentWeek.days.splice(dayIndex, 1);
            localStorage.setItem("programs", JSON.stringify(programs));
            renderDays(currentWeek);
        });

        list.appendChild(card);
    });
}

document.getElementById("back-to-programs-btn").addEventListener("click", () => {
    document.getElementById("program-detail-screen").classList.add("hidden");
    document.getElementById("programs-screen").classList.remove("hidden");
});

document.getElementById("back-to-program-from-week-btn").addEventListener("click", () => {
    document.getElementById("week-detail-screen").classList.add("hidden");
    document.getElementById("program-detail-screen").classList.remove("hidden");
});

function openDay(day) {
    currentDay = day;

    document.getElementById("week-detail-screen").classList.add("hidden");
    document.getElementById("exercise-detail-screen").classList.remove("hidden");
    document.getElementById("exercise-detail-name").textContent = day.date + (day.notes ? " - " + day.notes : "");

    // Show program cover image if it exists
    const existingCover = document.getElementById("day-cover-image");
    if (existingCover) existingCover.remove();

    if (currentProgram.coverImage) {
        const coverEl = document.createElement("div");
        coverEl.id = "day-cover-image";
        coverEl.innerHTML = `<img src="${currentProgram.coverImage}" alt="${currentProgram.name}" class="program-cover" style="margin-bottom:16px; object-position: center ${currentProgram.coverPosition || '50%'}" />`;
        const dayName = document.getElementById("exercise-detail-name");
        dayName.insertAdjacentElement("afterend", coverEl);
    }

    renderExercises(day);
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
    document.getElementById("day-date-input").value = "";
    document.getElementById("day-notes-input").value = "";
});

document.getElementById("workout-type-btn").addEventListener("click", () => {
    isDayWorkout = true;
    document.getElementById("workout-type-btn").classList.add("active");
    document.getElementById("rest-type-btn").classList.remove("active");
});

document.getElementById("rest-type-btn").addEventListener("click", () => {
    isDayWorkout = false;
    document.getElementById("rest-type-btn").classList.add("active");
    document.getElementById("workout-type-btn").classList.remove("active");
});

document.getElementById("save-day-btn").addEventListener("click", () => {
    const date = document.getElementById("day-date-input").value;
    const notes = document.getElementById("day-notes-input").value.trim();

    if (!date) { alert("Please enter a date."); return; }

    const newDay = {
        id: Date.now(),
        type: isDayWorkout ? "workout" : "rest",
        date,
        notes,
        exercises: [],
        completed: false,
        completedDate: null
    };

    currentWeek.days.push(newDay);
    localStorage.setItem("programs", JSON.stringify(programs));

    document.getElementById("new-day-form").classList.add("hidden");
    document.getElementById("add-day-btn").classList.remove("hidden");
    document.getElementById("day-date-input").value = "";
    document.getElementById("day-notes-input").value = "";
    isDayWorkout = true;
    document.getElementById("workout-type-btn").classList.add("active");
    document.getElementById("rest-type-btn").classList.remove("active");

    renderDays(currentWeek);
});



//back button + exercise form controls
document.getElementById("back-to-week-btn").addEventListener("click", () => {
    document.getElementById("exercise-detail-screen").classList.add("hidden");
    document.getElementById("week-detail-screen").classList.remove("hidden");
    renderDays(currentWeek);
});

document.getElementById("add-exercise-btn").addEventListener("click", () => {
    populateCompoundSelect();
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
    populateCompoundSelect();
    const ex = currentDay.exercises[exIndex];
    editingExerciseIndex = exIndex;

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
        const warmupInputs = document.querySelectorAll(".warmup-pct-input");
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

    document.getElementById("week-detail-screen").classList.add("hidden");
    document.getElementById("workout-screen").classList.remove("hidden");
    document.getElementById("workout-day-name").textContent = day.date + (day.notes ? " — " + day.notes : "");

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
    document.getElementById("week-detail-screen").classList.remove("hidden");
});

document.getElementById("finish-workout-btn").addEventListener("click", () => {
    const total = document.getElementById("workout-progress").textContent;

    // Mark day as completed with today's date
    currentDay.completed = true;
    currentDay.completedDate = new Date().toLocaleDateString("en-AU");

    localStorage.setItem("programs", JSON.stringify(programs));

    alert(`Workout done! ${total}`);
    document.getElementById("workout-screen").classList.add("hidden");
    document.getElementById("week-detail-screen").classList.remove("hidden");

    renderDays(currentWeek);
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

function populateCompoundSelect() {
    const select = document.getElementById("compound-select");
    select.innerHTML = "";
    lifts.forEach(lift => {
        const option = document.createElement("option");
        option.value = lift.key;
        option.textContent = `${lift.name} (1RM: ${lift.max}kg)`;
        select.appendChild(option);
    });
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/TrainingArc/service-worker.js")
            .then(reg => console.log("Service worker registered"))
            .catch(err => console.log("Service worker error:", err));
    });
}

let dragStartY = 0;
let dragStartOffset = 0;
let currentOffset = 0;
let imgNaturalHeight = 0;
let containerHeight = 180;

document.getElementById("program-image-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const preview = document.getElementById("program-image-preview");
        const img = document.getElementById("preview-img");

        img.src = event.target.result;
        img.onload = () => {
            const container = document.getElementById("drag-container");
            const containerWidth = container.offsetWidth;
            const aspectRatio = img.naturalHeight / img.naturalWidth;
            imgNaturalHeight = containerWidth * aspectRatio;
            img.style.width = "100%";
            img.style.height = imgNaturalHeight + "px";
            currentOffset = -(imgNaturalHeight - containerHeight) / 2;
            img.style.top = currentOffset + "px";
        };

        preview.classList.remove("hidden");
        document.getElementById("image-position-selector").classList.remove("hidden");
        setupDrag();  
    };
    reader.readAsDataURL(file);
});

function setupDrag() {
     const container = document.getElementById("drag-container");
    const img = document.getElementById("preview-img");

    // Mouse events
    container.addEventListener("mousedown", (e) => {
        dragStartY = e.clientY;
        dragStartOffset = currentOffset;
        container.classList.add("dragging");

        const onMouseMove = (e) => {
            const delta = e.clientY - dragStartY;
            updateOffset(dragStartOffset + delta, img);
        };

        const onMouseUp = () => {
            container.classList.remove("dragging");
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    // Touch events for mobile
    container.addEventListener("touchstart", (e) => {
        dragStartY = e.touches[0].clientY;
        dragStartOffset = currentOffset;

        const onTouchMove = (e) => {
            e.preventDefault();
            const delta = e.touches[0].clientY - dragStartY;
            updateOffset(dragStartOffset + delta, img);
        };

        const onTouchEnd = () => {
            container.removeEventListener("touchmove", onTouchMove);
            container.removeEventListener("touchend", onTouchEnd);
        };

        container.addEventListener("touchmove", onTouchMove, { passive: false });
        container.addEventListener("touchend", onTouchEnd);
    });
}

function updateOffset(newOffset, img) {
    const maxOffset = 0;
    const minOffset = -(imgNaturalHeight - containerHeight);
    currentOffset = Math.max(minOffset, Math.min(maxOffset, newOffset));
    img.style.top = currentOffset + "px";

    // Store as a percentage for saving
    const range = imgNaturalHeight - containerHeight;
    programImagePosition = range > 0 ? ((-currentOffset / range) * 100).toFixed(1) + "%" : "50%";
}


