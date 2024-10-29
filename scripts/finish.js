let coins = 0

let animationTime = 1.5;
let waitTime = 1;
async function endScreen(){

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

endDiv.style.animation = "slideDown 0s ease-in-out forwards 0s"