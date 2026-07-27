# Kaizen Arc 🥋

A personal gym tracking progressive web app (PWA) built with HTML, CSS, and vanilla JavaScript.

## About

Kaizen Arc was built to replace the notes app as a way to plan and track structured lifting programs. Named after the Japanese philosophy of continuous improvement, it lets you manage your 1RM personal bests, plan training programs week by week, follow along during workout sessions, and look up exercise form — all from your phone home screen like a native app.

## Features

### Lifts
- Track 1RM personal bests for Bench Press, Squat, Deadlift, and Overhead Press
- Automatic percentage breakdowns based on your current 1RM
- Update your 1RM anytime — all percentages recalculate automatically
- Personal record history with dates so you can track your progression over time
- Compound lift dropdown always shows your current 1RM when planning workouts

### Programs
- Create training programs with a name, start date, number of weeks, and starting bodyweight
- Upload a cover image with drag-to-reposition functionality
- Auto-generated week structure based on program length
- Rename, edit details, or delete programs at any time
- Add or change cover images after a program is created

### Weekly Planning
- Plan each week with workout and rest days
- Add a date and optional notes to each day
- Rest days and workout days are visually distinguished with badges
- Week cards show workout count, rest day count, and completed count

### Workout Days
- Add compound exercises linked to your 1RM with auto-calculated warm up and working set percentages
- Warm up percentages are auto-suggested based on number of sets but fully editable
- Add accessory exercises with custom sets, reps, and weight
- Exercise search with descriptions — type an exercise name and get instant suggestions from the built-in database
- YouTube tutorial link for every exercise
- Edit or delete any exercise at any time

### Workout Tracker
- Start a workout and tick off each set as you complete it
- Progress counter updates in real time
- Rest timer per exercise — set a custom rest time in seconds with sound alert when time is up
- Exercise info button on each exercise card — tap to see form instructions and YouTube link mid-session
- Mark a day as complete — completion date is automatically logged
- Completed days show a gold badge with the date
- Sound and vibration toggles for rest timer alerts

### Exercise Database
- Built-in database of 60+ exercises covering all major muscle groups
- Instant search — no internet required
- Each exercise includes muscle group, difficulty level, and detailed instructions
- YouTube tutorial link for every exercise
- Easily extendable — add your own exercises to the database

## Built With

- HTML
- CSS (modular — split across multiple files)
- JavaScript (vanilla, ES6 modules)
- localStorage for data persistence
- Progressive Web App (PWA) — installable on iPhone via Safari
- Web Audio API for rest timer sound alerts

## Project Structure

KaizenArc/
├── index.html
├── manifest.json
├── service-worker.js
├── TROUBLESHOOT.md
├── README.md
├── Kaizen-Arc-Logo.png
├── icons/
│ ├── icon-192.png
│ ├── icon-512.png
│ └── apple-touch-icon.png
├── css/
│ ├── main.css
│ ├── nav.css
│ ├── lifts.css
│ ├── programs.css
│ ├── days.css
│ ├── exercises.css
│ ├── workout.css
│ └── splash.css
└── js/
├── app.js
├── storage.js
├── splash.js
├── lifts.js
├── programs.js
├── weeks.js
├── days.js
├── exercises.js
├── workout.js
├── exerciseSearch.js
└── exerciseData.js

## How To Run

### In the browser
1. Clone or download the repository
2. Open with Live Server in VS Code (required for ES modules)
3. No installations or dependencies required

### On iPhone (PWA)
1. Open Safari and go to the live URL
2. Tap the Share button
3. Tap Add to Home Screen
4. Kaizen Arc will appear on your home screen like a native app

## Live App
[https://irmanwibawa.github.io/KaizenArc](https://irmanwibawa.github.io/KaizenArc)

## Troubleshooting
See `TROUBLESHOOT.md` for a step-by-step guide if the app doesn't update after a push.

## Status

✅ Core features complete — actively used and improved based on real gym usage.