const exercises = [
    "Burpees", "Mountain Climbers", "Jump Squats", 
    "Push-ups", "High Knees", "Plank", 
    "Lunges", "Jumping Jacks", "Russian Twists", 
    "Bicycle Crunches", "Leg Raises", "Flutter Kicks"
];

// Variables
let timer; // The interval timer
let totalTimer; // The total time tracker
let timeLeft;
let totalSeconds = 0;
let nextExerciseName = ""; // Stores the upcoming card

// HTML Elements
const timerDisplay = document.getElementById('timer-display');
const totalTimeDisplay = document.getElementById('total-time');
const statusDisplay = document.getElementById('status-indicator');
const exerciseDisplay = document.getElementById('exercise-name');
const cardLabel = document.getElementById('card-label');
const btn = document.getElementById('start-btn');
const workInput = document.getElementById('work-input');
const restInput = document.getElementById('rest-input');
const settingsArea = document.getElementById('settings-area');

// Start Button Logic
btn.addEventListener('click', () => {
    if (btn.innerText === "Start Engine") {
        startWorkout();
    } else {
        location.reload(); // Reset everything
    }
});

function startWorkout() {
    btn.innerText = "Stop Train";
    
    // Disable inputs so you can't change time mid-workout
    workInput.disabled = true;
    restInput.disabled = true;
    settingsArea.style.opacity = "0.5";

    // Start Total Time Counter
    totalTimer = setInterval(() => {
        totalSeconds++;
        let m = Math.floor(totalSeconds / 60);
        let s = totalSeconds % 60;
        totalTimeDisplay.innerText = `Total Time: ${formatTime(m)}:${formatTime(s)}`;
    }, 1000);

    // Pre-select the first exercise
    pickNextExercise();
    
    // Go straight to Rest (Get Ready phase)
    startRest();
}

function startWork() {
    // 1. Get user custom time
    timeLeft = parseInt(workInput.value); 
    
    // 2. Update Display with the exercise we picked during rest
    updateVisuals("WORK", "status-work");
    cardLabel.innerText = "DO THIS NOW:";
    exerciseDisplay.innerText = nextExerciseName;
    
    // 3. Run Timer
    runTimer(() => startRest());
}

function startRest() {
    // 1. Get user custom time
    timeLeft = parseInt(restInput.value);
    
    // 2. Pick the NEXT exercise now, so we can show it
    pickNextExercise();

    // 3. Update Display
    updateVisuals("REST", "status-rest");
    cardLabel.innerText = "UP NEXT:";
    exerciseDisplay.innerText = nextExerciseName; // Show the preview

    // 4. Run Timer
    runTimer(() => startWork());
}

function pickNextExercise() {
    nextExerciseName = exercises[Math.floor(Math.random() * exercises.length)];
}

function updateVisuals(text, cssClass) {
    statusDisplay.innerText = text;
    statusDisplay.classList.remove('status-work', 'status-rest', 'status-ready');
    statusDisplay.classList.add(cssClass);
}

function runTimer(onComplete) {
    timerDisplay.innerText = formatTimeSimple(timeLeft);

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTimeSimple(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            onComplete();
        }
    }, 1000);
}

// Helper: Formats 00:09 (Standard clock)
function formatTime(val) {
    return val < 10 ? `0${val}` : val;
}

// Helper: Formats 9 or 20 (Simple seconds for the big timer)
function formatTimeSimple(val) {
    return val < 10 ? `0${val}` : val;
}
