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

function CreateKey() {
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

// Test key:  "8345/1/2/9/9/5/5/5/0/0/0/0/1/2.♥/K.♣/"
function LoadState(key) {
    key = key.split("/");
    console.log(key);
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

    UpdateTempDisplay();
    UpdatePermDisplay();
}
