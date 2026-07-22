// ======= LIFTS =======
import { getLiftMaxes, saveLiftMaxes } from './storage.js';

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
}

export function updateLiftMax(liftKey, newMax) {
    const lift = lifts.find(l => l.key === liftKey);
    if (!lift) return;

    lift.max = newMax;

    const savedMaxes = getLiftMaxes();
    savedMaxes[liftKey] = newMax;
    saveLiftMaxes(savedMaxes);

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