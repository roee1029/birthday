document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    const topImageContainer = document.getElementById('top-image-container');
    const bottomImageContainer = document.getElementById('bottom-image-container');
    const balloonContainer = document.getElementById('balloon-container');
    
    const balloonImages = [
        'blueBalloon-removebg-preview.png',
        'greenBalloon-removebg-preview.png',
        'pinkBalloon-removebg-preview.png',
        'purpleBalloon-removebg-preview.png',
        'redBalloon-removebg-preview.png',
        'yellowBalloon-removebg-preview.png'
    ];

    
    const images = {
        riddle1: {
            top: ['image1.jpeg', 'image1.jpeg'],
            bottom: ['image1.jpeg', 'image1.jpeg']
        },
        riddle2: {
            top: ['image2.jpeg', 'image2.jpeg'],
            bottom: ['image2.jpeg', 'image2.jpeg']
        },
        riddle3: {
            top: ['image3.jpeg', 'image3.jpeg'],
            bottom: ['image3.jpeg', 'image3.jpeg']
        },
        summary: {
            top: ['flowers-removebg-preview.png', 'flowers-removebg-preview.png'],
            bottom: ['horse-removebg-preview.png', 'horse-removebg-preview.png']
        }
    };

    let balloons = []; // Array to keep track of active balloons

    // Function to create a balloon
    function createBalloon() {
        if (balloons.length < 50) { // Limiting balloons to a maximum of 50
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.animationDuration = `${5 + Math.random() * 5}s`;

            // Set random balloon image
            const randomIndex = Math.floor(Math.random() * balloonImages.length);
            balloon.style.backgroundImage = `url('${balloonImages[randomIndex]}')`;
            balloonContainer.appendChild(balloon);

            balloons.push(balloon);

            // Remove balloon after animation ends
            balloon.addEventListener('animationend', () => {
                balloonContainer.removeChild(balloon);
                balloons = balloons.filter(b => b !== balloon); // Remove from array
            });
        }
    }

    // Create multiple balloons less frequently
    setInterval(createBalloon, 1000); // Generate balloons every 2 seconds

    // Function to insert images
    function insertImages(templateId) {
        const imageSet = images[templateId];

        if (imageSet) {
            topImageContainer.innerHTML = `
                <img src="${imageSet.top[0]}" alt="Top Left Image" class="tilted-image left">
                <img src="${imageSet.top[1]}" alt="Top Right Image" class="tilted-image right">
            `;
            bottomImageContainer.innerHTML = `
                <img src="${imageSet.bottom[0]}" alt="Bottom Left Image" class="tilted-image left">
                <img src="${imageSet.bottom[1]}" alt="Bottom Right Image" class="tilted-image right">
            `;
        } else {
            topImageContainer.innerHTML = '';
            bottomImageContainer.innerHTML = '';
        }
    }

    // Existing code for template rendering
    const currentHour = new Date().getHours();
    let template = '';
    let templateId = '';

    if (currentHour <= 10) {
           // Birthday template
           template = `
               <div class="container birthday">
                   <h1>Happy Birthday!</h1>
                   <p>המשחק יתחיל בשעה 10:00, תפתחי את הקישור שוב ב10:00</p>
                   <img src="cake.png" alt="Cake">
                   <img src="ballons.png" alt="Balloons">
               </div>
           `;
           templateId = 'birthday';
    }else if (currentHour >= 10 && currentHour <= 13) {
        // Riddle 1 template
        template = `
            <div class="container card riddle">
                <div class="card-body">
                    <h1>חידה מספר 1</h1>
                    <p>What is the most important meal in a day?</p>
                    <div class="answer-box">
                        <input type="text" id="answerInput" placeholder="Enter your answer">
                        <button onclick="checkAnswer1('riddle1', 'breakfast')">Submit</button>
                    </div>
                    <p> החידה הבאה נפתחת בשעה 12:00</p>
                    <p id="resultMessage"></p>
                    <p id="hintText" class="hint-text">רמז: עכשיו בוקר</p>
                    <p><span id="hintLink" class="hint-link" onclick="showHint()">Need a hint?</span></p>
                </div>
            </div>
        `;
        templateId = 'riddle1';
        
    }  else if (currentHour >= 18 && currentHour <= 22) {
        // Riddle 3 template
        template = `
            <div class="container card riddle">
                <div class="card-body">
                    <h1>חידה מספר 3</h1>
                    <p>What's the meal that ends the day, satisfying in every way?</p>
                    <div class="answer-box">
                        <input type="text" id="answerInput" placeholder="Enter your answer">
                        <button onclick="checkAnswer3('riddle3', 'dinner')">Submit</button>
                    </div>
                    <p> החידה הבאה נפתחת בשעה 22:00</p>
                    <p id="resultMessage"></p>
                    <p id="hintText" class="hint-text">רמז: ארוחת ערב באנגלית</p>
                    <p><span id="hintLink" class="hint-link" onclick="showHint()">Need a hint?</span></p>
                </div>
            </div>
        `;
        templateId = 'riddle3';
        
        // Check if riddle 3 has been solved previously
        const riddleSolved = JSON.parse(localStorage.getItem('riddle3Solved')) || false;
        if (riddleSolved) {
            displaySuccessMessage();
        }
    }
    else if (currentHour >= 13 && currentHour < 18) {
        // Riddle 2 template
        template = `
            <div class="container card riddle">
                <div class="card-body">
                    <h1>חידה מספר 2</h1>
                    <p> run on four legs with a flowing mane, what am I that races on a track or on the plain?"</p>
                    <div class="answer-box">
                        <input type="text" id="answerInput" placeholder="Enter your answer">
                        <button onclick="checkAnswer4('riddle4', 'horse')">Submit</button>
                    </div>
                    <p> החידה הבאה נפתחת בשעה 18:00</p>
                    <p id="resultMessage"></p>
                    <p id="hintText" class="hint-text">רמז: זאת חיה, את שמה ניתן לקרוא משני הכיוונים</p>
                    <p><span id="hintLink" class="hint-link" onclick="showHint()">Need a hint?</span></p>
                </div>
            </div>
        `;
        templateId = 'riddle2';
        
        // Check if riddle 2 has been solved previously
        const riddleSolved = JSON.parse(localStorage.getItem('riddle2Solved')) || false;
        if (riddleSolved) {
            displaySuccessMessage();
        }
    }
    else if (currentHour >= 22) {
        // Summary and gift presentation template
        template = `
            <div class="container summary">
                <h1>סיום המשחק</h1>
                <p> :) תודה רבה שהשתתפת ומקווה שנהנת</p>
                <p>: שיהיה המון מזל טוב מאיוש, זאת המתנה שלי בשבילך</p>
                <img src="present.png" alt="Special Gift" class="gift-image">
            </div>
        `;
        templateId = 'summary';
    } 

    container.innerHTML = template;
    insertImages(templateId);
});

