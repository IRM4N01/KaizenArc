// ============================================================
// STARTER PROGRAMS — Fundamentals Hypertrophy Program
// Jeff Nippard | 3 programs × 4 weeks
//
// This is a 4-week strength base block. Exercises are identical
// across all 4 weeks — progressive overload is achieved by
// adding weight while keeping sets/reps the same.
//
// HOW TO WIRE UP:
//   1. Export this array and import in templates.js
//   2. Render starter cards above user-saved templates
//   3. Starter programs have isStarter:true — block deletion
// ============================================================

function makeDay(name, exercises) {
  return { name, type: "workout", exercises };
}

// ── FULL BODY day builders ───────────────────────────────────
function fbDay1() {
  return makeDay("Full Body #1", [
    { name: "Barbell Squat",             sets: 3, reps: 6,        rest: "3-4 min", notes: "Sit back and down, 15° toe flare, drive knees out laterally" },
    { name: "Barbell Bench Press",    sets: 3, reps: 8,        rest: "3-4 min", notes: "Tuck elbows at 45°, squeeze shoulder blades, stay firm on bench" },
    { name: "Lat Pulldown",           sets: 3, reps: 10,       rest: "2-3 min", notes: "Pull elbows down and in, use 1.5× shoulder-width grip" },
    { name: "Romanian Deadlift",      sets: 3, reps: 10,       rest: "2-3 min", notes: "Maintain neutral lower back, set hips back, don't allow spine to round" },
    { name: "Assisted Dip",           sets: 3, reps: 8,        rest: "1-2 min", notes: "Tuck elbows at 45°, lean torso forward 15°" },
    { name: "Standing Calf Raise",    sets: 3, reps: 10,       rest: "1-2 min", notes: "Press all the way to toes, stretch calves at bottom, don't bounce" },
    { name: "Dumbbell Supinated Curl",sets: 3, reps: 10,       rest: "1-2 min", notes: "Drive your pinky into the handle harder than your pointer finger" },
  ]);
}
function fbDay2() {
  return makeDay("Full Body #2", [
    { name: "Deadlift",                  sets: 3, reps: 5,    rest: "3-4 min", notes: "Brace lats, chest tall, hips high, pull slack out of bar before lifting" },
    { name: "Overhead Press",            sets: 3, reps: 8,    rest: "3-4 min", notes: "Squeeze glutes to keep torso upright, clear head, press up and slightly back" },
    { name: "Chest-Supported T-Bar Row", sets: 3, reps: 12,   rest: "2-3 min", notes: "Squeeze shoulder blades as you pull; keep shoulders down (avoid shrugging)" },
    { name: "Leg Extension",             sets: 3, reps: 12,   rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Cable Flye",                sets: 3, reps: 12,   rest: "1-2 min", notes: "Keep elbows slightly bent at constant angle while squeezing pecs" },
    { name: "Crunch",                    sets: 3, reps: 12,   rest: "1-2 min", notes: "Focus on flexing your spine (rounding back), don't yank head with arms" },
    { name: "Dumbbell Skull Crusher",    sets: 3, reps: 12,   rest: "1-2 min", notes: "Keep elbows in line with top of head, don't let upper arm move" },
  ]);
}
function fbDay3() {
  return makeDay("Full Body #3", [
    { name: "Dumbbell Walking Lunge",    sets: 3, reps: 10,   rest: "2-3 min", notes: "10 steps each leg, take medium strides, let torso lean forward" },
    { name: "Incline Dumbbell Press",    sets: 3, reps: 8,    rest: "2-3 min", notes: "Use ~45° incline, mind-muscle connection with upper pecs" },
    { name: "Reverse-Grip Lat Pulldown", sets: 3, reps: 10,   rest: "2-3 min", notes: "Pull elbows down against your sides, use shoulder-width grip" },
    { name: "Barbell Hip Thrust",        sets: 3, reps: 12,   rest: "2-3 min", notes: "Tuck chin and rib cage down, only move your hips, use a pad" },
    { name: "Seated Face Pull",          sets: 3, reps: 12,   rest: "1-2 min", notes: "Pull arms back and out" },
    { name: "Dumbbell Lateral Raise",    sets: 3, reps: 10,   rest: "1-2 min", notes: "Raise dumbbell 'out' not 'up', mind-muscle connection with middle fibers" },
    { name: "Lying Leg Curl",            sets: 3, reps: 10,   rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
  ]);
}

// ── UPPER/LOWER day builders ─────────────────────────────────
function ulLower1() {
  return makeDay("Lower Body #1", [
    { name: "Barbell Squat",                   sets: 3, reps: 6,   rest: "3-4 min", notes: "Sit back and down, 15° toe flare, drive knees out laterally" },
    { name: "Romanian Deadlift",            sets: 3, reps: 10,  rest: "2-3 min", notes: "Maintain neutral lower back, set hips back, don't allow spine to round" },
    { name: "Barbell Hip Thrust",           sets: 3, reps: 12,  rest: "2-3 min", notes: "Tuck chin and rib cage down, only move your hips, use a pad" },
    { name: "Leg Extension",               sets: 3, reps: 12,  rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Lying Leg Curl",              sets: 3, reps: 12,  rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
    { name: "Machine Seated Hip Abduction",sets: 3, reps: 6,   rest: "1-2 min", notes: "Keep butt in seat, focus on squeezing glutes to make weight move" },
    { name: "Crunch",                      sets: 3, reps: 12,  rest: "1-2 min", notes: "Focus on flexing your spine (rounding back), don't yank head with arms" },
  ]);
}
function ulUpper1() {
  return makeDay("Upper Body #1", [
    { name: "Barbell Bench Press",          sets: 3, reps: 5,   rest: "3-4 min", notes: "Tuck elbows at 45°, squeeze shoulder blades, stay firm on bench" },
    { name: "Lat Pulldown",                 sets: 3, reps: 10,  rest: "2-3 min", notes: "Pull elbows down and in, use 1.5× shoulder-width grip" },
    { name: "Overhead Press",              sets: 3, reps: 10,  rest: "3-4 min", notes: "Squeeze glutes to keep torso upright, clear head, press up and slightly back" },
    { name: "Chest-Supported T-Bar Row",   sets: 3, reps: 12,  rest: "2-3 min", notes: "Squeeze shoulder blades as you pull; keep shoulders down" },
    { name: "Cable Flye",                  sets: 3, reps: 12,  rest: "1-2 min", notes: "Keep elbows slightly bent at constant angle while squeezing pecs" },
    { name: "Dumbbell Supinated Curl",     sets: 3, reps: 10,  rest: "1-2 min", notes: "Drive your pinky into the handle harder than your pointer finger" },
    { name: "Single-Arm Rope Tricep Extension", sets: 3, reps: 12, rest: "1-2 min", notes: "Pull arm behind torso, don't move upper arm" },
  ]);
}
function ulLower2() {
  return makeDay("Lower Body #2", [
    { name: "Deadlift",                    sets: 3, reps: 8,      rest: "3-4 min", notes: "Brace lats, chest tall, hips high, pull slack out of bar before lifting" },
    { name: "Dumbbell Walking Lunge",      sets: 3, reps: 10,     rest: "2-3 min", notes: "10 steps each leg, take medium strides, let torso lean forward" },
    { name: "Single-Leg Leg Extension",   sets: 3, reps: 15,     rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Single-Leg Lying Leg Curl",  sets: 3, reps: 15,     rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
    { name: "Machine Seated Hip Abduction",sets: 3, reps: 15,    rest: "1-2 min", notes: "Keep butt in seat, focus on squeezing glutes to make weight move" },
    { name: "Standing Calf Raise",        sets: 3, reps: 12,     rest: "1-2 min", notes: "Press all the way to toes, stretch calves at bottom, don't bounce" },
    { name: "Plank",                      sets: 3, reps: "20 sec", rest: "1-2 min", notes: "Squeeze glutes, keep hips low" },
  ]);
}
function ulUpper2() {
  return makeDay("Upper Body #2", [
    { name: "Incline Dumbbell Press",       sets: 3, reps: 8,   rest: "2-3 min", notes: "Use ~45° incline, mind-muscle connection with upper pecs" },
    { name: "Reverse-Grip Lat Pulldown",    sets: 3, reps: 8,   rest: "2-3 min", notes: "Pull elbows down against your sides, use shoulder-width grip" },
    { name: "Assisted Dip",               sets: 3, reps: 10,  rest: "2-3 min", notes: "Tuck elbows at 45°, lean torso forward 15°" },
    { name: "Barbell Bent Over Row",       sets: 3, reps: 12,  rest: "2-3 min", notes: "Lean torso over at 45°, keep lower back neutral, double overhand grip" },
    { name: "Dumbbell Lateral Raise",      sets: 3, reps: 15,  rest: "1-2 min", notes: "Raise dumbbell 'out' not 'up', mind-muscle connection with middle fibers" },
    { name: "Seated Face Pull",            sets: 3, reps: 15,  rest: "1-2 min", notes: "Pull arms back and out" },
    { name: "Hammer Curl",                 sets: 3, reps: 8,   rest: "1-2 min", notes: "Neutral grip, prevent upper arm from moving" },
  ]);
}

// ── BODY PART SPLIT day builders ─────────────────────────────
function bpChestTris() {
  return makeDay("Chest & Triceps", [
    { name: "Barbell Bench Press",    sets: 3, reps: 6,   rest: "3-4 min", notes: "Tuck elbows at 45°, squeeze shoulder blades, stay firm on bench" },
    { name: "Incline Dumbbell Press", sets: 3, reps: 8,   rest: "2-3 min", notes: "Use ~45° incline, mind-muscle connection with upper pecs" },
    { name: "Cable Flye",             sets: 3, reps: 12,  rest: "1-2 min", notes: "Keep elbows slightly bent at constant angle while squeezing pecs" },
    { name: "Assisted Dip",           sets: 3, reps: 10,  rest: "1-2 min", notes: "Tuck elbows at 45°, lean torso forward 15°" },
    { name: "Dumbbell Skull Crusher", sets: 3, reps: 12,  rest: "1-2 min", notes: "Keep elbows in line with top of head, don't let upper arm move" },
  ]);
}
function bpLegsAbs1() {
  return makeDay("Legs & Abs", [
    { name: "Barbell Squat",          sets: 3, reps: 6,   rest: "3-4 min", notes: "Sit back and down, 15° toe flare, drive knees out laterally" },
    { name: "Romanian Deadlift",   sets: 3, reps: 8,   rest: "2-3 min", notes: "Maintain neutral lower back, set hips back, don't allow spine to round" },
    { name: "Barbell Hip Thrust",  sets: 3, reps: 12,  rest: "2-3 min", notes: "Tuck chin and rib cage down, only move your hips, use a pad" },
    { name: "Leg Extension",       sets: 3, reps: 12,  rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Leg Curl",            sets: 3, reps: 12,  rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
    { name: "Standing Calf Raise", sets: 2, reps: 8,   rest: "1-2 min", notes: "Press all the way to toes, stretch calves at bottom, don't bounce" },
    { name: "Crunch",              sets: 2, reps: 12,  rest: "1-2 min", notes: "Focus on flexing your spine (rounding back), don't yank head with arms" },
  ]);
}
function bpBackBis() {
  return makeDay("Back & Biceps", [
    { name: "Reverse-Grip Lat Pulldown", sets: 3, reps: 8,  rest: "2-3 min", notes: "Pull elbows down against your sides, use shoulder-width grip" },
    { name: "Cable Seated Row",          sets: 3, reps: 10, rest: "2-3 min", notes: "Use a close grip, drive elbows down and back" },
    { name: "Chest-Supported T-Bar Row", sets: 3, reps: 12, rest: "2-3 min", notes: "Squeeze shoulder blades as you pull; keep shoulders down" },
    { name: "Seated Face Pull",          sets: 3, reps: 15, rest: "1-2 min", notes: "Pull arms back and out" },
    { name: "Dumbbell Supinated Curl",   sets: 3, reps: 12, rest: "1-2 min", notes: "Drive your pinky into the handle harder than your pointer finger" },
  ]);
}
function bpLegsAbs2() {
  return makeDay("Legs & Abs (Heavy)", [
    { name: "Deadlift",                    sets: 3, reps: 5,      rest: "3-4 min", notes: "Brace lats, chest tall, hips high, pull slack out of bar before lifting" },
    { name: "Dumbbell Walking Lunge",      sets: 3, reps: 10,     rest: "2-3 min", notes: "10 steps each leg, take medium strides, let torso lean forward" },
    { name: "Single-Leg Leg Extension",   sets: 2, reps: 15,     rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Single-Leg Lying Leg Curl",  sets: 2, reps: 15,     rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
    { name: "Machine Seated Hip Abduction",sets: 3, reps: 15,    rest: "1-2 min", notes: "Keep butt in seat, focus on squeezing glutes to make weight move" },
    { name: "Standing Calf Raise",        sets: 2, reps: 12,     rest: "1-2 min", notes: "Press all the way to toes, stretch calves at bottom, don't bounce" },
    { name: "Plank",                      sets: 3, reps: "20 sec", rest: "1-2 min", notes: "Squeeze glutes, keep hips low" },
  ]);
}
function bpShouldersArms() {
  return makeDay("Shoulders & Arms", [
    { name: "Overhead Press",               sets: 3, reps: 6,   rest: "3-4 min", notes: "Squeeze glutes to keep torso upright, clear head, press up and slightly back" },
    { name: "Dumbbell Lateral Raise",       sets: 3, reps: 12,  rest: "1-2 min", notes: "Raise dumbbell 'out' not 'up', mind-muscle connection with middle fibers" },
    { name: "Cable Reverse Flye",           sets: 3, reps: 15,  rest: "1-2 min", notes: "Sweep weight out and back, mind-muscle connection with rear delts" },
    { name: "Single-Arm Rope Tricep Extension", sets: 2, reps: 12, rest: "1-2 min", notes: "Pull arm behind torso, don't move upper arm" },
    { name: "Single-Arm Cable Curl",        sets: 2, reps: 12,  rest: "1-2 min", notes: "Face away from cable, keep arm behind your torso" },
  ]);
}

// ── helper: build 4 identical weeks from day-builder fns ────
function fourWeeks(dayBuilders) {
  return [1, 2, 3, 4].map(w => ({
    name: `Week ${w}`,
    days: dayBuilders.map(fn => fn()),
  }));
}

// ── EXPORT ───────────────────────────────────────────────────
export const STARTER_PROGRAMS = [

  // 1. FULL BODY — 3 days/week
  {
    id: "starter-fundamentals-fullbody",
    name: "Fundamentals: Full Body",
    isStarter: true,
    daysPerWeek: 3,
    totalWeeks: 4,
    description: "4-week strength base. 3 full-body sessions per week. Same exercises each week — add weight to progress.",
    weeks: fourWeeks([fbDay1, fbDay2, fbDay3]),
  },

  // 2. UPPER/LOWER — 4 days/week
  {
    id: "starter-fundamentals-upperlower",
    name: "Fundamentals: Upper/Lower",
    isStarter: true,
    daysPerWeek: 4,
    totalWeeks: 4,
    description: "4-week strength base. 2 lower + 2 upper sessions per week. Same exercises each week — add weight to progress.",
    weeks: fourWeeks([ulLower1, ulUpper1, ulLower2, ulUpper2]),
  },

  // 3. BODY PART SPLIT — 5 days/week
  {
    id: "starter-fundamentals-bodypart",
    name: "Fundamentals: Body Part Split",
    isStarter: true,
    daysPerWeek: 5,
    totalWeeks: 4,
    description: "4-week strength base. Chest/Tris, Legs/Abs, Back/Bis, Legs/Abs (Heavy), Shoulders/Arms. Same exercises each week — add weight to progress.",
    weeks: fourWeeks([bpChestTris, bpLegsAbs1, bpBackBis, bpLegsAbs2, bpShouldersArms]),
  },

];