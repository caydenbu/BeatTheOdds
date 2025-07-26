// Audio
let musicVol = 1;
let sfxVol = 1;

const shuffle = new Audio("./sfx/shuffle.wav");
shuffle.volume = sfxVol;

const jazzBackground = new Audio("./sfx/wJazz.mp3");
jazzBackground.volume = musicVol;
jazzBackground.loop = true;
