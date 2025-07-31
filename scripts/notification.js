function ToggleNotificationBox(){
    document.getElementById("Notification-Box").classList.toggle("box-showing");
}

function SendNotification(message, durationSeconds, sound){

    // Set notification message
    document.getElementById("notification-text").innerText = message;

    // Show box then disable after given duration
    ToggleNotificationBox();
    setTimeout(ToggleNotificationBox, durationSeconds * 1000);

    if(sound){
        sound.play();
    }
}

//SendNotification("Cards Shuffled...", 2, shuffle)
