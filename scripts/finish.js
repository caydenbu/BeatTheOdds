let coins = 0

let animationTime = 1.5;
let waitTime = 1;
async function endScreen(didWin){

    CalculateWins(didWin)

    endDiv.style.animation = "slideDown "+animationTime+"s ease-in-out forwards "+waitTime+"s"
    await wait((animationTime+waitTime)*800);
    coinUpdate();
    if(!playerWon && !playerLoss){return;} // Stops questionmark from overwriting the score
    playerScoreCounter.innerHTML = "?"
    await wait((animationTime+waitTime)*200);
    if(!playerWon && !playerLoss){return;} // Stops questionmark from overwriting the score
    playerScoreCounter.innerHTML = "??"

}


// ----- Shop Logic ----- //
const coinCounter = document.getElementById("coin");
let coinIncrease = 100;

async function coinUpdate() {
    coinIncrease = 100;
    if(playerWon){
        coinIncrease *= playerWins+1;
    }
    

    for (let i = 0; i < 100; i++) {
        coins += coinIncrease/100;
        coinCounter.innerHTML = coins + " Chips";
        await wait(10);
    }
}

const checkboxes = document.querySelectorAll('.checkbox');

checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('click', () => {
        permanentUpgrade(index);
    });
});

let upgrades = [0,0,0,0,0];
const maxUpgrades = [9,9,5,5,5];
const upgradeCost = [500,800,1000,1000,1500];


function permanentUpgrade(index){
    switch(index) {
        case 0:
            updateUpgrades(index);
            break;
        case 1:
            updateUpgrades(index);
            break;
        case 2:
            updateUpgrades(index);
            break;
        case 3:
            updateUpgrades(index);
            break;
        case 4:
            updateUpgrades(index);
            break;
    }
    coinCounter.innerHTML = coins + " Chips";
}

function updateUpgrades(index){
    if(coins >= upgradeCost[index] && upgrades[index] != maxUpgrades[index]){

        coins -= upgradeCost[index];
        upgrades[index]++;
        checkboxes[index].innerHTML = upgrades[index] + "/" + maxUpgrades[index];


        checkAnimation(index);
        
    }else{
        failAnimation(index);
    }

}

function checkAnimation(index){
    checkboxes[index].style.animation = "checkboxChecked 0.5s ease-in-out";

    // Remove the animation after it's done
    checkboxes[index].addEventListener('animationend', () => {
        checkboxes[index].style.animation = '';
    }, { once: true });
}

function failAnimation(index){
    checkboxes[index].style.animation = "checkboxFailed 0.5s ease-in-out";

    // Remove the animation after it's done
    checkboxes[index].addEventListener('animationend', () => {
        checkboxes[index].style.animation = '';
    }, { once: true });
}





// Win Bar Logic in the left of the screen
const winCircles = document.getElementById("win-bar").children;

function CalculateWins(didWin){
    if(didWin){
        playerWins++;
    }else{
        playerWins = 0;
    }

    for (let i = 0; i < winCircles.length; i++) {
        winCircles[i].style.backgroundColor = "#2d3133";
        if(i<playerWins){
            winCircles[i].style.backgroundColor = "#099E5D";
        }   
    }

}

//endDiv.style.animation = "slideDown 0s ease-in-out forwards 0s"