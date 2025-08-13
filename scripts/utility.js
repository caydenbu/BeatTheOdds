/*
    This is file filled with general functions I use throughout my projects 
*/

// sleep func (funcs make me sleep you know what i mean 😏)
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
