// ======= PROGRAMS =======
import { getPrograms, savePrograms } from './storage.js';
import { openWeek } from './weeks.js';
import { saveAsTemplate, renderTemplatesList } from './templates.js';

export let programs = getPrograms();

export function refreshPrograms() {
    programs = getPrograms();
    return programs;
}

export function initPrograms() {
    renderPrograms();

    document.getElementById("create-program-btn").addEventListener("click", () => {
        document.getElementById("new-program-form").classList.remove("hidden");
        document.getElementById("create-program-btn").classList.add("hidden");
    });

    document.getElementById("cancel-program-btn").addEventListener("click", () => {
        document.getElementById("new-program-form").classList.add("hidden");
        document.getElementById("create-program-btn").classList.remove("hidden");
        document.getElementById("program-name-input").value = "";
    });

    // Image upload preview
    let programImagePosition = "center";
    let dragStartY = 0;
    let dragStartOffset = 0;
    let currentOffset = 0;
    let imgNaturalHeight = 0;
    const containerHeight = 180;

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

    function updateOffset(newOffset, img) {
        const maxOffset = 0;
        const minOffset = -(imgNaturalHeight - containerHeight);
        currentOffset = Math.max(minOffset, Math.min(maxOffset, newOffset));
        img.style.top = currentOffset + "px";
        const range = imgNaturalHeight - containerHeight;
        programImagePosition = range > 0 ? ((-currentOffset / range) * 100).toFixed(1) + "%" : "50%";
    }

    function setupDrag() {
        const container = document.getElementById("drag-container");
        const img = document.getElementById("preview-img");

        container.addEventListener("mousedown", (e) => {
            dragStartY = e.clientY;
            dragStartOffset = currentOffset;
            container.classList.add("dragging");

            const onMouseMove = (e) => updateOffset(dragStartOffset + (e.clientY - dragStartY), img);
            const onMouseUp = () => {
                container.classList.remove("dragging");
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        container.addEventListener("touchstart", (e) => {
            dragStartY = e.touches[0].clientY;
            dragStartOffset = currentOffset;

            const onTouchMove = (e) => {
                e.preventDefault();
                updateOffset(dragStartOffset + (e.touches[0].clientY - dragStartY), img);
            };
            const onTouchEnd = () => {
                container.removeEventListener("touchmove", onTouchMove);
                container.removeEventListener("touchend", onTouchEnd);
            };
            container.addEventListener("touchmove", onTouchMove, { passive: false });
            container.addEventListener("touchend", onTouchEnd);
        });
    }

    document.getElementById("save-program-btn").addEventListener("click", () => {
        const name = document.getElementById("program-name-input").value.trim();
        const startDate = document.getElementById("program-start-date").value;
        const numWeeks = parseInt(document.getElementById("program-weeks-input").value);
        const startWeight = parseFloat(document.getElementById("program-start-weight").value);

        if (!name) { alert("Please enter a program name."); return; }
        if (!startDate) { alert("Please enter a start date."); return; }
        if (!numWeeks || numWeeks < 1) { alert("Please enter the number of weeks."); return; }

        const weeks = [];
        for (let i = 1; i <= numWeeks; i++) {
            weeks.push({
                id: Date.now() + i,
                name: `Week ${i}`,
                days: []
            });
        }

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

            programs.push(newProgram);
            savePrograms(programs);

            document.getElementById("new-program-form").classList.add("hidden");
            document.getElementById("create-program-btn").classList.remove("hidden");
            document.getElementById("program-name-input").value = "";
            document.getElementById("program-start-date").value = "";
            document.getElementById("program-weeks-input").value = "";
            document.getElementById("program-start-weight").value = "";
            document.getElementById("program-image-input").value = "";
            document.getElementById("program-image-preview").classList.add("hidden");
            document.getElementById("image-position-selector").classList.add("hidden");

            renderPrograms();
        };

        const imageInput = document.getElementById("program-image-input");
        const file = imageInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => saveProgram(event.target.result);
            reader.readAsDataURL(file);
        } else {
            saveProgram(null);
        }
    });

    // Tab switching
    document.querySelectorAll(".programs-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".programs-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const target = tab.dataset.tab;
            document.getElementById("my-programs-tab").classList.toggle("hidden", target !== "my-programs");
            document.getElementById("templates-tab").classList.toggle("hidden", target !== "templates");

            if (target === "templates") {
                renderTemplatesList(programs, () => {
                    renderPrograms();
                    document.querySelectorAll(".programs-tab")[0].click();
                });
            }
        });
    });
}

export function renderPrograms() {
    const container = document.getElementById("my-programs-tab");
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
                savePrograms(programs);
                renderPrograms();
            });

            card.addEventListener("click", () => openProgram(program));
            const myProgramsTab = document.getElementById("my-programs-tab");
            myProgramsTab.insertBefore(card, document.getElementById("create-program-btn"));
        });
    }
}

