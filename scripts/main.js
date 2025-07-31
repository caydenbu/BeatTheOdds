let deck = [];
let playerWon = false;
let playerLoss = false;
let playerWins = 0;

deck = newDeck();

function hit() {
    drawCard(playerHand, deck, true);
    update();
}

const standBtn = document.getElementById("stand");
function stand() {
    if (playerScore >= dealerScore) {
        // If it does not make sense for dealer to draw they will ignore the stand
        drawCard(dealerHand, deck, false);
    } else {
        // if player stands and count is lower then they loose :(
        standBtn.style.animation = "shake 0.7s ease-in-out 0s 1";

        playerLoss = true;
    }

    update();
}

const endDiv = document.getElementById("Win-Screen");
function newRound(postShop) {
    // close the shop if openened
    if (postShop) {
        endDiv.style.animation = "slideUp 1.5s ease-in-out forwards";
    }
    // Resets values with new round
    playerLoss = false;
    playerWon = false;
    playerHand = [];
    dealerHand = [];

    // Creates a newDeck
    //deck = newDeck();
    // If deck is less than 10 cards it will create a new deck
    if (deck.length < 10) {
        SendNotification("Cards Shuffled...", 2, shuffle)
        deck = newDeck();
    }

    // Shuffles deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }

    // draws starting cards for dealer than player
    drawCard(dealerHand, deck, false);
    drawCard(dealerHand, deck, false);
    drawCard(playerHand, deck, true);
    drawCard(playerHand, deck, true);

    update();
}

function update() {
    updateCards();
    calculateScore();

    if (playerLoss || playerWon) {
        updateCards(true);
        calculateScore(true);
        endScreen(playerWon);
    }
}

newRound();
