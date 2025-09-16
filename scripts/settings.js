let isSettingsOpen = false;
const SETTINGSSCREEN = document.getElementById("Settings-Screen");
function ToggleSettings() {
    if (isSettingsOpen) {
        SETTINGSSCREEN.style.display = "none";
    } else {
        SETTINGSSCREEN.style.display = "flex";
        SETTINGSSCREEN.scrollTop = 0;
    }

    isSettingsOpen = !isSettingsOpen;
}

// Save Logic
const SAVEKEYCONTAINER = document.getElementById("save-key");
function SaveState() {
    const key = createKey();
    const KEYTEXT = document.createElement("span");
    KEYTEXT.innerHTML = key;
    // Reset Key
    SAVEKEYCONTAINER.innerHTML = "Save Key: ";
    SAVEKEYCONTAINER.appendChild(KEYTEXT);

    // Saves Key to clipboard of user
    SendNotification("Key was coppied to clipboard.", 2, notiSound);
    navigator.clipboard.writeText(key);
}

// Slider logic
const MUSICSLIDER = document.getElementById("music-slider");
MUSICSLIDER.addEventListener("input", () => {
    musicVol = MUSICSLIDER.value / 100; // keeps volume between 0-1
    jazzBackground.volume = musicVol * jazzMult;
});

const SFXSLIDER = document.getElementById("sfx-slider");
SFXSLIDER.addEventListener("input", () => {
    sfxVol = SFXSLIDER.value / 100; // keeps volume between 0-1
    shuffle.volume = sfxVol;
    notiSound.volume = sfxVol;
    sparkle.volume = sfxVol;
    swoosh.volume = sfxVol * 0.7;
});

// sets volume to previously assigned user volume (defaults to .5 if never changed I think)
jazzBackground.volume = (MUSICSLIDER.value / 100) * jazzMult;
shuffle.volume = SFXSLIDER.value / 100;

// Gameplay Settings
const CHARLIECHECKBOX = document.getElementById("fiveCardCharlie");
CHARLIECHECKBOX.addEventListener("change", function() {
    if (this.checked) {
        charlieEnabled = true;
    } else {
        charlieEnabled = false;
    }
});

const STANDCHECKBOX = document.getElementById("standRules");
STANDCHECKBOX.addEventListener("change", function() {
    if (this.checked) {
        standEnabled = true;
    } else {
        standEnabled = false;
    }
});

// Help Screen Logic dont mind it being here :)
let helpToggled = false;
const HELPSCREEN = document.getElementById("Help-Screen");
function ToggleHelpScreen() {
    if (helpToggled) {
        HELPSCREEN.style.display = "none";
    } else {
        HELPSCREEN.style.display = "flex";
        HELPSCREEN.scrollTop = 0;
    }
    helpToggled = !helpToggled;
}
