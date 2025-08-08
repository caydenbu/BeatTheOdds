const SCROLLER = document.getElementById("scroller");
const PERMCOPY = document.getElementById("perm-copy");
// Remove the placeholder chip
PERMCOPY.remove();

// Create Each Chip
const CHIPNAME = ["Reroll Card", "Destroy Card", "Reveal Dealer Card", "Reveal Next Card", "Change Rank"];
const CHIPCOLOR = ["red", "green", "blue", "darkorchid", "rgb(20,20,20)"];
const INSIDECHIPCOLOR = ["darkred", "darkgreen", "darkblue", "darkviolet", "black"];

for (let i = 0; i < upgrades.length; i++) {

    PERMCOPY.children[0].innerHTML = CHIPNAME[i]
    PERMCOPY.children[1].style.backgroundColor = CHIPCOLOR[i];
    PERMCOPY.children[1].children[0].style.backgroundColor = INSIDECHIPCOLOR[i];
    PERMCOPY.children[2].innerHTML = upgrades[i] + "/" + maxUpgrades[i];
    SCROLLER.appendChild(PERMCOPY.cloneNode(true));

}
