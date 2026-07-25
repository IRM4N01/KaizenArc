// ======= LIFTS =======
import { getLiftMaxes, saveLiftMaxes, getPersonalRecords, savePersonalRecords } from './storage.js';

const defaultLifts = [
    { key: "bench", name: "Bench Press", max: 100, percentages: [95, 92.5, 90, 87.5, 85, 82.5, 80, 77.5, 75, 72.5, 70, 67.5, 60, 55, 50, 45, 40] },
    { key: "squat", name: "Squat", max: 120, percentages: [95, 92.5, 90, 87.5, 85, 82.5, 80, 77.5, 75, 72.5, 70, 65, 60, 55, 50, 30] },
    { key: "deadlift", name: "Deadlift", max: 150, percentages: [95, 92.5, 90, 87.5, 85, 82.5, 80, 77.5, 75, 70, 67.5, 65, 60, 55, 50, 30] },
    { key: "ohp", name: "Overhead Press", max: 50, percentages: [82.5, 80, 75, 72.5, 70, 60, 55, 50] }
];

// Load saved maxes and merge with defaults
const savedMaxes = getLiftMaxes();
export const lifts = defaultLifts.map(lift => ({
    ...lift,
    max: savedMaxes[lift.key] !== undefined ? savedMaxes[lift.key] : lift.max
}));

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
            <p>${lift.max}kg</p>
        `;
        card.addEventListener("click", () => {
            showPercentages(lift);
        });
        liftsContainer.appendChild(card);
    });
}

function showPercentages(lift) {
    const liftsContainer = document.getElementById("lifts-container");
    const liftDetail = document.getElementById("lift-detail");

    liftsContainer.classList.add("hidden");
    liftDetail.classList.remove("hidden");

    document.getElementById("detail-name").textContent = lift.name;
    document.getElementById("detail-max").textContent = "1RM: " + lift.max + "kg";

    const pctBody = document.getElementById("pct-body");
    pctBody.innerHTML = "";

    lift.percentages.forEach(pct => {
        const weight = Math.round(lift.max * pct / 100 * 4) / 4;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pct}%</td>
            <td>${weight}kg</td>
        `;
        pctBody.appendChild(row);
    });

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

    // Show personal record history
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
                <td>${r.date}</td>
                <td style="color:var(--accent-gold); font-weight:500;">${r.max}kg</td>
                ${i === 0 ? `<td style="color:var(--accent-gold); font-size:12px;">Current</td>` : "<td></td>"}
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