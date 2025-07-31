let isSettingsOpen = false;
const SETTINGSSCREEN = document.getElementById("Settings-Screen");
function ToggleSettings() {
    if (isSettingsOpen) {
        SETTINGSSCREEN.style.display = "none";
    } else {
        SETTINGSSCREEN.style.display = "flex";
    }

    isSettingsOpen = !isSettingsOpen;
}

// Slider logic
const MUSICSLIDER = document.getElementById("music-slider");
MUSICSLIDER.addEventListener("input", () => {
    musicVol = MUSICSLIDER.value / 100; // keeps volume between 0-1
    jazzBackground.volume = musicVol;
});

const SFXSLIDER = document.getElementById("sfx-slider");
SFXSLIDER.addEventListener("input", () => {
    sfxVol = SFXSLIDER.value / 100; // keeps volume between 0-1
    shuffle.volume = sfxVol;
});

// sets volume to previously assigned user volume (defaults to .5 if never changed I think)
jazzBackground.volume = MUSICSLIDER.value / 100;
shuffle.volume = SFXSLIDER.value / 100;
