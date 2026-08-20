// ======= LIFTS =======
import { getLiftMaxes, saveLiftMaxes, getPersonalRecords, savePersonalRecords } from './storage.js';

const defaultLifts = [
    { key: "bench", name: "Bench Press", max: 0, percentages: [25, 50, 75, 100], isCustom: false },
    { key: "squat", name: "Squat", max: 0, percentages: [25, 50, 75, 100], isCustom: false },
    { key: "deadlift", name: "Deadlift", max: 0, percentages: [25, 50, 75, 100], isCustom: false },
    { key: "ohp", name: "Overhead Press", max: 0, percentages: [25, 50, 75, 100], isCustom: false }
];

// Load saved maxes and merge with defaults
const savedMaxes = getLiftMaxes();
const savedPercentages = JSON.parse(localStorage.getItem("liftPercentages")) || {};
const savedCustomLifts = JSON.parse(localStorage.getItem("customLifts")) || [];

export const lifts = [
    ...defaultLifts.map(lift => ({
        ...lift,
        max: savedMaxes[lift.key] !== undefined ? savedMaxes[lift.key] : lift.max,
        percentages: savedPercentages[lift.key] || lift.percentages
    })),
    ...savedCustomLifts
];

export function initLifts() {
    const liftsContainer = document.getElementById("lifts-container");
    const liftDetail = document.getElementById("lift-detail");

    document.getElementById("back-btn").addEventListener("click", () => {
        liftDetail.classList.add("hidden");
        liftsContainer.classList.remove("hidden");
    });

    renderLiftCards();
}

export function renderLiftCards() {
    const liftsContainer = document.getElementById("lifts-container");
    liftsContainer.innerHTML = "";

    lifts.forEach(lift => {
        const card = document.createElement("div");
        card.classList.add("lift-card");
        card.innerHTML = `
            <h2>${lift.name}</h2>
            <p>${lift.max > 0 ? lift.max + "kg" : "—"}</p>
            ${lift.max === 0 ? `<span style="font-size:11px; color:var(--text-secondary);">Tap to set your 1RM</span>` : ""}
        `;
        card.addEventListener("click", () => {
            showPercentages(lift);
        });
        liftsContainer.appendChild(card);
    });

    // Add lift button at the end
    const addBtn = document.createElement("div");
    addBtn.classList.add("lift-card", "add-lift-card");
    addBtn.innerHTML = `<p style="font-size:24px; color:var(--accent-gold);">+</p><h2>Add Lift</h2>`;
    addBtn.addEventListener("click", () => {
        showAddLiftForm();
    });
    liftsContainer.appendChild(addBtn);
}

