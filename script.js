// Initial Deck
let exercises = [
    "Burpees", "Mountain Climbers", "Jump Squats", 
    "Push-ups", "High Knees", "Plank", 
    "Lunges", "Jumping Jacks", "Russian Twists", 
    "Bicycle Crunches"
];

// Variables
let timer; 
let totalTimer; 
let timeLeft;
let totalTimeLeft; // Seconds remaining in whole workout
let roundsLeft;
let nextExerciseName = "";

// HTML Elements
const timerDisplay = document.getElementById('timer-display');
const totalTimeDisplay = document.getElementById('total-time');
const statusDisplay = document.getElementById('status-indicator');
const exerciseDisplay = document.getElementById('exercise-name');
const cardLabel = document.getElementById('card-label');
const btn = document.getElementById('start-btn');
const workInput = document.getElementById('work-input');
const restInput = document.getElementById('rest-input');
const roundsInput = document.getElementById('rounds-input');
const settingsArea = document.getElementById('settings-area');

// Edit Modal Elements
const editBtn = document.getElementById('edit-btn');
const modal = document.getElementById('editor-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const exerciseList = document.getElementById('exercise-list');
const newExerciseInput = document.getElementById('new-exercise-input');
const addExerciseBtn = document.getElementById('add-exercise-btn');

// --- APP LOGIC ---

btn.addEventListener('click', () => {
    if (btn.innerText === "Start Engine") {
        startWorkout();
    } else {
        location.reload(); 
    }
});

function startWorkout() {
    // 1. Setup Variables
    const workTime = parseInt(workInput.value);
    const restTime = parseInt(restInput.value);
    roundsLeft = parseInt(roundsInput.value);
    
    // Calculate Total Time: (Work + Rest) * Rounds
    totalTimeLeft = (workTime + restTime) * roundsLeft;
    
    // 2. UI Updates
    btn.innerText = "Stop Train";
    editBtn.style.display = 'none'; // Hide edit button during workout
    settingsArea.style.pointerEvents = 'none'; // Freeze settings
    settingsArea.style.opacity = '0.5';

    // 3. Start Total Time Countdown
    updateTotalTimeDisplay();
    totalTimer = setInterval(() => {
        if(totalTimeLeft > 0) {
            totalTimeLeft--;
            updateTotalTimeDisplay();
        }
    }, 1000);

    // 4. Start the Loop
    pickNextExercise();
    startRest(); // We always start with a prep/rest period
}

function startWork() {
    if (roundsLeft <= 0) {
        finishWorkout();
        return;
    }

    timeLeft = parseInt(workInput.value); 
    updateVisuals("WORK IT!", "status-work");
    
    cardLabel.innerText = "CURRENT EXERCISE";
    cardLabel.classList.remove("label-highlight");
    exerciseDisplay.innerText = nextExerciseName; 
    
    runTimer(() => startRest());
}

function startRest() {
    // If we just finished the last round, don't rest again, just finish.
    // (Optional: standard Tabata often ends on last work rep. We'll stick to Work->Rest loop for now).
    if (roundsLeft <= 0) {
        finishWorkout();
        return;
    }

    timeLeft = parseInt(restInput.value);
    
    // Logic: Decrement rounds here (as we are prepping for the next one)
    roundsLeft--; 
    pickNextExercise();

    updateVisuals("REST", "status-rest");
    
    cardLabel.innerText = "UP NEXT: " + nextExerciseName;
    cardLabel.classList.add("label-highlight");
    exerciseDisplay.innerText = "REST"; 

    runTimer(() => startWork());
}

function finishWorkout() {
    clearInterval(timer);
    clearInterval(totalTimer);
    updateVisuals("WORKOUT COMPLETE", "status-done");
    exerciseDisplay.innerText = "Great Job!";
    cardLabel.innerText = "DONE";
    timerDisplay.innerText = "00:00";
    btn.innerText = "Reset";
}

function pickNextExercise() {
    // Simple random shuffle logic
    nextExerciseName = exercises[Math.floor(Math.random() * exercises.length)];
}

function runTimer(onComplete) {
    timerDisplay.innerText = formatTimeSimple(timeLeft);
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTimeSimple(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            onComplete();
        }
    }, 1000);
}

// --- EDIT MODAL LOGIC ---

editBtn.addEventListener('click', () => {
    renderExerciseList();
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.style.display = 'none';
});

addExerciseBtn.addEventListener('click', () => {
    const name = newExerciseInput.value.trim();
    if (name) {
        exercises.push(name);
        newExerciseInput.value = "";
        renderExerciseList();
    }
});

function renderExerciseList() {
    exerciseList.innerHTML = "";
    exercises.forEach((ex, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${ex}</span>
            <button class="delete-btn" onclick="removeExercise(${index})">✖</button>
        `;
        exerciseList.appendChild(li);
    });
}

// Needs to be global so HTML onclick can see it
window.removeExercise = function(index) {
    exercises.splice(index, 1);
    renderExerciseList();
}

// --- HELPERS ---

function updateVisuals(text, cssClass) {
    statusDisplay.innerText = text;
    statusDisplay.classList.remove('status-work', 'status-rest', 'status-ready', 'status-done');
    statusDisplay.classList.add(cssClass);
}

function updateTotalTimeDisplay() {
    const m = Math.floor(totalTimeLeft / 60);
    const s = totalTimeLeft % 60;
    totalTimeDisplay.innerText = `Time Left: ${formatTime(m)}:${formatTime(s)}`;
}

function formatTime(val) { return val < 10 ? `0${val}` : val; }
function formatTimeSimple(val) { return val < 10 ? `0${val}` : val; }
