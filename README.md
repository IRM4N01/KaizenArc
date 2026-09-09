# Kaizen Arc 🥋

A personal gym tracking progressive web app (PWA) built with HTML, CSS, and vanilla JavaScript.

## About

Kaizen Arc was built to replace the notes app as a way to plan and track structured lifting programs. Named after the Japanese philosophy of continuous improvement, it lets you manage your 1RM personal bests, plan training programs week by week, follow along during workout sessions, and look up exercise form — all from your phone home screen like a native app.

> Currently under active development and being tested daily in real gym sessions. Features and UI are being continuously improved based on real world usage.

## Features

### Home Dashboard
- Personalised welcome screen with active program overview
- Program progress bar showing completion percentage
- Before and after progress photos
- Lift summary with current 1RMs at a glance
- Quick "Continue" button to jump straight to current week

### Lifts
- Track 1RM personal bests for the 4 main compound lifts and any custom lifts
- Add custom lifts with your own name and max
- Automatic percentage breakdowns based on your current 1RM
- Flexible percentage system — add or remove percentages per lift
- Update your 1RM anytime — all percentages recalculate automatically
- Personal record history with dates to track progression over time

### Programs
- Create training programs with a name, start date, number of weeks and starting bodyweight
- Upload a cover image with drag-to-reposition functionality
- Auto-generated week structure based on program length
- Rename, edit details or delete programs at any time
- Save any program as a template to reuse later
- Starter programs available for beginners, intermediate and advanced lifters

### Weekly Planning
- Plan each week with workout and rest days
- Add a date and optional notes to each day
- Edit day dates and notes after creation
- Reorder days within a week using up/down buttons
- Tick off rest days when completed
- Finish Week button unlocks when all days are completed
- Week cards show workout count, rest day count and completed count

### Workout Days
- Add compound exercises linked to your 1RM with auto-calculated warm up and working set percentages
- Warm up percentages are auto-suggested based on number of sets but fully editable
- Add accessory exercises with custom sets, reps and weight
- Add notes to individual exercises for form cues or reminders
- Exercise search with descriptions — type an exercise name and get instant suggestions from the built-in database of 100+ exercises
- YouTube tutorial link for every exercise
- Edit or delete any exercise at any time

### Workout Tracker
- Start a workout and tick off each set as you complete it
- Progress counter updates in real time
- Rest timer per exercise — set a custom rest time in seconds
- Sound alert when rest timer completes (works alongside music on iPhone)
- Visual alert popup as backup when sound doesn't play
- Exercise info button on each exercise card — tap to see form instructions and YouTube link mid-session
- Mark a day as complete — completion date is automatically logged
- Add a post-workout note when finishing a session
- Completed days show a gold badge with the date

### Workout History
- Full log of completed workouts in reverse chronological order
- Grouped by month for easy scanning
- Filter by program name
- Search by exercise name, day notes or program
- Load more pagination for large history logs
- Delete individual entries

### Onboarding
- 4-slide onboarding flow for new users explaining core features
- Skippable at any point
- Replayable anytime via "View app guide" on the home screen

### Exercise Database
- Built-in database of 100+ exercises covering all major muscle groups
- Instant search — no internet required, works offline
- Each exercise includes muscle group, difficulty level and detailed instructions
- YouTube tutorial link for every exercise
- Easily extendable — add your own exercises to the database

## Built With

- HTML
- CSS (modular — split across multiple files by feature)
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
│ ├── splash.css
│ └── history.css
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
├── home.js
├── history.js
├── templates.js
├── onboarding.js
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

🚧 Under active development — currently being tested daily in real gym sessions. Features and UI are continuously refined based on real world usage. Not yet feature complete.