function showPercentages(lift) {
    const liftsContainer = document.getElementById("lifts-container");
    const liftDetail = document.getElementById("lift-detail");

    liftsContainer.classList.add("hidden");
    liftDetail.classList.remove("hidden");

    // Show lift name with delete button for custom lifts
    const detailName = document.getElementById("detail-name");
    if (lift.isCustom) {
        detailName.innerHTML = `
        ${lift.name}
        <button id="delete-lift-btn" style="margin-left:12px; padding:4px 10px; background:none; border:1px solid rgba(192,57,43,0.4); border-radius:8px; font-size:12px; color:var(--accent-red); cursor:pointer;">Delete lift</button>
        `;
        document.getElementById("delete-lift-btn").addEventListener("click", () => {
            const confirm = window.confirm(`Delete ${lift.name}? This cannot be undone.`);
            if (!confirm) return;
            const index = lifts.findIndex(l => l.key === lift.key);
            if (index !== -1) lifts.splice(index, 1);
            saveLiftData();
            renderLiftCards();
            document.getElementById("lift-detail").classList.add("hidden");
            document.getElementById("lifts-container").classList.remove("hidden");
        });
    } else {
        detailName.textContent = lift.name;
    }

    document.getElementById("detail-max").textContent = lift.max > 0 ? "1RM: " + lift.max + "kg" : "1RM not set";

    renderPercentageTable(lift);

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

    // Personal record history
    const records = getPersonalRecords();
    const liftRecords = records[lift.key] || [];

    const existingHistory = document.getElementById("pr-history");
    if (existingHistory) existingHistory.remove();

    const prHistory = document.createElement("div");
    prHistory.id = "pr-history";

    if (liftRecords.length === 0) {
        prHistory.innerHTML = `
            <h3 style="margin: 24px 0 12px;">Personal Record History</h3>
            <p style="color:var(--text-secondary);">No records yet — update your 1RM to start tracking.</p>
        `;
    } else {
        const rows = liftRecords.slice().reverse().map((r, i) => `
            <tr>
                <td style="padding:10px 0; border-bottom:1px solid var(--border-color); font-size:15px;">${r.date}</td>
                <td style="padding:10px 0; border-bottom:1px solid var(--border-color); color:var(--accent-gold); font-weight:500; font-size:15px;">${r.max}kg</td>
                ${i === 0 ? `<td style="padding:10px 0; border-bottom:1px solid var(--border-color); color:var(--accent-gold); font-size:12px;">Current</td>` : "<td></td>"}
            </tr>
        `).join("");

        prHistory.innerHTML = `
            <h3 style="margin: 24px 0 12px;">Personal Record History</h3>
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr>
                        <th style="text-align:left; font-size:13px; color:var(--text-secondary); padding:8px 0; border-bottom:1px solid var(--border-color);">Date</th>
                        <th style="text-align:left; font-size:13px; color:var(--text-secondary); padding:8px 0; border-bottom:1px solid var(--border-color);">1RM</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
    }

    liftDetail.appendChild(prHistory);
}

function renderPercentageTable(lift) {
    const pctBody = document.getElementById("pct-body");
    pctBody.innerHTML = "";

    // Remove existing add percentage form if any
    const existingForm = document.getElementById("add-pct-form");
    if (existingForm) existingForm.remove();

    if (lift.max === 0) {
        pctBody.innerHTML = `
            <tr><td colspan="3" style="color:var(--text-secondary); padding:16px 0;">
                Set your 1RM above to see percentage calculations.
            </td></tr>
        `;
    } else {
        lift.percentages.sort((a, b) => a - b).forEach(pct => {
            const weight = Math.round(lift.max * pct / 100 * 4) / 4;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td style="padding:10px 0; border-bottom:1px solid var(--border-color); font-size:15px;">${pct}%</td>
                <td style="padding:10px 0; border-bottom:1px solid var(--border-color); color:var(--accent-gold); font-weight:500; font-size:15px;">${weight}kg</td>
                <td style="padding:10px 0; border-bottom:1px solid var(--border-color); text-align:right;">
                    <button class="delete-pct-btn" data-pct="${pct}" style="background:none; border:none; color:var(--accent-red); cursor:pointer; font-size:13px;">✕</button>
                </td>
            `;
            row.querySelector(".delete-pct-btn").addEventListener("click", () => {
                deleteLiftPercentage(lift, pct);
            });
            pctBody.appendChild(row);
        });
    }

    // Add custom percentage form
    const addPctForm = document.createElement("div");
    addPctForm.id = "add-pct-form";
    addPctForm.style.cssText = "margin-top:16px; display:flex; gap:8px; align-items:center;";
    addPctForm.innerHTML = `
        <input type="number" id="new-pct-input" placeholder="e.g. 45" min="1" max="200" style="width:100px; padding:8px 10px; font-size:14px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:8px; color:var(--text-primary);" />
        <span style="font-size:14px; color:var(--text-secondary);">%</span>
        <button id="add-pct-btn" style="padding:8px 16px; background:var(--accent-gold); color:var(--text-on-gold); border:none; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer;">Add %</button>
    `;

    document.getElementById("update-max-form").insertAdjacentElement("beforebegin", addPctForm);

    document.getElementById("add-pct-btn").addEventListener("click", () => {
        const newPct = parseFloat(document.getElementById("new-pct-input").value);
        if (!newPct || newPct <= 0) {
            alert("Please enter a valid percentage.");
            return;
        }
        if (lift.percentages.includes(newPct)) {
            alert("This percentage already exists.");
            return;
        }
        addLiftPercentage(lift, newPct);
    });
}

function addLiftPercentage(lift, pct) {
    lift.percentages.push(pct);
    saveLiftData();
    renderPercentageTable(lift);
}

function deleteLiftPercentage(lift, pct) {
    lift.percentages = lift.percentages.filter(p => p !== pct);
    saveLiftData();
    renderPercentageTable(lift);
}

function saveLiftData() {
    const savedMaxes = getLiftMaxes();
    const customLifts = lifts.filter(l => l.isCustom);
    const liftPercentages = {};
    lifts.forEach(l => {
        savedMaxes[l.key] = l.max;
        liftPercentages[l.key] = l.percentages;
    });
    saveLiftMaxes(savedMaxes);
    localStorage.setItem("liftPercentages", JSON.stringify(liftPercentages));
    localStorage.setItem("customLifts", JSON.stringify(customLifts));
}