export function openProgram(program) {
    let currentProgram = program;

    document.getElementById("programs-screen").classList.add("hidden");
    document.getElementById("program-detail-screen").classList.remove("hidden");

    const nameEl = document.getElementById("program-detail-name");
    nameEl.innerHTML = `
        <span id="program-name-display">${program.name} <button id="edit-program-name-btn">✏️</button></span>
        <span id="program-name-edit" class="hidden">
            <input type="text" id="program-name-edit-input" value="${program.name}" style="width:200px; padding:6px 10px; font-size:15px; border:1px solid var(--border-color); border-radius:8px; background:var(--bg-card); color:var(--text-primary);" />
            <button id="save-program-name-btn">Save</button>
            <button id="cancel-program-name-btn">Cancel</button>
        </span>
    `;

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
        <p style="color:var(--text-secondary); font-size:13px;">Started: ${program.startDate} · ${program.weeks.length} weeks · Start weight: ${program.startWeight || "—"}kg ${program.endWeight ? "· End weight: " + program.endWeight + "kg" : ""}</p>
        <button id="edit-details-btn" style="margin-top:8px; padding:8px 16px; background:none; border:1px solid var(--border-color); border-radius:8px; font-size:13px; color:var(--text-secondary); cursor:pointer;">Edit details</button>
        <button id="save-template-btn" style="margin-top:8px; margin-left:8px; padding:8px 16px; background:none; border:1px solid var(--accent-gold); border-radius:8px; font-size:13px; color:var(--accent-gold); cursor:pointer;">Save as template</button>
    `;

    document.getElementById("back-to-programs-btn").addEventListener("click", () => {
        document.getElementById("program-detail-screen").classList.add("hidden");
        document.getElementById("programs-screen").classList.remove("hidden");
    });

    document.getElementById("edit-program-name-btn").addEventListener("click", () => {
        document.getElementById("program-name-display").classList.add("hidden");
        document.getElementById("program-name-edit").classList.remove("hidden");
        document.getElementById("program-name-edit-input").focus();
    });

    document.getElementById("cancel-program-name-btn").addEventListener("click", () => {
        document.getElementById("program-name-edit").classList.add("hidden");
        document.getElementById("program-name-display").classList.remove("hidden");
    });

    document.getElementById("save-program-name-btn").addEventListener("click", () => {
        const newName = document.getElementById("program-name-edit-input").value.trim();
        if (newName === "") { alert("Please enter a program name."); return; }
        program.name = newName;
        savePrograms(programs);
        openProgram(program);
    });

    document.getElementById("edit-details-btn").addEventListener("click", () => {
        const form = document.getElementById("edit-program-details-form");
        form.classList.remove("hidden");
        document.getElementById("edit-program-name").value = program.name;
        document.getElementById("edit-program-start-date").value = program.startDate;
        document.getElementById("edit-program-weeks").value = program.weeks.length;
        document.getElementById("edit-program-start-weight").value = program.startWeight || "";
        document.getElementById("edit-program-end-weight").value = program.endWeight || "";
    });

    document.getElementById("save-template-btn").addEventListener("click", () => {
    saveAsTemplate(program);
    });

    document.getElementById("cancel-program-details-btn").addEventListener("click", () => {
        document.getElementById("edit-program-details-form").classList.add("hidden");
    });

    document.getElementById("save-program-details-btn").addEventListener("click", () => {
        const newName = document.getElementById("edit-program-name").value.trim();
        const newStartDate = document.getElementById("edit-program-start-date").value;
        const newNumWeeks = parseInt(document.getElementById("edit-program-weeks").value);
        const newStartWeight = parseFloat(document.getElementById("edit-program-start-weight").value);
        const newEndWeight = parseFloat(document.getElementById("edit-program-end-weight").value);

        if (!newName) { alert("Please enter a program name."); return; }
        if (!newStartDate) { alert("Please enter a start date."); return; }
        if (!newNumWeeks || newNumWeeks < 1) { alert("Please enter the number of weeks."); return; }

        program.name = newName;
        program.startDate = newStartDate;
        program.startWeight = newStartWeight || null;
        program.endWeight = newEndWeight || null;

        const currentWeeks = program.weeks.length;
        if (newNumWeeks > currentWeeks) {
            for (let i = currentWeeks + 1; i <= newNumWeeks; i++) {
                program.weeks.push({
                    id: Date.now() + i,
                    name: `Week ${i}`,
                    days: []
                });
            }
        } else if (newNumWeeks < currentWeeks) {
            const confirm = window.confirm(`This will remove the last ${currentWeeks - newNumWeeks} week(s) and all their data. Are you sure?`);
            if (!confirm) return;
            program.weeks = program.weeks.slice(0, newNumWeeks);
        }

        savePrograms(programs);
        renderPrograms();
        document.getElementById("edit-program-details-form").classList.add("hidden");
        openProgram(program);
    });

    // Change cover image
    document.getElementById("change-cover-input").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
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

            const info = document.getElementById("program-detail-info");
            const existing = document.getElementById("change-cover-preview");
            if (existing) existing.remove();
            info.insertAdjacentElement("afterend", dragPreview);

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

            document.getElementById("confirm-change-btn").addEventListener("click", () => {
                const range = changeImgHeight - changeContainerHeight;
                const position = range > 0 ? ((-changeCurrentOffset / range) * 100).toFixed(1) + "%" : "50%";
                program.coverImage = event.target.result;
                program.coverPosition = position;
                savePrograms(programs);
                document.getElementById("change-cover-preview").remove();
                renderPrograms();
                openProgram(program);
            });

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
            savePrograms(programs);
            renderPrograms();
            openProgram(program);
        });
    }

    import('./weeks.js').then(({ renderWeeks }) => {
        renderWeeks(program, programs);
    });
}