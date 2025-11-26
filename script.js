body {
    background-color: #1a1a1a;
    color: #ffffff;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    margin: 0;
    display: flex;
    justify-content: center;
    height: 100vh;
}

.app-container {
    width: 100%;
    max-width: 600px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

header { margin-bottom: 10px; }

h1 {
    font-size: 1.5rem;
    color: #ff4d4d;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
}

#total-time {
    font-size: 1.2rem;
    color: #888;
    margin-top: 5px;
    font-weight: normal;
}

#status-indicator {
    font-size: 2.5rem;
    font-weight: bold;
    padding: 10px;
    border-radius: 8px;
    text-transform: uppercase;
}

.status-work { background-color: #2ecc71; color: #000; }
.status-rest { background-color: #3498db; color: #fff; }
.status-ready { background-color: #444; }
.status-done { background-color: #ff4d4d; color: #fff; }

#timer-display {
    font-size: 7rem;
    font-weight: bold;
    margin: 10px 0;
    line-height: 1;
}

.card {
    background-color: #333;
    border: 2px solid #555;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#card-label {
    color: #aaa;
    font-size: 1rem;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

.label-highlight { color: #3498db !important; }

#exercise-name {
    font-size: 2.2rem;
    margin: 0;
    color: #f1f1f1;
}

.settings-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 15px;
}

.setting-group {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.setting-group label {
    font-size: 0.8rem;
    color: #aaa;
    margin-bottom: 5px;
}

input[type="number"] {
    background-color: #333;
    border: 1px solid #555;
    color: white;
    font-size: 1.5rem;
    width: 50px;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
}

button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 50px;
    cursor: pointer;
    width: 100%;
    margin-bottom: 10px;
}

button:active { background-color: #cc0000; }

.secondary-btn {
    background-color: #444;
    font-size: 1rem;
    padding: 10px;
    margin-bottom: 10px;
}

/* Modal Styles for Edit Menu */
.hidden { display: none; }

.modal {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.9);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #222;
    padding: 20px;
    border-radius: 15px;
    width: 90%;
    max-width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    text-align: left;
}

.add-exercise-box {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#new-exercise-input {
    flex-grow: 1;
    padding: 10px;
    border-radius: 5px;
    border: none;
}

#add-exercise-btn {
    width: auto;
    padding: 0 20px;
    margin: 0;
}

#exercise-list {
    list-style: none;
    padding: 0;
}

#exercise-list li {
    background: #333;
    margin-bottom: 5px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
}

.delete-btn {
    background: transparent;
    color: #ff4d4d;
    font-size: 1.2rem;
    width: auto;
    padding: 0 10px;
    margin: 0;
}
