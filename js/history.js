// ======= WORKOUT HISTORY =======
import { getWorkoutHistory, saveWorkoutHistory } from './storage.js';

const PAGE_SIZE = 10;
let currentPage = 1;
let currentSearch = "";
let currentFilter = "all";

export function initHistory() {
    renderHistory();
    initHistoryControls();
}

function initHistoryControls() {
    const searchInput = document.getElementById("history-search");
    const filterSelect = document.getElementById("history-filter");
    const loadMoreBtn = document.getElementById("load-more-btn");

    if (!searchInput) return;

    // Populate filter dropdown with program names
    populateProgramFilter();

    searchInput.addEventListener("input", () => {
        currentSearch = searchInput.value.toLowerCase().trim();
        currentPage = 1;
        renderHistory();
    });

    filterSelect.addEventListener("change", () => {
        currentFilter = filterSelect.value;
        currentPage = 1;
        renderHistory();
    });

    loadMoreBtn.addEventListener("click", () => {
        currentPage++;
        renderHistory();
    });
}

function populateProgramFilter() {
    const history = getWorkoutHistory();
    const filterSelect = document.getElementById("history-filter");
    if (!filterSelect) return;

    const programs = [...new Set(history.map(e => e.programName))];

    filterSelect.innerHTML = '<option value="all">All programs</option>';
    programs.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        filterSelect.appendChild(option);
    });
}

export function addWorkoutToHistory(day, week, program, note) {
    const history = getWorkoutHistory();

    const entry = {
        id: Date.now(),
        date: day.completedDate || new Date().toLocaleDateString("en-AU"),
        programName: program.name,
        weekName: week.name,
        dayNotes: day.notes || "",
        note: note || "",
        exercises: day.exercises.map(ex => {
            if (ex.type === "compound") {
                return {
                    type: "compound",
                    name: ex.name,
                    warmupSets: ex.warmupSets.map(s => ({
                        pct: s.pct,
                        weight: s.weight,
                        done: s.done || false
                    })),
                    workingSets: ex.workingSets,
                    reps: ex.reps,
                    workingPct: ex.workingPct,
                    workingWeight: ex.workingWeight,
                    workingSetsDone: ex.workingSetsDone || []
                };
            } else {
                return {
                    type: "accessory",
                    name: ex.name,
                    warmupSets: ex.warmupSets || 0,
                    workingSets: ex.workingSets,
                    reps: ex.reps,
                    weight: ex.weight,
                    notes: ex.notes || ""
                };
            }
        })
    };

    history.unshift(entry);
    return history;
}

export function renderHistory() {
    const history = getWorkoutHistory();
    const container = document.getElementById("history-list");
    const noMsg = document.getElementById("no-history-msg");
    const loadMoreBtn = document.getElementById("load-more-btn");

    if (!container) return;

    // Apply filters
    let filtered = history.filter(entry => {
        const matchesFilter = currentFilter === "all" || entry.programName === currentFilter;
        const matchesSearch = !currentSearch ||
            entry.dayNotes.toLowerCase().includes(currentSearch) ||
            entry.note.toLowerCase().includes(currentSearch) ||
            entry.programName.toLowerCase().includes(currentSearch) ||
            entry.exercises.some(ex => ex.name.toLowerCase().includes(currentSearch));
        return matchesFilter && matchesSearch;
    });

    container.innerHTML = "";

    if (filtered.length === 0) {
        noMsg.classList.remove("hidden");
        loadMoreBtn.classList.add("hidden");
        return;
    }

    noMsg.classList.add("hidden");

    // Paginate
    const visible = filtered.slice(0, currentPage * PAGE_SIZE);

    // Group by month
    const grouped = {};
    visible.forEach((entry, index) => {
        const parts = entry.date.split(".");
        let monthKey = entry.date;

        if (parts.length === 3) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = parseInt(parts[1]) - 1;
            const year = parts[2].length === 2 ? "20" + parts[2] : parts[2];
            monthKey = `${months[month]} ${year}`;
        } else {
            const date = new Date(entry.date);
            if (!isNaN(date)) {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
            }
        }

        if (!grouped[monthKey]) grouped[monthKey] = [];
        grouped[monthKey].push({ entry, originalIndex: history.indexOf(entry) });
    });

    // Render groups
    Object.entries(grouped).forEach(([month, entries]) => {
        const group = document.createElement("div");
        group.classList.add("history-month-group");
        group.innerHTML = `<p class="history-month-label">${month}</p>`;

        entries.forEach(({ entry, originalIndex }) => {
            const card = createHistoryCard(entry, originalIndex);
            group.appendChild(card);
        });

        container.appendChild(group);
    });

    // Load more button
    if (filtered.length > currentPage * PAGE_SIZE) {
        loadMoreBtn.classList.remove("hidden");
    } else {
        loadMoreBtn.classList.add("hidden");
    }

    // Refresh filter dropdown
    populateProgramFilter();
}

function createHistoryCard(entry, index) {
    const card = document.createElement("div");
    card.classList.add("history-card");

    const exerciseHTML = entry.exercises.map(ex => {
        if (ex.type === "compound") {
            return `
                <div class="history-exercise">
                    <span class="history-ex-name">${ex.name}</span>
                    <span class="history-ex-detail">${ex.warmupSets.length} warmup · ${ex.workingSets} × ${ex.reps} reps @ ${ex.workingPct}% → ${ex.workingWeight}kg</span>
                </div>
            `;
        } else {
            return `
                <div class="history-exercise">
                    <span class="history-ex-name">${ex.name}</span>
                    <span class="history-ex-detail">${ex.workingSets} × ${ex.reps} reps @ ${ex.weight}kg</span>
                </div>
            `;
        }
    }).join("");

    card.innerHTML = `
        <div class="history-card-header">
            <div>
                <h3 class="history-date">${entry.date}</h3>
                <p class="history-meta">${entry.programName} · ${entry.weekName}${entry.dayNotes ? " · " + entry.dayNotes : ""}</p>
            </div>
            <button class="history-delete-btn">✕</button>
        </div>
        ${entry.note ? `<p class="history-note">💬 ${entry.note}</p>` : ""}
        <div class="history-exercises">${exerciseHTML}</div>
    `;

    card.querySelector(".history-delete-btn").addEventListener("click", () => {
        const confirm = window.confirm("Delete this workout from history?");
        if (!confirm) return;
        const history = getWorkoutHistory();
        history.splice(index, 1);
        saveWorkoutHistory(history);
        renderHistory();
    });

    return card;
}