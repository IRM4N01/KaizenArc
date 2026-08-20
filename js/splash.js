// ======= SPLASH SCREEN =======
import { getUserName, saveUserName } from './storage.js';
import { initOnboarding } from './onboarding.js';

export function initSplash(onComplete) {
    const userName = getUserName();

    if (!userName) {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("name-entry-screen").classList.remove("hidden");

        document.getElementById("save-name-btn").addEventListener("click", () => {
            const name = document.getElementById("user-name-input").value.trim();
            if (!name) { alert("Please enter your name!"); return; }
            saveUserName(name);
            document.getElementById("name-entry-screen").classList.add("hidden");
            showSplash(name, onComplete);
        });

        document.getElementById("user-name-input").addEventListener("keydown", (e) => {
            if (e.key === "Enter") document.getElementById("save-name-btn").click();
        });

    } else {
        showSplash(userName, onComplete);
    }
}

function showSplash(name, onComplete) {
    const splash = document.getElementById("splash-screen");
    splash.style.display = "flex";
    document.getElementById("splash-welcome").textContent = "Train. Grow. Repeat.";

    setTimeout(() => {
        splash.classList.add("fade-out");
        setTimeout(() => {
            splash.style.display = "none";
            // Show onboarding before starting app
            initOnboarding(onComplete);
        }, 600);
    }, 2000);
}