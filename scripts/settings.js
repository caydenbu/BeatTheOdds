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
