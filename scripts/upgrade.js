const SCROLLER = document.getElementById("perm-scroller");
const TEMPSCROLLER = document.getElementById("temp-scroller");

function TabSwitch(selectedTab) {
    const TABS = document.getElementById("tabs").children;
    const SCROLLERS = document.getElementById("buff-menu").children;

    // Switch to selected tab
    TABS[selectedTab].classList.add("selected-tab");
    TABS[selectedTab].classList.remove("unselected-tab");
    SCROLLERS[selectedTab].style.display = "flex";

    // Deselect other tab
    TABS[Math.abs(selectedTab - 1)].classList.remove("selected-tab");
    TABS[Math.abs(selectedTab - 1)].classList.add("unselected-tab");
    SCROLLERS[Math.abs(selectedTab - 1)].style.display = "none";
}

// Temporary Buffs
function UpdateTempDisplay() {
    // Reset Contents
    TEMPSCROLLER.innerHTML = "";

    // Sort cards by rank
    ownedTempCards.sort((a, b) => a.score - b.score);

    // Display an outline of a card when you have no temp cards for looks idk
    if (ownedTempCards.length == 0) {
        for (let i = 0; i < 3; i++) {
            const OUTLINE = document.createElement("div");
            OUTLINE.classList.add("outline");
            TEMPSCROLLER.appendChild(OUTLINE);
        }
    }

    for (let i = 0; i < ownedTempCards.length; i++) {
        // Adds and Styles Card
        ownedTempCards[i].displayCard(TEMPSCROLLER);
        TEMPSCROLLER.children[i].classList.add("tempscroller");

        // Click listener directly on the element
        TEMPSCROLLER.children[i].addEventListener("click", () => {
            // Adds card to player hands
            const pop = new Audio("./sfx/pop.wav");
            pop.volume = sfxVol;
            pop.play();

            ownedTempCards[i].displayCard(playerHandContainer);
            playerHand.push(ownedTempCards[i]);
            update();

            // Removes temporary card from list
            ownedTempCards.splice(i, 1);
            UpdateTempDisplay();
        });
    }
}

// Perminant Buffs //
const PERMCOPY = document.getElementById("perm-copy");
// Remove the placeholder chip
PERMCOPY.remove();

// Create Each Chip
const CHIPNAME = [
    "Reroll Card",
    "Destroy Card",
    "Reveal Dealer Card",
    "Reveal Next Card",
    "Change Rank",
];
const CHIPCOLOR = ["red", "green", "blue", "darkorchid", "rgb(20,20,20)"];

const INSIDECHIPCOLOR = [
    "darkred",
    "darkgreen",
    "darkblue",
    "darkviolet",
    "black",
];
// inits for card saving for chip usage
let playerCards = [];
let dealerCards = [];
let hidden;
let collidedCard = null;
let isPlayerCard;

