// ============================================================
// STARTER PROGRAMS — Fundamentals Hypertrophy Program
// Jeff Nippard | programs × 4–8 weeks
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
    { name: "Barbell Bench Press",       sets: 3, reps: 8,        rest: "3-4 min", notes: "Tuck elbows at 45°, squeeze shoulder blades, stay firm on bench" },
    { name: "Lat Pulldown",              sets: 3, reps: 10,       rest: "2-3 min", notes: "Pull elbows down and in, use 1.5× shoulder-width grip" },
    { name: "Romanian Deadlift",         sets: 3, reps: 10,       rest: "2-3 min", notes: "Maintain neutral lower back, set hips back, don't allow spine to round" },
    { name: "Assisted Dip",              sets: 3, reps: 8,        rest: "1-2 min", notes: "Tuck elbows at 45°, lean torso forward 15°" },
    { name: "Standing Calf Raise",       sets: 3, reps: 10,       rest: "1-2 min", notes: "Press all the way to toes, stretch calves at bottom, don't bounce" },
    { name: "Dumbbell Supinated Curl",   sets: 3, reps: 10,       rest: "1-2 min", notes: "Drive your pinky into the handle harder than your pointer finger" },
  ]);
}
function fbDay2() {
  return makeDay("Full Body #2", [
    { name: "Deadlift",                  sets: 3, reps: 5,        rest: "3-4 min", notes: "Brace lats, chest tall, hips high, pull slack out of bar before lifting" },
    { name: "Overhead Press",            sets: 3, reps: 8,        rest: "3-4 min", notes: "Squeeze glutes to keep torso upright, clear head, press up and slightly back" },
    { name: "Chest-Supported T-Bar Row", sets: 3, reps: 12,       rest: "2-3 min", notes: "Squeeze shoulder blades as you pull; keep shoulders down (avoid shrugging)" },
    { name: "Leg Extension",             sets: 3, reps: 12,       rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Cable Flye",                sets: 3, reps: 12,       rest: "1-2 min", notes: "Keep elbows slightly bent at constant angle while squeezing pecs" },
    { name: "Crunch",                    sets: 3, reps: 12,       rest: "1-2 min", notes: "Focus on flexing your spine (rounding back), don't yank head with arms" },
    { name: "Dumbbell Skull Crusher",    sets: 3, reps: 12,       rest: "1-2 min", notes: "Keep elbows in line with top of head, don't let upper arm move" },
  ]);
}
function fbDay3() {
  return makeDay("Full Body #3", [
    { name: "Dumbbell Walking Lunge",    sets: 3, reps: 10,       rest: "2-3 min", notes: "10 steps each leg, take medium strides, let torso lean forward" },
    { name: "Incline Dumbbell Press",    sets: 3, reps: 8,        rest: "2-3 min", notes: "Use ~45° incline, mind-muscle connection with upper pecs" },
    { name: "Reverse-Grip Lat Pulldown", sets: 3, reps: 10,       rest: "2-3 min", notes: "Pull elbows down against your sides, use shoulder-width grip" },
    { name: "Barbell Hip Thrust",        sets: 3, reps: 12,       rest: "2-3 min", notes: "Tuck chin and rib cage down, only move your hips, use a pad" },
    { name: "Seated Face Pull",          sets: 3, reps: 12,       rest: "1-2 min", notes: "Pull arms back and out" },
    { name: "Dumbbell Lateral Raise",    sets: 3, reps: 10,       rest: "1-2 min", notes: "Raise dumbbell 'out' not 'up', mind-muscle connection with middle fibers" },
    { name: "Lying Leg Curl",            sets: 3, reps: 10,       rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
  ]);
}

// ── UPPER/LOWER day builders ─────────────────────────────────
function ulLower1() {
  return makeDay("Lower Body #1", [
    { name: "Barbell Squat",                    sets: 3, reps: 6,        rest: "3-4 min", notes: "Sit back and down, 15° toe flare, drive knees out laterally" },
    { name: "Romanian Deadlift",                sets: 3, reps: 10,       rest: "2-3 min", notes: "Maintain neutral lower back, set hips back, don't allow spine to round" },
    { name: "Barbell Hip Thrust",               sets: 3, reps: 12,       rest: "2-3 min", notes: "Tuck chin and rib cage down, only move your hips, use a pad" },
    { name: "Leg Extension",                    sets: 3, reps: 12,       rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Lying Leg Curl",                   sets: 3, reps: 12,       rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
    { name: "Machine Seated Hip Abduction",     sets: 3, reps: 6,        rest: "1-2 min", notes: "Keep butt in seat, focus on squeezing glutes to make weight move" },
    { name: "Crunch",                           sets: 3, reps: 12,       rest: "1-2 min", notes: "Focus on flexing your spine (rounding back), don't yank head with arms" },
  ]);
}
function ulUpper1() {
  return makeDay("Upper Body #1", [
    { name: "Barbell Bench Press",              sets: 3, reps: 5,        rest: "3-4 min", notes: "Tuck elbows at 45°, squeeze shoulder blades, stay firm on bench" },
    { name: "Lat Pulldown",                     sets: 3, reps: 10,       rest: "2-3 min", notes: "Pull elbows down and in, use 1.5× shoulder-width grip" },
    { name: "Overhead Press",                   sets: 3, reps: 10,       rest: "3-4 min", notes: "Squeeze glutes to keep torso upright, clear head, press up and slightly back" },
    { name: "Chest-Supported T-Bar Row",        sets: 3, reps: 12,       rest: "2-3 min", notes: "Squeeze shoulder blades as you pull; keep shoulders down" },
    { name: "Cable Flye",                       sets: 3, reps: 12,       rest: "1-2 min", notes: "Keep elbows slightly bent at constant angle while squeezing pecs" },
    { name: "Dumbbell Supinated Curl",          sets: 3, reps: 10,       rest: "1-2 min", notes: "Drive your pinky into the handle harder than your pointer finger" },
    { name: "Single-Arm Rope Tricep Extension", sets: 3, reps: 12,       rest: "1-2 min", notes: "Pull arm behind torso, don't move upper arm" },
  ]);
}
function ulLower2() {
  return makeDay("Lower Body #2", [
    { name: "Deadlift",                         sets: 3, reps: 8,        rest: "3-4 min", notes: "Brace lats, chest tall, hips high, pull slack out of bar before lifting" },
    { name: "Dumbbell Walking Lunge",           sets: 3, reps: 10,       rest: "2-3 min", notes: "10 steps each leg, take medium strides, let torso lean forward" },
    { name: "Single-Leg Leg Extension",         sets: 3, reps: 15,       rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Single-Leg Lying Leg Curl",        sets: 3, reps: 15,       rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
    { name: "Machine Seated Hip Abduction",     sets: 3, reps: 15,       rest: "1-2 min", notes: "Keep butt in seat, focus on squeezing glutes to make weight move" },
    { name: "Standing Calf Raise",              sets: 3, reps: 12,       rest: "1-2 min", notes: "Press all the way to toes, stretch calves at bottom, don't bounce" },
    { name: "Plank",                            sets: 3, reps: "20 sec", rest: "1-2 min", notes: "Squeeze glutes, keep hips low" },
  ]);
}
function ulUpper2() {
  return makeDay("Upper Body #2", [
    { name: "Incline Dumbbell Press",           sets: 3, reps: 8,        rest: "2-3 min", notes: "Use ~45° incline, mind-muscle connection with upper pecs" },
    { name: "Reverse-Grip Lat Pulldown",        sets: 3, reps: 8,        rest: "2-3 min", notes: "Pull elbows down against your sides, use shoulder-width grip" },
    { name: "Assisted Dip",                     sets: 3, reps: 10,       rest: "2-3 min", notes: "Tuck elbows at 45°, lean torso forward 15°" },
    { name: "Barbell Bent Over Row",            sets: 3, reps: 12,       rest: "2-3 min", notes: "Lean torso over at 45°, keep lower back neutral, double overhand grip" },
    { name: "Dumbbell Lateral Raise",           sets: 3, reps: 15,       rest: "1-2 min", notes: "Raise dumbbell 'out' not 'up', mind-muscle connection with middle fibers" },
    { name: "Seated Face Pull",                 sets: 3, reps: 15,       rest: "1-2 min", notes: "Pull arms back and out" },
    { name: "Hammer Curl",                      sets: 3, reps: 8,        rest: "1-2 min", notes: "Neutral grip, prevent upper arm from moving" },
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
    { name: "Romanian Deadlift",      sets: 3, reps: 8,   rest: "2-3 min", notes: "Maintain neutral lower back, set hips back, don't allow spine to round" },
    { name: "Barbell Hip Thrust",     sets: 3, reps: 12,  rest: "2-3 min", notes: "Tuck chin and rib cage down, only move your hips, use a pad" },
    { name: "Leg Extension",          sets: 3, reps: 12,  rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Leg Curl",               sets: 3, reps: 12,  rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
    { name: "Standing Calf Raise",    sets: 2, reps: 8,   rest: "1-2 min", notes: "Press all the way to toes, stretch calves at bottom, don't bounce" },
    { name: "Crunch",                 sets: 2, reps: 12,  rest: "1-2 min", notes: "Focus on flexing your spine (rounding back), don't yank head with arms" },
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
    { name: "Deadlift",                    sets: 3, reps: 5,        rest: "3-4 min", notes: "Brace lats, chest tall, hips high, pull slack out of bar before lifting" },
    { name: "Dumbbell Walking Lunge",      sets: 3, reps: 10,       rest: "2-3 min", notes: "10 steps each leg, take medium strides, let torso lean forward" },
    { name: "Single-Leg Leg Extension",    sets: 2, reps: 15,       rest: "1-2 min", notes: "Focus on squeezing quads to make the weight move" },
    { name: "Single-Leg Lying Leg Curl",   sets: 2, reps: 15,       rest: "1-2 min", notes: "Focus on squeezing hamstrings to make the weight move" },
    { name: "Machine Seated Hip Abduction",sets: 3, reps: 15,       rest: "1-2 min", notes: "Keep butt in seat, focus on squeezing glutes to make weight move" },
    { name: "Standing Calf Raise",         sets: 2, reps: 12,       rest: "1-2 min", notes: "Press all the way to toes, stretch calves at bottom, don't bounce" },
    { name: "Plank",                       sets: 3, reps: "20 sec", rest: "1-2 min", notes: "Squeeze glutes, keep hips low" },
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

// ── PPL BLOCK 1 day builders (Technique Phase) ───────────────
// 6 days/week: Legs #1, Push #1, Pull #1, Legs #2, Push #2, Pull #2
// Same exercises each week — intensity/weight progresses

function pplLegs1() {
  return makeDay("Legs #1", [
    { name: "Back Squat",                     sets: 4, reps: 5,          rest: "3-4 min", notes: "Sit back and down, 15° toe flare, drive knees out laterally" },
    { name: "Deadlift",                       sets: 2, reps: 8,          rest: "3-4 min", notes: "Brace lats, chest tall, hips high, pull slack out before lift" },
    { name: "Barbell Hip Thrust",             sets: 3, reps: "10-12",    rest: "2-3 min", notes: "Tuck chin and rib cage down, only move hips, use a pad" },
    { name: "Dumbbell Walking Lunge",         sets: 2, reps: "20 each",  rest: "1-2 min", notes: "Medium strides, minimize amount you push off rear leg" },
    { name: "Leg Extension",                  sets: 3, reps: 15,         rest: "0 min",   notes: "Superset with Seated Leg Curl — squeeze quads at top" },
    { name: "Seated Leg Curl",                sets: 3, reps: 15,         rest: "1-2 min", notes: "Superset with Leg Extension — squeeze hamstrings" },
    { name: "Standing Calf Raise",            sets: 3, reps: 10,         rest: "1-2 min", notes: "Press all the way up to toes, stretch calves at bottom, don't bounce" },
  ]);
}
function pplPush1() {
  return makeDay("Push #1", [
    { name: "Barbell Bench Press",            sets: 3, reps: 4,          rest: "2-3 min", notes: "Tuck elbows at 45° angle, squeeze shoulder blades, stay firm on bench" },
    { name: "Dumbbell Seated Shoulder Press", sets: 3, reps: "8-10",     rest: "2-3 min", notes: "Bring dumbbell all the way down, keep torso upright" },
    { name: "Weighted Dip",                   sets: 3, reps: "6-10",     rest: "1-2 min", notes: "Tuck elbows at 45° angle, lean torso forward 15°, keep scapulae retracted" },
    { name: "Low-to-High Cable Flye",         sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Start externally rotated with elbows down and out, pull elbows up and in while slightly internally rotating shoulder" },
    { name: "Dumbbell Isolateral Skull Crusher", sets: 3, reps: 12,      rest: "1-2 min", notes: "Use 1 dumbbell in each hand, elbows fixed inline with top of head, press over head" },
    { name: "Dumbbell Lateral Raise",         sets: 3, reps: 15,         rest: "1-2 min", notes: "Tilt dumbbell such that pinky comes up first" },
    { name: "Ab Wheel Rollout",               sets: 3, reps: 6,          rest: "1-2 min", notes: "Keep pelvis posteriorly tilted, cut ROM short if can't maintain position" },
  ]);
}
function pplPull1() {
  return makeDay("Pull #1", [
    { name: "1 Arm Lat Pull-in",              sets: 2, reps: "15-20",    rest: "1-2 min", notes: "Light warm-up — drive elbow down and in toward side, laterally flex into direction of pull" },
    { name: "Pull Up",                        sets: 4, reps: "6-8",      rest: "2-3 min", notes: "Pull elbows down and in, minimize swinging" },
    { name: "Pendlay Row",                    sets: 3, reps: "8-10",     rest: "2-3 min", notes: "Initiate with scapular retraction, pull to lower chest, keep torso motionless" },
    { name: "Machine High Row",               sets: 3, reps: "10-12",    rest: "1-2 min", notes: "Focus on squeezing lats" },
    { name: "Seated Face Pull",               sets: 3, reps: 20,         rest: "1-2 min", notes: "Pull elbows up and out, retract scapulae" },
    { name: "Reverse Grip EZ Bar Curl",       sets: 3, reps: 20,         rest: "0 min",   notes: "Superset with Supinated EZ Bar Curl — arch bar out not up, squeeze forearms" },
    { name: "Supinated EZ Bar Curl",          sets: 3, reps: 15,         rest: "1-2 min", notes: "Superset with Reverse Grip EZ Bar Curl — arch bar out not up, squeeze biceps" },
    { name: "Dumbbell Preacher Curl",         sets: 3, reps: 12,         rest: "1-2 min", notes: "Focus on squeezing biceps to move the weight" },
  ]);
}
function pplLegs2() {
  return makeDay("Legs #2", [
    { name: "Deadlift",                       sets: 4, reps: 4,          rest: "3-4 min", notes: "Brace lats, chest tall, hips high, pull slack out before lift" },
    { name: "Front Squat",                    sets: 3, reps: "6-8",      rest: "2-3 min", notes: "Sit down, 15° toe flare, drive knees out laterally" },
    { name: "Cable Pull Through",             sets: 3, reps: 20,         rest: "1-2 min", notes: "Anteriorly tilt pelvis during eccentric, posteriorly during concentric" },
    { name: "Single-Leg Leg Press",           sets: 3, reps: "10-12",    rest: "1-2 min", notes: "High foot placement" },
    { name: "Single-Leg Leg Extension",       sets: 3, reps: 15,         rest: "1-2 min", notes: "Start with weaker leg, focus on squeezing quads" },
    { name: "Swiss Ball Single-Leg Leg Curl", sets: 3, reps: 12,         rest: "1-2 min", notes: "Start with weaker leg, prevent hips from touching ground" },
  ]);
}
function pplPush2() {
  return makeDay("Push #2", [
    { name: "Close-Grip Bench Press",         sets: 3, reps: 6,          rest: "2-3 min", notes: "Shoulder width grip, elbows down at sides" },
    { name: "Military Press",                 sets: 3, reps: 5,          rest: "2-3 min", notes: "Squeeze glutes to keep torso upright, clear head out of way, press up and slightly back" },
    { name: "Incline Dumbbell Press",         sets: 3, reps: "10-12",    rest: "1-2 min", notes: "Keep scapulae retracted and depressed" },
    { name: "Pec Deck",                       sets: 3, reps: 15,         rest: "1-2 min", notes: "Focus on bringing inner elbows together, not hands" },
    { name: "Cable Lateral Raise",            sets: 3, reps: 8,          rest: "1-2 min", notes: "Focus on squeezing lateral delt to move the weight" },
    { name: "Cable Triceps Kickback",         sets: 3, reps: 20,         rest: "1-2 min", notes: "Stand upright, keep elbows behind torso" },
    { name: "Bicycle Crunch",                 sets: 3, reps: 12,         rest: "1-2 min", notes: "Opposite knee to elbow, focus on flexing spine" },
  ]);
}
function pplPull2() {
  return makeDay("Pull #2", [
    { name: "Neutral-Grip Pulldown",          sets: 3, reps: "10-12",    rest: "2-3 min", notes: "Pull elbows down against sides" },
    { name: "Cable Seated Elbows Out Row",    sets: 3, reps: 10,         rest: "0 min",   notes: "Superset with Cable Seated Row — scapular retraction, pull elbows up and out" },
    { name: "Cable Seated Row",               sets: 3, reps: 10,         rest: "2-3 min", notes: "Superset with Elbows Out Row — scapular retraction, pull elbows down and in" },
    { name: "Kneeling Straight Arm Cable Pull-Over", sets: 3, reps: 15,  rest: "1-2 min", notes: "Lean torso at 45° angle, focus on pulling weight straight down" },
    { name: "Snatch Grip Barbell Shrug",      sets: 3, reps: 15,         rest: "1-2 min", notes: "Use 1.5x shoulder width grip, control weight and shrug up to ears" },
    { name: "Cable Reverse Flye",             sets: 3, reps: 20,         rest: "0 min",   notes: "Superset with Single Arm Cable Curl — sweep weight out laterally" },
    { name: "Single Arm Cable Curl",          sets: 3, reps: 12,         rest: "1-2 min", notes: "Stand upright, keep elbow behind torso" },
    { name: "Hammer Curl",                    sets: 3, reps: 8,          rest: "1-2 min", notes: "Focus on squeezing biceps to move the weight" },
  ]);
}

// Build Block 1: 8 identical weeks (same exercises, add weight each week)
function pplBlock1Weeks() {
  return [1, 2, 3, 4, 5, 6, 7, 8].map(w => ({
    name: `Week ${w}`,
    days: [pplLegs1(), pplPush1(), pplPull1(), pplLegs2(), pplPush2(), pplPull2()],
  }));
}

// ── PPL BLOCK 2 day builders (Peaking Phase) ─────────────────
// Week 1 = deload. Weeks 2-8 build progressively.
// Each day builder returns the Week 1 (deload) version.
// The 8-week array is built manually below.

function pplB2Legs1_deload() {
  return makeDay("Legs #1", [
    { name: "Deadlift",                               sets: 4, reps: 3,          rest: "3-4 min", notes: "75% — brace lats, chest tall, hips high, pull slack out before lift" },
    { name: "Tempo Back Squat",                       sets: 2, reps: 6,          rest: "3-4 min", notes: "60% — full 2-second lowering phase, sit back and down, 15° toe flare, drive knees out" },
    { name: "Round-Back Dumbbell 45° Hyperextension", sets: 2, reps: 20,         rest: "1-2 min", notes: "Upper back rounded, drive your hips into the pad like a hip thrust" },
    { name: "Smith Machine Reverse Lunge",            sets: 2, reps: 15,         rest: "1-2 min", notes: "Sit back, start with your weaker leg" },
    { name: "Enhanced Eccentric Leg Extension",       sets: 2, reps: 12,         rest: "1-2 min", notes: "Have a training partner push down on the pad during the eccentric" },
    { name: "Enhanced Eccentric Lying Leg Curl",      sets: 2, reps: 12,         rest: "1-2 min", notes: "Have a training partner push down on the pad during the eccentric" },
    { name: "Lateral Band Walk",                      sets: 2, reps: 15,         rest: "1-2 min", notes: "Or machine hip abduction — focus on driving your knees out" },
    { name: "Tempo Standing Calf Raise",              sets: 2, reps: 8,          rest: "1-2 min", notes: "2-second lowering phase, press all the way up to toes, stretch calves at bottom" },
  ]);
}
function pplB2Push1_deload() {
  return makeDay("Push #1", [
    { name: "Barbell Bench Press",                    sets: 2, reps: 8,          rest: "2-3 min", notes: "75% — tuck elbows at 45° angle, keep scapulae retracted and depressed" },
    { name: "Arnold Press",                           sets: 2, reps: 12,         rest: "1-2 min", notes: "Start shoulders internally rotated, gradually externally rotate as you press up" },
    { name: "Close Grip Smith Machine Press",         sets: 2, reps: 15,         rest: "1-2 min", notes: "Shoulder width grip, elbows down at your sides" },
    { name: "Low-to-High Cable Flye",                 sets: 2, reps: "15-20",    rest: "1-2 min", notes: "Start externally rotated with elbows down and out, pull elbows up and in" },
    { name: "Barbell Floor Skull Crusher",            sets: 2, reps: "8-10",     rest: "1-2 min", notes: "Protract your shoulders, keep elbows inline with your head, only move at the elbow joint" },
    { name: "Egyptian Lateral Raise",                 sets: 2, reps: "12-15",    rest: "1-2 min", notes: "Lean away from the cable, focus on squeezing your delts" },
    { name: "Rope Overhead Triceps Extension",        sets: 2, reps: "12-15",    rest: "1-2 min", notes: "Focus on stretching your triceps at the bottom of the movement" },
    { name: "Hanging Leg Raise",                      sets: 3, reps: 6,          rest: "1-2 min", notes: "Focus on flexing your spine" },
  ]);
}
function pplB2Pull1_deload() {
  return makeDay("Pull #1", [
    { name: "1 Arm Lat Pull-in",                      sets: 2, reps: "15-20",    rest: "1-2 min", notes: "Light warm-up — drive elbow down and in toward side, laterally flex into direction of pull" },
    { name: "Pull Up",                                sets: 3, reps: 12,         rest: "2-3 min", notes: "Add weight or use assistance as needed" },
    { name: "Dumbbell One Arm Row",                   sets: 2, reps: "6-8",      rest: "1-2 min", notes: "Brace with non-working arm, pull your elbow back at your side" },
    { name: "Chest-Supported T-Bar Row w/ Band",      sets: 2, reps: "10-12",    rest: "1-2 min", notes: "See science applied YT series for video on this exercise" },
    { name: "Low-to-High Reverse Flye",               sets: 2, reps: "12-15",    rest: "1-2 min", notes: "Cross between a shrug, a row, and a reverse cable fly — scapular retraction & upward rotation" },
    { name: "Rope Upright Row",                       sets: 2, reps: 20,         rest: "1-2 min", notes: "Focus on squeezing the upper traps at the top" },
    { name: "Dumbbell Supinated Curl",                sets: 2, reps: "12-15",    rest: "1-2 min", notes: "Think about driving your pinky to your lateral delt" },
    { name: "Spider Curl",                            sets: 3, reps: "15-20",    rest: "1-2 min", notes: "Brace your chest against an incline bench, curl with elbows slightly in front of you" },
  ]);
}
function pplB2Legs2_deload() {
  return makeDay("Legs #2", [
    { name: "Back Squat",                             sets: 3, reps: 4,          rest: "3-4 min", notes: "75% — sit back and down, 15° toe flare, drive knees out laterally" },
    { name: "Romanian Deadlift",                      sets: 3, reps: 8,          rest: "2-3 min", notes: "Focus on keeping your spine neutral, anterior pelvic tilt during the eccentric" },
    { name: "Pause Barbell Hip Thrust",               sets: 2, reps: 10,         rest: "2-3 min", notes: "3-second pause at top — tuck chin and rib cage down, only move hips, use a pad" },
    { name: "Slow Eccentric Goblet Squat",            sets: 2, reps: 12,         rest: "1-2 min", notes: "3-second lowering phase, sit down, knees out, torso upright" },
    { name: "Seated Leg Curl",                        sets: 2, reps: 15,         rest: "1-2 min", notes: "Focus on squeezing your hamstrings to move the weight" },
    { name: "Cable Rope Pullthrough",                 sets: 2, reps: 20,         rest: "1-2 min", notes: "Focus on squeezing your glutes to move the weight" },
    { name: "Standing Calf Raise",                    sets: 3, reps: 12,         rest: "1-2 min", notes: "Press all the way up to your toes, stretch your calves at the bottom, don't bounce" },
  ]);
}
function pplB2Push2_deload() {
  return makeDay("Push #2", [
    { name: "Barbell Bench Press",                    sets: 3, reps: 4,          rest: "2-3 min", notes: "75% — tuck elbows at 45° angle, keep scapulae retracted and depressed" },
    { name: "Military Press / Push Press Complex",    sets: 3, reps: "4,4",      rest: "2-3 min", notes: "72.5% — first 4 reps military press, last 4 reps push press (use leg drive)" },
    { name: "Slow Eccentric Dip",                     sets: 2, reps: "8-10",     rest: "1-2 min", notes: "3-second lowering phase, tuck elbows at 45° angle, lean torso forward 15°" },
    { name: "Triceps V-Bar Pressdown",                sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Focus on squeezing your triceps to move the weight" },
    { name: "Machine Lateral Raise",                  sets: 3, reps: "15-20",    rest: "1-2 min", notes: "Focus on squeezing your lateral delt to move the weight" },
    { name: "Plank",                                  sets: 3, reps: "30 sec",   rest: "1-2 min", notes: "Keep your pelvis posteriorly tilted" },
  ]);
}
function pplB2Pull2_deload() {
  return makeDay("Pull #2", [
    { name: "Single Arm Pulldown",                    sets: 3, reps: 12,         rest: "2-3 min", notes: "Start with your weaker side, stretch your lat at the top, pull down and in" },
    { name: "Seal Row",                               sets: 3, reps: "8-10",     rest: "2-3 min", notes: "Can be done with dumbbells or barbell — squeeze glutes to keep torso stable" },
    { name: "Kneeling Straight Arm Cable Pull-Over",  sets: 3, reps: "15-20",    rest: "1-2 min", notes: "Lean torso at 45° angle, focus on pulling weight straight down, not in" },
    { name: "Reverse Pec Deck",                       sets: 3, reps: 15,         rest: "1-2 min", notes: "Sweep your arms out laterally, keep your scapulae protracted" },
    { name: "Dumbbell Pronated Curl",                 sets: 3, reps: 8,          rest: "0 min",   notes: "Triset — arch the dumbbell out not up, focus on squeezing your forearms" },
    { name: "Dumbbell Hammer Curl",                   sets: 3, reps: 8,          rest: "0 min",   notes: "Triset — arch the dumbbell out not up" },
    { name: "Dumbbell Supinated Curl",                sets: 3, reps: 8,          rest: "1-2 min", notes: "Triset finisher — arch the dumbbell out not up, focus on squeezing your biceps" },
  ]);
}

// Block 2 Weeks 2-8 use the same exercise selections with progressive overload
function pplB2Legs1_working() {
  return makeDay("Legs #1", [
    { name: "Deadlift",                               sets: 4, reps: "3-4",      rest: "3-4 min", notes: "Brace lats, chest tall, hips high, pull slack out before lift. Add weight each week." },
    { name: "Tempo Back Squat",                       sets: 3, reps: "4-5",      rest: "3-4 min", notes: "Full 2-second lowering phase, sit back and down, 15° toe flare, drive knees out" },
    { name: "Round-Back Dumbbell 45° Hyperextension", sets: 3, reps: "15-20",    rest: "1-2 min", notes: "Upper back rounded, drive your hips into the pad like a hip thrust" },
    { name: "Smith Machine Reverse Lunge",            sets: 3, reps: 12,         rest: "1-2 min", notes: "Sit back, start with your weaker leg" },
    { name: "Enhanced Eccentric Leg Extension",       sets: 3, reps: "10-12",    rest: "1-2 min", notes: "Have a training partner push down on the pad during the eccentric" },
    { name: "Enhanced Eccentric Lying Leg Curl",      sets: 3, reps: "10-12",    rest: "1-2 min", notes: "Have a training partner push down on the pad during the eccentric" },
    { name: "Lateral Band Walk",                      sets: 3, reps: 15,         rest: "1-2 min", notes: "Or machine hip abduction — focus on driving your knees out" },
    { name: "Tempo Standing Calf Raise",              sets: 3, reps: 10,         rest: "1-2 min", notes: "2-second lowering phase, press all the way up to toes, stretch calves at bottom" },
  ]);
}
function pplB2Push1_working() {
  return makeDay("Push #1", [
    { name: "Barbell Bench Press",                    sets: 4, reps: "3-4",      rest: "2-3 min", notes: "Tuck elbows at 45° angle, keep scapulae retracted and depressed. Add weight each week." },
    { name: "Arnold Press",                           sets: 3, reps: "10-12",    rest: "1-2 min", notes: "Start shoulders internally rotated, gradually externally rotate as you press up" },
    { name: "Close Grip Smith Machine Press",         sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Shoulder width grip, elbows down at your sides" },
    { name: "Low-to-High Cable Flye",                 sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Start externally rotated with elbows down and out, pull elbows up and in" },
    { name: "Barbell Floor Skull Crusher",            sets: 3, reps: "8-10",     rest: "1-2 min", notes: "Protract your shoulders, keep elbows inline with your head, only move at the elbow joint" },
    { name: "Egyptian Lateral Raise",                 sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Lean away from the cable, focus on squeezing your delts" },
    { name: "Rope Overhead Triceps Extension",        sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Focus on stretching your triceps at the bottom of the movement" },
    { name: "Hanging Leg Raise",                      sets: 3, reps: "8-10",     rest: "1-2 min", notes: "Focus on flexing your spine" },
  ]);
}
function pplB2Pull1_working() {
  return makeDay("Pull #1", [
    { name: "1 Arm Lat Pull-in",                      sets: 2, reps: "15-20",    rest: "1-2 min", notes: "Light warm-up — drive elbow down and in toward side, laterally flex into direction of pull" },
    { name: "Pull Up",                                sets: 4, reps: "6-10",     rest: "2-3 min", notes: "Add weight as needed. Pull elbows down and in, minimize swinging" },
    { name: "Dumbbell One Arm Row",                   sets: 3, reps: "6-10",     rest: "1-2 min", notes: "Brace with non-working arm, pull your elbow back at your side" },
    { name: "Chest-Supported T-Bar Row w/ Band",      sets: 3, reps: "10-12",    rest: "1-2 min", notes: "See science applied YT series for video on this exercise" },
    { name: "Low-to-High Reverse Flye",               sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Cross between a shrug, a row, and a reverse cable fly — scapular retraction & upward rotation" },
    { name: "Rope Upright Row",                       sets: 3, reps: "15-20",    rest: "1-2 min", notes: "Focus on squeezing the upper traps at the top" },
    { name: "Dumbbell Supinated Curl",                sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Think about driving your pinky to your lateral delt" },
    { name: "Spider Curl",                            sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Brace your chest against an incline bench, curl with elbows slightly in front of you" },
  ]);
}
function pplB2Legs2_working() {
  return makeDay("Legs #2", [
    { name: "Back Squat",                             sets: 4, reps: "3-4",      rest: "3-4 min", notes: "Sit back and down, 15° toe flare, drive knees out laterally. Add weight each week." },
    { name: "Romanian Deadlift",                      sets: 3, reps: "6-8",      rest: "2-3 min", notes: "Focus on keeping your spine neutral, anterior pelvic tilt during the eccentric" },
    { name: "Pause Barbell Hip Thrust",               sets: 3, reps: "8-10",     rest: "2-3 min", notes: "3-second pause at top — tuck chin and rib cage down, only move hips, use a pad" },
    { name: "Slow Eccentric Goblet Squat",            sets: 3, reps: "10-12",    rest: "1-2 min", notes: "3-second lowering phase, sit down, knees out, torso upright" },
    { name: "Seated Leg Curl",                        sets: 3, reps: 12,         rest: "1-2 min", notes: "Focus on squeezing your hamstrings to move the weight" },
    { name: "Cable Rope Pullthrough",                 sets: 3, reps: "15-20",    rest: "1-2 min", notes: "Focus on squeezing your glutes to move the weight" },
    { name: "Standing Calf Raise",                    sets: 4, reps: 12,         rest: "1-2 min", notes: "Press all the way up to your toes, stretch your calves at the bottom, don't bounce" },
  ]);
}
function pplB2Push2_working() {
  return makeDay("Push #2", [
    { name: "Barbell Bench Press",                    sets: 4, reps: "3-4",      rest: "2-3 min", notes: "Tuck elbows at 45° angle, keep scapulae retracted and depressed. Add weight each week." },
    { name: "Military Press / Push Press Complex",    sets: 3, reps: "4,4",      rest: "2-3 min", notes: "First 4 reps military press, last 4 reps push press (use leg drive). Increase weight each week." },
    { name: "Slow Eccentric Dip",                     sets: 3, reps: "8-10",     rest: "1-2 min", notes: "3-second lowering phase, tuck elbows at 45° angle, lean torso forward 15°" },
    { name: "Triceps V-Bar Pressdown",                sets: 3, reps: "12-15",    rest: "1-2 min", notes: "Focus on squeezing your triceps to move the weight" },
    { name: "Machine Lateral Raise",                  sets: 4, reps: "15-20",    rest: "1-2 min", notes: "Focus on squeezing your lateral delt to move the weight" },
    { name: "Plank",                                  sets: 3, reps: "45 sec",   rest: "1-2 min", notes: "Keep your pelvis posteriorly tilted" },
  ]);
}
function pplB2Pull2_working() {
  return makeDay("Pull #2", [
    { name: "Single Arm Pulldown",                    sets: 4, reps: "8-12",     rest: "2-3 min", notes: "Start with your weaker side, stretch your lat at the top, pull down and in" },
    { name: "Seal Row",                               sets: 3, reps: "6-10",     rest: "2-3 min", notes: "Can be done with dumbbells or barbell — squeeze glutes to keep torso stable" },
    { name: "Kneeling Straight Arm Cable Pull-Over",  sets: 3, reps: "15-20",    rest: "1-2 min", notes: "Lean torso at 45° angle, focus on pulling weight straight down, not in" },
    { name: "Reverse Pec Deck",                       sets: 3, reps: 15,         rest: "1-2 min", notes: "Sweep your arms out laterally, keep your scapulae protracted" },
    { name: "Dumbbell Pronated Curl",                 sets: 3, reps: 8,          rest: "0 min",   notes: "Triset — arch the dumbbell out not up, focus on squeezing your forearms" },
    { name: "Dumbbell Hammer Curl",                   sets: 3, reps: 8,          rest: "0 min",   notes: "Triset — arch the dumbbell out not up" },
    { name: "Dumbbell Supinated Curl",                sets: 3, reps: 8,          rest: "1-2 min", notes: "Triset finisher — arch the dumbbell out not up, focus on squeezing your biceps" },
  ]);
}

// Build Block 2: Week 1 deload, Weeks 2-8 progressive working weeks
function pplBlock2Weeks() {
  const weeks = [];
  weeks.push({
    name: "Week 1 — Deload",
    days: [pplB2Legs1_deload(), pplB2Push1_deload(), pplB2Pull1_deload(), pplB2Legs2_deload(), pplB2Push2_deload(), pplB2Pull2_deload()],
  });
  for (let w = 2; w <= 8; w++) {
    weeks.push({
      name: `Week ${w}`,
      days: [pplB2Legs1_working(), pplB2Push1_working(), pplB2Pull1_working(), pplB2Legs2_working(), pplB2Push2_working(), pplB2Pull2_working()],
    });
  }
  return weeks;
}

// ── PPL 5x/WEEK day builders (Base Hypertrophy System) ───────
// 5 days/week: Push #1, Pull #1, Legs #1, [Optional Rest], Upper #1, Lower #1
// Phase 1 (Weeks 1-4): moderate volume, moderate intensity
// Phase 2 (Weeks 5-8): same exercises, higher intensity — add weight each week

function ppl5xPush1() {
  return makeDay("Push #1", [
    { name: "Barbell Bench Press",
      sets: 1, reps: "3-5", rest: "3-4 min",
      notes: "Top set. Quick pause on chest, explode up on each rep. Set up a comfortable arch." },
    { name: "Larsen Press",
      sets: 2, reps: 10, rest: "3-4 min",
      notes: "Back-off sets. Shoulder blades retracted and depressed. Slight arch in upper back. Zero leg drive." },
    { name: "Standing Dumbbell Arnold Press",
      sets: 3, reps: "8-10", rest: "2-3 min",
      notes: "Start with elbows in front and palms facing in. Rotate so palms face forward as you press." },
    { name: "Press-Around (Cable)",
      sets: 2, reps: "12-15", rest: "0 min",
      notes: "Superset with Pec Static Stretch. Brace with non-working arm, squeeze pecs by pressing cable across body." },
    { name: "Pec Static Stretch",
      sets: 2, reps: "30 sec", rest: "1-2 min",
      notes: "Superset with Press-Around. Hold pec stretch at ~7/10 intensity for 30 seconds." },
    { name: "Cross-Body Cable Y-Raise",
      sets: 3, reps: "12-15", rest: "1-2 min",
      notes: "Side delt focus. Swing cable out and up as if drawing a sword from your side." },
    { name: "Triceps Pressdown + Overhead Triceps Extension",
      sets: 3, reps: "8+8", rest: "1-2 min",
      notes: "Do second half of ROM for pressdowns (squeeze-only) then first half for overhead extensions (stretch-only). Back-to-back." },
    { name: "N1-Style Cross-Body Triceps Extension",
      sets: 2, reps: "10-12", rest: "1-2 min",
      notes: "Extend arm more out to side than a regular pressdown. Feel the stretch as the cable moves across your torso." },
  ]);
}

function ppl5xPull1() {
  return makeDay("Pull #1", [
    { name: "Lat Pulldown (Feeder Sets)",
      sets: 4, reps: 10, rest: "2-3 min",
      notes: "Build weight each set: Set 1 RPE 4-5, Set 2 RPE 6-7, Set 3 RPE 7-8, Set 4 reach failure at 10 reps." },
    { name: "Lat Pulldown (Drop Set)",
      sets: 1, reps: "10+5", rest: "2-3 min",
      notes: "Immediately after hitting ~10 reps, strip 30-50% weight and do 5 more reps with controlled technique." },
    { name: "Omni-Grip Machine Chest-Supported Row",
      sets: 3, reps: "10-12", rest: "2-3 min",
      notes: "Use a different grip for each working set, progressing from wider to closer." },
    { name: "Bottom-Half DB Lat Pullover",
      sets: 2, reps: "10-12", rest: "0 min",
      notes: "Superset with Lat Static Stretch. Stay in the stretched (bottom) aspect of the lift — cut out the top half of ROM." },
    { name: "Lat Static Stretch",
      sets: 2, reps: "30 sec", rest: "1-2 min",
      notes: "Superset with DB Lat Pullover. Hold lat stretch at ~7/10 intensity for 30 seconds." },
    { name: "Omni-Direction Face Pull",
      sets: 3, reps: "12-15", rest: "1-2 min",
      notes: "Set 1: low-to-high angle. Set 2: mid-range. Set 3: high-to-low angle." },
    { name: "EZ-Bar Curl",
      sets: 3, reps: "6-8", rest: "1-2 min",
      notes: "Focus on contracting biceps, minimize torso momentum." },
    { name: "Bottom-Half Preacher Curl",
      sets: 2, reps: "10-12", rest: "1-2 min",
      notes: "Stay in the stretched (bottom) aspect of the lift — cut out the top half of ROM." },
  ]);
}

function ppl5xLegs1() {
  return makeDay("Legs #1", [
    { name: "Squat",
      sets: 1, reps: "3-5", rest: "3-4 min",
      notes: "Top set. Sit back and down, keep upper back tight to bar." },
    { name: "Pause Squat",
      sets: 2, reps: 5, rest: "3-4 min",
      notes: "Back-off sets at ~75% of top set. 2-second pause at the bottom. Sit back and down." },
    { name: "Barbell RDL",
      sets: 3, reps: "8-10", rest: "2-3 min",
      notes: "Maintain neutral lower back, set hips back, don't allow spine to round." },
    { name: "Walking Lunge",
      sets: 2, reps: 10, rest: "2-3 min",
      notes: "10 steps each leg. Take medium strides, minimize the amount you push off the rear leg." },
    { name: "Seated Leg Curl",
      sets: 3, reps: "10-12", rest: "1-2 min",
      notes: "Focus on squeezing hamstrings to move the weight." },
    { name: "Leg Press Toe Press",
      sets: 4, reps: "10-12", rest: "1-2 min",
      notes: "Calf raises on leg press. Press all the way up to toes, stretch calves at bottom, don't bounce." },
    { name: "Decline Plate-Weighted Crunch",
      sets: 3, reps: "10-12", rest: "1-2 min",
      notes: "Hold a plate or dumbbell to chest and crunch hard." },
  ]);
}

function ppl5xUpper1() {
  return makeDay("Upper #1", [
    { name: "Pull-Up",
      sets: 2, reps: "8-10", rest: "2-3 min",
      notes: "1.5× shoulder-width grip, pull chest to bar." },
    { name: "Close-Grip Barbell Incline Press",
      sets: 3, reps: "8/5/12", rest: "3-4 min",
      notes: "~45° incline, grip just outside shoulder width. Cluster sets: 8 reps, rest-pause, 5 reps, rest-pause, 12 reps." },
    { name: "Kroc Row",
      sets: 3, reps: "10-12", rest: "2-3 min",
      notes: "Dumbbell row with mild cheating and slightly upright posture. Go heavy, use straps." },
    { name: "Eccentric + Constant-Tension Cable Lateral Raise",
      sets: 3, reps: "5+15", rest: "1-2 min",
      notes: "First 5 reps: 5-second lowering phase. Last 15 reps: constant tension with no pausing at top or bottom." },
    { name: "N1-Style Cross-Body Bicep Curl",
      sets: 3, reps: "10-12", rest: "1-2 min",
      notes: "Curl with arm out to the side at ~60° angle from torso." },
    { name: "Diamond Push-Up",
      sets: 1, reps: "AMRAP", rest: "0 min",
      notes: "Hands form a diamond shape. Do as many as possible with smooth, controlled tempo." },
  ]);
}

function ppl5xLower1() {
  return makeDay("Lower #1", [
    { name: "Deadlift",
      sets: 1, reps: 5, rest: "3-5 min",
      notes: "Top set. Brace lats, chest tall, pull the slack out of the bar before lifting." },
    { name: "Stiff-Leg Deadlift",
      sets: 2, reps: 8, rest: "3-4 min",
      notes: "High-hip conventional deadlift with a slight bend in the knees." },
    { name: "Leg Press",
      sets: 4, reps: "10-12", rest: "2-3 min",
      notes: "Medium-width foot placement, don't allow lower back to round at the bottom." },
    { name: "Glute Ham Raise",
      sets: 3, reps: "8-10", rest: "1-2 min",
      notes: "Keep hips straight. If no GHR machine, substitute Nordic ham curls." },
    { name: "Slow-Eccentric Leg Extension",
      sets: 3, reps: "8-10", rest: "1-2 min",
      notes: "Control the weight with a 3-4 second negative (lowering phase)." },
    { name: "Seated Calf Raise",
      sets: 4, reps: "15-20", rest: "1-2 min",
      notes: "Press all the way up to toes, stretch calves at bottom, don't bounce." },
    { name: "Roman Chair Leg Raise",
      sets: 3, reps: "10-20", rest: "1-2 min",
      notes: "Tuck knees toward chest, minimize momentum." },
  ]);
}

// Build 8 identical weeks (Phase 1: Wks 1-4, Phase 2: Wks 5-8 — add weight each week)
function ppl5xWeeks() {
  return [1, 2, 3, 4, 5, 6, 7, 8].map(w => ({
    name: `Week ${w}`,
    days: [ppl5xPush1(), ppl5xPull1(), ppl5xLegs1(), ppl5xUpper1(), ppl5xLower1()],
  }));
}

// ── THE GRANDMASTER ──────────────────────────────────────────
// 6-week rotating split. 5 training days/week.
// Weeks 1-3 use one set of base exercises; Weeks 4-6 rotate
// key movements (e.g. Meadows Row replaces One Arm BB Row,
// Lying Leg Curl replaces Seated, Slight Incline replaces Slight Decline).
// All 6 weeks have their own unique exercise lists.
//
// Superset notation: rest: "0 min" on all but the LAST exercise
// in a superset/giant-set; the last exercise gets normal rest.
// ─────────────────────────────────────────────────────────────

// ── WEEK 1 ────────────────────────────────────────────────────
function gm_w1_legs() {
  return makeDay("Week 1 – Legs", [
    { name: "Seated Leg Curl",              sets: 3, reps: "10-12",  rest: "2 min",   notes: "Work up to a hard set. Slow eccentric, full stretch at bottom." },
    { name: "Barbell Squat",               sets: 3, reps: "8-6",    rest: "3 min",   notes: "Work up in weight each set. Drive knees out, sit back and down." },
    { name: "Leg Press",                   sets: 3, reps: "10-12",  rest: "2-3 min", notes: "Moderate weight, full range of motion, don't lock knees at top." },
    { name: "Barbell Walking Lunge",       sets: 2, reps: "12/leg", rest: "2 min",   notes: "Step out, keep torso upright, don't let knee cave inward." },
    { name: "Stiff Legged Barbell Deadlift", sets: 3, reps: "8-10", rest: "2 min",   notes: "Slight knee bend, hinge at hips, feel stretch in hamstrings, neutral spine." },
    { name: "Standing Calf Raise",         sets: 4, reps: "10-12",  rest: "1-2 min", notes: "Full stretch at bottom, pause at top. Go heavy." },
  ]);
}

function gm_w1_chest_shoulders_abs() {
  return makeDay("Week 1 – Chest/Shoulders/Abs", [
    { name: "Slight Decline DB Press",     sets: 1, reps: 8,        rest: "2-3 min", notes: "Hard working set. Slight decline angle, full ROM, elbows at ~75°." },
    { name: "Incline Barbell Press",       sets: 1, reps: "10-8",   rest: "2-3 min", notes: "Work up in weight. Upper chest focus, controlled eccentric." },
    { name: "Hex Press / Smash Press",     sets: 1, reps: "cluster",rest: "2 min",   notes: "Cluster set: hit 4-5 reps, rest 15 sec, repeat. DB heads touching throughout." },
    { name: "Machine / Cable Flye",        sets: 3, reps: "10-12",  rest: "1-2 min", notes: "Squeeze and hold at peak contraction. Full stretch on eccentric." },
    { name: "Bent Over Lateral Raise",     sets: 3, reps: "15-20",  rest: "1-2 min", notes: "Torso parallel to floor, lead with elbows, rear delt focus." },
    { name: "Smith Machine Seated OHP",    sets: 3, reps: "8-10",   rest: "2 min",   notes: "Press to lockout, controlled descent to chin level." },
    { name: "DB Y Raise",                  sets: 3, reps: "12-15",  rest: "1-2 min", notes: "Incline bench, raise arms out into a Y shape, lower trap / rear delt focus." },
    { name: "Dual Rope Tricep Extension",  sets: 3, reps: "12-15",  rest: "1-2 min", notes: "Bonus tricep work. Pull ropes apart at bottom, full extension." },
    { name: "Rope Crunches",               sets: 4, reps: "15-20",  rest: "1 min",   notes: "Kneel at cable, crunch elbows to knees, round lower back at bottom." },
  ]);
}

function gm_w1_back_abs() {
  return makeDay("Week 1 – Back/Abs", [
    { name: "One Arm Barbell Row",         sets: 3, reps: "8-6",    rest: "2-3 min", notes: "Landmine or plate-loaded, brace against a bench. Pull elbow back and up, feel the lat stretch." },
    { name: "One Arm Supinated Pulldown",  sets: 3, reps: "10-8",   rest: "2 min",   notes: "Single arm cable pulldown with underhand grip. Pull elbow to hip, full lat contraction." },
    { name: "Rack Pull",                   sets: 3, reps: "6-8",    rest: "3 min",   notes: "Pull from just below knee. Drive hips through, squeeze traps and lats at top." },
    { name: "Chest Pulls",                 sets: 3, reps: "12-15",  rest: "2 min",   notes: "Cable row pulling to chest / upper abdomen. Elbows flared, upper back focus." },
    { name: "DB Pullover with Band",       sets: 3, reps: "10-12",  rest: "1-2 min", notes: "Band adds resistance at peak. Full lat stretch overhead, squeeze at bottom." },
    { name: "DB Shrugs",                   sets: 3, reps: "10-12",  rest: "1-2 min", notes: "Bonus trap work. Squeeze at top and hold for 1-2 seconds." },
    { name: "Decline Bench Leg Raises",    sets: 4, reps: "12-15",  rest: "1 min",   notes: "Full range of motion, slow eccentric, don't swing." },
  ]);
}

function gm_w1_arms_calves() {
  return makeDay("Week 1 – Arms/Calves", [
    // Superset 1: Hammer Curls + Dual Rope Kickbacks (4 rounds)
    { name: "Hammer Curls",               sets: 4, reps: "10-12",  rest: "0 min",   notes: "Superset A1. Neutral grip, controlled curl, don't swing." },
    { name: "Dual Rope Tricep Kickbacks", sets: 4, reps: "12-15",  rest: "1-2 min", notes: "Superset A2. Bent over, elbows locked at sides, extend fully." },
    // Superset 2: Drag Curls + DB Lying Extensions (4 rounds)
    { name: "Drag Curls",                 sets: 4, reps: "10-12",  rest: "0 min",   notes: "Superset B1. Bar drags up your torso, elbows travel back not up." },
    { name: "DB Lying Extensions",        sets: 4, reps: "10-12",  rest: "1-2 min", notes: "Superset B2. Skull crusher position, full stretch at bottom, squeeze at top." },
    // Superset 3: Concentration Preacher Curls + Seated Overhead Rope Extensions (3 rounds)
    { name: "Concentration Preacher Curls", sets: 3, reps: "10-12", rest: "0 min",  notes: "Superset C1. Full stretch at bottom, peak contraction at top." },
    { name: "Seated Overhead Rope Extensions", sets: 3, reps: "12-15", rest: "1-2 min", notes: "Superset C2. Elbows by ears, full stretch, press to lockout." },
    { name: "Standing Calf Raise",        sets: 4, reps: "10-12",  rest: "1-2 min", notes: "Full range, pause at top and bottom." },
  ]);
}

function gm_w1_legs2() {
  return makeDay("Week 1 – Legs (2nd)", [
    { name: "Seated Leg Curl",            sets: 3, reps: "10-12",  rest: "2 min",   notes: "Pre-exhaust hamstrings. Slow eccentric." },
    { name: "Barbell Squat",              sets: 3, reps: "8-6",    rest: "3 min",   notes: "Work up in weight. Drive knees out, sit back and down." },
    { name: "Hack Squat",                 sets: 3, reps: "10-12",  rest: "2-3 min", notes: "Quad emphasis, feet slightly forward on platform." },
    { name: "Leg Extension",              sets: 3, reps: "12-15",  rest: "1-2 min", notes: "Full squeeze at top, controlled eccentric." },
    { name: "Stiff Legged Barbell Deadlift", sets: 3, reps: "8-10", rest: "2 min",  notes: "Slight knee bend, feel hamstring stretch, neutral spine throughout." },
  ]);
}

// ── WEEK 2 ────────────────────────────────────────────────────
function gm_w2_chest_shoulders_abs() {
  return makeDay("Week 2 – Chest/Shoulders/Abs", [
    { name: "Slight Incline DB Press",    sets: 1, reps: "10-12",  rest: "2-3 min", notes: "Very slight incline. Full ROM, controlled eccentric." },
    { name: "Incline Barbell Press",      sets: 1, reps: "8-10",   rest: "2-3 min", notes: "One working set, go heavy with good form." },
    { name: "Dips",                       sets: 3, reps: "8-12",   rest: "2 min",   notes: "Slight forward lean for chest emphasis. Full ROM." },
    { name: "Low Cable Crossover",        sets: 3, reps: "12-15",  rest: "1-2 min", notes: "Pull cables up and together, squeeze pecs at top." },
    { name: "Landmine Shoulder Press",    sets: 3, reps: 8,        rest: "2 min",   notes: "Single arm or two-arm. Press landmine up and slightly forward." },
    { name: "Bent Over DB Lateral",       sets: 3, reps: 30,       rest: "0 min",   notes: "Superset with DB Side Lateral. Torso parallel, high rep burn set." },
    { name: "DB Side Lateral",            sets: 3, reps: 15,       rest: "1-2 min", notes: "Superset finisher. Standing, raise to shoulder height." },
    { name: "Rope Crunches",              sets: 4, reps: "15-20",  rest: "1 min",   notes: "Cable crunch, round spine at bottom, full contraction." },
  ]);
}

function gm_w2_back_calves() {
  return makeDay("Week 2 – Back/Calves", [
    { name: "One Arm Barbell Row",        sets: 3, reps: "8-6",    rest: "2-3 min", notes: "Landmine setup. Pull elbow back and up, big stretch at bottom." },
    { name: "One Arm Supinated Pulldown", sets: 3, reps: "10-8",   rest: "2 min",   notes: "Underhand single arm cable pulldown. Drive elbow to hip." },
    { name: "Low Cable Row",              sets: 3, reps: "10-12",  rest: "2 min",   notes: "Seated cable row to waist. Full stretch forward, squeeze at contraction." },
    { name: "DB Pullovers",               sets: 3, reps: "12-15",  rest: "2 min",   notes: "Across bench, full lat stretch overhead, squeeze at bottom." },
    { name: "Barbell Hyperextension",     sets: 3, reps: "10-12",  rest: "1-2 min", notes: "Lower back and glute focus. Controlled, don't hyperextend at top." },
    { name: "DB Shrugs",                  sets: 3, reps: "10-12",  rest: "1-2 min", notes: "Bonus trap work. Hold squeeze at top." },
    { name: "Toe Press",                  sets: 4, reps: "10-12",  rest: "1-2 min", notes: "Calf raise on leg press. Full ROM, don't bounce at bottom." },
  ]);
}

function gm_w2_arms_abs() {
  return makeDay("Week 2 – Arms/Abs", [
    // Giant set A (3 rounds): EZ Bar Curls + Hammer Curls + One Arm Cable Curl
    { name: "EZ Bar Curls",               sets: 3, reps: "10-12",  rest: "0 min",   notes: "Giant set A1. Supinated grip, squeeze at top, slow eccentric." },
    { name: "Hammer Curls",               sets: 3, reps: "10-12",  rest: "0 min",   notes: "Giant set A2. Neutral grip, don't swing." },
    { name: "One Arm Cable Curl",         sets: 3, reps: "12-15",  rest: "1-2 min", notes: "Giant set A3 finisher. Face cable, supinate at top." },
    // Giant set B (4 rounds): Dual Handle Pushdowns + Kettlebell Lying Extensions + Bent Over Extensions
    { name: "Dual Handle Pushdowns",      sets: 4, reps: "12-15",  rest: "0 min",   notes: "Giant set B1. Squeeze at full extension, elbows tight to sides." },
    { name: "Kettlebell Lying Extensions", sets: 4, reps: "10-12", rest: "0 min",   notes: "Giant set B2. Skull crusher with KB, stretch at bottom." },
    { name: "Bent Over Extensions",       sets: 4, reps: "12-15",  rest: "1-2 min", notes: "Giant set B3 finisher. Bent over cable, extend arm back fully." },
    { name: "Decline Bench Leg Raises",   sets: 4, reps: "12-15",  rest: "1 min",   notes: "Slow and controlled, don't use momentum." },
  ]);
}

function gm_w2_legs() {
  return makeDay("Week 2 – Legs", [
    { name: "Seated Leg Curl",            sets: 3, reps: "10-12",  rest: "2 min",   notes: "Pre-exhaust. Slow eccentric, full ROM." },
    { name: "Barbell Squat",              sets: 3, reps: "8-6",    rest: "3 min",   notes: "Work up in weight." },
    { name: "Leg Extension",              sets: 3, reps: "12-15",  rest: "1-2 min", notes: "Squeeze at top, 1-second hold." },
    { name: "Leg Press",                  sets: 3, reps: "10-12",  rest: "2-3 min", notes: "Full range, controlled descent." },
    { name: "Stiff Legged Barbell Deadlift", sets: 3, reps: "8-10", rest: "2 min",  notes: "Feel hamstring stretch, neutral spine." },
  ]);
}

function gm_w2_chest_shoulders_calves() {
  return makeDay("Week 2 – Chest/Shoulders/Calves", [
    { name: "Slight Decline DB Press",    sets: 1, reps: "8-10",   rest: "2-3 min", notes: "Hard working set." },
    { name: "Incline Barbell Press",      sets: 1, reps: "8-10",   rest: "2-3 min", notes: "One working set, upper chest focus." },
    { name: "Machine Press",              sets: 3, reps: "10-12",  rest: "2 min",   notes: "Controlled rep, full ROM." },
    { name: "Dips",                       sets: 3, reps: "8-12",   rest: "2 min",   notes: "Chest dips, slight forward lean." },
    { name: "Landmine Shoulder Press",    sets: 3, reps: 8,        rest: "2 min",   notes: "Press up and slightly forward." },
    { name: "Bent Over DB Lateral",       sets: 3, reps: 30,       rest: "0 min",   notes: "Superset. High rep rear delt burnout." },
    { name: "DB Side Lateral",            sets: 3, reps: 15,       rest: "1-2 min", notes: "Superset finisher." },
    { name: "Toe Press",                  sets: 4, reps: 10,       rest: "1-2 min", notes: "Calf raise on leg press. Full ROM." },
  ]);
}

// ── WEEK 3 ────────────────────────────────────────────────────
function gm_w3_back_abs() {
  return makeDay("Week 3 – Back/Abs", [
    { name: "One Arm Barbell Row",        sets: 2, reps: "8-6",    rest: "2-3 min", notes: "Two working sets (strict then challenge). Heavy, full stretch." },
    { name: "One Arm Supinated Pulldown", sets: 2, reps: 8,        rest: "2 min",   notes: "Drive elbow to hip, hold contraction." },
    { name: "Rack Pull",                  sets: 3, reps: 6,        rest: "3 min",   notes: "Heavy. Pull from knee height, squeeze glutes and traps at top." },
    { name: "Curry 3-Way Pulldowns",      sets: 3, reps: "6/6/6",  rest: "2 min",   notes: "Wide grip 6 reps, medium grip 6 reps, close grip 6 reps — no rest between grips." },
    { name: "DB Pullover with Band",      sets: 2, reps: "10-12",  rest: "1-2 min", notes: "Band adds resistance at bottom. Lat stretch at top." },
    { name: "DB Shrugs",                  sets: 3, reps: "10-12",  rest: "1-2 min", notes: "Bonus. Squeeze and hold." },
    { name: "Decline Bench Leg Raises",   sets: 4, reps: "12-15",  rest: "1 min",   notes: "Controlled, full ROM." },
  ]);
}

function gm_w3_arms_calves() {
  return makeDay("Week 3 – Arms/Calves", [
    { name: "Seated Hammer Curls",        sets: 3, reps: 12,       rest: "1-2 min", notes: "Seated for strict form. Neutral grip." },
    { name: "Concentration Preacher Curls", sets: 3, reps: 10,     rest: "1-2 min", notes: "Elbow on pad, full range, peak contraction." },
    { name: "EZ Bar Curls",               sets: 3, reps: "8 + partials", rest: "2 min", notes: "8 full reps then 6 partial reps at bottom half. Burnout the biceps." },
    { name: "Dual Handle Pushdown",       sets: 3, reps: "12 drop", rest: "2 min",  notes: "Work set then drop set. Full extension each rep." },
    { name: "Floor Press",                sets: 3, reps: 8,        rest: "2 min",   notes: "Elbows touch floor at bottom, no leg drive." },
    { name: "Lying Kettlebell Extensions", sets: 3, reps: 10,      rest: "1-2 min", notes: "Skull crusher with KB, feel the tricep stretch." },
    { name: "Toe Presses",                sets: 2, reps: "cluster", rest: "2 min",  notes: "2 cluster sets. Hit reps, rest 15 sec, repeat until failure." },
  ]);
}

function gm_w3_legs_abs() {
  return makeDay("Week 3 – Legs/Abs", [
    { name: "Seated Leg Curl",            sets: 3, reps: "10-12",  rest: "2 min",   notes: "3 work sets. Slow eccentric, full stretch." },
    { name: "Barbell Squat",              sets: 3, reps: "8-6",    rest: "3 min",   notes: "Work up in weight each set." },
    { name: "Reverse Lunge",              sets: 2, reps: "15/leg", rest: "2 min",   notes: "Step back, keep torso upright, full ROM." },
    { name: "Leg Press Close Stance",     sets: 3, reps: 15,       rest: "2 min",   notes: "Feet together or close, quad emphasis." },
    { name: "DB Stiff Legged Deadlift",   sets: 3, reps: 8,        rest: "2 min",   notes: "Dumbbells, slightly wider ROM than barbell version." },
    { name: "Rope Crunches",              sets: 4, reps: "15-20",  rest: "1 min",   notes: "Cable crunch, fully contract abs at bottom." },
  ]);
}

function gm_w3_chest_shoulders_calves() {
  return makeDay("Week 3 – Chest/Shoulders/Calves", [
    { name: "Slight Decline DB Press",    sets: 1, reps: 8,        rest: "2-3 min", notes: "Hard working set." },
    { name: "Incline Barbell Press",      sets: 1, reps: 6,        rest: "2-3 min", notes: "Heavier single working set." },
    { name: "Hex Press",                  sets: 1, reps: "cluster", rest: "2 min",  notes: "Cluster set with DB heads touching. Short rest-pause intervals." },
    { name: "Cable Fly Press",            sets: 4, reps: "10-12",  rest: "1-2 min", notes: "Cable crossover into a press motion. Squeeze pecs." },
    { name: "Rear Delt Band Pulls",       sets: 3, reps: 15,       rest: "1-2 min", notes: "Band pull-aparts. Rear delt focus." },
    { name: "Partial DB Side Laterals",   sets: 3, reps: 25,       rest: "0 min",   notes: "Superset with Top Partial laterals. Bottom half of range only." },
    { name: "Top Partial DB Side Laterals", sets: 3, reps: 10,     rest: "1-2 min", notes: "Superset finisher. Top half of range only." },
    { name: "Kettlebell Tate Press",      sets: 3, reps: 8,        rest: "1-2 min", notes: "Bonus tricep. Elbows flared out, press KB up from chest." },
    { name: "Toe Press",                  sets: 4, reps: 10,       rest: "1-2 min", notes: "Full ROM calf raises on leg press." },
  ]);
}

function gm_w3_back_abs2() {
  return makeDay("Week 3 – Back/Abs (2nd)", [
    { name: "One Arm Barbell Row",        sets: 2, reps: "10-6",   rest: "2-3 min", notes: "Strict set then challenge/heavier set." },
    { name: "One Arm Supinated Pulldown", sets: 2, reps: "10-12",  rest: "2 min",   notes: "Full ROM, lat contraction at bottom." },
    { name: "Barbell Pullovers",          sets: 3, reps: 10,       rest: "2 min",   notes: "Barbell version, heavy stretch across chest and lats." },
    { name: "Curry 3-Way Pulldowns",      sets: 3, reps: "8/8/8",  rest: "2 min",   notes: "Wide / medium / close grip — 8 reps each, no rest between grips." },
    { name: "Barbell Hyperextensions",    sets: 3, reps: 10,       rest: "1-2 min", notes: "Lower back and glute focus." },
    { name: "Preacher Curl",              sets: 4, reps: 10,       rest: "1-2 min", notes: "Bonus bicep. Full stretch at bottom." },
    { name: "Rope Crunches",              sets: 4, reps: "15-20",  rest: "1 min",   notes: "Full contraction each rep." },
  ]);
}

// ── WEEK 4 ────────────────────────────────────────────────────
function gm_w4_legs_calves() {
  return makeDay("Week 4 – Legs/Calves", [
    { name: "Lying Leg Curl",             sets: 1, reps: "10-12",  rest: "2-3 min", notes: "Elaborate work set: feeder sets up to a hard working set. Slow eccentric." },
    { name: "Leg Press",                  sets: 2, reps: 8,        rest: "3 min",   notes: "Work up in weight each set. Full ROM." },
    { name: "Smith Machine Split Squat",  sets: 2, reps: "8-10",   rest: "2-3 min", notes: "Hard set then drop set. Rear foot elevated if possible." },
    { name: "Leg Extension",              sets: 2, reps: "10 + 25 partials", rest: "2 min", notes: "Full reps then partial reps at top. Quad burnout." },
    { name: "Single Leg Romanian Deadlift", sets: 3, reps: 8,      rest: "2 min",   notes: "Balance focus. Slight knee bend, hinge at hip, neutral spine." },
    { name: "Toe Press in Leg Press",     sets: 4, reps: 12,       rest: "1-2 min", notes: "Full calf ROM on leg press. Stretch at bottom, squeeze at top." },
  ]);
}

function gm_w4_chest_shoulders_abs() {
  return makeDay("Week 4 – Chest/Shoulders/Abs", [
    { name: "Slight Incline DB Press",    sets: 1, reps: 8,        rest: "2-3 min", notes: "NEW base movement Wk4. Slight incline for upper chest." },
    { name: "Slight Incline Barbell Press", sets: 1, reps: 6,      rest: "2-3 min", notes: "NEW. Slight incline angle, heavy single working set." },
    { name: "Banded Chest Press",         sets: 2, reps: "cluster", rest: "2 min",  notes: "Band adds resistance at lockout. Cluster set format." },
    { name: "Machine / Cable Flye",       sets: 3, reps: "8 + 10-sec pause", rest: "1-2 min", notes: "End each set with a 10-second isometric hold at peak contraction." },
    { name: "Reverse Pec Deck",           sets: 3, reps: 15,       rest: "1-2 min", notes: "Rear delt focus. Sweep arms out and back." },
    { name: "Wide Grip Barbell Row",      sets: 3, reps: 10,       rest: "2 min",   notes: "Upper back / rear delt. Wide grip, pull to upper chest." },
    { name: "DB Y Raise",                 sets: 3, reps: 12,       rest: "1-2 min", notes: "Incline bench, arms in Y shape. Lower trap and rear delt." },
    { name: "Dual Rope Tricep Extensions", sets: 3, reps: "drop",  rest: "1-2 min", notes: "Bonus. 3 sets with drop set on last. Pull ropes apart at bottom." },
    { name: "Rope Crunches",              sets: 4, reps: "15-20",  rest: "1 min",   notes: "Full crunch, round spine at bottom." },
  ]);
}

function gm_w4_back_abs() {
  return makeDay("Week 4 – Back/Abs", [
    { name: "Meadows Row",                sets: 2, reps: "10-12",  rest: "2-3 min", notes: "NEW base movement Wk4. Landmine row, elbow high and back, big lat stretch." },
    { name: "Standing One Arm DB Row",    sets: 2, reps: 8,        rest: "2-3 min", notes: "NEW. Bent over, brace with free arm, pull DB to hip." },
    { name: "Chest Pulls",                sets: 3, reps: 12,       rest: "2 min",   notes: "Cable row to chest. Elbows flared, upper back emphasis." },
    { name: "Stretch Pulldowns",          sets: 2, reps: "cluster", rest: "2 min",  notes: "Wide grip pulldown with cluster set format. Emphasize stretch at top." },
    { name: "Trap Bar Deadlifts",         sets: 3, reps: 5,        rest: "3-4 min", notes: "Heavy. Drive through floor, hips and shoulders rise together." },
    { name: "Decline Bench Leg Raises",   sets: 4, reps: "12-15",  rest: "1 min",   notes: "Slow and controlled." },
  ]);
}

function gm_w4_arms_calves() {
  return makeDay("Week 4 – Arms/Calves", [
    // Superset: Single Handle Pushdown + Bent Over Extensions (4 rounds = 8 sets)
    { name: "Single Handle Pushdown",     sets: 4, reps: "12-15",  rest: "0 min",   notes: "Superset A1. Full extension, squeeze at bottom." },
    { name: "Bent Over Extensions",       sets: 4, reps: "12-15",  rest: "1-2 min", notes: "Superset A2. Cable, bent over, extend arm back fully." },
    { name: "Assist Dip Machine",         sets: 4, reps: 8,        rest: "2 min",   notes: "Weighted dip using assist machine or parallel bars. Chest dip angle." },
    { name: "Drag Curls",                 sets: 4, reps: 12,       rest: "1-2 min", notes: "Bar drags up the torso. Elbows travel back." },
    // Superset: Spider Curls + EZ Bar Reverse Curl (4 rounds = 8 sets)
    { name: "Spider Curls",               sets: 4, reps: "10-12",  rest: "0 min",   notes: "Superset B1. Chest on incline bench, elbows in front, full curl." },
    { name: "EZ Bar Reverse Curl",        sets: 4, reps: "10-12",  rest: "1-2 min", notes: "Superset B2. Overhand grip, forearm and brachialis focus." },
    { name: "Seated Calf Raises",         sets: 4, reps: 12,       rest: "1-2 min", notes: "Soleus focus. Full ROM, pause at bottom." },
  ]);
}

function gm_w4_legs2() {
  return makeDay("Week 4 – Legs (2nd)", [
    { name: "Lying Leg Curl",             sets: 2, reps: "cluster", rest: "2-3 min", notes: "2 cluster sets. Hit reps, brief rest-pause, more reps until failure." },
    { name: "Leg Press",                  sets: 2, reps: "8-10",   rest: "3 min",   notes: "Heavier than Monday. Full ROM." },
    { name: "Smith Machine Split Squat",  sets: 2, reps: "cluster + isohold", rest: "2-3 min", notes: "Cluster reps with isohold at bottom. Intense quad and glute burn." },
    { name: "Dumbbell Squat",             sets: 2, reps: 10,       rest: "2 min",   notes: "Goblet squat or DB between legs. Upright torso, full depth." },
    { name: "Nordic Leg Curl",            sets: 2, reps: "to failure", rest: "2-3 min", notes: "Partner holds feet or anchor. Eccentric hamstring focus." },
  ]);
}

// ── WEEK 5 ────────────────────────────────────────────────────
function gm_w5_chest_shoulders_abs() {
  return makeDay("Week 5 – Chest/Shoulders/Abs", [
    { name: "Slight Incline DB Press",    sets: 1, reps: "9-10",   rest: "2-3 min", notes: "Working set. Slight incline, controlled and full ROM." },
    { name: "Slight Incline Barbell Press", sets: 1, reps: "7-8",  rest: "2-3 min", notes: "Single working set, push the weight." },
    { name: "Pec Minor Dips",             sets: 3, reps: "to failure", rest: "2 min", notes: "Straight-arm dip focusing on pec minor. Shrug shoulders down at bottom." },
    { name: "Low Cable Crossover",        sets: 2, reps: "10-12",  rest: "2 min",   notes: "One hard set + drop set. Pull cables up and together." },
    { name: "DB Partial Side Laterals",   sets: 3, reps: 20,       rest: "1-2 min", notes: "Bottom half of range. High rep for side delt pump." },
    { name: "Reverse Pec Deck",           sets: 3, reps: "10 + 5 partials", rest: "0 min", notes: "With Spidercrawls between sets. Full reps then partial reps." },
    { name: "Incline Front Delt Raises",  sets: 3, reps: 10,       rest: "1-2 min", notes: "Lying face-down on incline, raise arms forward. Front delt isolation." },
    { name: "Sit Ups",                    sets: 4, reps: "12-15",  rest: "1 min",   notes: "Full sit-up, controlled tempo." },
  ]);
}

function gm_w5_back_calves() {
  return makeDay("Week 5 – Back/Calves", [
    { name: "Meadows Row",                sets: 2, reps: "12-10",  rest: "2-3 min", notes: "Elbow high and flared out, feel the lat stretch at bottom." },
    { name: "Standing One Arm DB Row",    sets: 3, reps: "9-10",   rest: "2-3 min", notes: "Bent over, pull to hip. Slight body english allowed." },
    { name: "Curry 3-Way Pulldowns",      sets: 3, reps: "6/6/6",  rest: "2 min",   notes: "Wide, medium, close grip — 6 reps each grip, no rest between." },
    { name: "DB Pullovers",               sets: 3, reps: 12,       rest: "2 min",   notes: "Lat stretch at top, squeeze at bottom." },
    { name: "Barbell Hyperextension",     sets: 2, reps: 10,       rest: "1-2 min", notes: "Lower back and glute focus." },
    { name: "Toe Press",                  sets: 5, reps: 8,        rest: "1-2 min", notes: "Calf raises on leg press. 5 sets for extra volume." },
  ]);
}

function gm_w5_arms_abs() {
  return makeDay("Week 5 – Arms/Abs", [
    // Giant Set (5 rounds): Dual Handle Pushdown + Hammer Curls + Bent Over Extensions + Palms Up Partials
    { name: "Dual Handle Pushdown",       sets: 5, reps: 10,       rest: "0 min",   notes: "Giant set 1. Full extension, squeeze tricep." },
    { name: "Hammer Curls",               sets: 5, reps: 8,        rest: "0 min",   notes: "Giant set 2. Neutral grip, don't swing." },
    { name: "Bent Over Extensions",       sets: 5, reps: 10,       rest: "0 min",   notes: "Giant set 3. Cable, bent over, full tricep extension." },
    { name: "Palms Up Supinated DB Curl Partials", sets: 5, reps: 15, rest: "1-2 min", notes: "Giant set 4 finisher. Supinated grip, bottom half partial curls — burn out the biceps." },
    { name: "Decline Bench Leg Raises",   sets: 4, reps: "12-15",  rest: "1 min",   notes: "Full range, slow and controlled." },
  ]);
}

function gm_w5_legs() {
  return makeDay("Week 5 – Legs", [
    { name: "Lying Leg Curl",             sets: 3, reps: 10,       rest: "2 min",   notes: "3 working sets. Pre-exhaust hamstrings." },
    { name: "Leg Press",                  sets: 2, reps: 8,        rest: "3 min",   notes: "Heavy, full ROM." },
    { name: "Reverse Lunge",              sets: 3, reps: 10,       rest: "2 min",   notes: "Step back, controlled, quad and glute emphasis." },
    { name: "Hack Squat",                 sets: 3, reps: 8,        rest: "2-3 min", notes: "Quad emphasis, feet close together or shoulder width." },
    { name: "Banded Good Mornings",       sets: 2, reps: 25,       rest: "1-2 min", notes: "Band around neck, hinge at hip, feel hamstring and lower back stretch." },
  ]);
}

function gm_w5_chest_shoulders_calves() {
  return makeDay("Week 5 – Chest/Shoulders/Calves", [
    { name: "Slight Incline DB Press",    sets: 1, reps: 12,       rest: "2-3 min", notes: "Higher rep working set this day." },
    { name: "Slight Incline Barbell Press", sets: 1, reps: "8-9",  rest: "2-3 min", notes: "Single working set." },
    { name: "Machine Press",              sets: 1, reps: "cluster 10+10+10", rest: "2 min", notes: "Cluster set: 10 reps, 15-sec rest, 10 reps, 15-sec rest, 10 reps." },
    { name: "Cable Fly Press",            sets: 4, reps: 10,       rest: "1-2 min", notes: "Cable crossover into press. Full ROM, squeeze pecs." },
    { name: "Landmine Shoulder Press",    sets: 3, reps: 8,        rest: "2 min",   notes: "Delt focus. Press up and slightly forward." },
    { name: "Bent Over DB Swings",        sets: 3, reps: 25,       rest: "0 min",   notes: "With Spidercrawls between sets. Rear delt swings, high rep." },
    { name: "DB Side Laterals with Forward Lean", sets: 3, reps: 10, rest: "1-2 min", notes: "Lean forward slightly to better isolate side delt." },
    { name: "Standing Calf Raise",        sets: 2, reps: "isohold sequence", rest: "2 min", notes: "2 sets with isohold protocol. Hit reps, hold at stretched position, repeat." },
  ]);
}

// ── WEEK 6 ────────────────────────────────────────────────────
function gm_w6_back_abs() {
  return makeDay("Week 6 – Back/Abs", [
    { name: "Meadows Row",                sets: 2, reps: "8-6",    rest: "2-3 min", notes: "Two sets (work set then challenge set). Heavy, full ROM." },
    { name: "Standing One Arm DB Row",    sets: 2, reps: 8,        rest: "2-3 min", notes: "Two sets. Pull to hip, feel lat contraction." },
    { name: "Supported Row",              sets: 3, reps: 8,        rest: "2-3 min", notes: "Chest supported. Squeeze shoulder blades, full ROM." },
    { name: "Curry 3-Way Pulldowns",      sets: 3, reps: "6/6/6",  rest: "2 min",   notes: "Wide / medium / close — 6 reps each grip, no rest between grips." },
    { name: "DB Pullovers",               sets: 2, reps: 10,       rest: "1-2 min", notes: "Lat stretch overhead, squeeze at bottom." },
    { name: "Decline Bench Leg Raises",   sets: 4, reps: "12-15",  rest: "1 min",   notes: "Full range, slow eccentric." },
  ]);
}

function gm_w6_arms_calves() {
  return makeDay("Week 6 – Arms/Calves", [
    { name: "Cross Bench Hammer Curls",   sets: 3, reps: 12,       rest: "1-2 min", notes: "Lie across bench, arm hangs down, neutral grip curl. Long head stretch." },
    { name: "Concentration Preacher Curls", sets: 3, reps: 10,     rest: "1-2 min", notes: "Full stretch at bottom, peak contraction at top." },
    { name: "EZ Bar Curls",               sets: 3, reps: "8 + drop", rest: "2 min", notes: "8 reps then drop the weight and continue. Last set with drop." },
    { name: "Dual Handle Pushdown",       sets: 3, reps: "12 + drop", rest: "2 min", notes: "12 reps then drop the weight. Last set finisher." },
    { name: "Pin Press",                  sets: 3, reps: 5,        rest: "2-3 min", notes: "Barbell from pins at mid-range. Heavy, pause on pins each rep." },
    { name: "Lying Kettlebell Extensions", sets: 3, reps: 10,      rest: "1-2 min", notes: "Skull crusher with KB, stretch at bottom." },
    { name: "Standing Calf Raise",        sets: 3, reps: "isohold sequence", rest: "1-2 min", notes: "3 sets with isohold protocol. Hold in stretched position between reps." },
  ]);
}

function gm_w6_legs_abs() {
  return makeDay("Week 6 – Legs/Abs", [
    { name: "Lying Leg Curl",             sets: 3, reps: "elaborate", rest: "2-3 min", notes: "3 elaborate work sets with feeder sets. Slow eccentric, full stretch." },
    { name: "Leg Press",                  sets: 3, reps: "8 + backoff×20", rest: "2-3 min", notes: "3 heavy sets then a backoff set of 20 reps. Full ROM." },
    { name: "Reverse Lunge",              sets: 3, reps: "20-15-10", rest: "2 min",  notes: "Descending reps each set with more weight. Controlled." },
    { name: "Leg Extension",              sets: 3, reps: "12 + 2-count squeeze", rest: "1-2 min", notes: "2-second squeeze at peak contraction each rep." },
    { name: "DB Stiff Legged Deadlift",   sets: 3, reps: 8,        rest: "2 min",   notes: "Full hamstring stretch, neutral spine." },
    { name: "Rope Crunches",              sets: 4, reps: "15-20",  rest: "1 min",   notes: "Full contraction, round spine at bottom." },
  ]);
}

function gm_w6_chest_shoulders_calves() {
  return makeDay("Week 6 – Chest/Shoulders/Calves", [
    { name: "Slight Incline DB Press",    sets: 1, reps: 8,        rest: "2-3 min", notes: "Hard working set." },
    { name: "Slight Incline Barbell Press", sets: 1, reps: 6,      rest: "2-3 min", notes: "Heavy single set." },
    { name: "Hex Press",                  sets: 1, reps: "drop",   rest: "2 min",   notes: "Drop set. DB heads touching, set → drop → continue." },
    { name: "Machine Flyes",              sets: 4, reps: 10,       rest: "45 sec",  notes: "Shorter rest (45 sec). Full ROM, 10 clean reps each set." },
    { name: "Cage Press",                 sets: 3, reps: 8,        rest: "2 min",   notes: "Smith machine or cage press. Controlled movement, shoulder focus." },
    { name: "Rear Delt Band Pulls",       sets: 3, reps: "15/side", rest: "1-2 min", notes: "Band pull-aparts, rear delt focus." },
    { name: "DB Side Laterals",           sets: 4, reps: 8,        rest: "45 sec",  notes: "Shorter rest (45 sec). 4 sets with quality reps." },
    { name: "Standing Calf Raise",        sets: 4, reps: "isohold sequence", rest: "1-2 min", notes: "4 sets with isohold protocol. Hold at stretch, full ROM." },
    { name: "Dual Rope Extensions",       sets: 3, reps: 8,        rest: "1-2 min", notes: "Bonus tricep finisher. Pull ropes apart at bottom." },
  ]);
}

function gm_w6_back_abs2() {
  return makeDay("Week 6 – Back/Abs (2nd)", [
    { name: "Meadows Row",                sets: 2, reps: "10 + challenge", rest: "2-3 min", notes: "10-rep set then a challenge/PR set. Max effort on second set." },
    { name: "Standing One Arm DB Row",    sets: 2, reps: "10 + challenge", rest: "2-3 min", notes: "10-rep set then challenge set heavier." },
    { name: "Straight Arm Pulldowns",     sets: 3, reps: 10,       rest: "2 min",   notes: "Cable, arms straight, pull down to hips. Lat focus." },
    { name: "Curry 3-Way Pulldowns",      sets: 3, reps: "6/6/6",  rest: "2 min",   notes: "Wide / medium / close — 6 reps each, no rest between grips." },
    { name: "Barbell Hyperextensions",    sets: 3, reps: 10,       rest: "1-2 min", notes: "Lower back and glute focus." },
    { name: "Rope Crunches",              sets: 4, reps: "15-20",  rest: "1 min",   notes: "Full contraction at bottom." },
    { name: "Concentration Preacher Curls", sets: 4, reps: 10,     rest: "1-2 min", notes: "Bonus bicep. Peak contraction focus." },
  ]);
}

// Build The Grandmaster weeks array
function grandmasterWeeks() {
  return [
    {
      name: "Week 1",
      days: [
        gm_w1_legs(),
        gm_w1_chest_shoulders_abs(),
        gm_w1_back_abs(),
        gm_w1_arms_calves(),
        gm_w1_legs2(),
      ],
    },
    {
      name: "Week 2",
      days: [
        gm_w2_chest_shoulders_abs(),
        gm_w2_back_calves(),
        gm_w2_arms_abs(),
        gm_w2_legs(),
        gm_w2_chest_shoulders_calves(),
      ],
    },
    {
      name: "Week 3",
      days: [
        gm_w3_back_abs(),
        gm_w3_arms_calves(),
        gm_w3_legs_abs(),
        gm_w3_chest_shoulders_calves(),
        gm_w3_back_abs2(),
      ],
    },
    {
      name: "Week 4",
      days: [
        gm_w4_legs_calves(),
        gm_w4_chest_shoulders_abs(),
        gm_w4_back_abs(),
        gm_w4_arms_calves(),
        gm_w4_legs2(),
      ],
    },
    {
      name: "Week 5",
      days: [
        gm_w5_chest_shoulders_abs(),
        gm_w5_back_calves(),
        gm_w5_arms_abs(),
        gm_w5_legs(),
        gm_w5_chest_shoulders_calves(),
      ],
    },
    {
      name: "Week 6",
      days: [
        gm_w6_back_abs(),
        gm_w6_arms_calves(),
        gm_w6_legs_abs(),
        gm_w6_chest_shoulders_calves(),
        gm_w6_back_abs2(),
      ],
    },
  ];
}

// ── EXPORT ───────────────────────────────────────────────────
export const STARTER_PROGRAMS = [

  // 1. FULL BODY — 3 days/week
  {
    id: "starter-fundamentals-fullbody",
    name: "Fundamentals: Full Body",
    isStarter: true,
    level: "beginner",
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
    level: "beginner",
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
    level: "beginner",
    daysPerWeek: 5,
    totalWeeks: 4,
    description: "4-week strength base. Chest/Tris, Legs/Abs, Back/Bis, Legs/Abs (Heavy), Shoulders/Arms. Same exercises each week — add weight to progress.",
    weeks: fourWeeks([bpChestTris, bpLegsAbs1, bpBackBis, bpLegsAbs2, bpShouldersArms]),
  },

  // 4. PPL BLOCK 1 — 6 days/week, 8 weeks (Technique Phase)
  {
    id: "starter-ppl-block1",
    name: "PPL: Technique Phase (Block 1)",
    isStarter: true,
    level: "intermediate",
    daysPerWeek: 6,
    totalWeeks: 8,
    description: "Legs/Push/Pull × 2 per week. Same exercises across 8 weeks — add weight each week to progress.",
    weeks: pplBlock1Weeks(),
  },

  // 5. PPL BLOCK 2 — 6 days/week, 8 weeks (Peaking Phase)
  {
    id: "starter-ppl-block2",
    name: "PPL: Peaking Phase (Block 2)",
    isStarter: true,
    level: "intermediate",
    daysPerWeek: 6,
    totalWeeks: 8,
    description: "Week 1 is a deload with new exercises. Weeks 2–8 build to peak intensity.",
    weeks: pplBlock2Weeks(),
  },

  // 6. PPL 5x/WEEK — 5 days/week, 8 weeks
  {
    id: "starter-ppl-5x",
    name: "PPL: 5x/Week System",
    isStarter: true,
    level: "advanced",
    daysPerWeek: 5,
    totalWeeks: 8,
    description: "Push, Pull, Legs, Upper, Lower. Phase 1 (Wks 1-4): base hypertrophy. Phase 2 (Wks 5-8): higher intensity. Same exercises throughout — add weight each week.",
    weeks: ppl5xWeeks(),
  },

  // 7. THE GRANDMASTER — 5 days/week, 6 weeks
  {
    id: "advanced-grandmaster",
    name: "The Grandmaster",
    isStarter: true,
    level: "advanced",
    daysPerWeek: 5,
    totalWeeks: 6,
    description: "6-week rotating split. 5 days/week. Exercises rotate each week — Weeks 1–3 build the base, Weeks 4–6 introduce new movements. High intensity with supersets, giant sets, cluster sets and advanced techniques.",
    weeks: grandmasterWeeks(),
  },

];