export function updateLiftMax(liftKey, newMax) {
    const lift = lifts.find(l => l.key === liftKey);
    if (!lift) return;

    lift.max = newMax;

    // Save new max
    const savedMaxes = getLiftMaxes();
    savedMaxes[liftKey] = newMax;
    saveLiftMaxes(savedMaxes);

    // Log personal record
    const records = getPersonalRecords();
    if (!records[liftKey]) records[liftKey] = [];
    records[liftKey].push({
        max: newMax,
        date: new Date().toLocaleDateString("en-AU")
    });
    savePersonalRecords(records);

    renderLiftCards();
}

export function getCurrentLiftMax() {
    const select = document.getElementById("compound-select");
    const lift = lifts.find(l => l.key === select.value);
    return lift ? lift.max : 0;
}

export function populateCompoundSelect() {
    const select = document.getElementById("compound-select");
    select.innerHTML = "";
    lifts.forEach(lift => {
        const option = document.createElement("option");
        option.value = lift.key;
        option.textContent = `${lift.name} (1RM: ${lift.max}kg)`;
        select.appendChild(option);
    });
}

function showAddLiftForm() {
    const liftsContainer = document.getElementById("lifts-container");
    const liftDetail = document.getElementById("lift-detail");

    liftsContainer.classList.add("hidden");
    liftDetail.classList.remove("hidden");

    // Clear existing content
    document.getElementById("detail-name").textContent = "Add New Lift";
    document.getElementById("detail-max").textContent = "";
    document.getElementById("pct-body").innerHTML = "";
    document.getElementById("update-max-form").classList.add("hidden");

    const existingHistory = document.getElementById("pr-history");
    if (existingHistory) existingHistory.remove();

    const existingForm = document.getElementById("add-pct-form");
    if (existingForm) existingForm.remove();

    const existingAddForm = document.getElementById("new-lift-form");
    if (existingAddForm) existingAddForm.remove();

    const form = document.createElement("div");
    form.id = "new-lift-form";
    form.innerHTML = `
        <label style="display:block; font-size:13px; color:var(--text-secondary); margin:16px 0 4px;">Lift name</label>
        <input type="text" id="new-lift-name" placeholder="e.g. Romanian Deadlift" style="width:100%; padding:12px; font-size:15px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:10px; color:var(--text-primary); box-sizing:border-box;" />
        
        <label style="display:block; font-size:13px; color:var(--text-secondary); margin:12px 0 4px;">Current 1RM (kg)</label>
        <input type="number" id="new-lift-max" placeholder="e.g. 100" style="width:100%; padding:12px; font-size:15px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:10px; color:var(--text-primary); box-sizing:border-box;" />
        
        <button id="save-new-lift-btn" style="width:100%; padding:13px; background:var(--accent-gold); color:var(--text-on-gold); border:none; border-radius:10px; font-size:15px; font-weight:500; margin-top:16px; cursor:pointer;">Add Lift</button>
        <button id="cancel-new-lift-btn" style="width:100%; padding:13px; background:none; color:var(--text-secondary); border:1px solid var(--border-color); border-radius:10px; font-size:15px; margin-top:8px; cursor:pointer;">Cancel</button>
    `;

    liftDetail.appendChild(form);

    document.getElementById("cancel-new-lift-btn").addEventListener("click", () => {
        liftDetail.classList.add("hidden");
        liftsContainer.classList.remove("hidden");
        form.remove();
        document.getElementById("update-max-form").classList.remove("hidden");
    });

    document.getElementById("save-new-lift-btn").addEventListener("click", () => {
        const name = document.getElementById("new-lift-name").value.trim();
        const max = parseFloat(document.getElementById("new-lift-max").value) || 0;

        if (!name) {
            alert("Please enter a lift name.");
            return;
        }

        const newLift = {
            key: name.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now(),
            name,
            max,
            percentages: [25, 50, 75, 100],
            isCustom: true
        };

        lifts.push(newLift);
        saveLiftData();
        renderLiftCards();

        liftDetail.classList.add("hidden");
        liftsContainer.classList.remove("hidden");
        form.remove();
        document.getElementById("update-max-form").classList.remove("hidden");
    });
}