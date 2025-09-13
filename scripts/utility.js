/*
    This is file filled with general functions I use throughout my projects 
*/

// sleep func (funcs make me sleep you know what i mean 😏)
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Insides change within each project
function dev() {
    SendNotification("DEV MODE ENABLED", 1);
    coins = 100000;
    upgrades = [9, 9, 5, 5, 5];

    UpdatePermDisplay();
    const checkboxes = document.querySelectorAll(".checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].innerHTML = upgrades[i] + "/" + maxUpgrades[i];
    }
}