function checkAnswer1(riddleId, correctAnswer) {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value.trim().toLowerCase();

    // Check if the answer is correct
    if (answer === correctAnswer) {
        // Store in local storage that the riddle has been solved
        localStorage.setItem(`${riddleId}Solved`, true);
        displaySuccessMessage('כל הכבוד! היעד הבא שלך: אחד העם 43, תל אביב. שעה - 11:00');
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

function checkAnswer3(riddleId, correctAnswer) {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value.trim().toLowerCase();

    // Check if the answer is correct
    if (answer === correctAnswer) {
        // Store in local storage that the riddle has been solved
        localStorage.setItem(`${riddleId}Solved`, true);
        displaySuccessMessage('כל הכבוד! היעד הבא שלך: הטיילת 6, ראשון לציון. שעה - 22:00');
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

function checkAnswer4(riddleId, correctAnswer) {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value.trim().toLowerCase();

    // Check if the answer is correct
    if (answer === correctAnswer) {
        // Store in local storage that the riddle has been solved
        localStorage.setItem(`${riddleId}Solved`, true);
        displaySuccessMessage('כל הכבוד! היעד הבא שלך: חוות המאלף. שעה - 18:00');
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

function displaySuccessMessage(string) {
    const resultMessage = document.getElementById('resultMessage');
    if (resultMessage) {
        resultMessage.textContent = string;
        resultMessage.classList.add('correct-answer');
    }
}

function showHint() {
    const hintText = document.getElementById('hintText');
    if (hintText) {
        hintText.style.display = 'block';
    }
}