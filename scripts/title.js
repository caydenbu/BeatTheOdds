const title = document.getElementById("Title-Screen");

//title.style.animation = 'slideUp 0s ease-out forwards'; // For dev to skip title screen

function start() {
    title.style.animation = "slideUp 3s ease-out forwards";
    jazzBackground.play();
}

// Start Hover animation
const startButton = document.getElementById("start-button");

//const alphabet = ['A', '*', '/', '(', 'E', '$', 'G', 'H', '%', 'J', '#', 'L', 'M', 'N', ];
const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
const targetWord = "GAMBLE";

let animationGoing = false;
// Toggle Animation functions
startButton.addEventListener("mouseover", function() {
    animationGoing = true;
    GlitchAnimation();
});

startButton.addEventListener("mouseout", function() {
    // Reset the button text
    animationGoing = false;
    startButton.innerHTML = "START";
});

const animationDelay = 5;
async function GlitchAnimation() {
    for (let i = 0; i < targetWord.length; i++) {
        // Reset the button text durring animation
        if (!animationGoing) {
            startButton.innerHTML = "START";
            break;
        }
        for (let j = 0; j < alphabet.length; j++) {
            await wait(animationDelay); // Adjust the delay as needed
            let currentLetter = alphabet[j];
            let currentText = startButton.innerHTML;
            currentText =
                currentText.substring(0, i) +
                currentLetter +
                currentText.substring(i + 1);
            startButton.innerHTML = currentText;
        }
        await wait(50); // Adjust the delay as needed
        let currentText = startButton.innerHTML;
        currentText =
            currentText.substring(0, i) +
            targetWord[i] +
            currentText.substring(i + 1);
        startButton.innerHTML = currentText;

        //Fixes Bug where E from gamble sticks
        if (!animationGoing) {
            startButton.innerHTML = "START";
        }
    }
}
