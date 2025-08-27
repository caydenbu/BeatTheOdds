const deckContainers = document.getElementById("main-border").children;
// for the chip ability
let showingNextCard = false;
function CreateDeck() {
    const nextCard = deck[0];

    let currentSuit;
    const tempDeck = newDeck();
    for (let i = 0; i < 52; i++) {
        // Switches set div when next suit changes
        currentSuit = Math.floor(i / 13);

        let card = tempDeck[i];
        let cardInDeck = false;
        let nextCardMatch = false;

        for (let i = 0; i < deck.length; i++) {
            // Next card check
            if (card.rank == nextCard.rank && card.suit == nextCard.suit) {
                nextCardMatch = true;
            }
            // Checks if card has been drawn or not
            if (card.rank == deck[i].rank && card.suit == deck[i].suit) {
                cardInDeck = true;
                break;
            }
            // Since the dealers last card is hidden we need to show it as not drawn when looking at the deck (I think this is better)
            if (
                card.rank == dealerHand[dealerHand.length - 1].rank &&
                card.suit == dealerHand[dealerHand.length - 1].suit
            ) {
                cardInDeck = true;
                break;
            }
        }
        // Just read honestly
        if (cardInDeck) {
            card.displayCard(deckContainers[currentSuit]);
            // reveal next card chip logic
            if (nextCardMatch && showingNextCard) {
                deckContainers[currentSuit].children[
                    i - currentSuit * 13
                ].style.backgroundColor = "darkorchid";
            }
        } else {
            card.displayHidden(deckContainers[currentSuit]);
        }
    }
}

let isDeckOpen = false;
const deckContainer = document.getElementById("Deck-Container");
const sets = document.getElementById("main-border").children;
function OpenDeck() {
    if (isDeckOpen) {
        deckContainer.style.display = "none";
    } else {
        deckContainer.style.display = "flex";

        // Removes all cards in the div
        for (let i = 0; i < sets.length; i++) {
            while (sets[i].firstChild) {
                sets[i].removeChild(sets[i].firstChild);
            }
        }

        // Creates the new deck displaying cards
        CreateDeck();
    }
    isDeckOpen = !isDeckOpen;
}
