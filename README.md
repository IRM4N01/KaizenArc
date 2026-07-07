# Training Arc 🏋️

A personal gym tracking progressive web app (PWA) built with HTML, CSS, and vanilla JavaScript.

## About

Training Arc was built to replace the notes app as a way to plan and track structured lifting programs. It lets you manage your 1RM personal bests, plan training programs week by week, and follow along during workout sessions — all from your phone home screen like a native app.

## Features

### Lifts
- Track 1RM personal bests for Bench Press, Squat, Deadlift, and Overhead Press
- Automatic percentage breakdowns based on your current 1RM
- Update your 1RM anytime — all percentages recalculate automatically
- Compound lift dropdown always shows your current 1RM when planning workouts

### Programs
- Create training programs with a name, start date, number of weeks, and starting bodyweight
- Auto-generated week structure based on program length
- Rename or delete programs at any time

### Weekly Planning
- Plan each week with workout and rest days
- Add a date and optional notes to each day
- Rest days and workout days are visually distinguished with badges
- Week cards show workout count, rest day count, and completed count

### Workout Days
- Add compound exercises linked to your 1RM with auto-calculated warm up and working set percentages
- Warm up percentages are auto-suggested based on number of sets but fully editable
- Add accessory exercises with custom sets, reps, and weight
- Edit or delete any exercise at any time
- Edit workout day names inline

### Workout Tracker
- Start a workout and tick off each set as you complete it
- Progress counter updates in real time
- Mark a day as complete — completion date is automatically logged
- Completed days show a gold badge with the date

## Built With

- HTML
- CSS
- JavaScript (vanilla)
- localStorage for data persistence
- Progressive Web App (PWA) — installable on iPhone via Safari

## How To Run

### In the browser
1. Clone or download the repository
2. Open `index.html` in your browser
3. No installations or dependencies required

### On iPhone (PWA)
1. Open Safari and go to the live URL
2. Tap the Share button
3. Tap Add to Home Screen
4. Training Arc will appear on your home screen like a native app

## Live App
[https://irmanwibawa.github.io/TrainingArc](https://irmanwibawa.github.io/TrainingArc)

## Troubleshooting
See `TROUBLESHOOT.md` for a step-by-step guide if the app doesn't update after a push.

## Status

✅ Core features complete — actively used and improved based on real gym usage.