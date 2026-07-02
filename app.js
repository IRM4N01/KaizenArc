const lifts = [
    { name: "Bench Press", max: 100, percentages: [95, 92.5, 90, 87.5, 85, 82.5, 80, 77.5, 75, 72.5, 70, 67.5, 60, 55, 50, 45, 40] },
    { name: "Squat", max: 120, percentages: [95, 92.5, 90, 87.5, 85, 82.5, 80, 77.5, 75, 72.5, 70, 65, 60, 55, 50, 30] },
    { name: "Deadlift", max: 150, percentages: [95, 92.5, 90, 87.5, 85, 82.5, 80, 77.5, 75, 70, 67.5, 65, 60, 55, 50, 30] },
    { name: "Overhead Press", max: 50, percentages: [82.5, 80, 75, 72.5, 70, 60, 55, 50] }
];

const liftsContainer = document.getElementById("lifts-container");
const liftDetail = document.getElementById("lift-detail");

document.getElementById("back-btn").addEventListener("click", () => {
    liftDetail.classList.add("hidden");
    liftsContainer.classList.remove("hidden");
});

//loop through each lift and create card for it
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

function showPercentages(lift) {
    //Hide the cards, show the detail panel
    liftsContainer.classList.add("hiddren");
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
    })
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

// Program data - will be saved to localStorage
let programs = [];

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

// Save button creates the program
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
    console.log("Program so far:", programs);

    document.getElementById("new-program-form").classList.add("hidden");
    document.getElementById("create-program-btn").classList.remove("hidden");
    document.getElementById("program-name-input").value = "";
});
