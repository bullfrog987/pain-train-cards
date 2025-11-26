// The Exercise Deck
const exercises = [
    "Burpees",
    "Mountain Climbers",
    "Jump Squats",
    "Push-ups",
    "High Knees",
    "Plank",
    "Lunges",
    "Jumping Jacks",
    "Russian Twists",
    "Bicycle Crunches"
];

// Variables
let timer;
let timeLeft;
let isWorking = false; // false = rest, true = work
let round = 0;

// HTML Elements
const timerDisplay = document.getElementById('timer-display');
const statusDisplay = document.getElementById('status-indicator');
const exerciseDisplay = document.getElementById('exercise-name');
const btn = document.getElementById('start-btn');

// Start Button Logic
btn.addEventListener('click', () => {
    if (btn.innerText === "Start Engine") {
        startWorkout();
    } else {
        location.reload(); // Quick way to reset everything
    }
});

function startWorkout() {
    btn.innerText = "Stop Train";
    startRest(); // We usually start with a "Get Ready" rest period
}

function startWork() {
    isWorking = true;
    timeLeft = 20; // Tabata Standard: 20s Work
    
    // Pick a random exercise
    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    exerciseDisplay.innerText = randomExercise;
    
    updateVisuals("WORK IT!", "status-work");
    runTimer(() => startRest());
}

function startRest() {
    isWorking = false;
    timeLeft = 10; // Tabata Standard: 10s Rest
    
    updateVisuals("REST / PREPARE", "status-rest");
    exerciseDisplay.innerText = "Next Card Coming...";
    runTimer(() => startWork());
}

function updateVisuals(text, cssClass) {
    statusDisplay.innerText = text;
    // Remove old classes and add the new one
    statusDisplay.classList.remove('status-work', 'status-rest', 'status-ready');
    statusDisplay.classList.add(cssClass);
}

function runTimer(onComplete) {
    // Update immediately so we don't wait 1 second for the first number
    timerDisplay.innerText = formatTime(timeLeft);

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            onComplete();
        }
    }, 1000);
}

// Helper to make single digits look nice (e.g., 09 instead of 9)
function formatTime(seconds) {
    return seconds < 10 ? `00:0${seconds}` : `00:${seconds}`;
}
