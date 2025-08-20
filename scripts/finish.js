let coins = 0;

let animationTime = 1.5;
let waitTime = 1;
async function endScreen(didWin) {
    UpdateTemps();
    CalculateWins(didWin);

    endDiv.style.animation =
        "slideDown " +
        animationTime +
        "s ease-in-out forwards " +
        waitTime +
        "s";
    await wait((animationTime + waitTime) * 800);

    coinUpdate();

    if (!playerWon && !playerLoss) {
        return;
    } // Stops questionmark from overwriting the score
    playerScoreCounter.innerHTML = "?";
    await wait((animationTime + waitTime) * 200);
    if (!playerWon && !playerLoss) {
        return;
    } // Stops questionmark from overwriting the score
    playerScoreCounter.innerHTML = "??";
}

// ----- Shop Logic ----- //

// Create the buyable temporary cards
let ownedTempCards = [];

let tempCards = [];
let tempPrices = [];

function BuyTemp(tempIndex) {
    if (coins >= tempPrices[tempIndex]) {
        const cashReg = new Audio("./sfx/cashReg.wav");
        cashReg.volume = sfxVol * 0.1;
        cashReg.play();

        ownedTempCards.push(tempCards[tempIndex]);
        // Updates coins
        coins -= tempPrices[tempIndex];
        coinCounter.innerHTML = coins + " Chips";

        // Removes bought Card
        document.getElementsByClassName("card-container")[
            tempIndex
        ].style.display = "none";
    } else {
        // Shake when you cant buy it
        const containers = document.getElementsByClassName("card-container");

        // Reset animation state
        containers[tempIndex].style.animation = "none";
        void containers[tempIndex].offsetWidth;

        containers[tempIndex].style.animation = "shake 0.7s ease-in-out 0s 1";

        SendNotification(
            "You can not afford that card (" +
            coins +
            "/" +
            tempPrices[tempIndex] +
            " chips)",
            2,
        );
    }
}

function UpdateTemps() {
    const containers = document.getElementsByClassName("card-container");

    // Resets everything to avoid duplicates
    for (let i = 0; i < containers.length; i++) {
        containers[i].innerHTML = "";
    }

    // Define both lists for three possible card options and fill with random prices and cards
    tempCards.length = 0;
    tempPrices.length = 0;

    // Creates Cards
    for (let i = 0; i < 3; i++) {
        const CARD = new Card(
            suits[getRandomInt(0, 3)],
            ranks[getRandomInt(0, 12)],
        );
        tempCards.push(CARD);
        tempPrices.push(getRandomInt(100, 500));
    }

    for (let i = 0; i < containers.length; i++) {
        containers[i].style.display = "block"; // Resets if Card has Been bought before
        // Adds and Styles Card
        tempCards[i].displayCard(containers[i]);
        containers[i].children[0].classList.add("tempshop");

        // Adds and Styles Text
        const TEMPPRICE = document.createElement("p");
        TEMPPRICE.classList.add("temp-price");
        TEMPPRICE.innerText = tempPrices[i] + " Chips";
        containers[i].appendChild(TEMPPRICE);
    }
}

const coinCounter = document.getElementById("coin");
let coinIncrease = 100;

async function coinUpdate() {
    coinIncrease = 100;
    if (playerWon) {
        coinIncrease *= playerWins + 1;
    }
    coinIncrease += bestStreak * 100;

    // Slow Increase animation
    for (let i = 0; i < 100; i++) {
        coins += coinIncrease / 100;
        coinCounter.innerHTML = coins + " Chips";
        await wait(10);
    }
}

const checkboxes = document.querySelectorAll(".checkbox");

checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("click", () => {
        updateUpgrades(index);
    });
});

let upgrades = [0, 0, 0, 0, 0];
const maxUpgrades = [9, 9, 5, 5, 5];
const upgradeCost = [500, 800, 1000, 1000, 1500];

function updateUpgrades(index) {
    if (coins >= upgradeCost[index] && upgrades[index] != maxUpgrades[index]) {
        const cashReg = new Audio("./sfx/cashReg.wav");
        cashReg.volume = sfxVol * 0.1;
        cashReg.play();

        coins -= upgradeCost[index];
        upgrades[index]++;
        checkboxes[index].innerHTML =
            upgrades[index] + "/" + maxUpgrades[index];

        checkAnimation(index);
        UpdatePermDisplay();
    } else {
        failAnimation(index);
    }
    coinCounter.innerHTML = coins + " Chips";
}

function checkAnimation(index) {
    checkboxes[index].style.animation = "checkboxChecked 0.5s ease-in-out";
    coinCounter.innerHTML = coins + " Chips";

    // Remove the animation after it's done
    checkboxes[index].addEventListener(
        "animationend",
        () => {
            checkboxes[index].style.animation = "";
        },
        { once: true },
    );
}

function failAnimation(index) {
    checkboxes[index].style.animation = "checkboxFailed 0.5s ease-in-out";

    // Remove the animation after it's done
    checkboxes[index].addEventListener(
        "animationend",
        () => {
            checkboxes[index].style.animation = "";
        },
        { once: true },
    );
}

// Win Bar Logic in the left of the screen
const winCircles = document.getElementById("win-bar").children;

let bestStreak = 0;
function CalculateWins(didWin) {
    if (didWin) {
        playerWins++;

        if (playerWins > bestStreak) {
            bestStreak = playerWins;
            SendNotification(
                "New Longest Streak!! (" +
                bestStreak +
                ") + " +
                bestStreak * 100 +
                " base chips",
                5,
            );
        }
    } else {
        playerWins = 0;

        // Removes temps cards if they lose because they are temporary duh
        if (playerLoss) {
            ownedTempCards.length = 0;
            UpdateTempDisplay();
        }
    }

    for (let i = 0; i < winCircles.length; i++) {
        winCircles[i].style.backgroundColor = "#2d3133";
        if (i < playerWins) {
            winCircles[i].style.backgroundColor = "#099E5D";
        }
    }
}

//endDiv.style.animation = "slideDown 0s ease-in-out forwards 0s";
