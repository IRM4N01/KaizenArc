// ======= ONBOARDING =======
import { launchTour } from './tour.js';

export function initOnboarding(onComplete) {
    const hasSeenOnboarding = localStorage.getItem("onboardingComplete");
    if (hasSeenOnboarding) {
        onComplete();
        return;
    }
    showOnboarding(onComplete);
}

export function showOnboarding(onComplete) {
    const screen = document.getElementById("onboarding-screen");
    screen.classList.remove("hidden");

    // Reset to first slide
    let currentSlide = 0;
    const slides = document.querySelectorAll(".onboarding-slide");
    const dots = document.querySelectorAll(".onboarding-dot");
    const nextBtn = document.getElementById("onboarding-next");
    const skipBtn = document.getElementById("onboarding-skip");

    // Reset all slides and dots
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[0].classList.add("active");
    dots[0].classList.add("active");
    nextBtn.textContent = "Next";

    // Hide tour prompt if visible
    const tourPrompt = document.getElementById("tour-prompt");
    if (tourPrompt) tourPrompt.classList.add("hidden");

    // Remove old listeners by cloning buttons
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    const newSkipBtn = skipBtn.cloneNode(true);
    skipBtn.parentNode.replaceChild(newSkipBtn, skipBtn);

    function goToSlide(index) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        currentSlide = index;
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");

        if (currentSlide === slides.length - 1) {
            document.getElementById("onboarding-next").textContent = "Get started";
        } else {
            document.getElementById("onboarding-next").textContent = "Next";
        }
    }

    document.getElementById("onboarding-next").addEventListener("click", () => {
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        } else {
            // Show the "take a tour?" prompt
            showTourPrompt(screen, onComplete);
        }
    });

    document.getElementById("onboarding-skip").addEventListener("click", () => {
        completeOnboarding(screen, onComplete);
    });
}

function showTourPrompt(screen, onComplete) {
    // Swap slides area for the tour prompt
    document.getElementById("onboarding-slides").classList.add("hidden");
    document.getElementById("onboarding-dots").classList.add("hidden");
    document.getElementById("onboarding-buttons").classList.add("hidden");

    const tourPrompt = document.getElementById("tour-prompt");
    tourPrompt.classList.remove("hidden");

    // Wire buttons (clone to clear any previous listeners)
    const yesBtn = document.getElementById("tour-yes-btn");
    const noBtn = document.getElementById("tour-no-btn");

    const newYes = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYes, yesBtn);
    const newNo = noBtn.cloneNode(true);
    noBtn.parentNode.replaceChild(newNo, noBtn);

    document.getElementById("tour-yes-btn").addEventListener("click", () => {
        completeOnboarding(screen, onComplete);
        // Brief delay so the app is visible before tour starts
        setTimeout(() => launchTour(), 300);
    });

    document.getElementById("tour-no-btn").addEventListener("click", () => {
        completeOnboarding(screen, onComplete);
    });
}

function completeOnboarding(screen, onComplete) {
    localStorage.setItem("onboardingComplete", "true");
    screen.classList.add("hidden");
    // Reset hidden state for next time showOnboarding is called
    document.getElementById("onboarding-slides").classList.remove("hidden");
    document.getElementById("onboarding-dots").classList.remove("hidden");
    document.getElementById("onboarding-buttons").classList.remove("hidden");
    const tourPrompt = document.getElementById("tour-prompt");
    if (tourPrompt) tourPrompt.classList.add("hidden");
    onComplete();
}