const TEMPLATE = PERMCOPY.cloneNode(true);
for (let i = 0; i < upgrades.length; i++) {
    const chip = TEMPLATE.cloneNode(true);
    chip.removeAttribute("id");
    chip.id = i; // Needed for later refrence

    chip.children[0].textContent = CHIPNAME[i]; // name
    chip.children[1].style.backgroundColor = CHIPCOLOR[i]; // outer ring
    chip.children[1].children[0].style.backgroundColor = INSIDECHIPCOLOR[i]; // inner
    chip.children[2].textContent = `${upgrades[i]}/${maxUpgrades[i]}`; // upgrade count
    chip.style.userSelect = "none";

    let isDragging = false;
    let grabOffsetX = 0,
        grabOffsetY = 0;
    let placeholder = null;

    chip.style.cursor = "grab";
    chip.style.touchAction = "none";

    chip.addEventListener("pointerdown", (e) => {
        // Saves cards to use the chips on
        playerCards = document.querySelectorAll(".player-card");
        dealerCards = document.querySelectorAll(".dealer-card");
        hidden = document.querySelectorAll(".hidden");

        if (e.pointerType === "mouse" && e.button !== 0) return;

        isDragging = true;
        chip.style.cursor = "grabbing";

        chip.children[0].style.visibility = "hidden";
        chip.children[2].style.visibility = "hidden";

        const scrollerRect = SCROLLER.getBoundingClientRect();
        const chipRect = chip.getBoundingClientRect();

        // placeholder

        placeholder = document.createElement("div");
        placeholder.style.width = `${chipRect.width}px`;
        placeholder.style.height = `${chipRect.height}px`;
        placeholder.style.visibility = "hidden";
        chip.parentNode.insertBefore(placeholder, chip.nextSibling);

        // position chip on pointer
        chip.style.position = "absolute";
        chip.style.left = `${chipRect.left - scrollerRect.left}px`;
        chip.style.top = `${chipRect.top - scrollerRect.top}px`;
        chip.style.width = `${chipRect.width}px`;
        chip.style.height = `${chipRect.height}px`;
        chip.style.zIndex = "10";

        SCROLLER.appendChild(chip);

        grabOffsetX = e.clientX - chipRect.left;
        grabOffsetY = e.clientY - chipRect.top;

        try {
            chip.setPointerCapture(e.pointerId);
        } catch { }

        e.preventDefault();
    });

    chip.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        // move chip
        const scrollerRect = SCROLLER.getBoundingClientRect();
        chip.style.left = `${e.clientX - scrollerRect.left - grabOffsetX}px`;
        chip.style.top = `${e.clientY - scrollerRect.top - grabOffsetY}px`;

        // Card Collision
        cardCollisionCheck(chip);
    });

    const finalizePointer = () => {
        // finalize snap + restore
        placeholder.replaceWith(chip);
        placeholder = null;

        chip.style.position = "";
        chip.style.left = "";
        chip.style.top = "";
        chip.style.width = "";
        chip.style.height = "";
        chip.style.zIndex = "";
        chip.style.transition = "";

        chip.children[0].style.visibility = "";
        chip.children[2].style.visibility = "";
        UpdatePermDisplay();
    };

    const pointerUpOrCancel = (e) => {
        if (!isDragging) return;
        isDragging = false;
        chip.style.cursor = "grab";

        const scrollerRect = SCROLLER.getBoundingClientRect();
        const phRect = placeholder.getBoundingClientRect();

        chip.style.transition = "left 150ms ease, top 150ms ease";
        chip.style.left = `${phRect.left - scrollerRect.left}px`;
        chip.style.top = `${phRect.top - scrollerRect.top}px`;

        chip.addEventListener("transitionend", finalizePointer, { once: true });

        try {
            chip.releasePointerCapture(e.pointerId);
        } catch { }

        // actual chip and card logic
        if (collidedCard != null) {
            // changes card to original collor
            collidedCard.style.backgroundColor = "white";
            // Changes hidden card and deck back to orignal color
            if (chip.id == 2 || chip.id == 3)
                collidedCard.style.backgroundColor = "rgb(153, 26, 26)";

            //reroll card
            if (chip.id == 0 && usedUpgrades[0] < upgrades[0]) {
                let rerolledCard = new Card(
                    suits[getRandomInt(0, 3)],
                    ranks[getRandomInt(0, 12)],
                );
                // player logic
                if (isPlayerCard) {
                    playerHand[collidedCard.id] = rerolledCard;
                    // dealer logic;
                } else {
                    dealerHand[collidedCard.id] = rerolledCard;
                }
                sparkle.play();
                update();
                usedUpgrades[0]++;
            }
            // Destroy Card
            if (chip.id == 1 && usedUpgrades[1] < upgrades[1]) {
                // player logic
                if (isPlayerCard) {
                    playerHand.splice(collidedCard.id, 1);
                } else {
                    dealerHand.splice(collidedCard.id, 1);
                }

                const poof = new Audio("./sfx/poof.wav");
                poof.volume = sfxVol * 0.3;
                poof.play();

                update();
                usedUpgrades[1]++;
            }
            // Show dealer card
            if (chip.id == 2 && usedUpgrades[2] < upgrades[2]) {
                collidedCard.style.backgroundColor = "rgb(153, 26, 26)";
                isHidden = false;

                const flip = new Audio("./sfx/flip.wav");
                flip.volume = sfxVol * 0.3;
                flip.play();

                update();
                usedUpgrades[2]++;
            }
            // Show next card
            if (chip.id == 3 && usedUpgrades[3] < upgrades[3]) {
                collidedCard.style.backgroundColor = "rgb(153, 26, 26)";
                showingNextCard = true;
                sparkle.play();
                SendNotification("Next card is highlighted in the deck.", 2);
                usedUpgrades[3]++;
            }
        }
    };

    chip.addEventListener("pointerup", pointerUpOrCancel);
    chip.addEventListener("pointercancel", pointerUpOrCancel);
    SCROLLER.appendChild(chip);
}

