// ======= EXERCISE DATABASE =======
// Local exercise database — no API needed, works offline

export const exerciseDatabase = [
    // CHEST
    { name: "Barbell Bench Press", muscle: "chest", difficulty: "intermediate", instructions: "Lie flat on a bench, grip the bar slightly wider than shoulder width. Lower the bar to your chest with control, then press back up to full arm extension. Keep your feet flat on the floor and your back naturally arched." },
    { name: "Dumbbell Bench Press", muscle: "chest", difficulty: "beginner", instructions: "Lie on a flat bench holding dumbbells at chest level with palms facing forward. Press the dumbbells up until arms are fully extended, then lower slowly back to the starting position." },
    { name: "Incline Barbell Bench Press", muscle: "chest", difficulty: "intermediate", instructions: "Set bench to 30-45 degrees. Grip the bar wider than shoulder width, lower it to your upper chest, then press back up. Targets the upper chest." },
    { name: "Incline Dumbbell Press", muscle: "chest", difficulty: "beginner", instructions: "Set bench to 30-45 degrees. Hold dumbbells at shoulder level and press upward until arms are extended. Lower slowly and repeat." },
    { name: "Decline Bench Press", muscle: "chest", difficulty: "intermediate", instructions: "Set bench to a decline angle. Lower the bar to your lower chest with control, then press back up. Targets the lower chest." },
    { name: "Cable Fly", muscle: "chest", difficulty: "beginner", instructions: "Stand between two cable machines set at shoulder height. With a slight bend in your elbows, bring your hands together in front of your chest in an arc motion. Slowly return to the starting position." },
    { name: "Dumbbell Fly", muscle: "chest", difficulty: "beginner", instructions: "Lie on a flat bench holding dumbbells above your chest. Lower them out to the sides in a wide arc until you feel a stretch in your chest, then bring them back together." },
    { name: "Push Up", muscle: "chest", difficulty: "beginner", instructions: "Start in a plank position with hands slightly wider than shoulder width. Lower your chest to the floor, then push back up. Keep your body in a straight line throughout." },
    { name: "Chest Dip", muscle: "chest", difficulty: "intermediate", instructions: "Grip parallel bars and lean forward slightly. Lower your body by bending your elbows until you feel a stretch in your chest, then push back up." },

    // BACK
    { name: "Deadlift", muscle: "lower back", difficulty: "intermediate", instructions: "Stand with feet hip-width apart, bar over mid-foot. Hinge at hips and knees to grip the bar. Keep your back flat and chest up, then drive through your heels to stand up. Lower the bar with control." },
    { name: "Barbell Row", muscle: "back", difficulty: "intermediate", instructions: "Hinge forward at the hips with a flat back. Grip the bar shoulder-width and pull it to your lower chest, squeezing your shoulder blades together. Lower with control." },
    { name: "Dumbbell Row", muscle: "back", difficulty: "beginner", instructions: "Place one knee and hand on a bench for support. Pull the dumbbell up towards your hip, keeping your elbow close to your body. Lower slowly and repeat." },
    { name: "Pull Up", muscle: "back", difficulty: "intermediate", instructions: "Hang from a bar with palms facing away, hands shoulder-width apart. Pull yourself up until your chin is above the bar, then lower with control." },
    { name: "Chin Up", muscle: "back", difficulty: "intermediate", instructions: "Hang from a bar with palms facing toward you, hands shoulder-width apart. Pull yourself up until your chin is above the bar, then lower with control." },
    { name: "Lat Pulldown", muscle: "back", difficulty: "beginner", instructions: "Sit at a cable machine and grip the bar wider than shoulder width. Pull the bar down to your upper chest, squeezing your lats. Return slowly to the starting position." },
    { name: "Seated Cable Row", muscle: "back", difficulty: "beginner", instructions: "Sit at a cable row machine with feet on the platform. Pull the handle to your abdomen, squeezing your shoulder blades together. Return slowly to the starting position." },
    { name: "Face Pull", muscle: "back", difficulty: "beginner", instructions: "Set a cable to upper chest height with a rope attachment. Pull the rope toward your face, separating your hands as you pull. Focus on squeezing your rear delts." },
    { name: "T-Bar Row", muscle: "back", difficulty: "intermediate", instructions: "Straddle a T-bar and hinge forward. Pull the bar to your chest while keeping your back flat and elbows close to your body." },

    // SHOULDERS
    { name: "Overhead Press", muscle: "shoulders", difficulty: "intermediate", instructions: "Stand with feet shoulder-width apart. Hold the bar at shoulder level with hands just outside shoulder width. Press the bar overhead until arms are fully extended, then lower with control." },
    { name: "Dumbbell Shoulder Press", muscle: "shoulders", difficulty: "beginner", instructions: "Sit or stand holding dumbbells at shoulder level with palms facing forward. Press overhead until arms are extended, then lower slowly." },
    { name: "Lateral Raise", muscle: "shoulders", difficulty: "beginner", instructions: "Stand holding dumbbells at your sides. Raise your arms out to the sides until they are parallel to the floor, then lower slowly. Keep a slight bend in your elbows." },
    { name: "Front Raise", muscle: "shoulders", difficulty: "beginner", instructions: "Stand holding dumbbells in front of your thighs. Raise one or both arms forward to shoulder height, then lower slowly." },
    { name: "Arnold Press", muscle: "shoulders", difficulty: "intermediate", instructions: "Start with dumbbells at shoulder level, palms facing you. As you press up, rotate your palms to face forward at the top. Reverse the motion as you lower." },
    { name: "Rear Delt Fly", muscle: "shoulders", difficulty: "beginner", instructions: "Hinge forward at the hips. With a slight bend in your elbows, raise the dumbbells out to the sides until they are level with your shoulders, squeezing your rear delts." },
    { name: "Cable Lateral Raise", muscle: "shoulders", difficulty: "beginner", instructions: "Stand beside a cable machine set at the lowest position. Pull the cable out to the side until your arm is parallel to the floor, then lower with control." },

    // LEGS
    { name: "Barbell Squat", muscle: "quadriceps", difficulty: "intermediate", instructions: "Place the bar on your upper back. Stand with feet shoulder-width apart. Squat down by bending your knees and hips until your thighs are parallel to the floor, then drive back up." },
    { name: "Front Squat", muscle: "quadriceps", difficulty: "advanced", instructions: "Hold the bar across your front shoulders with elbows high. Squat down keeping your torso upright, then drive back up through your heels." },
    { name: "Romanian Deadlift", muscle: "hamstrings", difficulty: "intermediate", instructions: "Stand holding a bar at hip level. Hinge at the hips, pushing them back while lowering the bar down your legs. Keep your back flat. Return to standing by driving your hips forward." },
    { name: "Leg Press", muscle: "quadriceps", difficulty: "beginner", instructions: "Sit in the leg press machine with feet shoulder-width on the platform. Lower the weight by bending your knees to 90 degrees, then press back up." },
    { name: "Leg Extension", muscle: "quadriceps", difficulty: "beginner", instructions: "Sit in the leg extension machine. Extend your legs until they are straight, squeezing your quads at the top. Lower slowly." },
    { name: "Leg Curl", muscle: "hamstrings", difficulty: "beginner", instructions: "Lie face down on the leg curl machine. Curl your legs up toward your glutes, squeezing your hamstrings at the top. Lower slowly." },
    { name: "Bulgarian Split Squat", muscle: "quadriceps", difficulty: "intermediate", instructions: "Stand in front of a bench. Place one foot behind you on the bench. Lower your body until your front thigh is parallel to the floor, then drive back up." },
    { name: "Hip Thrust", muscle: "glutes", difficulty: "beginner", instructions: "Sit with your upper back against a bench. Place a barbell across your hips. Drive your hips up until your body forms a straight line from knees to shoulders, squeezing your glutes at the top." },
    { name: "Calf Raise", muscle: "calves", difficulty: "beginner", instructions: "Stand on the edge of a step or platform. Rise up onto your toes as high as possible, then lower your heels below the step level. Repeat." },
    { name: "Hack Squat", muscle: "quadriceps", difficulty: "intermediate", instructions: "Position yourself in the hack squat machine with shoulders under the pads. Lower until thighs are parallel to the platform, then press back up." },
    { name: "Sumo Deadlift", muscle: "quadriceps", difficulty: "intermediate", instructions: "Stand with feet wider than shoulder width and toes pointed out. Grip the bar inside your legs. Keep your chest up and back flat as you drive through your heels to stand up." },

    // ARMS — BICEPS
    { name: "Barbell Curl", muscle: "biceps", difficulty: "beginner", instructions: "Stand holding a barbell with an underhand grip. Curl the bar up toward your shoulders, keeping your elbows at your sides. Lower slowly." },
    { name: "Dumbbell Curl", muscle: "biceps", difficulty: "beginner", instructions: "Stand holding dumbbells at your sides with palms facing forward. Curl one or both dumbbells up toward your shoulders, then lower slowly." },
    { name: "Hammer Curl", muscle: "biceps", difficulty: "beginner", instructions: "Stand holding dumbbells at your sides with palms facing each other. Curl the dumbbells up while keeping the neutral grip throughout the movement." },
    { name: "Preacher Curl", muscle: "biceps", difficulty: "beginner", instructions: "Sit at a preacher bench. Rest your upper arms on the pad and curl the bar or dumbbells up toward your shoulders, then lower slowly." },
    { name: "Cable Curl", muscle: "biceps", difficulty: "beginner", instructions: "Stand facing a cable machine set at the lowest position. Curl the bar or rope up toward your shoulders, keeping your elbows at your sides." },
    { name: "Incline Dumbbell Curl", muscle: "biceps", difficulty: "beginner", instructions: "Sit on an incline bench holding dumbbells. Let your arms hang straight down, then curl the dumbbells up. The incline increases the stretch on the biceps." },

    // ARMS — TRICEPS
    { name: "Tricep Pushdown", muscle: "triceps", difficulty: "beginner", instructions: "Stand at a cable machine with a bar or rope attachment at chest height. Push the weight down until your arms are fully extended, keeping your elbows at your sides. Return slowly." },
    { name: "Skull Crusher", muscle: "triceps", difficulty: "intermediate", instructions: "Lie on a bench holding a bar or dumbbells above your chest. Bend your elbows to lower the weight toward your forehead, then extend back up." },
    { name: "Tricep Dip", muscle: "triceps", difficulty: "beginner", instructions: "Grip parallel bars with arms extended. Lower your body by bending your elbows, keeping them close to your body. Press back up to the starting position." },
    { name: "Close Grip Bench Press", muscle: "triceps", difficulty: "intermediate", instructions: "Lie on a bench and grip the bar with hands shoulder-width apart. Lower the bar to your chest, keeping your elbows close to your body, then press back up." },
    { name: "Overhead Tricep Extension", muscle: "triceps", difficulty: "beginner", instructions: "Hold a dumbbell or bar overhead with arms extended. Bend your elbows to lower the weight behind your head, then extend back up." },
    { name: "Cable Overhead Tricep Extension", muscle: "triceps", difficulty: "beginner", instructions: "Face away from a cable machine set high. Hold the rope overhead and extend your arms forward, keeping your elbows stationary." },

    // CORE
    { name: "Plank", muscle: "abdominals", difficulty: "beginner", instructions: "Hold a push-up position with your weight on your forearms. Keep your body in a straight line from head to heels. Breathe steadily and hold." },
    { name: "Crunch", muscle: "abdominals", difficulty: "beginner", instructions: "Lie on your back with knees bent. Curl your upper body toward your knees, contracting your abs. Lower slowly and repeat." },
    { name: "Leg Raise", muscle: "abdominals", difficulty: "beginner", instructions: "Lie on your back with legs straight. Raise your legs to 90 degrees, then lower them slowly without letting them touch the floor." },
    { name: "Cable Crunch", muscle: "abdominals", difficulty: "beginner", instructions: "Kneel at a cable machine with a rope attachment. Hold the rope at your head and crunch down, bringing your elbows toward your knees." },
    { name: "Ab Wheel Rollout", muscle: "abdominals", difficulty: "intermediate", instructions: "Kneel on the floor holding an ab wheel. Roll forward as far as you can while keeping your core tight, then roll back to the starting position." },
    { name: "Russian Twist", muscle: "abdominals", difficulty: "beginner", instructions: "Sit on the floor with knees bent and feet raised. Hold a weight and rotate your torso from side to side." },
];

export function searchLocalExercises(query) {
    const q = query.toLowerCase().trim();
    return exerciseDatabase.filter(ex =>
        ex.name.toLowerCase().includes(q) ||
        ex.muscle.toLowerCase().includes(q)
    );
}