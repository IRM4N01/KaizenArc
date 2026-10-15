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

// Build Block 1: 8 identical weeks (same exercises, add weight each week)
function pplBlock1Weeks() {
  return [1, 2, 3, 4, 5, 6, 7, 8].map(w => ({
    name: `Week ${w}`,
    days: [pplLegs1(), pplPush1(), pplPull1(), pplLegs2(), pplPush2(), pplPull2()],
  }));
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
    description: "Intermediate–Advanced. Legs/Push/Pull × 2 per week. Same exercises across 8 weeks — add weight each week to progress.",
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
    description: "Intermediate–Advanced. Week 1 is a deload with new exercises. Weeks 2–8 build to peak intensity.",
    weeks: pplBlock2Weeks(),
  },

];