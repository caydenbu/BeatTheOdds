// ------- Key Order ------- //
// Coins
// Current Wins
// Longest Streak
// Upgrades [0]
// Upgrades [1]
// Upgrades [2]
// Upgrades [3]
// Upgrades [4]
// Used Upgrades [0]
// Used Upgrades [1]
// Used Upgrades [2]
// Used Upgrades [3]
// Used Upgrades [4]
// -- Temp Card Saves Now -- //
// Rank, Suit
// Ex: J.Heart, 10.Spade

// Lost Info
// -Deck State (Just use current deck state);

function createKey() {
    let key = "";
    key += coins + "/";
    key += playerWins + "/";
    key += bestStreak + "/";
    key += upgrades[0] + "/";
    key += upgrades[1] + "/";
    key += upgrades[2] + "/";
    key += upgrades[3] + "/";
    key += upgrades[4] + "/";
    key += usedUpgrades[0] + "/";
    key += usedUpgrades[1] + "/";
    key += usedUpgrades[2] + "/";
    key += usedUpgrades[3] + "/";
    key += usedUpgrades[4] + "/";

    // Temp Cards
    for (let i = 0; i < ownedTempCards.length; i++) {
        key += ownedTempCards[i].rank + "." + ownedTempCards[i].suit + "/";
    }
    return key;
}

const SAVESCREEN = document.getElementById("Save-Screen");

let saveToggled = false;
function ToggleSaveScreen() {
    if (saveToggled) {
        SAVESCREEN.style.display = "none";
    } else {
        document.getElementById("key-input").value = ""; // Resets key type into box
        SAVESCREEN.style.display = "flex";
    }
    saveToggled = !saveToggled;
}
// Save Stats when player puts key in box
document.getElementById("key-input").addEventListener("input", () => {
    DisplayStats();
});

const StatNames = [
    "coins:",
    "playerWins:",
    "bestStreak:",
    "Reroll Card ",
    "Destroy Card ",
    "Reveal Dealer Card:",
    "Reveal Next Card:",
    "Change Rank:",
];
function DisplayStats() {
    const KEYCONTAINER = document.getElementById("key-input");
    let stats = KEYCONTAINER.value.split("/");

    for (let i = 0; i < 8; i++) {
        // Breaks if it's not the full key
        if (i >= stats.length) {
            break;
        }
        // Removes previous p
        SAVESCREEN.children[2 + i].innerHTML = "";
        const P = document.createElement("p");
        P.innerText = StatNames[i] + " " + stats[i];
        SAVESCREEN.children[2 + i].appendChild(P);
    }
}

function HandleLoadButton() {
    const KEYCONTAINER = document.getElementById("key-input");
    SendNotification("State has been loaded.", 2, notiSound);
    LoadState(KEYCONTAINER.value);
    ToggleSaveScreen();
}

// Test key:  "8345/1/2/9/9/5/5/5/0/0/0/0/1/2.♥/K.♣/"
function LoadState(key) {
    key = key.split("/");
    coins = parseInt(key[0]);
    playerWins = key[1];
    bestStreak = key[2];
    upgrades[0] = key[3];
    upgrades[1] = key[4];
    upgrades[2] = key[5];
    upgrades[3] = key[6];
    upgrades[4] = key[7];
    usedUpgrades[0] = key[8];
    usedUpgrades[1] = key[9];
    usedUpgrades[2] = key[10];
    usedUpgrades[3] = key[11];
    usedUpgrades[4] = key[12];

    // Update Neccesarry stuff
    UpdateTempDisplay();
    UpdatePermDisplay();

    const checkboxes = document.querySelectorAll(".checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].innerHTML = upgrades[i] + "/" + maxUpgrades[i];
    }
}
