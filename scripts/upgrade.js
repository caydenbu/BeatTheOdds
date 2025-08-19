const SCROLLER = document.getElementById("perm-scroller");
const TEMPSCROLLER = document.getElementById("temp-scroller");

function TabSwitch(selectedTab) {
    const TABS = document.getElementById("tabs").children;
    const SCROLLERS = document.getElementById("buff-menu").children;

    // Switch to selected tab
    TABS[selectedTab].classList.add("selected-tab");
    TABS[selectedTab].classList.remove("unselected-tab");
    SCROLLERS[selectedTab].style.display = "flex";

    // Deselect other tab
    TABS[Math.abs(selectedTab - 1)].classList.remove("selected-tab");
    TABS[Math.abs(selectedTab - 1)].classList.add("unselected-tab");
    SCROLLERS[Math.abs(selectedTab - 1)].style.display = "none";
}

// Temporary Buffs
function UpdateTempDisplay() {
    // Reset Contents
    TEMPSCROLLER.innerHTML = "";

    // Sort cards by rank
    ownedTempCards.sort((a, b) => a.score - b.score);

    // Display an outline of a card when you have no temp cards for looks idk
    if (ownedTempCards.length == 0) {
        for (let i = 0; i < 3; i++) {
            const OUTLINE = document.createElement("div");
            OUTLINE.classList.add("outline");
            TEMPSCROLLER.appendChild(OUTLINE);
        }
    }

    for (let i = 0; i < ownedTempCards.length; i++) {
        // Adds and Styles Card
        ownedTempCards[i].displayCard(TEMPSCROLLER);
        TEMPSCROLLER.children[i].classList.add("tempscroller");

        // Click listener directly on the element
        TEMPSCROLLER.children[i].addEventListener("click", () => {
            // Adds card to player hands
            ownedTempCards[i].displayCard(playerHandContainer);
            playerHand.push(ownedTempCards[i]);
            update();

            // Removes temporary card from list
            ownedTempCards.splice(i, 1);
            UpdateTempDisplay();
        });
    }
}

// Perminant Buffs //
const PERMCOPY = document.getElementById("perm-copy");
// Remove the placeholder chip
PERMCOPY.remove();

// Create Each Chip
const CHIPNAME = [
    "Reroll Card",
    "Destroy Card",
    "Reveal Dealer Card",
    "Reveal Next Card",
    "Change Rank",
];
const CHIPCOLOR = ["red", "green", "blue", "darkorchid", "rgb(20,20,20)"];
const INSIDECHIPCOLOR = [
    "darkred",
    "darkgreen",
    "darkblue",
    "darkviolet",
    "black",
];

const TEMPLATE = PERMCOPY.cloneNode(true);
for (let i = 0; i < upgrades.length; i++) {
    const chip = TEMPLATE.cloneNode(true);
    chip.removeAttribute("id");

    chip.children[0].textContent = CHIPNAME[i]; // name
    chip.children[1].style.backgroundColor = CHIPCOLOR[i]; // outer ring
    chip.children[1].children[0].style.backgroundColor = INSIDECHIPCOLOR[i]; // inner
    chip.children[2].textContent = `${upgrades[i]}/${maxUpgrades[i]}`; // upgrade count
    chip.style.userSelect = "none";

    let isDragging = false;
    let grabOffsetX = 0,
        grabOffsetY = 0;
    let placeholder = null;

    chip.addEventListener("mousedown", (e) => {
        isDragging = true;
        chip.style.cursor = "grabbing";

        // hide name + upgrade count
        chip.children[0].style.visibility = "hidden";
        chip.children[2].style.visibility = "hidden";

        const scrollerRect = SCROLLER.getBoundingClientRect();
        const chipRect = chip.getBoundingClientRect();

        // placeholder
        placeholder = document.createElement("div");
        placeholder.style.width = `${chipRect.width}px`;
        placeholder.style.height = `${chipRect.height}px`;
        placeholder.style.visibility = "hidden";
        chip.parentNode.insertBefore(placeholder, chip.nextSibling);

        // position chip on cursor
        chip.style.position = "absolute";
        chip.style.left = `${chipRect.left - scrollerRect.left}px`;
        chip.style.top = `${chipRect.top - scrollerRect.top}px`;
        chip.style.width = `${chipRect.width}px`;
        chip.style.height = `${chipRect.height}px`;
        chip.style.zIndex = "10";

        SCROLLER.appendChild(chip);

        grabOffsetX = e.clientX - chipRect.left;
        grabOffsetY = e.clientY - chipRect.top;

        e.preventDefault();
    });

    const onMouseMove = (e) => {
        if (!isDragging) return;
        const scrollerRect = SCROLLER.getBoundingClientRect();
        chip.style.left = `${e.clientX - scrollerRect.left - grabOffsetX}px`;
        chip.style.top = `${e.clientY - scrollerRect.top - grabOffsetY}px`;
    };

    const onMouseUp = () => {
        if (!isDragging) return;
        isDragging = false;
        chip.style.cursor = "grab";

        // snap back
        const scrollerRect = SCROLLER.getBoundingClientRect();
        const phRect = placeholder.getBoundingClientRect();

        chip.style.transition = "left 150ms ease, top 150ms ease";
        chip.style.left = `${phRect.left - scrollerRect.left}px`;
        chip.style.top = `${phRect.top - scrollerRect.top}px`;

        const finalize = () => {
            placeholder.replaceWith(chip);
            placeholder = null;

            // restore normal flow
            chip.style.position = "";
            chip.style.left = "";
            chip.style.top = "";
            chip.style.width = "";
            chip.style.height = "";
            chip.style.zIndex = "";
            chip.style.transition = "";

            // show name + upgrade count again
            chip.children[0].style.visibility = "";
            chip.children[2].style.visibility = "";

            chip.removeEventListener("transitionend", finalize);
        };

        chip.addEventListener("transitionend", finalize, { once: true });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    SCROLLER.appendChild(chip);
}

function UpdatePermDisplay() {
    const AMOUNTS = document.getElementsByClassName("perm-amount");
    for (let i = 0; i < upgrades.length; i++) {
        AMOUNTS[i].innerHTML = upgrades[i] + "/" + maxUpgrades[i];
    }
}

// Runs initial display before game starts
UpdateTempDisplay();
UpdatePermDisplay();
