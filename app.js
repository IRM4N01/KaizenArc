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
let programs = JSON.parse(localStorage.getItem("programs")) || [];
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

function openProgram(program) {
    //Hide programs screen
    document.getElementById("programs-screen").classList.add("hidden");

    //Show program detail screen
    document.getElementById("program-detail-screen").classList.remove("hidden");
    document.getElementById("program-detail-name").textContent = program.name;
    document.getElementById("program-days-list").innerHTML = "";

    if (program.days.length === 0) {
        document.getElementById("program-days-list").innerHTML = "<p>No days yet. Add your first workout day.</p>";
    }
}

document.getElementById("back-to-programs-btn").addEventListener("click", () => {
    document.getElementById("program-detail-screen").classList.add("hidden");
    document.getElementById("programs-screen").classList.remove("hidden");
});
