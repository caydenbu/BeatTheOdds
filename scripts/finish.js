let coins = 0

let animationTime = 1.5;
let waitTime = 1;
async function endScreen(didWin){

    CalculateWins(didWin)

    endDiv.style.animation = "slideDown "+animationTime+"s ease-in-out forwards "+waitTime+"s"
    await wait((animationTime+waitTime)*800);
    coinUpdate();
    playerScoreCounter.innerHTML = "?"
    await wait((animationTime+waitTime)*200);
    playerScoreCounter.innerHTML = "??"

}

const coinCounter = document.getElementById("coin");
async function coinUpdate() {
    for (let i = 0; i < 100; i++) {
        coins++;
        coinCounter.innerHTML = coins + " Chips";
        await wait(10);
    }
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