function cardCollisionCheck(chip) {
    // sets the chip collision rectangle to a way smaller box to remove incorrect collisions
    const chipRec =
        chip.children[1].children[0].children[0].getBoundingClientRect();

    let didColide = false;
    // all player cards
    for (let i = 0; i < playerCards.length; i++) {
        // Ignores for abilities that dont apply to player
        if (chip.id == 2 || chip.id == 3) break;

        if (isColliding(playerCards[i].getBoundingClientRect(), chipRec)) {
            playerCards[i].style.backgroundColor = CHIPCOLOR[chip.id]; // sets to retrospective chip color
            collidedCard = playerCards[i]; // allows release to know last hovered chip
            didColide = true;
            isPlayerCard = true;
        } else {
            playerCards[i].style.backgroundColor = "white";
        }
    }
    // not hidden dealer cards
    for (let i = 0; i < dealerCards.length; i++) {
        if (isColliding(dealerCards[i].getBoundingClientRect(), chipRec)) {
            // Ignores for abilities that dont apply to non hidden dealer
            if (chip.id == 2 || chip.id == 3) break;

            dealerCards[i].style.backgroundColor = CHIPCOLOR[chip.id]; // sets to retrospective chip color
            collidedCard = dealerCards[i]; // allows release to know last hovered chip
            didColide = true;
            isPlayerCard = false;
        } else {
            dealerCards[i].style.backgroundColor = "white";
        }
    }
    // hidden card only
    if (chip.id == 2) {
        const hiddenCard = document.getElementById("hidden");
        if (isColliding(hiddenCard.getBoundingClientRect(), chipRec)) {
            hiddenCard.style.backgroundColor = CHIPCOLOR[chip.id]; // sets to retrospective chip color
            collidedCard = hiddenCard; // allows release to know last hovered chip
            didColide = true;
        } else {
            hiddenCard.style.backgroundColor = "rgb(153, 26, 26)";
        }
    }
    // Reveal Card only
    if (chip.id == 3) {
        const deck = document.getElementById("deck");
        if (isColliding(deck.getBoundingClientRect(), chipRec)) {
            deck.style.backgroundColor = CHIPCOLOR[chip.id]; // sets to retrospective chip color
            collidedCard = deck; // allows release to know last hovered chip
            didColide = true;
        } else {
            deck.style.backgroundColor = "rgb(153, 26, 26)";
        }
    }

    if (!didColide) {
        collidedCard = null;
    }
}

function isColliding(r1, r2) {
    return !(
        r1.top > r2.bottom ||
        r1.bottom < r2.top ||
        r1.left > r2.right ||
        r1.right < r2.left
    );
}

function UpdatePermDisplay() {
    const AMOUNTS = document.getElementsByClassName("perm-amount");
    for (let i = 0; i < upgrades.length; i++) {
        AMOUNTS[i].innerHTML =
            upgrades[i] - usedUpgrades[i] + "/" + maxUpgrades[i];
    }
}

// Runs initial display before game starts
UpdateTempDisplay();
UpdatePermDisplay();
