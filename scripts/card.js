class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;

        this.score;

        //defaults face to 10 and ace cards to 11
        if (this.rank === 'A') {
            this.score = 11;
        } else if (['K', 'Q', 'J'].includes(this.rank)) {
            this.score = 10;
        }else{
            this.score = this.rank;
        }

    }
    displayCard(hand){
        // create all elements for each card
        const card = document.createElement('div');
        card.classList.add("card");

        // Changes color according to suit
        if(this.suit == "♦" || this.suit == "♥"){
            card.classList.add("red");
        }

        // Adds ranks to the card
        const rankTop = document.createElement("div")
        rankTop.classList.add("rankTop");
        if(this.rank==10){rankTop.style.fontFamily = "Slim-Dueces";} // if the rank is 10 change font to a slim font to compinsate for size diffrence
        rankTop.innerHTML = this.rank;

        const rankBottom = document.createElement("div")
        rankBottom.classList.add("rankBottom");
        if(this.rank==10){rankBottom.style.fontFamily = "Slim-Dueces";} // if the rank is 10 change font to a slim font to compinsate for size diffrence
        rankBottom.innerHTML = this.rank;

        const suitDiv = document.createElement("div")
        suitDiv.classList.add("suit");
        suitDiv.innerHTML = this.suit;

        // adds elements to cards
        hand.appendChild(card);
        card.appendChild(rankTop);
        card.appendChild(suitDiv);
        card.appendChild(rankBottom);
    }

    displayHidden(hand){
        // create all elements for each card
        const card = document.createElement('div');
        card.classList.add("card");
        card.classList.add("hidden");

        const border = document.createElement('div');
        border.classList.add("border");
        const border2 = document.createElement('div');
        border2.classList.add("border");

        hand.appendChild(card);
        card.appendChild(border);
        border.appendChild(border2);
    }
}

// Create Deck
let suits = ["♣","♦","♥","♠"];
let ranks = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];

function newDeck(){
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            deck.push(new Card(suits[i],ranks[j]));
        }
    }
    return deck;
}

function drawCard(hand, deck, isPlayer){

    // Whenever deck is empty create and shuffle a new deck
    if(deck.length == 0){
        deck = newDeck();
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [deck[i],deck[j]] = [deck[j], deck[i]];  // Swap elements
        }
    }

    let card = deck[0];
    if(isPlayer){
        hand.push(card);
    }else{
        // if its the dealer drawing add the card to the second to last spot
        if(dealerHand.length==0){ // error catch for the first draw of the dealers hand
            hand.push(deck[0]);
        }else{
            const placeholder = dealerHand[dealerHand.length-1];
            hand.pop(); // removes and saves hidden card
            hand.push(card); // adds new card 
            hand.push(placeholder); // re adds hidden card to the end
        }
    }
    deck.shift()
}

const playerScoreCounter = document.getElementById("player-score");
const dealerScoreCounter = document.getElementById("dealer-score");

let playerScore = 0;
let dealerScore = 0;
function calculateScore(gameOver){
    playerScore = 0;
    dealerScore = 0;

    for (let i = 0; i < playerHand.length; i++) {
        playerScore += playerHand[i].score;
    }
    playerScoreCounter.innerHTML = playerScore;

    for (let i = 0; i < dealerHand.length; i++) {
        dealerScore += dealerHand[i].score;
    }

    // when game is over show the score of all cards not just the unhidden cards
    if(!gameOver){
        dealerScoreCounter.innerHTML = dealerScore-dealerHand[dealerHand.length-1].score + " + ?";
        // Shows dev hidden cards value when needed
        //dealerScoreCounter.innerHTML += " " + dealerHand[dealerHand.length-1].score;
    }else{
        dealerScoreCounter.innerHTML = dealerScore; // show actual score when game is over and card is revealed
    }
    
    // I player has 5 cards and is under 21 they win
    if(playerHand.length == 5 && playerScore <= 21){
        playerWon = true;
        playerScore = 0;
        dealerScore = 0;
    }
    if(dealerHand.length == 5 && dealerScore <= 21){
        playerLoss = true;
        dealerScore = 0;
        playerScore = 0;
    }

    // If player or dealers busts give the win to the corresponding winner and reset the scores
    if(dealerScore > 21){
        playerWon = true;
        playerScore = 0;
        dealerScore = 0;
    }else if(playerScore > 21){
        playerLoss = true;
        dealerScore = 0;
    }
}

// Initilize hands
let playerHand = [];
let dealerHand = [];
const playerHandContainer = document.getElementById("player-hand");
const dealerHandContainer = document.getElementById("dealer-hand");

function updateCards(gameOver){
    playerHandContainer.innerHTML = ""; // resets cards
    for (let i = 0; i < playerHand.length; i++) {
       playerHand[i].displayCard(playerHandContainer); // display every card in the players hand
    }

    dealerHandContainer.innerHTML = ""; // resets cards
    for (let i = 0; i < dealerHand.length; i++) {
        if(i==dealerHand.length-1 && !gameOver){
            dealerHand[i].displayHidden(dealerHandContainer); // hides the second dealers card then shows the rest
        }else{
            dealerHand[i].displayCard(dealerHandContainer); 
        }
    }
}