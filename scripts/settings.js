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
    musicVol = MUSICSLIDER.value / 100; // keep volume between 0-1
    jazzBackground.volume = musicVol;
});

const SFXSLIDER = document.getElementById("sfx-slider");
SFXSLIDER.addEventListener("input", () => {
    sfxVol = SFXSLIDER.value / 100; // Line#16
    shuffle.volume = sfxVol;
});
