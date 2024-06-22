document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    const balloonContainer = document.getElementById('balloon-container');
    
    const balloonImages = [
        'blueBalloon-removebg-preview.png',
        'greenBalloon-removebg-preview.png',
        'pinkBalloon-removebg-preview.png',
        'redBalloon-removebg-preview.png',
        'yellowBalloon-removebg-preview.png',
        'purpleBalloon-removebg-preview.png'
    ];

    // Function to create a balloon
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.animationDuration = `${5 + Math.random() * 5}s`;

        // Set random balloon image
        const randomIndex = Math.floor(Math.random() * balloonImages.length);
        balloon.style.backgroundImage = `url('${balloonImages[randomIndex]}')`;
        balloonContainer.appendChild(balloon);

        // Remove balloon after animation ends
        balloon.addEventListener('animationend', () => {
            balloonContainer.removeChild(balloon);
        });
    }

    // Create multiple balloons
    setInterval(createBalloon, 1000);

    // Existing code for template rendering
    const currentHour = new Date().getHours();
    let template = '';

    if (currentHour >= 10 && currentHour < 11) {
        // Birthday template
        template = `
            <div class="birthday">
                <h1>Happy Birthday!</h1>
                <p>Hope you have a fantastic birthday filled with joy and surprises!</p>
                <img src="cake.png" alt="Cake">
                <img src="balloons.png" alt="Balloons">
            </div>
        `;
    } else if (currentHour >= 11 && currentHour < 12) {
        // Riddle 1 template
        template = `
            <div class="riddle">
                <h1>Riddle of the Day</h1>
                <p>What has keys but can't open locks?</p>
                <div class="answer-box">
                    <input type="text" id="answerInput" placeholder="Enter your answer">
                    <button onclick="checkAnswer('riddle1', 'keyboard')">Submit</button>
                </div>
                <p id="resultMessage"></p>
                <p id="hintText" class="hint-text" style="display: none;">Hint: It's an input device</p>
                <p><span id="hintLink" onclick="showHint()">Need a hint?</span></p>
            </div>
        `;
        
        // Check if riddle 1 has been solved previously
        const riddleSolved = JSON.parse(localStorage.getItem('riddle1Solved')) || false;
        if (riddleSolved) {
            displaySuccessMessage();
        }
    } else if (currentHour >= 12 && currentHour < 18) {
        // Riddle 2 template
        template = `
            <div class="riddle">
                <h1>Riddle of the Day</h1>
                <p>I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?</p>
                <div class="answer-box">
                    <input type="text" id="answerInput" placeholder="Enter your answer">
                    <button onclick="checkAnswer('riddle2', 'echo')">Submit</button>
                </div>
                <p id="resultMessage"></p>
                <p id="hintText" class="hint-text" style="display: none;">Hint: It repeats what you say</p>
                <p><span id="hintLink" onclick="showHint()">Need a hint?</span></p>
            </div>
        `;
        
        // Check if riddle 2 has been solved previously
        const riddleSolved = JSON.parse(localStorage.getItem('riddle2Solved')) || false;
        if (riddleSolved) {
            displaySuccessMessage();
        }
    } else if (currentHour >= 18 && currentHour < 21) {
        // Riddle 3 template
        template = `
            <div class="riddle">
                <h1>Riddle of the Day</h1>
                <p>The more of this there is, the less you see. What is it?</p>
                <div class="answer-box">
                    <input type="text" id="answerInput" placeholder="Enter your answer">
                    <button onclick="checkAnswer('riddle3', 'darkness')">Submit</button>
                </div>
                <p id="resultMessage"></p>
                <p id="hintText" class="hint-text" style="display: none;">Hint: It is the opposite of light</p>
                <p><span id="hintLink" onclick="showHint()">Need a hint?</span></p>
            </div>
        `;
        
        // Check if riddle 3 has been solved previously
        const riddleSolved = JSON.parse(localStorage.getItem('riddle3Solved')) || false;
        if (riddleSolved) {
            displaySuccessMessage();
        }
    } else {
        // Night template
        template = `
            <div class="night">
                <h1>Good Night!</h1>
                <p>Sweet dreams and sleep well!</p>
            </div>
        `;
    }

    container.innerHTML = template;
});

function checkAnswer(riddleId, correctAnswer) {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value.trim().toLowerCase();

    // Check if the answer is correct
    if (answer === correctAnswer) {
        // Store in local storage that the riddle has been solved
        localStorage.setItem(`${riddleId}Solved`, true);
        displaySuccessMessage();
    } else {
        const resultMessage = document.getElementById('resultMessage');
        if (resultMessage) {
            resultMessage.textContent = "Try again!";
            resultMessage.classList.remove('correct-answer');
        }
    }

    // Clear the input after checking the answer
    answerInput.value = '';
}

function displaySuccessMessage() {
    const resultMessage = document.getElementById('resultMessage');
    if (resultMessage) {
        resultMessage.textContent = "You did it!";
        resultMessage.classList.add('correct-answer');
    }
}

function showHint() {
    const hintText = document.getElementById('hintText');
    if (hintText) {
        hintText.style.display = 'block';
    }
}