const deckContainers = document.getElementById("main-border").children;
function CreateDeck(){
    let currentSuit;
    const tempDeck = newDeck()
    for (let i = 0; i < 52; i++) {
        // Switches set div when next suit changes
        currentSuit = Math.floor(i / 13);

        let card = tempDeck[i]
        card.displayCard(deckContainers[currentSuit]);
    }
    
}
CreateDeck();

let isDeckOpen = false;
const deckContainer = document.getElementById("Deck-Container");
function OpenDeck(){
    if(isDeckOpen){
        deckContainer.style.display = "none";
    }else{
        deckContainer.style.display = "flex";
    }
    isDeckOpen = !isDeckOpen;
}
